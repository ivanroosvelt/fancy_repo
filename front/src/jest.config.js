module.exports = {
  testEnvironment: 'jsdom',

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',

  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  moduleDirectories: ['node_modules', 'src'],

  roots: ['<rootDir>/src'],

  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },

  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
};
