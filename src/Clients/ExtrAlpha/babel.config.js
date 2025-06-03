module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-typescript', // Add this line
  ],
  plugins: [
    'react-native-reanimated/plugin', // Ensure this is included
  ],
};