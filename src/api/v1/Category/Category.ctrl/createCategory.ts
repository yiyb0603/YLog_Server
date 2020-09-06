import { Request, Response } from 'express';
import { Category } from '../../../../entity/Category';
import { getRepository, Repository } from 'typeorm';
import { ICategoryCreate } from 'interface/CategoryTypes';
import { validateCreateCategory } from '../../../../lib/validation/Category/createCategory';

export default async (request: Request, response: Response) => {
	try {
		const categoryRepository: Repository<Category> = getRepository(Category);
		const { categoryName }: ICategoryCreate = request.body;

		if (!validateCreateCategory(request, response)) {
			return;
		}

		const isExistsCategory: Category = await categoryRepository.findOne({
			where: {
				category_name: categoryName,
			},
		});

		if (isExistsCategory) {
			return response.status(409).json({
				status: 409,
				message: '이미 존재하는 카테고리 입니다.',
			});
		}

		const category: Category = new Category();
		category.category_name = categoryName;

		await categoryRepository.save(category);
		return response.status(200).json({
			status: 200,
			message: '카테고리 생성에 성공하였습니다.',
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
