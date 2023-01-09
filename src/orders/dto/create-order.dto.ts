import { IsNotEmpty, IsInt, IsNumber, ValidateNested, ArrayNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

class OrderItemDto {
  @IsNotEmpty()
  @IsInt()
  qty: number

  @IsNotEmpty()
  @IsNumber()
  productId: number
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  paymentId: number

  @IsNotEmpty()
  @IsNumber()
  totalPaid: number

  @ArrayNotEmpty()
  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  products: OrderItemDto
}
