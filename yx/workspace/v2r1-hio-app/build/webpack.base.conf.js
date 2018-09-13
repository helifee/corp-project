var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var os=require('os');
var platform=os.platform().toLowerCase();
// 根据环境变量不同获取不同的配置文件
// var shell = require('shelljs')
var appEnv=process.env.NODE_ENV||'dev'
// var EventCallbackWebpackPlugin=require('event-callback-webpack-plugin');
if(appEnv=='dev'){
    if(process.env.APP_ENV=='testing'){
        appEnv='testing'
    }
    if(process.env.APP_ENV=='production'){
        appEnv='production'
    }
    if(process.env.APP_ENV=='local'){
        appEnv='local'
    }
}
if(appEnv=='undefined'){
    appEnv='dev'
}

console.log("app env in webpack:",appEnv);

var bxPlugin=require('./bx-plugin')
var isForCC=process.env.CC==1
var isMobile=process.env.MOBILE==1
var isMyRoute=process.env.MY_ROUTE==1
// const PostCompile = require('post-compile-webpack-plugin')

var configFilePath='src/config/'+appEnv+'.env.js'


// var appEnv=process.env.APP_ENV||'dev'
// console.log('appEnv in webpack base:',appEnv)
// try{
//   shell.cp('-R', './src/config/'+appEnv+'.env.js', './src/config/env.js')
// }catch(e){
//   throw 'copy env config file error'
//   return false
// }



// var ExtractTextPlugin = require('extract-text-webpack-plugin');
function resolve (dir) {

  return path.join(__dirname,'..', dir)



}


let pcAppEntry=['./src/main.js']

if(appEnv!='dev' || (process.env.FOR_BOSS==1) || (process.env.USE_BABEL==1)){
    console.log('babel has been added')
    pcAppEntry.unshift('babel-polyfill')
}


var webpackConfig={
    plugins:[

    ],
    entry: {
        // app:isMobile?'./src/mobile/m_main.js':['./src/main.js'],
        app:isMobile?'./src/mobile/m_main.js':pcAppEntry
        // app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },

    module: {
        rules: [
            // {
            //   test: /\.vue$/,
            //   loader: 'vue-loader',
            //   options: vueLoaderConfig
            // },

            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     options: {
            //         loaders: {
            //             js: [
            //                 'babel-loader',

            //             ],
            //             css: 'style-loader!css-loader',
            //             scss: 'style-loader!css-loader!sass-loader',
            //             sass: 'style-loader!css-loader!sass-loader'
            //         }
            //     }
            // },
            {
                  test: /\.vue$/,
                  loader: 'vue-loader',
                  options: {
                      loaders: {
                          js: [
                              'babel-loader',

                          ],
                          css: 'style-loader!css-loader',
                          sass: [
                            'vue-style-loader',
                            'css-loader',

                            // postcss-loader非必须
                            'postcss-loader',
                            'sass-loader?indentedSyntax=1',
                            {
                              loader: 'sass-resources-loader',
                              options: {

                                // 需更改为项目中实际scss文件路径
                                resources: path.resolve(__dirname, '../static/styles/index.scss'),
                              },
                            },
                          ],
                          scss: [
                            'vue-style-loader',
                            'css-loader',

                            // postcss-loader非必须
                            'postcss-loader',
                            'sass-loader',
                            {
                              loader: 'sass-resources-loader',
                              options: {

                                // 需更改为项目中实际scss文件路径
                                resources: path.resolve(__dirname, '../static/styles/index.scss'),
                              },
                            },
                          ],


                      }
                  }
            },
            // 处理在js中引用css文件
            // {
            //   test: /\.css$/,
            //   use: ['style-loader', 'css-loader']
            // },
            // // 处理在js中引用scss文件
            // {
            //   test: /\.scss$/,
            //   use: ['style-loader', 'css-loader', 'sass-loader'],
            // },

            // {
            //   test: /\.(scss|sass|css)$/,  // pack sass and css files
            //   loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!postcss-loader!sass-loader"})
            // },

            // 处理在js中引用scss文件
            // {
            //   test: /\.scss$/,
            //   use: ['style-loader', 'css-loader', 'sass-loader'],
            // },
            // {
            //     test: /\.jsx?$/,
            //     // test: /\.js$/,
            //     loader: 'babel-loader',
            //     include: [resolve('src'), resolve('test')]
            // },
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     include: path.resolve(__dirname, "src"),
            //     use: [
            //         {
            //             loader: "babel-loader"
            //         }
            //     ]
            // },

            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     exclude: /index.html/,
            // },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: /(node_modules|bower_components)/,
                include: [resolve('src'),
                    resolve('/node_modules/_element-ui@2.4.1@element-ui/src'),           //和下面截图文件名字对应起来即可正常打包！！！
                    resolve('/node_modules/_element-ui@2.4.1@element-ui/packages'),
                    // resolve('node_modules/webpack-dev-server/client'),
                    // resolve('node_modules/element-ui/src')
                ]
            },
            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: {
            //                 babelrc: true
            //             }
            //         }
            //     ]
            // },

            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader',
            //     options: {
            //         presets: ['latest'],
            //         plugins: ['transform-runtime']
            //     }
            // },

            // {
            //     test:/\.js?$/,
            //     loader: 'babel-loader',
            //     // exclude: /node_modules/,
            //     include: [resolve('src'),resolve('node_modules')],
            //     query: {
            //         presets: [
            //             "es2015",
            //             "react",
            //             "stage-0",
            //             "stage-1",
            //             "stage-2",
            //             "stage-3"
            //         ]
            //     }
            //
            //     // exclude: /node_modules/,
            //     // include: path.resolve(__dirname, "src"),
            //     // use: [
            //     //     {
            //     //         loader: "babel-loader"
            //     //     }
            //     // ]
            // },
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     include: path.resolve(__dirname, "src"),
            //     use: [
            //         {
            //             loader: "babel-loader"
            //         }
            //     ]
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                // options: {
                //   limit: 10000,
                //   name: utils.assetsPath('img/[name].[hash:7].[ext]')
                // }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@messageBox':resolve(!isMobile?'src/pcUIComponentsAdapter.js':'src/mobileUIComponentsAdapter.js'),
            // '@message':resolve(!isMobile?'src/pcUIComponentsAdapter.js':'src/pcUIComponentsAdapter.js'),
            '@util':resolve('src/utils/util.js'),
            '@plugins':resolve('src/plugins'),
            '@APP_VUE':(function(){
                if(process.env.FOR_BOSS==1){
                    return resolve('src/App.boss.vue')
                }

                return resolve(!isForCC?'src/App.vue':'src/App.cc.vue')
            })(),
            '@fileTransfer':resolve(!isMobile?
                'src/containers/main/netDisk/netDisk.fileTransfer.cc.js'
                :'src/containers/main/netDisk/netDisk.fileTransfer.browser.js'),
            '@demo':resolve(appEnv!='prodduction'?'src/containers/main/demo/demo.vue':'src/blankJavascript.js'),
            '@MockData':resolve('src/mockData/mockData.js'),
            '@service':resolve(!isMobile?'src/services/service.js':'src/mobile/m_service.js'),

            '@Main': resolve('src/containers/main'),
            '@mobile': resolve('src/mobile'),

            '@Iframe': resolve('src/containers/Iframe'),
            '@routes': resolve((function(){
                if(process.env.FOR_BOSS==1){
                    return 'src/router/boss-routes.js'
                }
                return isForCC?'src/router/cc-routes.js':(isMyRoute?'src/router/myRoutes.js':'src/router/routes.js')
            })()),
            '@jzyHeader': resolve(isForCC?'src/containers/Header/blankHeader.vue':'src/containers/Header/header.vue'),



            '@config':resolve(configFilePath),
            '@Header': resolve('src/containers/Header'),
            '@COMPONENTS': resolve('src/components'),
            '@Test': resolve('test'),
            'vue$': 'vue/dist/vue.esm.js',
            '@setContainers': resolve('src/settingContainers'),
            '@containers': resolve('src/containers'),
            // '@containers': path.join( __dirname, 'src/containers' ),
            // '@containers': path.path.join( __dirname,__dirname, './src/containers/'),
            // '@containers': path.join( __dirname,'../src/containers'),
            '@': resolve('src'),
            '@styles': resolve('static/styles'),
        }
    }
}

if((process.env.NODE_ENV!='dev' && process.env.NODE_ENV!='undefined' && process.env.NODE_ENV!=undefined) || process.env.FOR_BOSS){
    webpackConfig.plugins.push(new bxPlugin({options: ''}))
}else{
    console.log('开发环境启动，版本生成脚本将不会运行')
}

// if(!isMobile){
//     module.exports = webpackConfig
// }else{
    const vuxLoader = require('vux-loader')
    // const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

    module.exports = vuxLoader.merge(webpackConfig, {
        plugins: ['vux-ui',

            // ,
            // new EventCallbackWebpackPlugin('done', () => {
            //     console.log('Hello `done`!');
            // })
        ]
    })
// }



// afterCompile
