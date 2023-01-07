import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

type PaymentType = 'CASH' | 'E-WALLET' | 'EDC'

@Entity()
export class Payment {

  @PrimaryGeneratedColumn()
  paymentId: number

  @Column()
  name: string

  @Column({ nullable: true })
  logo: string

  @Column({
    type: "enum",
    enum: ['CASH', 'E-WALLET', 'EDC']
  })
  type: PaymentType

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
