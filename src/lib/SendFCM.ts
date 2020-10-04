import axios from 'axios';

export default async (
	token: string,
	title: string,
	body: string,
	link: string
) => {
	try {
		const URL: string = `https://fcm.googleapis.com/fcm/send`;
		const request = {
			to: token,
			data: {
				title,
				body,
				click_action: link,
			},

			notification: {
				title,
				body,
				click_action: link,
			},
		};

		await axios.post(URL, request, {
			headers: {
				Authorization:
					'key=AAAAMtTOkBs:APA91bE-_DEPjADf9FkHVikxcsWqQboDGaPRAKcKRSSDqz_uaiGFsVkmv-tcdiKjxjHvt3G2W5jZ9Y-apSHc-cs87jswhqgepjoJcLmfYMILQz0BDtZqCimmj4b7TSYAGBHCPDJUJ3Ek',
			},
		});
	} catch (error) {
		console.log(error);
	}
};
