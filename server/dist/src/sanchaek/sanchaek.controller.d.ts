import { UserEntity } from 'src/user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateSanchaekDto } from './dto/create-sanchaek.dto';
import { EditSanchaekDto } from './dto/edit-sanchaek.dto';
import { SanchaekService } from './sanchaek.service';
export declare class SanchaekController {
    private readonly sanchaekService;
    constructor(sanchaekService: SanchaekService);
    createSanchaek(user: UserEntity, imgUrls: string[], createSanchaekDto: CreateSanchaekDto): Promise<void>;
    editSanchaek(user: UserEntity, postId: number, imgUrls: string[], editSanchaekDto: EditSanchaekDto): Promise<{
        title: string;
        content: string;
        id: number;
        user_id: number;
        map_id: number;
        views: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user: UserEntity;
        comments: import("../common/entities/sanchaek-comment.entity").SanchaekCommentEntity[];
        images: import("../common/entities/sanchaek-image.entity").SanchaekImageEntity[];
        mapInfo: import("../common/entities/sanchaek-map.entity").SanchaekMapEntity;
    } & import("./sanchaek.entity").SanchaekEntity>;
    deleteSanchaek(user: UserEntity, postId: number): Promise<import("typeorm").DeleteResult>;
    getSanchaeks(): Promise<import("./sanchaek.entity").SanchaekEntity[]>;
    getOneSanchaek(postId: number): Promise<import("./sanchaek.entity").SanchaekEntity>;
    addComment(user: UserEntity, postId: number, createCommentDto: CreateCommentDto): Promise<import("../common/entities/sanchaek-comment.entity").SanchaekCommentEntity>;
    deleteComment(user: UserEntity, commentId: number): Promise<import("typeorm").DeleteResult>;
}
