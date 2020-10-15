import 'dotenv/config';
import { User } from '../../../../entity/User';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const { email } = request.body;
    const userRepository: Repository<User> = getRepository(User);

    if (!email) {
      ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
      handleFailed(response, 400, '검증 오류입니다.');
      return;
    }

    const existUser: User = await userRepository.findOne({
      where: {
        email,
      }
    });

    if (existUser) {
      ColorConsole.red(`[ERROR 409] 이미 존재하는 이메일 입니다.`);
      handleFailed(response, 409, '이미 존재하는 이메일 입니다.');
      return;
    }

    ColorConsole.green(`[200] 이메일 중복 인증을 성공하였습니다.`);
    handleSuccess(response, 200, '이메일 중복 인증을 성공하였습니다.');
    return;
  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}