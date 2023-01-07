import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsNumber } from 'class-validator'

export class FindPaymentsQueryParamsDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  skip: number = 0

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  limit: number = 10

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  subtotal: number
}
