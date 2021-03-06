import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateSignUp = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		email: Joi.string().min(10).max(200).required(),
		password: Joi.string().min(5).max(1000).required(),
		name: Joi.string().min(2).max(20).required(),
		adminCode: Joi.string().allow(''),
		profileImage: Joi.string(),
	});

	return validate(request, response, scheme);
};
