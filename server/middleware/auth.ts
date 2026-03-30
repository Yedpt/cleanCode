import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!JWT_SECRET) {
    res.status(500).json({ message: 'Configuración de seguridad inválida' });
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'No autorizado' });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    res.status(401).json({ message: 'Formato de token inválido' });
    return;
  }

  const [, token] = parts;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
    return;
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }
};

export default authenticate;
