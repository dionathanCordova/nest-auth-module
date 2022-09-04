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
      // jest.spyOn(service, 'create').mockResolvedValue(Error);
      const create = await service.create(userStub.create);

      console.log(create);
      // expect(create).toHaveProperty('id');
      // expect(create).toHaveProperty('email');
      // expect(create).toHaveProperty('name');
      // expect(create).toHaveProperty('password');
      // expect(create.password).toBe(undefined);
    });
  });
});
