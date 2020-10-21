import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
} from 'typeorm';

@Entity('comment')
export class Comment {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({
		nullable: true,
		default: null,
	})
	writer: string;

	@Column({
		nullable: true,
		default: null,
	})
	writer_idx: number;

	@Column()
	contents: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
	})
	updated_at: Date;

	@Column()
	post_idx: number;

	@Column({
		nullable: false
	})
	is_private: boolean;
}
