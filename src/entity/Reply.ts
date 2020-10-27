import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Comment } from './Comment';
import { Post } from './Post';

@Entity('reply')
export class Reply {
	@PrimaryGeneratedColumn()
	idx: number;

	@ManyToOne(() => Post, { onDelete: "CASCADE" })
	@JoinColumn({ name: "post_idx" })
	post: Post;

	@Column()
	post_idx: number;

	@ManyToOne(() => Comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "comment_idx" })
  comment: Comment;

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
	writer_idx: number;

	@Column({
		nullable: true,
		default: null,
	})
	writer_profile: string;

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

	@Column()
	is_private: boolean;
}
