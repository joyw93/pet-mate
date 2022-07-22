import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekMapEntity } from 'src/common/entities/sanchaek-map.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class SanchaekEntity {
    id: number;
    title: string;
    content: string;
    user_id: number;
    map_id: number;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: UserEntity;
    images: SanchaekImageEntity[];
    mapInfo: SanchaekMapEntity;
}
