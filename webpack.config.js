const path = require('path')
const webpack = require('webpack')
// const Visualizer = require('webpack-visualizer-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
        filename: getPath => getPath('[name].css').replace('js.css', 'min.css'),
        allChunks: true
    }),
    // new webpack.SourceMapDevToolPlugin({
    //     filename: '[name].map',
    //     include: ['main.js']
    // })
]
// if (process.env.NODE_ENV === 'development') {
//     plugins.push(new Visualizer({
//         filename: './statistics.html'
//     }))
// }

module.exports = {
    entry: {
        // 'main.js': './src/entry.js',
        'index.html': './views/index.pug',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name]',
    },
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                include: /src\/js/,
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /.ts$/,
                loaders: ['ts-loader']
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?url=false&minimize=true', 'styl-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?url=false&minimize=true']
                })
            },
            {
                test: /.pug$/,
                loaders: ['pug-loader']
            },
            {
                test: /.html$/,
                loaders: ['raw-loader'] // ['html-loader']
            },
            {
                test: /\.txt$/,
                loaders: ['raw-loader']
            }
        ]
    },
    plugins: plugins,
    externals: {
        'angular': 'angular',
        'd3': 'd3'
    }
}
