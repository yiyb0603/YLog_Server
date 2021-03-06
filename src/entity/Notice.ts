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
	idx!: number;

	@Column({
		nullable: false,
		length: 100,
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
	user!: User;

	@Column()
	fk_user_idx!: number;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp',
	})
	createdAt!: Date;

	@UpdateDateColumn({
		nullable: true,
		default: null,
		name: 'updated_at',
		type: 'timestamp',
	})
	updatedAt: Date;
}
