import { PartialType } from "@nestjs/mapped-types";
import { DeleteUserDto } from "./delete-user.dto";
import { IsNotEmpty, IsString, Matches } from "class-validator";
import emailRegx from "src/utils/emailRegx";

export class EditeUserDto {
  @Matches(emailRegx, {
    message: 'Email not valide'
  })
  @IsNotEmpty()
  email: string

  @Matches(emailRegx, {
    message: 'Email not valide'
  })
  @IsNotEmpty()
  newEmail: string

  @IsString()
  @IsNotEmpty()
  password: string
}