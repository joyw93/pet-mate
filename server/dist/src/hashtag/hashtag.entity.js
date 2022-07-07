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
exports.HashtagEntity = void 0;
const community_hashtag_entity_1 = require("../common/entities/community-hashtag.entity");
const typeorm_1 = require("typeorm");
let HashtagEntity = class HashtagEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], HashtagEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'tag' }),
    __metadata("design:type", String)
], HashtagEntity.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => community_hashtag_entity_1.CommunityHashtagEntity, (tag) => tag.hashtag, { cascade: true }),
    __metadata("design:type", Array)
], HashtagEntity.prototype, "tags", void 0);
HashtagEntity = __decorate([
    (0, typeorm_1.Entity)('Hashtag')
], HashtagEntity);
exports.HashtagEntity = HashtagEntity;
//# sourceMappingURL=hashtag.entity.js.map