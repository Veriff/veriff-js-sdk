const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env || 'dev';

const DEV_CONFIG = {
  VERIFF_API_URL: 'http://localhost:3000/v1',
}

const SANDBOX_CONFIG = {
  'VERIFF_API_URL': 'https://sandbox.veriff.me/v1',
}

const STAGING_CONFIG = {
  'VERIFF_API_URL': 'https://staging.veriff.me/v1',
}

const PRODUCTION_CONFIG = {
  'VERIFF_API_URL': 'https://magic.veriff.me/v1',
}

const ENV_MAP = {
  dev: DEV_CONFIG,
  sandbox: SANDBOX_CONFIG,
  staging: STAGING_CONFIG,
  production: PRODUCTION_CONFIG,
}

const ENV_CONFIG = ENV_MAP[env]

const libraryName = 'Veriff';

let plugins = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify({
      ENV: env,
      VERIFF_API_URL: ENV_CONFIG.VERIFF_API_URL
    })
  })
];

let outputFile;

if (env === 'production') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = `${libraryName.toLowerCase()}.min.js`;
} else {
  outputFile = `${libraryName.toLowerCase()}.${env}.js`;
}

const config = {
  entry: __dirname + '/lib/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./lib')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
