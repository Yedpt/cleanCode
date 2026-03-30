import rateLimit from 'express-rate-limit';
import { JWT_SECRET, NODE_ENV } from '../config';

const isProduction = NODE_ENV === 'production';

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 600 : 1600,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiadas solicitudes, intenta de nuevo en unos minutos.' },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 12 : 40,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { message: 'Demasiados intentos de autenticacion, espera unos minutos.' },
});

export const validateSecurityConfig = (): void => {
  if (!JWT_SECRET || JWT_SECRET.length < 24) {
    if (isProduction) {
      throw new Error('JWT_SECRET ausente o inseguro. Debe tener al menos 24 caracteres.');
    }

    console.warn('[SECURITY] JWT_SECRET ausente o corto. Configura un secreto robusto en .env');
  }
};
