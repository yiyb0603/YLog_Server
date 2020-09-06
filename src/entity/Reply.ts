import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
} from 'typeorm';

@Entity('Reply')
export class Reply {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column()
	contents: string;

	@Column()
	writer: string;

	@CreateDateColumn()
	replied_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
