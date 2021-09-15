const custom = require('../webpack.config')

module.exports = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensions: [ ...config.resolve.extensions, ...custom.resolve.extensions ],
        alias: { ...config.resolve.alias, ...custom.resolve.alias },
      },
      module: { ...config.module, rules: custom.module.rules },
    }
  },
}
