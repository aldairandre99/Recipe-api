import { Injectable, HttpCode, UnauthorizedException, HttpStatus, } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }
  saltOrRounds: number = 10;

  async signIn(email: string, pass: string) {

    const user = await this.usersService.findOne(email);

    const isMatch = await bcrypt.compare(pass, user?.password)
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return HttpStatus.OK;
  }

  async singUp(email: string, pass: string) {

    const hashPass = await bcrypt.hash(pass, this.saltOrRounds)

    return await this.usersService.create(email, hashPass)
  }

  async editUser(email: string, pass: string, newEmail: string) {
    return await this.usersService.edit(email, pass, newEmail)
  }

  async removeUser(email: string, pass: string) {
    return await this.usersService.remove(email, pass)
  }
}
