const BundleTracker = require('webpack-bundle-tracker');
const path = require('path');

module.exports = {
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
    ],
    entry: {
        index: path.resolve('./ts/client/index.tsx')
    },
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: '[name].bundle.[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                }],
            }
        ]
    },

    stats: "minimal"
};
