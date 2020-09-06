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

	@Column({
		nullable: true,
		default: 'null',
	})
	thumbnail: string;

	@Column()
	category_idx: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
	})
	updated_at: Date;
}
