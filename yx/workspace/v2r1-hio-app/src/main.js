// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import 'babel-polyfill'

import Vue from 'vue'
// import App from '@/containers/AppContainer.vue'
import App from '@APP_VUE'
// import App from './App.vue'
import store from '@/vuex/store.js'

import { sync } from 'vuex-router-sync'
// import router from './router'

import router from '@/router/router.js'

import routes from '@routes'
import xhrWrapper from '@/services/xhrWrapper.js'
Vue.prototype.$ELEMENT = {
        size: '',
       zIndex: 3100
  };
// import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// import axios from 'axios'
//
// Vue.prototype.$http = axios
// Vue.use(Element)





import '@/directives/directives.js'
import '@/filters/filters.js'
// import '@/plugins/plugins.js'


// import modulePage from '@/components/modulePage.vue'
// Vue.component('jzy-page',modulePage)

// import fullCalendar from '@/components/fullCalendar'
// Vue.component('jzy-full-calendar',fullCalendar)



import locale from '@/locale/locale.js'
import r  from '@/utils/xhr.js'




import s from '@/services/service.js'
import u from '@/utils/util.js'
import c from '@config'






let DEBUG_MODE=process.env.NODE_ENV=='dev',
    REMOTE_MODE=process.env.REMOTE==1,
    APP_ENV=process.env.APP_ENV||'dev',
    PROD_MODE=process.env.NODE_ENV=='prodduction'
var isMobile=process.env.MOBILE==1
if(APP_ENV=='undefined'){
    APP_ENV='dev'
}



console.log('DEBUG_MODE  in main---:',DEBUG_MODE)


let JZY_PLUGIN_SERVICE=(function(){

    let bxTransferData={

    }



    // router.afterEach(() => {
    //     JZY_FUN.CURRENT_VM=router.getMatchedComponents()
    // })


    return {
      setCurrentVM(key){
        if(!PROD_MODE){

          if(!JZY_FUN.VM){
              JZY_FUN.VM={}
          }

            JZY_FUN.VM[key||JZY.s.getPathName().substring(1).split('/')[0]]=this
        }

      },
      getBxTransferData(key){
        return   bxTransferData[key]
      },
      setBxTransferData(key,value){
        bxTransferData[key]=value
      },
      setDebugData(key,value){
        if(JZY_FUN.DEBUG_MODE){
          JZY_FUN.DEBUG_DATA[key]=value
        }
      },
      getParentVMByTag(tagName){
        tagName=tagName.trim().split('-').join('').toLowerCase()

        var obj=this,hasVM=false
        while(obj.$parent){

          var targetTagName=obj.$vnode.tag.trim().toLowerCase().split('-').reverse()[0].toLowerCase()
          console.log('target tag and tag name:',targetTagName,tagName,targetTagName===tagName)

          if(targetTagName===tagName){
            hasVM=true
            break
          }
          obj=obj.$parent
        }
        var returnVal=hasVM?obj:null
        console.log('returnVal--:',returnVal)
        return returnVal
      }
    }
  })()

    // console.log("cc---:",process.env.CC)


    // console.log('process.env.NODE_ENV---:',process.env.NODE_ENV)

;let JZY_FUN=function(){
    var command=arguments[0],argArr=[].slice.call(arguments,0)
    if(!(command in JZY_PLUGIN_SERVICE)){
      throw ('调用一个不存在的bx plugin service')
    }

    return JZY_PLUGIN_SERVICE[command].apply(this,argArr.slice(1))

  },
  JZY_FUN_STATIC_PROPS={
  RELOAD_WHEN_ERROR:false,
  LOG_MODE:process.env.BX==1,
      NODE_ENV:process.env.NODE_ENV,
      IS_CC:process.env.CC==1,
      IS_BOSS:process.env.FOR_BOSS==1,
      iframeOnLoad(){
        let myAlert=window.alert,
            frameWindow=jQuery("iframe")[0].contentWindow
          frameWindow.alert=function(str){
            if(arguments.length==1){
                JZY.u.warningMsg(str)
            }else{
                myAlert.apply(frameWindow,Array.from(arguments))
            }
            // console.log('iframe alert:',str)
          }
      },
      REMOTE_MODE:REMOTE_MODE,
    DEBUG_MODE:DEBUG_MODE,
      PROD_MODE:PROD_MODE,
    // MOCK_MODE:process.env.NODE_ENV.indexOf('production')===-1,
    s:s,
      xhr:xhrWrapper,
    locale:locale,
    u:u,
      NODE_ENV:process.env.NODE_ENV,
      APP_ENV:APP_ENV,
      IS_MOBILE:isMobile,
      IS_WEB:!isMobile && process.env.CC!=1 && process.env.FOR_BOSS!=1,
      r:r,
    store:store,
    // lan:lan,
    // r:r,
    router:router,
      routes:routes,
    Vue:Vue,
    DEBUG_DATA:{


    },

    c:c,
    setIframeHeight(iframe) {
        if (iframe) {
            var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            if (iframeWin.document.body) {
                iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
            }
        }
    }
    // Vue:Vue
  }
for(var i in JZY_FUN_STATIC_PROPS){
  JZY_FUN[i]=JZY_FUN_STATIC_PROPS[i]
}
Vue.prototype.JZY=JZY_FUN
Vue.prototype.l=locale.$t


sync(store, router)

// window.Vue=Vue

// if(typeof(window)!=='undefined'&&process.env.NODE_ENV!=='production'){
window.JZY=Vue.prototype.JZY
window.l=Vue.prototype.l


// }


locale.add('groupTreeLocale',require('@/components/groupTree/groupTree.locale'))

import './UIComponents'

/***样式配置***/
// import '@/asserts/styles/index.scss'




import mixin from './globalMixin'
Vue.mixin(mixin)


new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App
  }
})
