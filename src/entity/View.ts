import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('view')
export class View {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    nullable: false,
  })
  user_ip: string;

  @Column({
    default: 0,
    nullable: false
  })
  post_idx: number;
}