import { Request, Response } from 'express';
import * as Joi from 'joi';
import validate from '../validate';

export const validateCreateCategory = (
	request: Request,
	response: Response
) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		categoryName: Joi.string().max(50).required(),
	});

	return validate(request, response, scheme);
};
