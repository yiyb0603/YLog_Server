import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
} from 'typeorm';

@Entity('Reply')
export class Reply {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column()
	post_idx: number;

	@Column()
	comment_idx: number;

	@Column()
	contents: string;

	@CreateDateColumn({
		nullable: true,
	})
	replied_at: Date;

	@UpdateDateColumn({
		nullable: true,
	})
	updated_at: Date;
}
