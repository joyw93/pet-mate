import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    validateUser(email: string, password: string): Promise<{
        id: number;
        name: string;
        nickname: string;
        email: string;
        profile_id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        profile: import("../common/entities/user-profile.entity").UserProfileEntity;
        posts: import("../community/community.entity").CommunityEntity[];
        sanchaeks: import("../sanchaek/sanchaek.entity").SanchaekEntity[];
        likes: import("../common/entities/community-like.entity").CommunityLikeEntity[];
        communityComments: import("../common/entities/community-comment.entity").CommunityCommentEntity[];
        sanchaekComments: import("../common/entities/sanchaek-comment.entity").SanchaekCommentEntity[];
    }>;
    validateGoogleUser(email: string, name: string, accessToken: string): Promise<UserEntity>;
}
