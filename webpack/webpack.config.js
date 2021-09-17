const libraryName = 'Veriff';
const { merge } = require('webpack-merge');

const baseConfig = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },
};

const umdConfig = merge(baseConfig, {
    output: {
        path: `${__dirname}/../dist`,
        filename: 'veriff.min.js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    }
});

const npmConfig = merge(baseConfig, {
    output: {
        path: `${__dirname}/../lib`,
        filename: 'veriff.js',
        library: libraryName,
        libraryTarget: 'commonjs2'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    }
});

module.exports = [umdConfig, npmConfig];
