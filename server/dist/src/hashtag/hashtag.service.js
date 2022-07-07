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
exports.HashtagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const community_hashtag_entity_1 = require("../common/entities/community-hashtag.entity");
const typeorm_2 = require("typeorm");
const hashtag_entity_1 = require("./hashtag.entity");
let HashtagService = class HashtagService {
    constructor(communityHashtagRepository, hashtagRepository) {
        this.communityHashtagRepository = communityHashtagRepository;
        this.hashtagRepository = hashtagRepository;
    }
    async addTags(post, createPostDto) {
        const { hashtags } = createPostDto;
        const result = hashtags.map(async (hashtag) => {
            const hashtagFound = await this.hashtagRepository.findOne({
                where: { tag: hashtag },
            });
            const communityHashtag = new community_hashtag_entity_1.CommunityHashtagEntity();
            communityHashtag.post = post;
            if (!hashtagFound) {
                const newTag = await this.hashtagRepository.save({ tag: hashtag });
                communityHashtag.hashtag = newTag;
            }
            else {
                communityHashtag.hashtag = hashtagFound;
            }
            await this.communityHashtagRepository.save(communityHashtag);
        });
        return result;
    }
    async getPosts(tag) {
        const posts = await this.hashtagRepository
            .createQueryBuilder('hashtag')
            .leftJoinAndSelect('hashtag.tags', 'tag')
            .leftJoinAndSelect('tag.post', 'post')
            .where('hashtag.tag = :tag', { tag })
            .getMany();
        return posts;
    }
};
HashtagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(community_hashtag_entity_1.CommunityHashtagEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(hashtag_entity_1.HashtagEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HashtagService);
exports.HashtagService = HashtagService;
//# sourceMappingURL=hashtag.service.js.map