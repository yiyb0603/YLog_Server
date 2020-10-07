import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../../../entity/Category';

export default async (request: Request, response: Response) => {
	try {
		const categoryRepository: Repository<Category> = getRepository(Category);

		const categories: Category[] = await categoryRepository.find({
			select: ['idx', 'category_name'],
		});

		ColorConsole.green(`[200] 카테고리 목록 조회에 성공하였습니다.`);
		return handleSuccess(
			response,
			200,
			'카테고리 목록 조회에 성공하였습니다.',
			categories
		);
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
