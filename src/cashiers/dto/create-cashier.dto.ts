import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateCashierDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  passcode: string
}
