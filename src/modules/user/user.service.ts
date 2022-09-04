import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@app/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    // try {
    const createdUser = await this.prisma.user.create({ data });
    return { ...createdUser, password: undefined };
    // } catc//h (error) {
    //   // throw new HttpException(error.message, 403);
    // return { ...error, message: error.message };
    // }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}