import { Post } from '../../../../entity/Post';
import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { getRepository, Repository } from 'typeorm';
import { Comment } from '../../../../entity/Comment';

export default async (request: Request, response: Response) => {
	try {
		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);

		let commentLength: number = 0;

		const posts: Post[] = await postRepository.find({
			select: [
				'idx',
				'category_idx',
				'introduction',
				'created_at',
				'thumbnail',
				'title',
				'writer',
				'writer_id',
				'updated_at',
			],
		});

		for (let i = 0; i < posts.length; i++) {
			const count: number = await commentRepository.count({
				where: {
					post_idx: posts[i].idx,
				},
			});

			commentLength += count;
			posts[i].comment_length = commentLength;
			commentLength = 0;
		}

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
