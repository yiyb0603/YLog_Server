import { Request, Response } from 'express';
import { getRepository, Repository, ConnectionOptionsReader } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Category } from '../../../../entity/Category';
import { validateModifyPost } from '../../../../lib/validation/Post/modifyPost';
import ColorConsole from '../../../../lib/ColorConsole';

export default async (request: Request, response: Response) => {
	try {
		const {
			idx,
			title,
			contents,
			writer,
			thumbnail,
			updatedAt,
			categoryIdx,
		} = request.body;

		const postRepository: Repository<Post> = getRepository(Post);
		const categoryRepository: Repository<Category> = getRepository(Category);

		if (!validateModifyPost(request, response)) {
			return;
		}

		const findPost: Post = await postRepository.findOne({
			where: {
				idx,
			},
		});

		const findCategory: Category = await categoryRepository.findOne({
			where: {
				idx: categoryIdx,
			},
		});

		if (!findPost || !findCategory) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 글 또는 카테고리 입니다.`);
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 글 또는 카테고리 입니다.',
			});
		}

		const post: Post = new Post();
		post.idx = idx;
		post.title = title || post.title;
		post.contents = contents || post.contents;
		post.writer = writer || post.writer;
		post.thumbnail = thumbnail || post.thumbnail || 'null';
		post.category_idx = categoryIdx || post.category_idx;
		post.updated_at = updatedAt;

		await postRepository.save(post);
		ColorConsole.green(`[200] 글 수정에 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '글 수정에 성공하였습니다.',
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
