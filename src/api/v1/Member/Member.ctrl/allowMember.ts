import { User } from '../../../../entity/User';
import { Request, Response } from 'express';
import { validateAllowMember } from '../../../../lib/validation/Member/allowMember';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const { memberIdx } = request.body;

		const userRepository: Repository<User> = getRepository(User);

		if (!validateAllowMember(request, response)) {
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

		member.isAdmin = true;
		member.joinedAt = new Date();
		await userRepository.save(member);

		ColorConsole.green(`[200] 회원 가입 승인을 성공하였습니다.`);
		handleSuccess(response, 200, '회원 가입 승인을 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
