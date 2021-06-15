import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('notice')
export class Notice {
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
	contents: string;

	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({
		name: 'fk_user_idx',
	})
	user: User;

	@Column()
	fk_user_idx: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
	})
	updated_at: Date;
}
