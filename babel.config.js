function getAliasesFromTsConfig() {
  const { compilerOptions } = require('./tsconfig.json');
  const { paths } = compilerOptions;

  const alias = {};

  Object.keys(paths).forEach(key => {
    alias[key] = `./${paths[key][0]}`;
  });

  return alias;
}

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: getAliasesFromTsConfig(),
        extensions: ['.ios.ts', '.android.ts', '.js', '.ts', '.tsx', '.json'],
        root: ['./src']
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
