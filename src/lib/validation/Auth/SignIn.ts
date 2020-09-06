import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateSignIn = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		id: Joi.string().max(50).required(),
		password: Joi.string().max(50).required(),
	});

	return validate(request, response, scheme);
};
