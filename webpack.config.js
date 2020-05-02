const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(glb|jpg|jpeg)$/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        new HtmlWebpackPlugin({
            title: 'Solar system'
        })
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'celestial_bodies': path.resolve(__dirname, 'src/celestial_bodies')
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    }
}