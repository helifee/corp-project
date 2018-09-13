//根据传入的全局服务器ip地址请求相关数据的接口，后期可删除
let get_by_other_url = (type ='get' ,url='',data={})=>{
    // console.info(config.xhrSetting)
    let arrUrl = []
    if (url && Array.isArray(url) && url.length > 0) {
        console.info(url)
        url.forEach((item)=>{
            arrUrl.push({type:type,url:item,data:data})
        })
    }else{
        arrUrl.push({type:type,url:url,data:data})
    }

    return JZY.xhr.r(arrUrl,'GLOBAL.ZHANG_CHAOYANG',false,false).then((resultData)=>{
      try{
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
//post(url, data, options,type='post')
let post = ( url='', data={}, cache=false, alertError=true )=>{
	// return JZY.xhr.post(url,data,{alertSuccess:alertSuccess}).then((resultData)=>{
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

    return JZY.xhr.r([{type:'post',url:url,data:data}],'GLOBAL.ZHANG_CHAOYANG',cache,alertError).then((resultData)=>{
      try{
          return resultData;
      }catch (e){
          this.$message("role.list.vue:"+e);
          return false;
      }
    }).catch((e)=>{
        //接口失败
        if ( url == '/template/enabledDisable') {//审批模板启用、禁止
            return ['disable']
        }else{
            throw new Error(e)
        }
    })
}
//request(arg,cache,alertError,host)
let get = (url='', cache=false, alertError=true)=>{
    // return JZY.xhr.request({type:'get',url:url},false).then(([resultData])=>{
    //     try{
    //         console.info("get方法")
    //         return resultData;
    //     }catch (e){
    //         this.$message("role.list.vue:"+e);
    //         return false;
    //     }
    // }).catch((e)=>{
    //     //接口失败
    //     throw new Error(e)
    // })
    return JZY.xhr.r([{type:'get',url:url}],'GLOBAL.ZHANG_CHAOYANG',cache,alertError).then((resultData)=>{
      try{
          return resultData[0];
      }catch (e){
          this.$message("role.list.vue:"+e);
          return false;
      }
    }).catch((e)=>{
      //接口失败
      throw new Error(e)
    })
}
/**
 * 获取单据类型列表，带子节点
 */
export const getFlowCategoryChildList = ()=>{
	return get('/category/getFlowCategoryChildList')
}

/**
 * 获取我发起的列表
 */
export const approveListData = ( state=null , flowCategoryId= '' ,  startDate= '' ,endDate = '',  pageNum = 1 , pageCount = 10 , orderby = [] )=>{
	console.info(startDate)
    let queryData = {
        state:state,
        flowType:flowCategoryId,
        startDate:startDate,
        endDate:endDate,
        pageNum:pageNum,
        pageCount:pageCount,
        orderby:orderby.length !=0 ? orderby : []
    }
	return post('/instance/getPage',queryData)
}
/**
 * 获取我的审批列表
 */
export const myApproveListData = ( state=null , flowCategoryId= '' ,  startDate= '' ,endDate = '', createPersonId= '' , pageNum = 1 , pageCount = 10 , orderby = [] )=>{
    console.info(startDate)
    let queryData = {
        state:state,
        flowType:flowCategoryId,
        startDate:startDate,
        endDate:endDate,
        userIds:createPersonId ? [createPersonId] : null,
        pageNum:pageNum,
        pageCount:pageCount,
        orderby:orderby.length !=0 ? orderby : []
    }
	return post('/approval/getPage',queryData)
}
/**
 * 获取抄送我的列表
 * isRead：1是未读  2是已读  0 全部
 */
export const sharedListData = ( state=null , flowCategoryId= '' ,  startDate= '' ,endDate = '', createPersonId= '' , pageNum = 1 , pageCount = 10 , orderby = [] , isRead = 1 )=>{
    let queryData = {
        state:state,
        flowType:flowCategoryId,
        startDate:startDate,
        endDate:endDate,
        userIds:createPersonId ? [createPersonId] : null,
        pageNum:pageNum,
        pageCount:pageCount,
        isRead:isRead,
        orderby:orderby.length !=0 ? orderby : []
    }
    return post('/copy/getPage',queryData)
}
/**
 * 获取我关注的列表
 */
export const concernListData = ( state=null , flowCategoryId= '' ,  startDate= '' ,endDate = '', createPersonId= '' , pageNum = 1 , pageCount = 10 , orderby = [] )=>{
    let queryData = {
        state:state,
        flowType:flowCategoryId,
        startDate:startDate,
        endDate:endDate,
        userIds:createPersonId ? [createPersonId] : null,
        pageNum:pageNum,
        pageCount:pageCount,
        orderby:orderby.length !=0 ? orderby : []
    }
    return post('/follow/getPage',queryData)
}
/**
 * 获取流程监控列表
 */
export const flowManageListData = ( state=null , flowCategoryId= '' ,  startDate= '' ,endDate = '', createPersonId= '' , pageNum = 1 , pageCount = 10 , orderby = [] )=>{
    console.info(startDate)
    let queryData = {
        state:state,
        flowType:flowCategoryId,
        startDate:startDate,
        endDate:endDate,
        userIds:createPersonId ? [createPersonId] : null,
        pageNum:pageNum,
        pageCount:pageCount,
        orderby:orderby.length !=0 ? orderby : []
    }
    return post('/design/getPage',queryData)
}


/**
 * 获取我的审批分类列表，不带子节点
 * 系统首页快速入口也调用
 */
export const getUserCategory = ()=>{
    //临时用，带子节点，没有权限校验
    // return get_by_other_url('get' , '/category/getFlowCategoryChildList' )
    // return get('/category/getFlowCategoryChildList')
    //正式用，有权限校验，不带子节点
    return get_by_other_url('get' , '/category/getMyFlowCateGoryTemplate?sign=pc' )
    // return get('/category/getMyFlowCateGoryTemplate')

}

/**
 * 关注审批实例
 * id：流程id
 * isFollow:1关注，0/2取消关注
 */
export const setInstanceFollow = ( flowInstanceId = '' ,isFollow = 1 )=>{
    let queryData = {
        flowInstanceId:flowInstanceId,
        isFollow:isFollow
    }
    return post('/follow/saveOrUpdate',queryData)
}
/**
 * 获取流程分类
 */
export const getCategory = ()=>{
    return get('/category/queryListFlowCategory')
}
/**
 * 查询流程分类的详情
 */
export const getFlowInfoById = ( sid = '' )=>{
    return get('/category/getById?sid='+sid)
}

/**
 * 新增流程分类
 */
export const addCategory = ( queryData = {} )=>{
    return post('/category/saveFlowCategory',queryData)
}
/**
 * 删除流程分类
 */
export const deleteApproveType = ( sid = '' )=>{
    let queryData = {
        sid:sid
    }
    return post('/category/deleteFlowCategory',queryData)
}
/**
 * 流程分类拖拽排序
 */
export const flowDragSort = ( firstSort = '' , afterSort = '' ,flowCategoryId = '' )=>{
    let queryData = {
        firstSort:firstSort,//最终位置的前一个节点的sort值
        afterSort:afterSort,//最终位置的后一个节点的sort值
        flowCategoryId:flowCategoryId//拖拽后的流程分类的id
    }
    return post('/category/dragCategory',queryData)
}
/**
 * 审批模板拖拽排序
 */
export const approveDragSort = ( firstSort = '' , afterSort = '' ,flowTemplateId = '' ,flowCategoryId = '' )=>{
    let queryData = {
        firstSort:firstSort,//最终位置的前一个节点的sort值
        afterSort:afterSort,//最终位置的后一个节点的sort值
        flowTemplateId:flowTemplateId,//审批模板的id
        flowCategoryId:flowCategoryId//拖拽后的流程分类的id
    }
    return post('/template/draggingSorting',queryData)
}
/**
 * 审批模板预览
 */
export const showFlowTemplate = ( sid = '', code = '' )=>{
    let queryData = {
        sid:sid,
        code:code//模板code
    }
    return post('/template/previewTemplate',queryData)
}
/**
 * 审批模板预览-审批人动态生成
 */
export const showFlowApproverByTemplateCode = ( userId = '', code = '', businessData =[] )=>{
    let queryData = {
        flowStarter:userId,//流程发起人
        flowTemplateCode:code,//模板code
        businessData:businessData
    }
    return post('/instance/flowSimulate',queryData)
}

/**
 * 审批模板删除
 */
export const deleteFlowTemplate = ( code = '' )=>{
    let queryData = {
        code:code//模板code
    }
    return post('/template/deleteFlowTemplate',queryData)
}
/**
 * 审批模板启用、禁止
 */
export const setFlowDisable = ( code='' , sid = '' )=>{
    let queryData = {
        code:code,
        sid:sid//模板id
    }
    return post('/template/enabledDisable',queryData)
}


/**
 * 查询审批模板的基本信息
 */
export const getApproveInfoById = ( code = '' )=>{
    return get('/template/getFlowTemplateById?code='+code)
}
/**
 * 保存审批模板的基本信息
 */
export const saveApproveInfo = ( queryData = {} )=>{
    return post('/template/saveTemplate',queryData)
}
/**
 * 保存审批模板的权限
 */
export const saveApproveRole = ( queryData = {} )=>{
    return post('/templateRole/updateFlowTemplateRole',queryData)
}
/**
 * 获取审批模板的权限
 */
export const getApproveRoleById = ( code = '' )=>{
    return get('/templateRole/getFlowTemplateRole?code='+code)
}

/**
 * 新增流程-获取流程实例详情
 */
export const getFlowStartView = ( templateCode = '' )=>{
    let queryData = {
        templateCode:templateCode
    }
    return post('/template/flowStartView',queryData)
}

/**
 * 保存流程-草稿
 */
export const draftSave = ( queryData = {} )=>{
    return post('/instance/draftSave',queryData)
}

/**
 * 新增流程-提交
 */
export const addFreeFlow = ( queryData = {} )=>{
    return post('/instance/start',queryData)
}

/**
 * 获取流程实例的详情
 */
export const getInstanceInfo = ( queryData = {} )=>{
    return post('/instance/flowView', queryData )
}



/**
 * 审批流程-撤回
 */
export const setInstanceWithdraw = ( instanceId = '' )=>{
    return get('/instance/withdraw/' + instanceId )
}
/**
 * 审批流程-通过
 */
export const setInstancePass = ( instanceId = '' , desc = '' )=>{
    let queryData = {
        instanceId:instanceId,
        desc:desc
    }
    return post('/instance/approve', queryData )
}
/**
 * 审批流程-驳回、退回
 * state  1:驳回上一级,2:驳回到发起人,3:退回上一级,4:退回到发起人
 * rejectType：'0'驳回，'1'退回
 */
export const setInstanceReject = (  instanceId = '' , instanceAcId = '' , state = 1 , desc = '' , rejectType = '1' )=>{
    let queryData = {
        instanceId:instanceId,
        instanceAcId:instanceAcId,
        state:Number(state),
        desc:desc,
        rejectType:String(rejectType)
    }
    return post('/instance/reject', queryData )
}
/**
 * 审批流程-前加签
 * instanceAcId：实例环节Id
 * name：前加签名称
 * approvalType：审批类型1会签审签，2会签
 * userIds：审批人[]
 */
export const setInstanceFrontAddLabel = ( instanceId = '' , instanceAcId = '' , name = '' , approvalType = '' , userIds =[] )=>{
    let queryData = {
        instanceId:instanceId,
        instanceAcId:instanceAcId,
        name:name,
        approvalType:approvalType,
        userIds:userIds
    }
    return post('/instance/frontAddLabel', queryData )
}
/**
 * 审批流程-后加签
 * instanceAcId：实例环节Id
 * name：后加签名称
 * approvalType：审批类型1会签审签，2会签
 * userIds：审批人[]
 */
export const setInstanceAfterAddLabel = ( instanceId = '' , instanceAcId = '' , name = '' , approvalType = '' , userIds =[] )=>{
    let queryData = {
        instanceId:instanceId,
        instanceAcId:instanceAcId,
        name:name,
        approvalType:approvalType,
        userIds:userIds
    }
    return post('/instance/afterAddLabel', queryData )
}
/**
 * 审批流程-抄送
 * userIds：抄送人[]
 */
export const setInstanceCc = ( instanceId = '' , copyUserIds =[] )=>{
    let queryData = {
        instanceId:instanceId,
        copyUserIds:copyUserIds
    }
    return post('/instance/copy', queryData )
}
/**
 * 审批流程-跳过
 */
export const setInstanceSkip = ( instanceId = '' )=>{
    return get('/instance/skip/' + instanceId )
}
/**
 * 审批流程-删除
 * remove Boolean类型，true删除草稿
 */
export const setInstanceDelete = ( instanceId = '' , remove = false )=>{
    let queryData = {
        instanceId:instanceId,
        remove:remove,
        operateType:'3'
    }
    return post('/instance/draftSave',queryData)
}
/**
 * 审批流程-编辑
 */
export const setInstanceEdit = ( instanceId = '' )=>{
    let queryData = {
        instanceId:instanceId
    }
    // return post('/instance/delete', queryData )
}
/**
 * 审批流程(流程详情页)-提交
 */
export const setInstanceRefer = ( queryData = {} )=>{
    // let queryData = {
    //     instanceId:instanceId,
    //     templateId:templateId,
    //     businessId:businessId,
    //     freeOrTemplate:freeOrTemplate,
    //     terminalType:'web',
    //     operateType: operateType//表单操作类型operateType为空：字符串0：不处理，1新增，2修改，3删除！
    // }
    return post('/instance/start',queryData)
}
/**
 * 审批流程(流程详情页)-修改审批人-只能管理员操作的
 * approverId 新审批人id
 * approverRecordId 审批id
 */
export const changeInstanceApprover = ( instanceId = '' , approverId = '' , approverRecordId = '' , type = 2 , instanceAcId = '' )=>{
    let queryData = {
        instanceId:instanceId,
        approverId:approverId,
        approverRecordId:approverRecordId,
        type:type,
        instanceAcId:instanceAcId
    }
    return post('/instance/update/approver',queryData)
}
/**
 * 获取已经抄送的抄送人列表
 */
export const getAlreadyCopy = ( instanceId = '' )=>{
    return get('/instance/alreadyCopy/'+instanceId)
}



/**
 * 系统首页-获取流程信息
 * state:1是待审，2是待阅，3是已办，4是我发起的
 */
export const getFlowDataHome = ( state = '' )=>{
    return get_by_other_url('get' , ['/instance/approval/list/1','/instance/approval/list/2','/instance/approval/list/3','/instance/approval/list/4'] )
}
/**
 * 系统首页-获取流程信息-数量
 * state:1是待审，2是待阅，3是已办，4是我发起的
 */
export const getFlowDataCountHome = ( state = '' )=>{
    return get_by_other_url('get' , ['/instance/approval/listCount/1','/instance/approval/listCount/2','/instance/approval/listCount/3','/instance/approval/listCount/4'] )
}


/**
 * 项目模块-获取流程列表list
 * projectId:项目id
 */
export const getFlowListDataByProject = ( projectId= '' , flowCategoryId= '' , startDate= '' ,endDate = '', pageNum = 1 , pageCount = 10 , orderby = []  )=>{
    let queryData = {
        projectId:projectId,
        flowType:flowCategoryId,
        startDate:startDate,
        endDate:endDate,
        pageNum:pageNum,
        pageCount:pageCount,
        orderby:orderby.length !=0 ? orderby : []
    }
    return get_by_other_url('post' , ['/instance/getInstanceListByProjectId'] ,queryData )
}



/**
 * 获取流程实例的操作权限
 */
// export const getInstanceAuth = ( instaceId = '' )=>{
//     let queryData = {
//         instaceId:instaceId
//     }
//     return post('/instance/flowView', queryData )
// }
