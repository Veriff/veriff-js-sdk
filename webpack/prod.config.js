const libraryName = 'Veriff';
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const umdConfig = merge(baseConfig, {
    entry: `${__dirname}/../src/index.js`,
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    output: {
        path: `${__dirname}/../dist`,
        filename: 'veriff.min.js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
});

const npmConfig = merge(baseConfig, {
    entry: `${__dirname}/../src/index.js`,
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ }
        ]
    },
    output: {
        path: `${__dirname}/../lib`,
        filename: 'veriff.js',
        libraryTarget: 'commonjs2'
    }
});

module.exports = [umdConfig, npmConfig];