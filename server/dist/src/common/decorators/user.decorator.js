"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = { id: 2, email: 'mdlife94@gmail.com' };
    return user;
});
//# sourceMappingURL=user.decorator.js.map