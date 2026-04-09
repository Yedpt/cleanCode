import { Request, Response, NextFunction } from 'express';
import newsModel from '../models/newsModel';
import { AuthRequest } from '../middleware/auth';

// Listar todas las noticias
export const getAllNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const news = await newsModel.findAll({ order: [['id', 'DESC']] });
    res.json(news);
    return;
  } catch (error) {
    next(error);
  }
};

// Obtener noticia por id
export const getNewsById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await newsModel.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Noticia no encontrada' });
      return;
    }
    res.json(item);
    return;
  } catch (error) {
    next(error);
  }
};

// Crear noticia
export const createNews = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, news, image_url, num_likes } = req.body;
    const created = await newsModel.create({
      title,
      news,
      user_id: req.user?.id || null,
      image_url: image_url || null,
      num_likes: num_likes ?? 0,
    } as any);
    res.status(201).json(created);
    return;
  } catch (error) {
    next(error);
  }
};

// Actualizar noticia
export const updateNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, news, image_url } = req.body;
    const item = await newsModel.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Noticia no encontrada' });
      return;
    }
    await item.update({ title, news, image_url });
    res.json(item);
    return;
  } catch (error) {
    next(error);
  }
};

// Eliminar noticia
export const deleteNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await newsModel.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Noticia no encontrada' });
      return;
    }
    await item.destroy();
    res.status(204).send();
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
