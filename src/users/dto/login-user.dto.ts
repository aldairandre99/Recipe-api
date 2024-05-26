import { IsNotEmpty, IsString, Matches } from 'class-validator'
import emailRegx from 'src/utils/emailRegx'

export class LoginUserDto {
  @Matches(emailRegx, {
    message: 'Email not valide'
  })
  @IsNotEmpty()
  email: string


  @IsString()
  @IsNotEmpty()
  password: string
}