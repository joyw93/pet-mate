"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const community_comment_entity_1 = require("../common/entities/community-comment.entity");
const community_hashtag_entity_1 = require("../common/entities/community-hashtag.entity");
const community_image_entity_1 = require("../common/entities/community-image.entity");
const community_like_entity_1 = require("../common/entities/community-like.entity");
const sanchaek_comment_entity_1 = require("../common/entities/sanchaek-comment.entity");
const sanchaek_image_entity_1 = require("../common/entities/sanchaek-image.entity");
const sanchaek_map_entity_1 = require("../common/entities/sanchaek-map.entity");
const user_profile_entity_1 = require("../common/entities/user-profile.entity");
const community_entity_1 = require("../community/community.entity");
const community_service_1 = require("../community/community.service");
const hashtag_entity_1 = require("../hashtag/hashtag.entity");
const sanchaek_entity_1 = require("../sanchaek/sanchaek.entity");
const sanchaek_service_1 = require("../sanchaek/sanchaek.service");
const user_entity_1 = require("../user/user.entity");
const search_controller_1 = require("./search.controller");
const search_service_1 = require("./search.service");
let SearchModule = class SearchModule {
};
SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                community_entity_1.CommunityEntity,
                community_comment_entity_1.CommunityCommentEntity,
                community_like_entity_1.CommunityLikeEntity,
                community_hashtag_entity_1.CommunityHashtagEntity,
                community_image_entity_1.CommunityImageEntity,
                sanchaek_entity_1.SanchaekEntity,
                sanchaek_map_entity_1.SanchaekMapEntity,
                sanchaek_image_entity_1.SanchaekImageEntity,
                sanchaek_comment_entity_1.SanchaekCommentEntity,
                hashtag_entity_1.HashtagEntity,
                user_entity_1.UserEntity,
                user_profile_entity_1.UserProfileEntity
            ])],
        controllers: [search_controller_1.SearchController],
        providers: [search_service_1.SearchService, community_service_1.CommunityService, sanchaek_service_1.SanchaekService]
    })
], SearchModule);
exports.SearchModule = SearchModule;
//# sourceMappingURL=search.module.js.map