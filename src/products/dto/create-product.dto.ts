import { IsNotEmpty, IsString, IsUrl, IsInt, IsNumber, IsEnum, IsOptional, ValidateNested, Min } from 'class-validator'
import { DiscountType } from '../types'
import { Type, Transform } from 'class-transformer'
import { IsExpiryDate } from '../decorators/IsExpiryDate'

class DiscountDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  qty: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  result: number

  @IsNotEmpty()
  @IsEnum(DiscountType)
  type: DiscountType

  @IsNotEmpty()
  @IsExpiryDate()
  @Transform(({ value }) => Number(value))
  expiredAt: number
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
