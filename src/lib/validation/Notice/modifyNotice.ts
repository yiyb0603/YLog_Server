import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateModifyNotice = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		idx: Joi.number().integer().required(),
		title: Joi.string().min(1).max(255),
		contents: Joi.string().min(1).max(1000),
	});

	return validate(request, response, scheme);
};
