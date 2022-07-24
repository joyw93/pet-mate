import { Strategy } from 'passport-kakao';
import { AuthService } from '../auth.service';
import { VerifyCallback } from 'passport-google-oauth20';
declare const KakaoStrategy_base: new (...args: any[]) => Strategy;
export declare class KakaoStrategy extends KakaoStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
