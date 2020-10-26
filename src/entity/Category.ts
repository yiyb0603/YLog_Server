import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('category')
export class Category {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({
		nullable: false,
	})
	category_name: string;

	@Column({
		nullable: false,
		default: 0,
	})
	post_count: number;
}
