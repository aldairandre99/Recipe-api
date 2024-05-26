import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { SignUpUserDto } from 'src/users/dto/sign-up-user.dto';
import { DeleteUserDto } from 'src/users/dto/delete-user.dto';
import { EditeUserDto } from 'src/users/dto/edite-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginUserDto) {
    const { email, password } = signInDto

    return await this.authService.signIn(email, password);

  }

  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signUp(@Body() signUpDto: SignUpUserDto) {
    const { email, password } = signUpDto
    return await this.authService.singUp(email, password)

  }

  @HttpCode(HttpStatus.OK)
  @Patch("edit/user")
  async editUser(@Body() userDto: EditeUserDto) {
    const { email, password, newEmail } = userDto
    return await this.authService.editUser(email, password, newEmail)
  }

  @HttpCode(HttpStatus.OK)
  @Delete("delete/user")
  async deleteUser(@Body() userDto: DeleteUserDto) {
    const { email, password } = userDto
    return await this.authService.removeUser(email, password)
  }
}
