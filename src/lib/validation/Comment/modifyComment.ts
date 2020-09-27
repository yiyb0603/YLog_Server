import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateModifyComment = (request: Request, response: Response) => {
	const scheme = Joi.object().keys({
		idx: Joi.number().integer().required(),
		postIdx: Joi.number().integer().required(),
		contents: Joi.string().min(1).max(255).required(),
	});

	return validate(request, response, scheme);
};
