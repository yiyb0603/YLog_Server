import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../../../entity/Category';

export default async (request: Request, response: Response) => {
	try {
		const { idx } = request.query;

		const categoryRepository: Repository<Category> = getRepository(Category);
		if (isNaN(idx)) {
			return response.status(400).json({
				status: 400,
				message: '검증 오류입니다.',
			});
		}

		const deleteItem: Category = await categoryRepository.findOne({
			where: {
				idx,
			},
		});

		if (!deleteItem) {
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 카테고리 입니다.',
			});
		}

		await categoryRepository.remove(deleteItem);
		return response.status(200).json({
			status: 200,
			message: '카테고리를 삭제하였습니다.',
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
