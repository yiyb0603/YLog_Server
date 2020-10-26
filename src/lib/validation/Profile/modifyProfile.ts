import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from '../validate';

export const validateModifyProfile = (request: Request, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
        userIdx: Joi.number().integer().required(),
        name: Joi.string().min(2).max(20),
        email: Joi.string().min(10).max(200),
        profileImage: Joi.string().allow(null),
	});

	return validate(request, response, scheme);
};
