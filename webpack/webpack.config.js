module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./lib/veriff.js",
        libraryTarget: "umd"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    // Other options...
};
