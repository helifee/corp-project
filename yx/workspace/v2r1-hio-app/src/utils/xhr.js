/**
 * Created by dbx on 2017/4/13.
 */
// import u from './addressSelectUtil.js'



import Vue from 'vue'

let util={

    map2QueryString(map){
        let str=''
        for(var i in map){
            str+=i+'='+map[i]+'&'
        }
        return str.substring(0,str.length-1)
    },
    deepExtend:(function(){

        function extend(target, source, shallow) {
            var array = '[object Array]',
                object = '[object Object]',
                targetMeta, sourceMeta,
                setMeta = function (value) {
                    var meta,
                        jclass = {}.toString.call(value)
                    if (value === undefined) return 0
                    if (typeof value !== 'object') return false
                    if (jclass === array) {
                        return 1
                    }
                    if (jclass === object) return 2
                }
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    targetMeta = setMeta(target[key])
                    sourceMeta = setMeta(source[key])
                    if (source[key] !== target[key]) {
                        if (!shallow && sourceMeta && targetMeta && targetMeta === sourceMeta) {
                            target[key] = extend(target[key], source[key], true)
                        } else if (sourceMeta !== 0) {
                            target[key] = source[key]
                        }
                    }
                }
                else break // ownProperties are always first (see jQuery's isPlainObject function)
            }
            return target
        }

        extend.all=function(args){
            // console.log('arr')
            // var args=arr[0]
            console.log('all args:',args)
            if(args.length<2){
                alert('必须大于2个参数才能深度合并')
            }else{
                var result=extend(args[0],args[1])
                for(var i=2;i<args.length;i++){
                    result=extend(result,args[i])
                }
                return result
            }
        }

        return extend

    })(),
    copy(obj) {
        let temp
        if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
            return obj


        if (obj instanceof Date){
            temp = new obj.constructor() //or new Date(obj)
        }

        else{
            temp = obj.constructor()
        }

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null
                temp[key] = util.copy(obj[key])
                delete obj['isActiveClone']
            }
        }

        return temp
    },
    clog(){
        if(typeof(Vue.prototype.BX)!='undefined'){
            console.log('---begin----')
            for(var i=0;i<arguments.length;i++){
                console.log('第'+(i+1)+'个参数:',arguments[i])
            }
            console.log('---end---')
        }
    }
}
var defaultSetting={


    uniqueReqAtSameMoment:true,
        timeout:60*1000,//接口默认请求超时
        // reportTimeout:true,//是否开启超时警告
        language:{
            REQUEST_TIMEOUT:'请求超时',
            UNKNOWN_ERROR:'未知错误'
        },
        isCodeSuccess(res){//resolve时code是否是success
            return true
        }
    },
    interfaceDataCache={

    },
    pendingPromises={

    },
    getChaheKey=(options)=>{
        return options.url+options.type+JSON.stringify(options.data)
    },
    hasCache=(options)=>{
        // console.log('getChaheKey((options))-------------:',getChaheKey((options)),interfaceDataCache)
        // debugger
        return getChaheKey((options)) in interfaceDataCache
    },
    getCachedData=(options)=>{
        return util.copy(interfaceDataCache[getChaheKey(options)])
    },
    setCacheData=(options,data)=>{
        interfaceDataCache[getChaheKey(options)]=data
    },

    hasPendingPromise=(options)=>{
        return getChaheKey((options)) in pendingPromises
    },
    getPendingPromise=(options)=>{
        return pendingPromises[getChaheKey(options)]
    },
    setPendingPromise=(options,promise)=>{
        if(r.settings.uniqueReqAtSameMoment){
            pendingPromises[getChaheKey(options)]=promise
        }

    },
    deletePendingPromise=(options)=>{
        try{
            getPendingPromise(options)
                .then(()=>{
                    delete pendingPromises[getChaheKey(options)]
                }).catch(()=>{
                delete pendingPromises[getChaheKey(options)]
            })

        }catch(e){

        }

    }
async function r(){

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]'
    }

    // var url,data,type,headers
    var options

    if(typeof(arguments[0])==='string'){
        options={
            url:arguments[0],
            data:arguments[1]||{},
            type:arguments[2]||'get',
            headers:arguments[3]||{}
        }
    }else{
        options=arguments[0]

    }


    let headersCopy={...r.baseHeaders}


    if(r.tokenConfig.key!=''&&r.tokenConfig.excludes.includes(options.url.split('?')[0])){



        delete headersCopy[r.tokenConfig.key]
    }

    // console.log("headersCopy--:",headersCopy)

    options=util.deepExtend({

        settings:defaultSetting,
        cache:false,
        type:'get',
        multipart:false,
        withCredentials:false,
        url:'/promise-base-ajax-test-url',
        data:{},
        headers:{
            // 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            'Content-Type':'application/json;charset=utf-8',
            ...headersCopy
        }
    },options)
    JZY.s.clog('r ajax options----:',options)
    // if(!options.cache){
    //     options.data[Math.random()]=1
    // }
    let {url,data,type,headers,cache} = options


    var isMultiPart=options.multipart||headers['Content-Type'].indexOf('multipart/form-data')===0
    if(isMultiPart){
        options.headers['Content-Type']='multipart/form-data'
    }
    util.clog('promise based ajax headers:',headers)


    console.log('kcuf_u headers----:',options)


    util.clog('kcuf_u data--:',data)
    var args=arguments

    if(hasPendingPromise(options)){
        // await getPendingPromise(options)
        // deletePendingPromise(options)
        // alert('yes')

        return new Promise((resolve,reject)=>{
            getPendingPromise(options)
                .then((res)=>{
                    deletePendingPromise(options)
                    resolve(res)
                })
                .catch((e)=>{
                    deletePendingPromise(options)
                    reject(e)
                })

        })

    }




    let resPromise=new Promise(function(resolve,reject){


        // setTimeout(()=>{
        //     alert(1)
        //     if(hasPendingPromise(options)){
        //
        //
        //         deletePendingPromise(options)
        //     }
        // })




        if(hasCache(options)){
            resolve(getCachedData(options))
            deletePendingPromise(options)
            return false
        }


        util.clog('r argsssssss:',args,url)

        // var storageData,
        //     storageUrl=location.origin+(options.url.substring(0,1)==='/'?(options.url):('/'+options.url))
        // util.clog('options.url:',options.url,storageUrl)
        // if(storageData=JSON.parse(localStorage.getItem(storageUrl))){
        //     resolve({
        //         data:storageData,
        //         status:'success'
        //     })
        //     return false
        // }


        var xhr= new XMLHttpRequest()
        xhr.withCredentials = options.withCredentials

        util.clog('开始请求'+options.url,Date.now())

        xhr.open(type,url,true)
        // xhr.setRequestHeader("Content-Type", "application/json charset=utf-8")

        // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodedcharset=utf-8'
        // //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        // //$httpProvider.defaults.headers.post['Content-Type'] = 'application/jsoncharset=utf-8'
        // $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */* q=0.01'
        // $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

        for(var i in headers){
            if((''+headers[i]).indexOf('multipart/form-data')!==0){
                xhr.setRequestHeader(i,headers[i])
            }

        }



        // console.log('options.settings---:',options)
        xhr.timeout=options.settings.timeout
        xhr.ontimeout=function(){
            util.clog('xhr timeout:'+options.url,Date.now())
            // options.onTimeout(this)
            reject(options.settings.language.REQUEST_TIMEOUT)
            deletePendingPromise(options)

        }
        xhr.onerror=function(e){
            util.clog('xhr error:'+options.url,Date.now())
            util.clog('error e:',e)
            // if(hasTimeout){
            //     return false
            // }
            // clearTimeout()
            reject({
                e:e,
                type:'ERROR'
            })
            deletePendingPromise(options)
        }

        xhr.onload=function(){
            util.clog('请求完毕'+options.url,Date.now())
            // if(hasTimeout){
            //     return false
            // }
            // clearTimeout()
            var resData,result


            console.log('xhr res this--:',this)

            util.clog('url,type of response text,this',url,typeof(this.responseText),this)

            // console.log('response text:',this.responseText)
            try{
                resData=JSON.parse(this.responseText)
            }catch(e){
                console.warn(options.url+'res is not stanard json')
                resData=this.responseText
            }

            result={
                data:resData,
                // data:typeof(resData)=='object'?{...resData,XHR_INSTANCE:xhr}:{success:true,result:resData,XHR_INSTANCE:xhr},
                code:this.status,
                requestOptions:options,
                readyState:this.readyState,
                // xhrInstance:xhr,
                // code:null,
                status:'success',
                JSON:typeof(resData)==='object'
                // reason:'ERR_NOT_JSON'
            }
            // if(typeof(resData)==='object'){
            //     result={
            //         status:'success',
            //         data:resData,
            //         JSON:true,
            //     }
            // }else{
            //     result={
            //         data:resData,
            //         // code:null,
            //         status:'success',
            //         JSON:false
            //         // reason:'ERR_NOT_JSON'
            //     }
            // }
            console.log('xhr result---:',result)

            if(cache&&!hasCache(options)){
                setCacheData(options,result)
            }

            if(this.readyState === 4 && this.status === 200){
                resolve(result)
                deletePendingPromise(options)
            }else{
                reject(result)
                deletePendingPromise(options)
            }


        }


        var lastData
        if(isMultiPart){
            lastData=new FormData()
            for(var j in data){
                var item=data[j]
                if(isArray(item)&&item[0] instanceof Blob){
                    lastData.append(j,item[0],item[1])
                }else{
                    lastData.append(j,item)
                }

                // var arr=[i,data[i]]
                // if(data[i] instanceof Blob){
                //     arr.push('test.png')
                // }
                // lastData.append.apply(lastData,arr)


            }
        }else{
            if(options.headers['Content-Type'].trim().includes('x-www-form-urlencoded')){
                lastData=util.map2QueryString(data)
            }else{
                lastData=JSON.stringify(data)
            }



        }

        util.clog('lastData---:',lastData,isMultiPart)


        xhr.send(lastData)
    })

    console.log('kcuf_u getChaheKey(options)---:',getChaheKey(options))

    if(!hasPendingPromise(options)){

        console.log('set pending promise was invoked')
        setPendingPromise(options,resPromise)
    }

    return resPromise
}
r.getCachedData=()=>interfaceDataCache
r.getPendingPromises=()=>pendingPromises
r.settings=defaultSetting
r.baseHeaders={}
r.tokenConfig={
    key:'',
    excludes:[]
}

export default r
