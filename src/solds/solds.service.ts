import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrderItem } from '../orders/entities/orderitem.entity';

@Injectable()
export class SoldsService {
  constructor(
    private dataSource: DataSource
  ) {}

  async findAll() {
    const orderProducts = await this.dataSource
    .getRepository(OrderItem).manager.query(`
      SELECT p.name, p.productId, SUM(o.qty) AS totalQty, SUM(o.totalFinalPrice) AS totalAmount 
      FROM order_item o JOIN product p ON p.productId = o.productProductId 
      WHERE DATE(o.createdAt) = CURRENT_DATE() GROUP BY o.productProductId
    `)

    return {
      orderProducts
    }
  }
}
