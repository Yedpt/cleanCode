import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as userCtrl from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { authorizeRoles } from '../middleware/authorizeRoles';

const router = Router();

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/register', body('email').isEmail(), body('password').isLength({ min: 6 }), validate, userCtrl.register);
router.post('/login', body('email').isEmail(), body('password').isLength({ min: 6 }), validate, userCtrl.login);
router.get('/', authenticate, authorizeRoles('admin'), userCtrl.getAllUsers);
router.delete('/:id', authenticate, authorizeRoles('admin'), param('id').isInt().withMessage('id debe ser entero'), validate, userCtrl.deleteUser);

export default router;
