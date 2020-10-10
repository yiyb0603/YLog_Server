import * as admin from 'firebase-admin';

export default async (
	token: string,
	title: string,
	body: string,
	icon: string = 'http://localhost:3000/assets/icon/Logo.PNG',
	link: string = 'http://localhost:3000'
) => {
	try {
		const message = {
			token,
			webpush: {
				notification: {
					title,
					body,
					icon,
					click_action: link,
				},
			},
		};

		admin.messaging().send(message);
	} catch (error) {
		console.log(error);
	}
};
