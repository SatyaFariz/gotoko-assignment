import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { DiscountType } from '../types'

@Entity()
export class Discount {

  @PrimaryGeneratedColumn()
  discountId: number

  @Column()
  qty: number

  @Column()
  result: number

  @Column()
  expiredAt: Date

  @Column({
    type: 'enum',
    enum: DiscountType
  })
  type: DiscountType
}
