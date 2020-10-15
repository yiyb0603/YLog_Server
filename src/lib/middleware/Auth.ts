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
	try {
		const user: User = await validateAuth(request, response);

		if (!user || !user.is_admin) {
			ColorConsole.red(`[ERROR 403] 권한이 없습니다.`);
			handleFailed(response, 403, '권한이 없습니다.');
			return;
		}

		request.user = user;
		next();
	} catch (error) {
		switch (error.message) {
			case 'jwt must be provided':
			case 'TOKEN_IS_ARRAY':
			case 'NO_TOKEN':
			case 'INVALID_TOKEN':
			case 'NO_USER':
				ColorConsole.red(`[ERROR 401] 올바르지 않은 토큰입니다.`);
				handleFailed(response, 401, '올바르지 않은 토큰입니다.');
				return;
			case 'EXPIRED_TOKEN':
				ColorConsole.red(`[ERROR 410] 토큰이 만료되었습니다.`);
				handleFailed(response, 410, '토큰이 만료되었습니다.');
				return;
			default:
				ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
				handleFailed(response, 500, '서버 오류입니다.');
				return;
		}
	}
};

const validateUser = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		const user: User = await validateAuth(request, response);
		request.user = user;
		next();
	} catch (error) {
		switch (error.message) {
			case 'TOKEN_IS_ARRAY':
			case 'NO_TOKEN':
			case 'INVALID_TOKEN':
			case 'NO_USER':
				ColorConsole.red(`[ERROR 401] 토큰이 올바르지 않습니다.`);
				handleFailed(response, 401, '토큰이 올바르지 않습니다.');
				return;
			case 'EXPIRED_TOKEN':
				ColorConsole.red(`[ERROR 410] 토큰이 만료되었습니다.`);
				handleFailed(response, 410, '토큰이 만료되었습니다.');
				return;
			default:
				ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
				handleFailed(response, 500, '서버 오류입니다.');
				return;
		}
	}
};

const validateGuest = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		const user: User = await validateAuth(request, response);
		request.user = user;
		next();
	} catch (error) {
		switch (error.message) {
			case 'jwt must be provided':
			case 'TOKEN_IS_ARRAY':
			case 'NO_TOKEN':
			case 'INVALID_TOKEN':
			case 'NO_USER':
			case 'EXPIRED_TOKEN':
				return next();

			default:
				ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
				handleFailed(response, 500, '서버 오류입니다.');
				return;
		}
	}
};

const validateAuth = async (request: Request, response: Response) => {
	const requestToken: string = request.headers['ylog-token'];

	try {
		const decodeToken: any = await verifyToken(requestToken);

		const userRepository: Repository<User> = getRepository(User);
		const user: User = await userRepository.findOne({
			where: {
				idx: decodeToken.idx,
			},
		});

		return user;
	} catch (error) {
		switch (error.message) {
			case 'jwt must be provided':
			case 'jwt malformed':
			case 'invalid token':
			case 'invalid signature':
			case 'jwt expired':
			default:
				throw error;
		}
	}
};

export default {
	validateAdmin,
	validateAuth,
	validateUser,
	validateGuest,
};
