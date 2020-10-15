import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { Comment } from '../../../../entity/Comment';
import { User } from 'entity/User';
import { Reply } from '../../../../entity/Reply';

export default async (request: Request, response: Response) => {
	try {
		const idx: number = Number(request.query.idx);
		const user: User = request.user;

		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);
		const replyRepository: Repository<Reply> = getRepository(Reply);

		if (!Number.isInteger(idx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			return handleFailed(response, 400, '검증 오류입니다.');
		}

		const findPost: Post = await postRepository.findOne({
			where: {
				idx,
			},
		});

		const findComments: Comment[] = await commentRepository.find({
			where: {
				post_idx: idx,
			},
		});

		const findReplies: Reply[] = await replyRepository.find({
			where: {
				post_idx: idx,
			},
		});

		if (!findPost) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글입니다.`);
			handleFailed(response, 404, '존재하지 않는 글입니다.');
			return;
		}

		if (findPost.writer_idx !== user.idx && (!user || !user.is_admin)) {
			ColorConsole.red(`[ERROR 403] 글을 삭제할 권한이 없습니다.`);
			handleFailed(response, 403, '글을 삭제할 권한이 없습니다.');
			return;
		}

		await commentRepository.remove(findComments);
		await postRepository.remove(findPost);
		await replyRepository.remove(findReplies);
		ColorConsole.green(`[200] 글 삭제를 성공하였습니다.`);
		return handleSuccess(response, 200, '글 삭제를 성공하였습니다.');
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
