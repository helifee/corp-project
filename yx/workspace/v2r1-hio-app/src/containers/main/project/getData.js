/**
 * Created by gavin on 2018/3/26.
 */


let post = (url='',data={})=>{
    return JZY.xhr.post(url,data,{alertError:true,alertSuccess:false}).then((resultData)=>{
        try{
            console.info('post方法')
            return resultData;
        }catch (e){
            this.$message("role.list.vue:"+e);
            return false;
        }
    }).catch((e)=>{
        //接口失败
        console.log("接口失败",e);
        throw new Error(e)
    })
};

let get = (url='',alertMsg)=>{
    return JZY.xhr.request(url,false,alertMsg).then(([resultData])=>{
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
//JZY.xhr.put('/test_put')"
let put = (url='',data={},alertSuccess)=>{
    return JZY.xhr.put(url,data,{alertSuccess:alertSuccess}).then((resultData)=>{
        try{
            console.info("put方法")
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
 * 保存项目信息  1
 */
export const postProjectInfoSave = (queryData)=>{
    return post('/project/projectInfo/save',queryData) ;
};

/**
 * 关注项目取消关注项目  6
 */
export const getProjectFollow = (id)=>{
    console.log(id,"关注项目取消关注项目")
    return get('/project/projectConcern/changeProjectConcern/'+id,false);
};

/**
 * 删除项目信息  2
 */
export const getProjectDel = (id)=>{
    return get('/project/projectInfo/delete/'+id,true);
};

/**
 * 修改项目信息  3
 */
export const postProjectInfoUpdate = (queryData)=>{
    console.log(queryData,"project/projectInfo/update")
    return post('/project/projectInfo/update',queryData) ;
};
//
/**
 * 查询项目对应操作权限  2
 */
export const getProjectOperation = (id)=>{
    return get('/project/projectOperation/queryProjectOperation/'+id,false);
};

/**
 * 项目状态变更  6
 */
export const postProjectUpdateStatus = (queryData)=>{
    console.log(queryData,"项目状态变更")
    return post('/project/projectInfo/updateProjectStauts',queryData) ;
};
/**
 * 查询团队成员  6
 */
export const postProjectTeamPerson = (projectId='',teamPersonName='',orderBy='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        projectId:projectId,
        teamPersonName:teamPersonName,
        orderBy:orderBy,
        pageNum:pageNum,
        pageCount:pageCount,
    };
    console.log(queryData,"查询团队成员")
    return post('/project/projectTeamPerson/page',queryData) ;
};

/**
 * 根据ID获取项目信息  7
 */
export const getProjectDetail = (id)=>{
    return get('/project/projectInfo/get/'+id,false);
};


/**
 * 根据ID获取项目信息  7
 */
export const postProjectDetail = (query)=>{
    return post('/project/projectInfo/mobile/query',query);
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
    return post('/project/projectInfo/page',queryData);
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
    return post('/project/projectInfo/myCreatePage',queryData);
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
    return post('/project/projectInfo/myParticipatePage',queryData);
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
    return post('/project/projectInfo/myResponsiblePage',queryData);
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
    return post('/project/projectInfo/myConcernPage',queryData);
};


/**
 * 分页返回我关注的项目信息列表 9
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
    return post('/project/projectInfo/mySharePage',queryData);
};




/**
 * 根据项目ID获取项目动态
 */
export const getProjectDynamic = (id)=>{
    return get('/project/projectTrends/queryProjectTrendsByProjectId/'+id);
};



/**
 * 返回不重复的目录名
 */
export const postProjectNoRepeatName = (fileName)=>{
    let queryData = {
        tendId:null,
        fileName:fileName
    }
    return post('/disk/disk/diskCompanyProject/getNoRepeatName',queryData) ;
};



import config from '@/config/index.js'
//根据传入的全局服务器ip地址请求相关数据的接口，后期可删除
let get_by_other_url = (type ='get' ,url='',data={})=>{
    // console.info(config.xhrSetting)
    return JZY.xhr.r([{type:type,url:url,data:data}],'GLOBAL.YANG_NING',false,false).then((resultData)=>{
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
 * 任务模块调用，创建/编辑任务
 * 根据人员id获取项目list，包括此人是项目的：创建人、负责人、参与人
 */
export const getProjectListById = ( userId = '' )=>{
    // return get('/project/projectInfo/queryProjectInfoByTeamPerson/' + userId);
  //  return get_by_other_url('get' , '/project/projectInfo/queryProjectInfoByTeamPerson/' + userId)
};
/**
 * 任务模块调用，创建/编辑任务
 * 根据项目id获取人员树，包括此人在项目中的角色有：创建人、负责人、参与人、共享人
 */
export const getUserListByProjectId = ( projectId = '' )=>{
    // return get('/project/projectTeamPerson/queryProjectTeamPersonByProjectId/' + projectId)
    
    // return get_by_other_url('get' , '/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/' + projectId)

    return get_by_other_url('get' , '/project/projectTeamPerson/queryProjectTeamPersonByProjectId/' + projectId)
};
/**
 * 根据ID获取项目信息，审批模块-详情页
 */
export const getProjectDetailForProject = ( projectId = '' )=>{
    
    return get_by_other_url('get' , '/project/projectInfo/queryWhitelistProject/' + projectId)
    // return get_by_other_url('get' , '/project/projectInfo/get/' + projectId)
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
