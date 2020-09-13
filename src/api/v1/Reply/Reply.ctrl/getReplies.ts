import { Reply } from '../../../../entity/Reply';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

export default async (request: Request, response: Response) => {
	try {
		const { postIdx } = request.query;
		const replyRepository: Repository<Reply> = getRepository(Reply);

		if (isNaN(postIdx)) {
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

		return response.status(200).json({
			status: 200,
			message: '답글 조회에 성공하였습니다.',
			data: {
				replies,
			},
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
