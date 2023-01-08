import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"

@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  categoryId: number

  @Column()
  name: string
}
