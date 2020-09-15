import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Category } from '../../../../entity/Category';
import { validateCreatePost } from '../../../../lib/validation/Post/createPost';
import { decodeToken } from '../../../../lib/token';
import ColorConsole from '../../../../lib/ColorConsole';

export default async (request: Request, response: Response) => {
	try {
		const { title, contents, thumbnail, categoryIdx } = request.body;

		const postRepository: Repository<Post> = getRepository(Post);
		const categoryRepository: Repository<Category> = getRepository(Category);
		const writerToken: any = decodeToken(request.headers['y-log-token']);

		if (!validateCreatePost(request, response)) {
			return;
		}

		if (!writerToken) {
			ColorConsole.red(`[ERROR 401] 토큰이 전송되지 않았습니다.`);
			return response.status(401).json({
				status: 401,
				message: '토큰이 전송되지 않았습니다.',
			});
		}

		const existsCategory: Category = await categoryRepository.findOne({
			where: {
				idx: categoryIdx,
			},
		});

		if (!existsCategory) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 카테고리입니다.`);
			return response.status(404).json({
				status: 404,
				message: '존재하지 않는 카테고리입니다.',
			});
		}

		const post: Post = new Post();
		post.category_idx = existsCategory.idx;
		post.title = title;
		post.writer = writerToken.name;
		post.contents = contents;
		post.thumbnail = thumbnail || null;
		post.created_at = new Date();

		await postRepository.save(post);
		ColorConsole.green(`[200] 글 생성에 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '글 생성에 성공하였습니다',
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
