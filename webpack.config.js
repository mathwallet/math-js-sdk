const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        entry: __dirname + '/src/mathwallet.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'mathwallet.min.js'
    },
    plugins: [
        // new UglifyJSPlugin()
    ]
};