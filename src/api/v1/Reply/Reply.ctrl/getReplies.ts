import { Reply } from '../../../../entity/Reply';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { User } from '../../../../entity/User';

export default async (request: Request, response: Response) => {
	try {
		const postIdx: number = Number(request.query.postIdx);
		const replyRepository: Repository<Reply> = getRepository(Reply);
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
				'user',
				'isPrivate',
			],
		});

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
