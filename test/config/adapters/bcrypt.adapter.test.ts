import { BcryptAdapter } from '../../../src/config/adapters/bcrypt.adapter';

describe('Test adapters/bcrypt.adapter.ts', () => {
  it('should hash a string value using bcrypt.js', () => {
    const value = '123456';
    const hashedValue = BcryptAdapter.hash(value);

    expect(hashedValue).toBeDefined();
    expect(hashedValue).not.toBe(value);
  });

  it('should compare a string value using bcrypt.js', () => {
    const value = '123456';
    const hashedValue = BcryptAdapter.hash(value);
    const expected = BcryptAdapter.compare(value, hashedValue);

    expect(expected).toBe(true);
  });
});
