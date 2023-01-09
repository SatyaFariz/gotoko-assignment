import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator'

export class FindOrdersQueryParamsDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  skip: number = 0

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  limit: number = 10
}
