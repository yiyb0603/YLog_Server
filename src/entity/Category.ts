import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('category')
export class Category {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column()
	category_name: string;
}
