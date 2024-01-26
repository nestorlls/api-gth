import { CustomeError } from '@domain/errors';

type File = {
  path: string;
  originalname: string;
  fieldname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  size: number;
};

export class UploadFileDto {
  private constructor(
    public readonly files: File[],
    public readonly type: string,
  ) {}

  static create(props: { [key: string]: any }): [CustomeError?, UploadFileDto?] {
    const { files, type } = props;
    if (!files.length) return [CustomeError.badRequest('Files are required')];
    if (!type) return [CustomeError.badRequest('Type is required')];

    return [undefined, new UploadFileDto(files, type)];
  }
}
