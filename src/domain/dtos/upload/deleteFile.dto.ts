import { CustomeError } from '@domain/errors';

export class DeleteFileDto {
  private constructor(
    public readonly files: string[],
    public readonly type: string,
  ) {}

  static create(props: { [key: string]: any }): [CustomeError?, DeleteFileDto?] {
    const { files, type } = props;
    if (!files.length) return [CustomeError.badRequest('Files are required')];
    if (!type) return [CustomeError.badRequest('Type is required')];

    return [undefined, new DeleteFileDto(files, type)];
  }
}
