// import u from './addressSelectUtil'
import c from '@config'
import service from '@service'
import Vue from'vue'
// import util from '../utils/util.js'
import r from '../utils/xhr.js'
import u from '@util'

// import {customeHeaders} from './axiosService'

// import globalConfig from '@/config/index.js'
// import storage from '@/utils/storage.js'
// import ajaxInterceptors from '@/utils/request/header.js'


// console.log('c-- in wrapper:',c)

let cfg=c.xhrSetting




function handle401(){
    if(process.env.FOR_BOSS==1){
        console.warn('BOSS_IFRAME_401 was invoked')
        JZY.u.errorMsg('用户身份过期，请重新登录')
        // window.parent.BOSS_IFRAME_401(JZY.store.state.route.path)
    }
    else if (JZY.IS_CC) {




        // JZY.s.logout(false)

        try{
            window.parent.JCC.p.webIframe401(JZY.store.state.route.path)
        }catch(e){}




        if(!document.body.classList.contains('cc-body')){
            JZY.u.warningMsg('用户身份过期，请重新进入')

        }

    } else {

        if(process.env.MOBILE==1){
            JZY.u.errorMsg('用户身份过期，请重新登录')
            // JZY.s.logout(false,true)
        }else{
            JZY.u.infoMsg('登录已过期,请重新登录')
            JZY.s.logout(false,true,false)
            JZY.router.push('/login?redirect=' + window.encodeURIComponent(JZY.store.state.route.path))
            JZY.s.hideLoading()
        }

    }
}





// console.log('自定义header:',headers)

// if(globalConfig.setting.permission){
//     if(storage.getItem('hivescm.userAuthor')!=null){
//         // 这里的config包含每次请求的内容
//         r.baseHeaders={
//             userId : storage.getItem('hivescm.userAuthor').id,
//             token : storage.getItem('hivescm.userAuthor').token
//         }
//         // config.headers.userId = storage.getItem('hivescm.userAuthor').id
//         // config.headers.token = storage.getItem('hivescm.userAuthor').token
//     }
// }else{
//     // 这里的config包含每次请求的内容
//     r.baseHeaders={
//         userId : '2160032',
//         token : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyMTYwMDMyIiwiaWF0IjoxNTA5MTYwOTIzfQ.Gz6eKAkimLguQGWWuWRAl1scnfY-HpeIICDZZF2KiX01ux7OVphfGmUT6o9q-n5eJxN0RA99evCHpfyR78gbVg'
//     }
//     // config.headers.userId = '2160032'
//     // config.headers.token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyMTYwMDMyIiwiaWF0IjoxNTA5MTYwOTIzfQ.Gz6eKAkimLguQGWWuWRAl1scnfY-HpeIICDZZF2KiX01ux7OVphfGmUT6o9q-n5eJxN0RA99evCHpfyR78gbVg'
// }

// r.baseHeaders

let util={
    clog(){
        if(typeof(Vue.prototype.BX)!='undefined'){
            console.log('---begin----')
            for(var i=0;i<arguments.length;i++){
                console.log('第'+(i+1)+'个参数:',arguments[i])
            }
            console.log('---end---')
        }
    },
}

const defaultHost = "GLOBAL"



let s={
    handle401:handle401,
    http:r,
    getHost(host){


        let res=host
            ||(cfg.MODULE_HOST_MAP['/'+(service.getPathName().split('/')[1]||'')])
            ||defaultHost

        return res
    },

    callInterfaceAndSetData(requestParam,setObj=null,modelStr,cache=false){
        return s.request(requestParam,cache)
            .then(([resData])=>{



                service.clog('res data--:',resData)
                if(setObj){
                    u.setDataByModel(setObj,modelStr,resData)
                }

                return resData
            }).catch((e)=>{
                util.clog('call interface e:',e)
                if(setObj){
                    u.setDataByModel(setObj,modelStr,undefined)
                }

                throw e
            })
    },
    transformUrl(arg,host='GLOBAL',proxy=true) {



        if(arg.toLowerCase().includes('http')){
            return arg
        }



        var requestSelf=arg.substring(0,1)==='/'
        if(requestSelf){




            if(!(host in cfg.HOST)){
                host=host.split('.')[0]
            }
            let hostObj=cfg.HOST[host]

            JZY.s.clog('host and if in:',host, (host in cfg.HOST),hostObj)

            if(typeof(hostObj)=='string'){
                return hostObj + arg
            }else{
                proxy=proxy==false?false:(hostObj.proxy)


                if(r.tokenConfig.excludes.includes(hostObj.url + arg)){
                    proxy=false
                }

                if(!JZY.DEBUG_MODE){
                    proxy=false
                }


                if(proxy){


                    // (JZY.REMOTE_MODE?'http://dubaixing.vicp.cc:45442':'')+

                    return '/proxy?url='+window.encodeURIComponent(hostObj.url+arg)+'&cookie='+window.encodeURIComponent(document.cookie)
                }else{

                    JZY.s.clog('return url--:',hostObj.url + arg)

                    return hostObj.url + arg
                }

            }


        }else{
            return '/'+arg
        }



    },
    put(url,data,options){
        return s.post(url,data,options,'put')
    },
    drop(url,data,options){
        return s.post(url,data,options,'delete')
    },
    post(url, data, options,type='post') {
        // post(url, data, alertError=true,alertSuccess = true) {

        options=u.deepExtend({
            cache:false,
            alertSuccess:true,
            alertError:true
        },{
            type:type,
            ...options,

            url:url,
            data:data
        })

        // data = data || {}


        return new Promise((resolve,reject)=>{
            s.request(options, options.cache,options.alertError)
                .then(function (res) {
                    if (options.alertSuccess) {
                        s.successMsg('恭喜，操作成功')
                    }
                    return resolve(res)

                })
                .catch((e)=>{
                    reject(e)
                })
        })

        // return s.request(options, options.cache,options.alertError)
        //     .then(function (res) {
        //         if (options.alertSuccess) {
        //             s.successMsg('恭喜，操作成功')
        //         }
        //         return Promise.resolve(res)
        //
        //     })

    },
    requestPromises(arr,alertError=true) {

        // requestPromises(arr, key) {
        // s.$store.state.isLoading = true

        // if(alertError){
        //     cfg.REPORT_INTERFACE_ERROR = false
        // }


        // var resolveData = s.getMockInterfaceData(key)
        // if (key && cfg.DEBUG_MODE && resolveData) {
        //     return new Promise((resolve) => {
        //
        //         console.log('resolve data:', resolveData)
        //         Vue.set(s.$store.state, 'isLoading', false)
        //         // s.$store.state.isLoading=false
        //         return resolve(resolveData)
        //     })
        //     // .then((resolveData)=>{
        //     //     setTimeout(()=>{
        //     //         cfg.REPORT_INTERFACE_ERROR=true
        //     //     })
        //     //
        //     //     return resolveData
        //     // })
        // }


        return Promise.all(arr)
            .then((res) => {
                // s.$store.state.isLoading = false
                console.log('promise all res:', res)
                // setTimeout(() => {
                //     cfg.REPORT_INTERFACE_ERROR = true
                // })
                //
                // if (key) {
                //     s.setMockInterfaceData(key, res)
                // }

                return res


            }).catch((e) => {
                // s.$store.state.isLoading = false
                console.log('tms promise all catch', e)

                // if(alertError){
                //     s.errorMsg(e)
                //         .then(() => {
                //             setTimeout(() => {
                //                 cfg.REPORT_INTERFACE_ERROR = true
                //             })
                //         })
                // }



                throw e
            })
    },
    getDataByRes(res){
        if(typeof(res)=='string'){
            return res
        }

        if(res.list&&res.total){
            return res
        }else{
            if('data' in res){return res.data}
            if('result' in res){return res.result}
            if('list' in res){return res.list}
            return res

            // return res.data||res.result||res.list||res
        }


    },
    hostRequest(arg,host,cache=false,alertError=true){



        if(JZY.DEBUG_MODE){


            // if(host){
            //     if(typeof(host)=='string'){
            //         host=[host,'GLOBAL']
            //     }
            // }else{
            //     host=[s.getHost(),'GLOBAL']
            //     alert(host)
            // }

            // if(typeof(host)=='string'){
            //     if(host){
            //         host=[host,'GLOBAL']
            //     }else{
            //
            //     }
            // }


            // if(host && (typeof(host)=='string')){
            //     host=[host,'GLOBAL']
            // }
            //
            // if(!host){
            //
            //
            // }
        }else{
            if(Array.isArray(host)){
                host=host[0]
            }
        }




        if(JZY.PROD_MODE){
            // if(Array.isArray(host)){
            //     host=host[0]
            // }

            return s.request(arg,cache,alertError,host)
        }else{
            if(Array.isArray(host)){
                let len=host.length,
                    loopIndex=0,
                    ifContinueRequest=true

                return new Promise((resolve,reject)=>{
                    let loop=()=>{



                        s.request(arg,cache,alertError,host[loopIndex])
                            .then((res)=>{
                                resolve(res)
                            })
                            .catch((e)=>{

                                JZY.s.clog('cat e in loopppppppp:',e)



                                loopIndex++

                                if(loopIndex<len && ifContinueRequest){
                                    loop()

                                }
                                else{
                                    console.log("catch e in loop:",e)
                                    ifContinueRequest=false


                                    if(loopIndex==len){
                                        // throw e;
                                        reject(e)

                                    }

                                }

                            })


                    }

                    loop()
                })


            }else{
                return s.request(arg,cache,alertError,host)
            }
        }



    },
    request:(function(){




        r.settings.isCodeSuccess=function(res){
            var data=typeof(res.data)=='object'?(res.data):res
            return data.status ==1||data.success==true
                ||data.state=='SUCCESS'
                ||data.status==200
                // ||(data.status==200 && !data.hasOwnProperty('result'))
                // ||(data.status==200 && data.hasOwnProperty('result') && data.result!=null)
                ||data.status=='success'||Array.isArray(data.list)
            // return data.status && (data.status.statusCode === 0)
        }
        function getErrReason(data){

            // if('')

            return data.msg || data.message || data.err || data.error || r.settings.language.UNKNOWN_ERROR
            // if(data.status!=1 && data.msg){
            //     return data.msg
            // }
            //
            //
            // return (data.err&&data.err.indexOf('ECONNREFUSED')!==-1?'无法连接目标主机':data.err)
            //     ||(data.status.statusReason)
            //     ||(r.settings.language.UNKNOWN_ERROR)
        }
        return function (arg,cache=false,alertError=true,host=null) {

            if(service.lastXhrRequests.length>4){
                service.lastXhrRequests.splice(0,1)
            }

            service.lastXhrRequests.push(arg)





            let AUTO_LOGIN=c.AUTO_LOGIN

            let previousArg=JZY.u.copy(arg)


            // if(JZY.DEBUG_MODE){
            //     r.settings.uniqueReqAtSameMoment=false
            //
            // }

            r.tokenConfig={
                key:JZY.c.xhrSetting.TOKEN_CONFIG.key,
                excludes:(function(arr){

                    let res=[]

                    arr.forEach((item)=>{
                        item.urlPaths.forEach((str)=>{
                            res.push(JZY.xhr.transformUrl('/'+item.urlPrefix+'/'+str,JZY.c.xhrSetting.MODULE_HOST_MAP['/'+item.module],false))
                        })
                    })

                    return res


                })(JZY.c.xhrSetting.TOKEN_CONFIG.excludes)
            }



            // r.tokenConfig={
            //     key:'authorization',
            //     excludes:[
            //         JZY.xhr.transformUrl('/platform/login',JZY.c.xhrSetting.MODULE_HOST_MAP['/login'],false),
            //         JZY.xhr.transformUrl('/platform/smscode',JZY.c.xhrSetting.MODULE_HOST_MAP['/login'],false),
            //     ]
            // }
            // if(JZY.DEBUG_MODE && typeof(AUTO_LOGIN)=='object'){
            //
            //     // let headers=JZY.u.copy()
            //
            //
            //
            //
            //
            //
            //
            //     r.baseHeaders=AUTO_LOGIN.headers
            //
            // }
            r.baseHeaders={}
            for(var i in AUTO_LOGIN.headers){
                if(AUTO_LOGIN.headers[i]!==null && AUTO_LOGIN.headers[i]!=='null' && AUTO_LOGIN.headers[i]!=='undefined' && AUTO_LOGIN.headers[i]!==undefined){
                    r.baseHeaders[i]=AUTO_LOGIN.headers[i]
                }
            }

            // if(!JZY.DEBUG_MODE){
            //     if(typeof(AUTO_LOGIN)=='object'){
            //         r.baseHeaders=AUTO_LOGIN.headers
            //     }
            // }else{
            //     if(typeof(AUTO_LOGIN)=='object'){
            //
            //         // let headers=JZY.u.copy()
            //
            //
            //
            //
            //
            //
            //
            //         r.baseHeaders=AUTO_LOGIN.headers
            //     }
            // }




            // if(typeof(cache)==='undefined'){
            //     cache=false
            // }
            // if(typeof(alertError)==='undefined'){
            //     alertError=true
            // }












            // var requestTime=new Date().format(),
            //     reqResult=[]
            //
            // for(let index=0;index<urlArr.length;index++){
            //     promiseArr[index]
            //         .then((res)=>{
            //             var isSuccess=r.settings.isCodeSuccess(res)
            //             if(isSuccess){
            //                 reqResult.push({
            //                     url:urlArr[index],
            //                     requestTime:requestTime,
            //                     status:'success'
            //                 })
            //             }else{
            //                 var reason=getErrReason(res.data)
            //                 reqResult.push({
            //                     url:urlArr[index],
            //                     requestTime:requestTime,
            //                     status:'fail',
            //                     msg:reason
            //                 })
            //             }
            //
            //         }).catch((e)=>{
            //         reqResult.push({
            //             url:urlArr[index],
            //             requestTime:requestTime,
            //             status:'fail',
            //             msg:typeof(e)==='string'?e:(e.message||e.e.message)
            //         })
            //     })
            // }


            JZY.s.clog('arg---:',arg)


            return new Promise((resolve,reject)=>{







                let errorCount=0,
                    maxErrorCount=JZY.c.xhrSetting.retryCountWhenError
                    // maxErrorCount=3

                let loop=()=>{

                    arg=JZY.u.copy(previousArg)

                    var promiseArr = [],urlArr=[]



                    if (typeof(arg) === 'string') {

                        // promiseArr.push(r({url:s.transformUrl(arg),cache:cache}))
                        promiseArr.push(
                            r({
                                cache:cache,
                                url:s.transformUrl(arg,s.getHost(host))
                            })
                        )
                        urlArr.push(arg)

                        // result=r(url)

                    } else if (typeof(arg) === 'object') {




                        if (!Array.isArray(arg)) {

                            arg.url = s.transformUrl(arg.url,s.getHost(arg.host||host))
                            arg.cache=cache
                            promiseArr.push(r(arg))
                            urlArr.push(arg.url)
                            // result=r(arg)
                        } else {




                            // promiseArr = promiseArr.concat(arg)
                            arg.forEach((item) => {
                                if(typeof(item)==='string'){
                                    promiseArr.push(r({
                                        url:s.transformUrl(item,s.getHost(host)),
                                        cache:cache
                                    }))
                                    urlArr.push(item)
                                }else{
                                    item.url=s.transformUrl(item.url,s.getHost(item.host||host))
                                    item.cache=cache
                                    promiseArr.push(r(item))
                                    urlArr.push(item.url)
                                }

                            })
                        }


                    }



                    Promise.all(promiseArr).then((res) => {
                        JZY.s.clog('promise all res--:',res)
                        var errReason=null,
                            errData=null,
                            continueEach=true,
                            results=[]
                        var isAllRight=res.every(function(item){
                            // JZY.s.clog('every item:',item)

                            if(!continueEach){return false}




                            var data=item.data


                            var isTrue=r.settings.isCodeSuccess(item)
                            if(!isTrue){
                                console.warn('catch one fail code',data)


                                if(item.data.status==502){
                                    JZY.u.errorMsg("您当前没有访问权限，请联系管理员");
                                    continueEach=false
                                    return false
                                }else if(item.data.status==501 && !JZY.IS_BOSS){
                                    // JZY.u.errorMsg("您当前处于离职状态，请联系管理员");
                                    //session 出了问题，需要退出
                                    JZY.u.errorMsg(item.data.message);
                                    continueEach=false

                                    JZY.s.hideLoading()
                                    //移动端判断
                                    if(JZY.IS_MOBILE){
                                        JZY.u.errorMsg("您存在人事变动，请重新登录");
                                        return false
                                    }

                                    JZY.s.logout(false)
                                    JZY.router.push('/login?redirect=' + window.encodeURIComponent(JZY.store.state.route.path))

                                    return false
                                }

                                errData=data
                                errReason=getErrReason(data)
                                // errReason=


                                // errReason='status' in data?
                                //     (data.status.statusReason||r.settings.language.UNKNOWN_ERROR)
                                //     :
                                //     ((data.err&&data.err.indexOf('ECONNREFUSED')!==-1?'无法连接目标主机':data.err)||r.settings.language.UNKNOWN_ERROR)
                            }else{

                                results.push(s.getDataByRes(data))||null
                            }
                            return isTrue
                        })
                        // util.clog('isAllRight--:',isAllRight)
                        // util.clog('finally reqResult--- then--:',reqResult)


                        // JZY.s.clog('request result--:',results)

                        if(isAllRight){
                            return resolve(results)
                            // return Promise.resolve(results)
                        }else{

                            errorCount++;

                            if(errorCount<maxErrorCount && (!JZY.PROD_MODE)){
                                loop()
                            }else{
                                reject(errData)
                                // reject(errReason)
                                throw errReason
                            }


                        }



                    })
                        .catch((e) => {


                            errorCount++;

                            if(errorCount<maxErrorCount && (!JZY.PROD_MODE)){
                                loop()
                            }else{

                                console.log('kcuf_u e.code--:',e.code)

                                if(e.code==401) {

                                    handle401()
                                    reject(e)
                                    throw e
                                }
                                // else if(e.code==502){
                                //     //接口无权限
                                //     console.log("502权限异常请刷新页面重新获取权限");
                                //
                                //     // JZY.xhr.post("/sys/menu/queryMenuWithRole",{},{alertSuccess:true}).then((resultData)=>{
                                //     //     console.log("queryMenuWithRole:",resultData)
                                //     // }).catch((e)=>{
                                //     //     //接口失败
                                //     //
                                //     // })
                                // }
                                else{
                                    console.warn('catch a e:',e,alertError,cfg.REPORT_INTERFACE_ERROR)
                                    // util.clog('catch e--:',e)

                                    if(cfg.REPORT_INTERFACE_ERROR&&alertError){
                                        s.errorMsg(typeof(e)==='string'?e:(e.message||e.e.message))
                                    }


                                    // return Promise.reject(e)

                                    // util.clog('finally reqResult--- catch--:',reqResult)
                                    reject(e)
                                    throw e
                                }


                            }






                        })
                }


                loop()

                // if(JZY.DEBUG_MODE){
                //
                // }else{
                //     loop()
                // }


            })


            // return
            // .finally(()=>{
            //     util.clog('finally reqResult--:',reqResult)
            // })
            // return result
        }
    })(),
}

// console.log('123',s)


s.r=s.hostRequest;
// export const handle401
export default s
