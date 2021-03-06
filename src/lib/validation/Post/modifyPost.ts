import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateModifyPost = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		idx: Joi.number().integer().required(),
		introduction: Joi.string().min(1).max(255),
		title: Joi.string().min(1).max(255),
		contents: Joi.string().min(1),
		writer: Joi.string(),
		thumbnail: Joi.string().max(10000).allow(null),
		categoryIdx: Joi.number().integer(),
		isTemp: Joi.boolean(),
	});

	return validate(request, response, scheme);
};
