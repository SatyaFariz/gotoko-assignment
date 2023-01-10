import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { HttpException } from '../classes'

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(@Inject('JWT_REDIS') private readonly jwtRedis) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const bearerToken = request.headers.authorization
    const jwtToken = bearerToken?.slice(7, bearerToken.length)
    const error = {
      message: "Unauthorized",
      error: {}
    }

    try {
      const data = await this.jwtRedis.verify(jwtToken, 'highly_confidentia')

      if(!data) {
        throw new HttpException(error, 401)
      }

      return true

    } catch(e) {
      throw new HttpException(error, 401)
    }
  }
}