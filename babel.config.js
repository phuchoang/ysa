module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@/hooks': './hooks',
            '@/services': './services',
            '@/types': './types',
            '@/i18n': './i18n',
          },
        },
      ],
    ],
  };
};