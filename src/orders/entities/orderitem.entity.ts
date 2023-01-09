import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Order } from './order.entity'
import { Product } from "../../products/entities/product.entity"
import { Discount } from "../../products/entities/discount.entity"

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn()
  orderItemId: number

  @Column()
  qty: number

  @Column({ select: false })
  orderOrderId: number

  @Column()
  unitPrice: number

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

  @ManyToOne(() => Discount)
  @JoinColumn()
  discount: Discount

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
