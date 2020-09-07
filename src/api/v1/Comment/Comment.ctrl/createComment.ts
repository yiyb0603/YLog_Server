import { Request, Response } from 'express';
import validate from '../../../../lib/validation/validate';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Comment } from '../../../../entity/Comment';
import { validateCreateComment } from '../../../../lib/validation/Comment/createComment';

export default async (request: Request, response: Response) => {
	try {
		const { postIdx, writer, contents } = request.body;

		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);

		if (!validateCreateComment(request, response)) {
			return;
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

		const comment: Comment = new Comment();
		comment.post_idx = postIdx;
		comment.writer = writer;
		comment.contents = contents;
		comment.created_at = new Date();

		await commentRepository.save(comment);
		return response.status(200).json({
			status: 200,
			message: '댓글 작성을 성공하였습니다',
		});
	} catch (error) {
		console.log(error.message);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
