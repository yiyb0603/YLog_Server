import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Comment } from '../../../../entity/Comment';
import { Post } from '../../../../entity/Post';
import { validateModifyComment } from '../../../../lib/validation/Comment/modifyComment';

export default async (request: Request, response: Response) => {
	try {
		const { idx, postIdx, contents } = request.body;

		const commentRepository: Repository<Comment> = getRepository(Comment);
		const postRepository: Repository<Post> = getRepository(Post);

		if (!validateModifyComment(request, response)) {
			return;
		}

		const findComment: Comment = await commentRepository.findOne({
			where: {
				idx,
			},
		});

		const findPost: Post = await postRepository.findOne({
			where: {
				idx: postIdx,
			},
		});

		if (!findComment || !findPost) {
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 글 혹은 댓글입니다.',
			});
		}

		const comment: Comment = new Comment();
		comment.idx = idx;
		comment.post_idx = postIdx;
		comment.contents = contents || comment.contents;
		comment.updated_at = new Date();

		await commentRepository.save(comment);
		return response.status(200).json({
			status: 200,
			message: '댓글 수정을 성공하였습니다.',
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
