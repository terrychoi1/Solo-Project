// path required to resolve/join paths for files and file locations
const path = require('path');
// For html plug in to render page with index.html as template
const HtmlWebpackPlugin = require('html-webpack-plugin');

//In a webpack config file you export the modules in an object form
module.exports = {
    // The entry point
    entry: './Front-end/index.js',
    output: {
        path: path.resolve(__dirname, 'Product'),
        filename: 'solo-project-webpack.bundle.js'
    },
    //mode depends on package.json script tags
    mode: process.env.NODE_ENV,
    //npm install -D webpack-dev-server
    devServer: {
        static: {
          directory: path.join(__dirname),
        },
        proxy: {
        //routers
        },
        port: 8080
    },
    module: {
        rules: [
            // Transpile all of js and jsx files
            // npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            //Adding style to the page
            //npm install -D css-loader style-loader sass-loader sass
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    //For our development mode since we will not be using the static index.html to serve
    //npm install -D html-webpack-plugin
    plugins: [
        new HtmlWebpackPlugin({
        template: 'index.html'
      })]
};