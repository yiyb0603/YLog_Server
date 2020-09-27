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
	post_idx: number;

	@Column()
	comment_idx: number;

	@Column({
		nullable: true,
		default: null,
	})
	writer: string;

	@Column({
		nullable: true,
		default: null,
	})
	writer_id: string;

	@Column()
	contents: string;

	@CreateDateColumn({
		nullable: true,
	})
	replied_at: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
	})
	updated_at: Date;
}
