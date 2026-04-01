module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|@react-native-vector-icons|react-native-safe-area-context)/)',
  ],
};
