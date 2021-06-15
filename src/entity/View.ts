import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Entity('view')
export class View {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    nullable: false,
    name: 'user_ip',
  })
  userIp: string;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_post_idx' })
  post: Post;

  @Column()
  fk_post_idx: number;
}