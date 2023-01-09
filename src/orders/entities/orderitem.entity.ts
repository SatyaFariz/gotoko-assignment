import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Order } from './order.entity'
import { Product } from "../../products/entities/product.entity"

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn()
  orderItemId: number

  @Column()
  qty: number

  @Column()
  totalNormalPrice: number

  @Column()
  totalFinalPrice: number

  @ManyToOne(() => Order)
  @JoinColumn()
  order: Order

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
