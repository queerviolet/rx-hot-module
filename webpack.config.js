const webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:9999',
    'webpack/hot/only-dev-server',
    './entry.js'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/assets/',    
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin,
  ],
  module: {
    rules: [{
      test: /jsx$/,
      use: {
        loader: 'babel-loader',
      },
    }]
  },
}