module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./App'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@Api': ['./App/Api'],
          '@Assets': ['./App/Assets'],
          '@Components': ['./App/Components'],
          '@Constants': ['./App/Constants'],
          '@Configs': ['./App/Configs'],
          '@Containers': ['./App/Containers'],
          '@Hooks': ['./App/Hooks'],
          '@Languages': ['./App/Languages'],
          '@Navigations': ['./App/Navigations'],
          '@Screens': ['./App/Screens'],
          '@Store': ['./App/Store'],
          '@Themes': ['./App/Themes'],
          '@Types': ['./App/Types'],
          '@Utils': ['./App/Utils'],
        },
      },
    ],
  ],
};
