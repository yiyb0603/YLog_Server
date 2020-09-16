import { Response } from 'express';

export const handleSuccess = (
	response: Response,
	status: number,
	message: string,
	data?: any
) => {
	return response.status(status).json({
		status,
		message,
		data: data && data,
	});
};

export const handleFailed = (
	response: Response,
	status: number,
	message: string
) => {
	return response.status(status).json({
		status,
		message,
	});
};
