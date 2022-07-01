import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreatePostDto } from './dto/create-post.dto';
export declare class CommunityService {
    private communityRepository;
    constructor(communityRepository: Repository<CommunityEntity>);
    createPost(userId: number, createPostDto: CreatePostDto): Promise<{
        userId: number;
        title: string;
        content: string;
    } & CommunityEntity>;
}
