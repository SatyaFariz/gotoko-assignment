import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(@Inject('JWT_REDIS') private readonly jwtRedis) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const bearerToken = request.headers.authorization
    const jwtToken = bearerToken.slice(7, bearerToken.length)
    console.log('jwtToken', jwtToken)
    try {
      const data = await this.jwtRedis.verify(jwtToken, 'highly_confidentia')
      console.log('data nya',data)
      return data !== null

    } catch(e) {
      console.log(e)
      return false
    }
    
  }
}