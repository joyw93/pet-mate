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
exports.SanchaekController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const s3_1 = require("../common/aws/s3");
const user_decorator_1 = require("../common/decorators/user.decorator");
const image_file_pipe_1 = require("../common/pipes/image-file.pipe");
const user_entity_1 = require("../user/user.entity");
const create_sanchaek_dto_1 = require("./dto/create-sanchaek.dto");
const sanchaek_service_1 = require("./sanchaek.service");
let SanchaekController = class SanchaekController {
    constructor(sanchaekService) {
        this.sanchaekService = sanchaekService;
    }
    async createSanchaek(user, imgUrls, createSanchaekDto) {
        const sanchaek = await this.sanchaekService.createSanchaek(user.id, createSanchaekDto);
        if (imgUrls) {
            await this.sanchaekService.uploadImages(sanchaek, imgUrls);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 3, s3_1.createSanchaekConfig)),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFiles)(image_file_pipe_1.ImageFilePipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Array, create_sanchaek_dto_1.CreateSanchaekDto]),
    __metadata("design:returntype", Promise)
], SanchaekController.prototype, "createSanchaek", null);
SanchaekController = __decorate([
    (0, common_1.Controller)('sanchaek'),
    __metadata("design:paramtypes", [sanchaek_service_1.SanchaekService])
], SanchaekController);
exports.SanchaekController = SanchaekController;
//# sourceMappingURL=sanchaek.controller.js.map