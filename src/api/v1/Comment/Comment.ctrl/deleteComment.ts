import { Request, Response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { Comment } from '../../../../entity/Comment';

export default async (request: Request, response: Response) => {
	try {
		const { idx } = request.query;

		const commentRepository: Repository<Comment> = getRepository(Comment);

		if (isNaN(idx)) {
			return response.status(400).json({
				status: 400,
				message: '검증 오류입니다.',
			});
		}

		const findComment: Comment = await commentRepository.findOne({
			where: {
				idx,
			},
		});

		if (!findComment) {
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 댓글입니다.',
			});
		}

		await commentRepository.remove(findComment);
		return response.status(200).json({
			status: 200,
			message: '댓글 삭제를 성공하였습니다.',
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
