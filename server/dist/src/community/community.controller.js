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
exports.CommunityController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const user_decorator_1 = require("../common/decorators/user.decorator");
const hashtag_service_1 = require("../hashtag/hashtag.service");
const user_entity_1 = require("../user/user.entity");
const community_service_1 = require("./community.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const create_post_dto_1 = require("./dto/create-post.dto");
const s3_1 = require("../common/aws/s3");
const edit_post_dto_1 = require("./dto/edit-post.dto");
const image_file_pipe_1 = require("../common/pipes/image-file.pipe");
const community_edit_pipe_1 = require("../common/pipes/community-edit.pipe");
const community_create_pipe_1 = require("../common/pipes/community-create.pipe");
let CommunityController = class CommunityController {
    constructor(communityService, hashtagService) {
        this.communityService = communityService;
        this.hashtagService = hashtagService;
    }
    async getPosts(offset, postCount, orderBy) {
        return await this.communityService.getPosts(offset !== null && offset !== void 0 ? offset : 0, postCount !== null && postCount !== void 0 ? postCount : 10, orderBy !== null && orderBy !== void 0 ? orderBy : 'new');
    }
    async getHotPosts() {
        return await this.communityService.getHotPosts();
    }
    async getOnePost(postId) {
        return await this.communityService.getOnePost(postId);
    }
    async likePost(user, postId) {
        return await this.communityService.likePost(user.id, postId);
    }
    async createPost(user, imgUrls, createPostDto) {
        const { hashtags } = createPostDto;
        const post = await this.communityService.createPost(user.id, createPostDto);
        if (hashtags) {
            await this.hashtagService.addTags(post, hashtags);
        }
        if (imgUrls) {
            await this.communityService.uploadImages(post, imgUrls);
        }
        return post;
    }
    async editPost(user, postId, imgUrls, editPostDto) {
        const { hashtags } = editPostDto;
        const editedPost = await this.communityService.editPost(user.id, postId, editPostDto);
        if (hashtags) {
            await this.hashtagService.addTags(editedPost, hashtags);
        }
        if (imgUrls) {
            await this.communityService.uploadImages(editedPost, imgUrls);
        }
        return editedPost;
    }
    async deletePost(user, postId) {
        return await this.communityService.deletePost(user.id, postId);
    }
    async addComment(user, postId, createCommentDto) {
        return await this.communityService.addComment(user.id, postId, createCommentDto);
    }
    async editComment(commentId, commentContent) {
        return await this.communityService.editComment(commentId, commentContent);
    }
    async deleteComment(user, commentId) {
        return await this.communityService.deleteComment(user.id, commentId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('offset')),
    __param(1, (0, common_1.Query)('count')),
    __param(2, (0, common_1.Query)('orderBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)('hot-posts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getHotPosts", null);
__decorate([
    (0, common_1.Get)(':postId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getOnePost", null);
__decorate([
    (0, common_1.Get)(':postId/like'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "likePost", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 3, s3_1.createPostConfig)),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFiles)(image_file_pipe_1.ImageFilePipe)),
    __param(2, (0, common_1.Body)(community_create_pipe_1.CommunityCreatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Array, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "createPost", null);
__decorate([
    (0, common_1.Patch)(':postId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 3, s3_1.editPostConfig)),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFiles)(image_file_pipe_1.ImageFilePipe)),
    __param(3, (0, common_1.Body)(community_edit_pipe_1.CommunityEditPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, Array, edit_post_dto_1.EditPostDto]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "editPost", null);
__decorate([
    (0, common_1.Delete)(':postId'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)(':postId/comment'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "addComment", null);
__decorate([
    (0, common_1.Patch)('comment/:commentId'),
    __param(0, (0, common_1.Param)('commentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "editComment", null);
__decorate([
    (0, common_1.Delete)('comment/:commentId'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('commentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "deleteComment", null);
CommunityController = __decorate([
    (0, common_1.Controller)('community'),
    __metadata("design:paramtypes", [community_service_1.CommunityService,
        hashtag_service_1.HashtagService])
], CommunityController);
exports.CommunityController = CommunityController;
//# sourceMappingURL=community.controller.js.map