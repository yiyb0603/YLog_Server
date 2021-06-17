import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
	name: 'email_code',
})
export class EmailCode {
	@PrimaryGeneratedColumn()
	idx!: number;

	@Index({
		unique: true,
	})
	@Column({
		nullable: false,
	})
	email!: string;

	@Column({
		nullable: false,
	})
	code!: string;

	@Column({
		nullable: false,
		default: false,
		type: 'boolean',
		name: 'isCertified',
	})
	isCertified!: boolean;
}
