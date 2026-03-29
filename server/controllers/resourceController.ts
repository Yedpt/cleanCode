import { Request, Response, NextFunction } from 'express';
import resourceModel from '../models/resourceModel';
import { AuthRequest } from '../middleware/auth';

export const getAllResources = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const items = await resourceModel.findAll({ order: [['id', 'DESC']] });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getResourceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await resourceModel.findByPk(id);

    if (!item) {
      res.status(404).json({ message: 'Recurso no encontrado' });
      return;
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createResource = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, resource, resource_url, image_url } = req.body;

    const created = await resourceModel.create({
      title,
      resource,
      resource_url,
      image_url: image_url || null,
      user_id: req.user?.id || null,
    } as any);

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateResource = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, resource, resource_url, image_url } = req.body;

    const item = await resourceModel.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Recurso no encontrado' });
      return;
    }

    await item.update({ title, resource, resource_url, image_url });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteResource = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const item = await resourceModel.findByPk(id);
    if (!item) {
      res.status(404).json({ message: 'Recurso no encontrado' });
      return;
    }

    await item.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
