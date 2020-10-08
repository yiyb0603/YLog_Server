import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('email_code')
export class EmailCode {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({
		nullable: false,
	})
	email: string;

	@Column({
		nullable: false,
	})
	code: string;

	@Column({
		nullable: false,
		default: false,
	})
	is_certified: boolean;
}
