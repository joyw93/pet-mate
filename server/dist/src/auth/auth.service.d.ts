import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    validateUser(email: string, password: string): Promise<{
        id: number;
        name: string;
        nickname: string;
        email: string;
    }>;
}
