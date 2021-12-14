const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    devtool: 'inline-source-map',
    mode: 'development',

    devServer: {
        static: './dist',
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.bundle.js',
        assetModuleFilename: 'assets/images/[name][ext]'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/index.html'), 
            filename: 'index.html', 
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/**/*')]
          }),
        new webpack.HotModuleReplacementPlugin(),

        new CopyPlugin({
            patterns: [
              { from: "src/assets", to: "assets" },
            ],
          }),
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },

            {
                test: /\.(scss|css|less)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', 'less-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
}

