import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class CommunityController {
    private readonly communityService;
    constructor(communityService: CommunityService);
    createPost(user: UserEntity, createPostDto: CreatePostDto): Promise<import("./community.entity").CommunityEntity>;
    likePost(user: UserEntity, param: any): Promise<import("../common/entities/community-like.entity").CommunityLikeEntity>;
}
