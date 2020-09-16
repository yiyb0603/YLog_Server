import { Request, Response } from 'express';
import { Reply } from '../../../../entity/Reply';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';

export default async (request: Request, response: Response) => {
	try {
		const { idx } = request.query;
		const replyRepository: Repository<Reply> = getRepository(Reply);

		if (isNaN(idx)) {
			ColorConsole.red(`[400] 검증 오류입니다.`);
			return response.status(400).json({
				status: 400,
				message: '검증 오류입니다.',
			});
		}

		const findReply: Reply = await replyRepository.findOne({
			where: {
				idx,
			},
		});

		if (!findReply) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 답글입니다.`);
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 답글입니다.',
			});
		}

		await replyRepository.remove(findReply);
		ColorConsole.green(`[200] 답글 삭제를 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '답글 삭제를 성공하였습니다.',
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다.`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
