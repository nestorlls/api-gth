import { CustomeError } from '@domain/errors';

interface IUploadFile {
  asset_id: string;
  path: string;
  width: number;
  height: number;
  folder: string;
  uploadFileName: string;
  originalName: string;
  format: string;
}

export class UploadFileEntity {
  public readonly asset_id: string;
  public readonly path: string;
  public readonly width: number;
  public readonly height: number;
  public readonly folder: string;
  public readonly uploadFileName: string;
  public readonly originalName: string;
  public readonly format: string;

  private constructor(props: IUploadFile) {
    const { asset_id, path, width, height, folder, uploadFileName, originalName, format } = props;
    this.asset_id = asset_id;
    this.path = path;
    this.width = width;
    this.height = height;
    this.folder = folder;
    this.uploadFileName = uploadFileName;
    this.originalName = originalName;
    this.format = format;
  }

  static fromObject(props: { [key: string]: any }): UploadFileEntity {
    const { asset_id, width, height, secure_url, folder, original_filename, format, originalName } = props;

    if (!asset_id) throw CustomeError.badRequest('Asset id is required');
    if (!width) throw CustomeError.badRequest('Width is required');
    if (!height) throw CustomeError.badRequest('Height is required');
    if (!secure_url) throw CustomeError.badRequest('Secure url is required');
    if (!folder) throw CustomeError.badRequest('Folder is required');
    if (!original_filename) throw CustomeError.badRequest('Original filename is required');
    if (!format) throw CustomeError.badRequest('Format is required');
    if (!originalName) throw CustomeError.badRequest('Original name is required');

    return new UploadFileEntity({
      asset_id,
      path: secure_url,
      width,
      height,
      folder,
      uploadFileName: `${original_filename}.${format}`,
      originalName,
      format,
    });
  }
}
