import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    isValidNickname(nickname: string): Promise<void>;
    isValidEmail(email: string): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string;
        nickname: string;
        id: number;
    }>;
}
