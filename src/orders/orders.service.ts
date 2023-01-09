import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import generateCreateEmptyBodyErrorObject from '../helpers/generateCreateEmptyBodyErrorObject'
import { HttpException } from '../classes'
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../payments/entities/payment.entity';
import { Product } from '../products/entities/product.entity';
import { Cashier } from '../cashiers/entities/cashier.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitem.entity';
import { Repository, In, DataSource } from 'typeorm';
import { Discount } from 'src/products/entities/discount.entity';
import { FindOrdersQueryParamsDto } from './dto/find-orders-query-params.dto'

@Injectable()
export class OrdersService {
  private notFoundMessage: string = 'Order Not Found';

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
    private dataSource: DataSource
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    if(Object.keys(createOrderDto).length === 0) {
      const error = generateCreateEmptyBodyErrorObject(['paymentId', 'totalPaid', 'products'])
      throw new HttpException(error, 400)
    }

    const errors = []
    // check stock
    const products = await this.productRepository.find({
      relations: {
        category: true,
        discount: true
      },
      where: { productId: In(createOrderDto.products.map(i => i.productId ))}
    })

    for(const product of products) {
      const { productId } = product
      const orderedQty = createOrderDto.products.find(item => item.productId === productId).qty
 
      if(orderedQty > product.stock) {
        errors.push({
          message: `Stock not enough for product with sku: ${product.sku}`,
          type: 'NOT_ENOUGH_STOCK',
          path: [],
          context: {}
        })
      }
    }

    if(errors.length > 0) {
      const error = {
        message: errors.map(i => i.message).join('. '),
        error: errors
      }
      throw new HttpException(error, 500)
    }

    let payment = new Payment()
    payment.paymentId = createOrderDto.paymentId

    let cashier = new Cashier()
    cashier.cashierId = 3

    const newOrder = this.orderRepository.create({
      payment,
      cashier,
      totalPaid: createOrderDto.totalPaid
    })

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const savedOrder = await queryRunner.manager.save(newOrder);
      await Promise.all(createOrderDto.products.map(item => {
        const productData = products.find(product => product.productId === item.productId)
        const product = new Product()
        product.productId = item.productId
        const order = new Order()
        order.orderId = savedOrder.orderId

        const totalNormalPrice = item.qty * productData.price
        const totalFinalPrice = this.getFinalPrice(item.qty, productData.price, productData.discount)
  
        const newItem = this.orderItemRepository.create({
          product,
          order,
          qty: item.qty,
          totalFinalPrice,
          totalNormalPrice,
          unitPrice: productData.price
        })
  
        return queryRunner.manager.save(newItem)
      }))

      await Promise.all(products.map(product => {
        const { productId } = product
        const orderedQty = createOrderDto.products.find(item => item.productId === productId).qty

        return queryRunner.manager.update(Product, productId, { stock: product.stock - orderedQty })
      }))

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();

      const error = [{
        message: err.sqlMessage,
        type: err.code,
        path: [],
        context: {}
      }]

      throw new HttpException({ error, message: error[0].message}, 500)
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async find(query: FindOrdersQueryParamsDto) {
    const { skip, limit } = query;
    const [orders, total] = await this.orderRepository.findAndCount({
      skip,
      take: limit,
      relations: {
        cashier: true,
        payment: true
      }
    });

    return {
      orders: orders.map(order => this.reformatOrder(order)),
      meta: {
        total,
        skip,
        limit
      }
    };
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
      relations: {
        cashier: true,
        payment: true
      }
    });

    if(!order)
      throw new HttpException({ message: this.notFoundMessage }, 404);
      
    return this.reformatOrder(order)
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private getFinalPrice(orderQty: number, price: number, discount: Discount): number {
    if(new Date(discount.expiredAt) > new Date() && orderQty >= discount.qty) {
      const regularPriceProductsCount = orderQty % discount.qty
      const discountedProductsCount = orderQty - regularPriceProductsCount
      const multiplyBy = discountedProductsCount / discount.qty

      let finalPrice = regularPriceProductsCount * price
      if(discount.type === 'PERCENT') {
        for(let i = 0; i < multiplyBy; i++) {
          const totalPrice = price * discount.qty
          const totalPriceAfterDiscount = totalPrice - (discount.result / 100 * totalPrice)

          finalPrice = finalPrice + totalPriceAfterDiscount
        }
      } else {
        for(let i = 0; i < multiplyBy; i++) {
          finalPrice = finalPrice + discount.result
        }
      }

      return finalPrice
    } else {
      return orderQty * price
    }
  }

  private reformatOrder(order: Order) {
    return {
      ...order,
      cashiersId: order.cashier.cashierId,
      paymentTypesId: order.payment.paymentId,
      cashier: {
        ...order.cashier,
        passcode: undefined
      },
      payment_type: {
        ...order.payment,
        paymentTypeId: order.payment.paymentId,
        paymentId: undefined
      },
      payment: undefined,
      isDownload: undefined
    };
  }
}
