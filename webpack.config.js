const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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

const libraryName = 'Veriff';

const plugins = (umd = false) => {
  const base = [
    new webpack.DefinePlugin({
        'process.env': JSON.stringify({
        ENV_MAP: ENV_MAP
      })
    })
  ]
  if(env === 'production') base.push(new UglifyJsPlugin({ minimize: true }));
  return umd ? base.concat(new ExtractTextPlugin("styles.css")) : base;
};

const rules = (umd = false) => {
  const base = [
    {
      test: /(\.js)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /(\.js)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }
  ];

  if(umd) {
    return base.concat({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    });
  }
  return base.concat({
    test: /\.css$/,
    loader: 'style-loader!css-loader',
    exclude: /node_modules/
  });
}

const config = (umd = false) => ({
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  module: {
    rules: rules(umd)
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.css','.json', '.js']
  },
  plugins: plugins(umd)
});

const umdConfig = Object.assign({}, config(true), {
  output: {
    path: `${__dirname}/dist`,
    filename: 'veriff.min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
});

const npmConfig = Object.assign({}, config(), {
  output: {
    path: `${__dirname}/lib`,
    filename: 'veriff.js',
    libraryTarget: 'commonjs2'
  }
});

module.exports = [ umdConfig,  npmConfig ];
