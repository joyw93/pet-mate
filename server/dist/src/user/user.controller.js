"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const google_auth_guard_1 = require("../auth/google/google-auth.guard");
const kakao_auth_guard_1 = require("../auth/kakao/kakao-auth.guard");
const local_auth_guard_1 = require("../auth/local/local-auth.guard");
const s3_1 = require("../common/aws/s3");
const user_decorator_1 = require("../common/decorators/user.decorator");
const image_file_pipe_1 = require("../common/pipes/image-file.pipe");
const create_user_dto_1 = require("./dto/create-user.dto");
const edit_account_dto_1 = require("./dto/edit-account.dto");
const edit_profile_dto_1 = require("./dto/edit-profile.dto");
const set_profile_dto_1 = require("./dto/set-profile.dto");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getMyProfile(user) {
        return await this.userService.getMyProfile(user.id);
    }
    async checkNickname(data) {
        return await this.userService.checkNickname(data.nickname);
    }
    async emailCheck(data) {
        return await this.userService.checkEmail(data.email);
    }
    async signup(createUserDto) {
        return await this.userService.createUser(createUserDto);
    }
    async login(user) {
        return user;
    }
    async setProfile(user, setProfileDto) {
        return await this.userService.setProfile(user.id, setProfileDto);
    }
    async editProfile(user, imgUrls, editProfileDto) {
        return await this.userService.editProfile(user.id, editProfileDto, imgUrls);
    }
    async setAccount(user, editAccountDto) {
        return await this.userService.editAccount(user.id, editAccountDto);
    }
    async googleLogin(req) { }
    async googleLoginCallback(req, res) {
        return this.userService.googleLoginCallback(req, res);
    }
    async kakaoLogin(req) { }
    async kakaoLoginCallback(req, res) {
        return this.userService.kakaoLoginCallback(req, res);
    }
    async logout(req, res) {
        try {
            req.logout(() => {
                res.send({
                    success: true,
                    timestamp: new Date().toISOString(),
                });
            });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getMyPosts(user) {
        return await this.userService.getMyPosts(user.id);
    }
    async getMySanchaeks(user) {
        return await this.userService.getMySanchaeks(user.id);
    }
    async getLikedPosts(user) {
        return await this.userService.getLikedPosts(user.id);
    }
    async getCommentedPosts(user) {
        return await this.userService.getCommentedPosts(user.id);
    }
    async signout(user) {
        return await this.userService.signout(user.id);
    }
    async getUserProfile(userId) {
        return await this.userService.getUserProfile(userId);
    }
    async isLoggedIn(user, req) {
        console.log(user);
        console.log(req.session);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Post)('nickname-check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkNickname", null);
__decorate([
    (0, common_1.Post)('email-check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "emailCheck", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('profile'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        set_profile_dto_1.SetProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 1, s3_1.setProfileConfig)),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFiles)(image_file_pipe_1.ImageFilePipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Array, edit_profile_dto_1.EditProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editProfile", null);
__decorate([
    (0, common_1.Patch)('account'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        edit_account_dto_1.EditAccountDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setAccount", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "googleLoginCallback", null);
__decorate([
    (0, common_1.Get)('kakao'),
    (0, common_1.UseGuards)(kakao_auth_guard_1.KakaoAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "kakaoLogin", null);
__decorate([
    (0, common_1.Get)('kakao/callback'),
    (0, common_1.UseGuards)(kakao_auth_guard_1.KakaoAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "kakaoLoginCallback", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('posts'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyPosts", null);
__decorate([
    (0, common_1.Get)('sanchaeks'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMySanchaeks", null);
__decorate([
    (0, common_1.Get)('liked-posts'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLikedPosts", null);
__decorate([
    (0, common_1.Get)('commented-posts'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCommentedPosts", null);
__decorate([
    (0, common_1.Delete)('signout'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signout", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)('session'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isLoggedIn", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map