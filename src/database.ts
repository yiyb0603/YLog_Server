import { Connection, createConnection, ConnectionOptions } from 'typeorm';
import entities from './entity';
import ColorConsole from './lib/ColorConsole';
import 'dotenv/config';

export const getConnection = async (): Promise<Connection> => {
	const connectionOptions: ConnectionOptions = {
		type: 'mysql',
		database: process.env.DATABASE,
		synchronize: true,
		logging: false,
		entities,
		host: process.env.DB_HOST,
		port: 3306,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		charset: 'utf8mb4_unicode_ci',
	};

	try {
		const connection = await createConnection(connectionOptions);
		ColorConsole.green('Connection Success with Database');
		return connection;
	} catch (error) {
		ColorConsole.red('Connection Database Error: ' + error.message);
	}
};
