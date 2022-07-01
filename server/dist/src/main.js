"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/exceptions/http-exception.filter");
const success_interceptors_1 = require("./common/interceptors/success.interceptors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new success_interceptors_1.SuccessInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: ['http://127.0.0.1:800', 'http://petmate.kr'],
        credentials: true,
    });
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
            domain: '.petmate.kr'
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map