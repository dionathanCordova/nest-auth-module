import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo(): object {
    return { info: `Api running at ${process.env.API_PORT} port` };
  }
}
