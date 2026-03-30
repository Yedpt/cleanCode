import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { Op } from 'sequelize';
import { AuthRequest } from '../middleware/auth';
import connectionDB from '../database/conectionDB';
import newsModel from '../models/newsModel';
import videoModel from '../models/videoModel';
import resourceModel from '../models/resourceModel';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const name = req.body.name ? String(req.body.name).trim() : null;

    if (!email || !password) {
      res.status(400).json({ message: 'email y password requeridos' });
      return;
    }

    const existing = await UserModel.findOne({ where: { email } });
    if (existing) {
      res.status(409).json({ message: 'Usuario ya existe' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashed, name } as any);
    res.status(201).json({ id: user.get('id'), email: user.get('email'), name: user.get('name') });
    return;
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      res.status(400).json({ message: 'email y password requeridos' });
      return;
    }

    const user: any = await UserModel.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    if (user.get('status') && user.get('status') !== 'active') {
      res.status(403).json({ message: 'Usuario inactivo o eliminado' });
      return;
    }

    const match = await bcrypt.compare(password, user.get('password'));
    if (!match) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    if (!JWT_SECRET) {
      res.status(500).json({ message: 'Configuración de seguridad inválida' });
      return;
    }

    const payload = { id: user.get('id'), email: user.get('email'), rol: user.get('rol') };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: payload });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await UserModel.findAll({
      attributes: ['id', 'name', 'email', 'rol', 'status', 'created_at'],
      where: {
        status: {
          [Op.ne]: 'deleted',
        },
      },
      order: [['id', 'DESC']],
    });

    res.json(users);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      res.status(400).json({ message: 'id inválido' });
      return;
    }

    if (req.user?.id === id) {
      res.status(400).json({ message: 'No puedes eliminar tu propio usuario' });
      return;
    }

    const user: any = await UserModel.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const tx = await connectionDB.transaction();

    try {
      await Promise.all([
        newsModel.destroy({ where: { user_id: id }, transaction: tx }),
        videoModel.destroy({ where: { user_id: id }, transaction: tx }),
        resourceModel.destroy({ where: { user_id: id }, transaction: tx }),
      ]);

      await user.destroy({ transaction: tx });
      await tx.commit();
    } catch (error) {
      await tx.rollback();
      throw error;
    }

    res.json({ message: 'Usuario eliminado definitivamente' });
    return;
  } catch (error) {
    next(error);
  }
};

export default { register, login, getAllUsers, deleteUser };
