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

	@Column({
		nullable: false,
	})
	title: string;

	@Column({
		nullable: false,
	})
	contents: string;

	@Column({
		nullable: false,
	})
	writer: string;

	@Column({
		nullable: false,
	})
	thumbnail: string;

	@Column({
		nullable: false,
	})
	category_idx: number;

	@CreateDateColumn({
		nullable: false,
	})
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
	})
	updated_at: Date;
}
