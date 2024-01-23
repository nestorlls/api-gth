import { DeleteFileDto, UploadFileDto } from '@domain/dtos';
import { UploadFileEntity } from '@domain/entities';

export abstract class UploadFileAbstract {
  abstract uploadFile(dto: UploadFileDto): Promise<UploadFileEntity[]>;
  abstract deleteFile(dto: DeleteFileDto): Promise<boolean | string>;
}
