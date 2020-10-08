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

	@Column()
	title: string;

	@Column()
	introduction: string;

	@Column()
	contents: string;

	@Column({
		nullable: true,
	})
	writer: string | null;

	@Column()
	writer_id: string;

	@Column({
		nullable: true,
	})
	thumbnail: string | null;

	@Column()
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
