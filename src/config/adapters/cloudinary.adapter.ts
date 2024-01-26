import { v2 as cloudinary } from 'cloudinary';

import { CustomeError } from '@domain/errors/custome.error';
import { DeleteFileDto, UploadFileDto } from '@domain/dtos';

interface ICloudinary {
  uploadFile(dto: UploadFileDto): Promise<ICloudinaryResponse[]>;
  deleteFile(dto: DeleteFileDto): Promise<boolean | string>;
}

interface ICloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  width: number;
  height: number;
  format: string;
  resource_type: 'image' | 'video' | 'raw' | 'auto';
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  upload_filename: string;
}

export class CloudinaryAdapter implements ICloudinary {
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

  async uploadFile(dto: UploadFileDto): Promise<ICloudinaryResponse[]> {
    const options = {
      unique_filename: true,
      overwrite: true,
      folder: `get-that-home/${dto.type}`,
    };

    try {
      const objectFiles = [];
      for (const file of dto.files) {
        const response = await cloudinary.uploader.upload(file.path, options);

        objectFiles.push({
          asset_id: response.asset_id,
          public_id: response.public_id,
          version: response.version,
          width: response.width,
          height: response.height,
          format: response.format,
          resource_type: response.resource_type,
          created_at: response.created_at,
          tags: response.tags,
          bytes: response.bytes,
          type: response.type,
          etag: response.etag,
          url: response.url,
          secure_url: response.secure_url,
          folder: response.folder,
          access_mode: response.access_mode,
          original_filename: response.original_filename,
          upload_filename: `${file.originalname}`,
        });
      }

      return objectFiles;
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

      const { length } = filesWithFolder;

      const filesDeleted =
        length > 0
          ? await this.cloudinary.api.delete_resources(filesWithFolder, { type: 'upload', resource_type: 'image' })
          : null;

      if (Object.values(filesDeleted.deleted).includes('not_found')) return 'File not found';
      return Object.values(filesDeleted.deleted).includes('deleted');
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }
}
