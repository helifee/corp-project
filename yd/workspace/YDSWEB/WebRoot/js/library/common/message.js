/**
 * 页面共同错误信息
 */
function showMsg(code){

	var Msg = {
					js_info_0001      	  : 'ISBN号不能为空！',
					js_info_0002      	  : '用户密码不正确！',
					js_info_0003      	  : '你的借书本数已达上限！',
					js_info_0004      	  : '请选择书籍'						
				  };

	if( Msg[code] == undefined ){
		
		return "未定义的MessageId！";
		
	}else{
		
		return Msg[code];
		
	}
}