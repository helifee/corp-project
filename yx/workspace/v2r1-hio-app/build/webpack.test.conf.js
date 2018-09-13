var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


var isMobile=process.env.MOBILE==1
var isCC=process.env.CC==1



//
// var env = process.env.NODE_ENV === 'testing'
//     ? require('../config/test.env')
//     : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        // rules: utils.styleLoaders({
        //     sourceMap: config.build.productionSourceMap,
        //     extract: true
        // })
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    devtool: process.env.UGLIFY==1?false:'#cheap-module-eval-source-map',
    // devtool: '#inline-source-map',
    // devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    externals: {
        // "BMap": "BMap",
        // "BMapLib": "BMapLib"
        'UE': 'UE',
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        // new webpack.DefinePlugin({
        //   NODE_ENV: '"production"',
        //   APP_ENV: JSON.stringify(process.env.APP_ENV)
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   },
        //   sourceMap: false
        // }),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         compress: {
        //             warnings: false
        //         }
        //     },
        //     sourceMap: config.build.productionSourceMap,
        //     parallel: true
        // }),

        // new webpack.optimize.UglifyJsPlugin({
        //     beautify: false,
        //     mangle: {
        //         screw_ie8: true,
        //         keep_fnames: false
        //     },
        //     compress: {
        //         warnings: false,
        //         screw_ie8: true,
        //         drop_debugger: true,
        //         drop_console: true
        //     },
        //     comments: false
        // }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.DefinePlugin({

            'process.env': require('../config/test.env'),
            'process.env.CC':'"'+(process.env.CC?1:0)+'"',
            'process.env.PREVENT_MOCK':'"'+(process.env.PREVENT_MOCK?1:0)+'"',
            'process.env.MOBILE':'"'+(process.env.MOBILE)+'"',
            'process.env.SB':'"'+(process.env.SB)+'"'
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename:config.build.index,
            // filename: process.env.NODE_ENV === 'testing'
            //     ? 'index.html'
            //     : config.build.index,
            template: isMobile?'src/mobile/m_index.html':'index.html',
            // template: isMobile?'src/mobile/m_index.html':(process.env.IS_CC==1?'cc_index.html':'index.html'),
            inject: true,
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true
            //     // more options:
            //     // https://github.com/kangax/html-minifier#options-quick-reference
            // },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, isMobile?'../src/mobile/static':'../static'),
                to: !isMobile?config.build.assetsSubDirectory:'mobilestatic',
                ignore: ['.*']
            }
        ])
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if(process.env.UGLIFY==1){
    webpackConfig.plugins.unshift(
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_debugger: true,
                drop_console: true
            },
            comments: false
        }),
    )
}

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig











//
//
// // This is the webpack config used for unit tests.
//
// var utils = require('./utils')
// var webpack = require('webpack')
// var merge = require('webpack-merge')
// var baseConfig = require('./webpack.base.conf')
//
//
//
//
// let definedPlugins={
//     //testing
//     'process.env': require('../config/test.env'),
//     'process.env.CC':'"'+(process.env.CC?1:0)+'"',
//     'process.env.SB':'"'+(process.env.sb)+'"'
// }
//
//
// var webpackConfig = merge(baseConfig, {
//   // use inline sourcemap for karma-sourcemap-loader
//   module: {
//     rules: utils.styleLoaders()
//   },
//   devtool: '#inline-source-map',
//   plugins: [
//     new webpack.DefinePlugin(definedPlugins)
//   ]
// })
//
//
// console.log('webpackConfig---:',definedPlugins,webpackConfig)
//
//
// // no need for app entry during tests
// // delete webpackConfig.entry
//
// module.exports = webpackConfig
