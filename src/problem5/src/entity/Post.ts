import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar")
  title!: string;

  @Column("text")
  content!: string;
}
