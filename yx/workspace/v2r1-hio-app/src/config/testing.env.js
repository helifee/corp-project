
import util from '@util'
import base,{mergelocalConfig} from './base.env'



import localConfig from './local.env.js'


/*

测试环境王东宇账号密码已修改：
账号：15011228165
密码：111111qq

 */

/*
卢金莲的测试环境能直接登陆的不用加skip_md5的：（所有通过测试客户端注册的账号都不用加skip_md5；开发环境也类似）
13718671574
111111lu

Bearer 82f4d538-9ca6-43d8-889e-ec77c1bf9fc0

16311111111

12qwaszx

 */






let IP='http://192.168.3.157:9999/platform-app'


export default mergelocalConfig(localConfig,util.deepExtend(base,{
    AUTO_LOGIN:{
        headers:{
            // 'authorization':'Bearer 19c0d378-ccd5-4f1b-acdb-bfa170103164',
            // 'authorization':'Bearer bff17a93-8e6f-4fdf-8e07-5850595c759c'
            // 'authorization':'Bearer 5fe84c72-ad3c-405b-9bd8-15e03c123190',
            // 'authorization':'Bearer e51d65e1-c3cf-45ab-944d-dfff30714b4b',
            // 'authorization':'Bearer 5fe84c72-ad3c-405b-9bd8-15e03c123190'
            // 'authorization':'bearer abaa90de-aeec-4999-905e-d3ee3016707d'
        }
    },
    WEB_OA_ORIGIN:'http://192.168.3.157',
    xhrSetting:{
        HOST:{
            'GLOBAL.HR':IP+'/hr',
            'GLOBAL':IP,
            'GLOBAL.MA_CHANG_XI':{url:IP+'/oa',proxy:false},
            // 'GLOBAL.GATEWAY.LV_JIE':{url:'http://192.168.3.157:9999/platform-app/oa',proxy:true},

        },
    }
}))
