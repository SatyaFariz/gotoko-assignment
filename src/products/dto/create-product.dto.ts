import { IsNotEmpty, IsString, IsUrl, IsInt, IsNumber, IsEnum, IsDate, IsOptional, ValidateNested } from 'class-validator'
import { DiscountType } from '../types'
import { Type } from 'class-transformer'
import { IsUnixTime } from '../decorators/IsUnixTime'

class DiscountDto {
  @IsNotEmpty()
  @IsInt()
  qty: number

  @IsNotEmpty()
  @IsNumber()
  result: number

  @IsNotEmpty()
  @IsEnum(DiscountType)
  type: DiscountType

  @IsNotEmpty()
  @IsUnixTime(
    { min: new Date() },
    {
      message: 'expiredAt should be a unix time in the future',
    }
  )
  expiredAt: Date
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsInt()
  categoryId: number

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsUrl()
  image: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsInt()
  stock: number

  @IsOptional()
  @Type(() => DiscountDto)
  @ValidateNested()
  discount: DiscountDto
}
