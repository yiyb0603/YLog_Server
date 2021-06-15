import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { Post } from '../../../../entity/Post';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { User } from 'entity/User';

export default async (request: Request, response: Response) => {
	try {
		const idx: number = Number(request.query.idx);
		const user: User = request.user;

		const postRepository: Repository<Post> = getRepository(Post);

		if (!Number.isInteger(idx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			return handleFailed(response, 400, '검증 오류입니다.');
		}

		const findPost: Post = await postRepository.findOne({
			where: {
				idx,
			},
		});

		if (!findPost) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글입니다.`);
			handleFailed(response, 404, '존재하지 않는 글입니다.');
			return;
		}

		if (findPost.fk_user_idx !== user.idx && (!user || !user.isAdmin)) {
			ColorConsole.red(`[ERROR 403] 글을 삭제할 권한이 없습니다.`);
			handleFailed(response, 403, '글을 삭제할 권한이 없습니다.');
			return;
		}

		await postRepository.remove(findPost);
		ColorConsole.green(`[200] 글 삭제를 성공하였습니다.`);
		return handleSuccess(response, 200, '글 삭제를 성공하였습니다.');
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
