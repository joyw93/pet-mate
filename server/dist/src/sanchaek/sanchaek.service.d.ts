import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SanchaekEntity } from './sanchaek.entity';
import { CreateSanchaekDto } from './dto/create-sanchaek.dto';
import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekMapEntity } from 'src/common/entities/sanchaek-map.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SanchaekCommentEntity } from 'src/common/entities/sanchaek-comment.entity';
import { EditSanchaekDto } from './dto/edit-sanchaek.dto';
export declare class SanchaekService {
    private sanchaekRepository;
    private userRepository;
    private sanchaekImageRepository;
    private sanchaekCommentRepository;
    private sanchaekMapRepository;
    constructor(sanchaekRepository: Repository<SanchaekEntity>, userRepository: Repository<UserEntity>, sanchaekImageRepository: Repository<SanchaekImageEntity>, sanchaekCommentRepository: Repository<SanchaekCommentEntity>, sanchaekMapRepository: Repository<SanchaekMapEntity>);
    getSanchaeks(offset: number, sanchaekCount: number): Promise<SanchaekEntity[]>;
    getSearchSanchaeks(keyword: string): Promise<SanchaekEntity[]>;
    getOneSanchaek(postId: number): Promise<SanchaekEntity>;
    getHotSanchaeks(): Promise<SanchaekEntity[]>;
    createSanchaek(userId: number, createSanchaekDto: CreateSanchaekDto): Promise<SanchaekEntity>;
    editSanchaek(sanchaekId: number, editSanchaekDto: EditSanchaekDto): Promise<{
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
        comments: SanchaekCommentEntity[];
        images: SanchaekImageEntity[];
        mapInfo: SanchaekMapEntity;
    } & SanchaekEntity>;
    deleteSanchaek(sanchaekId: number): Promise<import("typeorm").DeleteResult>;
    addComment(userId: number, postId: number, createCommentDto: CreateCommentDto): Promise<SanchaekCommentEntity>;
    deleteComment(commentId: number): Promise<import("typeorm").DeleteResult>;
    uploadImages(sanchaek: SanchaekEntity, imgUrls: string[]): Promise<SanchaekImageEntity[]>;
}
