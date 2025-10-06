module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-mmkv|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-native-worklets)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.js'],
};
