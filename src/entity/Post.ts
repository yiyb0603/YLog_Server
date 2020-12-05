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

	@Column({
		nullable: true,
	})
	writer: string | null;

	@Column({
		nullable: false
	})
	writer_idx: number;

	@Column({
		nullable: true,
	})
	thumbnail: string | null;

	@ManyToOne(() => Category, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'category_idx' })
	category: Category;

	@Column({
		nullable: true
	})
	category_idx: number;

	@Column({
		default: 0,
	})
	like_count: number;

	@Column({
		default: 0,
	})
	comment_length: number;

	@Column({
		default: 0,
	})
	view_count: number;

	@Column({
		nullable: false,
	})
	is_temp: boolean;

	@CreateDateColumn({
		nullable: true,
		default: null,
	})
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
	})
	updated_at: Date;
}
