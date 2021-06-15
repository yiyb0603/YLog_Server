import { Like } from '../../../../entity/Like';
import { Post } from '../../../../entity/Post';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const postIdx: number = Number(request.params.postIdx);

    const postRepository: Repository<Post> = getRepository(Post);
    const likeRepository: Repository<Like> = getRepository(Like);

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

    const likes: Like[] = await likeRepository.find({
      select: [
        'idx',
        'user',
        'post',
      ],
      
      where: {
        fk_post_idx: postIdx,
      },
    });

    ColorConsole.green(`[200] 좋아요 목록을 조회하였습니다.`);
    handleSuccess(response, 200, '좋아요 목록을 조회하였습니다.', { likes });
  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}