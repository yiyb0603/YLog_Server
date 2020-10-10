import { Release } from '../../../../entity/Release';
import { User } from 'entity/User';
import { Request, Response } from 'express';
import { validateModifyRelease } from '../../../../lib/validation/Release/modifyRelease';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const updatedAt: Date = new Date();
    const { idx, title, contents } = request.body;
    const user: User = request.user;

    const releaseRepository: Repository<Release> = getRepository(Release);

    if (!validateModifyRelease(request, response)) {
      return;
    }

    const release: Release = await releaseRepository.findOne({
      where: {
        idx
      }
    });

    if (!release) {
      ColorConsole.red(`[ERROR 404] 존재하지 않는 릴리즈 노트입니다.`);
      handleFailed(response, 404, '존재하지 않는 릴리즈 노트입니다.');
      return;
    }

    release.idx = idx;
    release.title = title || release.title;
    release.contents = contents || release.contents;
    release.updated_at = updatedAt;
    release.writer = user.name || release.writer;

    await releaseRepository.save(release);
    ColorConsole.green(`[200] 릴리즈 노트를 수정하였습니다.`);
    handleSuccess(response, 200, '릴리즈 노트를 수정하였습니다.');
    return;

  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}