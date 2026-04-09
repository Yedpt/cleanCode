import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    if (!roles.includes(String(user.rol))) {
      res.status(403).json({ message: 'Forbidden: permisos insuficientes' });
      return;
    }

    next();
  };
};

export default authorizeRoles;
