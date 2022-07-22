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
exports.SanchaekEntity = void 0;
const sanchaek_image_entity_1 = require("../common/entities/sanchaek-image.entity");
const sanchaek_map_entity_1 = require("../common/entities/sanchaek-map.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let SanchaekEntity = class SanchaekEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], SanchaekEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'title' }),
    __metadata("design:type", String)
], SanchaekEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'content' }),
    __metadata("design:type", String)
], SanchaekEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'user_id' }),
    __metadata("design:type", Number)
], SanchaekEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'map_id' }),
    __metadata("design:type", Number)
], SanchaekEntity.prototype, "map_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'views', default: 0 }),
    __metadata("design:type", Number)
], SanchaekEntity.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SanchaekEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SanchaekEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], SanchaekEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.sanchaeks, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([
        {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    ]),
    __metadata("design:type", user_entity_1.UserEntity)
], SanchaekEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sanchaek_image_entity_1.SanchaekImageEntity, (image) => image.sanchaek, { cascade: true }),
    __metadata("design:type", Array)
], SanchaekEntity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => sanchaek_map_entity_1.SanchaekMapEntity, (mapInfo) => mapInfo.sanchaek, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'map_id', referencedColumnName: 'id' }),
    __metadata("design:type", sanchaek_map_entity_1.SanchaekMapEntity)
], SanchaekEntity.prototype, "mapInfo", void 0);
SanchaekEntity = __decorate([
    (0, typeorm_1.Entity)('Sanchaek')
], SanchaekEntity);
exports.SanchaekEntity = SanchaekEntity;
//# sourceMappingURL=sanchaek.entity.js.map