import { Request, Response } from 'express';
import { User } from '../../../../entity/User';
import { getRepository, Repository } from 'typeorm';
import { Comment } from '../../../../entity/Comment';
import { Post } from '../../../../entity/Post';
import { validateModifyComment } from '../../../../lib/validation/Comment/modifyComment';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const { idx, postIdx, contents, isPrivate } = request.body;

		const commentRepository: Repository<Comment> = getRepository(Comment);
		const postRepository: Repository<Post> = getRepository(Post);
		const user: User = request.user || null;

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

		if (!user || findComment.user.idx !== user.idx) {
			ColorConsole.red(`[ERROR 403] 댓글을 수정할 권한이 없습니다.`);
			handleFailed(response, 403, '댓글을 수정할 권한이 없습니다.');
			return;
		}

		if (!findComment || !findPost) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글 혹은 댓글입니다.`);
			handleFailed(response, 404, '존재하지 않는 글 혹은 댓글입니다.');
			return;
		}

		const comment: Comment = new Comment();
		comment.idx = idx;
		comment.post = findPost;
		comment.contents = contents || comment.contents;
		comment.is_private = isPrivate;

		await commentRepository.save(comment);
		ColorConsole.green(`[200] 댓글 수정을 성공하였습니다.`);
		handleSuccess(response, 200, '댓글 수정을 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
