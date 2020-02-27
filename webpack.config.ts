const nodeExternals = require('webpack-node-externals');
const path = require('path');

const common = {

    resolve: {
        extensions: ['.js', '.jsx'] // common extensions
    }
    // other plugins, postcss config etc. common for frontend and backend
};

const backend = {
    mode: 'none',
    entry: {
        BulkyItemsPickupUtilityRoutingService: './tmp/service/BulkyItemsPickupUtilityRoutingService.js'
    },
    output: {
        path: path.join(__dirname, 'artifact'),
        libraryTarget: "umd",
        filename: '[name].js'
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals({
        whitelist: ['jquery', 'chai']
    })]
};

module.exports = [
    Object.assign({} , common, backend)
];