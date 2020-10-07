import { User } from '../../../../entity/User';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const { isAllow } = request.query;
		const userRepository: Repository<User> = getRepository(User);

		if (!isAllow) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
			return;
		}

		const members: User[] = await userRepository.find({
			where: {
				is_allow: isAllow,
			},
		});

		ColorConsole.green(`[200] 멤버 목록 조회를 성공하였습니다.`);
		handleSuccess(response, 200, '멤버 목록 조회를 성공하였습니다.', {
			members,
		});
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
