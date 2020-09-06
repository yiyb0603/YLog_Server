import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../../../entity/Category';

export default async (request: Request, response: Response) => {
	try {
		const categoryRepository: Repository<Category> = getRepository(Category);

		const categories: Category[] = await categoryRepository.find({
			select: ['idx', 'category_name'],
		});

		return response.status(200).json({
			status: 200,
			message: '카테고리 목록 조회에 성공하였습니다',
			data: {
				categories,
			},
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
