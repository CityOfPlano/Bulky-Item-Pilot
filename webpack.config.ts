const nodeExternals = require('webpack-node-externals');
const path = require('path');


const frontend = {
    mode: 'production',
    entry: {
        Customer: './tmp/app/Customer.js'
    },
    output: {
        path: path.join(__dirname, 'static/js/'),
        libraryTarget: "var",
        filename: '[name].js'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    }
    //"exclude": [
    //    "node_modules"
    //],
   /* node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },*/
    //externals: [nodeExternals()]
};

const backend = {
    mode: 'production',
    entry: {
        BulkyItemsPickupUtilityRoutingService: './tmp/BulkyItemsPickupUtilityRoutingService.js'
    },
    output: {
        path: path.join(__dirname, 'artifact'),
        libraryTarget: "var",
        filename: '[name].js'
    },
    target: 'node'
};

module.exports = [
   frontend
];