import { CustomeError } from '@domain/errors';

interface IUploadFile {
  asset_id: string;
  path: string;
  width: number;
  height: number;
  folder: string;
  upload_filename: string;
  original_filename: string;
  format: string;
}

export class UploadFileEntity {
  public readonly asset_id: string;
  public readonly path: string;
  public readonly width: number;
  public readonly height: number;
  public readonly folder: string;
  public readonly upload_filename: string;
  public readonly original_filename: string;
  public readonly format: string;

  constructor(props: IUploadFile) {
    const { asset_id, path, width, height, folder, upload_filename, original_filename, format } = props;
    this.asset_id = asset_id;
    this.path = path;
    this.width = width;
    this.height = height;
    this.folder = folder;
    this.upload_filename = upload_filename;
    this.original_filename = original_filename;
    this.format = format;
  }

  static fromObject(props: { [key: string]: any }): UploadFileEntity {
    const { asset_id, width, height, secure_url, folder, original_filename, format, upload_filename } = props;

    if (!asset_id) throw CustomeError.badRequest('Asset id is required');
    if (!width) throw CustomeError.badRequest('Width is required');
    if (!height) throw CustomeError.badRequest('Height is required');
    if (!secure_url) throw CustomeError.badRequest('Secure url is required');
    if (!folder) throw CustomeError.badRequest('Folder is required');
    if (!upload_filename) throw CustomeError.badRequest('Upload filename is required');
    if (!original_filename) throw CustomeError.badRequest('Original name is required');
    if (!format) throw CustomeError.badRequest('Format is required');

    return new UploadFileEntity({
      asset_id,
      path: secure_url,
      width,
      height,
      folder,
      upload_filename,
      original_filename: `${original_filename}.${format}`,
      format,
    });
  }
}
