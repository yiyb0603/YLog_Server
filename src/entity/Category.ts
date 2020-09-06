import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('Category')
export class Category {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column()
	category_name: string;
}
