import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { EditSanchaekDto } from 'src/sanchaek/dto/edit-sanchaek.dto';
export declare class SanchaekEditPipe implements PipeTransform {
    transform(editSanchaekDto: EditSanchaekDto, metadata: ArgumentMetadata): {
        title: string;
        content: string;
        images: string[];
        mapInfo: import("src/sanchaek/dto/edit-sanchaek.dto").MapInfo;
    };
}
