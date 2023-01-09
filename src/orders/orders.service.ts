import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import generateCreateEmptyBodyErrorObject from '../helpers/generateCreateEmptyBodyErrorObject'
import { HttpException } from '../classes'
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../payments/entities/payment.entity';
import { Product } from '../products/entities/product.entity';
import { Cashier } from '../cashiers/entities/cashier.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitem.entity';
import { Repository, In, DataSource } from 'typeorm';
import { Discount } from '../products/entities/discount.entity';
import { FindOrdersQueryParamsDto } from './dto/find-orders-query-params.dto'
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment'
import { GetSubtotalDto } from './dto/get-subtotal.dto'

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

    const cashierId = 3
    let payment = new Payment()
    payment.paymentId = createOrderDto.paymentId

    let cashier = new Cashier()
    cashier.cashierId = cashierId

    const newOrder = this.orderRepository.create({
      receiptId: uuidv4(),
      payment,
      cashier,
      totalPrice: 0,
      totalReturn: 0,
      totalPaid: createOrderDto.totalPaid
    })

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const savedOrder = await queryRunner.manager.save(newOrder);
      const orderItems = await Promise.all(createOrderDto.products.map(item => {
        const productData = products.find(product => product.productId === item.productId)
        const hasDiscount = productData.discount && new Date(productData.discount.expiredAt) > new Date()

        const product = new Product()
        product.productId = item.productId
        const order = new Order()
        order.orderId = savedOrder.orderId

        const discount = new Discount()
        discount.discountId = productData.discount?.discountId

        const totalNormalPrice = item.qty * productData.price
  
        const newItem = this.orderItemRepository.create({
          discount: hasDiscount ? discount : undefined,
          product,
          order,
          qty: item.qty,
          totalFinalPrice: hasDiscount ? this.getFinalPrice(item.qty, productData.price, productData.discount) : totalNormalPrice,
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

      const totalPrice = orderItems.reduce((total, currentItem) => {
        total = total + currentItem.totalFinalPrice
        return total
      }, 0)

      const totalReturn = savedOrder.totalPaid - totalPrice

      // update total price and total return
      await queryRunner.manager.update(Order, savedOrder.orderId, { totalPrice, totalReturn })

      await queryRunner.commitTransaction();

      return {
        order: {
          orderId: savedOrder.orderId,
          cashiersId: cashierId,
          paymentTypesId: createOrderDto.paymentId,
          totalPrice: totalPrice,
          totalPaid: createOrderDto.totalPaid,
          totalReturn: totalReturn,
          receiptId: savedOrder.receiptId,
          updatedAt: savedOrder.createdAt,
          createdAt: savedOrder.updatedAt
        },
        products: orderItems.map(item => {
          const productData = products.find(product => product.productId === item.productProductId)
          return {
            productId: productData.productId,
            name: productData.name,
            price: productData.price,
            qty: item.qty,
            totalNormalPrice: item.totalNormalPrice,
            totalFinalPrice: item.totalFinalPrice,
            discount: productData.discount ? this.formatDiscount(productData.discount, productData.price) : null
          }
        })
      }
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

    const orderItems = await this.orderItemRepository.find({
      where: {
        orderOrderId: id
      },
      relations: {
        product: true,
        discount: true
      }
    })
      
    return {
      order: this.reformatOrder(order),
      products: orderItems.map(item => {
        return {
          productId: item.product.productId,
          name: item.product.name,
          discountsId: item.discount ? item.discount.discountId : null,
          qty: item.qty,
          price: item.product.price,
          totalFinalPrice: item.totalFinalPrice,
          totalNormalPrice: item.totalNormalPrice,
          discount: item.discount ? this.formatDiscount(item.discount, item.product.price) : null
        }
      })
    }
  }

  async calculateSubtotal(subtotalDto: GetSubtotalDto[]) {
    if(!Array.isArray(subtotalDto) || subtotalDto?.length === 0) {
      const error = {
        message: "body ValidationError: \"value\" must be an array",
        error: [
          {
            "message": "\"value\" must be an array",
            "path": [],
            "type": "array.base",
            "context": {
              "label": "value",
              "value": {}
            }
          }
        ]
      }

      throw new HttpException(error, 400)
    }

    const products = await this.productRepository.find({
      relations: {
        category: true,
        discount: true
      },
      where: { productId: In(subtotalDto.map(i => i.productId ))}
    })

    const subtotals = products.map(product => {
      const inputQty = subtotalDto.find(item => item.productId === product.productId).qty
      const hasDiscount = product.discount && new Date(product.discount.expiredAt) > new Date()
      const totalNormalPrice = inputQty * product.price
      const totalFinalPrice = hasDiscount ? this.getFinalPrice(inputQty, product.price, product.discount) : totalNormalPrice

      return {
        productId: product.productId,
        name: product.name,
        stock: product.stock,
        price: product.price,
        image: product.image,
        qty: inputQty,
        totalNormalPrice,
        totalFinalPrice,
        discount: product.discount ? this.formatDiscount(product.discount, product.price) : null
      }
    })

    return {
      subtotal: subtotals.reduce((subtotal, currentItem) => {
        subtotal = subtotal + currentItem.totalFinalPrice
        return subtotal
      }, 0),
      products: subtotals
    }
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

  async checkDownload(id: number) {
    const order = await this.orderRepository.findOneById(id)

    if(!order)
      throw new HttpException({ message: this.notFoundMessage }, 404);

    return { isDownload: order.isDownload }
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
      isDownload: undefined,
      paymentPaymentId: undefined
    };
  }

  private format_BUY_N(qty: number, result: number): string {
    if(qty === 1) {
      return `Only ${this.formatCurrency(result)}`
    }

    return `Buy ${qty} only ${this.formatCurrency(result)}`
  }

  private formatCurrency(price: number) {
    return new Intl.NumberFormat(
      'id-ID', 
      { 
        style: 'currency', 
        currency: 'IDR'
      }
    )
    .format(price).replace('IDR', 'Rp.')
    .replace('.00', '')
    .replace(/,/g, '.')
  }

  private format_PERCENT(qty: number, result: number, price): string {
    const totalPrice = price * qty
    const afterDiscount = totalPrice - (result / 100 * totalPrice)
    if(qty === 1) {
      return `Discount ${result}% ${this.formatCurrency(afterDiscount)}`
    }

    return `Buy ${qty} discount ${result}% ${this.formatCurrency(afterDiscount)}`
  }

  private formatDiscount(discount: Discount, price: number) {
    const { qty, result } = discount
    const clone = {
      ...discount,
      stringFormat: discount.type === 'BUY_N' ? this.format_BUY_N(qty, result) : this.format_PERCENT(qty, result, price),
      expiredAtFormat: moment(new Date(discount.expiredAt)).format('DD MMM YYYY')
    }
    return clone
  }
}
