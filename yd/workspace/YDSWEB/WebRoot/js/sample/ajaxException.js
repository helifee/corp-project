/*
 * @(#)ajaxException.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: sample
 */

/**
 * Ajax请求
 */
function launch() {

	var url = 'sample/ajaxExceptionTest.action';
	
	//Request方式
	var request = new Ajax.Request(url, {
		method : 'post',
		parameter : '',
		onComplete : function(response) {
			
			//Ajax异常检查	true:异常	false:正常
			var flg = checkException(response);
			if(!flg) {
				
				//正常时执行自已的操作
				$('msg').update(response.responseText);
			}
		}
	});
	
//	//Updater方式
//	var request = new Ajax.Updater({success : 'msg'}, url, {
//		onComplete : function(response){
//			
//			//Ajax异常检查	true:异常	false:正常
//			var flg = checkException(response);
//			if(!flg) {
//				
//				//正常时执行自已的操作
//			}
//			
//		}
//	});
}