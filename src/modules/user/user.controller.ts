import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/:email')
  fidByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}
