import { Request, Response, NextFunction } from 'express';
import { NODE_ENV } from '../config';

// Middleware de manejo de errores centralizado
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err);
	const status = err.status || 500;
	const message = status >= 500 && NODE_ENV === 'production'
		? 'Internal Server Error'
		: (err.message || 'Internal Server Error');
	res.status(status).json({ message });
};

export default {
	errorHandler,
};