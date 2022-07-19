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
exports.UserProfileEntity = void 0;
const user_entity_1 = require("../../user/user.entity");
const typeorm_1 = require("typeorm");
let UserProfileEntity = class UserProfileEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], UserProfileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'imageUrl', nullable: true }),
    __metadata("design:type", String)
], UserProfileEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'comment', nullable: true }),
    __metadata("design:type", String)
], UserProfileEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'birth', nullable: true }),
    __metadata("design:type", String)
], UserProfileEntity.prototype, "birth", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.profile, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserProfileEntity.prototype, "user", void 0);
UserProfileEntity = __decorate([
    (0, typeorm_1.Entity)('UserProfile')
], UserProfileEntity);
exports.UserProfileEntity = UserProfileEntity;
//# sourceMappingURL=user-profile.entity.js.map