import { Request, Response } from 'express';
import ColorConsole from '../../../../lib/ColorConsole';
import { getRepository, Repository } from 'typeorm';
import { Release } from 'entity/Release';

export default async (request: Request, response: Response) => {
	try {
    const releaseRepository: Repository<Release> = getRepository(Release);

		const releases: Release[] = await releaseRepository.find({
			select: [
        'idx',
        'title',
        'contents',
        'created_at',
        'updated_at',
        'writer'
			],
		});

		ColorConsole.green(`[200] 릴리즈 노트 목록 조회를 성공하였습니다.`);
		return response.status(200).json({
			status: 200,
			message: '릴리즈 노트 목록 조회를 성공하였습니다.',
			data: {
				releases,
			},
		});
	} catch (error) {
		ColorConsole.red(`[ERROR 500] 서버 오류입니다. ${error.message}`);
		return response.status(500).json({
			status: 500,
			message: '서버 오류입니다.',
		});
	}
};
