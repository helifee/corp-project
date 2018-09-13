let post = (url='',data={},global='GLOBAL.XU_SHENG_DONG')=>{
	// return JZY.xhr.post(url,data,{alertSuccess:false}).then((resultData)=>{
	//     try{
	//         // console.info(resultData)
	//         return resultData;
	//     }catch (e){
	//         this.$message('role.list.vue:'+e);
	//     	return false;
	//     }
	// }).catch((e)=>{
	//     //接口失败
	// 	throw new Error(e)
    // })
    return JZY.xhr.r([{type:'post',url:url,data:data}],global,false,true).then((resultData)=>{
        try{
            return resultData;
        }catch (e){
            this.$message("role.list.vue:"+e);
            return false;
        }
      }).catch((e)=>{
          console.log('kcuf_u e--:',url,e,e.msaage)
        JZY.u.errorMsg(e)
        //接口失败
        throw new Error(e)
      })
}

let get = (url='')=>{
    return JZY.xhr.request({type:'get',url:url},false,false).then(([resultData])=>{
        try{
            console.info("get方法")
            return resultData;
        }catch (e){
            this.$message("role.list.vue:"+e);
            return false;
        }
    }).catch((e)=>{
        //接口失败
        throw new Error(e)
    })
}

//客户列表
export const contomerList = (
    pageNum = '' ,
    pageCount = '' ,
    customerName = '' ,
    type='' ,
    source = '',
    status='',
    notfollowDay = '' ,
    dealStatus = '' ,
    allocationStatus='' ,
    uid = '',
    createDateSort='',
    lastContactTimeSort=''
     )=>{
    let queryData = {
        pageNum:pageNum,
        pageCount:pageCount,
        customerName:customerName,
        type:type,
        status:status,
        source:source,
        notfollowDay:notfollowDay,
        dealStatus:dealStatus,
        allocationStatus:allocationStatus,
        uid:uid,
        createDateSort,
        lastContactTimeSort
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/page',
        data:queryData
    })
    // return post('/crm/customer/page',queryData)
}

//联系人列表
export const contactList = (
    pageNum = '' ,
    pageCount = '' ,
    customerId = '' ,
    customerName = '' ,
    contcatName='' ,
    phoneNumber = '',
    lastContactTimeSort=''
     )=>{
    let queryData = {
        pageNum:pageNum,
        pageCount:pageCount,
        customerId:customerId,
        customerName:customerName,
        contcatName:contcatName,
        phoneNumber:phoneNumber,
        lastContactTimeSort:lastContactTimeSort
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/contact/page',
        data:queryData
    })
    // return post('/crm/contact/page',queryData)
}
//删除
export const del = (sid)=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/contact/delete/'+sid+'',
        // data:queryData
    })
    // return post('/crm/contact/delete/'+sid+'')
}

//增加联系人
export const add = ( sid = '' ,customerId = '' ,opportunityId = '' ,name = '' ,phoneNumber='' ,title = '',gendar='',email='',comment='',decisionRole='' )=>{
	let queryData = {
        sid:sid,
        customerId:customerId,
        opportunityId:opportunityId,
        name:name,
        phoneNumber:phoneNumber,
        title:title,
        gendar:gendar,
        email:email,
        comment:comment,
        decisionRole:decisionRole
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/contact/save',
        data:queryData
    })
    // return post('/crm/contact/save',queryData)
}

//初始化获取客户名称
export const initAjax = (name)=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/searchNames?name='+name,
        // data:queryData
    })
    // return post('/crm/customer/searchNames?name='+name)
    // return post('/customer/searchNames?name='+"101")
}

//初始化获取sid
export const initAjaxSid = ()=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/getAttachmentParam',
        // data:queryData
    })
    // return post('/crm/customer/getAttachmentParam')
}

//编辑修改联系人初始化数据
export const modify = (sid)=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/contact/get/'+sid+'',
    })
    // return post('/crm/contact/get/'+sid+'')
}
//编辑修改客户初始化数据
export const modifyCustomer = (sid)=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/get/'+sid+'',
        // data:queryData
    })
    // return post('/crm/customer/get/'+sid+'')
}

//客户新增修改
export const customerAddMod = ( 
    sid = '' ,
    name = '' ,
    phoneNumber = '' ,
    email = '' ,
    source='' ,
    type = '',
    status='',
    address='',
    webSite='',
    comment='',
    salesmans='',
    contacts=''
 )=>{
    let queryData = {
        sid:sid,
        name:name,
        phoneNumber:phoneNumber,
        email:email,
        source:source,
        type:type,
        status:status,
        address:address,
        webSite:webSite,
        comment:comment,
        salesmans:salesmans,
        contacts:contacts
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/save',
        data:queryData
    })
    // return post('/crm/customer/save',queryData)
}

//作废客户
export const voidCustomer = (sid)=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/repealed/'+sid+'',
        // data:queryData
    })
    // return post('/crm/customer/repealed/'+sid+'')
}

//客户联系人商机跟进计划
// customerId 客户id   contactId  联系人id   opportunityId 商机id
export const customerFollowPlan = ( 
    customerId = '' ,
    contactId = '' ,
    opportunityId = '' ,
    contactName='',
    startTime = '',
    endTime = '',
    pageNum = '',
    pageCount = '',
    contactTimeSort="",
    updateDateSort=""
 )=>{
    let queryData = {
        customerId:customerId,
        contactId:contactId,
        opportunityId:opportunityId,
        contactName,
        startTime,
        endTime,
        pageNum:pageNum,
        pageCount:pageCount,
        contactTimeSort,
        updateDateSort
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/followPlan/queryPlanList',
        data:queryData
    })
    // return post('/crm/followPlan/queryPlanList',queryData)
    // return post('/crm/followPlan/queryPlanList',queryData,'GLOBAL.KONG_KAI_YU')
}

//客户联系人商机跟进记录
// customerId 客户id   contactId  联系人id   opportunityId 商机id  planId 计划id
export const customerFollowRecord = ( 
    customerId = '' ,
    contactId = '' ,
    opportunityId = '' ,
    planId='',
    pageNum = '',
    pageCount = ''
    // contactName='',
    // startTime = '',
    // endTime = '',
    // pageNum = '',
    // pageCount = ''
 )=>{
    let queryData = {
        customerId:customerId,
        contactId:contactId,
        opportunityId:opportunityId,
        planId:planId,
        pageNum:pageNum,
        pageCount:pageCount
        // contactName,
        // startTime,
        // endTime,
        // pageNum:pageNum,
        // pageCount:pageCount
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/followHis/queryHisList',
        data:queryData
    })
    // return post('/crm/followHis/queryHisList',queryData)
    // return post('/crm/followHis/queryHisList',queryData,'GLOBAL.KONG_KAI_YU')
}

//获取商机名称接口
export const opportunity = ( 
    customerId = '' ,
 )=>{
    let queryData = {
        customerId:customerId,
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/opportunities/queryList',
        data:queryData
    })
    // return post('/crm/opportunities/queryList',queryData)
}

//获取联系人名称接口
export const contactsAll = ( 
    customerId = '' ,
 )=>{
    let queryData = {
        customerId:customerId,
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/contact/queryAll',
        data:queryData
    })
    // return post('/crm/contact/queryAll',queryData)
}

//客户列表的点击查询数据
export const queryContactAll = ( 
    customerId = '' ,
 )=>{
    let queryData = {
        customerId:customerId,
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/contact/queryContact',
        data:queryData
    })
    // return post('/crm/contact/queryAll',queryData)
}

//获取跟进记录sid
export const initRecordSid = ()=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/followPlan/getAttachmentParam',
        // data:queryData
    })
    // return post('/crm/followPlan/getAttachmentParam')
}

//跟进计划新增
export const followPlanAdd = ( obj1 , obj2 )=>{
    let queryData ={}
    if(obj2==null || obj2==undefined || obj2==""){
        if(JSON.stringify(obj1)!= '{}'){
            queryData.his = {...obj1}
        }
    }else{
        if(JSON.stringify(obj1)!= '{}'){
            queryData.his = {...obj1}
        }
        if(JSON.stringify(obj2)!= '{}'){
            queryData.plan = {...obj2}
        }
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/followPlan/saveFollow',
        data:queryData
    })
    // return post('/crm/followPlan/saveFollow',queryData)
}

//跟进计划删除
export const planDel = (sid)=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/followPlan/delete/'+sid+'',
        // data:queryData
    })
    // return post('/crm/followPlan/delete/'+sid+'')
}

//我的crm本日计划
export const todyPlan = ()=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/followPlan/queryFollowPlan',
        // data:queryData
    })
    // return post('/crm/followPlan/queryFollowPlan')
}
//我的crm商机
export const opportunityList = ()=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/opportunities/queryOpportunities',
        // data:queryData
    })
    // return post('/crm/opportunities/queryOpportunities')
}

//我的crm销售榜单
export const salesList = ()=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/salesRankings/monthRankings',
        // data:queryData
    })
    // return post('/crm/salesRankings/monthRankings')
}

//我的crm全部计划
export const allPlans = (obj)=>{
    let queryData =obj
    return JZY.xhr.r({
        type:'post',
        url:'/crm/followPlan/queryFollowPlanList',
        data:queryData
    })
    // return post('/crm/followPlan/queryFollowPlanList',queryData)
}

//我的crm全部商机
export const allRecord = (obj)=>{
    let queryData =obj
    return JZY.xhr.r({
        type:'post',
        url:'/crm/opportunities/queryAll',
        data:queryData
    })
    // return post('/crm/opportunities/queryAll',queryData)
}

//获取客户名称做对比
export const contrastName = ( 
    name = '' ,
    sid=''
 )=>{
    let queryData = {
        name:name,
        sid:sid
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/valName',
        data:queryData
    })
    // return post('/crm/customer/valName',queryData)
}

//获取客户状态数量
export const numSta = ()=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/statusCount',
        // data:queryData
    })
    // return post('/crm/customer/statusCount')
}

//标记重点客户
export const keyCustomer = ( 
    customerId = '' ,
 )=>{
    let queryData = {
        customerId:customerId,
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/signImport',
        data:queryData
    })
    // return post('/crm/customer/signImport',queryData)
}

//标记失败客户
export const failCustomer = ( 
    customerId = '' ,
 )=>{
    let queryData = {
        customerId:customerId,
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/signFail',
        data:queryData
    })
    // return post('/crm/customer/signFail',queryData)
}

//跟进计划修改初始化
export const folUpdate= (sid)=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/followPlan/get/'+sid+'',
        // data:queryData
    })
    // return post('/crm/followPlan/get/'+sid+'')
}


//获取商机动态
// customerId 客户id    opportunityId 商机id  pageNum  页码  pageCount 条数
export const dynamic = ( 
    customerId = '' ,
    opportunityId = '' ,
    pageNum='',
    pageCount='',
 )=>{
    let queryData = {
        customerId:customerId,
        opportunityId:opportunityId,
        pageNum:pageNum,
        pageCount:pageCount

    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/getAll',
        data:queryData
    })
    // return post('/crm/customer/getAll',queryData)
}

//客户导入数据
export const  customerImport = ()=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/saveImportData',
        // data:queryData
    })
    // return post('/crm/customer/saveImportData')
}

//客户导入预览
export const  customerPreview = ()=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/product/excel/preview',
        // data:queryData
    })
    // return post('/crm/product/excel/preview')
}

//客户导入下载失败数据
export const  customerFail = ()=>{
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/download/errorData',
        // data:queryData
    })
    // return post('/crm/customer/download/errorData')
}


//客户分配
export const cusDist= (obj)=>{
    let queryData =obj
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/assignedCust',
        data:queryData
    })
    // return post('/crm/customer/assignedCust',queryData)
}


//客户详情页数量
export const cusPageNum = ( 
    customerId = '' 
 )=>{
    let queryData = {
        customerId:customerId,
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/customer/statistical',
        data:queryData
    })
    // return post('/crm/customer/getAll',queryData)
}

//商机详情页数量
export const oppPageNum = ( 
    customerId = '',
    opportunityId=''
 )=>{
    let queryData = {
        customerId:customerId,
        opportunityId:opportunityId
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/opportunities/statistical',
        data:queryData
    })
    // return post('/crm/customer/getAll',queryData)
}

//联系人详情页数量
export const conPageNum = ( 
    customerId = '',
    contactId = '' 
 )=>{
    let queryData = {
        customerId:customerId,
        contactId:contactId,
    }
    return JZY.xhr.r({
        type:'post',
        url:'/crm/contact/statistical',
        data:queryData
    })
    // return post('/crm/customer/getAll',queryData)
}

//商机初始化
// export const oppInit= (oppId)=>{
//     return JZY.xhr.r({
//         type:'post',
//         url:'/crm/opportunities/get/'+oppId+'',
//     })
// }

   
// export const setFollow = ( taskId = '' )=>{
//     let queryData = {
//         taskId:taskId
//     }
//     return post('/oa/task/follow',queryData)
// }
// /**
//  * 取消关注任务
//  */
// export const setCancelFollow = ( taskId = '' )=>{
//     let queryData = {
//         taskId:taskId
//     }
//     return post('/oa/task/cancelFollow',queryData)
// }
// /**
//  * 获取任务id，新建任务用
//  */
// export const getCreateTaskId = ( )=>{
//     return post('/oa/task/queryTaskId')
// }
// /**
//  * 获取任务管理列表
//  */
// export const getAdminTaskList = ( taskName = '' ,taskStatus = '' ,pageNum = '' ,pageCount=10 ,orderby = [] )=>{
//     let queryData = {
//         taskName:taskName,
//         taskStatus:taskStatus,
//         pageNum:pageNum || '1',
//         pageCount:pageCount || 10,
//         orderby:orderby.length !=0 ? orderby : ['end_date,asc','task_status,desc']
//     }
//     return post('/oa/task/queryAdminTaskList',queryData)
// }
// /**
//  * 获取任务详情
//  */
// export const getTaskInfoById = ( taskId = '' )=>{
//     let queryData = {
//         taskId:taskId
//     }
//     return post('/oa/task/queryTaskDetails',queryData)
// }
// /**
//  * 新增任务
//  */
// export const saveCreateTask = ( queryData = {} )=>{
//     return post('/oa/task/saveTask',queryData)
// }

// /**
//  * 编辑任务
//  */
// export const updateTask = ( queryData = {} )=>{
//     return post('/oa/task/updateTask',queryData)
// }
// /**
//  * 删除任务
//  */
// export const deleteTask = ( taskId = '' )=>{
//     let queryData = {
//         taskId:taskId
//     }
//     return post('/oa/task/delete',queryData)
// }
// /**
//  * 查询任务对应操作权限
//  */
// export const getTaskAuth = ( taskId = '' )=>{
//     let queryData = {
//         taskId:taskId
//     }
//     return post('/oa/task/queryTaskAuth',queryData)
// }
// /**
//  * 改变任务状态
//  * 操作类型 type 1：任务完成 2：任务关闭 4：任务激活 5、任务未完成
//  */
// export const updateTaskStatus = ( taskId = '' , type = '' )=>{
//     let queryData = {
//         taskId:taskId,
//         type:type
//     }
//     return post('/oa/task/updateStatus',queryData)
// }