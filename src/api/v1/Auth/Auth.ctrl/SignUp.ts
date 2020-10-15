import 'dotenv/config';
import { Request, Response } from 'express';
import { User } from '../../../../entity/User';
import { getRepository, Repository } from 'typeorm';
import { ISignUpTypes } from 'interface/AuthTypes';
import ColorConsole from '../../../../lib/ColorConsole';
import { validateSignUp } from '../../../../lib/validation/Auth/SignUp';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { EmailCode } from '../../../../entity/EmailCode';
import SendFCM from '../../../../lib/util/SendFCM';

export default async (request: Request, response: Response) => {
	try {
		const {
			password,
			email,
			name,
			adminCode,
			profileImage,
		}: ISignUpTypes = request.body;

		const userRepository: Repository<User> = getRepository(User);
		const emailRepository: Repository<EmailCode> = getRepository(EmailCode);
		const { ADMIN_CODE } = process.env;

		if (!validateSignUp(request, response)) {
			return;
		}

		if (adminCode) {
			if (adminCode !== ADMIN_CODE) {
				ColorConsole.red(`[ERROR 401] 어드민 코드가 올바르지 않습니다.`);
				handleFailed(response, 401, '어드민 코드가 올바르지 않습니다.');
				return;
			}
		}

		const certifiedEmail: EmailCode = await emailRepository.findOne({
			where: { email },
		});

		if (!certifiedEmail || !certifiedEmail.is_certified) {
			ColorConsole.red(`[ERROR 401] 인증되지 않은 이메일 입니다.`);
			handleFailed(response, 401, '인증되지 않은 이메일 입니다.');
			return;
		}

		const user: User = new User();
		user.password = password;
		user.name = name;
		user.joined_at = null;
		user.email = email;
		user.profile_image = profileImage || null;
		user.is_admin = adminCode === ADMIN_CODE || false;

		const admins: User[] = await userRepository.find({
			where: {
				is_admin: true,
				fcm_allow: true,
			}
		});

		for (let i = 0; i < admins.length; i++) {
			if (admins[i].fcm_allow) {
				const { fcm_token } = admins[i];
	
				SendFCM(
					fcm_token,`${user.name}님이 가입신청을 하였습니다.`
				);
			}
		}

		await emailRepository.remove(certifiedEmail);
		await userRepository.save(user);
		ColorConsole.green('[200] 회원가입 성공');
		return handleSuccess(response, 200, '회원가입에 성공하였습니다.');
	} catch (error) {
		ColorConsole.red('[ERROR 500] 회원가입 서버 에러 ' + error.message);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
