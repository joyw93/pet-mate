"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const community_comment_entity_1 = require("../common/entities/community-comment.entity");
const community_hashtag_entity_1 = require("../common/entities/community-hashtag.entity");
const community_image_entity_1 = require("../common/entities/community-image.entity");
const community_like_entity_1 = require("../common/entities/community-like.entity");
const user_profile_entity_1 = require("../common/entities/user-profile.entity");
const hashtag_entity_1 = require("../hashtag/hashtag.entity");
const hashtag_service_1 = require("../hashtag/hashtag.service");
const user_entity_1 = require("../user/user.entity");
const community_controller_1 = require("./community.controller");
const community_entity_1 = require("./community.entity");
const community_service_1 = require("./community.service");
let CommunityModule = class CommunityModule {
};
CommunityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                community_entity_1.CommunityEntity,
                community_comment_entity_1.CommunityCommentEntity,
                community_like_entity_1.CommunityLikeEntity,
                community_hashtag_entity_1.CommunityHashtagEntity,
                community_image_entity_1.CommunityImageEntity,
                hashtag_entity_1.HashtagEntity,
                user_entity_1.UserEntity,
                user_profile_entity_1.UserProfileEntity
            ]),
        ],
        controllers: [community_controller_1.CommunityController],
        providers: [community_service_1.CommunityService, hashtag_service_1.HashtagService],
        exports: [community_service_1.CommunityService]
    })
], CommunityModule);
exports.CommunityModule = CommunityModule;
//# sourceMappingURL=community.module.js.map