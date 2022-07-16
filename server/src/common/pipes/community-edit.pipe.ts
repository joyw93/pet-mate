import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { EditPostDto } from 'src/community/dto/edit-post.dto';

@Injectable()
export class CommunityEditPipe implements PipeTransform {
  transform(editPostDto: EditPostDto, metadata: ArgumentMetadata) {
    const { savedImages, hashtags } = editPostDto;
    const transformedEditPostDto = { ...editPostDto };
    // hash태그가 배열이 아닌 단일 string값으로 넘어올 때 배열 type으로 transform
    if (typeof hashtags === 'string') {
      transformedEditPostDto.hashtags = [hashtags];
    }
    // savedImages가 배열이 아닌 단일 string값으로 넘어올 때 배열 type으로 transform
    if (typeof savedImages === 'string') {
      transformedEditPostDto.savedImages = [savedImages];
    }
    return transformedEditPostDto
  }
}