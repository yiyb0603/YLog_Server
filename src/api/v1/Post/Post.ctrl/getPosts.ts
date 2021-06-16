import { Post } from '../../../../entity/Post';
import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { getRepository, Repository } from 'typeorm';
import { Comment } from '../../../../entity/Comment';
import { View } from '../../../../entity/View';
import { Reply } from '../../../../entity/Reply';
import { Like } from '../../../../entity/Like';
import { Category } from '../../../../entity/Category';
import { User } from '../../../../entity/User';

export default async (request: Request, response: Response) => {
	try {
		const postRepository: Repository<Post> = getRepository(Post);
		const commentRepository: Repository<Comment> = getRepository(Comment);
		const replyRepository: Repository<Reply> = getRepository(Reply);
		const viewRepository: Repository<View> = getRepository(View);
		const likeRepostory: Repository<Like> = getRepository(Like);
		const userRepository: Repository<User> = getRepository(User);
		const categoryRepository: Repository<Category> = getRepository(Category);

		let commentLength: number = 0;
		let viewCount: number = 0;
		let likeCount: number = 0;

		const posts: Post[] = await postRepository.find({
			select: [
				'idx',
				'category',
				'introduction',
				'createdAt',
				'thumbnail',
				'title',
				'user',
				'updatedAt',
				'fk_category_idx',
				'fk_user_idx',
				'isTemp',
			],

			order: {
				createdAt: 'DESC',
			},
		});

		for (let i = 0; i < posts.length; i++) {
			posts[i].category = await categoryRepository.findOne({
				where: {
					idx: posts[i].fk_category_idx,
				},
			});

			posts[i].user = await userRepository.findOne({
				where: {
					idx: posts[i].fk_user_idx,
				},
			});

			const commentCount: number = await commentRepository.count({
				where: {
					fk_post_idx: posts[i].idx,
				},
			});

			const replyCount: number = await replyRepository.count({
				where: {
					fk_post_idx: posts[i].idx,
				},
			});

			commentLength += commentCount + replyCount;
			posts[i].commentCount = commentLength;
			commentLength = 0;

			const viewNumber: number = await viewRepository.count({
				where: {
					fk_post_idx: posts[i].idx,
				},
			});

			viewCount += viewNumber;
			posts[i].viewCount = viewCount;
			viewCount = 0;

			const likeNumber: number = await likeRepostory.count({
				where: {
					fk_post_idx: posts[i].idx,
				},
			});

			likeCount += likeNumber;
			posts[i].likeCount = likeCount;
			likeCount = 0;

			viewCount += viewNumber;
			posts[i].viewCount = viewCount;
			viewCount = 0;
		}

		ColorConsole.green(`[200] 글 목록 조회를 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '글 목록 조회를 성공하였습니다.',
			data: {
				posts,
			},
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
