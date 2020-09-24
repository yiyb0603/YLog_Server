import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';
import { Repository, getRepository } from 'typeorm';
import { Comment } from '../../../../entity/Comment';
import { User } from 'entity/User';

export default async (request: Request, response: Response) => {
	try {
		const { idx } = request.query;
		const user: User = request.user;

		const commentRepository: Repository<Comment> = getRepository(Comment);

		if (!Number.isInteger(idx)) {
			ColorConsole.red(`[ERROR 400] 검증 오류입니다.`);
			handleFailed(response, 400, '검증 오류입니다.');
			return;
		}

		const findComment: Comment = await commentRepository.findOne({
			where: {
				idx,
			},
		});

		if (findComment.writer !== user.name || !user.is_admin) {
			ColorConsole.red(`[ERROR 403] 댓글을 삭제할 권한이 없습니다.`);
			handleFailed(response, 403, '댓글을 삭제할 권한이 없습니다.');
			return;
		}

		if (!findComment) {
			ColorConsole.red(`[ERROR 404] 존재하지 않는 댓글입니다.`);
			handleFailed(response, 404, '존재하지 않는 댓글입니다.');
		}

		await commentRepository.remove(findComment);
		ColorConsole.green(`[200] 댓글 삭제를 성공하였습니다.`);
		handleSuccess(response, 200, '댓글 삭제를 성공하였습니다.');
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
		return;
	}
};
