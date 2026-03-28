import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as newsCtrl from '../controllers/newsController';
import { authenticate } from '../middleware/auth';
import { authorizeRoles } from '../middleware/authorizeRoles';

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
	authorizeRoles('admin'),
	body('title').isString().notEmpty().withMessage('title requerido'),
	body('news').isString().notEmpty().withMessage('news requerido'),
	validate,
	newsCtrl.createNews,
);

router.put(
	'/:id',
	authenticate,
	authorizeRoles('admin'),
	param('id').isInt().withMessage('id debe ser entero'),
	body('title').optional().isString(),
	body('news').optional().isString(),
	validate,
	newsCtrl.updateNews,
);

router.delete(
	'/:id',
	authenticate,
	authorizeRoles('admin'),
	param('id').isInt().withMessage('id debe ser entero'),
	validate,
	newsCtrl.deleteNews,
);

export default router;
