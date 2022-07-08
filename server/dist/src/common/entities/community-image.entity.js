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
exports.CommunityImageEntity = void 0;
const community_entity_1 = require("../../community/community.entity");
const typeorm_1 = require("typeorm");
let CommunityImageEntity = class CommunityImageEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], CommunityImageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'url' }),
    __metadata("design:type", String)
], CommunityImageEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'post_id' }),
    __metadata("design:type", Number)
], CommunityImageEntity.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => community_entity_1.CommunityEntity, (post) => post.imgUrls, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'post_id', referencedColumnName: 'id' }),
    __metadata("design:type", community_entity_1.CommunityEntity)
], CommunityImageEntity.prototype, "post", void 0);
CommunityImageEntity = __decorate([
    (0, typeorm_1.Entity)('CommunityImage')
], CommunityImageEntity);
exports.CommunityImageEntity = CommunityImageEntity;
//# sourceMappingURL=community-image.entity.js.map