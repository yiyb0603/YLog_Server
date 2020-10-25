import { User } from '../../../entity/User';
import { Request, Response } from 'express';
import { validateModifyProfile } from '../../../lib/validation/Profile/modifyProfile';
import { getRepository, Repository } from 'typeorm';
import ColorConsole from '../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../lib/Response';

export default async (request: Request, response: Response) => {
  try {
    const { userIdx, name, email, profileImage } = request.body;
    const userRepository: Repository<User> = getRepository(User);

    if (!validateModifyProfile(request, response)) {
      return;
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

    user.email = email || user.email;
    user.name = name || user.name;
    user.profile_image = profileImage || user.profile_image;

    await userRepository.save(user);
    ColorConsole.green(`[200] 회원 정보를 수정하였습니다.`);
    handleSuccess(response, 200, '회원 정보를 수정하였습니다.');
    return;
  } catch (error) {
    ColorConsole.red(`[ERROR 500] 서버 오류입니다.`);
    handleFailed(response, 500, '서버 오류입니다.');
    return;
  }
}