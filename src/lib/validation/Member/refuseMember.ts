import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateRefuseMember = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		memberId: Joi.string().required(),
	});

	return validate(request, response, scheme);
};
