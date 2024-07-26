const path = require ("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// can be used to set single or multiple entry point
module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
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
    module:{
        rules:[
            {
                test: /\.scss$/,  //take a regular expression as paraam to indicate file type based on extensions
                use: ['style-loader', 'css-loader', 'sass-loader']
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
            }
        ]
    },
    plugins:[  
        new HtmlWebpackPlugin({
            title: 'Tooling with webpack',
            filename: 'index.html',
            template: 'src/template.html'
        }),
        new BundleAnalyzerPlugin()
    ]
}