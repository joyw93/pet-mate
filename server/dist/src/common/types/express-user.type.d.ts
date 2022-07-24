import { UserEntity } from "src/user/user.entity";
declare global {
    namespace Express {
        interface User extends UserEntity {
        }
    }
}
