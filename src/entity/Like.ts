import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity('like')
export class Like {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_idx' })
  post: Post;

  @Column()
  post_idx: number;

  @Column()
  user_idx: number;
}