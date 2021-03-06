import { Request, Response } from 'express';
import * as Joi from 'joi';
import validate from '../validate';

export const validateModifyReply = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		idx: Joi.number().integer().required(),
		commentIdx: Joi.number().integer().required(),
		postIdx: Joi.number().integer().required(),
		contents: Joi.string().min(1).max(255).required(),
		isPrivate: Joi.boolean().required(),
	});

	return validate(request, response, scheme);
};
