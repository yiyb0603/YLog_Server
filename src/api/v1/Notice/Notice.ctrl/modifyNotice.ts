import { Notice } from '../../../../entity/Notice';
import { User } from '../../../../entity/User';
import { Request, Response } from 'express';
import { validateModifyNotice } from '../../../../lib/validation/Notice/modifyNotice';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const { idx, title, contents } = request.body;
		const user: User = request.user;
		const noticeRepository: Repository<Notice> = getRepository(Notice);

		if (!validateModifyNotice(request, response)) {
			return;
		}

		const modifyNotice: Notice = await noticeRepository.findOne({
			where: {
				idx,
			},
		});

		if (!modifyNotice) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 공지사항 입니다.`);
			handleFailed(response, 404, '존재하지 않는 공지사항 입니다.');
			return;
		}

		modifyNotice.idx = idx;
		modifyNotice.title = title || modifyNotice.title;
		modifyNotice.contents = contents || modifyNotice.contents;
		modifyNotice.writer = user ? user.name : '관리자';

		await noticeRepository.save(modifyNotice);
		ColorConsole.green(`[200] 공지사항 수정을 성공하였습니다.`);
		handleSuccess(response, 200, '공지사항 수정을 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
