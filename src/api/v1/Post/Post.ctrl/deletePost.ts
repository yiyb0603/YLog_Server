import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../../../../entity/Post';

export default async (request: Request, response: Response) => {
	try {
		const { idx } = request.query;

		if (isNaN(idx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			return response.status(400).json({
				status: 400,
				message: '검증 오류입니다.',
			});
		}

		const postRepository: Repository<Post> = getRepository(Post);
		const findPost: Post = await postRepository.findOne({
			where: {
				idx,
			},
		});

		if (!findPost) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글입니다.`);
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 글입니다.',
			});
		}

		await postRepository.remove(findPost);
		ColorConsole.green(`[200] 글 삭제를 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '글 삭제를 성공하였습니다.',
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
