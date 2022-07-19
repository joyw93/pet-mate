import { UserEntity } from 'src/user/user.entity';
export declare class UserProfileEntity {
    id: number;
    imageUrl: string;
    comment: string;
    birth: string;
    user: UserEntity;
}
