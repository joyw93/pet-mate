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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityCommentLikeEntity = void 0;
const user_entity_1 = require("../../user/user.entity");
const typeorm_1 = require("typeorm");
const community_comment_entity_1 = require("./community-comment.entity");
let CommunityCommentLikeEntity = class CommunityCommentLikeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], CommunityCommentLikeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'userId' }),
    __metadata("design:type", Number)
], CommunityCommentLikeEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'commentId' }),
    __metadata("design:type", Number)
], CommunityCommentLikeEntity.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => community_comment_entity_1.CommunityCommentEntity, (comment) => comment.likes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'commentId', referencedColumnName: 'id' }),
    __metadata("design:type", community_comment_entity_1.CommunityCommentEntity)
], CommunityCommentLikeEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.likes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], CommunityCommentLikeEntity.prototype, "user", void 0);
CommunityCommentLikeEntity = __decorate([
    (0, typeorm_1.Entity)('CommunityCommentLike')
], CommunityCommentLikeEntity);
exports.CommunityCommentLikeEntity = CommunityCommentLikeEntity;
//# sourceMappingURL=community-comment-like.entity.js.map