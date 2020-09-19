import { Connection, createConnection, ConnectionOptions } from 'typeorm';
import entities from './entity';
import ColorConsole from './lib/ColorConsole';

export const getConnection = async (): Promise<Connection> => {
	const connectionOptions: ConnectionOptions = {
		type: 'mysql',
		database: 'ylog_db',
		synchronize: false,
		logging: false,
		entities,
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: '',
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
