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
exports.SanchaekMapEntity = void 0;
const sanchaek_entity_1 = require("../../sanchaek/sanchaek.entity");
const typeorm_1 = require("typeorm");
let SanchaekMapEntity = class SanchaekMapEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], SanchaekMapEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'lat' }),
    __metadata("design:type", String)
], SanchaekMapEntity.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'lng' }),
    __metadata("design:type", String)
], SanchaekMapEntity.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'location' }),
    __metadata("design:type", String)
], SanchaekMapEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'address' }),
    __metadata("design:type", String)
], SanchaekMapEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'road_address' }),
    __metadata("design:type", String)
], SanchaekMapEntity.prototype, "roadAddress", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => sanchaek_entity_1.SanchaekEntity, (sanchaek) => sanchaek.mapInfo, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", sanchaek_entity_1.SanchaekEntity)
], SanchaekMapEntity.prototype, "sanchaek", void 0);
SanchaekMapEntity = __decorate([
    (0, typeorm_1.Entity)('SanchaekMap')
], SanchaekMapEntity);
exports.SanchaekMapEntity = SanchaekMapEntity;
//# sourceMappingURL=sanchaek-map.entity.js.map