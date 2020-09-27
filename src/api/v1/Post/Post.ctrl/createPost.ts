import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../../../../entity/Post';
import { Category } from '../../../../entity/Category';
import { validateCreatePost } from '../../../../lib/validation/Post/createPost';
import { decodeToken } from '../../../../lib/token';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { User } from 'entity/User';

export default async (request: Request, response: Response) => {
	try {
		const {
			title,
			contents,
			thumbnail,
			categoryIdx,
			introduction,
		} = request.body;
		const user: User = request.user;

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
			ColorConsole.red(`[ERROR 404] 존재하지 않는 카테고리입니다.`);
			return handleFailed(response, 404, '존재하지 않는 카테고리입니다.');
		}

		const post: Post = new Post();
		post.category_idx = existsCategory.idx;
		post.title = title;
		post.introduction = introduction;
		post.writer = user ? user.name : '관리자';
		post.writer_id = user ? user.id : '관리자';
		post.contents = contents;
		post.thumbnail = thumbnail || null;
		post.created_at = new Date();

		await postRepository.save(post);
		ColorConsole.green(`[200] 글 생성에 성공하였습니다.`);
		return handleSuccess(response, 200, '글 생성에 성공하였습니다.');
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return handleFailed(response, 500, '서버 오류입니다.');
	}
};
