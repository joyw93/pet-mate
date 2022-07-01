import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
export declare class LocalSerializer extends PassportSerializer {
    private readonly authService;
    private userRepository;
    constructor(authService: AuthService, userRepository: Repository<UserEntity>);
    serializeUser(user: UserEntity, done: CallableFunction): void;
    deserializeUser(userId: string, done: CallableFunction): Promise<void>;
}
