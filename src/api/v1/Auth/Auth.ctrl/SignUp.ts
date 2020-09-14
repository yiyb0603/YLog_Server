import { Request, Response } from 'express';
import { User } from '../../../../entity/User';
import { getRepository, Repository } from 'typeorm';
import { ISignUpTypes } from 'interface/AuthTypes';
import { sha512 } from 'js-sha512';
import ColorConsole from '../../../../lib/ColorConsole';
import { validateSignUp } from '../../../../lib/validation/Auth/SignUp';

export default async (request: Request, response: Response) => {
	try {
		const requestData: ISignUpTypes = request.body;
		const userRepository: Repository<User> = getRepository(User);

		if (!validateSignUp(request, response)) {
			return;
		}

		const isExists: User = await userRepository.findOne({
			where: [
				{
					id: requestData.id,
				},
				{
					email: requestData.email,
				},
			],
		});

		if (isExists) {
			ColorConsole.red(`[ERROR 409] 중복된 아이디 혹은 이메일입니다.`);
			return response.status(409).json({
				status: 409,
				message: '중복된 아이디 혹은 이메일입니다.',
			});
		}

		requestData.password = sha512(requestData.password);
		await userRepository.save(requestData);

		ColorConsole.green('[POST] 회원가입 성공');
		return response.status(200).json({
			status: 200,
			message: '회원가입에 성공하였습니다.',
		});
	} catch (error) {
		ColorConsole.red('[ERROR 500] 회원가입 서버 에러 ' + error.message);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
