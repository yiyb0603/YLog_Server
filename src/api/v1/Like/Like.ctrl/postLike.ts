import { Like } from '../../../../entity/Like';
import { Post } from '../../../../entity/Post';
import { User } from '../../../../entity/User';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const postIdx: number = Number(request.body.postIdx);
    const user: User = request.user;

    const postRepository: Repository<Post> = getRepository(Post);
    const likeRepository: Repository<Like> = getRepository(Like);

    if (!Number.isInteger(postIdx)) {
      ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
      handleFailed(response, 400, '검증 오류입니다.');
      return;
    }

    const post: Post = await postRepository.findOne({
      where: {
        idx: postIdx,
      }
    });

    if (!post) {
      ColorConsole.red(`[ERROR 404] 존재하지 않는 글입니다.`);
      handleFailed(response, 404, '존재하지 않는 글입니다.');
      return;
    }

    const like: Like = new Like();
    like.post = post;
    like.user = user;
    
    await likeRepository.save(like);
    ColorConsole.green(`[200] 글 좋아요를 성공하였습니다.`);
    handleSuccess(response, 200, '글 좋아요를 성공하였습니다.');

  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}