import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Discount } from './discount.entity'
import { Category } from '../../categories/entities/category.entity'

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  productId: number

  @Column()
  name: string

  @OneToOne(() => Discount)
  @JoinColumn()
  discount: Discount

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category
}
