import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class CommunityController {
    private readonly communityService;
    constructor(communityService: CommunityService);
    createPost(createPostDto: CreatePostDto, user: UserEntity): Promise<{
        userId: number;
        title: string;
        content: string;
    } & import("./community.entity").CommunityEntity>;
}
