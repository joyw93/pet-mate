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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const community_entity_1 = require("../community/community.entity");
const community_like_entity_1 = require("../common/entities/community-like.entity");
let UserService = class UserService {
    constructor(userRepository, communityRepository, communityLikeRepository) {
        this.userRepository = userRepository;
        this.communityRepository = communityRepository;
        this.communityLikeRepository = communityLikeRepository;
    }
    async isValidNickname(nickname) {
        const userByNickname = await this.userRepository.findOne({
            where: { nickname },
        });
        if (userByNickname) {
            throw new common_1.UnauthorizedException('해당 닉네임은 이미 존재합니다.');
        }
    }
    async isValidEmail(email) {
        const userByEmail = await this.userRepository.findOne({
            where: { email },
        });
        if (userByEmail) {
            throw new common_1.UnauthorizedException('해당 이메일은 이미 존재합니다.');
        }
    }
    async createUser(createUserDto) {
        const { email, nickname, password } = createUserDto;
        const userByEmail = await this.userRepository.findOne({
            where: { email },
        });
        if (userByEmail) {
            throw new common_1.UnauthorizedException('해당 이메일은 이미 존재합니다.');
        }
        const userByNickname = await this.userRepository.findOne({
            where: { nickname },
        });
        if (userByNickname) {
            throw new common_1.UnauthorizedException('해당 닉네임은 이미 존재합니다.');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        try {
            const user = await this.userRepository.save(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Internal Server Error', 500);
        }
    }
    async getLikedPosts(userId) {
        const posts = this.userRepository
            .createQueryBuilder('user')
            .select(['user.id'])
            .leftJoinAndSelect('user.likes', 'like')
            .leftJoinAndSelect('like.post', 'post')
            .where('user.id = :id', { id: userId })
            .getMany();
        return posts;
    }
    async getCommentedPosts(userId) {
        const posts = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.comments', 'comment')
            .where('user.id=:id', { id: userId })
            .getMany();
        return posts;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(community_entity_1.CommunityEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(community_like_entity_1.CommunityLikeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map