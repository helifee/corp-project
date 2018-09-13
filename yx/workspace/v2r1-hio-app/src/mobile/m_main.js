

import Vue from 'vue'
import App from './m_app'

import store from '@/vuex/store.js'
import { sync } from 'vuex-router-sync'

import router from '@mobile/m_router.js'
// import './static/selectMobile/select.js'
// import './static/selectMobile/select.css'
// import xhrWrapper from '@/services/xhrWrapper.core.js'


import '@/filters/filters.js'

import locale from '@/locale/locale.js'

import r  from '@/utils/xhr.js'




import s from '@mobile/m_service.js'
import u from '@/utils/util.js'


!s.getModuleName && (s.getModuleName=()=>s.getPathName().substring(1).split('/')[0])
s.logout=()=>{
    console.log("i will logout")
}



import c from '@config'

let DEBUG_MODE=process.env.NODE_ENV=='dev',
    PROD_MODE=process.env.NODE_ENV=='prodduction'


const IS_MOBILE=process.env.MOBILE==1

console.log('IS_MOBILE--P:',IS_MOBILE)


let JZY_PLUGIN_SERVICE=(function(){

        let bxTransferData={

        }



        // router.afterEach(() => {
        //     JZY_FUN.CURRENT_VM=router.getMatchedComponents()
        // })


        return {
            setCurrentVM(){
                if(!PROD_MODE){
                    JZY_FUN.CURRENT_VM=this
                }

            },
            // getBxTransferData(key){
            //     return   bxTransferData[key]
            // },
            // setBxTransferData(key,value){
            //     bxTransferData[key]=value
            // },
            // setDebugData(key,value){
            //     if(JZY_FUN.DEBUG_MODE){
            //         JZY_FUN.DEBUG_DATA[key]=value
            //     }
            // },
            // getParentVMByTag(tagName){
            //     tagName=tagName.trim().split('-').join('').toLowerCase()
            //
            //     var obj=this,hasVM=false
            //     while(obj.$parent){
            //
            //         var targetTagName=obj.$vnode.tag.trim().toLowerCase().split('-').reverse()[0].toLowerCase()
            //         console.log('target tag and tag name:',targetTagName,tagName,targetTagName===tagName)
            //
            //         if(targetTagName===tagName){
            //             hasVM=true
            //             break
            //         }
            //         obj=obj.$parent
            //     }
            //     var returnVal=hasVM?obj:null
            //     console.log('returnVal--:',returnVal)
            //     return returnVal
            // }
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
        // LOG_MODE:process.env.BX==1,
        NODE_ENV:process.env.NODE_ENV,
        // IS_CC:process.env.CC==1,




        DEBUG_MODE:DEBUG_MODE,
        // MOCK_MODE:process.env.NODE_ENV.indexOf('production')===-1,
        s:s,
        xhr:s.xhrWrapperCore,
        locale:locale,
        IS_MOBILE:IS_MOBILE,
        u:u,
        r:r,
        store:store,
        // lan:lan,
        // r:r,
        router:router,
        Vue:Vue,
        DEBUG_DATA:{


        },

        c:c,
        // Vue:Vue
    }
for(var i in JZY_FUN_STATIC_PROPS){
    JZY_FUN[i]=JZY_FUN_STATIC_PROPS[i]
}
Vue.prototype.JZY=JZY_FUN
Vue.prototype.l=locale.$t
Vue.prototype.$t=locale.$t

// window.Vue=Vue
console.log('JZY:',Vue.prototype.JZY)


// if(typeof(window)!=='undefined'&&process.env.NODE_ENV!=='production'){
window.JZY=Vue.prototype.JZY
window.l=Vue.prototype.l


// }

import {Alert, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'

Vue.use(Alert, {
    title: ' ',  // 默认无标题
    btn: {
        text: '',
        style: {
            'backgroun-color': 'red',
            'font-size': '20px',
            'color': 'blue'
        }
    },
    duration: '1500'
})
Vue.use(Confirm, {
    title: ' ', // 默认无标题
    yes: {
        text: '确定',
        style: {}
    },
    no: {
        text: '取消',
        style: {}
    }
})
Vue.use(Toast, {
    position: 'bottom',
    duration: '1500'
})



//全局图标icon的svg解决方案
import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);

import FastClick from 'fastclick'
FastClick.attach(document.body);


import './m_ui_components.js'

/***样式配置***/
// import '@/asserts/styles/index.scss'



new Vue({
    el: '#app',
     store,
    router,
    template: '<App/>',
    components: { App
    }
})
