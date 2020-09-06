import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../../../../entity/Post';

export default async (request: Request, response: Response) => {
	try {
		const { idx } = request.query;

		const postRepository: Repository<Post> = getRepository(Post);
		const findPost: Post = await postRepository.findOne({
			where: {
				idx,
			},
		});

		if (!findPost) {
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 글입니다.',
			});
		}

		await postRepository.remove(findPost);
		return response.status(200).json({
			status: 200,
			message: '글 삭제에 성공하였습니다.',
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 에러입니다.',
		});
	}
};
