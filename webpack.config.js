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
    //npm install -D cross-env to set process environment variables properly
    mode: process.env.NODE_ENV,
    
    //devServer set up for development mode
    //npm install -D webpack-dev-server
    //devServer needs capability to send and receive requests from the server so in development mode we need to run BOTH devserver and express
    //npm install -D concurrently
    //For dev server to respond instantly to changes in the server side, install nodemon
    //npm install -D nodemon
    devServer: {
        static: {
          directory: path.join(__dirname),
        },
        proxy: {
        //routers
        "/task": "http://localhost:3000",
        },
        port: 8080
    },

    //different methods of handling different modules/file types
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
        template: './Front-end/index.html'
      })]
};