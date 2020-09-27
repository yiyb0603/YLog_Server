import { Request, Response } from 'express';
import * as Joi from 'joi';
import validate from '../validate';

export const validateModifyCategory = (
	request: Request,
	response: Response
) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		idx: Joi.number().integer().required(),
		categoryName: Joi.string().min(1).max(100).required(),
	});

	return validate(request, response, scheme);
};
