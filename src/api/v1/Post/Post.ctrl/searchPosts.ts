import { Post } from '../../../../entity/Post';
import { Request, Response } from 'express';
import { getRepository, Like, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const { keyword } = request.query;
		const postRepository: Repository<Post> = getRepository(Post);

		if (!keyword) {
			ColorConsole.red(`[ERROR 400] 검색 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
			return;
		}

		const sqlString: string = `LOWER( title ) LIKE '%${keyword.toLowerCase()}%' or LOWER( introduction ) LIKE '%${keyword.toLowerCase()}%';`;
		const posts: Post[] = await postRepository.find({
			where: sqlString,
		});

		ColorConsole.green(`[200] 블로그 글 검색을 성공하였습니다.`);
		handleSuccess(response, 200, '블로그 글 검색을 성공하였습니다.', { posts });
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
