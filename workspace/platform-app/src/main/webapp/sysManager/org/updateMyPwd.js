/**
 * 修改个人信息
 * @author gyh
 */



/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}
/**
 * 修改-保存表单
 */
function saveForm(){
	var oldPwd=$("#oldPwd").val();
	var newPwd=$("#newPwd").val();
	var newPwd2=$("#newPwd2").val();
	if(newPwd.length <6){
		pop_tip_open("blue","新密码长度不能小于6位！");
		return false;
	}
	if(newPwd != newPwd2){
		pop_tip_open("blue","两次确认密码不一致！");
		return false;
	}
	var jsonData={
			oldPwd:oldPwd,
			newPwd:newPwd
	}
	var uBody = "sys/org/user/updateMyPwd";
	var uAll = hostUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(jsonData),
		type:'POST',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					pop_tip_open("blue","修改密码成功！");
					closeWin();
				}else {
					pop_tip_open("red","修改密码失败！"+msg);
				}
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","修改密码请求失败");
		}
	});

}


$(function () {
	$("#saveBtn").on('click',function(){
		$("#userForm").attr("data-validate-success","saveForm()");
		$("#userForm").submit();
	});
});
