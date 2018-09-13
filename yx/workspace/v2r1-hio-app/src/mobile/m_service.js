import xhrWrapperCore from '@/services/xhrWrapper.core.js'
// import Vue from 'Vue'
import Vue from 'vue'
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

console.log('xhrWrapperCore--：',xhrWrapperCore)

// import { Toast } from 'vux'

let s={
    currentVersionHash:null,
    checkAppVersion(){
        console.log('开始检查版本更新')

        console.log('process.env--:',process.env)
        console.log('process.env cc--:',process.env.CC,typeof(process.env.CC))
        console.log('process.env MOBILE--:',process.env.MOBILE)
        console.log('process.env boss--:',process.env.boss)
        if(JZY.DEBUG_MODE && !JZY.IS_BOSS){
            console.log('开发环境不检查版本更新')
            return false;
        }
        let distFolderNamePrefix
        if(process.env.CC-0){
            distFolderNamePrefix='cc'
        }else if(process.env.MOBILE-0){
            distFolderNamePrefix='mobile'
        }else if(process.env.FOR_BOSS-0){
            distFolderNamePrefix='boss'
        }else{
            distFolderNamePrefix=''
        }

        let versionFilePath=distFolderNamePrefix+(distFolderNamePrefix==''?'':'dist/')+'version.txt'
        JZY.xhr.r(versionFilePath)
            .then(([res])=>{
                if(s.currentVersionHash!=null && res!=s.currentVersionHash){
                    JZY.u.errorMsg('亲，系统版本已升级，请刷新页面重试')
                }
                s.currentVersionHash=res

                console.log('check version res--:',res)
            })
    },

    lastXhrRequests:[],
    queryLastXhrSendDataByUrl(url){
        if(typeof(url)=='string'){
            url=[url]
        }
        // '/disk/diskCompanyFile/rootPage'
        let arr=JZY.s.lastXhrRequests.filter((item)=>url.includes(item.url))
        return arr[arr.length-1]
    },
    getScript:(function(){

        let cachedScripts=[]

        return function(pathArr){
            // console.trace()

            let arg1=arguments[1],
                timeout=arguments[Number.isInteger(arg1)?1:2],
                baseUrl=!Number.isInteger(arg1)?(arg1||''):''




            if(typeof(pathArr)=='string'){
                pathArr=[pathArr]
            }
            console.log("pathArr--:",pathArr)

            let len=pathArr.length,
                loadedCount=0

            return new Promise((resolve)=>{




                if(JZY.DEBUG_MODE){
                    s.jsHash=''
                }else if(null===s.jsHash){
                    s.jsHash=
                        Array.prototype.map
                            .call(document.scripts,(item)=>item.src)
                            .find((str)=>str.split('/').reverse()[0].startsWith('app.'))
                            .split('/').reverse()[0].split('.')[1];
                    if(s.jsHash=='js'){
                        s.jsHash=''
                    }

                }

                let handleLoad=()=>{
                    loadedCount++
                    if(loadedCount==len){
                        setTimeout(()=>{
                            resolve()
                        },timeout)

                    }
                }


                pathArr.forEach((path)=>{
                    let postUrl=path.toLowerCase().endsWith('.js')?'':'.js'
                    path=baseUrl+path+postUrl+'?r='
                        +s.jsHash
                    // +(JZY.PROD_MODE?s.jsHash:Math.random())

                    if(cachedScripts.includes(path)){
                        handleLoad()
                    }else{


                        function getScript(source, callback) {
                            var script = document.createElement('script');
                            var prior = document.getElementsByTagName('script')[0];
                            script.async = 1;

                            script.onload = script.onreadystatechange = function( _, isAbort ) {
                                if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
                                    script.onload = script.onreadystatechange = null;
                                    script = undefined;

                                    if(!isAbort) { if(callback) callback(); }
                                }
                            };
                            script.onerror=function(){
                                JZY.u.errorMsg('加载资源失败，可能系统已更新，请刷新页面重试')
                            }

                            script.src = source;
                            prior.parentNode.insertBefore(script, prior);
                        }

                        getScript(path,()=>{
                            cachedScripts.push(path)
                            handleLoad()
                        })

                        // var script=document.createElement('script')
                        // script.src=path
                        // cachedScripts.push(path)
                        // document.body.appendChild(script)
                        // script.onload=handleLoad
                    }



                })





            })


        }
    })(),
    switchEnv(host){


        // if(!host.includes('http')){

        if(host.toLowerCase().trim()==JZY.APP_ENV.toLowerCase().trim()){
            return false
        }


        JZY.APP_ENV=host

        if(!host.includes('http')){
            host={
                'dev':'http://192.168.3.52:9999',
                'testing':'http://192.168.3.157:9999',
            }[host.toLowerCase().trim()]
        }




        // }


        let getReplacedStr=(str)=>{
            str=str.replace(/http(.*?)platform-app/gi,function(s){

                return host+'/platform-app'+str.split('platform-app')[1]
                // return s.split('//')[0]+"//"+host+'/platform-app'+str.split('platform-app')[1]
            })

            return str
        }

        for(var i in JZY.c.xhrSetting.HOST){
            let str=JZY.c.xhrSetting.HOST[i],
                isObj=typeof(str)=='object'
            if(isObj){
                str=str.url
            }
            if(str.includes('platform-app')){
                let hostMap=JZY.c.xhrSetting.HOST

                if(isObj){
                    hostMap[i].url=getReplacedStr(hostMap[i].url)
                }else{
                    hostMap[i]=getReplacedStr(hostMap[i])
                }

                // getReplacedStr((isObj?hostMap[i].url:hostMap[i]))
            }
        }

        console.log('切换成功，你需要重新登录了')
    },
    // showLoading(){
    //
    // },
    xhrWrapperCore:xhrWrapperCore,
    storeData:{},
    getPathName(){
        return location.hash.split('?')[0].substring(1).trim();
    },

    isDebugMode(){
        return JZY.LOG_MODE||location.href.includes('jzydebug')

    },
    clog(){
        if(s.isDebugMode()){
            console.log('---begin----')
            for(var i=0;i<arguments.length;i++){
                console.log('第'+(i+1)+'个参数:',arguments[i])
            }
            console.log('---end---')
        }
    },
    putData(key,data){
        this.storeData[key] = data;

    },
    getData(key){
        return this.storeData[key];
    },
    clearData(key){
        delete this.storeData[key];
    },
    routerGo(opporData,_that){
        let fromP = this.getData("params");
        let p_param = Object.assign(this.getData("params").params,opporData);
        _that.$router.push({
            name: fromP.name,
            params: p_param,
            query:fromP.query
        });
    },
    routerSelectGo(router,_that){
        let fromUrl = {
            name:_that.$route.name,
            query:_that.$route.query,
            params:_that.$route.params
        }
        this.putData("params",fromUrl);
        _that.$router.push({
            name: router,
            query: {
                isSelect : true
            }
        });
    },
    //权限信息
    hasMenuPermisson(code,type='query'){
        if('accessToken' in JZY.c.AUTO_LOGIN.headers){
            return false
        }
        // try{
        let numType={
            view:1,
            modify:2,
            archive:4,
        }[type];
        let menus = JZY.store.state.session.tenantInfo.roleMenus;
        return +JZY.store.state.session.tenantInfo.isSuper||menus.find((item)=>item.code==code && (item.permissionValue&numType)==numType)?true:false

        // }catch(e){
        //     console.warn('has menu permission e--P:',e)
        //     return false
        // }
        //   查看、编辑、归档

    },
    hasBtnPermisson(code){
        return JZY.store.state.session.tenantInfo.roleMenus.find((item)=>item.buttons.code==code)?true:false
    },

}

function toast(msg,type){
        Vue.$vux.toast.show({
            text: msg,
            type:type
        })
}



xhrWrapperCore.warningMsg=xhrWrapperCore.errorMsg=(msg)=>(toast(msg,'warn'))
xhrWrapperCore.successMsg=(msg)=>(toast(msg,'success'))

// console.log('ToastPlugin--:',Vue.prototype)
export default s;