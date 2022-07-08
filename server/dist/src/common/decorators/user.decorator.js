"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const res = require("../../common/responses/message");
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        throw new common_1.UnauthorizedException(res.msg.LOGIN_REQUIRED);
    }
    return request.user;
});
//# sourceMappingURL=user.decorator.js.map