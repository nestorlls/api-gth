import { UploadFileAbstract } from '@domain/abstracts/services';
import { UploadFileDto } from '@domain/dtos';
import { UploadFileEntity } from '@domain/entities/uploadfile.entity';

interface IUploadFile {
  execute(dto: UploadFileDto): Promise<UploadFileEntity[]>;
}

export class UploadFile implements IUploadFile {
  constructor(private readonly service: UploadFileAbstract) {}

  execute(dto: UploadFileDto): Promise<UploadFileEntity[]> {
    return this.service.uploadFile(dto);
  }
}
