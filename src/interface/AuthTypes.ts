export interface ISignUpTypes {
	id: string;
	password: string;
	name: string;
	email: string;
	joinedAt: Date;
	profileImage?: string;
}

export interface ISignInTypes {
	id: string;
	password: string;
}
