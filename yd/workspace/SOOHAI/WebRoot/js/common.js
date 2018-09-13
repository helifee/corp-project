/*
 * 检查Session是否过期
 * 返回值 true:未过期
 *       false:过期，重定向到登录页面
 */

﻿﻿function checkSession(request){
	var result=request.responseText;
	var r=/<html>/ig; 
	if(r.test(result)){
		location.replace("logout.action");	
		return false;
	}
	return true;
}