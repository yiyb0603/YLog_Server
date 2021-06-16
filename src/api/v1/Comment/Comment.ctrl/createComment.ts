import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Comment } from '../../../../entity/Comment';
import { validateCreateComment } from '../../../../lib/validation/Comment/createComment';
import { User } from '../../../../entity/User';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import SendFCM from '../../../../lib/util/SendFCM';

export default async (request: Request, response: Response) => {
	try {
		const { postIdx, contents, isPrivate } = request.body;
		const user: User = request.user;

		const userRepository: Repository<User> = getRepository(User);
		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);

		if (!validateCreateComment(request, response)) {
			return;
		}

		const post: Post = await postRepository.findOne({
			where: {
				idx: postIdx,
			},
		});

		if (post.isTemp) {
			ColorConsole.red(`[ERROR 401] 임시저장 글에는 댓글 작성이 불가능합니다.`);
			handleFailed(response, 401, '임시저장 글에는 댓글 작성이 불가능합니다.');
			return;
		}

		if (!post) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글입니다.`);
			handleFailed(response, 404, '존재하지 않는 글입니다.');
			return;
		}

		const postWriter: User = await userRepository.findOne({
			where: {
				idx: post.fk_user_idx,
			},
		});

		const comment: Comment = new Comment();
		comment.post = post;
		comment.user = user;
		comment.contents = contents;
		comment.createdAt = new Date();
		comment.updatedAt = null;
		comment.isPrivate = isPrivate;

		if ((!user || postWriter.idx !== user.idx) && postWriter.fcmAllow) {
			const { fcmToken } = postWriter;

			SendFCM(
				fcmToken,
				user
					? `${user.name}님이 댓글을 작성하였습니다.`
					: '게스트님이 댓글을 작성하였습니다.',
				contents.length > 16
					? contents.substring(0, 16).concat('...')
					: contents
			);
		}

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
