import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateModifyPost = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		idx: Joi.number().integer().required(),
		introduction: Joi.string(),
		title: Joi.string(),
		contents: Joi.string(),
		writer: Joi.string(),
		updatedAt: Joi.date(),
		thumbnail: Joi.string(),
		categoryIdx: Joi.number().integer(),
	});

	return validate(request, response, scheme);
};
