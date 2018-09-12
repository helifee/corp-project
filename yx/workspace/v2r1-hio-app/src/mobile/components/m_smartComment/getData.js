/**评论模块的接口信息*/

let get_by_url = ( url='',  type = 'post', data={}, cache=false, alertError=true )=>{
    return JZY.xhr.r([{type:type,url:url,data:data}],'GLOBAL.LOCALHOST.WANG_DONG_YU',cache,alertError).then((resultData)=>{
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
 * 获取评论列表
 * businessId: 业务详情id
 * businessType: 业务类型
 */
export const getCommentList = ( businessId = '' , businessType = '' , pageNum = 1 , pageCount = 10 )=>{
  let queryData = {
      businessId:businessId,
      businessType:businessType,
      pageNum:pageNum,
      pageCount:pageCount
  }
    return get_by_url('/comment/queryList', 'post', queryData )
}
/**
 * 新增评论
 */
export const addComment = ( obj = {} )=>{
  return get_by_url('/comment/save', 'post', obj )
}

/**
 * 删除评论
 * businessId: 业务详情id
 * commentId: 评论id
 */
export const deleteComment = ( businessId = '' , commentId = '' )=>{
  let queryData = {
      businessId:businessId, //业务id
      commentId:commentId,//评论id
  }
  return get_by_url('/comment/delete', 'post', queryData )
}