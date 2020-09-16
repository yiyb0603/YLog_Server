import { Post } from '../../../../entity/Post';
import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { getRepository, Repository } from 'typeorm';

export default async (request: Request, response: Response) => {
	try {
		const postRepository: Repository<Post> = getRepository(Post);
		const posts: Post[] = await postRepository.find({
			select: [
				'idx',
				'category_idx',
				'contents',
				'created_at',
				'thumbnail',
				'title',
				'writer',
			],
		});

		ColorConsole.green(`[200] 글 목록 조회를 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '글 목록 조회를 성공하였습니다.',
			data: {
				posts,
			},
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
