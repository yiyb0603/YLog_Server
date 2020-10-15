export interface ISignUpTypes {
	id: string;
	password: string;
	name: string;
	email: string;
	joinedAt: Date;
	adminCode?: string;
	profileImage?: string | null;
}

export interface ISignInTypes {
	email: string;
	password: string;
}
