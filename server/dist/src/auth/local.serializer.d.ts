import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
export declare class Serializer extends PassportSerializer {
    private readonly authService;
    private userRepository;
    constructor(authService: AuthService, userRepository: Repository<UserEntity>);
    serializeUser(user: any, done: CallableFunction): void;
    deserializeUser(userEmail: string, done: any): Promise<void>;
}
