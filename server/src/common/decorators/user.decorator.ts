import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as res from '../../common/responses/message';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user = request.user;
    if (!user) {
      throw new UnauthorizedException(res.msg.LOGIN_REQUIRED)
      // user = { id: 1 };
      // return user;
    }
    return request.user;

    // const user = { id: 1 };
    // return user;
  },
);
