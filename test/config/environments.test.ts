import { envs } from '../../src/config/environments';

describe('Test envs environment.ts', () => {
  it('should be defined', () => {
    expect(envs).toBeDefined();
  });

  it('should return envs correctly', () => {
    expect(envs.PORT).toBeDefined();
    expect(envs.API_NAME).toBeDefined();
    expect(envs.API_URL).toBeDefined();
    expect(envs.MONGO_DB_URL).toBeDefined();
    expect(envs.MONGO_DB_NAME).toBeDefined();
    expect(envs.JWT_SECRET).toBeDefined();
    expect(envs.CLOUD_NAME).toBeDefined();
    expect(envs.API_KEY).toBeDefined();
    expect(envs.API_SECRET).toBeDefined();
  });

  it('should return error if not found env PORT', async () => {
    jest.resetModules();
    process.env.PORT = 'aeAser';

    try {
      await import('../../src/config/environments');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
