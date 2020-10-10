import { Release } from 'entity/Release';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const idx: number = Number(request.query.idx);
    const releaseRepository: Repository<Release> = getRepository(Release);

    if (!Number.isInteger(idx)) {
      ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
      handleFailed(response, 400, '검증 오류입니다.');
      return;
    }

    const release: Release = await releaseRepository.findOne({
      where: {
        idx
      }
    });

    if (!idx) {
      ColorConsole.red(`[ERROR 404] 존재하지 않는 릴리즈노트 입니다.`);
      handleFailed(response, 404, '존재하지 않는 릴리즈노트 입니다.');
      return;
    }

    await releaseRepository.remove(release);
    ColorConsole.green(`[200] 릴리즈 노트를 삭제하였습니다.`);
    handleSuccess(response, 200, '릴리즈 노트를 삭제하였습니다.');
    return;
  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}