import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('User')
export class User {
	@PrimaryColumn({
		length: 255,
		nullable: false,
	})
	id: string;

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
		nullable: false,
	})
	joined_at: Date;

	@Column({
		length: 1000,
		nullable: true,
	})
	profile_image: string;
}