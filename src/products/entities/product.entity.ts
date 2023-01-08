import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Discount } from './discount.entity'

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  productId: number

  @Column()
  name: string

  @OneToOne(() => Discount)
  @JoinColumn()
  discount: Discount
}
