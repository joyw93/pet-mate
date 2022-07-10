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
exports.CommunityHashtagEntity = void 0;
const community_entity_1 = require("../../community/community.entity");
const hashtag_entity_1 = require("../../hashtag/hashtag.entity");
const typeorm_1 = require("typeorm");
let CommunityHashtagEntity = class CommunityHashtagEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], CommunityHashtagEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => community_entity_1.CommunityEntity, (post) => post.tags, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'post_id', referencedColumnName: 'id' }),
    __metadata("design:type", community_entity_1.CommunityEntity)
], CommunityHashtagEntity.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hashtag_entity_1.HashtagEntity, (hashtag) => hashtag.tags, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tag_id', referencedColumnName: 'id' }),
    __metadata("design:type", hashtag_entity_1.HashtagEntity)
], CommunityHashtagEntity.prototype, "hashtag", void 0);
CommunityHashtagEntity = __decorate([
    (0, typeorm_1.Entity)('CommunityHashtag')
], CommunityHashtagEntity);
exports.CommunityHashtagEntity = CommunityHashtagEntity;
//# sourceMappingURL=community-hashtag.entity.js.map