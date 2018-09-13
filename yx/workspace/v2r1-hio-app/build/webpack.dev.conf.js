var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


var isMobile=process.env.MOBILE==1

// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  externals: {
    // "BMap": "BMap",
    // "BMapLib": "BMapLib"
    'UE': 'UE',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
        'process.env.CC':'"'+(process.env.CC?1:0)+'"',
        'process.env.FOR_BOSS':'"'+(process.env.FOR_BOSS?1:0)+'"',
        'process.env.REMOTE':'"'+(process.env.REMOTE?1:0)+'"',
        'process.env.SB':'"'+(process.env.SB)+'"',
        'process.env.PREVENT_MOCK':'"'+(process.env.PREVENT_MOCK?1:0)+'"',
        'process.env.APP_ENV':'"'+(process.env.APP_ENV)+'"',
        'process.env.MOBILE':'"'+(process.env.MOBILE)+'"',
        'process.env.BX':'"'+(process.env.BX?1:0)+'"'
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({

        filename:'index.html',
        // template:'index.html',

      // filename: isMobile?'src/mobile/m_index.html':'index.html',
      template: isMobile?'src/mobile/m_index.html':'index.html',
      // template: isMobile?'src/mobile/m_index.html':(process.env.IS_CC==1?'cc_index.html':'index.html'),
      inject: true
    }),
    // new ExtractTextPlugin("index.css"), // pack all the sass and css files into index.csss
    new FriendlyErrorsPlugin()
  ]
})
