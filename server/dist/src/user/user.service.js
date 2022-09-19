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
const user_profile_entity_1 = require("../common/entities/user-profile.entity");
const community_entity_1 = require("../community/community.entity");
const bcrypt = require("bcrypt");
const res = require("../common/responses/message");
const sanchaek_entity_1 = require("../sanchaek/sanchaek.entity");
let UserService = class UserService {
    constructor(userRepository, userProfileRepository, communityRepository, sanchaekRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.communityRepository = communityRepository;
        this.sanchaekRepository = sanchaekRepository;
    }
    async getMyProfile(userId) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.name',
            'user.nickname',
            'user.email',
            'user.active',
        ])
            .addSelect(['profile.imageUrl', 'profile.comment', 'profile.birth'])
            .leftJoin('user.profile', 'profile')
            .where('user.id= :id', { id: userId })
            .getOne();
        return user;
    }
    async getUserProfile(userId) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.name',
            'user.nickname',
            'user.email',
            'user.active',
        ])
            .addSelect(['profile.imageUrl', 'profile.comment', 'profile.birth'])
            .leftJoin('user.profile', 'profile')
            .where('user.id= :id', { id: userId })
            .getOne();
        return user;
    }
    async checkNickname(nickname) {
        const userByNickname = await this.userRepository.findOne({
            where: { nickname },
        });
        if (userByNickname) {
            throw new common_1.UnauthorizedException(res.msg.SIGNUP_REDUNDANT_NICKNAME);
        }
    }
    async checkEmail(email) {
        const userByEmail = await this.userRepository.findOne({
            where: { email },
        });
        if (userByEmail) {
            throw new common_1.UnauthorizedException(res.msg.SIGNUP_REDUNDANT_EMAIL);
        }
    }
    async createUser(createUserDto) {
        const { email, nickname, password } = createUserDto;
        const userByEmail = await this.userRepository.findOne({
            where: { email },
        });
        if (userByEmail) {
            throw new common_1.UnauthorizedException(res.msg.SIGNUP_REDUNDANT_EMAIL);
        }
        const userByNickname = await this.userRepository.findOne({
            where: { nickname },
        });
        if (userByNickname) {
            throw new common_1.UnauthorizedException(res.msg.SIGNUP_REDUNDANT_NICKNAME);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        try {
            const userProfile = new user_profile_entity_1.UserProfileEntity();
            const user = await this.userRepository.save(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword, provider: 'local', active: true, profile: userProfile }));
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async setProfile(userId, setProfileDto) {
        const { nickname } = setProfileDto;
        const userByNickname = await this.userRepository.findOne({
            where: { nickname },
        });
        if (userByNickname) {
            throw new common_1.UnauthorizedException(res.msg.SIGNUP_REDUNDANT_NICKNAME);
        }
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        user.nickname = nickname;
        user.active = true;
        return await this.userRepository.save(user);
    }
    async editProfile(userId, editProfileDto, imgUrls) {
        const { nickname, birthday, comment } = editProfileDto;
        const userByNickname = await this.userRepository.findOne({
            where: { nickname },
        });
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        const userProfile = await this.userProfileRepository.findOne({
            where: { id: user.profileId },
        });
        if (userByNickname && user.nickname !== nickname) {
            throw new common_1.UnauthorizedException(res.msg.SIGNUP_REDUNDANT_NICKNAME);
        }
        if (imgUrls.length == 0) {
            userProfile.imageUrl = null;
        }
        else {
            userProfile.imageUrl = imgUrls[0];
        }
        userProfile.comment = comment;
        userProfile.birth = birthday;
        user.nickname = nickname;
        user.profile = userProfile;
        return await this.userRepository.save(user);
    }
    async editAccount(userId, editAccountDto) {
        const { currentPassword, newPassword } = editAccountDto;
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.name',
            'user.nickname',
            'user.email',
            'user.password',
        ])
            .where('user.id= :id', { id: userId })
            .getOne();
        const isAuthenticated = await bcrypt.compare(currentPassword, user.password);
        if (!isAuthenticated) {
            throw new common_1.UnauthorizedException(res.msg.LOGIN_PASSWORD_WRONG);
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedNewPassword;
        return await this.userRepository.save(user);
    }
    async googleLoginCallback(req, res) {
        if (!req.user) {
            return res.send('login error');
        }
        else {
            const user = req.user;
            if (!user.active) {
                return res.redirect(`http://petmate.kr/auth/google`);
            }
            else {
                return res.redirect(`http://petmate.kr`);
            }
        }
    }
    async kakaoLoginCallback(req, res) {
        if (!req.user) {
            return res.send('login error');
        }
        else {
            const user = req.user;
            if (!user.active) {
                return res.redirect(`http://petmate.kr/auth/kakao`);
            }
            else {
                return res.redirect(`http://petmate.kr`);
            }
        }
    }
    async getMyPosts(userId) {
        const posts = await this.communityRepository
            .createQueryBuilder('post')
            .select(['post.id', 'post.title', 'post.content', 'images.url'])
            .leftJoin('post.author', 'author')
            .leftJoin('post.images', 'images')
            .where('author.id = :id', { id: userId })
            .getMany();
        return posts;
    }
    async getMySanchaeks(userId) {
        const sanchaeks = await this.sanchaekRepository
            .createQueryBuilder('sanchaek')
            .select([
            'sanchaek.id',
            'sanchaek.title',
            'sanchaek.content',
            'sanchaek.createdAt',
            'user.nickname',
            'images.url',
        ])
            .leftJoin('sanchaek.user', 'user')
            .leftJoin('sanchaek.images', 'images')
            .leftJoinAndSelect('sanchaek.mapInfo', 'map')
            .where('user.id =:id', { id: userId })
            .getMany();
        return sanchaeks;
    }
    async getLikedPosts(userId) {
        const posts = await this.communityRepository
            .createQueryBuilder('post')
            .select(['post.id', 'post.title', 'post.content', 'images.url'])
            .leftJoin('post.likes', 'likes')
            .leftJoin('post.images', 'images')
            .where('likes.userId = :id', { id: userId })
            .getMany();
        return posts;
    }
    async getLikedSanchaeks(userId) {
        const sanchaeks = await this.sanchaekRepository
            .createQueryBuilder('sanchaek')
            .select(['sanchaek.id', 'sanchaek.title', 'sanchaek.content', 'images.url'])
            .leftJoin('sanchaek.likes', 'likes')
            .leftJoin('sanchaek.images', 'images')
            .where('likes.userId = :id', { id: userId })
            .getMany();
        return sanchaeks;
    }
    async getCommentedPosts(userId) {
        const posts = await this.communityRepository
            .createQueryBuilder('post')
            .select(['post.id', 'post.title', 'post.content', 'images.url'])
            .leftJoin('post.images', 'images')
            .leftJoin('post.comments', 'comments')
            .leftJoin('comments.author', 'author')
            .where('author.id=:id', { id: userId })
            .getMany();
        return posts;
    }
    async getCommentedSanchaeks(userId) {
        const sanchaeks = await this.sanchaekRepository
            .createQueryBuilder('sanchaek')
            .select([
            'sanchaek.id',
            'sanchaek.title',
            'sanchaek.content',
            'images.url',
        ])
            .leftJoin('sanchaek.images', 'images')
            .leftJoin('sanchaek.comments', 'comments')
            .leftJoin('comments.author', 'author')
            .where('author.id=:id', { id: userId })
            .getMany();
        return sanchaeks;
    }
    async signout(userId) {
        return await this.userRepository.delete(userId);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfileEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(community_entity_1.CommunityEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(sanchaek_entity_1.SanchaekEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map