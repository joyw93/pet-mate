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
const community_comment_entity_1 = require("../common/entities/community-comment.entity");
const community_like_entity_1 = require("../common/entities/community-like.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const community_entity_1 = require("./community.entity");
const community_image_entity_1 = require("../common/entities/community-image.entity");
const community_hashtag_entity_1 = require("../common/entities/community-hashtag.entity");
const res = require("../common/responses/message");
const hashtag_entity_1 = require("../hashtag/hashtag.entity");
let CommunityService = class CommunityService {
    constructor(communityRepository, userRepository, communityLikeRepository, communityCommentRepository, communityImageRepository, communityHashtagRepository, hashtagRepository, dataSource) {
        this.communityRepository = communityRepository;
        this.userRepository = userRepository;
        this.communityLikeRepository = communityLikeRepository;
        this.communityCommentRepository = communityCommentRepository;
        this.communityImageRepository = communityImageRepository;
        this.communityHashtagRepository = communityHashtagRepository;
        this.hashtagRepository = hashtagRepository;
        this.dataSource = dataSource;
    }
    async getPosts(offset, postCount, orderBy) {
        let cond;
        if (orderBy === 'new') {
            cond = { 'post.createdAt': 'DESC' };
        }
        else if (orderBy === 'old') {
            cond = { 'post.createdAt': 'ASC' };
        }
        else if (orderBy === 'like') {
            cond = { likeCount: 'DESC' };
        }
        else if (orderBy === 'views') {
            cond = { 'post.views': 'DESC' };
        }
        try {
            const likeCount = this.communityLikeRepository
                .createQueryBuilder()
                .subQuery()
                .select(['post_id', 'COUNT(likes.user_id) AS likeCount'])
                .from(community_like_entity_1.CommunityLikeEntity, 'likes')
                .groupBy('post_id')
                .getQuery();
            const posts = this.communityRepository
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
                .skip(offset)
                .take(postCount)
                .orderBy(cond)
                .getMany();
            return posts;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_GET_POST_FAIL);
        }
    }
    async getOnePost(postId, userId) {
        const post = await this.communityRepository.findOne({
            where: { id: postId },
        });
        const communityLike = await this.communityLikeRepository.findOne({
            where: { user_id: userId, post_id: postId },
        });
        let isLike;
        if (userId !== post.author_id) {
            isLike = null;
        }
        else {
            isLike = communityLike !== null;
        }
        if (!post) {
            throw new common_1.NotFoundException(res.msg.COMMUNITY_POST_NOT_EXIST);
        }
        else {
            post.views++;
            await this.communityRepository.save(post);
        }
        try {
            const post = await this.communityRepository
                .createQueryBuilder('post')
                .select([
                'post.id',
                'post.title',
                'post.content',
                'post.createdAt',
                'post.views',
                'author.nickname',
                'images.id',
                'images.url',
                'comments.id',
                'comments.content',
                'comments.createdAt',
                'commentAuthor.nickname',
                'tags.id',
                'hashtag.keyword',
            ])
                .leftJoin('post.author', 'author')
                .leftJoin('post.comments', 'comments')
                .leftJoin('comments.author', 'commentAuthor')
                .leftJoin('post.images', 'images')
                .leftJoin('post.tags', 'tags')
                .leftJoin('post.likes', 'likes')
                .leftJoin('tags.hashtag', 'hashtag')
                .loadRelationCountAndMap('post.likeCount', 'post.likes')
                .where('post.id = :id', { id: postId })
                .getOne();
            return Object.assign(Object.assign({}, post), { isLike });
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_GET_POST_FAIL);
        }
    }
    async getHotPosts() {
        try {
            const posts = await this.communityRepository
                .createQueryBuilder('post')
                .select(['post.id', 'post.title', 'post.createdAt'])
                .addSelect('COUNT(post.id)', 'likeCount')
                .groupBy('likes.post_id')
                .leftJoin('post.likes', 'likes')
                .take(2)
                .orderBy({ likeCount: 'DESC', 'post.createdAt': 'DESC' })
                .getMany();
            return posts;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_GET_POST_FAIL);
        }
    }
    async createPost(userId, createPostDto) {
        try {
            const { title, content } = createPostDto;
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const post = new community_entity_1.CommunityEntity();
            post.title = title;
            post.content = content;
            post.author = user;
            return await this.communityRepository.save(post);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_CREATE_POST_FAIL);
        }
    }
    async editPost(postId, editPostDto) {
        const { title, content, images } = editPostDto;
        try {
            const oldPost = await this.communityRepository.findOne({
                where: { id: postId },
            });
            const newPost = Object.assign(Object.assign({}, oldPost), { title, content });
            const savedImages = await this.communityImageRepository.find({
                where: { post_id: postId },
            });
            if (savedImages.length === 0)
                return await this.communityRepository.save(newPost);
            if (images) {
                const imagesToDelete = savedImages.filter((savedImage) => !images.includes(savedImage.url));
                await this.communityImageRepository.remove(imagesToDelete);
            }
            else {
                await this.communityImageRepository.delete({ post_id: postId });
            }
            return await this.communityRepository.save(newPost);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_EDIT_POST_FAIL);
        }
    }
    async deletePost(postId) {
        try {
            return await this.communityRepository.delete(postId);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_DELETE_POST_FAIL);
        }
    }
    async likePost(userId, postId) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const post = await this.communityRepository.findOne({
                where: { id: postId },
            });
            const communityLike = await this.communityLikeRepository.findOne({
                where: { user_id: userId, post_id: postId },
            });
            if (communityLike) {
                return await this.communityLikeRepository.remove(communityLike);
            }
            else {
                const communityLike = new community_like_entity_1.CommunityLikeEntity();
                communityLike.user = user;
                communityLike.post = post;
                return await this.communityLikeRepository.save(communityLike);
            }
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_LIKE_FAIL);
        }
    }
    async getAllComments(postId) {
        try {
            return await this.communityRepository.find({
                where: { id: postId },
                relations: ['comments'],
            });
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_LIKE_FAIL);
        }
    }
    async createComment(userId, postId, createCommentDto) {
        const { content } = createCommentDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const post = await this.communityRepository.findOne({
            where: { id: postId },
        });
        if (!post)
            throw new common_1.BadRequestException(res.msg.COMMUNITY_POST_NOT_EXIST);
        try {
            const comment = new community_comment_entity_1.CommunityCommentEntity();
            comment.author = user;
            comment.post = post;
            comment.content = content;
            return await this.communityCommentRepository.save(comment);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_CREATE_COMMENT_FAIL);
        }
    }
    async editComment(commentId, content) {
        try {
            const oldComment = await this.communityCommentRepository.findOne({
                where: { id: commentId },
            });
            const newComment = Object.assign(Object.assign({}, oldComment), { content });
            return await this.communityCommentRepository.save(newComment);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_COMMENT_EDIT_FAIL);
        }
    }
    async deleteComment(commentId) {
        try {
            return await this.communityCommentRepository.delete(commentId);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_COMMENT_DELETE_FAIL);
        }
    }
    async uploadImages(post, imgUrls) {
        try {
            const result = await Promise.all(imgUrls.map((imgUrl) => {
                const img = new community_image_entity_1.CommunityImageEntity();
                img.post = post;
                img.url = imgUrl;
                return this.communityImageRepository.save(img);
            }));
            return result;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.COMMUNITY_ADD_IMAGE_FAIL);
        }
    }
};
CommunityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(community_entity_1.CommunityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(community_like_entity_1.CommunityLikeEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(community_comment_entity_1.CommunityCommentEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(community_image_entity_1.CommunityImageEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(community_hashtag_entity_1.CommunityHashtagEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(hashtag_entity_1.HashtagEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], CommunityService);
exports.CommunityService = CommunityService;
//# sourceMappingURL=community.service.js.map