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
/*
 * 根据MessageId取得message
 * 参数1：MessageId
 * 参数2~20：Message内部变量1~19
 * 返回值：取得的message
 * 
 */
function getMessage(){
	var MAXARGUMENTS = 20;
	var messageId ;
	var message;
	if (arguments.length == 0){
		return "";
	}
	messageId = arguments[0];
  
	var messageHash = new Hash({ 'yds.com.info.0001': '是否删除该条记录？',
								 'yds.com.info.0002': '是否登陆该条记录？',
								 'yds.com.info.0003': '是否修改该条记录？',
								 'yds.com.info.0004': '是否提交当前修改？',
								 'yds.com.info.0005': '是否取消当前修改？',
								 'yds.com.info.0006': '是否删除？',
								 'yds.com.info.0007': '是否移动？',
								 'yds.com.info.0008': '添加成功！',
								 'yds.com.info.0009': '修改成功！',
								 'yds.com.info.0010': '删除成功！',
								 
								 'yds.com.warning.0001': '{0}不能为空！',
								 'yds.com.warning.0002': '{0}输入格式错误！',
								 'yds.com.warning.0003': '{0}长度应为{1}位！',

								 'yds.per.error.0001': '该用户不存在！'
								 
								 }); 
	message = messageHash.get(messageId);
	if (undefined == message){
		message = "未定义的MessageId！"
	}
	var i = 1;
	if (arguments.length > 1){
		for (i = 1; i < arguments.length && i < MAXARGUMENTS; i++){
			message = message.gsub("{" + (i-1) + "}", arguments[i]);
		}
	}
	for (; message.include("{" + (i-1) + "}") && i < MAXARGUMENTS-1; i++){
		message = message.gsub("{" + (i-1) + "}", "");
	}
	
	return message;
}