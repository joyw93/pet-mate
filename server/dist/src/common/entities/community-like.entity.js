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
exports.CommunityLikeEntity = void 0;
const community_entity_1 = require("../../community/community.entity");
const user_entity_1 = require("../../user/user.entity");
const typeorm_1 = require("typeorm");
let CommunityLikeEntity = class CommunityLikeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], CommunityLikeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'author_id' }),
    __metadata("design:type", Number)
], CommunityLikeEntity.prototype, "author_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'post_id' }),
    __metadata("design:type", Number)
], CommunityLikeEntity.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => community_entity_1.CommunityEntity, (post) => post.likes),
    (0, typeorm_1.JoinColumn)({ name: 'post_id', referencedColumnName: 'id' }),
    __metadata("design:type", community_entity_1.CommunityEntity)
], CommunityLikeEntity.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (author) => author.likes),
    (0, typeorm_1.JoinColumn)({ name: 'author_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], CommunityLikeEntity.prototype, "author", void 0);
CommunityLikeEntity = __decorate([
    (0, typeorm_1.Entity)('CommunityLike')
], CommunityLikeEntity);
exports.CommunityLikeEntity = CommunityLikeEntity;
//# sourceMappingURL=community-like.entity.js.map