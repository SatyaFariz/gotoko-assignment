import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator'

export class FindProductsQueryParamsDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  skip: number = 0

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  limit: number = 10

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  categoryId: number

  @IsOptional()
  @IsString()
  q: string
}
