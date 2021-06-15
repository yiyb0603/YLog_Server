import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';

const ormConfig: ConnectionOptions =  {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: 3306,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE,
	synchronize: true,
	logging: false,
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
	charset: 'utf8mb4_unicode_ci',
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};

export default ormConfig;