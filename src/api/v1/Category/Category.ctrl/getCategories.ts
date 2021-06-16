import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../../../entity/Category';
import { Post } from '../../../../entity/Post';

export default async (request: Request, response: Response) => {
	try {
		const { keyword } = request.query;
		const categoryRepository: Repository<Category> = getRepository(Category);
		const postRepository: Repository<Post> = getRepository(Post);

		const categories: Category[] = await categoryRepository.find({
			select: [
				'idx',
				'categoryName',
			],
		});

		for (let i = 0; i < categories.length; i++) {
			const sqlString: string = `
				fk_category_idx = ${categories[i].idx} AND
				is_temp = false AND
				(LOWER( title ) LIKE '${keyword ? `%${keyword.toLowerCase()}%` : `%%`}'
				OR
				LOWER( introduction ) LIKE '${keyword ? `%${keyword.toLowerCase()}%` : `%%`}');
			`;

			const count: number = await postRepository.count({
				where: sqlString
			});

			categories[i].postCount = count;
		}

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
