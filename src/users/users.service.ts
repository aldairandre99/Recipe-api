import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(email: string, password: string) {
    if (await this.prisma.user.findUnique({ where: { email } })) {
      throw new ConflictException()
    }
    const user = await this.prisma.user.create({
      data: {
        email,
        password
      }
    })
    return user
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: { email }
    })
  }

  async edit(email: string, pass: string, newEmail: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    const matchPass = await bcrypt.compare(pass, user?.password)


    if (!user) {
      throw new ConflictException()
    } else if (!matchPass) {
      throw new UnauthorizedException()
    }


    await this.prisma.user.update({ where: { email }, data: { email: newEmail } })

    return HttpStatus.OK
  }

  async remove(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    const matchPass = await bcrypt.compare(pass, user?.password)

    if (!user) {
      throw new ConflictException()
    } else if (!matchPass) {
      throw new UnauthorizedException()
    }
    const { password, id, ...result } = user

    await this.prisma.user.delete({ where: { id } })

    return HttpStatus.OK
  }
}
