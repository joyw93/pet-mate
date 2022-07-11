import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as res from '../../common/responses/message';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if(!user) {
      throw new UnauthorizedException(res.msg.LOGIN_REQUIRED)  
    }
    return request.user;
  },
);