import { UserEntity } from 'src/user/user.entity';
import { CreateSanchaekDto } from './dto/create-sanchaek.dto';
import { SanchaekService } from './sanchaek.service';
export declare class SanchaekController {
    private readonly sanchaekService;
    constructor(sanchaekService: SanchaekService);
    createSanchaek(user: UserEntity, imgUrls: string[], createSanchaekDto: CreateSanchaekDto): Promise<void>;
}
