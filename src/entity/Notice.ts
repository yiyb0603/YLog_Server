import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Notice')
export class Notice {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({
		nullable: false,
	})
	title: string;

	@Column({
		nullable: false,
	})
	contents: string;

	@Column({
		nullable: false,
	})
	writer: string;
}
