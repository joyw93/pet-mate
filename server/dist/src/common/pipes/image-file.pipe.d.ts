/// <reference types="multer" />
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ImageFilePipe implements PipeTransform {
    transform(files: Express.Multer.File, metadata: ArgumentMetadata): string[];
}
