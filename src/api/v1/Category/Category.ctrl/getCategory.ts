import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from 'entity/Category';

export default async (request: Request, response: Response) => {
	try {
		const categoryRepository = getRepository(Category);
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
