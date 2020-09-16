import { Comment } from '../../../../entity/Comment';
import { Post } from '../../../../entity/Post';
import { Reply } from '../../../../entity/Reply';
import { Request, Response } from 'express';
import { validateModifyReply } from '../../../../lib/validation/Reply/modifyReply';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';

export default async (request: Request, response: Response) => {
	try {
		const { idx, commentIdx, postIdx, contents, updatedAt } = request.body;

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
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 분류의 답글 입니다.',
			});
		}

		const reply: Reply = new Reply();
		reply.idx = idx;
		reply.comment_idx = commentIdx;
		reply.contents = contents;
		reply.post_idx = postIdx;
		reply.updated_at = updatedAt;

		await replyRepository.save(reply);
		ColorConsole.green(`[200] 답글 수정에 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '답글 수정에 성공하였습니다.',
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다.`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
