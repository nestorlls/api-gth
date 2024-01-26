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
    let files = [];
    try {
      files = await this.cloudinary.uploadFile(dto);

      if (files.length > 0) {
        for (const file of dto.files) {
          fs.unlinkSync(`${path}/${file.filename}`);
        }
      }
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    return files.map(UploadFileEntity.fromObject);
  }
  async deleteFile(dto: DeleteFileDto): Promise<string | boolean> {
    return await this.cloudinary.deleteFile(dto);
  }
}
