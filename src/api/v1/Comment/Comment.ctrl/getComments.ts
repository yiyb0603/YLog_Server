import { Request, Response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Comment } from '../../../../entity/Comment';
import { User } from '../../../../entity/User';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const postIdx: number = Number(request.query.postIdx);
		const postRepository: Repository<Post> = getRepository(Post);
		const userRepository: Repository<User> = getRepository(User);
		const commentRepository: Repository<Comment> = getRepository(Comment);

		if (isNaN(postIdx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
			return;
		}

		const findPost: Post = await postRepository.findOne({
			where: {
				idx: postIdx,
			},
		});

		if (!findPost) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글입니다.`);
			handleFailed(response, 404, '존재하지 않는 글입니다.');
			return;
		}

		const comments: Comment[] = await commentRepository.find({
			select: [
				'idx',
				'contents',
				'createdAt',
				'post',
				'user',
				'fk_user_idx',
				'updatedAt',
				'isPrivate',
			],

			where: {
				fk_post_idx: postIdx,
			},
		});

		for (const comment of comments) {
			comment.user = await userRepository.findOne({
				where: {
					idx: comment.fk_user_idx,
				},
			});
		}

		ColorConsole.green(`[200] 댓글 목록 조회에 성공하였습니다.`);
		handleSuccess(response, 200, '댓글 목록 조회에 성공하였습니다.', {
			comments,
		});

		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
