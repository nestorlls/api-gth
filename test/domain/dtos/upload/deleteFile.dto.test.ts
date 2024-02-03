import { DeleteFileDto } from '../../../../src/domain/dtos';
import { CustomeError } from '../../../../src/domain/errors';

describe('Test Delete File Dto', () => {
  test('should create a valid object deleteFileDto with valid properties', () => {
    const props = {
      files: ['file1', 'file2'],
      type: 'type/file',
    };

    const [error, deleteFileDto] = DeleteFileDto.create(props);

    expect(error).toBeUndefined();
    expect(deleteFileDto).toBeInstanceOf(DeleteFileDto);
    expect(deleteFileDto).toMatchObject(props);
    expect(deleteFileDto).toHaveProperty('files');
    expect(deleteFileDto).toHaveProperty('type', props.type);
  });

  test('should return an error CustomeError object with a badRequest error', () => {
    const props = {
      files: [],
      type: 'type/file',
    };

    const [error, deleteFileDto] = DeleteFileDto.create(props);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error?.name).toEqual('Bad Request');
    expect(error?.statusCode).toEqual(400);
    expect(error?.message).toEqual('Files are required');
    expect(deleteFileDto).toBeUndefined();
  });

  test('should return an error if type is not provided', () => {
    const props = {
      files: ['file1', 'file2'],
      type: '',
    };

    const [error, deleteFileDto] = DeleteFileDto.create(props);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error?.name).toEqual('Bad Request');
    expect(error?.statusCode).toEqual(400);
    expect(error?.message).toEqual('Type is required');
    expect(deleteFileDto).toBeUndefined();
  });
});
