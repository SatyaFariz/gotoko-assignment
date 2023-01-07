import { IsNotEmpty, IsString, IsEnum, IsUrl, ValidateIf } from 'class-validator'

export enum PaymentType {
  'CASH' = 'CASH',
  'E-WALLET' = 'E-WALLET',
  'EDC' = 'EDC'
}

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
