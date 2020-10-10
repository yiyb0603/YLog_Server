import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('release')
export class Release {
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

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
	})
	updated_at: Date;
}
