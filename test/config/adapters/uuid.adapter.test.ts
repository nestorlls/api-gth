import { Uuid } from '../../../src/config/adapters/uuid.adapter';

describe('Test adapters/uuid.adapter.ts', () => {
  it('should return a valid UUID', () => {
    const uuid = Uuid.v4();

    expect(typeof uuid).toBe('string');
  });

  it('should return a unique UUID each time it is called', () => {
    const uuid1 = Uuid.v4();
    const uuid2 = Uuid.v4();

    expect(uuid1).not.toBe(uuid2);
  });

  it('should return a version 4 UUID', () => {
    const result = Uuid.v4();

    expect(result[14]).toBe('4');
  });
});
