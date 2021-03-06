import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../../../entity/User';
import { ISignInTypes } from 'interface/AuthTypes';
import { validateSignIn } from '../../../../lib/validation/Auth/SignIn';
import { createToken } from '../../../../lib/token';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleSuccess, handleFailed } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const { email, password }: ISignInTypes = request.body;
		const userRepository: Repository<User> = getRepository(User);

		if (!validateSignIn(request, response)) {
			return;
		}

		const userInfo: User = await userRepository.findOne({
			where: {
				email,
				password: password.toLowerCase(),
			},
		});
		
		if (!userInfo) {
			ColorConsole.red(`[ERROR 401] 이메일 또는 비밀번호가 올바르지 않습니다.`);
			handleFailed(response, 401, '이메일 또는 비밀번호가 올바르지 않습니다.');
			return;
		}

		if (!userInfo.isAllow) {
			ColorConsole.red(`[ERROR 401] 현재 승인되지 않은 유저입니다.`);
			handleFailed(response, 401, '현재 승인되지 않은 유저입니다.');
			return;
		}

		const ylogToken: string = await createToken(
			userInfo.idx,
			userInfo.name,
			userInfo.email,
			userInfo.profileImage,
			userInfo.isAdmin,
		);

		ColorConsole.green(`[200]	로그인에 성공하였습니다.`);
		handleSuccess(response, 200, '로그인에 성공하였습니다.', {
			ylogToken,
			userInfo,
		});
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
