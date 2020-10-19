import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateAllowMember = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		memberIdx: Joi.number().integer().required(),
	});

	return validate(request, response, scheme);
};
