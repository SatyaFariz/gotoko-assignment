import { IsNotEmpty, IsString, IsEnum, IsUrl, ValidateIf } from 'class-validator'
import { PaymentType } from '../types'

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEnum(PaymentType)
  type: PaymentType

  @IsUrl()
  @ValidateIf((_, value) => value !== null)
  logo: string | null
}
