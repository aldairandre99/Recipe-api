import { Injectable, HttpCode, UnauthorizedException, HttpStatus, } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }


  async signIn(email: string, pass: string) {

    const user = await this.usersService.findOne(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    return HttpStatus.OK;
  }

  async singUp(email: string, pass: string) {
    return await this.usersService.create(email, pass)
  }

  async editUser(email: string, idUser: number) {
    return await this.usersService.edit(email, idUser)
  }

  async removeUser(email: string) {
    return await this.usersService.remove(email)
  }
}
