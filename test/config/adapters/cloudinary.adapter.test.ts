import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryAdapter } from '../../../src/config/adapters/cloudinary.adapter';
import { UploadFileDto, DeleteFileDto } from '../../../src/domain/dtos/upload';
import { CustomeError } from '../../../src/domain/errors/custome.error';

describe('Test adapters/cloudinary.adapter.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  const adapter = new CloudinaryAdapter('cloud_name', 'api_key', 'api_secret');

  it('should upload a file to cloudinary successfully', async () => {
    /** Mock dependencies */
    const [error, mockUploadFileDto] = UploadFileDto.create({
      files: [
        {
          path: 'path/to/file1',
          originalname: 'file1.jpg',
          fieldname: 'file',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'path/to',
          filename: 'file1.jpg',
          size: 1234,
        },
        {
          path: 'path/to/file2',
          originalname: 'file2.jpg',
          fieldname: 'file',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'path/to',
          filename: 'file2.jpg',
          size: 1234,
        },
      ],
      type: 'test',
    });

    const mockResponse = {
      asset_id: 'er2sdfs2dadsr4',
      public_id: 'get-that-home/file1.jpg',
      version: 1232343231,
      width: 800,
      height: 600,
      format: 'jpg',
      resource_type: 'image',
      created_at: '2022-01-01T00:00:00.000Z',
      tags: ['tag1', 'tag2'],
      bytes: 123123,
      type: 'image',
      etag: '123123',
      url: 'http://res.cloudinary.com/cloud_name/image/upload/file1.jpg',
      secure_url: 'https://res.cloudinary.com/cloud_name/image/upload/file1.jpg',
      folder: 'get-that-home/test',
      access_mode: 'public',
      original_filename: 'file1.jpg',
    };

    cloudinary.uploader.upload = jest.fn().mockReturnValue(mockResponse);

    /** Execution */
    const result = await adapter.uploadFile(mockUploadFileDto!);

    /** Assertions */
    expect(result).toEqual([
      {
        access_mode: 'public',
        asset_id: 'er2sdfs2dadsr4',
        bytes: 123123,
        created_at: '2022-01-01T00:00:00.000Z',
        etag: '123123',
        folder: 'get-that-home/test',
        format: 'jpg',
        height: 600,
        original_filename: 'file1.jpg',
        upload_filename: 'file1.jpg',
        public_id: 'get-that-home/file1.jpg',
        resource_type: 'image',
        secure_url: 'https://res.cloudinary.com/cloud_name/image/upload/file1.jpg',
        tags: ['tag1', 'tag2'],
        type: 'image',
        url: 'http://res.cloudinary.com/cloud_name/image/upload/file1.jpg',
        version: 1232343231,
        width: 800,
      },
      {
        access_mode: 'public',
        asset_id: 'er2sdfs2dadsr4',
        bytes: 123123,
        created_at: '2022-01-01T00:00:00.000Z',
        etag: '123123',
        folder: 'get-that-home/test',
        format: 'jpg',
        height: 600,
        original_filename: 'file1.jpg',
        upload_filename: 'file2.jpg',
        public_id: 'get-that-home/file1.jpg',
        resource_type: 'image',
        secure_url: 'https://res.cloudinary.com/cloud_name/image/upload/file1.jpg',
        tags: ['tag1', 'tag2'],
        type: 'image',
        url: 'http://res.cloudinary.com/cloud_name/image/upload/file1.jpg',
        version: 1232343231,
        width: 800,
      },
    ]);
  });

  it('should throw internal server error when uploadFile method fails', async () => {
    const mockUploadFileDto = {
      files: [
        {
          path: 'path/to/file1',
          originalname: 'file1.jpg',
          fieldname: 'file',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'path/to',
          filename: 'file1.jpg',
          size: 1234,
        },
      ],
      type: 'test',
    };

    cloudinary.uploader.upload = jest.fn().mockRejectedValue(new Error('Upload failed'));

    await expect(adapter.uploadFile(mockUploadFileDto)).rejects.toThrow(
      CustomeError.internalServerError('Error: Upload failed'),
    );
  });

  it('should delete a file successfully when deleteFile method is called', async () => {
    const mockDeleteFileDto = {
      files: ['file1.jpg', 'file2.jpg'],
      type: 'test',
    };

    const mockResponse = {
      deleted: {
        'get-that-home/test/file1': 'deleted',
        'get-that-home/test/file2': 'deleted',
      },
    };

    cloudinary.api.delete_resources = jest.fn().mockResolvedValue(mockResponse);
    const result = await adapter.deleteFile(mockDeleteFileDto);

    expect(result).toBe(true);

    expect(cloudinary.api.delete_resources).toHaveBeenCalledWith(
      ['get-that-home/test/file1', 'get-that-home/test/file2'],
      {
        type: 'upload',
        resource_type: 'image',
      },
    );
  });

  it('should throw internal server error when deleteFile method fails', async () => {
    const mockDeleteFileDto = {
      files: ['file1.jpg'],
      type: 'test',
    };

    const mockDeleteResource = jest.spyOn(cloudinary.api, 'delete_resources').mockImplementation(() => {
      throw new Error('Failed to delete resource');
    });

    await expect(adapter.deleteFile(mockDeleteFileDto)).rejects.toThrow('Failed to delete resource');
    expect(mockDeleteResource).toHaveBeenCalledWith(['get-that-home/test/file1'], {
      type: 'upload',
      resource_type: 'image',
    });

    mockDeleteResource.mockRestore();
  });
});
