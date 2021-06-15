import { User } from '../../../../entity/User';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const { memberIdx } = request.query;

		const userRepository: Repository<User> = getRepository(User);

		if (!memberIdx) {
			ColorConsole.red(`[400] 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
			return;
		}

		const member: User = await userRepository.findOne({
			where: {
				idx: memberIdx,
			},
		});

		if (!member) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 멤버입니다.`);
			handleFailed(response, 404, '존재하지 않는 유저입니다.');
			return;
		}

		await userRepository.remove(member);
		ColorConsole.green(`[200] 멤버 삭제를 성공하였습니다.`);
		handleSuccess(response, 200, '멤버 삭제를 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
