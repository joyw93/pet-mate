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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const community_service_1 = require("../community/community.service");
const sanchaek_service_1 = require("../sanchaek/sanchaek.service");
const search_service_1 = require("./search.service");
let SearchController = class SearchController {
    constructor(communityService, sanchaekService, searchService) {
        this.communityService = communityService;
        this.sanchaekService = sanchaekService;
        this.searchService = searchService;
    }
    async getSearchPosts(keyword) {
        const communityPosts = await this.communityService.getSearchPosts(keyword);
        const sanchaeks = await this.sanchaekService.getSearchSanchaeks(keyword);
        const posts = { sanchaeks, communityPosts };
        return posts;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getSearchPosts", null);
SearchController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [community_service_1.CommunityService,
        sanchaek_service_1.SanchaekService,
        search_service_1.SearchService])
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map