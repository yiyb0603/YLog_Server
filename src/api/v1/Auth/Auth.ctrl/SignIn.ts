import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../../../entity/User';
import { ISignInTypes } from 'interface/AuthTypes';

export default async (request: Request, response: Response) => {
	try {
		const { id, password }: ISignInTypes = request.body;
		const userRepository: Repository<User> = getRepository(User);

		const userInfo: User = await userRepository.findOne({
			where: {
				id,
				password: password.toLowerCase(),
			},
		});

		if (!id || !password) {
			return response.status(400).json({
				status: 400,
				message: '검증 오류입니다.',
			});
		}

		if (!userInfo) {
			return response.status(401).json({
				status: 401,
				message: '아이디 또는 비밀번호가 올바르지 않습니다.',
			});
		}

		return response.status(200).json({
			status: 200,
			message: '로그인에 성공하였습니다.',
			data: {
				userInfo,
			},
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
