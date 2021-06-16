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

@Entity('release')
export class Release {
	@PrimaryGeneratedColumn()
	idx!: number;

	@Column({
		nullable: false,
	})
	title!: string;

	@Column({
		nullable: false,
		type: 'text',
	})
	contents!: string;

	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({
		name: 'fk_user_idx',
	})
	user: User;

	@CreateDateColumn({
		name: 'created_at',
	})
	createdAt: Date;

	@UpdateDateColumn({
		nullable: true,
		name: 'updated_at',
		default: null,
	})
	updatedAt: Date;
}
