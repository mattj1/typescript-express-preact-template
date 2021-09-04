const BundleTracker = require('webpack-bundle-tracker');
const path = require('path');

module.exports = {
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

    entry: {
        index: './dist/client/index.js',
        // users: './public/javascripts/users.js',
    },
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: '[name].bundle.[contenthash].js',
        clean: true
    },

    stats: "minimal"
};
