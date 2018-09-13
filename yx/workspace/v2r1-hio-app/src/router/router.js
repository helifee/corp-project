import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import c from '@config'
import routes from '@routes'
import config from '@config'

// 创建路由对象
let router = new VueRouter({
    mode: config.historyMode,
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})


/*function authAdapterForBoss(){
    let userInfo={"sysTime":"2018-06-15T01:53:27.746Z","userIdIM":"0b3d156524b1438288ad005dc10479bd","userInfo":{"delflag":0,"name":"18701031737","hxPassword":"4297f44b13955235245b2497399d7a93","mobile":"18701031737","sex":1,"state":1,"resourceImgUrl":"","userIdIM":"0b3d156524b1438288ad005dc10479bd","tendList":[{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend150","userId":null,"defaultFlag":1,"outerLinkman":0,"mobile":"18701031737","tendName":"杜大爷额度企业","createDate":"2018-06-01 17:03:13","updateDate":"2018-06-01 17:03:13","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":null,"workStatus":null,"sid":"100273"},{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend129","userId":null,"defaultFlag":0,"outerLinkman":0,"mobile":"18701031737","tendName":"pc牛逼团队","createDate":"2018-06-07 09:34:35","updateDate":"2018-06-07 09:34:35","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":0,"workStatus":null,"sid":"100350"},{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend115","userId":null,"defaultFlag":0,"outerLinkman":0,"mobile":"18701031737","tendName":"chc公司债券","createDate":"2018-06-01 17:10:26","updateDate":"2018-06-01 17:10:26","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":null,"workStatus":null,"sid":"100274"}],"defaultTendId":"hio_tend150","currentTenantInfo":{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend129","userId":null,"defaultFlag":0,"outerLinkman":0,"mobile":"18701031737","tendName":"pc牛逼团队","createDate":"2018-06-07 09:34:35","updateDate":"2018-06-07 09:34:35","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":0,"workStatus":null,"sid":"100350"}},"defaultTenat":{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend150","userId":null,"defaultFlag":1,"outerLinkman":0,"mobile":"18701031737","tendName":"杜大爷额度企业","createDate":"2018-06-01 17:03:13","updateDate":"2018-06-01 17:03:13","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":null,"workStatus":null,"sid":"100273"},"name":"杜百兴","sid":"100676","parentRealityId":"1001","dept":"pc牛逼团队","role":"232、系统管理员、普通职员","tenantInfo":{"userId":"100676","userType":"1","userName":"杜百兴","userMobile":"18701031737","userEmail":"","workStatus":"job","sex":"1","isSuper":"1","jobs":[{"organizationId":"1001","postName":null,"isDefault":"true","organizationName":"pc牛逼团队","userPositionId":"100713"}],"roleNames":"232、系统管理员、普通职员","roleMenus":[],"logo":"http://hio-cc-test.oss-cn-beijing.aliyuncs.com/1527759672574592358"},"defaultJob":{"organizationId":"1001","postName":null,"isDefault":"true","organizationName":"pc牛逼团队","userPositionId":"100713"}}
    let authorization='Bearer 655d9352-35e8-4987-9d86-279afcfc44a6'

    localStorage.setItem('authorization',authorization)
    localStorage.setItem('userInfo',JSON.stringify(userInfo))

    c.AUTO_LOGIN.headers.authorization=authorization
}*/

router.afterEach(function(route) {
    if(JZY.IS_CC){
        document.body.classList[['netDisk','personalNetDisk','schedule','email'].includes(JZY.s.getModuleName())?'add':'remove']('cc-body')

    }

    if(JZY.IS_CC && !['netDisk','personalNetDisk','schedule','email'].includes(JZY.s.getModuleName())){
        JZY.router.go=JZY.router.push=function(){
            JZY.s.gotoWEBOA()
            // JZY.u.warningMsg('此场景下不可进行路由跳转');
        }
    }

    try{
        // JZY.s.appInstance.hasAppLoaded=true

        JZY.s.hideLoading()

        // if(!['schedule','netDisk','personalNetDisk'].includes(JZY.s.getModuleName())){
        //     console.log("loading hide after router each")
        //     JZY.s.hideLoading()
        // }

        // setTimeout(()=>{
        //     JZY.s.hideLoading()
        // },1000)

        // JZY.s.hideLoading()
        try{
            window.parent.JCC.p.webIframeAfterRouteChange(route)
        }catch(e){}




        // if(JZY.IS_CC && (!'netDisk personalNetDisk schedule news project'.split(' ').includes(JZY.s.getModuleName()))){
        //     JZY.s.showLoading()
        //     await JZY.u.waiting(100)
        //
        //     JZY.u.warningMsg(JZY.locale.$t('{g.sorryToMyBossWhenNotDevFinished}'),false,6000)
        //
        // }

        setTimeout(()=>{
            JZY.store.commit('UPDATE_IS_ROUTER_CHANGING',false)
        })
    }catch(e){
        console.warn('catch one e--:',e)
    }


    setTimeout(()=>{
        JZY.s.lastReloadHref=JZY.s.getPathName()
        console.log('router each has finished',JZY.s.lastReloadHref)
    },100)




})

let hasRequestUserInfo=false
function loginWithoutToken(to){
    console.log('to---:',to)
    function getQueryString(name)
    {
        return to.query[name]
        // var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        // var r = (window.location.href.split('?')[1]||'').match(reg);
        // if(r!=null)return  unescape(r[2]); return null;
    }
    function getUrlQuery(key){
        return getQueryString(key)||sessionStorage.getItem(key)||null
    }
    return new Promise((resolve,reject)=>{
        if(hasRequestUserInfo){
            resolve()
            return false
        }
        JZY.xhr.r({
            type:'post',
            url:'/platform/loginToken'
        },'GLOBAL')
            .then(([res])=>{
                console.log('kcuf_u token login rssss---:',res)
                let filteredTendList=res.userInfo.tendList.filter((item)=>item.outerLinkman!=1)
                res.userInfo.tendList=JZY.u.copy(filteredTendList)
                let tendList=res.userInfo.tendList
                    // ,
                    // defaultTend=tendList.find((item)=>item.defaultFlag==1)||tendList[0]
                // if(tendList.length==0){
                //     JZY.u.errorMsg('没有租户请联系管理员')
                //     return false
                // }

                let handleResolve=(userInfo)=>{
                    JZY.store.commit('UPDATE_USERINFO',userInfo)
                    hasRequestUserInfo=true

                    JZY.c.AUTO_LOGIN.headers.tendId=getUrlQuery('tendId')

                    sessionStorage.setItem('authorization',JZY.c.AUTO_LOGIN.headers.authorization)
                    sessionStorage.setItem('tendId',JZY.c.AUTO_LOGIN.headers.tendId)
                    resolve()
                }

                if(to.fullPath.startsWith('/personalNetDisk')
                ||to.fullPath.startsWith('/email')
                ){
                    handleResolve({
                        userInfo:res.userInfo,
                        requireTendId:false
                    })
                    return false
                }


                if(!getUrlQuery('tendId') || getUrlQuery('tendId')==null || getUrlQuery('tendId')=='null'){
                    JZY.u.errorMsg('没有传递tendId')
                    return false
                }
                //
                let currentTendInfo=tendList.find((item)=>getUrlQuery('tendId')==item.tendId)||{}
                // if(!currentTendInfo){
                //     JZY.u.errorMsg('该用户没有该租户')
                //     return false
                // }
                JZY.xhr.r({
                    type:'post',
                    url:'/sys/user/queryUserLoginInfo',
                    data:{
                        tendId:getUrlQuery('tendId')
                    }
                },'GLOBAL')
                    .then(([tenantInfoRes])=>{
                        try{
                            res.userInfo.currentTenantInfo=currentTendInfo;
                            handleResolve({
                                userInfo:res.userInfo,
                                tenantInfo:tenantInfoRes,
                            })


                        }catch(e){
                            console.warn('commit fail e--:',e)
                            JZY.u.errorMsg('系统繁忙，请稍后再试')
                            delete JZY.c.AUTO_LOGIN.headers.authorization
                        }

                    })

            })
            .catch((e)=>{
                JZY.u.errorMsg('用户身份有误，无法进入页面')
            })
    })
}
//pc web端刷新页面重新拿个用户信息包含权限信息
let isRoleInfoLoading=true;
function loadingRoleInfo(to){
    if(to.fullPath.startsWith('/demo') ||to.fullPath.startsWith('/demo1')){
        return new Promise((resolve)=>{
            resolve()
        })
    }


    return new Promise((resolve,reject)=>{
        if(!isRoleInfoLoading){
            resolve()
            return false
        }
        try{
            let currentTendId=JZY.store.state.session.userInfo.currentTenantInfo.tendId;
            if(currentTendId!=undefined && currentTendId!=""){
                JZY.xhr.r({
                    type:'post',
                    url:'/sys/user/queryUserLoginInfo',
                    data:{
                        tendId:currentTendId
                    }
                },'GLOBAL').then(([tenantInfoRes])=>{
                    try{
                        let userInfo={
                            userInfo:JZY.store.state.session.userInfo,
                            tenantInfo:tenantInfoRes,
                        };
                        JZY.store.commit('UPDATE_USERINFO',userInfo)
                        isRoleInfoLoading=false
                        resolve()
                    }catch(e){
                        // console.warn('commit fail e--:',e)
                        // JZY.u.errorMsg('系统繁忙，请稍后再试')
                    }
                }).catch((e)=>{
                    // JZY.u.errorMsg('获取用户身份信息失败，请刷新重试')
                })
            }
        }catch (e){
            JZY.u.errorMsg("读取当前租户id异常,请重新登录")
            JZY.s.logout();
        }

    })
}

router.beforeEach(async function(to, from, next) {
    JZY.s.checkAppVersion()
    // alert(JZY.s.appInstance.hasAppLoaded)
    JZY.s.showLoading()
    JZY.store.commit('UPDATE_IS_ROUTER_CHANGING',true)

    JZY.u.waiting()
    if(window.jQuery){
        window.$=jQuery
    }

    let authorization=to.query.accessToken||c.AUTO_LOGIN.headers.authorization||c.AUTO_LOGIN.headers.accessToken
        ||sessionStorage.getItem('authorization')
        ||localStorage.getItem('authorization')||null

    console.log('kcuf_u authorization---:',authorization)

    let setAuth=(tokenKey='authorization')=>{
        if(authorization){
            c.AUTO_LOGIN.headers[tokenKey]=authorization
            // localStorage.setItem('authorization',authorization)
            // sessionStorage.setItem('authorization',authorization)
        }
    }

    if(JZY.IS_CC){
        setAuth()
        console.log('query--:',to)
        if(!authorization){
            window.parent.JCC.p.webIframe401(JZY.store.state.route.path)
        }else{


            if(JZY.s.getPathName().trim()=='/'){
                JZY.s.gotoWEBOA(to)
                return false
            }

            try{
                window.parent.JCC.p.webIframeBeforeRouteChange(to,from)
            }catch(e){}
            // JZY.s.loginWithoutToken=loginWithoutToken
            await loginWithoutToken(to)
            // sessionStorage.setItem('authorization',JZY.c.AUTO_LOGIN.headers.authorization)
            // localStorage.setItem('authorization',JZY.c.AUTO_LOGIN.headers.authorization)
            JZY.s.routerFrom=from
            next()
        }
        return false
    }

    if(process.env.FOR_BOSS==1){
        setAuth('accessToken')
        console.log('query--:',to)
        if(!authorization){
            JZY.u.errorMsg('用户身份过期，请重新登录')
            // next()
            return false
        }
        console.log('kcuf_u to---:',to)

        let tokenType=(''+(to.query.tokenType||'')).trim()||sessionStorage.getItem('tokenType')

        if(!tokenType){
            JZY.u.errorMsg('没有传递tokenType')
            // next()
            return false
        }

        // else{
            c.AUTO_LOGIN.headers.tokenType=tokenType

        sessionStorage.setItem('tokenType',tokenType)
        sessionStorage.setItem('authorization',authorization)

        // }

        // if(!authorization){
        //     BOSS_IFRAME_401(JZY.store.state.route.path)
        // }else{
            // try{
            //     window.parent.JCC.p.webIframeBeforeRouteChange(to,from)
            // }catch(e){}
            // JZY.s.loginWithoutToken=loginWithoutToken
            //await loginWithoutToken(to)
            // sessionStorage.setItem('authorization',JZY.c.AUTO_LOGIN.headers.authorization)
            // localStorage.setItem('authorization',JZY.c.AUTO_LOGIN.headers.authorization)
            // authAdapterForBoss()


        JZY.xhr.r({
            type:'post',
            url:'/disk/thirdController/getLoginUser'
        })
            .then(([res])=>{


                let map={
                    userInfo:{
                        directoryManageEnable:res.directoryManageEnable
                    },
                    tenantInfo:{
                        userId:res.userIdOA,
                        userName:res.userNameOA||'未命名用户',
                        jobs:[]
                        // roleMenus:[]
                    }
                }

                JZY.store.commit('UPDATE_USERINFO',map)

                console.log('getLoginUser res--:',res)


                if(c.xhrSetting.HOST['GLOBAL.COMPONENTS.WANG_TAO'].includes('/sys')){
                    c.xhrSetting.HOST['GLOBAL.COMPONENTS.WANG_TAO']=c.xhrSetting.HOST['GLOBAL.COMPONENTS.WANG_TAO'].split('/sys')[0]+'/disk'
                }
                c.xhrSetting.HOST['GLOBAL.COMPONENTS.WANG_TAO']='http://192.168.3.53:9099/disk'
                JZY.s.routerFrom=from
                next()
            })



        // let userInfo={"sysTime":"2018-06-15T01:53:27.746Z","userIdIM":"0b3d156524b1438288ad005dc10479bd","userInfo":{"delflag":0,"name":"18701031737","hxPassword":"4297f44b13955235245b2497399d7a93","mobile":"18701031737","sex":1,"state":1,"resourceImgUrl":"","userIdIM":"0b3d156524b1438288ad005dc10479bd","tendList":[{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend150","userId":null,"defaultFlag":1,"outerLinkman":0,"mobile":"18701031737","tendName":"杜大爷额度企业","createDate":"2018-06-01 17:03:13","updateDate":"2018-06-01 17:03:13","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":null,"workStatus":null,"sid":"100273"},{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend129","userId":null,"defaultFlag":0,"outerLinkman":0,"mobile":"18701031737","tendName":"pc牛逼团队","createDate":"2018-06-07 09:34:35","updateDate":"2018-06-07 09:34:35","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":0,"workStatus":null,"sid":"100350"},{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend115","userId":null,"defaultFlag":0,"outerLinkman":0,"mobile":"18701031737","tendName":"chc公司债券","createDate":"2018-06-01 17:10:26","updateDate":"2018-06-01 17:10:26","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":null,"workStatus":null,"sid":"100274"}],"defaultTendId":"hio_tend150","currentTenantInfo":{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend129","userId":null,"defaultFlag":0,"outerLinkman":0,"mobile":"18701031737","tendName":"pc牛逼团队","createDate":"2018-06-07 09:34:35","updateDate":"2018-06-07 09:34:35","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":0,"workStatus":null,"sid":"100350"}},"defaultTenat":{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend150","userId":null,"defaultFlag":1,"outerLinkman":0,"mobile":"18701031737","tendName":"杜大爷额度企业","createDate":"2018-06-01 17:03:13","updateDate":"2018-06-01 17:03:13","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","concurrencyVersion":null,"delflag":null,"workStatus":null,"sid":"100273"},"name":"杜百兴","sid":"100676","parentRealityId":"1001","dept":"pc牛逼团队","role":"232、系统管理员、普通职员","tenantInfo":{"userId":"100676","userType":"1","userName":"杜百兴","userMobile":"18701031737","userEmail":"","workStatus":"job","sex":"1","isSuper":"1","jobs":[{"organizationId":"1001","postName":null,"isDefault":"true","organizationName":"pc牛逼团队","userPositionId":"100713"}],"roleNames":"232、系统管理员、普通职员","roleMenus":[],"logo":"http://hio-cc-test.oss-cn-beijing.aliyuncs.com/1527759672574592358"},"defaultJob":{"organizationId":"1001","postName":null,"isDefault":"true","organizationName":"pc牛逼团队","userPositionId":"100713"}}
        // let authorization='Bearer 288577fc-1893-4710-95e2-000e2050d01e'
        //
        // localStorage.setItem('authorization',authorization)
        // localStorage.setItem('userInfo',JSON.stringify(userInfo))
        //
        // c.AUTO_LOGIN.headers.authorization=authorization
        //
        // next()
        // }
        return false
    }


    // let authorization=localStorage.getItem('authorization')





    // alert('shit')
    // alert(to.fullPath.startsWith('/login'))


    // JZY.router.push({ path: '/login', query: { userId: 123,a:1 }})

    if(!to.fullPath.startsWith('/login')){
        setAuth()
        if(!authorization ){
            // JZY.u.infoMsg('请登录后再进入该页面')
        // if(!authorization && (!c.AUTO_LOGIN.headers.authorization) ){
            JZY.s.routerFrom=from
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
            isRoleInfoLoading=false;
        }else{
            // c.AUTO_LOGIN.headers.authorization=authorization
            //判断是否具有跳转模块的权限
            try{
                JZY.s.showLoading()
                await loadingRoleInfo(to);
                // JZY.s.hideLoading()
                // if(JZY.store.state.session.tenantInfo.isSuper!="1"){
                    let currentUrl="/"+to.fullPath.split('/')[1]||'';
                    currentUrl=currentUrl.split('?')[0]||'';
                    if(currentUrl=="/" || currentUrl=="/demo" || currentUrl=="/phoneList" || currentUrl=="/flowClient" || currentUrl=="/personalNetDisk" || currentUrl=="/setFlowClient") {
                        //放过首页
                        JZY.s.routerFrom=from
                        next();
                    }else if(JZY.store.state.session.tenantInfo.isSuper=="1" && currentUrl.startsWith('/system')){
                        JZY.s.routerFrom=from
                        next();
                    }else {
                        //前后端用的名字有不一样的部分做个对照
                        let mapList={
                            '/approve':"/flow",
                            '/netDisk':"/disk",
                            '/email':"/mail",
                        }
                        let queryKeyUrl=mapList[currentUrl] || currentUrl;
                        let filterUrl=JZY.store.state.session.tenantInfo.roleMenus.filter(item=>{
                            return item.url.indexOf(queryKeyUrl)!=-1
                        })
                        if(filterUrl.length>0){
                            JZY.s.routerFrom=from
                            next();
                        }else{
                            JZY.u.errorMsg("您无权访问该模块请联系系统管理员");
                            JZY.s.routerFrom=from
                            next('/');  //无权限去首页
                        }
                    }
                // }else{
                //     //系统管理员直接过
                //     next()
                // }
            }catch (e){
                isRoleInfoLoading=false;
                JZY.s.routerFrom=from
                next()
            }
        }
    }else{
        //登录页
        next()
    }




    // alert(document.cookie)

    // if(!('authorization' in JZY.c.JZY.c.AUTO_LOGIN.headers)){
    //     alert("hello")
    // }

    // next()
})

// router.afterEach(route => {
// })

export default router
