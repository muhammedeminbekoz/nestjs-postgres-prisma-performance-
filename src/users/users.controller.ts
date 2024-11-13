import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
    const result = await this.usersService.createUser(createUserDto);
    return result;
  }

  @Post('many')
  async createManyUser(@Body() body: any) {
    return this.usersService.createUsersWithFakeData(body.count);
  }

  @Get('post')
  async createPost() {
    return this.usersService.createPostsWithFakeData();
  }
}
