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
exports.SanchaekLikeEntity = void 0;
const sanchaek_entity_1 = require("../../sanchaek/sanchaek.entity");
const user_entity_1 = require("../../user/user.entity");
const typeorm_1 = require("typeorm");
let SanchaekLikeEntity = class SanchaekLikeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], SanchaekLikeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'userId' }),
    __metadata("design:type", Number)
], SanchaekLikeEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'sanchaekId' }),
    __metadata("design:type", Number)
], SanchaekLikeEntity.prototype, "sanchaekId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sanchaek_entity_1.SanchaekEntity, (sanchaek) => sanchaek.likes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sanchaekId', referencedColumnName: 'id' }),
    __metadata("design:type", sanchaek_entity_1.SanchaekEntity)
], SanchaekLikeEntity.prototype, "sanchaek", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.likes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], SanchaekLikeEntity.prototype, "user", void 0);
SanchaekLikeEntity = __decorate([
    (0, typeorm_1.Entity)('SanchaekLike')
], SanchaekLikeEntity);
exports.SanchaekLikeEntity = SanchaekLikeEntity;
//# sourceMappingURL=sanchaek-like.entity.js.map