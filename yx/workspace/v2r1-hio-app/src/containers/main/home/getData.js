//根据传入的全局服务器ip地址请求相关数据的接口，后期可删除
let get_by_other_url = (type ='get' ,url='',data={} ,GLOBAL_HOST = 'GLOBAL.WANG_DONG_YU' )=>{
    // console.info(config.xhrSetting)
    return JZY.xhr.r([{type:type,url:url,data:data}],GLOBAL_HOST,false,false).then((resultData)=>{
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
 * 获取工作日历
 * type操作类型 0：任务 1：日程 2：会议
 */
export const getScheduleList = ( startTime = '' , endTime = '' , createPersonList =[] )=>{
  	let queryData = {
        viewId:null,
        beginTime:startTime,
        endTime:endTime,
        createPersonList:createPersonList
    }
    return get_by_other_url( 'post' ,'/schedule/queryScheduleList', queryData )
}
/**
 * 快速入口，发起审批
 */
export const getFlow = ( ) => {
    // return post('/task/queryTaskId')
    
  //  return get_by_other_url('post' , '/project/projectInfo/queryProjectInfoByTeamPerson/' + userId)

}