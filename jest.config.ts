// import type { JestConfigWithTsJest } from 'ts-jest'

import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@/root(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^(.*)\\.js$': '$1'
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
  coveragePathIgnorePatterns: [
    '__tests__'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.tsx',
    'src/**/*.ts'
  ]
}

export default createJestConfig(customJestConfig)
