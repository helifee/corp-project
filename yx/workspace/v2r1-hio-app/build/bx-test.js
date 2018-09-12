// cross-env CC=1 NODE_ENV=testing PREVENT_MOCK=1 node ./build/bx-test.js
// http://localhost:8084/bossdist/#/netDisk?accessToken=56dd6b26-8019-46e5-835f-d4c4b218462e&tokenType=1
let distFolderNamePrefix
if(process.env.CC){
    distFolderNamePrefix='cc'
}else if(process.env.MOBILE){
    distFolderNamePrefix='mobile'
}else if(process.env.FOR_BOSS){
    distFolderNamePrefix='boss'
}else{
    distFolderNamePrefix=''
}

console.log('distFolderNamePrefix--:',distFolderNamePrefix)

var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
//         var filePath = path.resolve('./build');
var distPath='./'+distFolderNamePrefix+'dist'
var filePath = path.resolve(distPath+'/'+distFolderNamePrefix+'static/js');

//调用文件遍历方法
//         fileDisplay(filePath);



// var jsFileArr=[],
var count=0,len;
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
// function fileDisplay(filePath){
//根据文件路径读取文件，返回文件列表
try{
    fs.readdir(filePath,function(err,files){
        if(!files){
            console.log('files啥都木有：',files)
            return false
        }
        len=files.length
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                count++
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件

                        if(isFile){
                            // console.log(filedir.split)

                            let name=filedir.split('\\').reverse()[0]

                            console.log('js file name--:',name)
                            // jsFileArr.push()

                            // console.log(filedir.split('\\').reverse()[0]);



                            console.log('process.env.NODE_ENV--:',process.env.NODE_ENV)
                            if(name.startsWith('app.') && name.endsWith('.js')){
                                fs.writeFileSync(distPath+'/version.txt',name.split('.')[1])
                                console.log('版本信息成功写入在'+distPath+'/version.txt'+'文件中')
                            }
                        }




                        // var isDir = stats.isDirectory();//是文件夹
                        // if(isDir){
                        //     fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        // }
                    }
                })
            });
            // setTimeout(function(){
            //     fs.writeFileSync('./abcd.txt',jsFileArr.toString())
            // },2000)

        }
    });
}catch(e){
    console.log('catch one e when get dist version:',e)
}

// }