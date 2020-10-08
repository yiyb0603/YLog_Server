import { EmailCode } from '../../../../entity/EmailCode';
import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { getRepository, Repository } from 'typeorm';

export default async (request: Request, response: Response) => {
	try {
		const { email, code } = request.body;
		const emailRepository: Repository<EmailCode> = getRepository(EmailCode);

		const emailCode: EmailCode = await emailRepository.findOne({
			where: {
				email,
			},
		});

		if (!emailCode) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 이메일 인증 정보입니다.`);
			handleFailed(response, 404, '존재하지 않는 이메일 인증 정보입니다.');
			return;
		}

		if (emailCode.code !== code) {
			ColorConsole.red(`[ERROR 401] 인증 코드가 올바르지 않습니다.`);
			handleFailed(response, 401, '인증 코드가 올바르지 않습니다.');
			return;
		}

		emailCode.is_certified = true;
		await emailRepository.save(emailCode);
		ColorConsole.green(`[200] 이메일 인증을 성공하였습니다.`);
		handleSuccess(response, 200, '이메일 인증을 성공하였습니다.');
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
