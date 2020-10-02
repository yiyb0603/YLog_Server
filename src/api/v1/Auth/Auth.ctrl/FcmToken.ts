import { User } from '../../../../entity/User';
import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { getRepository, Repository } from 'typeorm';

export default async (request: Request, response: Response) => {
	try {
		const { fcmToken } = request.body;
		const user: User = request.user;

		const userRepository: Repository<User> = getRepository(User);

		if (!fcmToken) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
			return;
		}

		user.fcm_allow = true;
		user.fcm_token = fcmToken;

		await userRepository.save(user);
		ColorConsole.green('[200] FCM 토큰을 저장하였습니다.');
		handleSuccess(response, 200, 'FCM 토큰을 저장하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
