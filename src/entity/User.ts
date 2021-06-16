import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	idx!: number;

	@Column({
		nullable: false,
	})
	name!: string;

	@Column({
		nullable: false,
	})
	password!: string;

	@Column({
		length: 255,
		nullable: false,
		unique: true,
	})
	email!: string;

	@Column('timestamptz')
	@CreateDateColumn({
		nullable: true,
		default: null,
		name: 'joined_at',
	})
	joinedAt: Date;

	@Column({
		nullable: true,
		name: 'profile_image',
	})
	profileImage: string;

	@Column({
		nullable: false,
		type: 'boolean',
		name: 'is_admin',
	})
	isAdmin!: boolean;

	@Column({
		nullable: true,
		default: null,
		name: 'fcm_token',
	})
	fcmToken: string;

	@Column({
		nullable: true,
		default: false,
		name: 'fcm_allow',
	})
	fcmAllow: boolean;

	@Column({
		nullable: true,
		default: null,
		name: 'is_allow',
	})
	isAllow: boolean;
}
