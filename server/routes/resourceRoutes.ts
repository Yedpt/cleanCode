import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as resourceCtrl from '../controllers/resourceController';
import { authenticate } from '../middleware/auth';
import { authorizeRoles } from '../middleware/authorizeRoles';

const router = Router();

const validate = (req: any, res: any, next: any) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return;
	}
	next();
};

router.get('/', resourceCtrl.getAllResources);
router.get('/:id', param('id').isInt().withMessage('id debe ser entero'), validate, resourceCtrl.getResourceById);

router.post(
	'/',
	authenticate,
	authorizeRoles('admin'),
	body('title').isString().notEmpty().withMessage('title requerido'),
	body('resource').isString().notEmpty().withMessage('resource requerido'),
	body('resource_url').isURL().withMessage('resource_url debe ser URL válida'),
	body('image_url').optional().isURL().withMessage('image_url debe ser URL válida'),
	validate,
	resourceCtrl.createResource,
);

router.put(
	'/:id',
	authenticate,
	authorizeRoles('admin'),
	param('id').isInt().withMessage('id debe ser entero'),
	body('title').optional().isString(),
	body('resource').optional().isString(),
	body('resource_url').optional().isURL(),
	body('image_url').optional().isURL(),
	validate,
	resourceCtrl.updateResource,
);

router.delete(
	'/:id',
	authenticate,
	authorizeRoles('admin'),
	param('id').isInt().withMessage('id debe ser entero'),
	validate,
	resourceCtrl.deleteResource,
);

export default router;

