import { UploadFileEntity } from '../../../src/domain/entities';

describe('Test Upload File Entity', () => {
  test('should create a valid object uploadFileEntity with valid properties', () => {
    const props = {
      asset_id: 'asset_id',
      path: 'path',
      width: 10,
      height: 10,
      folder: 'folder',
      upload_filename: 'upload_filename',
      original_filename: 'original_filename',
      format: 'format',
    };

    const uploadFileEntity = new UploadFileEntity(props);

    expect(uploadFileEntity).toBeInstanceOf(UploadFileEntity);
    expect(uploadFileEntity).toMatchObject(props);
    expect(uploadFileEntity).toHaveProperty('asset_id', props.asset_id);
    expect(uploadFileEntity).toHaveProperty('path', props.path);
    expect(uploadFileEntity).toHaveProperty('width', props.width);
  });

  test('should throw an error if pass undefined asset_id', () => {
    expect(() =>
      UploadFileEntity.fromObject({
        width: 10,
        height: 10,
        secure_url: 'secure_url',
        folder: 'folder',
        original_filename: 'original_filename',
        format: 'format',
        upload_filename: 'upload_filename',
      }),
    ).toThrow('Asset id is required');
  });

  test('should throw an error if pass undefined width', () => {
    expect(() =>
      UploadFileEntity.fromObject({
        asset_id: 'asset_id',
        height: 10,
        secure_url: 'secure_url',
        folder: 'folder',
        original_filename: 'original_filename',
        format: 'format',
        upload_filename: 'upload_filename',
      }),
    ).toThrow('Width is required');
  });

  test('should throw an error if pass undefined height', () => {
    expect(() =>
      UploadFileEntity.fromObject({
        asset_id: 'asset_id',
        width: 10,
        secure_url: 'secure_url',
        folder: 'folder',
        original_filename: 'original_filename',
        format: 'format',
        upload_filename: 'upload_filename',
      }),
    ).toThrow('Height is required');
  });

  test('should throw an error if pass undefined folder', () => {
    expect(() =>
      UploadFileEntity.fromObject({
        asset_id: 'asset_id',
        width: 10,
        height: 10,
        secure_url: 'secure_url',
        original_filename: 'original_filename',
        format: 'format',
        upload_filename: 'upload_filename',
      }),
    ).toThrow('Folder is required');
  });
});
