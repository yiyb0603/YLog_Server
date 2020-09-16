import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateSignUp = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		id: Joi.string().max(50).required(),
		password: Joi.string().max(1000).required(),
		name: Joi.string().max(50).required(),
		joinedAt: Joi.date().required(),
		email: Joi.string().required(),
		adminCode: Joi.string(),
		profileImage: Joi.string(),
	});

	return validate(request, response, scheme);
};
