import { IsNotEmpty, IsString, IsEnum, IsUrl, ValidateIf, IsOptional } from 'class-validator'
import { PaymentType } from '../types'

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEnum(PaymentType)
  type: PaymentType

  @IsOptional()
  @IsUrl()
  @ValidateIf((_, value) => value !== null)
  logo: string | null
}
