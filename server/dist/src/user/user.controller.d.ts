import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    nicknameCheck(body: any): Promise<void>;
    emailCheck(body: any): Promise<void>;
    signup(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string;
        nickname: string;
        id: number;
    }>;
    login(user: UserEntity): Promise<UserEntity>;
    test(user: any): Promise<void>;
}
