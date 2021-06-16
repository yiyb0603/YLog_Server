import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('category')
export class Category {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({
		nullable: false,
		name: 'category_name',
	})
	categoryName: string;

	postCount: number;
}
