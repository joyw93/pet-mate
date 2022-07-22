"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanchaekModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sanchaek_image_entity_1 = require("../common/entities/sanchaek-image.entity");
const sanchaek_map_entity_1 = require("../common/entities/sanchaek-map.entity");
const user_entity_1 = require("../user/user.entity");
const sanchaek_controller_1 = require("./sanchaek.controller");
const sanchaek_entity_1 = require("./sanchaek.entity");
const sanchaek_service_1 = require("./sanchaek.service");
let SanchaekModule = class SanchaekModule {
};
SanchaekModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                sanchaek_entity_1.SanchaekEntity,
                sanchaek_map_entity_1.SanchaekMapEntity,
                sanchaek_image_entity_1.SanchaekImageEntity,
            ]),
        ],
        controllers: [sanchaek_controller_1.SanchaekController],
        providers: [sanchaek_service_1.SanchaekService],
    })
], SanchaekModule);
exports.SanchaekModule = SanchaekModule;
//# sourceMappingURL=sanchaek.module.js.map