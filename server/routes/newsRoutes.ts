import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as newsCtrl from '../controllers/newsController';
import { authenticate } from '../middleware/auth';
import { authorizeNewsOwnerOrAdmin } from '../middleware/authorizeNews';

const router = Router();

const validate = (req: any, res: any, next: any) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	next();
};

router.get('/', newsCtrl.getAllNews);
router.get('/:id', param('id').isInt().withMessage('id debe ser entero'), validate, newsCtrl.getNewsById);

// proteger creación, actualización y eliminación con JWT
router.post(
	'/',
	authenticate,
	body('title').isString().notEmpty().withMessage('title requerido'),
	body('news').isString().notEmpty().withMessage('news requerido'),
	validate,
	newsCtrl.createNews,
);

router.put(
	'/:id',
	authenticate,
	param('id').isInt().withMessage('id debe ser entero'),
	body('title').optional().isString(),
	body('news').optional().isString(),
	validate,
	authorizeNewsOwnerOrAdmin,
	newsCtrl.updateNews,
);

router.delete('/:id', authenticate, param('id').isInt().withMessage('id debe ser entero'), validate, authorizeNewsOwnerOrAdmin, newsCtrl.deleteNews);

export default router;
