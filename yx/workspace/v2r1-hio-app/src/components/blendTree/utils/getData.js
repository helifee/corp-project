/*组合树获取数据接口*/

let get_by_url = ( url='', type = 'post', host='GLOBAL.COMPONENTS.WANG_TAO', data={}, cache=false, alertError=true )=>{
    return JZY.xhr.r([{type:type,url:url,data:data}],host,cache,alertError).then((resultData)=>{
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
 * 获取内部用户树列表
 * workStatus : 0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;
 */
export const getUserList = ( host = '', type = '', url = '', data = {}, workStatus = 1 )=>{
	
  host = host || 'GLOBAL.COMPONENTS.WANG_TAO'
  type = type || 'post'
  url = url || '/user/queryOrganizationUserList'
// debugger
  if (type === 'get') {
      data = {
          workStatus:workStatus
      }
  }else{ //post
      data = JZY.u.deepExtend( {}, { workStatus:workStatus }, data )
  }
  // debugger
  return get_by_url( url, type, host, data )

}
/**
 * 获取外部用户树列表
 */
export const getUserOutsideList = ( host = '', type = '', url = '', data = {}, workStatus = 1 )=>{
  
  host = host || 'GLOBAL.COMPONENTS.WANG_TAO'
  type = type || 'post'
  url = url || '/user/queryExternalUserList?time='+Math.random()

  if (type === 'get') {
      data = {
          workStatus:workStatus
      }
  }else{ //post
      data = JZY.u.deepExtend( {}, { workStatus:workStatus }, data )
  }
  
  return get_by_url( url, type, host, data )

}
/**
 * 获取部门树列表
 */
export const getDeptList = ()=>{
    return get_by_url( '/organization/queryTree', 'post' )
}
/**
 * 获取角色树列表
 */
export const getRoleList = ( data = {} )=>{
    return get_by_url( '/role/queryRoles', 'post', 'GLOBAL.COMPONENTS.WANG_TAO', data )
}