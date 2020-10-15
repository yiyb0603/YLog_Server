import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({
		length: 255,
		nullable: false,
	})
	name: string;

	@Column({
		length: 255,
		nullable: false,
	})
	password: string;

	@Column({
		length: 255,
		nullable: false,
	})
	email: string;

	@Column('timestamptz')
	@CreateDateColumn({
		nullable: true,
		default: null,
	})
	joined_at: Date;

	@Column({
		length: 1000,
		nullable: true,
	})
	profile_image: string;

	@Column({
		nullable: false,
	})
	is_admin: boolean;

	@Column({
		nullable: true,
		default: null,
	})
	fcm_token: string;

	@Column({
		nullable: true,
		default: false,
	})
	fcm_allow: boolean;

	@Column({
		nullable: true,
		default: null,
	})
	is_allow: boolean;
}
