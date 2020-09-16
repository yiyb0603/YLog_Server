import { Request, Response } from 'express';
import { ICategoryCreate } from 'interface/CategoryTypes';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../../../entity/Category';
import { validateModifyCategory } from '../../../../lib/validation/Category/modifyCategory';

export default async (request: Request, response: Response) => {
	try {
		const modifyData = request.body;
		const { idx, categoryName }: ICategoryCreate = modifyData;

		if (!validateModifyCategory(request, response)) {
			return;
		}

		const categoryRepository: Repository<Category> = getRepository(Category);

		const findCategory: Category = await categoryRepository.findOne({
			where: {
				idx,
			},
		});

		if (!findCategory) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 카테고리입니다.`);
			return handleFailed(response, 404, '존재하지 않는 카테고리입니다.');
		}

		findCategory.idx = idx;
		findCategory.category_name = categoryName;

		categoryRepository.save(findCategory);
		ColorConsole.green(`[200] 카테고리 수정에 성공하였습니다.`);
		return handleSuccess(response, 200, '카테고리 수정에 성공하였습니다.');
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
