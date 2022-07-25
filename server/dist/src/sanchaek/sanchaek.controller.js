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
const sanchaek_edit_pipe_1 = require("../common/pipes/sanchaek-edit.pipe");
const user_entity_1 = require("../user/user.entity");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const create_sanchaek_dto_1 = require("./dto/create-sanchaek.dto");
const edit_sanchaek_dto_1 = require("./dto/edit-sanchaek.dto");
const sanchaek_service_1 = require("./sanchaek.service");
let SanchaekController = class SanchaekController {
    constructor(sanchaekService) {
        this.sanchaekService = sanchaekService;
    }
    async getSanchaeks(offset, sanchaekCount) {
        return await this.sanchaekService.getSanchaeks(offset !== null && offset !== void 0 ? offset : 0, sanchaekCount !== null && sanchaekCount !== void 0 ? sanchaekCount : 12);
    }
    async getHotSanchaeks() {
        return await this.sanchaekService.getHotSanchaeks();
    }
    async getOneSanchaek(sanchaekId) {
        return await this.sanchaekService.getOneSanchaek(sanchaekId);
    }
    async createSanchaek(user, imgUrls, createSanchaekDto) {
        const sanchaek = await this.sanchaekService.createSanchaek(user.id, createSanchaekDto);
        if (imgUrls) {
            await this.sanchaekService.uploadImages(sanchaek, imgUrls);
        }
        return sanchaek;
    }
    async editSanchaek(user, sanchaekId, imgUrls, editSanchaekDto) {
        const editedSanchaek = await this.sanchaekService.editSanchaek(sanchaekId, editSanchaekDto);
        if (imgUrls) {
            await this.sanchaekService.uploadImages(editedSanchaek, imgUrls);
        }
        return editedSanchaek;
    }
    async deleteSanchaek(user, sanchaekId) {
        return await this.sanchaekService.deleteSanchaek(sanchaekId);
    }
    async addComment(user, sanchaekId, createCommentDto) {
        return await this.sanchaekService.addComment(user.id, sanchaekId, createCommentDto);
    }
    async deleteComment(user, commentId) {
        return await this.sanchaekService.deleteComment(commentId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('offset')),
    __param(1, (0, common_1.Query)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SanchaekController.prototype, "getSanchaeks", null);
__decorate([
    (0, common_1.Get)('hot-sanchaek-posts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SanchaekController.prototype, "getHotSanchaeks", null);
__decorate([
    (0, common_1.Get)(':sanchaekId'),
    __param(0, (0, common_1.Param)('sanchaekId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SanchaekController.prototype, "getOneSanchaek", null);
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
__decorate([
    (0, common_1.Patch)(':sanchaekId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 3, s3_1.editSanchaekConfig)),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('sanchaekId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFiles)(image_file_pipe_1.ImageFilePipe)),
    __param(3, (0, common_1.Body)(sanchaek_edit_pipe_1.SanchaekEditPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, Array, edit_sanchaek_dto_1.EditSanchaekDto]),
    __metadata("design:returntype", Promise)
], SanchaekController.prototype, "editSanchaek", null);
__decorate([
    (0, common_1.Delete)(':sanchaekId'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('sanchaekId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], SanchaekController.prototype, "deleteSanchaek", null);
__decorate([
    (0, common_1.Post)(':sanchaekId/comment'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('sanchaekId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], SanchaekController.prototype, "addComment", null);
__decorate([
    (0, common_1.Delete)('comment/:commentId'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('commentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], SanchaekController.prototype, "deleteComment", null);
SanchaekController = __decorate([
    (0, common_1.Controller)('sanchaek'),
    __metadata("design:paramtypes", [sanchaek_service_1.SanchaekService])
], SanchaekController);
exports.SanchaekController = SanchaekController;
//# sourceMappingURL=sanchaek.controller.js.map