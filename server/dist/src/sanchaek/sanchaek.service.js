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
const sanchaek_image_entity_1 = require("../common/entities/sanchaek-image.entity");
const sanchaek_map_entity_1 = require("../common/entities/sanchaek-map.entity");
const sanchaek_comment_entity_1 = require("../common/entities/sanchaek-comment.entity");
const res = require("../common/responses/message");
let SanchaekService = class SanchaekService {
    constructor(sanchaekRepository, userRepository, sanchaekImageRepository, sanchaekCommentRepository, sanchaekMapRepository) {
        this.sanchaekRepository = sanchaekRepository;
        this.userRepository = userRepository;
        this.sanchaekImageRepository = sanchaekImageRepository;
        this.sanchaekCommentRepository = sanchaekCommentRepository;
        this.sanchaekMapRepository = sanchaekMapRepository;
    }
    async getSanchaeks(offset, sanchaekCount) {
        try {
            const sanchaeks = this.sanchaekRepository
                .createQueryBuilder('sanchaek')
                .select([
                'sanchaek.id',
                'sanchaek.title',
                'sanchaek.content',
                'sanchaek.createdAt',
            ])
                .addSelect(['user.nickname'])
                .addSelect(['images.url'])
                .leftJoin('sanchaek.images', 'images')
                .leftJoinAndSelect('sanchaek.mapInfo', 'map')
                .leftJoin('sanchaek.user', 'user')
                .skip(offset)
                .take(sanchaekCount)
                .orderBy({ 'sanchaek.createdAt': 'DESC' })
                .getMany();
            return sanchaeks;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.SANCHAEK_GET_POST_FAIL);
        }
    }
    async getSearchSanchaeks(keyword) {
        const sanchaeks = this.sanchaekRepository
            .createQueryBuilder('sanchaek')
            .select([
            'sanchaek.id',
            'sanchaek.title',
            'sanchaek.content',
            'sanchaek.createdAt',
        ])
            .addSelect(['user.nickname'])
            .addSelect(['images.url'])
            .leftJoin('sanchaek.images', 'images')
            .leftJoin('sanchaek.user', 'user')
            .leftJoinAndSelect('sanchaek.mapInfo', 'map')
            .where('sanchaek.title like :keyword', { keyword: `%${keyword}%` })
            .orWhere('sanchaek.content like :keyword', { keyword: `%${keyword}%` })
            .orWhere('map.location like :keyword', { keyword: `%${keyword}%` })
            .orWhere('map.address like :keyword', { keyword: `%${keyword}%` })
            .orWhere('map.roadAddress like :keyword', { keyword: `%${keyword}%` })
            .getMany();
        return sanchaeks;
    }
    async getOneSanchaek(postId) {
        const sanchaek = await this.sanchaekRepository.findOne({
            where: { id: postId },
        });
        if (!sanchaek) {
            throw new common_1.NotFoundException(res.msg.SANCHAEK_POST_NOT_EXIST);
        }
        else {
            sanchaek.views++;
            await this.sanchaekRepository.save(sanchaek);
        }
        try {
            const sanchaek = await this.sanchaekRepository
                .createQueryBuilder('sanchaek')
                .select([
                'sanchaek.id',
                'sanchaek.title',
                'sanchaek.content',
                'sanchaek.createdAt',
                'sanchaek.views',
            ])
                .addSelect(['user.nickname', 'user.id'])
                .addSelect(['images.url'])
                .addSelect(['comments.content', 'comments.id'])
                .addSelect(['author.nickname', 'author.id'])
                .leftJoin('sanchaek.comments', 'comments')
                .leftJoin('comments.author', 'author')
                .leftJoin('sanchaek.images', 'images')
                .leftJoinAndSelect('sanchaek.mapInfo', 'map')
                .leftJoin('sanchaek.user', 'user')
                .where('sanchaek.id= :id', { id: postId })
                .getOne();
            return sanchaek;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.SANCHAEK_GET_POST_FAIL);
        }
    }
    async getHotSanchaeks() {
        try {
            const sanchaeks = await this.sanchaekRepository
                .createQueryBuilder('sanchaek')
                .select([
                'sanchaek.title',
                'sanchaek.id',
                'sanchaek.createdAt',
                'sanchaek.views',
            ])
                .addSelect(['images.url'])
                .addSelect(['user.nickname'])
                .leftJoin('sanchaek.images', 'images')
                .leftJoin('sanchaek.user', 'user')
                .leftJoinAndSelect('sanchaek.mapInfo', 'mapInfo')
                .take(4)
                .getMany();
            return sanchaeks;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.SANCHAEK_GET_POST_FAIL);
        }
    }
    async createSanchaek(userId, createSanchaekDto) {
        try {
            const { title, content, mapInfo } = createSanchaekDto;
            const { lat, lng, location, address, roadAddress } = mapInfo;
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const sanchaek = new sanchaek_entity_1.SanchaekEntity();
            sanchaek.title = title;
            sanchaek.content = content;
            sanchaek.user = user;
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
    async editSanchaek(sanchaekId, editSanchaekDto) {
        const { title, content, mapInfo, images } = editSanchaekDto;
        const { lat, lng, location, address, roadAddress } = mapInfo;
        try {
            const sanchaek = await this.sanchaekRepository.findOne({
                where: { id: sanchaekId },
            });
            const newSanchaek = Object.assign(Object.assign({}, sanchaek), { title, content });
            const savedImages = await this.sanchaekImageRepository.find({
                where: { sanchaekId },
            });
            const sanchaekMap = await this.sanchaekMapRepository.findOne({
                where: { id: sanchaek.mapId },
            });
            if (sanchaekMap) {
                sanchaekMap.lat = lat;
                sanchaekMap.lng = lng;
                sanchaekMap.location = location;
                sanchaekMap.address = address;
                sanchaekMap.roadAddress = roadAddress;
            }
            else {
                const sanchaekMap = new sanchaek_map_entity_1.SanchaekMapEntity();
                sanchaekMap.lat = lat;
                sanchaekMap.lng = lng;
                sanchaekMap.location = location;
                sanchaekMap.address = address;
                sanchaekMap.roadAddress = roadAddress;
            }
            newSanchaek.mapInfo = sanchaekMap;
            if (images) {
                const imagesToDelete = savedImages.filter((savedImage) => !images.includes(savedImage.url));
                await this.sanchaekImageRepository.remove(imagesToDelete);
            }
            else {
                await this.sanchaekImageRepository.delete({ sanchaekId });
            }
            return await this.sanchaekRepository.save(newSanchaek);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.SANCHAEK_EDIT_POST_FAIL);
        }
    }
    async deleteSanchaek(sanchaekId) {
        try {
            return await this.sanchaekRepository.delete(sanchaekId);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.SANCHAEK_DELETE_POST_FAIL);
        }
    }
    async addComment(userId, postId, createCommentDto) {
        const { content } = createCommentDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const sanchaek = await this.sanchaekRepository.findOne({
            where: { id: postId },
        });
        if (!sanchaek)
            throw new common_1.BadRequestException(res.msg.SANCHAEK_POST_NOT_EXIST);
        try {
            const comment = new sanchaek_comment_entity_1.SanchaekCommentEntity();
            comment.author = user;
            comment.sanchaek = sanchaek;
            comment.content = content;
            return await this.sanchaekCommentRepository.save(comment);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.SANCHAEK_CREATE_COMMENT_FAIL);
        }
    }
    async deleteComment(commentId) {
        try {
            return await this.sanchaekCommentRepository.delete(commentId);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(res.msg.SANCHAEK_COMMENT_DELETE_FAIL);
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
    __param(3, (0, typeorm_1.InjectRepository)(sanchaek_comment_entity_1.SanchaekCommentEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(sanchaek_map_entity_1.SanchaekMapEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SanchaekService);
exports.SanchaekService = SanchaekService;
//# sourceMappingURL=sanchaek.service.js.map