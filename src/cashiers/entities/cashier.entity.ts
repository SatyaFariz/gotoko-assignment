import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Cashier {

  @PrimaryGeneratedColumn()
  cashierId: number

  @Column()
  name: string

  @Column({ length: 6 })
  passcode: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
