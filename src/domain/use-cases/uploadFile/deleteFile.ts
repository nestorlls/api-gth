import { UploadFileAbstract } from '@domain/abstracts/services';
import { DeleteFileDto } from '@domain/dtos';

interface IDeleteFile {
  execute(dto: DeleteFileDto): Promise<boolean | string>;
}

export class DeleteFile implements IDeleteFile {
  constructor(private readonly service: UploadFileAbstract) {}

  execute(dto: DeleteFileDto): Promise<string | boolean> {
    return this.service.deleteFile(dto);
  }
}
