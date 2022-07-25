import { UserEntity } from 'src/user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateSanchaekDto } from './dto/create-sanchaek.dto';
import { EditSanchaekDto } from './dto/edit-sanchaek.dto';
import { SanchaekService } from './sanchaek.service';
export declare class SanchaekController {
    private readonly sanchaekService;
    constructor(sanchaekService: SanchaekService);
    createSanchaek(user: UserEntity, imgUrls: string[], createSanchaekDto: CreateSanchaekDto): Promise<import("./sanchaek.entity").SanchaekEntity>;
    editSanchaek(user: UserEntity, sanchaekId: number, imgUrls: string[], editSanchaekDto: EditSanchaekDto): Promise<{
        title: string;
        content: string;
        id: number;
        userId: number;
        mapId: number;
        views: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        user: UserEntity;
        comments: import("../common/entities/sanchaek-comment.entity").SanchaekCommentEntity[];
        images: import("../common/entities/sanchaek-image.entity").SanchaekImageEntity[];
        mapInfo: import("../common/entities/sanchaek-map.entity").SanchaekMapEntity;
    } & import("./sanchaek.entity").SanchaekEntity>;
    deleteSanchaek(user: UserEntity, sanchaekId: number): Promise<import("typeorm").DeleteResult>;
    getSanchaeks(): Promise<import("./sanchaek.entity").SanchaekEntity[]>;
    getOneSanchaek(sanchaekId: number): Promise<import("./sanchaek.entity").SanchaekEntity>;
    addComment(user: UserEntity, sanchaekId: number, createCommentDto: CreateCommentDto): Promise<import("../common/entities/sanchaek-comment.entity").SanchaekCommentEntity>;
    deleteComment(user: UserEntity, commentId: number): Promise<import("typeorm").DeleteResult>;
}
