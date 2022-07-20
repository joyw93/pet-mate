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
const community_entity_1 = require("../community/community.entity");
const typeorm_2 = require("typeorm");
const hashtag_entity_1 = require("./hashtag.entity");
const res = require("../common/responses/message");
const community_like_entity_1 = require("../common/entities/community-like.entity");
let HashtagService = class HashtagService {
    constructor(communityHashtagRepository, hashtagRepository, communityRepository, communityLikeRepository) {
        this.communityHashtagRepository = communityHashtagRepository;
        this.hashtagRepository = hashtagRepository;
        this.communityRepository = communityRepository;
        this.communityLikeRepository = communityLikeRepository;
    }
    async addTags(post, hashtags) {
        try {
            const result = await Promise.all(hashtags.map(async (hashtag) => {
                const hashtagFound = await this.hashtagRepository.findOne({
                    where: { keyword: hashtag },
                });
                const communityHashtag = new community_hashtag_entity_1.CommunityHashtagEntity();
                communityHashtag.post = post;
                if (!hashtagFound) {
                    const newTag = await this.hashtagRepository.save({
                        keyword: hashtag,
                    });
                    communityHashtag.hashtag = newTag;
                }
                else {
                    communityHashtag.hashtag = hashtagFound;
                }
                return await this.communityHashtagRepository.save(communityHashtag);
            }));
            return result;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_ADD_HASHTAG_FAIL);
        }
    }
    async getPosts(keyword) {
        const likeCount = this.communityLikeRepository
            .createQueryBuilder()
            .subQuery()
            .select(['post_id', 'COUNT(likes.user_id) AS likeCount'])
            .from(community_like_entity_1.CommunityLikeEntity, 'likes')
            .groupBy('post_id')
            .getQuery();
        const posts = await this.communityRepository
            .createQueryBuilder('post')
            .select([
            'post.id',
            'post.title',
            'post.content',
            'post.createdAt',
            'post.views',
            'author.nickname',
            'images.url',
            'tags.id',
            'hashtag.keyword',
            'LikeCount.likeCount',
        ])
            .leftJoin('post.author', 'author')
            .leftJoin('post.images', 'images')
            .leftJoin('post.tags', 'tags')
            .leftJoin('post.likes', 'likes')
            .leftJoin('tags.hashtag', 'hashtag')
            .leftJoin(likeCount, 'LikeCount', 'LikeCount.post_id = post.id')
            .loadRelationCountAndMap('post.likeCount', 'post.likes')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('hashtag.keyword=:keyword', { keyword })
            .getMany();
        return posts;
    }
};
HashtagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(community_hashtag_entity_1.CommunityHashtagEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(hashtag_entity_1.HashtagEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(community_entity_1.CommunityEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(community_like_entity_1.CommunityLikeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HashtagService);
exports.HashtagService = HashtagService;
//# sourceMappingURL=hashtag.service.js.map