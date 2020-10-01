import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../../../entity/User';
import { Notice } from '../../../../entity/Notice';
import { validateCreateNotice } from '../../../../lib/validation/Notice/createNotice';

export default async (request: Request, response: Response) => {
	try {
		const user: User = request.user;
		const { title, contents } = request.body;

		const noticeRepository: Repository<Notice> = getRepository(Notice);

		if (!validateCreateNotice(request, response)) {
			return;
		}

		const notice: Notice = new Notice();
		notice.title = title;
		notice.contents = contents;
		notice.writer = user ? user.name : '관리자';
		notice.created_at = new Date();

		await noticeRepository.save(notice);
		ColorConsole.green(`[200] 공지사항 등록을 성공하였습니다.`);
		handleSuccess(response, 200, '공지사항 등록을 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
