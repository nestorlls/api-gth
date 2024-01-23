import fs from 'fs';

import { CloudinaryAdapter } from '@config/adapters';
import { UploadFileAbstract } from '@domain/abstracts/services';
import { UploadFileDto, DeleteFileDto } from '@domain/dtos';
import { CustomeError } from '@domain/errors';
import { UploadFileEntity } from '@domain/entities';

export class UploadService implements UploadFileAbstract {
  constructor(private readonly cloudinary: CloudinaryAdapter) {}

  async uploadFile(dto: UploadFileDto): Promise<UploadFileEntity[]> {
    const path = `./uploads/${dto.type}`;
    try {
      const files = await this.cloudinary.uploadFile(dto);
      for (const file of files) {
        fs.unlinkSync(`${path}/${file.uploadFileName}`);
      }
      return files;
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }
  async deleteFile(dto: DeleteFileDto): Promise<string | boolean> {
    return await this.cloudinary.deleteFile(dto);
  }
}
