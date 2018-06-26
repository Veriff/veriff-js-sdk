const path = require('path');
const webpack = require('webpack');
const env = require('yargs').argv.env || 'dev';
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const LOCAL_CONFIG = {
  'VERIFF_API_URL': 'http://localhost:3000/v1',
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
  dev: LOCAL_CONFIG,
  test: LOCAL_CONFIG,
  sandbox: SANDBOX_CONFIG,
  staging: STAGING_CONFIG,
  production: PRODUCTION_CONFIG,
}

const plugins = () => {
    const base = [
      new webpack.DefinePlugin({
          'process.env': JSON.stringify({
          ENV_MAP: ENV_MAP
        })
      })
    ]
    if(env === 'production') base.push(new UglifyJsPlugin({ minimize: true }));
    return base;
};


module.exports = {
    module: {
        loaders: [
            { test: /(\.js)$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /(\.js)$/, loader: 'eslint-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ }
        ]     
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.css','.json', '.js']
    },
    plugins: plugins()
};