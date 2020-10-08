import { EmailCode } from '../../../../entity/EmailCode';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import randomCode from '../../../../lib/util/Email/randomCode';
import sendEmail from '../../../../lib/util/Email/sendEmail';
import { User } from '../../../../entity/User';

export default async (request: Request, response: Response) => {
	try {
		const { email } = request.body;
		const emailRepository: Repository<EmailCode> = getRepository(EmailCode);
		const userRepository: Repository<User> = getRepository(User);

		const existEmail: User = await userRepository.findOne({
			where: {
				email,
			},
		});

		if (existEmail) {
			ColorConsole.red(`[ERROR 409] 중복된 이메일입니다.`);
			handleFailed(response, 409, '중복된 이메일입니다.');
			return;
		}

		await emailRepository
			.createQueryBuilder()
			.delete()
			.where('email = :email', {
				email,
			})
			.execute();

		const code: string = randomCode();
		const emailCode: EmailCode = new EmailCode();

		const emailTitle: string = 'YLog 이메일 인증';

		emailCode.code = code;
		emailCode.email = email;
		emailCode.is_certified = false;

		await emailRepository.save(emailCode);
		await sendEmail(email, emailTitle, code);
		ColorConsole.green(`[200] 이메일 코드를 발송하였습니다.`);
		handleSuccess(response, 200, '이메일 코드를 발송하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
