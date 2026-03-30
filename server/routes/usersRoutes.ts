import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as userCtrl from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { authRateLimiter } from '../middleware/security';

const router = Router();

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post(
  '/register',
  authRateLimiter,
  body('email').isEmail().withMessage('email inválido').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('password mínimo 8 caracteres'),
  body('name').optional().trim().isLength({ min: 2, max: 120 }).withMessage('name debe tener entre 2 y 120 caracteres'),
  validate,
  userCtrl.register,
);

router.post(
  '/login',
  authRateLimiter,
  body('email').isEmail().withMessage('email inválido').normalizeEmail(),
  body('password').isString().notEmpty().withMessage('password requerido'),
  validate,
  userCtrl.login,
);
router.get('/', authenticate, authorizeRoles('admin'), userCtrl.getAllUsers);
router.delete('/:id', authenticate, authorizeRoles('admin'), param('id').isInt().withMessage('id debe ser entero'), validate, userCtrl.deleteUser);

export default router;
