// plugins allow developers to do complex processing of our input files (inde.html) file
// use plug-in: html webpack plug-in
// output property tells webpack where to save our output property
const path = require('path');
// require this package and save it to a variable
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    
    entry: ['babel-polyfill', './src/js/index.js'],
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    // folder from which webpack will serve the files
    devServer: {
        contentBase: './dist'
    },
    // recieves an array of all plugins we're using
    // everytime we're bulding our javascript files we want to copy the source 
    // index.html over to the dist folder and include the script in the Javascript bundle
    // This plugin could be used to create a new html file from scratch without providing
    // any template according to (https://webpack.js.org/concepts/plugins/)
    // the index.html file in src won't be saved inå dist, instead will
    // be streamed to the server
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        })
    ],
    
    module: {
        rules: [
            {
                // apply loader to just js files
                // if we don't use exclude then babel
                // will apply all the js files in the nodes_module
                //This test will look for all files and 
                // test if they end in .js
                // all js files will use the babel loader
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

// webpack will output our file (bundle.js) to the dist/js





























