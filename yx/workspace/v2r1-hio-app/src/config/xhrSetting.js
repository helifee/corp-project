let env=process.env.NODE_ENV

let baseUrl='/'

export default {
    // 是否开启错误警告
    REPORT_INTERFACE_ERROR:true,
    retryCountWhenError:process.env.BX==1?1:1,//xhr错误自动重试次数
    TOKEN_CONFIG:{
        key:'authorization',
        excludes:[
            {
                module:'login',
                urlPrefix:'platform',
                urlPaths:'register smscode validateCode login repetitionMobile checkSmsCode validateCode/get'.split(' ')
            }
        ]
    },
    HOST:{
        // 'GLOBAL':'http://192.168.3.157:9999/platform-app',
        // GLOBAL:{url:'http://10.17.4.23:9095',proxy:true},
        'GLOBAL':'http://192.168.3.157:9999/platform-app',
        'GLOBAL.EMAIL':'http://10.17.4.6/api',
        'GLOBAL.HR':'http://192.168.3.157:9999/platform-app/hr',
        // GLOBAL:{url:'http://10.17.8.243:9696',proxy:true},
        // GLOBAL:`${baseUrl}mock`,
        GLOBAL_TEST:`${baseUrl}mockkkkkkkkkkkkkkkkkkkkkkkk`,
    },
    MODULE_HOST_MAP:{

    }
}