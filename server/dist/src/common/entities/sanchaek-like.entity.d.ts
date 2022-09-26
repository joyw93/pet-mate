import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class SanchaekLikeEntity {
    id: number;
    userId: number;
    sanchaekId: number;
    sanchaek: SanchaekEntity;
    user: UserEntity;
}
