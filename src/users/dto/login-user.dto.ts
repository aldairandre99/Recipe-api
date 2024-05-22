import { IsNotEmpty, IsString, Matches } from 'class-validator'

const emailRegx = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$\
",
  "i"
);

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