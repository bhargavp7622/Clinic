module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@common': './src/components/common',
          '@theme': './src/common/theme',
          '@components': './src/components',
          '@screens': './src/screens',
          '@context': './src/context',
          '@hooks': './src/hooks',
          '@api': './src/api',
          '@types': './src/types',
          '@utils': './src/utils',
          '@services': './src/services',
          '@navigation': './src/navigation',
          '@i18n': './src/i18n',
          '@': './src',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
