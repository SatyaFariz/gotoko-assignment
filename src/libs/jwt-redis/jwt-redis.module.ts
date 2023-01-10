import * as redis from 'redis'
import { Module } from '@nestjs/common';
const JWTR =  require('jwt-redis').default

@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: 'redis://redis:6379'
      }
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'JWT_REDIS',
      useFactory: async (options: { url: string }) => {
        const client = redis.createClient(options);
        await client.connect();
        const jwtr = new JWTR(client);
        return jwtr;
        return client
      }
    }
  ],
  exports: ['JWT_REDIS'],
})

export class JWTRedisModule {}