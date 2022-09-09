import { BadRequestException } from '@nestjs/common';

export const checkIsBadRequest = (obj, message: string) => {
  if (obj === null || obj.length === 0) throw new BadRequestException(message);
};
