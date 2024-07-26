const path = require ("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = './';

// can be used to set single or multiple entry point
module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
        'playwrite': basePath + 'src/styles/fonts.scss',
        fa: '@fortawesome/fontawesome-free/scss/fontawesome.scss',
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js', //static name: bundle.js' or gathered from entry
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    devtool: 'source-map',
    devServer:{
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port:3000,
        open: true,
        hot:true,
        compress: true,
        historyApiFallback: true,
    }, 
    optimization: {
        minimizer: [new TerserJSPlugin({
            parallel: true
        })],
        splitChunks: {
            chunks: 'all',
        },
    },
    module:{
        rules:[
            // {
            //     test: /\.scss$/,  //take a regular expression as paraam to indicate file type based on extensions
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // },
            {
                test: /\.(css|scss)$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 2,
                      sourceMap: true,
                    },
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },{
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }, 
            {
                test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource'
            },
        ]
    },
    plugins:[  
        new HtmlWebpackPlugin({
            title: 'Tooling with webpack',
            filename: 'index.html',
            template: 'src/template.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        // new BundleAnalyzerPlugin(),//use to anaylye bundle file size
    ]
}