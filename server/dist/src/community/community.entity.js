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
exports.CommunityEntity = void 0;
const community_comment_entity_1 = require("../common/entities/community-comment.entity");
const community_hashtag_entity_1 = require("../common/entities/community-hashtag.entity");
const community_image_entity_1 = require("../common/entities/community-image.entity");
const community_like_entity_1 = require("../common/entities/community-like.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let CommunityEntity = class CommunityEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], CommunityEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'title' }),
    __metadata("design:type", String)
], CommunityEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'content' }),
    __metadata("design:type", String)
], CommunityEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'authorId' }),
    __metadata("design:type", Number)
], CommunityEntity.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'views', default: 0 }),
    __metadata("design:type", Number)
], CommunityEntity.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CommunityEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CommunityEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], CommunityEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (author) => author.posts, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([
        {
            name: 'authorId',
            referencedColumnName: 'id',
        },
    ]),
    __metadata("design:type", user_entity_1.UserEntity)
], CommunityEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => community_like_entity_1.CommunityLikeEntity, (like) => like.post, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], CommunityEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => community_comment_entity_1.CommunityCommentEntity, (comment) => comment.post, { cascade: true }),
    __metadata("design:type", Array)
], CommunityEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => community_hashtag_entity_1.CommunityHashtagEntity, (tag) => tag.post, { cascade: true }),
    __metadata("design:type", Array)
], CommunityEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => community_image_entity_1.CommunityImageEntity, (image) => image.post, { cascade: true }),
    __metadata("design:type", Array)
], CommunityEntity.prototype, "images", void 0);
CommunityEntity = __decorate([
    (0, typeorm_1.Entity)('Community')
], CommunityEntity);
exports.CommunityEntity = CommunityEntity;
//# sourceMappingURL=community.entity.js.map