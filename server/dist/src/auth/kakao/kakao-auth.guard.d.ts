import { ExecutionContext } from '@nestjs/common';
declare const KakaoAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class KakaoAuthGuard extends KakaoAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
