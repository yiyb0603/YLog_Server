import { Request, Response } from 'express';
import { Category } from '../../../../entity/Category';
import { getRepository, Repository } from 'typeorm';
import { ICategoryCreate } from 'interface/CategoryTypes';
import { validateCreateCategory } from '../../../../lib/validation/Category/createCategory';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import ColorConsole from '../../../../lib/ColorConsole';

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
			ColorConsole.red(`[ERROR 409] 이미 존재하는 카테고리 입니다.`);
			return handleFailed(response, 409, '이미 존재하는 카테고리 입니다.');
		}

		const category: Category = new Category();
		category.category_name = categoryName;

		await categoryRepository.save(category);
		ColorConsole.green(`[200] 카테고리 생성에 성공하였습니다.`);
		return handleSuccess(response, 200, '카테고리 생성에 성공하였습니다.');
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
