import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Cashier {

  @PrimaryGeneratedColumn()
  cashierId: number

  @Column()
  name: string

  @Column({ length: 6, select: false })
  passcode: string

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
