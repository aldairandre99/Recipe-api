import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(email: string, password: string) {
    if (await this.prisma.user.findUnique({ where: { email } })) {
      throw new ConflictException()
    }
    await this.prisma.user.create({
      data: {
        email,
        password
      }
    })
    return HttpStatus.CREATED
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: { email }
    })
  }

  async edit(email: string, id: number) {
    const emailValidator = await this.prisma.user.findUnique({ where: { id } })

    if (!emailValidator) {
      throw new ConflictException()
    }
    const { password, ...result } = emailValidator

    await this.prisma.user.update({ where: { id }, data: { email } })

    return HttpStatus.OK
  }

  async remove(email: string) {
    const emailValidator = await this.prisma.user.findUnique({ where: { email } })

    if (!emailValidator) {
      throw new ConflictException()
    }
    const { password, id, ...result } = emailValidator

    await this.prisma.user.delete({ where: { id } })

    return HttpStatus.OK
  }
}
