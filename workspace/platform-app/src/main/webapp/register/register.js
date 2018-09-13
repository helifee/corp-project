var registerSuccessUrl='registersuccess.html';//注册成功跳转页
var sendMessageUrl = "sendmessage.html";//跳转发送验证码页面
var url=baseUrl+'login.html';//云平台登陆页
$(function(){
	//初始页面
	initPage();
});
/**
 * 初始化页面
 */
function initPage(){
	//表单信息操作页

	//重置表单
	$('#registerForm')[0].reset();

	//隐藏发送验证码页
	$('#sendmessage').hide();
	//启用验证码按钮
	$("#btnSendCode").removeAttr("disabled");
	//清空验证码
	$('#authCode').val('');
	//关闭按钮
	$("#closeTendTrialModal").on("click",function(){
		document.getElementById("registerForm").reset();
		$("#registerForm :input[type='hidden']").val("");
	});
	//绑定按钮事件
	//保存窗口
	$("#saveTendTrialBtn").on('click',function () {
		if($('#saveTendTrialBtn').prop("disabled")){
			return;
		}
		//表单提交
		submitForm();
	});
	//绑定获取验证码
	$('#btnSendCode').on('click',function () {
		postAuthCode();
	});
	//绑定登陆跳转
	$('.gologin').on('click',function () {
		window.open(url,'_self');
	});
	//禁用所有按钮的默认行为
	// $('.btn').click(function() {
	// 	return false;
	// });
	//阻止默认行为
	// $('.btn').click(function(e) {
	// 	e.preventDefault();
	// });
	checkblur();
	checkUnique()
}
/**
 * 检验phone/wechat/email唯一 
 */
function checkUnique(checkType){
	// var param = $('#'+checkType).val();
	// if(param==''){
	// 	return;
	// }
	$('#register #email').on('blur',function() {
		var email =$('#register #email').val();
		var  emailtest=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
		if(email==null||email==undefined||email.trim()==""){
			$(this).parent().find('.errmsgtip').text('您的邮箱不能为空');
			return false
		}
		if((!emailtest.test(email))&&email!=""){
			$(this).parent().find('.errmsgtip').text('您的邮箱格式不正确!')
			return false
		}
		checkAjaxunique("email")
	})
	$('#register #secondLevelDomain').on('blur',function() {
		var secondLevelDomain =$('#register #secondLevelDomain').val();
		var pat = /[\u4E00-\u9FA5]/;
		if(secondLevelDomain==null||secondLevelDomain==undefined||secondLevelDomain.trim()==""){
			$(this).parent().find('.errmsgtip').text('您的二级域名不能为空!');
			return false;
		}else if(secondLevelDomain.length>10){
			$(this).parent().find('.errmsgtip').text('您的二级域名不能大于10！');
			return false;
		}else if(pat.test(secondLevelDomain)){
			$(this).parent().find('.errmsgtip').text('您的二级域名格式不正确!');
			return false;
		}
		checkAjaxunique("secondLevelDomain")
	})
	$('#register #phone').on('blur',function() {
		var phone =$('#register #phone').val();
		var pat = /(^(1[43578]\d{9})$)/;
		if(phone==null||phone==undefined||phone.trim()==""){
			$(this).parent().find('.errmsgtip').text('手机号不能为空!')
			return false;
		}
		if(!pat.test(phone)){
			$(this).parent().find('.errmsgtip').text('手机号格式不正确!')
			return false;
		}
//		checkAjaxunique("phone")

	})
	$('#register #wechat').on('blur',function() {
		var wechat =$('#register #wechat').val();
		if(wechat==""){
			$(this).parent().find('.errmsgtip').text('您的微信帐号不能为空');
			return false

		}
		checkAjaxunique("wechat")

	})
}
function checkAjaxunique(checkType) {
	var param = $('#'+checkType).val();
	var jsonData={
			checkType:checkType,
			value:param
	};
	$.ajax({
		type:"POST",
		url:baseUrl+"/sys/authentication/checkRepeatByCol",
		dataType:"json",
		contentType : "application/json",
		data:JSON.stringify(jsonData),
		success: function(xhr, textStatus) {
			if(xhr){
				if(xhr.success){
					$('#label-'+checkType).remove();
					$("#registerForm").find("input[name='"+checkType+"']").parent().find('.errmsgtip').text('');
					$("#registerForm").find("input[name='"+checkType+"']").parent().removeClass("has-error has-feedback");
				}else{
					//异常处理
					$("#registerForm").find("input[name='"+checkType+"']").parent().find('.errmsgtip').text(xhr.msg);

				}

			}else{
				pop_tip_open("red","服务异常,请联系管理员！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			pop_tip_open("red","服务异常,请联系管理员！");
		}
	});	

}
/**
 * onfocus事件 移除tips
 */
function clearTips(checkType){
	$('#label-'+checkType).remove();
	$("#registerForm").find("input[name='"+checkType+"']").parent().removeClass("has-error has-feedback");
}
/**
 * onfocus事件 移除tips
 */
function clearAuthCodeError(){

	$('#authCodeError').text('');
}
/**
 * 获取验证码
 */
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
function postAuthCode(){
	var phone=$('#phone').val();
	if(phone==''){
		pop_tip_open("blue",'请填入手机号！');
		return;
	}

	if($("#btnSendCode").prop("disabled")){
         return;
    }
	curCount = count;
	//设置button效果，开始计时
	$("#btnSendCode").prop("disabled", "true");
	//$("#btnSendCode").text("请在" + curCount + "秒内输入验证码");
	$("#btnSendCode").text(curCount);
	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	var jsonData={
			phone:phone
	};
	$.ajax({
		type:"POST",
		url:baseUrl+"/sys/authentication/postCode",
		dataType:"json",
		contentType : "application/json",
		data:JSON.stringify(jsonData),
		success: function(xhr, textStatus) {
			if(xhr){
				if(xhr.success){
					var authCode =  xhr.result;
					$('#tipmessage').text("已向手机："+phone+"发送验证码，请进行验证");
					// console.log(authCode);
				}else{
					//异常处理
					pop_tip_open("red",xhr.msg,5000);
				}
			}else{
				 //pop_tip_open("blue","网络繁忙，请稍后！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			pop_tip_open("blue","网络繁忙，请稍后！");
		}
	});	
}
//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {                
		window.clearInterval(InterValObj);//停止计时器
		$("#btnSendCode").removeAttr("disabled");//启用按钮
		$("#btnSendCode").text("重新发送验证码");
	}
	else {
		curCount--;
//		$("#btnSendCode").text("请在" + curCount + "秒内输入验证码");
		$("#btnSendCode").text(curCount);
	}
}

/**
 * 表单保存提交
 */
var initAccount;
var initPassword;
function submitForm(){
	var authCode = $('#authCode').val();
	if(authCode==''){
		return;
	}
	var phone=$('#phone').val();
	if(phone==''){
		pop_tip_open("blue",'请填入手机号！');
		return;
	}
	var registerForm= $("#registerForm").serializeArray();
	var jsonData={
			verifCode:authCode,
			phone:phone,
			name:$("#name").val(),
			wechat:$("#wechat").val(),
			email:$("#email").val(),
			companyName:$("#companyName").val(),
			secondLevelDomain:$("#secondLevelDomain").val(),
			personNum:$("#personNum").val(),
			duty:$("#duty").val(),
			industry:$("#industry").val()
	};
	$('#saveTendTrialBtn').prop("disabled", "true");
//	console.log(jsonData);
	$.ajax({
		type:"POST",
		url:baseUrl+"/sys/authentication/checkAndRegister",
		dataType:"json",
		contentType : "application/json",
		data:JSON.stringify(jsonData),
		success: function(xhr, textStatus) {
			$('#saveTendTrialBtn').removeAttr("disabled");
			if(xhr){
				if(xhr.success){
					console.log(xhr);
					initAccount=xhr.result.initAccount;
					var sld=xhr.result.secondLevelDomain;
					initPassword=xhr.result.initPassword;
					window.location.href="registersuccess.html?ac="+initAccount+"@"+sld+"&pd="+initPassword;
				}else{
					//异常处理
					pop_tip_open("red",xhr.msg);
				}
			}else{
				pop_tip_open("red","服务异常,请联系管理员！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$('#saveTendTrialBtn').removeAttr("disabled");
			pop_tip_open("red","服务异常,请联系管理员！")

		}
	});	
}

/**
 * 注册回调
 */
function closeTendTrialModal(xhr){
	console.log(xhr);
	if(xhr) {
		var successFlag = xhr.success;
		if(successFlag) {
			var resultData = xhr.result;
			var popUrl =registerSuccessUrl+'?ac='+resultData.initAccount+'&pd='+resultData.initPassword ;
			window.open(popUrl,'_self');

		}else{
			switch (xhr.code) {
			case "50000":
				pop_tip_open("red",xhr.msg);
				break;
			case "50001":
				pop_tip_open("red",xhr.msg);
				break;
			case "50002":
				pop_tip_open("blue",xhr.msg);
				break;
			case "50003":
				$('#authCodeError').text(xhr.msg);
				break;

			default:
				pop_tip_open("red","服务异常,请联系管理员！");
			break;
			}
		}
	}

}
/**
 * 弹出验证码页面
 */
function toSendMessagePage(){
	$.xljUtils.customSingleValidate($('#registerForm')[0]);
	//TODO 校验 form表单格式
	if(!$('#registerForm').valid()){
		var industry=$('#register #industry').val();
		if(industry==null||industry==undefined||industry.trim()==""){
			$('#register #industry').parent().find('.errmsgtip').text('所属行业不能为空!');
		}else{
			$('#formtip').text('您输入的信息有误或填写不全');
		}
		return;
	}
	if(!$('input[name="checkbox"]').prop("checked")){
		$('#formtip').text('请阅读并同意试用协议');
		return;
	}
	$('#register').hide();
      postAuthCode();
    $('#sendmessage').show();
}
function  checkblur(argument) {
	focusborder($(".settext"));
	focusborder($(".setheight"));
	focusborder($(".testnumer"));
	function focusborder(_this) {
		_this.on("focus",function() {
			$(this).css("border","1px solid #46A7FF ")
		})
		_this.on("blur",function() {
			$(this).css("border","1px solid #E2E2E2")
		})
	}
	focuscheck($('#register #name'));
	focuscheck($('#register #phone'));
	focuscheck($('#register #wechat'));
	focuscheck($('#register #email'));
	focuscheck($('#register #companyName'));
	focuscheck($('#register #secondLevelDomain'));
	focuscheck($('#register #industry'));

	$('#register #name').on('blur',function() {
		var username=$('#register #name').val();
		if(username==null||username==undefined||username.trim()==""){
			$(this).parent().find('.errmsgtip').text('您的名字不能为空！');
		}else if(username.length>50){
			$(this).parent().find('.errmsgtip').text('您的名字长度不能大于50！');
		}else{
			$(this).parent().find('.errmsgtip').text('');
		}
	})
	$('#register #companyName').on('blur',function() {
		var companyName =$('#register #companyName').val();
		if(companyName==null||companyName==undefined||companyName.trim()==""){
			$(this).parent().find('.errmsgtip').text('您的公司名称不能为空')

		}else if(companyName.length>50){
			$(this).parent().find('.errmsgtip').text('您的公司名称不能大于100！');
		}else{
			$(this).parent().find('.errmsgtip').text('')
		}
	})
	$('#register #duty').on('blur',function() {
		var duty =$('#register #duty').val();
		if(duty.length>100){
			$(this).parent().find('.errmsgtip').text('您的职位不能大于100！');
		}else{
			$(this).parent().find('.errmsgtip').text('')
		}
	})

//	$('#register #secondLevelDomain').on('blur',function() {
//		var secondLevelDomain =$('#register #secondLevelDomain').val();
//		var pat = /[\u4E00-\u9FA5]/;
//		if(secondLevelDomain==null||secondLevelDomain==undefined||secondLevelDomain.trim()==""){
//			$(this).parent().find('.errmsgtip').text('您的二级域名不能为空!');
//		}else if(secondLevelDomain.length>10){
//			$(this).parent().find('.errmsgtip').text('您的二级域名不能大于10！');
//		}else if(pat.test(secondLevelDomain)){
//			$(this).parent().find('.errmsgtip').text('您的二级域名格式不正确!');
//		}else{
//			$(this).parent().find('.errmsgtip').text('')
//		}
//	})
}
function focuscheck(element) {
	$(element).on('focus',function() {
		$(this).parent().find('.errmsgtip').text('');

	})
}

/**
 * 跳转发送验证码页面
 */
//function toSendMessagePage(){
//$.xljUtils.customSingleValidate($('#registerForm')[0]);
//if(!$('#registerForm').valid()){
//$('#formtip').text('您输入的信息有误或填写不全');
//return;
//}
//if(!$('input[name="checkbox"]').prop("checked")){
//return;
//}
//$('#registerForm').attr('action',sendMessageUrl);
//var popUrl = sendMessageUrl+'';
//window.open(popUrl);

//}


