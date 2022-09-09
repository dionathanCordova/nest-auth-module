import { userStub } from '../__stubs__/user';

export const mockUserPrisma = {
  user: {
    create: jest.fn().mockResolvedValue(userStub.createResponse),
    findUnique: jest.fn().mockResolvedValue(userStub.createResponse),
  },
};
