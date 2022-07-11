import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
export declare class GoogleSerializer extends PassportSerializer {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    serializeUser(user: any, done: CallableFunction): void;
    deserializeUser(userEmail: string, done: CallableFunction): Promise<void>;
}
