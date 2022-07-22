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
exports.SanchaekImageEntity = void 0;
const sanchaek_entity_1 = require("../../sanchaek/sanchaek.entity");
const typeorm_1 = require("typeorm");
let SanchaekImageEntity = class SanchaekImageEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], SanchaekImageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'url' }),
    __metadata("design:type", String)
], SanchaekImageEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'sanchaek_id' }),
    __metadata("design:type", Number)
], SanchaekImageEntity.prototype, "sanchaek_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sanchaek_entity_1.SanchaekEntity, (sanchaek) => sanchaek.images, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sanchaek_id', referencedColumnName: 'id' }),
    __metadata("design:type", sanchaek_entity_1.SanchaekEntity)
], SanchaekImageEntity.prototype, "sanchaek", void 0);
SanchaekImageEntity = __decorate([
    (0, typeorm_1.Entity)('SanchaekImage')
], SanchaekImageEntity);
exports.SanchaekImageEntity = SanchaekImageEntity;
//# sourceMappingURL=sanchaek-image.entity.js.map