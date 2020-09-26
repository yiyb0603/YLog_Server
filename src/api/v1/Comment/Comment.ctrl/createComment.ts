import { Request, Response } from 'express';
import validate from '../../../../lib/validation/validate';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Comment } from '../../../../entity/Comment';
import { validateCreateComment } from '../../../../lib/validation/Comment/createComment';
import { User } from 'entity/User';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const { postIdx, contents } = request.body;

		const user: User = request.user;
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
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글입니다.`);
			handleFailed(response, 404, '존재하지 않는 글입니다.');
			return;
		}

		const comment: Comment = new Comment();
		comment.post_idx = postIdx;
		comment.writer = user ? user.name : null;
		comment.contents = contents;
		comment.created_at = new Date();
		comment.updated_at = null;

		await commentRepository.save(comment);
		ColorConsole.green(`[200] 댓글 작성을 성공하였습니다.`);
		handleSuccess(response, 200, '댓글 작성을 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
