import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import routes from '@routes'
import config from '@config'

let m_demo = r => require.ensure([], () => r(require('@mobile/pages/m_demo/m_demo.vue')), 'm_demo')
// let m_netDisk = r => require.ensure([], () => r(require('@mobile/pages/m_netDisk/m_netDisk.vue')), 'm_netDisk')
//引入crm首页文件  用以下方式引入 否则JZY报错
//合同
let m_contract = r => require.ensure([], () => r(require('@mobile/pages/m_contract/m_conAndPay_home.vue')), 'm_contract')
let m_contract_home = r => require.ensure([], () => r(require('@mobile/pages/m_contract/m_contract_home.vue')), 'm_contract_home')
let m_conMonth = r => require.ensure([], () => r(require('@mobile/pages/m_contract/m_conMonth.vue')), 'm_conMonth')
let m_conYear = r => require.ensure([], () => r(require('@mobile/pages/m_contract/m_conYear.vue')), 'm_conYear')
let m_changeContract_add = r => require.ensure([], () => r(require('@mobile/components/m_contract/m_contract_add.vue')), 'm_changeContract_add')


let m_contract_detail = r => require.ensure([], () => r(require('@mobile/pages/m_contract/m_contract_detail.vue')), 'm_contract_detail')
let m_pay_home = r => require.ensure([], () => r(require('@mobile/pages/m_contract/m_pay_home.vue')), 'm_pay_home')

let m_pay_detail = r => require.ensure([], () => r(require('@mobile/pages/m_contract/m_pay_detail.vue')), 'm_pay_detail')
let m_ctrc_change_detail = r => require.ensure([], () => r(require('@mobile/pages/m_contract/m_ctrc_change_detail.vue')), 'm_ctrc_change_detail')



//任务详情
let m_task = r => require.ensure([], () => r(require('@mobile/pages/m_task/m_task.vue')), 'm_task')
let m_create_task = r => require.ensure([], () => r(require('@mobile/pages/m_task/components/m_create_task.vue')), 'm_create_task')
let m_edit_task = r => require.ensure([], () => r(require('@mobile/pages/m_task/components/m_edit_task.vue')), 'm_edit_task')
let m_details_task = r => require.ensure([], () => r(require('@mobile/pages/m_task/components/m_details_task.vue')), 'm_details_task')
let m_task_detail = r => require.ensure([], () => r(require('@mobile/pages/m_details/m_task_detail.vue')), 'm_task_detail')

let m_task_forProject = r => require.ensure([], () => r(require('@mobile/pages/m_task/m_taskForProject.vue')), 'm_task_forProject')


//测试用，xgp
let m_demo_smart = r => require.ensure([], () => r(require('@mobile/components/m_smartComment/m_demo.vue')), 'm_demo_smart')




let m_meeting_detail = r => require.ensure([], () => r(require('@mobile/pages/m_details/m_meeting_detail.vue')), 'm_meeting_detail')

let m_news_detail = r => require.ensure([], () => r(require('@mobile/pages/m_details/m_news_detail.vue')), 'm_news_detail')
//发起审批
let m_approve_start = r => require.ensure([], () => r(require('@mobile/pages/m_approve/m_approve_start.vue')), 'm_approve_start')
let m_approve_free = r => require.ensure([], () => r(require('@mobile/pages/m_approve/m_approve_free.vue')), 'm_approve_free')


let m_approve_approve = r => require.ensure([], () => r(require('@mobile/pages/m_approve/m_approve_approve.vue')), 'm_approve_approve')
let m_approve_list = r => require.ensure([], () => r(require('@mobile/pages/m_approve/m_approve_list.vue')), 'm_approve_list')
let m_approve_list_project = r => require.ensure([], () => r(require('@mobile/pages/m_approve/m_approve_list_project.vue')), 'm_approve_list_project')

let m_start_list = r => require.ensure([], () => r(require('@mobile/pages/m_approve/m_start_list.vue')), 'm_start_list')
let m_start_list_project = r => require.ensure([], () => r(require('@mobile/pages/m_approve/m_start_list_project.vue')), 'm_start_list_project')

let m_start_search = r => require.ensure([], () => r(require('@mobile/pages/m_approve/m_start_search.vue')), 'm_start_search')

let m_crm_home = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_crm_home.vue')), 'm_crm_home')
let m_customer = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_cus/m_customer.vue')), 'm_customer')
let m_linker = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_link/m_linker.vue')), 'm_linker')
let m_link_detail = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_link/m_link_detail.vue')), 'm_link_detail')
let m_cus_history = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_cus_history.vue')), 'm_cus_history')
let m_cus_plan = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_cus_plan.vue')), 'm_cus_plan')
let m_cus_dynamic = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_cus_dynamic.vue')), 'm_cus_dynamic')

let m_cus_followLog = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_cus_followLog.vue')), 'm_cus_followLog')

let m_cus_his_detail = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_cus_his_detail.vue')), 'm_cus_his_detail')
let m_add_customer = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_cus/m_add_customer.vue')), 'm_add_customer')
let m_add_link = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_link/m_add_link.vue')), 'm_add_link')
let m_cus_detail = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_cus/m_cus_detail.vue')), 'm_cus_detail')
let m_cus_plan_detail = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_cus_plan_detail.vue')), 'm_cus_plan_detail')


let m_follow_log = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_follow_log.vue')), 'm_follow_log')
let m_follow_plan = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_follow_plan.vue')), 'm_follow_plan')

//商机
let m_business = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_business/m_business.vue')), 'm_business')

//商机详情
let m_b_details = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_business/m_b_details.vue')), 'm_b_details')

let m_addBusiness = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_business/addBusiness.vue')), 'm_addBusiness')

//订单
let m_order = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_order/m_order.vue')), 'm_order')

//跟进记录 跟进计划
// let m_flowuplan = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_business/m_business_flowup.vue')), 'm_flowuplan')

//商机产品
let m_product = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_business/m_business_product.vue')), 'm_product')

//编辑添加产品
// let m_product_edit = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_business/m_business_product_edit.vue')), 'm_product_edit')
//订单详情
let m_order_details = r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_order/m_order_details.vue')), 'm_order_details')
//项目详情
let project_details =  r => require.ensure([], () => r(require('@mobile/pages/m_details/project_details.vue')), 'project_details')

// 选择人员demo
let m_selectUserDemo = r => require.ensure([], () => r(require('@mobile/components/select/demo.vue')), 'm_selectUserDemo')

//项目
let m_project = r => require.ensure([], () => r(require('@mobile/pages/m_project/m_project.vue')), 'm_project')
let m_project_edit = r => require.ensure([], () => r(require('@mobile/pages/m_project/components/m_project_edit.vue')), 'm_project_edit')
let m_project_detail = r => require.ensure([], () => r(require('@mobile/pages/m_project/m_project_detail.vue')), 'm_project_detail')
let m_project_detail_dynamic = r => require.ensure([], () => r(require('@mobile/pages/m_project/details/detail_dynamic.vue')), 'm_project_detail_dynamic')
let m_project_detail_participants = r => require.ensure([], () => r(require('@mobile/pages/m_project/details/detail_participants.vue')), 'm_project_detail_participants')

//产品详情
let product_details =  r => require.ensure([], () => r(require('@mobile/pages/m_crm/m_business/productDetail.vue')), 'product_details')

let meet_summary = r => require.ensure([], () => r(require('@mobile/pages/m_details/m_meet_summary.vue')), 'meet_summary')
// 创建路由对象
let router = new VueRouter({
    mode: config.historyMode,
    routes:[
        {path: '/', component: m_crm_home},
        {path: '/demo', component: m_demo},
        {name:"m_contract",path: '/m_contract', component: m_contract},
        {name:"m_contract_home",path: '/m_contract/m_contract_home', component: m_contract_home},
        {name:"m_conMonth",path: '/m_contract/m_conMonth', component: m_conMonth},
        {name:"m_conYear",path: '/m_contract/m_conYear', component: m_conYear},
        {name:"m_pay_home",path: '/m_contract/m_pay_home', component: m_pay_home},
        {name:"m_changeContract_add",path: '/m_changeContract_add', component: m_changeContract_add},
        {name:"m_contract_detail",path: '/m_contract_detail', component: m_contract_detail},
        {name:"m_ctrc_change_detail",path: '/m_ctrc_change_detail', component: m_ctrc_change_detail},
        {name:"m_pay_detail",path: '/m_pay_detail', component: m_pay_detail},
        {name:"m_customer",path: '/m_cus/m_customer', component: m_customer},
        {name:"m_linker",path: '/m_link/m_linker', component: m_linker},
        {name:"m_link_detail",path: '/m_link/m_link_detail', component: m_link_detail},
        {name:"m_cus_history",path: '/m_cus_history', component: m_cus_history},
        {name:"m_cus_followLog",path: '/m_cus_followLog', component: m_cus_followLog},
        {name:"m_cus_dynamic",path: '/m_cus_dynamic', component: m_cus_dynamic},
        {name:"m_cus_plan",path: '/m_cus_plan', component: m_cus_plan},
        {name:"m_follow_log",path: '/m_follow_log', component: m_follow_log},
        {name:"m_follow_plan",path: '/m_follow_plan', component: m_follow_plan},
        {name:"m_cus_his_detail",path: '/m_cus_his_detail', component: m_cus_his_detail},
        {name:"m_add_customer",path: '/m_cus/m_add_customer', component: m_add_customer},
        {name:"m_add_link",path: '/m_link/m_add_link', component: m_add_link},
        {name:"m_cus_detail",path: '/m_cus/m_cus_detail', component: m_cus_detail},
        {name:"m_cus_plan_detail",path: '/m_cus/m_cus_plan_detail', component: m_cus_plan_detail},
        {name:"m_business",path: '/m_business', component: m_business},
        {name:"m_b_details",path:"/m_b_details/:id",component:m_b_details},
        {name:"m_order",path: '/m_order', component: m_order},
        // {name:"m_flowuplan",path: '/m_flowuplan/:type', component: m_flowuplan},
        {name:"m_product",path: '/m_product', component: m_product},
        {name:"m_order_details",path: '/m_order_details/:id', component: m_order_details},
        {name:"m_addBusiness",path: '/m_business/m_addBusiness/:type', component: m_addBusiness},
        //消息代办 任务详情项目详情
        {name:"project_details",path: '/m_detail/project_deails', component: project_details},
        {name:"m_meeting_detail",path: '/m_details/m_meeting_detail', component: m_meeting_detail},
        {name:"m_news_detail",path: '/m_details/m_news_detail', component: m_news_detail},
        
        //任务模块
        {name:"m_task",path: '/m_task', component: m_task},
        {name:"m_create_task",path: '/m_task/m_create_task', component: m_create_task},
        {name:"m_edit_task",path: '/m_task/m_edit_task', component: m_edit_task},
        {name:"m_details_task",path: '/m_task/m_details_task/:id', component: m_details_task},

        {name:"m_task_detail",path: '/m_details/m_task_detail', component: m_task_detail},
        
        {name:"m_task_forProject",path: '/m_task_forProject', component: m_task_forProject},
        

        //评论组件demo
        {name:"m_demo_smart",path: '/m_smart', component: m_demo_smart},



        //发起审批
        {name:"m_start_list",path: '/m_approve/m_start_list', component: m_start_list},
        {name:"m_start_list_project",path: '/m_approve/m_start_list_project', component: m_start_list_project},
        {name:"m_start_search",path: '/m_approve/m_start_search', component: m_start_search},
        {name:"m_approve_list",path: '/m_approve/m_approve_list', component: m_approve_list},
        {name:"m_approve_start",path: '/m_approve/m_approve_start', component: m_approve_start},
        {name:"m_approve_free",path: '/m_approve/m_approve_free', component: m_approve_free},
        {name:"m_approve_approve",path: '/m_approve/m_approve_approve', component: m_approve_approve},
        {name:"m_approve_list_project",path: '/m_approve/m_approve_list_project', component: m_approve_list_project},

        {name:"m_selectUserDemo",path: '/m_selectUserDemo', component: m_selectUserDemo},

        //项目
        {name:"m_project",path: '/m_project', component: m_project},
        {name:"m_project_edit",path: '/m_project_edit/:id', component: m_project_edit},
        {name:"m_project_detail",path: '/m_project_detail', component: m_project_detail},
        {name:"m_project_detail_dynamic",path: '/m_project/detail_dynamic/:id', component: m_project_detail_dynamic},
        {name:"m_project_detail_participants",path: '/m_project/detail_participants/:id', component: m_project_detail_participants},
        //评论组件demo
        {name:"product_details",path: '/product_details/:id', component: product_details},
        // 会议纪要详情
        {name:"meet_summary",path: '/m_meet/meet_summary/:id', component: meet_summary}
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})
let hasRequestUserInfo=false
function loginWithoutToken(to){
    function getQueryString(name)
    {
        return to.query[name]
        // var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        // var r = (window.location.href.split('?')[1]||'').match(reg);
        // if(r!=null)return  unescape(r[2]); return null;
    }
    function getUrlQuery(key){
        return getQueryString(key) || sessionStorage.getItem(key) || null;
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
                try{
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



                    if(!getUrlQuery('tendId')){
                        JZY.u.errorMsg('没有传递tendId')
                        return false
                    }

                    //
                    var currentTendInfo=tendList.find((item)=>getUrlQuery('tendId')==item.tendId)||{}
                    // if(!currentTendInfo){
                    //     JZY.u.errorMsg('该用户没有该租户')
                    //     return false
                    // }
                }catch(e){
                    JZY.u.errorMsg('加载失败，该用户可能已离职')
                    return false
                }



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
                            let userInfo={
                                userInfo:res.userInfo,
                                tenantInfo:tenantInfoRes,
                            };

                            JZY.store.commit('UPDATE_USERINFO',userInfo)




                            hasRequestUserInfo=true

                            JZY.c.AUTO_LOGIN.headers.tendId=getUrlQuery('tendId')

                            sessionStorage.setItem('authorization',JZY.c.AUTO_LOGIN.headers.authorization)
                            sessionStorage.setItem('tendId',JZY.c.AUTO_LOGIN.headers.tendId)

                            resolve()
                        }catch(e){
                            console.warn('commit fail e--:',e)

                            JZY.u.errorMsg('')
                            delete JZY.c.AUTO_LOGIN.headers.authorization
                        }

                    })

            })
            .catch((e)=>{
                JZY.u.errorMsg('用户身份有误，无法进入页面')
            })
    })
}
router.beforeEach(async (to, from, next) => {

    JZY.s.checkAppVersion()
    ///crm?authorization=sdfsdfsd

    let authorization=to.query.accessToken||sessionStorage.getItem('authorization')||null


    console.log('to---:',to)
    let setAuth=()=>{
        if(authorization){
            JZY.c.AUTO_LOGIN.headers.authorization=authorization

        }
    }


    setAuth()
    if(!authorization ){
        JZY.s.logout()
    }else{
        await loginWithoutToken(to)

        next()
    }

    //next()
})



export default router
