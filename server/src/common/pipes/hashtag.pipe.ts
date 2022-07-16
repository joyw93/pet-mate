import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { EditPostDto } from 'src/community/dto/edit-post.dto';

@Injectable()
export class HashtagPipe implements PipeTransform {
  transform(editPostDto: EditPostDto, metadata: ArgumentMetadata) {
    const { hashtags } = editPostDto;
    // hash태그가 배열이 아닌 단일 string값으로 넘어올 때 배열 type으로 transform
    if (typeof hashtags === 'string') {
      return { ...editPostDto, hashtags: [hashtags] };
    } else {
      return editPostDto;
    }
  }
}
