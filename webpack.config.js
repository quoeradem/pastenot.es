var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:  [
        'babel-regenerator-runtime',
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        './client'
    ],
    output: {
        path:       path.join(__dirname, 'dist'),
        filename:   'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'shared'],
        extensions:         ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.json$/, loader: "json-loader"},
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('bundle.css'),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        proxy: {
            '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
        },
        host: '127.0.0.1'
    }
};
