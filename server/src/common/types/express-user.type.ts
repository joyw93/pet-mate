import { UserEntity } from "src/user/user.entity";

declare global {
  namespace Express {
    export interface User extends UserEntity { }
  }
}