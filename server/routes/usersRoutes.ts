import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import * as userCtrl from '../controllers/userController';

const router = Router();

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/register', body('email').isEmail(), body('password').isLength({ min: 6 }), validate, userCtrl.register);
router.post('/login', body('email').isEmail(), body('password').isLength({ min: 6 }), validate, userCtrl.login);

export default router;
