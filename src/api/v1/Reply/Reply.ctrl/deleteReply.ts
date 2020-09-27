import { Request, Response } from 'express';
import { Reply } from '../../../../entity/Reply';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const idx: number = Number(request.query.idx);
		const replyRepository: Repository<Reply> = getRepository(Reply);

		if (!Number.isInteger(idx)) {
			ColorConsole.red(`[400] 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
			return;
		}

		const findReply: Reply = await replyRepository.findOne({
			where: {
				idx,
			},
		});

		if (!findReply) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 답글입니다.`);
			handleFailed(response, 404, '존재하지 않는 답글입니다.');
			return;
		}

		await replyRepository.remove(findReply);
		ColorConsole.green(`[200] 답글 삭제를 성공하였습니다.`);
		handleSuccess(response, 200, '답글 삭제를 성공하였습니다.');
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
