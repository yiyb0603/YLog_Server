import { Like } from '../../../../entity/Like';
import { User } from '../../../../entity/User';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const user: User = request.user;
    const { likeIdx } = request.query;

    const likeRepository: Repository<Like> = getRepository(Like);

    const like: Like = await likeRepository.findOne({
      where: {
        idx: likeIdx,
      }
    });

    if (!like) {
      ColorConsole.red(`[ERROR 404] 존재하지 않는 좋아요입니다.`);
      handleFailed(response, 404, '존재하지 않는 좋아요입니다.');
      return;
    }

    if (like.user_idx !== user.idx) {
      ColorConsole.red(`[ERROR 403] 권한이 없습니다.`);
      handleFailed(response, 403, '권한이 없습니다.');
      return;
    }

    await likeRepository.remove(like);
    ColorConsole.green(`[200] 글 좋아요를 취소하였습니다.`);
    handleSuccess(response, 200, '글 좋아요를 취소하였습니다.');

  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}