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
import { User } from './User';

@Entity('reply')
export class Reply {
	@PrimaryGeneratedColumn()
	idx: number;

	@ManyToOne(() => Post, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'fk_post_idx' })
	post: Post;

	@Column()
	fk_post_idx: number;

	@ManyToOne(() => Comment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comment_idx' })
  comment: Comment;

	@Column()
	fk_comment_idx: number;

	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({
		name: 'fk_user_idx',
	})
	user: User;

	@Column()
	contents: string;

	@CreateDateColumn({
		nullable: true,
		name: 'replied_at',
	})
	repliedAt: Date;

	@UpdateDateColumn({
		name: 'updated_at',
		nullable: true,
		default: null,
	})
	updatedAt: Date;

	@Column({
		type: 'boolean',
		name: 'is_private',
	})
	isPrivate!: boolean;
}
