import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateCreateComment = (request: Request, response: Response) => {
	const scheme = Joi.object().keys({
		postIdx: Joi.number().integer().required(),
		writer: Joi.string().required(),
		contents: Joi.string().required(),
	});

	return validate(request, response, scheme);
};
