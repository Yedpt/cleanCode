import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name } = req.body;
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
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'email y password requeridos' });
      return;
    }

    const user: any = await UserModel.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    const match = await bcrypt.compare(password, user.get('password'));
    if (!match) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    const payload = { id: user.get('id'), email: user.get('email'), rol: user.get('rol') };
    const token = jwt.sign(payload, JWT_SECRET || 'changeme', { expiresIn: '8h' });
    res.json({ token, user: payload });
    return;
  } catch (error) {
    next(error);
  }
};

export default { register, login };
