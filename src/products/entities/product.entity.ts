import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Discount } from './discount.entity'
import { Category } from '../../categories/entities/category.entity'

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  productId: number

  @Column()
  name: string

  @Column()
  image: string

  @Column()
  price: number

  @Column()
  stock: number

  @OneToOne(() => Discount)
  @JoinColumn()
  discount: Discount

  @ManyToOne(() => Category)
  @JoinColumn()
  category: Category
}
