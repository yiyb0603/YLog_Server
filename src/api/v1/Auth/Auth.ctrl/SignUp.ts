import 'dotenv/config';
import { Request, Response } from 'express';
import { User } from '../../../../entity/User';
import { getRepository, Repository } from 'typeorm';
import { ISignUpTypes } from 'interface/AuthTypes';
import ColorConsole from '../../../../lib/ColorConsole';
import { sha512 } from 'js-sha512';
import { validateSignUp } from '../../../../lib/validation/Auth/SignUp';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const {
			id,
			password,
			email,
			name,
			joinedAt,
			adminCode,
			profileImage,
		}: ISignUpTypes = request.body;
		const userRepository: Repository<User> = getRepository(User);
		const { ADMIN_CODE } = process.env;

		if (!validateSignUp(request, response)) {
			return;
		}

		if (adminCode.length > 0) {
			if (adminCode !== ADMIN_CODE) {
				ColorConsole.red(`[ERROR 401] 어드민 코드가 올바르지 않습니다.`);
				handleFailed(response, 401, '어드민 코드가 올바르지 않습니다.');
				return;
			}
		}

		const isExists: User = await userRepository.findOne({
			where: [
				{
					id,
				},
				{
					email,
				},
			],
		});

		if (isExists) {
			ColorConsole.red(`[ERROR 409] 중복된 아이디 혹은 이메일입니다.`);
			handleFailed(response, 409, '중복된 아이디 혹은 이메일입니다.');
			return;
		}

		const user: User = new User();
		user.id = id;
		user.password = sha512(password).toLowerCase();
		user.name = name;
		user.joined_at = joinedAt;
		user.email = email;
		user.profile_image = profileImage || null;
		user.is_admin = adminCode === ADMIN_CODE || false;

		await userRepository.save(user);
		ColorConsole.green('[200] 회원가입 성공');
		return handleSuccess(response, 200, '회원가입에 성공하였습니다.');
	} catch (error) {
		ColorConsole.red('[ERROR 500] 회원가입 서버 에러 ' + error.message);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
