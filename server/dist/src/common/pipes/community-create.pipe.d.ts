import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { CreatePostDto } from 'src/community/dto/create-post.dto';
export declare class CommunityCreatePipe implements PipeTransform {
    transform(createPostDto: CreatePostDto, metadata: ArgumentMetadata): {
        title: string;
        content: string;
        hashtags: string[];
    };
}
