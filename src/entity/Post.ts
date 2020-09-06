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
	contents: string;

	@Column()
	writer: string;

	@Column()
	thumbnail: string;

	@Column()
	category: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
