var express = require('express')
var app = express()
var config = require('../config')
var path = require('path')
var fs=require('fs')
var staticPath = path.posix.join(config.dev.assetsPublicPath, 'static')
var distPath = path.posix.join(config.dev.assetsPublicPath, 'dist')
var proxyMiddleware = require('http-proxy-middleware')
var axios=require('axios')
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var multer = require('multer');
app.use(multer({ dest: '../uploads/'}));



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

// app.use(staticPath, express.static(process.env.MOBILE==1?'./src/mobile/static':'./static'))
app.use('/', express.static(path.join(__dirname, '../dist')))

// console.log('staticPath--:',staticPath)
// console.log('distPath--:',distPath)
app.use('/static', express.static(path.join(__dirname, '../dist/static')))


app.use('/mobiledist', express.static(path.join(__dirname, '../mobiledist')))
app.use('/mobilestatic', express.static(path.join(__dirname, '../mobiledist/mobilestatic')))
app.use('/ccdist', express.static(path.join(__dirname, '../ccdist')))
app.use('/bossdist', express.static(path.join(__dirname, '../bossdist')))
app.use('/ccstatic', express.static(path.join(__dirname, '../ccdist/ccstatic')))
app.use('/bossstatic', express.static(path.join(__dirname, '../bossdist/bossstatic')))

// console.log('staticPath--:',staticPath)
// console.log('distPath--:',distPath)
// app.use('/mobilestatic', express.static(path.join(__dirname, '../mobiledist/mobilestatic')))

app.get('/jsontest',function(req,res){

    res.header('Content-Type','text/html; charset=utf-8')
    // res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});

    var data={
        /* 上传图片配置项 */
        "imageActionName": "uploadimage", /* 执行上传图片的action名称 */
        "imageFieldName": "upfile", /* 提交的图片表单名称 */
        "imageMaxSize": 2048000, /* 上传大小限制，单位B */
        "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */
        "imageCompressEnable": true, /* 是否压缩图片,默认是true */
        "imageCompressBorder": 1600, /* 图片压缩最长边限制 */
        "imageInsertAlign": "none", /* 插入的图片浮动方式 */
        "imageUrlPrefix": "http://www.baidu.com/", /* 图片访问路径前缀 */

        "imagePathFormat": "/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
        /* {filename} 会替换成原文件名,配置这项需要注意中文乱码问题 */
        /* {rand:6} 会替换成随机数,后面的数字是随机数的位数 */
        /* {time} 会替换成时间戳 */
        /* {yyyy} 会替换成四位年份 */
        /* {yy} 会替换成两位年份 */
        /* {mm} 会替换成两位月份 */
        /* {dd} 会替换成两位日期 */
        /* {hh} 会替换成两位小时 */
        /* {ii} 会替换成两位分钟 */
        /* {ss} 会替换成两位秒 */
        /* 非法字符 \ : * ? " < > | */
        /* 具请体看线上文档: fex.baidu.com/ueditor/#use-format_upload_filename */

        /* 涂鸦图片上传配置项 */
        "scrawlActionName": "uploadscrawl", /* 执行上传涂鸦的action名称 */
        "scrawlFieldName": "upfile", /* 提交的图片表单名称 */
        "scrawlPathFormat": "/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
        "scrawlMaxSize": 2048000, /* 上传大小限制，单位B */
        "scrawlUrlPrefix": "", /* 图片访问路径前缀 */
        "scrawlInsertAlign": "none",

        /* 截图工具上传 */
        "snapscreenActionName": "uploadimage", /* 执行上传截图的action名称 */
        "snapscreenPathFormat": "/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
        "snapscreenUrlPrefix": "", /* 图片访问路径前缀 */
        "snapscreenInsertAlign": "none", /* 插入的图片浮动方式 */

        /* 抓取远程图片配置 */
        "catcherLocalDomain": ["127.0.0.1", "localhost", "img.baidu.com"],
        "catcherActionName": "catchimage", /* 执行抓取远程图片的action名称 */
        "catcherFieldName": "source", /* 提交的图片列表表单名称 */
        "catcherPathFormat": "/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
        "catcherUrlPrefix": "", /* 图片访问路径前缀 */
        "catcherMaxSize": 2048000, /* 上传大小限制，单位B */
        "catcherAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 抓取图片格式显示 */

        /* 上传视频配置 */
        "videoActionName": "uploadvideo", /* 执行上传视频的action名称 */
        "videoFieldName": "upfile", /* 提交的视频表单名称 */
        "videoPathFormat": "/ueditor/php/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
        "videoUrlPrefix": "", /* 视频访问路径前缀 */
        "videoMaxSize": 102400000, /* 上传大小限制，单位B，默认100MB */
        "videoAllowFiles": [
            ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
            ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"], /* 上传视频格式显示 */

        /* 上传文件配置 */
        "fileActionName": "uploadfile", /* controller里,执行上传视频的action名称 */
        "fileFieldName": "upfile", /* 提交的文件表单名称 */
        "filePathFormat": "/ueditor/php/upload/file/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
        "fileUrlPrefix": "", /* 文件访问路径前缀 */
        "fileMaxSize": 51200000, /* 上传大小限制，单位B，默认50MB */
        "fileAllowFiles": [
            ".png", ".jpg", ".jpeg", ".gif", ".bmp",
            ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
            ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
            ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
            ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
        ], /* 上传文件格式显示 */

        /* 列出指定目录下的图片 */
        "imageManagerActionName": "listimage", /* 执行图片管理的action名称 */
        "imageManagerListPath": "/ueditor/php/upload/image/", /* 指定要列出图片的目录 */
        "imageManagerListSize": 20, /* 每次列出文件数量 */
        "imageManagerUrlPrefix": "", /* 图片访问路径前缀 */
        "imageManagerInsertAlign": "none", /* 插入的图片浮动方式 */
        "imageManagerAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 列出的文件类型 */

        /* 列出指定目录下的文件 */
        "fileManagerActionName": "listfile", /* 执行文件管理的action名称 */
        "fileManagerListPath": "/ueditor/php/upload/file/", /* 指定要列出文件的目录 */
        "fileManagerUrlPrefix": "", /* 文件访问路径前缀 */
        "fileManagerListSize": 20, /* 每次列出文件数量 */
        "fileManagerAllowFiles": [
            ".png", ".jpg", ".jpeg", ".gif", ".bmp",
            ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
            ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
            ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
            ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
        ] /* 列出的文件类型 */

    }



          data = JSON.stringify(data);
        //假设我们定义的回调函数名为test
        //     var callback = 'callback'+'('+data+');';
           res.end(data);
})






'get post put delete'.split(' ').forEach(function(type){
    app[type]('/proxy',function (req, res) {
        handleRequest(req, res, type);
    })
})

//
// app.get('/proxy', function (req, res) {
//     handleRequest(req, res, 'get');
// })
// app.post('/proxy',function(req,res){
//     // console.log('req body in proxy:',req.body);
//     handleRequest(req,res,'post');
// })

function handleRequest(req, res, type) {
    type = type || 'get';
    // var url=BASE_URL+(req.url.substring(4).split('?')[0]||'/');
    // if(type==='get'){
    //     url+u.map2LocationSearch(req.query);
    // }
    var url = decodeURIComponent(req.query.url);

    var cookie = decodeURIComponent(req.query.cookie);
    console.log("proxy query url:", url);
    console.log("req.body----:",req.body);
    console.log('type-----:', type);
    // var options = {
    //     url: url,
    //     data: req.body||{},
    // };

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



app.post('/404',function(req,res){
    res.send(404);
})

app.post('/uploads', function (req, res) {

    res.send({
        status:'success'
    })
});

let proxyTable={
    '/mock': {
        target: 'http://192.168.3.56:10000/mock/5aa786617b42587121367151',
        changeOrigin: true,
        pathRewrite: {
            '^/mock': '/'
        }
    }
}

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

//
// app.get('/',function(req,res){
//
//     var fileStr= fs.readFileSync(path.join(__dirname, '../dist/index.html')).toString()
//
//     // fs.readFile(path.join(__dirname, '../dist/index.html'), function (err,bytesRead) {
//     //     if (err) throw err;
//     //     res.send()
//     // });
//
//     // let str=fs.readFileSync
//
//     console.log('fileStr',fileStr)
//
//     res.write(fileStr)
//
//     res.end()
//
//     // res.render('./dist/index.html')
// })

// console.log('staticPath--:',staticPath)

// app.use(staticPath, express.static('./static'))
var os=require('os');
var platform=os.platform().toLowerCase();
var port=platform.indexOf('linux')===-1?(process.env.PORT||8084):80
app.listen(port)
console.log('运行到了'+port+'端口')
// app.listen(process.env.PORT||8084)