import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Category } from '../../../../entity/Category';
import { validateCreatePost } from '../../../../lib/validation/Post/createPost';

export default async (request: Request, response: Response) => {
	try {
		const { title, contents, writer, thumbnail, categoryIdx } = request.body;

		const postRepository: Repository<Post> = getRepository(Post);
		const categoryRepository: Repository<Category> = getRepository(Category);

		if (!validateCreatePost(request, response)) {
			return;
		}

		const existsCategory: Category = await categoryRepository.findOne({
			where: {
				idx: categoryIdx,
			},
		});

		if (!existsCategory) {
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 카테고리입니다.',
			});
		}

		const post: Post = new Post();
		post.category_idx = existsCategory.idx;
		post.title = title;
		post.contents = contents;
		post.writer = writer;
		post.thumbnail = thumbnail || 'null';
		post.created_at = new Date();

		await postRepository.save(post);
		return response.status(200).json({
			status: 200,
			message: '글 생성에 성공하였습니다',
		});
	} catch (error) {
		console.log(error.message);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
