import type { Config } from 'jest';

const config: Config = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/setupTests.ts'],
  roots: ['<rootDir>/test'],
  testEnvironment: 'jest-environment-node',
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default config;
