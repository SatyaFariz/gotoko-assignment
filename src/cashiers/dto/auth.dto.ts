import { IsNotEmpty, IsString, Length } from 'class-validator'

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  passcode: string
}
