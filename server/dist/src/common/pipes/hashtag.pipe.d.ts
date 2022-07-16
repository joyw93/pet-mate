import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { EditPostDto } from 'src/community/dto/edit-post.dto';
export declare class HashtagPipe implements PipeTransform {
    transform(editPostDto: EditPostDto, metadata: ArgumentMetadata): EditPostDto;
}
