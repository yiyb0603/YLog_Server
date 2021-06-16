import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { sha512 } from 'js-sha512';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { Comment } from '../../../../entity/Comment';
import { Post } from '../../../../entity/Post';
import { View } from '../../../../entity/View';
import { Reply } from '../../../../entity/Reply';
import { User } from '../../../../entity/User';
import { Category } from '../../../../entity/Category';

export default async (request: Request, response: Response) => {
	try {
		const idx: number = Number(request.params.idx);
		const postRepository: Repository<Post> = getRepository(Post);
		const userRepository: Repository<User> = getRepository(User);
		const categoryRepository: Repository<Category> = getRepository(Category);
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

		post.user = await userRepository.findOne({
			where: {
				idx: post.fk_user_idx,
			},
		});

		post.category = await categoryRepository.findOne({
			where: {
				idx: post.fk_category_idx,
			},
		});

		const commentCount: number = await commentRepository.count({
			where: {
				fk_post_idx: idx,
			},
		});

		const replyCount: number = await replyRepository.count({
			where: {
				fk_post_idx: idx,
			},
		});

		commentLength += (commentCount + replyCount);
		post.commentCount = commentLength;
		commentLength = 0;

		const userExistView = await viewRepository.findOne({
			where: {
				userIp: encryptionIp,
				fk_post_idx: post.idx,
			},
		});

		if (!userExistView) {
			const view: View = new View();
			view.userIp = encryptionIp;
			view.post = post;

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
