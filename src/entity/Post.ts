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

	@Column({
		nullable: true,
	})
	writer: string | null;

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
	})
	updated_at: Date;
}
