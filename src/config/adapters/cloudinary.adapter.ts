import { v2 as cloudinary } from 'cloudinary';

import { UploadFileAbstract } from '@domain/abstracts/services';
import { CustomeError } from '@domain/errors';

export class ClaudinaryAdapter implements UploadFileAbstract {
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

  async uploadFile(files: Express.Multer.File[], type: string): Promise<string[]> {
    const options = {
      unique_filename: true,
      overwrite: true,
      folder: `get-that-home/${type}`,
    };
    try {
      const filesArray = [];
      for (const file of files) {
        console.log(file.path);
        const result = cloudinary.uploader.upload(file.path, options);
        if (result) {
          filesArray.push((await result).secure_url);
        }
      }

      return filesArray;
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async deleteFile(files: string[], type: string): Promise<boolean | string> {
    console.log(files);

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
