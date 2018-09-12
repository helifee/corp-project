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
    return JZY.xhr.r([{type:'post',url:url,data:data}],'GLOBAL.LOCALHOST.WANG_DONG_YU',cache,alertError).then((resultData)=>{
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
    
    return JZY.xhr.r([{type:'get',url:url}],'GLOBAL.LOCALHOST.WANG_DONG_YU',cache,alertError).then((resultData)=>{
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


import config from '@/config/index.js'
//根据传入的全局服务器ip地址请求相关数据的接口，后期可删除
let get_by_other_url = (type ='get' ,url='',data={})=>{
    // console.info(config.xhrSetting)
    return JZY.xhr.r([{type:type,url:url,data:data}],'GLOBAL.LOCALHOST.WANG_DONG_YU',false,false).then((resultData)=>{
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
 * 获取任务列表
 * type操作类型 0：我创建的 1：我负责的 2：我参与的 3：我关注的 4：共享给我的
 * taskStatus任务状态 0:未完成 1:已完成 2:已关闭 3:超期
 */
export const getTaskList = ( type = '' , projectId = '' , taskName = '' ,taskStatus = '' ,pageNum = '' ,pageCount=10 ,orderby = [] , fromPage = '')=>{
	let prefix = ''
  if( fromPage == 'task' || fromPage == 'own'){
      prefix = ''
  }else if( fromPage == 'join' || fromPage == 'concern' ){
      prefix = 'a.'
  }else if( fromPage == 'share' ){
      prefix = 'c.'
  }

  let queryData = {
        type:type || '0',
        projectId:projectId,
        taskName:taskName,
        taskStatus:taskStatus,
        pageNum:pageNum || '1',
        pageCount:pageCount || 10,
        orderby:orderby.length !=0 ? orderby : [ prefix+'end_date,asc', prefix+'task_status,desc', prefix+'create_date,desc']
    }
    return get_by_other_url('post' , '/task/getPage' , queryData )

    // return post('/task/getPage',queryData)
}
/**
 * 关注任务
 */
export const setFollow = ( taskId = '' )=>{
    let queryData = {
        taskId:taskId
    }
    return post('/task/follow',queryData)
}
/**
 * 取消关注任务
 */
export const setCancelFollow = ( taskId = '' )=>{
    let queryData = {
        taskId:taskId
    }
    return post('/task/cancelFollow',queryData)
}
/**
 * 获取任务id，新建任务用
 */
export const getCreateTaskId = ( )=>{
    return post('/task/queryTaskId')
}
/**
 * 获取任务管理列表
 */
export const getAdminTaskList = ( taskName = '' ,taskStatus = '' ,pageNum = '' ,pageCount=10 ,orderby = [] )=>{
    let queryData = {
        taskName:taskName,
        taskStatus:taskStatus,
        pageNum:pageNum || '1',
        pageCount:pageCount || 10,
        orderby:orderby.length !=0 ? orderby : ['end_date,asc','task_status,desc','create_date,desc']
    }
    return post('/task/queryAdminTaskList',queryData)
}
/**
 * 获取任务详情
 */
export const getTaskInfoById = ( taskId = '' )=>{
    let queryData = {
        taskId:taskId
    }
    return post('/task/queryTaskDetails',queryData)
}
/**
 * 新增任务
 */
export const saveCreateTask = ( queryData = {} )=>{
    return post('/task/saveTask',queryData)
}

/**
 * 编辑任务
 */
export const updateTask = ( queryData = {} )=>{
    return post('/task/updateTask',queryData)
}
/**
 * 删除任务
 */
export const deleteTask = ( taskId = '' )=>{
    let queryData = {
        taskId:taskId
    }
    return post('/task/delete',queryData)
}
/**
 * 查询任务对应操作权限
 */
export const getTaskAuth = ( taskId = '' )=>{
    let queryData = {
        taskId:taskId
    }
    return post('/task/queryTaskAuth',queryData)
}
/**
 * 改变任务状态
 * 操作类型 type 1：任务完成 2：任务关闭 4：任务激活 5、任务未完成
 */
export const updateTaskStatus = ( taskId = '' , type = '' )=>{
    let queryData = {
        taskId:taskId,
        type:type
    }
    return post('/task/updateStatus',queryData)
}
/**
 * 获取任务列表，项目中的任务，专用
 * projectId: 项目id
 * beginTime: 起始时间 yyyy-MM-dd HH:mm:ss
 * endTime: 结束时间 yyyy-MM-dd HH:mm:ss
 * createPersonList任务创建人列表：[{createPersonId:1},{createPersonId:2}]
 */
export const getTaskFromProjectList = ( projectId = '' , taskName = '' , createPersonList = [] , beginTime = '' , endTime = '' , pageNum = '' , pageCount=10 , orderby = [] )=>{
    let queryData = {
        projectId:projectId,
        taskName:taskName,
        createPersonList:createPersonList,
        beginTime:beginTime,
        endTime:endTime,
        pageNum:pageNum || '1',
        pageCount:pageCount || 10,
        orderby:orderby.length !=0 ? orderby : ['c.endDate,asc','c.taskStatus,desc','c.createDate,desc']
    }
    return get_by_other_url('post' , '/task/queryProjectTaskList' , queryData )
}
/**
 * 任务模块调用，创建/编辑任务
 * 根据人员id获取项目list，包括此人是项目的：创建人、负责人、参与人
 */
export const getProjectListById = ( userId = '' )=>{
    // return get('/project/projectInfo/queryProjectInfoByTeamPerson/' + userId);
    return get_by_other_url('get' , '/project/projectInfo/queryProjectInfoByTeamPerson/' + userId)
};

/**
 * 任务模块调用，创建/编辑任务
 * 根据项目id获取人员树，包括此人在项目中的角色有：创建人、负责人、参与人、共享人
 */
export const getUserListByProjectId = ( projectId = '' )=>{
    // return get('/project/projectTeamPerson/queryProjectTeamPersonByProjectId/' + projectId)
    return get_by_other_url('get' , '/project/projectTeamPerson/queryProjectTeamPersonByProjectId/' + projectId)
};