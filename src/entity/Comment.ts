import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Post } from './Post';

@Entity('comment')
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
	writer_idx: number;

	@Column()
	contents: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
	})
	updated_at: Date;

	@ManyToOne(() => Post, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'post_idx' })
	post: Post;

	@Column()
	post_idx: number;

	@Column({
		nullable: false
	})
	is_private: boolean;
}
