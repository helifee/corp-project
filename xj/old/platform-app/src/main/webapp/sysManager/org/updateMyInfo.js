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
function editSaveForm(){
	var userArr= $("#userForm").serializeArray();
	var userDto={};
	for(var i in userArr){
		if(userArr[i].value==""){
			userDto[userArr[i].name]=null;
		}else if(userArr[i].name=="belongOrgIdName" ){

		}else if(userArr[i].name=="emailPwd"&&userArr[i].value=="******"){
		}else{
			userDto[userArr[i].name]=userArr[i].value;
		}
	}
	userDto.delflag=false;
	var userId = $('#id').val();
	userDto.id=userId;
	var uBody = "sys/org/user/update/"+userId;
	var uAll = hostUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(userDto),
		type:'PUT',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					pop_tip_open("blue","数据修改保存成功！"+msg);
					closeWin();
				}else {
					pop_tip_open("red","数据修改保存失败！"+msg);
				}
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据修改保存请求失败");
		}
	});

}


/**
 * 获取当前登录用户
 */
function initMyInfo(){
	var userId = window.opener.edit_userId;
	var uBody = "sys/org/user/getMyInfo?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			$("#userForm").find("input[name='id']").val(data.result.id);
			$("#userForm").find("input[name='realName']").val(data.result.realName);
			$("#userForm").find("input[name='weChat']").val(data.result.weChat);
			if(data.result.isMale == "1"){
				$("input[name='isMale'][value=1]").attr("checked",true); 
			}else{
				$("input[name='isMale'][value=0]").attr("checked",true); 
			}
			$("#userForm").find("input[name='loginName']").val(data.result.loginName);
			$("#userForm").find("input[name='belongOrgId']").val(data.result.belongOrgId);
			$("#userForm").find("input[name='belongOrgIdName']").val(data.result.prefixName);
//			$("#userForm").find("input[name='belongOrgIdName']").val(data.result.belongOrgName);
			$("#userForm").find("input[name='mobile']").val(data.result.mobile);
			$("#userForm").find("input[name='email']").val(data.result.email);
			var emailPwd=data.result.emailPwd;
			if(emailPwd!=""&&emailPwd!=null){
				$("#userForm").find("input[name='emailPwd']").val("******"); 
			}else{
				$("#userForm").find("input[name='emailPwd']").val(""); 
			}
			if(data.result.type == "1"){
				$("input[name='type'][value=1]").attr("checked",true); 
			}else if(data.result.type == "2"){
				$("input[name='type'][value=2]").attr("checked",true); 
			}else if(data.result.type == "3"){
				$("input[name='type'][value=3]").attr("checked",true); 
			}else if(data.result.type == "4"){
				$("input[name='type'][value=4]").attr("checked",true); 
			}else{
				$("input[name='type'][value=0]").attr("checked",true); 
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取用户请求失败");
		}
	})
}


$(function () {
	$("#saveBtn").on('click',function(){
		$("#userForm").attr("data-validate-success","editSaveForm()");
		$("#userForm").submit();
	});
	//初始化个人信息
	initMyInfo();
	
});
