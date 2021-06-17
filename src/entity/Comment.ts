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
import { User } from './User';

@Entity({
	name: 'comment',
})
export class Comment {
	@PrimaryGeneratedColumn()
	idx!: number;

	@ManyToOne((type) => User, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({
		name: 'fk_user_idx',
	})
	user: User;

	@Column()
	fk_user_idx: number;

	@Column()
	contents!: string;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp',
	})
	createdAt!: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
		name: 'updated_at',
		type: 'timestamp',
	})
	updatedAt: Date;

	@ManyToOne(() => Post, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({
		name: 'fk_post_idx',
	})
	post!: Post;

	@Column()
	fk_post_idx: number;

	@Column({
		nullable: false,
		type: 'boolean',
		name: 'is_private',
	})
	isPrivate!: boolean;
}
