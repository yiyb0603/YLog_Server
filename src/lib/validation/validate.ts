import { Request, Response } from 'express';
import ColorConsole from '../../lib/ColorConsole';

export default (request: Request, response: Response, schema: any): boolean => {
	const validation = schema.validate(request.body);

	if (validation.error) {
		ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
		response.status(400).json({
			status: 400,
			message: '검증 오류입니다.',
		});

		return false;
	}
	return true;
};
