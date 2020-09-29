import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { getRepository, Repository } from 'typeorm';
import { Notice } from '../../../../entity/Notice';

export default async (request: Request, response: Response) => {
	try {
		const idx: number = Number(request.params.idx);
		const noticeRepository: Repository<Notice> = getRepository(Notice);

		if (!Number.isInteger(idx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			handleFailed(response, 404, '검증 오류입니다.');
			return;
		}

		const notice: Notice = await noticeRepository.findOne({
			where: {
				idx,
			},
		});

		if (!notice) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 공지사항 입니다.`);
			handleFailed(response, 404, '존재하지 않는 공지사항 입니다.');
			return;
		}

		ColorConsole.green(`[200] 공지사항 조회를 성공하였습니다.`);
		handleSuccess(response, 200, '공지사항 조회를 성공하였습니다.', { notice });
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
