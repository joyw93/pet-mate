import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CreatePostDto } from 'src/community/dto/create-post.dto';

@Injectable()
export class CommunityCreatePipe implements PipeTransform {
  transform(createPostDto: CreatePostDto, metadata: ArgumentMetadata) {
    const {  hashtags } = createPostDto;
    const transformedcreatePostDto = { ...createPostDto };
    // hash태그가 배열이 아닌 단일 string값으로 넘어올 때 배열 type으로 transform
    if (typeof hashtags === 'string') {
      transformedcreatePostDto.hashtags = [hashtags];
    }

    return transformedcreatePostDto;
  }
}
