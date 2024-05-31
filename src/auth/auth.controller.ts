import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { SignUpUserDto } from 'src/users/dto/sign-up-user.dto';
import { DeleteUserDto } from 'src/users/dto/delete-user.dto';
import { EditeUserDto } from 'src/users/dto/edite-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch("edit/user")
  async editUser(@Body() userDto: EditeUserDto) {
    const { email, password, newEmail } = userDto
    return await this.authService.editUser(email, password, newEmail)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete("delete/user")
  async deleteUser(@Request() req, @Body() userDto: DeleteUserDto) {
    const { email, password } = userDto
    return await this.authService.removeUser(email, password)
  }
}
