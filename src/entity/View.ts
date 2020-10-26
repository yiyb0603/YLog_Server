import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity('view')
export class View {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    nullable: false,
  })
  user_ip: string;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_idx' })
  post: Post;

  @Column({
    default: 0,
    nullable: false
  })
  post_idx: number;
}