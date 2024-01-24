import { JwtAdapter } from '../../../src/config/adapters/jwt.adapter';
import { envs } from '../../../src/config/environments';

describe('Test adapters/jwt.adapter.ts', () => {
  it('should generate a JWT token with a payload and duration', async () => {
    const spyMethod = jest.spyOn(JwtAdapter, 'generateToken');
    const payload = { userId: '1234' };
    const expected = expect.any(String);

    const receivedToken = await JwtAdapter.generateToken(payload, envs.JWT_SECRET, '3h');

    expect(receivedToken).toContainEqual(expected);
    expect(spyMethod).toHaveBeenCalledTimes(1);
  });

  it('should generate a JWT token with a payload and default duration', async () => {
    const payload = { userId: '1234' };
    const expected = expect.any(String);

    const receivedToken = await JwtAdapter.generateToken(payload, envs.JWT_SECRET);

    expect(receivedToken).toContainEqual(expected);
  });

  it('should verify a JWT token with a payload and duration', async () => {
    const payload = { userId: '1234' };
    const expected = {
      exp: expect.any(Number),
      iat: expect.any(Number),
      userId: '1234',
    };

    const token = await JwtAdapter.generateToken(payload, envs.JWT_SECRET, '3h');
    const received = await JwtAdapter.verifytoken<{ userId: string }>(token as string, envs.JWT_SECRET);

    expect(received).toEqual(expected);
  });
});
