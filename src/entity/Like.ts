import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity('like')
export class Like {
  @PrimaryGeneratedColumn()
  idx!: number;

  @ManyToOne(() => Post, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_post_idx',
  })
  post!: Post;

  @Column()
  fk_post_idx!: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column()
  fk_user_idx!: number;
}