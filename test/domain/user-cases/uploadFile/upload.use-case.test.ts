import { mockUploadService } from './mock/upload-service.mock';
import { UploadFileDto } from '../../../../src/domain/dtos';
import { UploadFile } from '../../../../src/domain/use-cases/uploadFile';

describe('Test Upload File Use Case', () => {
  test('should call upload file use case', () => {
    const uploadFile = new UploadFile(mockUploadService);
    const uploadFileDto = UploadFileDto.create({
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
    })[1];

    const result = uploadFile.execute(uploadFileDto!);

    expect(result).toEqual(expect.any(Array));
    expect(mockUploadService.uploadFile).toHaveBeenCalledWith(uploadFileDto);
    expect(mockUploadService.uploadFile).toHaveBeenCalledTimes(1);
  });
});
