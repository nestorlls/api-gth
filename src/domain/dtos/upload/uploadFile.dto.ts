import { CustomeError } from '@domain/errors';

export class UploadFileDto {
  private constructor(
    public readonly files: Express.Multer.File[],
    public readonly type: string,
  ) {}

  static create(props: { [key: string]: any }): [CustomeError?, UploadFileDto?] {
    const { files, type } = props;
    if (!files.length) return [CustomeError.badRequest('Files are required')];
    if (!type) return [CustomeError.badRequest('Type is required')];

    return [undefined, new UploadFileDto(files, type)];
  }
}
