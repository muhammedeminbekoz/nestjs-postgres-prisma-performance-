import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: Prisma.UserCreateInput) {
    console.time('quaresma');
    const result = await this.prisma.user.create({ data: createUserDto });
    console.timeEnd('quaresma');
    return result;
  }

  async createUsersWithFakeData(numberOfUsers: number) {
    const users: Prisma.UserCreateInput[] = [];

    for (let i = 0; i < numberOfUsers; i++) {
      const fakeUser: Prisma.UserCreateInput = {
        firstname: faker.internet.username(),
        lastname: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      users.push(fakeUser);
    }

    console.time('rafa_silva');
    const result = await this.prisma.user.createMany({
      data: users,
    });
    console.timeEnd('rafa_silva');

    return result;
  }

  async createPostsWithFakeData() {
    const users = await this.prisma.user.findMany();

    if (users.length === 0) {
      throw new Error(
        'Kullanıcı yok, lütfen önce kullanıcı verilerini oluşturun.',
      );
    }

    const saveUsers: Prisma.PostCreateManyInput[] = [];

    for (let i = 0; i < 5000; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const data = {
        content: faker.lorem.paragraph(),
        title: faker.lorem.sentence(),
        userId: randomUser.id,
      };

      saveUsers.push(data);
    }

    console.time('create_posts');
    const result = await this.prisma.post.createMany({
      data: saveUsers,
      skipDuplicates: true,
    });
    console.timeEnd('create_posts');

    return result;
  }

  /*   quaresma: 135.962ms
quaresma: 3.138ms
quaresma: 1.971ms
quaresma: 1.771ms
rafa_silva: 81.548ms
rafa_silva: 56.977ms
rafa_silva: 55.432ms */
}
