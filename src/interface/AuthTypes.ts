export interface ISignUpTypes {
	id: string;
	password: string;
	name: string;
	email: string;
	joined_at: Date;
	profile_image?: string;
}

export interface ISignInTypes {
	id: string;
	password: string;
}
