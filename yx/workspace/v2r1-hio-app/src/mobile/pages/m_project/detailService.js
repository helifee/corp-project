let post = ( url='', data={}, cache=false, alertError=true )=>{
    return JZY.xhr.r([{type:'post',url:url,data:data}],'GLOBAL',cache,alertError).then((resultData)=>{
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
//接口报错会返回一个"error"串
let postAndError = ( url='', data={}, cache=false, alertError=true )=>{
    return JZY.xhr.r([{type:'post',url:url,data:data}],'GLOBAL',cache,alertError).then((resultData)=>{
        try{
            return resultData;
        }catch (e){
            this.$message("role.list.vue:"+e);
            return false;
        }
    }).catch((e)=>{
        //接口失败
        return "error"
        throw new Error(e)
    })
}
//request(arg,cache,alertError,host)
let get = (url='', cache=false, alertError=true)=>{
    return JZY.xhr.r([{type:'get',url:url}],'GLOBAL',cache,alertError).then((resultData)=>{
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
/**
 * 根据ID获取项目信息  1
 */
export const getProjectDetail = (id)=>{
    return get('/oa/project/projectInfo/get/'+id);
};
export const postProjectDetail = (queryData)=>{
    return post('/oa/project/projectInfo/mobile/query',queryData) ;
};
/**
 * 查询项目对应操作权限  2
 */
export const getProjectOperation = (id)=>{
    return get('/oa/project/projectOperation/queryProjectOperation/'+id);
};
/**
 * 关注项目取消关注项目  3
 */
export const getProjectFollow = (id)=>{
    return get('/oa/project/projectConcern/changeProjectConcern/'+id);
};
/**
 * 删除项目信息  4
 */
export const getProjectDel = (id)=>{
    return get('/oa/project/projectInfo/delete/'+id);
};
/**
 * 项目状态变更  5
 */
export const postProjectUpdateStatus = (queryData)=>{
    return post('/oa/project/projectInfo/updateProjectStauts',queryData) ;
};
/**
 * 保存项目信息  6
 */
export const postProjectInfoSave = (queryData)=>{
    return post('/oa/project/projectInfo/save',queryData) ;
};

/**
 * 分页返回我创建的项目信息列表 9
 */
export const postProjectCreateList = (projectName='',projectStatus='',orderBy='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        projectName:projectName,
        projectStatus:projectStatus,
        orderBy:orderBy,
        pageNum:pageNum,
        pageCount:pageCount,
    };
    queryData = filterParams(queryData);
    return postAndError('/oa/project/projectInfo/myCreatePage',queryData,false);
};
/**
 * 分页返回我负责的项目信息列表 9
 */
export const postProjectResponsibleList = (projectName='',projectStatus='',orderBy='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        projectName:projectName,
        projectStatus:projectStatus,
        orderBy:orderBy,
        pageNum:pageNum,
        pageCount:pageCount,
    };

    queryData = filterParams(queryData);
    return postAndError('/oa/project/projectInfo/myResponsiblePage',queryData,false);
};
/**
 * 分页返回我参与的的项目信息列表 9
 */
export const postProjectParticipateList = (projectName='',projectStatus='',orderBy='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        projectName:projectName,
        projectStatus:projectStatus,
        orderBy:orderBy,
        pageNum:pageNum,
        pageCount:pageCount,
    };
    queryData = filterParams(queryData);
    return postAndError('/oa/project/projectInfo/myParticipatePage',queryData,false);
};
/**
 * 分页返回分享我的项目信息列表 9
 */
export const postProjectShareList = (projectName='',projectStatus='',orderBy='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        projectName:projectName,
        projectStatus:projectStatus,
        orderBy:orderBy,
        pageNum:pageNum,
        pageCount:pageCount,
    };
    queryData = filterParams(queryData);
    return postAndError('/oa/project/projectInfo/mySharePage',queryData,false);
};

/**
 * 分页返回我关注的项目信息列表 9
 */
export const postProjectConcernList = (projectName='',projectStatus='',orderBy='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        projectName:projectName,
        projectStatus:projectStatus,
        orderBy:orderBy,
        pageNum:pageNum,
        pageCount:pageCount,
    };
    queryData = filterParams(queryData);
    return postAndError('/oa/project/projectInfo/myConcernPage',queryData,false);
};
/**
 * 分页返回符合条件的项目信息列表 9
 */
export const postProjectInfoList = (projectName='',projectStatus='',orderBy='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        projectName:projectName,
        projectStatus:projectStatus,
        orderBy:orderBy,
        pageNum:pageNum,
        pageCount:pageCount,
    };
    queryData = filterParams(queryData);
    return postAndError('/oa/project/projectInfo/page',queryData,false);
};
/**
 * 根据项目ID获取项目动态 7
 */
export const postProjectDynamic = (projectId='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        projectId:projectId,
        pageNum:pageNum,
        pageCount:pageCount,
    };
    return post('/oa/project/projectTrends/page',queryData) ;
};
/**
 * 查询团队成员  8
 */
export const postProjectTeamPerson = (projectId='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        projectId:projectId,
        pageNum:pageNum,
        pageCount:pageCount,
    };
    return post('/oa/project/projectTeamPerson/page',queryData) ;
};
function filterParams(obj){
    let _newPar = {};
    for (let key in obj) {
        //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
        //null值“”空值的时候，这个字段就别往后传了，要不后端查询sql的时候会带上这些的
        if ((obj[key] == 0||obj[key] === null || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            //记录属性
            _newPar[key] = obj[key];
        }
    }
    //返回对象
    return _newPar;
}



/**
 * 根据ID获取项目信息，任务、审批模块-详情页
 */
export const getProjectDetailForProject = ( projectId = '' )=>{
    
    return get('/oa/project/projectInfo/queryWhitelistProject/' + projectId)
};