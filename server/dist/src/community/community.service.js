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
const AWS = require("aws-sdk");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const community_comment_entity_1 = require("../common/entities/community-comment.entity");
const community_like_entity_1 = require("../common/entities/community-like.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const community_entity_1 = require("./community.entity");
const community_image_entity_1 = require("../common/entities/community-image.entity");
const res = require("../common/responses/message");
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    region: process.env.AWS_REGION,
});
let CommunityService = class CommunityService {
    constructor(communityRepository, userRepository, communityLikeRepository, communityCommentRepository, communityImageRepository) {
        this.communityRepository = communityRepository;
        this.userRepository = userRepository;
        this.communityLikeRepository = communityLikeRepository;
        this.communityCommentRepository = communityCommentRepository;
        this.communityImageRepository = communityImageRepository;
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
            ])
                .leftJoin('post.author', 'author')
                .leftJoin('post.images', 'images')
                .leftJoin('post.tags', 'tags')
                .leftJoin('post.likes', 'likes')
                .leftJoin('tags.hashtag', 'hashtag')
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
            throw new common_1.InternalServerErrorException(res.msg.GET_POST_FAIL);
        }
    }
    async getOnePost(postId) {
        const post = await this.communityRepository.findOne({
            where: { id: postId },
        });
        if (!post) {
            throw new common_1.NotFoundException(res.msg.POST_NOT_EXIST);
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
                .addSelect('COUNT(distinct likes.id)', 'likeCount')
                .leftJoin('post.author', 'author')
                .leftJoin('post.comments', 'comments')
                .leftJoin('comments.author', 'commentAuthor')
                .leftJoin('post.images', 'images')
                .leftJoin('post.tags', 'tags')
                .leftJoin('post.likes', 'likes')
                .leftJoin('tags.hashtag', 'hashtag')
                .where('post.id = :id', { id: postId })
                .getOne();
            return post;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.GET_POST_FAIL);
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
            throw new common_1.InternalServerErrorException(res.msg.GET_POST_FAIL);
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
            post.views = 0;
            return await this.communityRepository.save(post);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.CREATE_POST_FAIL);
        }
    }
    async editPost(postId, editPostDto) {
        try {
            const { title, content } = editPostDto;
            const oldPost = await this.communityRepository.findOne({
                where: { id: postId },
            });
            const newPost = Object.assign(Object.assign({}, oldPost), { title, content });
            return await this.communityRepository.save(newPost);
        }
        catch (err) {
            console.error(err);
        }
    }
    async deletePost(postId) {
        try {
            return await this.communityRepository.delete(postId);
        }
        catch (err) {
            throw new common_1.HttpException(err, 500);
        }
    }
    async likePost(userId, postId) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const post = await this.communityRepository.findOne({
                where: { id: postId },
            });
            const communityLike = new community_like_entity_1.CommunityLikeEntity();
            communityLike.author = user;
            communityLike.post = post;
            return await this.communityLikeRepository.save(communityLike);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
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
            throw new common_1.HttpException(err, 500);
        }
    }
    async createComment(userId, postId, createCommentDto) {
        const { content } = createCommentDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const post = await this.communityRepository.findOne({
            where: { id: postId },
        });
        if (!post)
            throw new common_1.BadRequestException(res.msg.POST_NOT_EXIST);
        try {
            const comment = new community_comment_entity_1.CommunityCommentEntity();
            comment.author = user;
            comment.post = post;
            comment.content = content;
            return await this.communityCommentRepository.save(comment);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.CREATE_COMMENT_FAIL);
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
            throw new common_1.HttpException(err, 500);
        }
    }
    async deleteComment(commentId) {
        try {
            return await this.communityCommentRepository.delete(commentId);
        }
        catch (err) {
            throw new common_1.HttpException(err, 500);
        }
    }
    async uploadImages(post, files) {
        const imgUrls = [].map.call(files, (file) => file.location);
        try {
            const result = Promise.all(imgUrls.map((imgUrl) => {
                const img = new community_image_entity_1.CommunityImageEntity();
                img.post = post;
                img.url = imgUrl;
                return this.communityImageRepository.save(img);
            }));
            return result;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.ADD_IMAGE_FAIL);
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommunityService);
exports.CommunityService = CommunityService;
//# sourceMappingURL=community.service.js.map