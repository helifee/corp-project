import router from '@/router/router.js'
import Vue from 'vue'
import f from './commonFormHandler'
import u from '@util'
var hasInvokedTestCache=false

let s={

    gotoWEBOA(to){
        to=to||{query:{}}
        console.log('fucku to--:',to)
        let origin=JZY.c.WEB_OA_ORIGIN;
        if(origin.trim()==''){
            origin=location.origin
        }


        let href=origin+'/#/login?accessToken='+(to.query.accessToken||JZY.store.state.route.query.accessToken)+
            '&tendId='+(to.query.tendId||JZY.store.state.route.query.tendId)

        // alert(href)
        // return false
        location.href=href

    },
    routerFrom:'',
    keepAliveDataCache:{},
    getCCParams(){
      return 'accessToken='+JZY.c.AUTO_LOGIN.headers.authorization+'&tendId='+JZY.store.state.session.userInfo.defaultTendId
    },
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
    lastReloadHref:null,
    mouseDownEvent:null,
    mouseUpEvent:null,
    isUploadingFiles:false,
    isAbsoluteUrl(url){
      return url.startsWith('http://')||url.startsWith('https://')
    },
    queryLastXhrSendDataByUrl(url){
        if(typeof(url)=='string'){
            url=[url]
        }
        // '/disk/diskCompanyFile/rootPage'
        let arr=JZY.s.lastXhrRequests.filter((item)=>url.includes(item.url))
        return arr[arr.length-1]
    },
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
    eventBus:new Vue(),
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
    jsHash:null,
    // getJs(path){
    //     return new Promise((resolve)=>{
    //         var script=document.createElement('script')
    //         // path=path+'?r='+s.jsHash
    //         script.src=path
    //         document.body.appendChild(script)
    //         script.onload=function(){
    //             resolve()
    //         }
    //
    //
    //     })
    // },

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
    getOssThumbSrc(src,defaultSrc=null){
        if(src==null || src.trim()==''){
            return defaultSrc||(JZY.c.imgPath+'/logo.png')
        }
        if(src.startsWith('http')){
            return src+'?x-oss-process=image/resize,m_fixed,h_50,w_50'
        }else{
            return src
        }

    },
    // ifSwitchedTend:false,
    // getIfSwitchedTend(){
    //     return s.ifSwitchedTend
    // },
    // setIfSwitchTend(bool){
    //     s.ifSwitchedTend=bool
    // },
    needLogout:false,
    clearUserInfoCache(){
        JZY.store.commit('UPDATE_USERINFO',null)
        delete JZY.c.AUTO_LOGIN.headers.authorization
        localStorage.removeItem('authorization')
        sessionStorage.removeItem('authorization')
        localStorage.removeItem('userInfo')
    },
    logout:u.debounce(function(gotoLoginPage=true,backCurrentUrlAfterLogin=true,requestLogoutInterface=true){

        // function clearUserInfoCache(){
        //    
        // }
        

        // let doLogout=()=>{
            
            // s.setIfSwitchTend(false)
            if(gotoLoginPage){

                // location.href=(location.href.split('#')[0]+'#/system/organization')


                // JZY.router.push('/login'+(backCurrentUrlAfterLogin==true?
                //     '?redirect='+(window.encodeURIComponent(location.hash.substring(1))):''))


                JZY.router.push('/login'
                    +((JZY.DEBUG_MODE)?
                        '?redirect='+(window.encodeURIComponent(location.hash.substring(1))):'')
                )


                // location.href=location.href.split('#')[0]+'#/login'
                //     +((JZY.DEBUG_MODE)?
                //     '?redirect='+(window.encodeURIComponent(location.hash.substring(1))):'')

                s.needLogout=true



                // location.reload()
            }else{
                s.clearUserInfoCache()
            }
        // }

        // if(JZY.IS_BOSS || JZY.IS_CC){
        //     doLogout()
        // }else{
        //     if(requestLogoutInterface==true){
        //
        //
        //
        //         s.needLogout=true
        //         doLogout()
        //        
        //        
        //     }else{
        //         doLogout()
        //     }
        //
        // }




    },200,true),
    getAccessTokenByAuthorization(){

        let arr=(JZY.c.AUTO_LOGIN.headers.authorization||JZY.c.AUTO_LOGIN.headers.accessToken).split(' ')

        if(arr.length==1){
            return 'access_token='+arr[0]
                +'&token_type='+JZY.c.AUTO_LOGIN.headers.tokenType
                +'&accessToken='+arr[0]
                +'&tokenType='+JZY.c.AUTO_LOGIN.headers.tokenType
        }

      return 'access_token='+arr[1]
    },
    hasXhrError:false,
    f:f,


    window:window,
    document:window.document,
    showLoading:(function(){
        let count=0
       return function(){
           if(JZY.IS_CC && count<=2){
               return false
           }


           JZY.store.commit('TOGGLE_LOADING',true)
       }
    })(),
    hideLoading:(function(){
        let count=0
        return function(){
            try{
                console.log('trace hide loading')
                console.trace()
                count++
                // if(JZY.IS_CC && count<=1){
                //     return false
                // }
                console.log('kcuf_u hide loading')
                JZY.IS_CC && (JZY.s.appInstance.hasAppLoaded=true)
                // if(('appInstance' in JZY.s) && (!JZY.s.appInstance.hasAppLoaded)){
                //     JZY.s.appInstance.hasAppLoaded=true
                //     return false
                // }

                JZY.store.commit('TOGGLE_LOADING',false)
            }catch(e){
                console.warn('kcuf_u hide loading e--:',e)
            }

        }
    })(),

    // testCache(){
    //
    //
    //     if(hasInvokedTestCache){
    //       return 'invoked test cache'
    //     }
    //     let cache=parseInt(localStorage.getItem('testCache')||0,10)
    //     hasInvokedTestCache=true
    //
    //   cache+=1
    //     localStorage.setItem('testCache',cache)
    //   return cache
    // },
    // foo:'bar',
    isHideHeader:['/setFlowClient','/login'],
    fullPageModulesPath:['/schedule','/demo','/flowClient','/setFlowClient','/login', '/email'],
    getPathName(){
        return location.hash.split('?')[0].substring(1).trim();
    },

    getModuleName(){
      return s.getPathName().substring(1).split('/')[0]
    },

    isDebugMode(){
        return JZY.LOG_MODE||location.href.includes('jzydebug')

    },
    unDisabledAllInput(context){
        var inputs = context.querySelectorAll('input,textarea')
        for (var i = 0; i < inputs.length; i++) {
            jQuery(inputs[i]).removeAttr('disabled')
            // inputs[i].setAttribute('disabled', 'disabled')
            // inputs[i].classList.add('bx-disabled-input')
        }
    },
    disabledAllInput(context) {
        var inputs = context.querySelectorAll('input,textarea')
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute('disabled', 'disabled')
            // inputs[i].classList.add('bx-disabled-input')


            if(inputs[i].value==''){
                inputs[i].setAttribute('placeholder','')
            }
        }


        // var inputNumbers=document.querySelectorAll('.el-input-number')
        // for(var j=0j<inputNumbers.lengthj++){
        //     inputNumbers[j].classList.add('bx-disabled-input-number-div')
        // }
    },
    clog(){
        if(s.isDebugMode()){
            console.log('---begin----')
            for(var i=0;i<arguments.length;i++){
                console.log('第'+(i+1)+'个参数:',arguments[i])
            }
            console.log('---end---\n\r\n\n\n\n\n\n')
        }
    },
    changeRouter(url){
        // let targetUrl=url+(s.isDebugMode()?'?jzydebug':'')

        router.push(url)


    },
    // reloadWhenHMR: (function () {
    //     var hasOpenReload = false
    //
    //     return function (cb) {
    //
    //         if (hasOpenReload) {
    //             return false
    //         }
    //         // alert("test")
    //         hasOpenReload = true
    //         var oldClog = console.log
    //         console.log = function () {
    //             var arg0 = arguments[0]
    //             oldClog.apply(console, arguments)
    //
    //
    //
    //
    //
    //
    //             if (arg0 == '[HMR] App is up to date.') {
    //
    //
    //
    //
    //
    //                 if (cb) {
    //
    //                     cb()
    //                 } else {
    //                     // if(u.isInBrowser()){
    //                     setTimeout(function () {
    //                         location.reload()
    //                     },100)
    //                     // }
    //
    //


    //                 }
    //             }

    //
    //         }
    //     }

    // })(),
}




document.body.addEventListener('mousedown',(e)=>{
    s.mouseDownEvent=e
})
document.body.addEventListener('mouseup',(e)=>{
    s.mouseUpEvent=e


    var tar=e.target

    function isSaveBtn(tar){
        return '保存 提交'.split(' ').includes(tar.innerText.trim())
    }

    // console.log('kcuf_u tar--:',tar,tar.classList.contains('el-button'),
    //     jQuery(tar).closest('.el-dialog__header'),
    //     jQuery(tar).closest('.el-dialog__headerdddddddddddd')[0],
    //     jQuery(tar).closest('.el-dialog__header').closest('.el-dialog').find('.el-dialog__body'),
    //     isSaveBtn(tar))

    if(!tar.dataset.hasOwnProperty('routerHref') && tar.parentNode.dataset.hasOwnProperty('routerHref')){
        tar=tar.parentNode
    }
    else{
        let $tar=jQuery(tar),
            $title=$tar.closest('.el-dialog__header')[0]
        console.log('test---sdfsdf:',$tar.closest('.el-dialog__header'))
        function handleSaveBtnInDialog(){
            let body=$tar.closest('.el-dialog__header').closest('.el-dialog').find('.el-dialog__body').get(0)

            setTimeout(()=>{
                let firstErrorFormItem=body.querySelector('.is-error')
                console.log("firstErrorFormItem---:",firstErrorFormItem)
                if(firstErrorFormItem){
                    body.scrollTop=$(firstErrorFormItem).offset().top-60
                }
            },600)

        }
        if($title && isSaveBtn(tar) && tar.nodeName.toLowerCase()=='span'){
            tar=tar.parentNode
            handleSaveBtnInDialog()
        }else if($title && isSaveBtn(tar)){
            handleSaveBtnInDialog()
        }
    }

    if('routerHref' in (tar.dataset || {})){
        let targetReloadHref=tar.dataset.routerHref

        console.log('s.lastReloadHref==targetReloadHref',s.lastReloadHref,targetReloadHref)

        if(s.lastReloadHref==targetReloadHref){
            console.log('trigger a router reload bus')
            s.eventBus.$emit('ROUTER_RELOAD')
        }

        // s.lastReloadHref=targetReloadHref
    }

    // console.log('e.target.dataset',e.target.dataset)


    let TARGET_CLASS_CHANGE_PATH=(s
        .mouseDownEvent
        .target
        .getAttribute('class')||'')
            .trim()
        .split(' ')
        .map((item)=>'.'+item)
        .join(',')
    +'=>'
    +(s
            .mouseUpEvent
            .target
            .getAttribute('class')||'')
            .trim()
            .split(' ')
            .map((item)=>'.'+item)
            .join(',')


            s.TARGET_CLASS_CHANGE_PATH=TARGET_CLASS_CHANGE_PATH


    // console.log('TARGET_CLASS_CHANGE_PATH--:',TARGET_CLASS_CHANGE_PATH)


})



export default s
