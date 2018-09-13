/** 
 * 数据权限作用域列表
 * @author add by  gyh
 * @date 2017-4-12
 */

var testMailServerId=window.opener.testMailServerId;
/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}

/**
 * 测试邮件发送
 */
 function testMailSend(){
 	
			var uBody = "sys/notice/mailMsg/testMailSendMsg";
			var uAll = serviceUrl + uBody;
			var appArr= $("#mailMsgFrom").serializeArray();
//			console.log(appArr)
			var dataJson={};
			var reflag=true;
			for(var i in appArr){
				if(appArr[i].value == null||appArr[i].value==""){
					reflag=false;
				}
				dataJson[appArr[i].name]=appArr[i].value;
			}
			if(!reflag){
				return false;
			}
			dataJson.serverId=testMailServerId;
			$(".loading").show(); 
			$.ajax({
				type:'post',
				url:uAll,
				dataType:'json',
		        contentType:'application/json',
		        data:JSON.stringify(dataJson),
				success: function(resultData) {
					if(resultData) {
						var successFlag = resultData.success;
						var result = resultData.result;
						var msg = resultData.msg;
						if(successFlag) {
							pop_tip_open("green",'发送成功！');
							closeWin();
						}else {
							pop_tip_open("red",msg);
							$(".loading").hide();
						}
					}else {
						pop_tip_open("red",'发送失败！');
						$(".loading").hide();
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					pop_tip_open("red","测试邮件发送请求失败");
					$(".loading").hide();
				}
			})
	
}


/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}
/**
 * 初始化数据
 */
$(function () {
	$("#sendBtn").on('click',function(){
		$("#mailMsgFrom").attr("data-validate-success","testMailSend()");
		$("#mailMsgFrom").submit();
	});
	 $("#testSendBtn").on('click',function() {
 	    testMailSend()
  })
	
});


