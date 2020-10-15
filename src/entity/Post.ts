import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class Post {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({
		nullable: false
	})
	title: string;

	@Column({
		nullable: false
	})
	introduction: string;

	@Column({
		nullable: false
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

	@Column({
		nullable: false
	})
	category_idx: number;

	@Column({
		default: 0,
	})
	comment_length: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
	})
	updated_at: Date;
}
