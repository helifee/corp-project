require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}


var bodyParser = require('body-parser');

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
// var proxyMiddleware = require('http-proxy-middleware')
var axios=require('axios')

var webpackConfig
  //   = process.env.NODE_ENV === 'testing'
  // ? require('./webpack.prod.conf')
  // : require('./webpack.dev.conf')

if(process.env.NODE_ENV=='testing'){
    webpackConfig=require('./webpack.test.conf')
}else if(process.env.NODE_ENV=='production'){
    webpackConfig=require('./webpack.prod.conf')
}else{
    webpackConfig=require('./webpack.dev.conf')
}

// webpackConfig = require('./webpack.dev.conf')


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// var proxyTable = config.dev.proxyTable

var app = express()




app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,authorization");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'du_da_ye');
    next();
});


app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}));
app.use(bodyParser.json({
    extended: false,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}));
var compiler = webpack(webpackConfig)

var multer = require('multer');
app.use(multer({ dest: '../uploads/'}));




'get post put delete'.split(' ').forEach(function(type){
    app[type]('/proxy',function (req, res) {
        handleRequest(req, res, type);
    })
})

// app.get('/proxy', function (req, res) {
//     handleRequest(req, res, 'get');
// })
// app.post('/proxy',function(req,res){
//     // console.log('req body in proxy:',req.body);
//     handleRequest(req,res,'post');
// })

function handleRequest(req, res, type) {




    // var cookies = req.cookies

    // console.log('cookies--:',cookies);
    type = type || 'get';
    // var url=BASE_URL+(req.url.substring(4).split('?')[0]||'/');
    // if(type==='get'){
    //     url+u.map2LocationSearch(req.query);
    // }
    var url = decodeURIComponent(req.query.url);
    var cookie = decodeURIComponent(req.query.cookie);
    console.log("proxy query url:", url);
    console.log("req.body----:",req.body);
    console.log("req.headers----:",req.headers);
    console.log('type-----:', type);
    // var options = {
    //     url: url,
    //     data: req.body||{},
    // };np

    // axios[type](options.url,options.data)
    var axiosOptions={
        method:type,
        url:encodeURI(url),
        data:req.body||{},
        withCredentials:true,
        headers:{
            'Cookie':encodeURI(cookie),
            'Authorization':req.headers['authorization'],
            'Content-Type':'application/json;charset=utf-8'
        }
    };
    console.log('axiosOptions is:',axiosOptions);
    axios(axiosOptions)
        .then(function(response){
            console.log("axios ok");
            // console.log('axios then response:',response);


            for(var i in response.headers){
                res.setHeader(i,response.headers[i])
            }

            res.send(response.data);

        })
        .catch(function(err){
            console.log("axios not ok");
            // console.log('catch err:',err,typeof(err));
            // console.log('err--:',err.response,err.response.data);
            res.send({
                err:err.message,
                status:err.response.status
            });

        })


}


app.post('/uploads', function (req, res) {

    res.send({
        status:'success'
    })
});


app.post('/404',function(req,res){
    res.send(404);
})

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
    host:'0.0.0.0',
    disableHostCheck:true,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// console.log('staticPath--:',staticPath,process.env.MOBILE==1)
app.use(staticPath, express.static('./static'))
app.use('/mobilestatic', express.static('./src/mobile/static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port, '0.0.0.0')

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
