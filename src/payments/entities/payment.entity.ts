import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { PaymentType } from '../types'

@Entity()
export class Payment {

  @PrimaryGeneratedColumn()
  paymentId: number

  @Column()
  name: string

  @Column({ nullable: true })
  logo: string

  @Column({
    type: 'enum',
    enum: PaymentType
  })
  type: PaymentType

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
