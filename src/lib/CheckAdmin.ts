import { Response } from 'express';
import * as Jwt from 'jsonwebtoken';
import { handleFailed } from './Response';

const checkAdmin = (response: Response, token: string) => {
	const parseToken: any = Jwt.decode(token);

	if (!parseToken.is_admin) {
		handleFailed(response, 409, '수행할 권한이 없습니다.');
		return false;
	}

	return true;
};

export default checkAdmin;
