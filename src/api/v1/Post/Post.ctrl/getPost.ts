import { Post } from '../../../../entity/Post';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { Comment } from '../../../../entity/Comment';
import { View } from '../../../../entity/View';
import { sha512 } from 'js-sha512';
import { Reply } from '../../../../entity/Reply';

export default async (request: Request, response: Response) => {
	try {
		const idx = Number(request.params.idx);
		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);
		const viewRepository: Repository<View> = getRepository(View);
		const replyRepository: Repository<Reply> = getRepository(Reply);

		const userIp: string = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
		const encryptionIp = sha512(userIp);
		let commentLength: number = 0;

		if (!Number.isInteger(idx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			return handleFailed(response, 400, '검증 오류입니다.');
		}

		const post: Post = await postRepository.findOne({
			where: {
				idx,
			},
		});

		if (!post) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글입니다.`);
			return handleFailed(response, 404, '존재하지 않는 글입니다.');
		}

		const commentCount: number = await commentRepository.count({
			where: {
				post_idx: idx,
			},
		});

		const replyCount: number = await replyRepository.count({
			where: {
				post_idx: idx,
			}
		});

		commentLength += commentCount + replyCount;
		post.comment_length = commentLength;
		commentLength = 0;

		const userExistView = await viewRepository.findOne({
			where: {
				user_ip: encryptionIp,
				post_idx: post.idx,
			}
		});

		if (!userExistView) {
			const view: View = new View();
			view.user_ip = encryptionIp;
			view.post_idx = post.idx;

			await viewRepository.save(view);
		}

		ColorConsole.green(`[200] 글 조회를 성공하였습니다.`);
		return handleSuccess(response, 200, '글 조회를 성공하였습니다.', {
			post,
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
