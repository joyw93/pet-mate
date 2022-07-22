import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SanchaekEntity } from './sanchaek.entity';
import { CreateSanchaekDto } from './dto/create-sanchaek.dto';
import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
export declare class SanchaekService {
    private sanchaekRepository;
    private userRepository;
    private sanchaekImageRepository;
    constructor(sanchaekRepository: Repository<SanchaekEntity>, userRepository: Repository<UserEntity>, sanchaekImageRepository: Repository<SanchaekImageEntity>);
    createSanchaek(userId: number, createSanchaekDto: CreateSanchaekDto): Promise<SanchaekEntity>;
    uploadImages(sanchaek: SanchaekEntity, imgUrls: string[]): Promise<SanchaekImageEntity[]>;
}
