import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateCreatePost = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		title: Joi.string().min(1).max(255).required(),
		introduction: Joi.string().required(),
		contents: Joi.string().max(100000).required(),
		categoryIdx: Joi.number().integer().required(),
		thumbnail: Joi.string().max(800).allow(null),
	});

	return validate(request, response, scheme);
};
