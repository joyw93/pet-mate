import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ImageFilePipe implements PipeTransform {
  transform(files: Express.Multer.File, metadata: ArgumentMetadata): string[] {
    const imgUrls = [].map.call(files, (file) => file.location);
    return imgUrls;
  }
}
