import { Reply } from '../../../../entity/Reply';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';

export default async (request: Request, response: Response) => {
	try {
		const postIdx: number = Number(request.query.postIdx);
		const replyRepository: Repository<Reply> = getRepository(Reply);

		if (!Number.isInteger(postIdx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			return response.stauts(400).json({
				status: 400,
				message: '검증 오류입니다.',
			});
		}

		const replies: Reply[] = await replyRepository.find({
			where: {
				post_idx: postIdx,
			},

			select: [
				'idx',
				'post_idx',
				'contents',
				'replied_at',
				'updated_at',
				'comment_idx',
			],
		});

		ColorConsole.green(`[200] 답글 조회에 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '답글 조회에 성공하였습니다.',
			data: {
				replies,
			},
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다.`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
