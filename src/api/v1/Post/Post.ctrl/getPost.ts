import { Post } from '../../../../entity/Post';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { Comment } from '../../../../entity/Comment';

export default async (request: Request, response: Response) => {
	try {
		const idx = Number(request.params.idx);
		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);

		let commentLength: number = 0;

		if (!Number.isInteger(idx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			return handleFailed(response, 400, '검증 오류입니다.');
		}

		const post = await postRepository.findOne({
			where: {
				idx,
			},
		});

		const count: number = await commentRepository.count({
			where: {
				post_idx: idx,
			},
		});

		commentLength += count;
		post.comment_length = commentLength;
		commentLength = 0;

		if (!post) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글입니다.`);
			return handleFailed(response, 404, '존재하지 않는 글입니다.');
		}

		ColorConsole.green(`[200] 글 조회를 성공하였습니다.`);
		return handleSuccess(response, 200, '글 조회를 성공하였습니다.', {
			post,
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
