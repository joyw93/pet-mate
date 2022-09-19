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
exports.SanchaekCommentEntity = void 0;
const sanchaek_entity_1 = require("../../sanchaek/sanchaek.entity");
const user_entity_1 = require("../../user/user.entity");
const typeorm_1 = require("typeorm");
const sanchaek_comment_like_entity_1 = require("./sanchaek-comment-like.entity");
let SanchaekCommentEntity = class SanchaekCommentEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], SanchaekCommentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'content' }),
    __metadata("design:type", String)
], SanchaekCommentEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'parentId', nullable: true }),
    __metadata("design:type", Number)
], SanchaekCommentEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'depth', default: 0 }),
    __metadata("design:type", Number)
], SanchaekCommentEntity.prototype, "depth", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SanchaekCommentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], SanchaekCommentEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (author) => author.sanchaekComments, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'authorId', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], SanchaekCommentEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sanchaek_entity_1.SanchaekEntity, (sanchaek) => sanchaek.comments, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sanchaekId', referencedColumnName: 'id' }),
    __metadata("design:type", sanchaek_entity_1.SanchaekEntity)
], SanchaekCommentEntity.prototype, "sanchaek", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sanchaek_comment_like_entity_1.SanchaekCommentLikeEntity, (like) => like.comment, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], SanchaekCommentEntity.prototype, "likes", void 0);
SanchaekCommentEntity = __decorate([
    (0, typeorm_1.Entity)('SanchaekComment')
], SanchaekCommentEntity);
exports.SanchaekCommentEntity = SanchaekCommentEntity;
//# sourceMappingURL=sanchaek-comment.entity.js.map