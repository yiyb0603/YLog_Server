import 'dotenv/config';

export default (fileName: string) => {
	return `${process.env.SERVER_ADDRESS}/public/${fileName}`;
};
