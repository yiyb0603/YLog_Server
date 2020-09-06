import { Request, Response } from 'express';
import { ICategoryCreate } from 'interface/CategoryTypes';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../../../entity/Category';

export default async (request: Request, response: Response) => {
	try {
		const modifyData = request.body;
		const { idx, categoryName }: ICategoryCreate = modifyData;

		if (isNaN(idx) || !categoryName) {
			return response.status(400).json({
				status: 400,
				message: '검증 오류입니다.',
			});
		}

		const categoryRepository: Repository<Category> = getRepository(Category);

		const findCategory: Category = await categoryRepository.findOne({
			where: {
				idx,
			},
		});

		if (!findCategory) {
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 카테고리입니다.',
			});
		}

		findCategory.idx = idx;
		findCategory.category_name = categoryName;

		categoryRepository.save(findCategory);
		return response.status(200).json({
			status: 200,
			message: '카테고리 수정에 성공하였습니다.',
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
