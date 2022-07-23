import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { EditSanchaekDto } from 'src/sanchaek/dto/edit-sanchaek.dto';

@Injectable()
export class SanchaekEditPipe implements PipeTransform {
  transform(editSanchaekDto: EditSanchaekDto, metadata: ArgumentMetadata) {
    const {  images } = editSanchaekDto;
    const transformedEditSanchaekDto = { ...editSanchaekDto };
    // hash태그가 배열이 아닌 단일 string값으로 넘어올 때 배열 type으로 transform
    
    if (typeof images === 'string') {
        transformedEditSanchaekDto.images = [images];
    }
    return transformedEditSanchaekDto
  }
}
