import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateCreateRelease = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		title: Joi.string().min(1).max(255).required(),
		contents: Joi.string().min(1).max(100000).required(),
	});

	return validate(request, response, scheme);
};
