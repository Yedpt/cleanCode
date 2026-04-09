import { Request, Response, NextFunction } from 'express';
import videoModel from '../models/videoModel';
import { AuthRequest } from '../middleware/auth';

export const getAllVideos = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const items = await videoModel.findAll({ order: [['id', 'DESC']] });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getVideoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await videoModel.findByPk(id);

    if (!item) {
      res.status(404).json({ message: 'Video no encontrado' });
      return;
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, video_url, thumbnail } = req.body;

    const created = await videoModel.create({
      title,
      video_url,
      thumbnail: thumbnail || null,
      user_id: req.user?.id || null,
    } as any);

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, video_url, thumbnail } = req.body;

    const item = await videoModel.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Video no encontrado' });
      return;
    }

    await item.update({ title, video_url, thumbnail });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const item = await videoModel.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Video no encontrado' });
      return;
    }

    await item.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
};
