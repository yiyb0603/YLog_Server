import 'dotenv/config';
import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const { adminCode } = request.body;
    const { ADMIN_CODE } = process.env;

    if (!adminCode) {
      ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
      handleFailed(response, 400, '검증 오류입니다.');
      return;
    }

    if (adminCode !== ADMIN_CODE) {
      ColorConsole.red(`[ERROR 401] 어드민 코드가 올바르지 않습니다.`);
      handleFailed(response, 401, '어드민 코드가 올바르지 않습니다.');
      return;
    }

    ColorConsole.green(`[200] 어드민 인증을 성공하였습니다.`);
    handleSuccess(response, 200, '어드민 인증을 성공하였습니다.');
    return;
  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}