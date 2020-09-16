import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateSignIn = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		id: Joi.string().min(5).max(50).required(),
		password: Joi.string().min(15).max(1000).required(),
	});

	return validate(request, response, scheme);
};
