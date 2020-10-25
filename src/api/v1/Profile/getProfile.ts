import { User } from '../../../entity/User';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const userIdx: number = Number(request.query.userIdx);
    const userRepository: Repository<User> = getRepository(User);

    if (!Number.isInteger(userIdx)) {
      ColorConsole.red(`[ERROR 400] 검증 오류입니다`);
      handleFailed(response, 400, '검증 오류입니다.');
    }

    const user: User = await userRepository.findOne({
      where: {
        idx: userIdx,
      },
    });

    if (!user) {
      ColorConsole.red(`[ERROR 404] 존재하지 않는 유저입니다.`);
      handleFailed(response, 404, '존재하지 않는 유저입니다.');
      return;
    }

    ColorConsole.green(`[200] 회원 조회를 성공하였습니다.`);
    handleSuccess(response, 200, '회원 조회를 성공하였습니다.', { user });
    return;
  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다.`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}