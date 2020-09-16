import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../../../entity/Category';

export default async (request: Request, response: Response) => {
	try {
		const { idx } = request.query;
		const categoryRepository: Repository<Category> = getRepository(Category);

		if (isNaN(idx)) {
			return handleFailed(response, 400, '검증 오류입니다.');
		}

		const deleteItem: Category = await categoryRepository.findOne({
			where: {
				idx,
			},
		});

		if (!deleteItem) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 카테고리 입니다.`);
			return handleFailed(response, 404, '존재하지 않는 카테고리 입니다.');
		}

		await categoryRepository.remove(deleteItem);
		ColorConsole.green(`[200] 카테고리를 삭제하였습니다.`);
		return handleSuccess(response, 200, '카테고리를 삭제하였습니다.');
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다 ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
