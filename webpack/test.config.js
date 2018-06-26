const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ }
        ]
    }
});