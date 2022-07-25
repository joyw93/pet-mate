import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
export declare class AuthService {
    private userRepository;
    private userProfileRepository;
    constructor(userRepository: Repository<UserEntity>, userProfileRepository: Repository<UserProfileEntity>);
    validateUser(email: string, password: string): Promise<{
        id: number;
        name: string;
        nickname: string;
        email: string;
        provider: string;
        active: boolean;
        profileId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        profile: UserProfileEntity;
        posts: import("../community/community.entity").CommunityEntity[];
        sanchaeks: import("../sanchaek/sanchaek.entity").SanchaekEntity[];
        likes: import("../common/entities/community-like.entity").CommunityLikeEntity[];
        communityComments: import("../common/entities/community-comment.entity").CommunityCommentEntity[];
        sanchaekComments: import("../common/entities/sanchaek-comment.entity").SanchaekCommentEntity[];
    }>;
    validateGoogleUser(email: string, name: string, accessToken: string): Promise<UserEntity>;
    validateKakaoUser(email: string, name: string, accessToken: string): Promise<UserEntity>;
}
