import { Injectable, HttpCode, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }
  saltOrRounds: number = 10;

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    const isMatch = await bcrypt.compare(pass, user?.password)

    if (!isMatch) throw new UnauthorizedException()

    return user;
  }

  async signIn(email: string, pass: string) {
    const { password, ...user } = await this.validateUser(email, pass)
    const payload = user
    return {
      status_code: 200,
      user_id: payload.id,
      access_token: this.jwtService.sign(payload)
    };
  }

  async singUp(email: string, pass: string) {

    const hashPass = await bcrypt.hash(pass, this.saltOrRounds)
    const { password, ...user } = await this.usersService.create(email, hashPass)
    const payload = user
    return {
      status_code: 200,
      user_id: payload.id,
      access_token: this.jwtService.sign(payload)
    };
  }

  async editUser(email: string, pass: string, newEmail: string) {
    return await this.usersService.edit(email, pass, newEmail)
  }

  async removeUser(email: string, pass: string) {
    return await this.usersService.remove(email, pass)
  }
}
