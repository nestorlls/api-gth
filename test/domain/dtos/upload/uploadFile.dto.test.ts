import { UploadFileDto } from '../../../../src/domain/dtos';
import { CustomeError } from '../../../../src/domain/errors';

describe('Test Upload File Dto', () => {
  test('should create a valid object uploadFileDto with valid properties', () => {
    const props = {
      files: [
        {
          path: 'path',
          originalname: 'originalname',
          fieldname: 'fieldname',
          encoding: 'encoding',
          mimetype: 'mimetype',
          destination: 'destination',
          filename: 'filename',
          size: 123,
        },
      ],
      type: 'type',
    };

    const [error, uploadFileDto] = UploadFileDto.create(props);

    expect(error).toBeUndefined();
    expect(uploadFileDto).toBeInstanceOf(UploadFileDto);
    expect(uploadFileDto).toMatchObject(props);
    expect(uploadFileDto).toHaveProperty('files');
    expect(uploadFileDto).toHaveProperty('type');
    expect(uploadFileDto?.files).toEqual(props.files);
    expect(uploadFileDto?.type).toEqual(props.type);
  });

  test('should return an error if files are not provided', () => {
    const props = {
      files: [],
      type: 'type',
    };

    const [error, uploadFileDto] = UploadFileDto.create(props);

    expect(uploadFileDto).toBeUndefined();
    expect(error).toBeInstanceOf(CustomeError);
    expect(error?.message).toEqual('Files are required');
  });

  test('should return an error if type is not provided', () => {
    const props = {
      files: [
        {
          path: 'path',
          originalname: 'originalname',
          fieldname: 'fieldname',
          encoding: 'encoding',
          mimetype: 'mimetype',
          destination: 'destination',
          filename: 'filename',
          size: 123,
        },
      ],
      type: '',
    };

    const [error, uploadFileDto] = UploadFileDto.create(props);

    expect(uploadFileDto).toBeUndefined();
    expect(error).toEqual(CustomeError.badRequest('Type is required'));
  });
});
