const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const styles = path.join(__dirname, 'styles');

module.exports = {
    entry: './demo-sass.framer/app.coffee',
    output: {
        path: path.resolve(__dirname, 'demo-sass.framer'),
        filename: 'app.js'
    },

    devServer: {
        index: 'index.html',
        hot: false,
        compress: true,
        disableHostCheck: true
    },
    plugins: [
        new LiveReloadPlugin({
            appendScriptTag: true,
            port: 8082
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [styles]
                        }
                    }
                ]
            },
            {
                test: /\.coffee$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'coffee-loader'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.web.coffee', '.web.js', '.coffee', '.js'],
        modules: ['node_modules', __dirname + '/demo-sass.framer/modules/']
    },
    mode: 'development'
}