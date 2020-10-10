import { Request, Response } from 'express';
import createURL from '../../../../lib/util/createURL';
import ColorConsole from '../../../../lib/ColorConsole';
import { handleFailed, handleSuccess } from '../../../../lib/Response';

export default async (request: Request, response: Response) => {
	try {
		const requestFiles = request.files;
		let files: string[] = [];

		for (let i = 0; i < requestFiles.length; i++) {
			files = [...files, createURL(requestFiles[i].filename)];
		}

		ColorConsole.green(`[200] 파일 업로드를 성공하였습니다.`);
		handleSuccess(response, 200, '파일 업로드를 성공하였습니다.', { files });
		return;
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		handleFailed(response, 500, '서버 오류입니다.');
	}
};
