// let demo = r => require.ensure([], () => r(require('@demo')), 'demo')
//
//
// export default [
//     {path: '/demo', component: demo}
// ]

import config from '@config'

let IFRAME_URL_MAP=config.IFRAME_URL_MAP


let home = r => require.ensure([], () => r(require('@containers/home.vue')), 'home')
let homePhoneList = r => require.ensure([], () => r(require('@Main/home/home.phoneList.vue')), 'homePhoneList')


let NotFoundContainer = r => require.ensure([], () => r(require('@containers/NotFoundContainer.vue')), '404')
// let login = r => require.ensure([], () => r(require('@Main/LoginContainer.vue')), '404')


// import demo from '@demo'

let demo = r => require.ensure([], () => r(require('@Main/demo/demo.vue')), 'demo')
let test = r => require.ensure([], () => r(require('@Main/demo/test.vue')), 'test')
let demo1 = r => require.ensure([], () => r(require('@Main/demo/demo1.vue')), 'demo1')


let login = r => require.ensure([], () => r(require('@Main/login/login.vue')), 'login')
// let signUp = r => require.ensure([], () => r(require('@Main/login/signUp.vue')), 'signUp')

//新闻
let news = r => require.ensure([], () => r(require('@Main/news/news.vue')), 'news')
let allNews = r => require.ensure([], () => r(require('@Main/news/allNews.vue')), 'allNews')
let newsDetails = r => require.ensure([], () => r(require('@Main/news/details.vue')), 'newsDetails')
let newsColumn = r => require.ensure([], () => r(require('@Main/news/column.vue')), 'newsColumn')
let newsClassification = r => require.ensure([], () => r(require('@Main/news/classification.vue')), 'newsClassification')


let crm = r => require.ensure([], () => r(require('@Main/crm/crm.vue')), 'crm')
let crmCustomer = r => require.ensure([], () => r(require('@Main/crm/customer.vue')), 'crmCustomer')
let crmBusiness = r => require.ensure([], () => r(require('@Main/crm/business.vue')), 'crmBusiness')
let crmBusinessDetails = r => require.ensure([], () => r(require('@Main/crm/business.details.vue')), 'crmBusinessDetails')
let crmContacts = r => require.ensure([], () => r(require('@Main/crm/contacts.vue')), 'crmContacts')
let crmAllrecord = r => require.ensure([], () => r(require('@Main/crm/allrecord.vue')), 'crmAllrecord')
let crmAllplan = r => require.ensure([], () => r(require('@Main/crm/allplan.vue')), 'crmAllplan')
let crmCustomerDetails = r => require.ensure([], () => r(require('@Main/crm/customer.details.vue')), 'crmCustomerDetails')
let crmOrder = r => require.ensure([], () => r(require('@Main/crm/order.vue')), 'crmOrder')
let crmSettings = r => require.ensure([], () => r(require('@Main/crm/settings.vue')), 'crmSettings')
let crmOrderDetail = r => require.ensure([], () => r(require('@Main/crm/components/order.detail.vue')), 'crmOrderDetail')
let crmContactsDetails = r => require.ensure([], () => r(require('@Main/crm/contacts.details.vue')), 'crmContactsDetails')


let task = r => require.ensure([], () => r(require('@Main/task/task.vue')), 'task')
let taskDetail = r => require.ensure([], () => r(require('@Main/task/components/task.detail.vue')), 'taskDetail')
let taskEdit = r => require.ensure([], () => r(require('@Main/task/components/task.edit.vue')), 'taskEdit')
// let taskCreate = r => require.ensure([], () => r(require('@Main/task/create.vue')), 'taskCreate')
let taskCreate = r => require.ensure([], () => r(require('@Main/task/task.vue')), 'taskCreate')
let taskOwn = r => require.ensure([], () => r(require('@Main/task/own.vue')), 'taskOwn')
let taskJoin = r => require.ensure([], () => r(require('@Main/task/join.vue')), 'taskJoin')
let taskConcern = r => require.ensure([], () => r(require('@Main/task/concern.vue')), 'taskConcern')
let taskShare = r => require.ensure([], () => r(require('@Main/task/share.vue')), 'taskShare')
let taskSet = r => require.ensure([], () => r(require('@Main/task/set.vue')), 'taskSet')



let approve = r => require.ensure([], () => r(require('@Main/approve/approve.vue')), 'approve')
let approveDetail = r => require.ensure([], () => r(require('@Main/approve/components/approve.detail.vue')), 'approveDetail')
let approveMy = r => require.ensure([], () => r(require('@Main/approve/my.vue')), 'approveMy')
let approveShared = r => require.ensure([], () => r(require('@Main/approve/shared.vue')), 'approveShared')
let approveConcern = r => require.ensure([], () => r(require('@Main/approve/concern.vue')), 'approveConcern')
let approveSetFlowDesign = r => require.ensure([], () => r(require('@Main/approve/set/flowDesign.vue')), 'approveSetFlowDesign')
let approveSetFlowManage = r => require.ensure([], () => r(require('@Main/approve/set/flowManage.vue')), 'approveSetFlowManage')
let approveEdit = r => require.ensure([], () => r(require('@Main/approve/components/approve.edit.vue')), 'approveEdit')
let approveSetCreateApprove = r => require.ensure([], () => r(require('@Main/approve/set/createApprove.vue')), 'approveSetCreateApprove')

let roleTable = r => require.ensure([], () => r(require('@COMPONENTS/userTree/demo.vue')), 'roleTable')
let smartComment = r => require.ensure([], () => r(require('@COMPONENTS/smartComment/demo.vue')), 'smartComment')
let blendTreeDemo = r => require.ensure([], () => r(require('@COMPONENTS/blendTree/demo.vue')), 'blendTreeDemo')
// let addLabel = r => require.ensure([], () => r(require('@Main/approve/components/create/addLabel.vue')), 'addLabel')
let addLabel = r => require.ensure([], () => r(require('@COMPONENTS/blendTree/blendTree.vue')), 'addLabel')



let setFlowClient = r => require.ensure([], () => r(require('@Main/approve/set/createApprove.vue')), 'setFlowClient')


//计划
let plan = r => require.ensure([], () => r(require('@Main/plan/planHome.vue')), 'plan')
let planShare = r => require.ensure([], () => r(require('@Main/plan/share.vue')), 'planShare')
let planComment = r => require.ensure([], () => r(require('@Main/plan/comment.vue')), 'planComment')


//项目
let project = r => require.ensure([], () => r(require('@Main/project/create.vue')), 'project')
let projectDetail = r => require.ensure([], () => r(require('@Main/project/details.vue')), 'projectDetail')
// let projecttest = r => require.ensure([], () => r(require('@Main/project/test.vue')), 'projecttest')
let projectDemo = r => require.ensure([], () => r(require('@Main/project/demo.vue')), 'projectDemo')
let projectParticipate = r => require.ensure([], () => r(require('@Main/project/participate.vue')), 'projectParticipate')
let projectShared = r => require.ensure([], () => r(require('@Main/project/shared.vue')), 'projectShared')
let projectFollow = r => require.ensure([], () => r(require('@Main/project/follow.vue')), 'projectFollow')
let projectCreate = r => require.ensure([], () => r(require('@Main/project/create.vue')), 'projectCreate')
let projectResponsible = r => require.ensure([], () => r(require('@Main/project/responsible.vue')), 'projectResponsible')
let projectSet = r => require.ensure([], () => r(require('@Main/project/project.vue')), 'projectSet')

//email
let email = r => require.ensure([], () => r(require('@Main/email/email.vue')), 'email')
let emailContent = r => require.ensure([], () => r(require('@Main/email/email.content.vue')), 'emailContent')
let emailSetting = r => require.ensure([], () => r(require('@Main/email/email.setting.vue')), 'emailSetting')
let emailEdit = r => require.ensure([], () => r(require('@Main/email/email.edit.vue')), 'emailEdit')
// 第三方邮箱支持
// web端
let webEmailboxList = r => require.ensure([], () => r(require('@Main/email/web/emailbox.list.vue')), 'rlMailbox')
// cc端
let ccEmailboxList = r => require.ensure([], () => r(require('@Main/email/cc/emailbox.list.vue')), 'ccEmailboxList')

//办公用品
let officeManagement1 = r => require.ensure([], () => r(require('@Main/officeSupplies/management1.vue')), 'officeManagement1')
let officeManagement = r => require.ensure([], () => r(require('@Main/officeSupplies/management.vue')), 'officeManagement')
let projectStorage = r => require.ensure([], () => r(require('@Main/officeSupplies/storage.vue')), 'projectStorage')
let storageDetail = r => require.ensure([], () => r(require('@Main/officeSupplies/components/storage/storageDetail.vue')), 'storageDetail')
let projectDelivery = r => require.ensure([], () => r(require('@Main/officeSupplies/delivery.vue')), 'projectDelivery')
let deliveryDetail = r => require.ensure([], () => r(require('@Main/officeSupplies/components/delivery/deliveryDetail.vue')), 'deliveryDetail')
let officeDetail = r => require.ensure([], () => r(require('@Main/officeSupplies/detail.vue')), 'officeDetail')
let officeEdit = r => require.ensure([], () => r(require('@Main/officeSupplies/edit.vue')), 'officeEdit')


let netDisk = r => require.ensure([], () => r(require('@Main/netDisk/netDisk.vue')), 'netDisk')
let personalNetDisk = r => require.ensure([], () => r(require('@Main/personalNetDisk/personalNetDisk.vue')), 'personalNetDisk')
let personalNetDiskMyFollow = r => require.ensure([], () => r(require('@Main/personalNetDisk/personalNetDisk.myFollow.vue')), 'personalNetDiskMyFollow')
let netDiskDirManage = r => require.ensure([], () => r(require('@Main/netDisk/netDisk.dirManage.vue')), 'netDiskDirManage')
let netDiskMyFollow = r => require.ensure([], () => r(require('@Main/netDisk/netDisk.myFollow.vue')), 'netDiskMyFollow')
let netDiskRecentlyVisit = r => require.ensure([], () => r(require('@Main/netDisk/netDisk.recentlyVisit.vue')), 'netDiskRecentlyVisit')



// 汇报 -- 日志
let journalMine = r => require.ensure([], () => r(require('@Main/journal/mine.vue')), 'journalMine')
let journalShare = r => require.ensure([], () => r(require('@Main/journal/share.vue')), 'journalShare')
let journalComment = r => require.ensure([], () => r(require('@Main/journal/comment.vue')), 'journalComment')

//会议
let meetingManagement = r => require.ensure([], () => r(require('@Main/meeting/meeting.vue')), 'meetingManagement')
let meetingCopyMe = r => require.ensure([], () => r(require('@Main/meeting/meeting.copyme.vue')), 'meetingCopyMe')
let meetingDetail = r => require.ensure([], () => r(require('@Main/meeting/meetingDetail.vue')), 'meetingDetail')
// let meetingDetailEdit = r => require.ensure([], () => r(require('@Main/meeting/meetingDetailEdit.vue')), 'meetingDetailEdit')
let meetingRoom = r => require.ensure([], () => r(require('@Main/meeting/meetingRoom.vue')), 'meetingRoom')
//系统设置(应用管理)
let sysApp = r => require.ensure([], () => r(require('@setContainers/main/application/application.vue')), 'sysApp')
// let sysAppCRM = r => require.ensure([], () => r(require('@setContainers/main/application/crm.vue')), 'sysAppCRM')
// let sysAppNetDisk = r => require.ensure([], () => r(require('@setContainers/main/application/netdisk.vue')), 'sysAppNetDisk')
// let sysAppEHR = r => require.ensure([], () => r(require('@setContainers/main/application/ehr.vue')), 'sysAppEHR')
// let sysAppLog = r => require.ensure([], () => r(require('@setContainers/main/application/log.vue')), 'sysAppLog')
// let sysAppOffice = r => require.ensure([], () => r(require('@setContainers/main/application/office.vue')), 'sysAppOffice')
//系统设置(角色权限)
let sysRoleList = r => require.ensure([], () => r(require('@setContainers/main/role/role.list.vue')), 'sysRoleList')
//系统设置(企业信息)
let sysCompany = r => require.ensure([], () => r(require('@setContainers/main/company/company.vue')), 'sysCompany')
//系统设置(组织机构)
let sysOrganization= r => require.ensure([], () => r(require('@setContainers/main/organization/organization.vue')), 'sysOrganization')
//合同
let contract = r => require.ensure([], () => r(require('@Main/contract/contract.vue')), 'contract')
let contractPaymentAll= r => require.ensure([], () => r(require('@Main/contract/contractPaymentAll.vue')), 'contractPaymentAll')
let contractDetail = r => require.ensure([], () => r(require('@Main/contract/components/contractDetail.vue')), 'contractDetail')
let contractType= r => require.ensure([], () => r(require('@Main/contract/setting/contractType.vue')), 'contractType')
let contractChangeType= r => require.ensure([], () => r(require('@Main/contract/setting/changeType.vue')), 'contractChangeType')



let IframeComponent = r => require.ensure([], () => r(require('@containers/Iframe/IframeComponent.vue')), 'IframeComponent')

let flowClient = r => require.ensure([], () => r(require('@Main/flowClient/client.vue')), 'flowClient')

// 自定义表单设计，填写，预览三合一组件
let flowForm = r => require.ensure([], () => r(require('@Main/flowForm/client.vue')), 'flowForm')
// let flowFormInstance = r => require.ensure([], () => r(require('@Main/flowForm/instance.vue')), 'flowFormInstance')
// let flowFormPreview = r => require.ensure([], () => r(require('@Main/flowForm/preview.vue')), 'flowFormPreview')



let schedule = r => require.ensure([], () => r(require('@Main/schedule/schedule.vue')), 'schedule')
// let ehr = r => require.ensure([], () => r(require('@Main/ehr/ehr.vue')), 'ehr')

let routes=[
    {path: '/', component: home},

    {path: '*', component: NotFoundContainer},

    {path: '/404', component: NotFoundContainer},

    // {path: '/login', component: login},

    {path: '/phoneList', component: homePhoneList},

    //新闻
    {path: '/news', component: news},
    {path: '/news/classification/:id', component: newsClassification},
    {path: '/news/allNews', component: allNews},
    {path: '/news/classification/:column/:id', component: newsDetails},
    {path: '/news/details/:id', component: newsDetails},
    // {path: '/news/undetails/:id', component: newsUnDetails},
    {path: '/news/column', component: newsColumn},
    // {path: '/news/notice', component: newsNotice},
    // {path: '/news/regulation', component: newsRegulation},
    // {path: '/news/editNews/:id', component: editNews},

    //crm
    {path: '/crm', component: crm},
    {path: '/crm/customer', component: crmCustomer},
    {path: '/crm/contacts', component: crmContacts},
    {path: '/crm/business', component: crmBusiness},
    {path: '/crm/business/details/:id', component: crmBusinessDetails},
    {path: '/crm/allrecord', component: crmAllrecord},
    {path: '/crm/allplan', component: crmAllplan},
    // {path: '/crm/customer/details/:id',component:crmCustomerDetails},
    {path: '/crm/customer/details',component:crmCustomerDetails},
    // {path: '/crm/contacts/details/:id',component:crmContactsDetails},
    {path: '/crm/contacts/details',component:crmContactsDetails},


    {path: '/crm/order', component: crmOrder},
    {path: '/crm/settings', component: crmSettings},
    {path: '/crm/order/detail/:id', component: crmOrderDetail},
    //审批
    {path: '/approve', component: approve},
    {path: '/approve/detail/:id', component: approveDetail},
    // {path: '/approve/edit', component: approveEdit},
    {path: '/approve/my', component: approveMy},
    {path: '/approve/shared', component: approveShared},
    {path: '/approve/concern', component: approveConcern},
    {path: '/approve/set/flowDesign', component: approveSetFlowDesign},
    {path: '/approve/set/flowManage', name:'approveSetFlowManage',component: approveSetFlowManage},
    {path: '/approve/set/createApprove/:id',name:'approveSetCreateApprove', component: approveSetCreateApprove},
    {path: '/roleTable', component: roleTable},
    {path: '/smartComment', component: smartComment},
    {path: '/blendTreeDemo', component: blendTreeDemo},
    {path: '/addLabel', component: addLabel},

    {path: '/setFlowClient/:id',name:'setFlowClient', component: setFlowClient},
    
    //任务
    {path: '/task', name:'task', component: task},
    {path: '/task/detail/:id', component: taskDetail},
    {path: '/task/create', component: taskCreate},
    {path: '/task/own', component: taskOwn},
    {path: '/task/join', component: taskJoin},
    {path: '/task/concern', component: taskConcern},
    {path: '/task/share', component: taskShare},
    {path: '/task/set', component: taskSet},
    {path: '/task/edit/:id', component: taskEdit},



    // {path: '/ehr', component: ehr},
    //计划
    {path: '/plan', component: plan},
    {path: '/plan/share', component: planShare},
    {path: '/plan/comment', component: planComment},
    //项目
    // {path: '/project', component: projectCreate},
    {path: '/project/:column/details/:id', component: projectDetail},
    {path: '/project/details/:id', component: projectDetail},
    // {path: '/project/test', component: projecttest},
    {path: '/project/demo', component: projectDemo},
    {path: '/project', component: projectCreate},
    {path: '/project/responsible', component: projectResponsible},
    {path: '/project/participate', component: projectParticipate},
    {path: '/project/shared', component: projectShared},
    {path: '/project/follow', component: projectFollow},
    {path: '/project/set', component: projectSet},
    //email
    // { path: '/email',
    //     component: email,
    //     children:[
    //         {path: 'inbox/:eid', component: emailContent},
    //         {path: 'outbox/:eid', component: emailContent},
    //         {path: 'stars/:eid', component: emailContent},
    //         {path: 'drafts/:eid', component: emailContent},
    //         {path: 'deleted/:eid', component: emailContent},
    //         {path: 'junk/:eid', component: emailContent}
    //     ]
    // },
    {path:'/email/setting',component:emailSetting},
    // {path:'/email/edit',component:emailEdit},
//  办公用品
//     {path: '/office/management1', component: officeManagement1},
    {path: '/office/management', component: officeManagement},
    {path: '/office/storage', component: projectStorage},
    {path: '/office/storage/detail/:id', component: storageDetail},
    {path: '/office/delivery', component: projectDelivery},
    {path: '/office/delivery/detail/:id', component: deliveryDetail},
    {path: '/office/detail/:id', component: officeDetail},
    // {path: '/office/edit/:id', component: officeEdit},



// 汇报 -- 日志
    {path: '/journal/mine', component: journalMine},
    {path: '/journal/share', component: journalShare},
    {path: '/journal/comment', component: journalComment},

    //会议
    {path:'/meeting/management',component:meetingManagement},
    {path:'/meeting/copyme',component:meetingCopyMe},
    {path:'/meeting/room',component:meetingRoom},
    {path: '/meeting/detail/:id', component: meetingDetail},
    // {path: '/meeting/detailEdit/:id', component: meetingDetailEdit},

    //系统设置/角色权限
    {path:'/system/role',component:sysRoleList},
    //系统设置/应用管理
    {path:'/system/application',component:sysApp},
    // {path:'/system/application/crm',component:sysAppCRM},
    // {path:'/system/application/netDisk',component:sysAppNetDisk},
    // {path:'/system/application/ehr',component:sysAppEHR},
    // {path:'/system/application/log',component:sysAppLog},
    // {path:'/system/application/office',component:sysAppOffice},
    //系统设置/企业信息
    {path:'/system/company',component:sysCompany},
    //系统设置(组织机构)
    {path:'/system/organization',component:sysOrganization},

    //合同
    {path:'/contract',component:contract},
    {path: '/contract/detail/:id', component: contractDetail},
    {path:'/contract/contractPaymentAll',component:contractPaymentAll},
    {path:'/contract/settingType',component:contractType},
    {path:'/contract/settingChange',component:contractChangeType},




    //网盘
    {path:'/netDisk',component:netDisk},
    {path:'/netDisk/dirManage',component:netDiskDirManage},
    {path:'/netDisk/myFollow',component:netDiskMyFollow},
    {path:'/netDisk/recentlyVisit',component:netDiskRecentlyVisit},
    {path:'/login',component:login},
    // {path:'/login/signUp',component:signUp},

    //个人网盘
    {path:'/personalNetDisk',component:personalNetDisk},
    {path:'/personalNetDisk/myFollow',component:personalNetDiskMyFollow},

    //流程
    {path:"/flowClient/:flId/:businessObjectId/:act",component:flowClient},
    {path: '/schedule', component: schedule}
]







Object.keys(IFRAME_URL_MAP).forEach((key)=>{

    routes.push({
        path:key,
        component:IframeComponent
    })
})

// console.log('routes--:',routes)







// console.log("process node env in routes:",process.env.NODE_ENV)

if(process.env.NODE_ENV!='prodduction'){
    // console.log("not prod demo---:",demo)
    routes.push({path: '/demo', component: demo})
    routes.push({path: '/demo1', component: demo1})
}

let appEnv=process.env.APP_ENV||'dev'
if(appEnv=='local' || appEnv=='dev' || appEnv=='undefined'){
    routes.push({path: '/test', component: test})
}



export default routes
