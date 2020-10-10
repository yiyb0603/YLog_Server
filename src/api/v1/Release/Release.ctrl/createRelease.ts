import { Release } from 'entity/Release';
import { User } from 'entity/User';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const createdAt: Date = new Date();
    const { title, contents } = request.body;
    const user: User = request.user;

    const releaseRepository: Repository<Release> = getRepository(Release);

    const release: Release = new Release();
    release.title = title;
    release.contents = contents;
    release.created_at = createdAt;
    release.writer = user.name;

    await releaseRepository.save(release);
    ColorConsole.green(`[200] 릴리즈 노트를 작성하였습니다.`);
    handleSuccess(response, 200, '릴리즈 노트를 작성하였습니다.');
    return;

  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}