const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json', babelConfig: true }],
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(css|less|scss|sass)$': 'jest-transform-stub',
    '^.+\\.(svg|png|jpg|jpeg|gif|webp|avif|ico|bmp|tiff)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@uidotdev/usehooks)/'
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@providers/(.*)': '<rootDir>/src/providers/$1',
    '@styles/(.*)': '<rootDir>/src/styles/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '^/assets/(.*)$': '<rootDir>/public/assets/$1',
  },
};