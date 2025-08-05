module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
    ],
    plugins: [
      // React Native Worklets plugin (formerly react-native-reanimated/plugin)
      'react-native-worklets/plugin',
    ],
  };
};
