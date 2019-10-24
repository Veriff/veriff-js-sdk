const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const plugins = () => ([
  new UglifyJsPlugin({ minimize: true })
]);

module.exports = {
  module: {
    loaders: [
      { test: /(\.js)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /(\.js)$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.css', '.json', '.js']
  },
  plugins: plugins()
};