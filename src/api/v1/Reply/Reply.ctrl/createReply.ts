import { Request, Response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Comment } from '../../../../entity/Comment';
import { Reply } from '../../../../entity/Reply';
import { validateCreateReply } from '../../../../lib/validation/Reply/createReply';
import ColorConsole from '../../../../lib/ColorConsole';
import { User } from 'entity/User';

export default async (request: Request, response: Response) => {
	try {
		const requestData = request.body;
		const user: User = request.user;
		const { postIdx, commentIdx, contents } = requestData;

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

		if (!findPost || !findComment) {
			ColorConsole.red(`[ERROR 404] 해당 게시글 또는 댓글이 없습니다.`);
			return response.status(404).json({
				status: 404,
				message: '해당 게시글 또는 댓글이 없습니다.',
			});
		}

		const reply: Reply = new Reply();
		reply.post_idx = postIdx;
		reply.contents = contents;
		reply.replied_at = new Date();
		reply.comment_idx = commentIdx;
		reply.writer = user ? user.name : null;

		await replyRepository.save(reply);
		ColorConsole.green(`[200] 답글 작성을 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '답글 작성을 성공하였습니다.',
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
