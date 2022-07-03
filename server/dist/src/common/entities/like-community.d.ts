import { User } from './user.entity';
import { Post } from 'src/posts/entity/post.entity';
export declare class Favorite {
    readonly id: string;
    user_id: string;
    post_id: string;
    user: User;
    post: Post;
}
