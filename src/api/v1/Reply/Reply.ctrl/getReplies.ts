import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Reply } from '../../../../entity/Reply';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { User } from '../../../../entity/User';
import { Comment } from '../../../../entity/Comment';

export default async (request: Request, response: Response) => {
	try {
		const postIdx: number = Number(request.query.postIdx);
		const replyRepository: Repository<Reply> = getRepository(Reply);
		const commentRepository: Repository<Comment> = getRepository(Comment);
		const userRepository: Repository<User> = getRepository(User);

		if (!Number.isInteger(postIdx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
			return;
		}

		const replies: Reply[] = await replyRepository.find({
			where: {
				fk_post_idx: postIdx,
			},

			select: [
				'idx',
				'post',
				'contents',
				'repliedAt',
				'updatedAt',
				'comment',
				'fk_comment_idx',
				'user',
				'fk_user_idx',
				'isPrivate',
			],
		});

		for (const reply of replies) {
			reply.comment = await commentRepository.findOne({
				where: {
					idx: reply.fk_comment_idx,
				},
			});

			reply.user = await userRepository.findOne({
				where: {
					idx: reply.fk_user_idx,
				},
			});
		}

		await replyRepository.save(replies);
		ColorConsole.green(`[200] 답글 조회에 성공하였습니다.`);
		handleSuccess(response, 200, '답글 조회에 성공하였습니다', { replies });
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
