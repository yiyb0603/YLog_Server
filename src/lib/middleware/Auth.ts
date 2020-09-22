import { User } from '../../entity/User';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../token';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../ColorConsole';
import { handleFailed } from '../Response';

const validateAdmin = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const user: User = await validateAuth(request, response);

	if (user.is_admin === undefined || !user.is_admin) {
		ColorConsole.red(`[ERROR 403] 권한이 없습니다.`);
		handleFailed(response, 403, '권한이 없습니다.');
		return;
	}

	request.user = user;
	next();
};

const validateAuth = async (request: Request, response: Response) => {
	const requestToken: string = request.headers['y-log-token'];

	try {
		const decodeToken: any = await verifyToken(requestToken);

		const userRepository: Repository<User> = getRepository(User);
		const user: User = await userRepository.findOne({
			where: {
				id: decodeToken.id,
			},
		});

		if (!user) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 유저입니다.`);
			handleFailed(response, 404, '존재하지 않는 유저입니다.');
			return;
		}

		return user;
	} catch (error) {
		switch (error.message) {
			case 'jwt must be provided':
				ColorConsole.red(`[ERROR 401] 토큰이 전송되지 않았습니다.`);
				handleFailed(response, 401, '토큰이 전송되지 않았습니다.');
				return;

			case 'jwt malformed':
			case 'invalid token':
			case 'invalid signature':
				ColorConsole.red(`[ERROR 401] 위조된 토큰입니다.`);
				handleFailed(response, 401, '위조된 토큰입니다.');
				return;

			case 'jwt expired':
				ColorConsole.red(`[ERROR 410] 토큰이 만료되었습니다.`);
				handleFailed(response, 401, '토큰이 만료되었습니다.');
				return;

			default:
				ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
				handleFailed(response, 500, '서버 오류입니다.');
				return;
		}
	}
};

export default {
	validateAdmin,
};
