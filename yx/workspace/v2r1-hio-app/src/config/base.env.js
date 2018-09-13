import xhrSetting from './xhrSetting.js'
import util from '@util'

// console.log('kcuf_u xhr settingsss:',JSON.stringify(xhrSetting))



export const mergelocalConfig =function(devConfig,targetConfig){




    let devXhrSetting=devConfig.xhrSetting,
        devHostMap=devXhrSetting.HOST,
        devModuleHostMap=devXhrSetting.MODULE_HOST_MAP,

        targetXhrSetting=targetConfig.xhrSetting,
        targetHostMap=targetXhrSetting.HOST


    targetXhrSetting.MODULE_HOST_MAP=devModuleHostMap

    for(var i in devHostMap){
        let url=(typeof(devHostMap[i])=='object'?devHostMap[i].url:devHostMap[i]).split('platform-app')[1]||''

        // console.log('i and url:',i,url)

        if(url){
            targetHostMap[i]=targetHostMap.GLOBAL+url
        }


    }


    if(process.env.PREVENT_MOCK==1){
        delete targetConfig.AUTO_LOGIN.headers.authorization
        delete targetConfig.AUTO_LOGIN.username
        delete targetConfig.AUTO_LOGIN.password
    }


    return targetConfig
}


let baseConfig=util.deepExtend({

    //是否采用mock的假数据
    mockData:false,
    // 菜单的读取是否走后端请求
    // funcMenu: false,
    // // 是否开启权限：用户的按钮权限校验,路由跳转控制,如果开启权限，那么就必须从登录界面进入
    // permission: false,
    // // 是否引入axios启自定义请求头
    // customHttpHeader: true,
    // Vue的history模式
    historyMode: 'hash',
    // imgPath:'http://10.17.4.16/pc/images/hio',
    staticPath:'/static',
    mStaticPath:'/mobilestatic',
    imgPath:'/static/images',
    m_imgPath:'/mobilestatic/images',
    // uploadPath:'http://10.17.8.207:9090/sys/user/excel/preview',
    //分页默认每页文件数量
    pageCount:10,
    // uploadPath:'http://10.17.4.29:9099/attachment/univ/attachment/attachmentTemp/upload',
    // uploadPath:'http://192.168.3.57:8084/uploads',
    // uploadPath:'http://192.168.3.57:8084/upload',
    // proxyEnabled: true


    // host:'http://localhost'


},{
    xhrSetting:xhrSetting,
    WEB_OA_ORIGIN:'http://localhost:8084',
    localeDeps:{
        'netDisk':['schedule'],
        'project':['netDisk','schedule'],
        'personalNetDisk':['netDisk','schedule']
    },
    IFRAME_URL_MAP:{
        //'/hr':'/hr/index/index.html',
        '/hr':'/hr/hr-index.html',
        '/hr/zzrs':'/hr/org/org_list.html',
        '/hr/qddd':'/hr/kq/kq_summary_accounts.html',
        '/hr/njgl':'/hr/kq/kq_annual_list.html',
        '/hr/qjxx':'/hr/kq/kq_rest_list.html',
        '/hr/ccgl':'/hr/kq/kq_buss_trip_list.html',
        '/hr/ccgc':'/hr/kq/kq_local_city_trip.html',
        '/hr/wdk':'/hr/kq/kq_noPunchCard_list.html',
        '/hr/px':'/hr/ojt/ojt_subject.html',
        '/hr/sbgjjjs':'/hr/si/si_initial_period/si_initial_period.html',
        '/hr/xzjs':'/hr/wage/wage_pay_period.html',
        '/hr/wdxx':'/hr/self/self_perInfo.html',
        '/hr/wdkq':'/hr/kq/kq_myKq.html',
        '/hr/wdgz':'/hr/self/self_salary.html',
        '/hr/kck':'/hr/self/sys_serial_number_list.html',
        '/hr/tdxx':'/hr/self/team_info.html',
        // '/hr/tdkqq':'/hr/self/team_kq.html',
        '/hr/tdkq':'/hr/self/team_kq_dynamic_data.html',
        '/hr/tdxc':'/hr/self/team_xc.html',
        '/hr/zbgl':'/hr/sys/sys_info_set.html',
        '/hr/dmgl':'/hr/sys/sys_code_set.html',
        '/hr/csgl':'/hr/sys/sys_parameter.html',
        '/hr/cssz':'/hr/sys/sys_serial_number_list.html',
        '/hr/cqsz':'/hr/kq/kq_setting_basic.html',

        '/hr/auth':'/hr/auth/auth_role_list.html',
        '/email': '/emailbox/index.html'
    }
})

// console.log('kcuf_u base config1--:',JSON.stringify(baseConfig))



/*
* 本机开发环境配置
* */
export default baseConfig
