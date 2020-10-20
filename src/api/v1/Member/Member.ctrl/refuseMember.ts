import { User } from '../../../../entity/User';
import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { validateRefuseMember } from '../../../../lib/validation/Member/refuseMember';
import { getRepository, Repository } from 'typeorm';

export default async (request: Request, response: Response) => {
	try {
		const { memberIdx } = request.body;

		const userRepository: Repository<User> = getRepository(User);

		if (!validateRefuseMember(request, response)) {
			return;
		}

		const member: User = await userRepository.findOne({
			where: {
				idx: memberIdx,
			},
		});

		if (!member) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 유저입니다.`);
			handleFailed(response, 404, '존재하지 않는 유저입니다.');
			return;
		}

		member.is_allow = false;
		await userRepository.save(member);

		ColorConsole.green(`[200] 회원 가입 거절을 성공하였습니다.`);
		handleSuccess(response, 200, '회원 가입 거절을 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
