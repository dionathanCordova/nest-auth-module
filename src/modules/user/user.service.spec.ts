import { PrismaService } from '@app/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mockUserPrisma } from './__mocks__/user';
import { userStub } from './__stubs__/user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockUserPrisma)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when create user', () => {
    it('should be create an user', async () => {
      const create = await service.create(userStub.create);

      expect(create).toHaveProperty('id');
      expect(create).toHaveProperty('email');
      expect(create).toHaveProperty('name');
      expect(create).toHaveProperty('password');
      expect(create.password).toBe(undefined);
    });

    it('should be throw erro if email is not valid', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce({
        statusCode: 500,
        path: '/user',
        message: 'Unique constraint failed on the fields: (`email`)',
      });

      try {
        await service.create(userStub.create);
      } catch (error) {
        expect(error.statusCode).toBe(500);
      }
    });
  });

  describe('when find user by email', () => {
    it('should return user', async () => {
      const findUser = await service.findByEmail(userStub.create.email);

      expect(findUser).toHaveProperty('email');
      expect(findUser.password).toBe(undefined);
    });

    it('should return error if user is not found', async () => {
      jest.spyOn(service, 'findByEmail').mockRejectedValueOnce({
        statusCode: 400,
        path: '/user/john@doe.com2',
        message: 'User not found',
      });

      try {
        await service.findByEmail(userStub.create.email);
      } catch (error) {
        expect(error.message).toBe('User not found');
      }
    });
  });
});
