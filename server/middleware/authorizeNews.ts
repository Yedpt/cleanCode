import { Response, NextFunction } from 'express';
import newsModel from '../models/newsModel';
import { AuthRequest } from './auth';

export const authorizeNewsOwnerOrAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'id inválido' });
      return;
    }

    const item: any = await newsModel.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Noticia no encontrada' });
      return;
    }

    const ownerId = item.get('user_id');
    if (user.rol === 'admin' || user.id === ownerId) {
      next();
      return;
    }

    res.status(403).json({ message: 'Forbidden: no eres el autor ni admin' });
    return;
  } catch (err) {
    next(err);
  }
};

export default authorizeNewsOwnerOrAdmin;
