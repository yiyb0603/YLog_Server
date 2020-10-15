import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateSignIn = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		email: Joi.string().min(10).max(50).required(),
		password: Joi.string().min(5).max(100000).required(),
	});

	return validate(request, response, scheme);
};
