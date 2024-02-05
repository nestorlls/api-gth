import { DeleteFile } from '../../../../src/domain/use-cases/uploadFile';
import { mockUploadService } from './mock/upload-service.mock';

describe('Test Upload File Use Case', () => {
  test('should call delete file use case', () => {
    const deleteFile = new DeleteFile(mockUploadService);
    const deleteFileDto = {
      files: ['file1', 'file2'],
      type: 'type/file',
    };

    const result = deleteFile.execute(deleteFileDto);

    expect(result).toEqual(true);
    expect(mockUploadService.deleteFile).toHaveBeenCalledWith(deleteFileDto);
    expect(mockUploadService.deleteFile).toHaveBeenCalledTimes(1);
  });
});
