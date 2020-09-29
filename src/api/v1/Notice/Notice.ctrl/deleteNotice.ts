import { Notice } from '../../../../entity/Notice';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const idx: number = Number(request.query.idx);
		const noticeRepository: Repository<Notice> = getRepository(Notice);

		if (!Number.isInteger(idx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
			return;
		}

		const deleteNotice: Notice = await noticeRepository.findOne({
			where: {
				idx,
			},
		});

		if (!deleteNotice) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 공지사항 입니다.`);
			handleFailed(response, 404, '존재하지 않는 공지사항 입니다.');
			return;
		}

		await noticeRepository.remove(deleteNotice);
		ColorConsole.green(`[200] 공지사항 삭제를 성공하였습니다.`);
		handleSuccess(response, 200, '공지사항 삭제를 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
