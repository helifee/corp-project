// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var isMobile=process.env.MOBILE==1
var isCC=process.env.CC==1

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../'+(process.env.FOR_BOSS==1?'bossdist':(isMobile?'mobiledist':(isCC?'ccdist':'dist')))+'/index.html'),
    assetsRoot: path.resolve(__dirname, '../'+(process.env.FOR_BOSS==1?'bossdist':(isMobile?'mobiledist':(isCC?'ccdist':'dist')))),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
      host:'0.0.0.0',
      disableHostCheck:true,
    env: require('./dev.env'),
    port: (process.env.PORT-0) || (process.env.CC==1?8085:8084),
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/mock': {
            target: 'http://192.168.3.56:10000/mock/5aa786617b42587121367151',
            changeOrigin: true,
            pathRewrite: {
                '^/mock': '/'
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

