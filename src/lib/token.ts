import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const createToken = (idx: number, name: string, email: string, profileImage, isAdmin: boolean) => {
	const payload = {
		idx,
		name,
		email,
		profileImage,
		isAdmin,
	};

	const options: SignOptions = {
		expiresIn: '30d',
	};

	return jwt.sign(payload, JWT_SECRET, options);
};

export const decodeToken = (token: string) => {
	return jwt.decode(token);
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET);
};
