export interface ISignUpTypes {
	id: string;
	password: string;
	name: string;
	email: string;
	joinedAt: Date;
	profileImage?: string | null;
}

export interface ISignInTypes {
	id: string;
	password: string;
}
