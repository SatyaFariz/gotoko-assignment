import { IsInt } from 'class-validator'

export class GetSubtotalDto {
  @IsInt()
  productId: number

  @IsInt()
  qty: number
}
