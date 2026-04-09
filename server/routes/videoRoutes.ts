import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as videoCtrl from '../controllers/videoController';
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

router.get('/', videoCtrl.getAllVideos);
router.get('/:id', param('id').isInt().withMessage('id debe ser entero'), validate, videoCtrl.getVideoById);

router.post(
	'/',
	authenticate,
	authorizeRoles('admin'),
	body('title').isString().notEmpty().withMessage('title requerido'),
	body('video_url').isURL().withMessage('video_url debe ser URL válida'),
	body('thumbnail').optional({ values: 'falsy' }).isURL().withMessage('thumbnail debe ser URL válida'),
	validate,
	videoCtrl.createVideo,
);

router.put(
	'/:id',
	authenticate,
	authorizeRoles('admin'),
	param('id').isInt().withMessage('id debe ser entero'),
	body('title').optional().isString(),
	body('video_url').optional().isURL(),
	body('thumbnail').optional({ values: 'falsy' }).isURL(),
	validate,
	videoCtrl.updateVideo,
);

router.delete(
	'/:id',
	authenticate,
	authorizeRoles('admin'),
	param('id').isInt().withMessage('id debe ser entero'),
	validate,
	videoCtrl.deleteVideo,
);

export default router;

