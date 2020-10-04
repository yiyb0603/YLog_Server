import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
} from 'typeorm';

@Entity('Comment')
export class Comment {
	@PrimaryGeneratedColumn()
	idx: number;

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

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
	})
	updated_at: Date;

	@Column()
	post_idx: number;
}
