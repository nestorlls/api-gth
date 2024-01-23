import { v2 as cloudinary } from 'cloudinary';

import { UploadFileAbstract } from '@domain/abstracts/services';
import { CustomeError } from '@domain/errors';
import { DeleteFileDto, UploadFileDto } from '@domain/dtos';
import { UploadFileEntity } from '@domain/entities';

export class CloudinaryAdapter implements UploadFileAbstract {
  private readonly cloudinary = cloudinary;

  constructor(
    private readonly cloud_name: string,
    private readonly api_key: string,
    private readonly api_secret: string,
  ) {
    cloudinary.config({
      cloud_name: this.cloud_name,
      api_key: this.api_key,
      api_secret: this.api_secret,
    });
  }

  async uploadFile(dto: UploadFileDto): Promise<UploadFileEntity[]> {
    const options = {
      unique_filename: true,
      overwrite: true,
      folder: `get-that-home/${dto.type}`,
    };

    const objectFiles = [];
    try {
      for (const file of dto.files) {
        const response = await cloudinary.uploader.upload(file.path, options);
        objectFiles.push({ ...response, originalName: file.originalname });
      }

      return objectFiles.map(UploadFileEntity.fromObject);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async deleteFile(dto: DeleteFileDto): Promise<boolean | string> {
    const { files, type } = dto;

    try {
      const filesWithFolder = files.map((file) => {
        const fileSplited = file.split('/').pop()?.split('.').at(0);
        return `get-that-home/${type}/${fileSplited}`;
      });

      if (filesWithFolder.length > 0) {
        const filesDeleted = await this.cloudinary.api.delete_resources(filesWithFolder, {
          type: 'upload',
          resource_type: 'image',
        });

        if (Object.values(filesDeleted.deleted).includes('not_found')) return 'File not found';
        return Object.values(filesDeleted.deleted).includes('deleted');
      }
      return true;
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }
}
