import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from 'entity/User';
import { Comment } from '../../../../entity/Comment';
import { Post } from '../../../../entity/Post';
import { Reply } from '../../../../entity/Reply';
import { validateModifyReply } from '../../../../lib/validation/Reply/modifyReply';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const { idx, commentIdx, postIdx, contents, isPrivate } = request.body;
		const user: User = request.user;

		const commentRepository: Repository<Comment> = getRepository(Comment);
		const postRepository: Repository<Post> = getRepository(Post);
		const replyRepository: Repository<Reply> = getRepository(Reply);

		if (!validateModifyReply(request, response)) {
			return;
		}

		const findReply: Reply = await replyRepository.findOne({
			where: {
				idx,
			},
		});

		const findComment: Comment = await commentRepository.findOne({
			where: {
				idx: commentIdx,
			},
		});

		const findPost: Post = await postRepository.findOne({
			where: {
				idx: postIdx,
			},
		});

		if (!findReply || !findComment || !findPost) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 분류의 답글 입니다.`);
			handleFailed(response, 404, '존재하지 않는 분류의 답글 입니다.');
			return;
		}

		if (!user || user.idx !== findReply.fk_user_idx) {
			ColorConsole.red(`[ERROR 403] 답글을 수정할 권한이 없습니다.`);
			handleFailed(response, 403, '답글을 수정할 권한이 없습니다.');
			return;
		}

		findReply.comment = findComment;
		findReply.contents = contents;
		findReply.post = findPost;
		findReply.isPrivate = isPrivate;

		await replyRepository.save(findReply);
		ColorConsole.green(`[200] 답글 수정을 성공하였습니다.`);
		handleSuccess(response, 200, '답글 수정을 성공하였습니다.');
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
