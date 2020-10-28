import { Request, Response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Comment } from '../../../../entity/Comment';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { User } from '../../../../entity/User';

export default async (request: Request, response: Response) => {
	try {
		const postIdx: number = Number(request.query.postIdx);
		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);
		const userRepository: Repository<User> = getRepository(User);

		if (isNaN(postIdx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
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

		const comments: Comment[] = await commentRepository.find({
			select: [
				'idx',
				'contents',
				'created_at',
				'post_idx',
				'writer',
				'writer_idx',
				'writer_profile',
				'updated_at',
				'is_private',
			],

			where: {
				post_idx: postIdx,
			},
		});

		for (let i = 0; i < comments.length; i++) {
			const userProfiles: User = await userRepository.findOne({ 
				where: {
					idx: comments[i].writer_idx,
				},
			});

			if (comments[i].writer_profile) {
				comments[i].writer_profile = userProfiles.profile_image;
			}
		}
		

		ColorConsole.green(`[200] 댓글 목록 조회에 성공하였습니다.`);
		handleSuccess(response, 200, '댓글 목록 조회에 성공하였습니다.', {
			comments,
		});
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
