import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('Post')
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

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
	})
	updated_at: Date;
}
