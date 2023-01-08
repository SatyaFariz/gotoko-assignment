import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Discount } from './discount.entity'
import { Category } from '../../categories/entities/category.entity'

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  productId: number

  @Column()
  name: string

  @Column({ unique: true })
  sku: string

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

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
