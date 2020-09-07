import { Request, Response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Comment } from '../../../../entity/Comment';

export default async (request: Request, response: Response) => {
	try {
		const { postIdx } = request.query;
		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);

		if (isNaN(postIdx)) {
			return response.status(400).json({
				status: 400,
				message: '검증 오류입니다.',
			});
		}

		const findPost: Post = await postRepository.findOne({
			where: {
				idx: postIdx,
			},
		});

		if (!findPost) {
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 글입니다.',
			});
		}

		const comments: Comment[] = await commentRepository.find({
			select: [
				'idx',
				'contents',
				'created_at',
				'post_idx',
				'writer',
				'updated_at',
			],
		});

		return response.status(200).json({
			status: 200,
			message: '댓글 목록 조회에 성공하였습니다.',
			data: {
				comments,
			},
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
