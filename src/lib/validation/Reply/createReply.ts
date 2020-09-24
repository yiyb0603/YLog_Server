import { Request, Response } from 'express';
import * as Joi from 'joi';
import validate from '../validate';

export const validateCreateReply = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		commentIdx: Joi.number().integer().required(),
		postIdx: Joi.number().integer().required(),
		contents: Joi.string().required(),
	});

	return validate(request, response, scheme);
};
