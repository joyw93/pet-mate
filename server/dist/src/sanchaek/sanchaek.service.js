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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanchaekService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const sanchaek_entity_1 = require("./sanchaek.entity");
const res = require("../common/responses/message");
const sanchaek_image_entity_1 = require("../common/entities/sanchaek-image.entity");
const sanchaek_map_entity_1 = require("../common/entities/sanchaek-map.entity");
let SanchaekService = class SanchaekService {
    constructor(sanchaekRepository, userRepository, sanchaekImageRepository) {
        this.sanchaekRepository = sanchaekRepository;
        this.userRepository = userRepository;
        this.sanchaekImageRepository = sanchaekImageRepository;
    }
    async createSanchaek(userId, createSanchaekDto) {
        try {
            const { title, content, mapInfo } = createSanchaekDto;
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const sanchaek = new sanchaek_entity_1.SanchaekEntity();
            sanchaek.title = title;
            sanchaek.content = content;
            sanchaek.user = user;
            const { lat, lng, location, address, roadAddress } = mapInfo;
            const sanchaekMap = new sanchaek_map_entity_1.SanchaekMapEntity();
            sanchaekMap.lat = lat;
            sanchaekMap.lng = lng;
            sanchaekMap.location = location;
            sanchaekMap.address = address;
            sanchaekMap.roadAddress = roadAddress;
            sanchaek.mapInfo = sanchaekMap;
            return await this.sanchaekRepository.save(sanchaek);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.SANCHAEK_POST_NOT_EXIST);
        }
    }
    async uploadImages(sanchaek, imgUrls) {
        try {
            const result = await Promise.all(imgUrls.map((imgUrl) => {
                const image = new sanchaek_image_entity_1.SanchaekImageEntity();
                image.sanchaek = sanchaek;
                image.url = imgUrl;
                return this.sanchaekImageRepository.save(image);
            }));
            return result;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.SANCHAEK_ADD_IMAGE_FAIL);
        }
    }
};
SanchaekService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sanchaek_entity_1.SanchaekEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(sanchaek_image_entity_1.SanchaekImageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SanchaekService);
exports.SanchaekService = SanchaekService;
//# sourceMappingURL=sanchaek.service.js.map