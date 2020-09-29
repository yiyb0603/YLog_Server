import { Notice } from '../../../../entity/Notice';
import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { getRepository, Repository } from 'typeorm';

export default async (request: Request, response: Response) => {
	try {
		const noticeRepository: Repository<Notice> = getRepository(Notice);

		const notices: Notice[] = await noticeRepository.find({
			select: ['idx', 'contents', 'title', 'writer'],
		});

		ColorConsole.green(`[200] 공지사항 조회를 성공하였습니다.`);
		handleSuccess(response, 200, '공지사항 조회를 성공하였습니다.', {
			notices,
		});
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
