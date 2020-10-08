import * as mailer from 'nodemailer';
import { SendMailOptions } from 'nodemailer';
import { user, pass } from '../../../config/email.json';

export default async (email: string, title: string, content: string) => {
	const transporter = mailer.createTransport({
		service: 'gmail',
		auth: {
			user,
			pass,
		},
	});

	const mailOptions: SendMailOptions = {
		from: user,
		to: email,
		subject: title,
		text: content,
	};

	await transporter.sendMail(mailOptions);
};
