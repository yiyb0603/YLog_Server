import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity('post')
export class Post {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({
		nullable: false,
		type: 'text',
	})
	title: string;

	@Column({
		nullable: false,
		type: 'text',
	})
	introduction: string;

	@Column({
		nullable: false,
		type: 'text',
	})
	contents: string;

	@ManyToOne(() => User)
	@JoinColumn({
		name: 'fk_user_idx',
	})
	user: User;

	@Column()
	fk_user_idx: number;

	@Column({
		nullable: true,
	})
	thumbnail: string | null;

	@ManyToOne(() => Category, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'fk_category_idx' })
	category: Category;

	@Column()
	fk_category_idx: number;

	likeCount: number;
	commentCount: number;
	viewCount: number;

	@Column({
		name: 'is_temp',
		nullable: false,
	})
	isTemp: boolean;

	@CreateDateColumn({
		nullable: true,
		default: null,
		name: 'created_at',
	})
	createdAt: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
		name: 'updated_at',
	})
	updatedAt: Date;
}
