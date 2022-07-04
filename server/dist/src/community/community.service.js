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
exports.CommunityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const community_like_entity_1 = require("../common/entities/community-like.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const community_entity_1 = require("./community.entity");
let CommunityService = class CommunityService {
    constructor(communityRepository, userRepository, communityLikeRepository) {
        this.communityRepository = communityRepository;
        this.userRepository = userRepository;
        this.communityLikeRepository = communityLikeRepository;
    }
    async createPost(userId, createPostDto) {
        const { title, content } = createPostDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const post = new community_entity_1.CommunityEntity();
        post.title = title;
        post.content = content;
        post.author = user;
        try {
            return await this.communityRepository.save(post);
        }
        catch (err) {
            throw new common_1.HttpException(err, 500);
        }
    }
    async likePost(userId, postId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const post = await this.communityRepository.findOne({
            where: { id: postId },
        });
        const communityLike = new community_like_entity_1.CommunityLikeEntity();
        communityLike.author = user;
        communityLike.post = post;
        try {
            return await this.communityLikeRepository.save(communityLike);
        }
        catch (err) {
            throw new common_1.HttpException(err, 500);
        }
    }
};
CommunityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(community_entity_1.CommunityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(community_like_entity_1.CommunityLikeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommunityService);
exports.CommunityService = CommunityService;
//# sourceMappingURL=community.service.js.map