import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Payment } from '../../payments/entities/payment.entity'
import { Cashier } from '../../cashiers/entities/cashier.entity'


@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  orderId: number

  @Column({ default: false })
  isDownload: boolean

  @Column()
  totalPaid: number

  @ManyToOne(() => Payment)
  @JoinColumn()
  payment: Payment

  @ManyToOne(() => Cashier)
  @JoinColumn()
  cashier: Cashier

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
