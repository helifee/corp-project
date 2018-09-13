
import util from '@util'
import base from './base.env'




/*
 var token='d4760f9a-8366-4524-b20c-b59494252919';
 JZY.c.AUTO_LOGIN.headers.authorization;
 localStorage.setItem('authentication',token)
 */



let config=util.deepExtend(util.copy(base),{
    NODE_ENV:'dev',
    mockData:true,
    AUTO_LOGIN:{
        // username:'18046585255',
        // password:'1111',
        username:'15210438101',
        password:'987654',
        // username:'18553419985',
        // password:'111111',
        // 15011228165
        // 111111
        headers:{
            // 'authorization':'Bearer 2e4b5fbf-df51-4277-b941-7816f8eddba3',
            // 'authorization':'Bearer bff17a93-8e6f-4fdf-8e07-5850595c759c',
            // 'authorization':'Bearer e51d65e1-c3cf-45ab-944d-dfff30714b4b',
            // 'authorization':'d4760f9a-8366-4524-b20c-b59494252919',
            // 'authorization':'Bearer 19c0d378-ccd5-4f1b-acdb-bfa170103164', //许国平
            // 'authorization':'Bearer bff17a93-8e6f-4fdf-8e07-5850595c759c',//王东宇
            // 'authorization':'bearer fd84891e-b333-4ce6-bf93-a68a501b9ff7'
            // 'authorization':'Bearer 5fe84c72-ad3c-405b-9bd8-15e03c123190',
            // 'authorization':'bearer af7b5d55-06e9-4d0e-baed-0346018777a0'
        }
    },
    xhrSetting:{
        //开发阶段可能各种后端各种本地机器，都在这里配置，并统一加上proxy:true
        HOST:{
            'GLOBAL.HR':'http://localhost:9999/platform-app/hr',
            'GLOBAL':'http://192.168.3.52:9999/platform-app',
            'GLOBAL.EMAIL':'http://10.17.4.6/api',
            'GLOBAL.OA':'http://192.168.3.52:9999/platform-app/oa',
            'GLOBAL.WANG_TAO':{url:'http://10.17.8.240:9999/platform-app',proxy:true},
            'GLOBAL.CUI_PENG':{url:'http://10.17.9.40:9999/platform-app',proxy:false},
            'GLOBAL.LOGIN':{url:'http://192.168.3.52:9999/platform-app',proxy:false},
            // 'GLOBAL.LOGIN':{url:'http://10.17.4.22:9999/platform-app',proxy:false},
            'GLOBAL.LV_JIE':{url:'http://10.17.4.22:9098',proxy:true},
            'GLOBAL.YI_FEI_HU':{url:'http://10.17.4.29:9098',proxy:true},
            'GLOBAL.GATEWAY.YI_FEI_HU':{url:'http://10.17.4.29:9999/platform-app',proxy:false},
            'GLOBAL.ZHANG_YAN_HONG':{url:'http://10.17.4.15:9098',proxy:true},
            // 'GLOBAL.GATEWAY.LV_JIE':{url:'http://10.17.4.22:9999/platform-app',proxy:false},
            'GLOBAL.GATEWAY.LV_JIE':{url:'http://192.168.3.52:9999/platform-app',proxy:false},//项目
            'GLOBAL.TEST.WANG_TAO':{url:'http://192.168.3.52:9090',proxy:true},
            // 'GLOBAL.SHANG_BIN':{url:'http://10.17.9.3:9999/platform-app/oa',proxy:true},//办公用品
            'GLOBAL.SHANG_BIN':{url:'http://10.17.8.62:9999/platform-app/oa',proxy:true},//办公用品
            // 'GLOBAL.SHANG_BIN':{url:'http://192.168.3.52:9999/platform-app/oa',proxy:false},
            // 'GLOBAL.YANG_NING':{url:'http://10.17.9.0:9999/platform-app/oa',proxy:true},//项目
            'GLOBAL.YANG_NING':{url:'http://192.168.3.52:9999/platform-app/oa',proxy:false},//项目
            // 'GLOBAL.LI_YONG':{url:'http://10.17.4.18:9098',proxy:true},//项目
            // 'GLOBAL.YANG_NING':{url:'http://192.168.3.52:9091',proxy:true},//项目
            // // 'GLOBAL.SHANG_BIN':{url:'http://192.168.3.52:9091',proxy:true},
            // // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.184:9090/sys',proxy:true},
            // // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://192.168.3.52:9090/sys',proxy:true},
            // // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.207:9999/platform-app/sys',proxy:true},
            // // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.184:9090/sys',proxy:true},
            // // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.225:9999/platform-app/sys',proxy:true},

            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://192.168.3.52:9999/platform-app/sys',proxy:false},

            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.3.52:9999/platform-app/sys',proxy:false},
            'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://192.168.3.52:9999/platform-app/sys',proxy:false},
            // 'GLOBAL.SHANG_BIN':{url:'http://192.168.3.52:9091',proxy:true},
            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.184:9090/sys',proxy:true},
            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://192.168.3.52:9090/sys',proxy:true},
            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.207:9999/platform-app/sys',proxy:true},
            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.184:9090/sys',proxy:true},
            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.225:9999/platform-app/sys',proxy:true},
            // 'GLOBAL.SHANG_BIN':{url:'http://192.168.3.52:9091',proxy:true},
            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://192.168.3.52:9090/sys',proxy:true},
            'GLOBAL.LOCALHOST.WANG_DONG_YU':{url:'http://192.168.3.52:9999/platform-app/oa',proxy:false},
            'GLOBAL.LOCALHOST':{url:'http://localhost:8084/mock',proxy:false},

            // 'GLOBAL.ZHANG_CHAOYANG':{url:'http://10.17.8.247:9999/platform-app/flow',proxy:false},
            'GLOBAL.ZHANG_CHAOYANG':{url:'http://127.0.0.1:9999/platform-app/flow',proxy:false},
            // 'GLOBAL.ZHANG_CHAOYANG':{url:'http://10.17.8.215:9696',proxy:true},
            // 'GLOBAL.ZHANG_CHAOYANG':{url:'http://10.17.8.242:9696',proxy:true},
            // 'GLOBAL.APPROVE_API':{url:'http://192.168.3.56:10000',proxy:true},
            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.207:9999/platform-app/sys',proxy:true},
            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.184:9090/sys',proxy:true},
            // 'GLOBAL.COMPONENTS.WANG_TAO':{url:'http://10.17.8.225:9999/platform-app/sys',proxy:true},
            // 'GLOBAL.ZHANG_CHAOYANG':{url:'http://192.168.3.52:9696',proxy:true},
            // 'GLOBAL.WANG_DONG_YU':{url:'http://192.168.3.52:9999/platform-app/oa',proxy:false},
            'GLOBAL.WANG_DONG_YU':{url:'http://192.168.3.52:9999/platform-app/oa',proxy:false},
            'GLOBAL.XU_SHENG_DONG':{url:'http://10.17.4.23:9095',proxy:true},
            'GLOBAL.PLATFORM':{url:'http://10.17.8.207:9999/platform/',proxy:true},
            // 'GLOBAL.MA_CHANG_XI':{url:'http://10.17.8.206:9092',proxy:true},
            'GLOBAL.MA_CHANG_XI':{url:'http://192.168.3.52:9999/platform-app/oa',proxy:false},
            'GLOBAL.FLOWCLIENT':{url:'http://10.17.8.236:9696',proxy:true},
            'GLOBAL.XSD':{url:'http://10.17.4.23:9095',proxy:true}
            // 'GLOBAL.XSD':{url:'http://10.17.8.236:9095',proxy:true}
            // 'GLOBAL.MA_CHANG_XI':{url:'http://10.17.9.3:9999/platform-app/oa/',proxy:true},
            // 'GLOBAL.MA_CHANG_XI':{url:'http://192.168.3.52:9999/platform-app/oa',proxy:false},
        },
        //模块名称优先使用的host配置
        MODULE_HOST_MAP:{
            '/system':'GLOBAL',
            '/office':'GLOBAL.SHANG_BIN',
            '/schedule':'GLOBAL.WANG_DONG_YU',
            '/approve':'GLOBAL.ZHANG_CHAOYANG',
            '/setFlowClient':'GLOBAL.ZHANG_CHAOYANG',
            '/project':'GLOBAL.YANG_NING',
            '/login':'GLOBAL.LOGIN',
            '/netDisk':'GLOBAL.GATEWAY.LV_JIE',
            '/personalNetDisk':'GLOBAL.GATEWAY.YI_FEI_HU',
            '/meeting':'GLOBAL.OA',
            '/task':'GLOBAL.LOCALHOST.WANG_DONG_YU',
            // '/journal':'GLOBAL.SHANG_BIN',
            '/journal':'GLOBAL.MA_CHANG_XI',
            '/plan':'GLOBAL.MA_CHANG_XI',
            // '/plan':'GLOBAL.SHANG_BIN',
            '/crm':'GLOBAL.XU_SHENG_DONG',
            '/news':'GLOBAL.MA_CHANG_XI',
            // '/news':'GLOBAL.SHANG_BIN',
            '/contract':'GLOBAL.OA',
            '/ehr':'GLOBAL.HR',
        }

    }
    // ,
    // IFRAME_HOST:{
    //     //EHR:'http://192.168.3.74:8080',
    // EHR:'http://localhost:8084',
    //
    //     // /platform-app/hr/hr-index.html
    //
    // }
});
export default config
