import { Request, Response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Comment } from '../../../../entity/Comment';
import { Reply } from '../../../../entity/Reply';
import { validateCreateReply } from '../../../../lib/validation/Reply/createReply';
import ColorConsole from '../../../../lib/ColorConsole';
import { User } from '../../../../entity/User';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import SendFCM from '../../../../lib/util/SendFCM';

export default async (request: Request, response: Response) => {
	try {
		const requestData = request.body;
		const user: User = request.user;
		const { postIdx, commentIdx, contents } = requestData;

		const userRepository: Repository<User> = getRepository(User);
		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);
		const replyRepository: Repository<Reply> = getRepository(Reply);

		if (!validateCreateReply(request, response)) {
			return;
		}

		const findPost: Post = await postRepository.findOne({
			where: {
				idx: postIdx,
			},
		});

		const findComment: Comment = await commentRepository.findOne({
			where: {
				idx: commentIdx,
			},
		});

		const commentWriter: User = await userRepository.findOne({
			where: {
				id: findComment.writer_id,
			},
		});

		if (!findPost || !findComment) {
			ColorConsole.red(`[ERROR 404] 해당 게시글 또는 댓글이 없습니다.`);
			handleFailed(response, 404, '해당 게시글 또는 댓글이 없습니다.');
			return;
		}

		const reply: Reply = new Reply();
		reply.post_idx = postIdx;
		reply.contents = contents;
		reply.replied_at = new Date();
		reply.comment_idx = commentIdx;
		reply.writer = user ? user.name : null;
		reply.writer_id = user ? user.id : null;

		if (
			commentWriter &&
			commentWriter.id !== user.id &&
			commentWriter.fcm_allow
		) {
			const { fcm_token } = commentWriter;

			SendFCM(
				fcm_token,
				user
					? `${user.name}님이 답글을 남기셨습니다.`
					: '게스트님이 답글을 남기셨습니다.',
				contents.length > 16
					? contents.substring(0, 16).concat('...')
					: contents
			);
		}

		await replyRepository.save(reply);
		ColorConsole.green(`[200] 답글 작성을 성공하였습니다.`);
		handleSuccess(response, 200, '답글 작성을 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
