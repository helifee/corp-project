
var registerSuccessUrl='registersuccess.html';//注册成功跳转页
var sendMessageUrl = "sendmessage.html";//跳转发送验证码页面
var url=baseUrl+'login.html';//云平台登陆页
var errorText;
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
			$(this).parent().find('.errmsgtip').text('必填');
			return false
		}
		if((!emailtest.test(email))&&email!=""){
			$(this).parent().find('.errmsgtip').text('格式不正确');
			return false
		}
		checkAjaxunique("email")
	})
	$('#register #secondLevelDomain').on('blur',function() {
		var secondLevelDomain =$('#register #secondLevelDomain').val();
		var pat = /[\u4E00-\u9FA5]/;
		if(secondLevelDomain==null||secondLevelDomain==undefined||secondLevelDomain.trim()==""){
			$(this).parent().find('.errmsgtip').text('必填');
			return false;
		}else if(secondLevelDomain.length>10){
			$(this).parent().find('.errmsgtip').text('长度不能大于10');
			return false;
		}else if(pat.test(secondLevelDomain)){
			$(this).parent().find('.errmsgtip').text('格式不正确');
			return false;
		}
		checkAjaxunique("secondLevelDomain")
	})
	$('#register #phone').on('blur',function() {
		var phone =$('#register #phone').val();
		var pat = /(^(1[43578]\d{9})$)/;
		if(phone==null||phone==undefined||phone.trim()==""){
			$(this).parent().find('.errmsgtip').text('必填')
			return false;
		}
		if(!pat.test(phone)){
			$(this).parent().find('.errmsgtip').text('格式不正确')
			return false;
		}
//		checkAjaxunique("phone")

	})
	$('#register #wechat').on('blur',function() {
		var wechat =$('#register #wechat').val();
		if(wechat==""){
			$(this).parent().find('.errmsgtip').text('必填');
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
	var phone=$('#phone').val();
	$('#tipmessage').text("已向手机"+phone+"发送验证码").removeClass("errorTipMsg");
	// $('#authCodeError').text('');
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
		pop_tip_open("blue",'请填入手机号');
		return;
	}

	if($("#btnSendCode").prop("disabled")){
         return;
    }
	curCount = count;
	//设置button效果，开始计时
	$("#btnSendCode").prop("disabled", "true");
	//$("#btnSendCode").text("请在" + curCount + "秒内输入验证码");
	$("#btnSendCode").text(curCount+" s后再次获取");
	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	var jsonData={
			phone:phone
	};
	$('#tipmessage').text("已向手机"+phone+"发送验证码");
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
					// $('#tipmessage').text("已向手机："+phone+"发送验证码，请进行验证");
					// console.log(authCode);
				}else{
					//异常处理
					// pop_tip_open("red",xhr.msg,5000);
					$('#tipmessage').text(xhr.msg).addClass("errorTipMsg");
				}
			}else{
				 //pop_tip_open("blue","网络繁忙，请稍后！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			// pop_tip_open("blue","网络繁忙，请稍后！");
			$('#tipmessage').text("网络繁忙，请稍后！").addClass("errorTipMsg");
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
		$("#btnSendCode").text(curCount+" s后再次获取");
	}
}

/**
 * 表单保存提交
 */
var initAccount;
var initPassword;
var lastDays;
function submitForm(){
	var authCode = $('#authCode').val();
	if(authCode==''){
		return;
	}
	var phone=$('#phone').val();
	if(phone==''){
		pop_tip_open("blue",'请填入手机号');
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
			personNum:$("#personNum").val(),
			duty:$("#duty").val(),
			industry:$("#industry").val()
	};
	$('#saveTendTrialBtn').prop("disabled", "true");
//	console.log(jsonData);
	$.ajax({
		type:"POST",
		url:baseUrl+"/sys/thirdPartyAuthentication/obtainTrialOrgUser",
		dataType:"json",
		contentType : "application/json",
		data:JSON.stringify(jsonData),
		success: function(xhr, textStatus) {
			$('#saveTendTrialBtn').removeAttr("disabled");
			if(xhr){
				if(xhr.success){
					if(xhr.code=='20004'){
						// $.xljUtils.tip("blue",xhr.msg);
						$('#tipmessage').text(xhr.msg).addClass("errorTipMsg");
						return;
					}
					console.log(xhr);
					var result = $.parseJSON(xhr.result);
					initAccount=result.loginName;
					initPassword=result.password;
					lastDays = result.lastDays;
					if(xhr.code=='20002'){
						window.location.href="registersuccesstrial.html?ac="+initAccount+"&pd="+initPassword+"&ld="+lastDays+"&old=1";
					}else{
						window.location.href="registersuccesstrial.html?ac="+initAccount+"&pd="+initPassword+"&ld="+lastDays;
					}
				}else{
					//异常处理
					// pop_tip_open("red",xhr.msg,5000);
					$('#tipmessage').text(xhr.msg).addClass("errorTipMsg");
				}
			}else{
				// pop_tip_open("red","服务异常,请联系管理员！");
				$('#tipmessage').text("服务异常,请联系管理员！").addClass("errorTipMsg");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$('#saveTendTrialBtn').removeAttr("disabled");
			// pop_tip_open("red","服务异常,请联系管理员！")
			$('#tipmessage').text("服务异常,请联系管理员！").addClass("errorTipMsg");

		}
	});	
}


/**
 * 弹出验证码页面
 */
function toSendMessagePage(){
	$.xljUtils.customSingleValidate($('#registerForm')[0]);
	//TODO 校验 form表单格式
	if(!$('#registerForm').valid()){

		errorText = false;
		var $phone = $("#phone"),$companyName = $("#companyName"),$industry = $('#register #industry'),$name = $("#name"),$code = $('#register #uPicCode');

		// var phone=$('#register #phone').val();
		// if(phone==null||phone==undefined||phone.trim()==""){
		// 	$('#register #phone').parent().find('.errmsgtip').text('您的手机号不能为空');
		// 	return;
		// }
		// var companyName=$('#register #companyName').val();
		// if(companyName==null||companyName==undefined||companyName.trim()==""){
		// 	$('#register #companyName').parent().find('.errmsgtip').text('您的公司名称不能为空');
		// 	return;
		// }

		//errorText || $name.val() || (errorText="姓名不能为空||name");
		errorText || $phone.val() || (errorText="必填||phone");
		errorText || $companyName.val() || (errorText="必填||companyName");
		errorText || $industry.val() || (errorText="必填||industry");
		errorText || $code.val() || (errorText="必填||uPicCode");
		if(errorText){
			var temp = errorText,arr = temp.split("||");
			if(arr[1]){
				if(arr[1]=='industry'){
					$("#"+arr[1]).parent().parent().find('.errmsgtip').text(arr[0])
				}else{
					$("#"+arr[1]).parent().find('.errmsgtip').text(arr[0])
				}
			}
		}
		return;
			$('#formtip').text('您输入的信息有误或填写不全');
		return;
	}
	if(!$('input[name="checkbox"]').prop("checked")){
		$('#formtip').text('请阅读并同意试用协议');
		return;
	}
	if(!checkPicCode($('#register #uPicCode').val(),1)){
		return;
	};
	$('#register').hide();
      postAuthCode();
    $('#sendmessage').show();
	$('#authCode').focus();
}
function  checkblur(argument) {
	// focusborder($(".settext"));
	// focusborder($(".setheight"));
	// focusborder($(".testnumer"));
	function focusborder(_this) {
		_this.on("focus",function() {
			// $(this).css("border","1px solid #46A7FF ")
		})
		_this.on("blur",function() {
			// $(this).css("border","1px solid #E2E2E2")
		})
	}
	focuscheck($('#register #name'));
	focuscheck($('#register #phone'));
	focuscheck($('#register #wechat'));
	focuscheck($('#register #email'));
	focuscheck($('#register #companyName'));
	focuscheck($('#register #secondLevelDomain'));
	focuscheck($('#register #industry'));
	focuscheck($('#register #uPicCode'));


	$('#register #name').on('blur',function() {
		var username=$('#register #name').val();
		/*if(username==null||username==undefined||username.trim()==""){
			$(this).parent().find('.errmsgtip').text('您的名字不能为空！');
		}else*/ if(username.length>50){
			$(this).parent().find('.errmsgtip').text('长度不能大于50');
			errorText = "长度不能大于50";
		}else{
			$(this).parent().find('.errmsgtip').text('');
			errorText = "";
		}
	})
	$('#register #companyName').on('blur',function() {
		var companyName =$('#register #companyName').val();
		if(companyName==null||companyName==undefined||companyName.trim()==""){
			$(this).parent().find('.errmsgtip').text('必填');
			errorText = "必填";

		}else if(companyName.length>50){
			$(this).parent().find('.errmsgtip').text('长度不能大于100');
			errorText = "长度不能大于100";
		}else{
			$(this).parent().find('.errmsgtip').text('');
			errorText = "";
		}
	})
	$('#register #duty').on('blur',function() {
		var duty =$('#register #duty').val();
		if(duty.length>100){
			$(this).parent().find('.errmsgtip').text('长度不能大于100');
			errorText = "长度不能大于100";
		}else{
			$(this).parent().find('.errmsgtip').text('');
			errorText = "";
		}
	})
	$('#register #uPicCode').on('blur',function() {
		var code =$('#register #uPicCode').val();
		if(code==null||code==undefined||code.trim()==""){
			$(this).parent().find('.errmsgtip').text('请输入验证码');
		}/*else if(!$.isNumeric(code)){
		 $(this).parent().find('.errmsgtip').text('无效验证码格式！');
		 }*/else if(code.length>6){
			$(this).parent().find('.errmsgtip').text('长度不能大于6');
		}else{
			checkPicCode(code,0);
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
function  checkPicCode(code,del) {
	var flag = false;
	$.ajax({
		type:"POST",
		url:baseUrl+"sys/authentication/checkGraphicCode",
		dataType:"json",
		contentType : "application/json",
		data:JSON.stringify({'uPicCode':code,'delflag':del}),
		async:false,
		success: function(xhr, textStatus) {
			if(xhr){
				if(xhr.success){
					$('#register #uPicCode').parent().find('.errmsgtip').text('');
					flag =  true;
				}else{
					//处理
					$('#register #uPicCode').parent().find('.errmsgtip').text(xhr.msg);
				}
			}else{
				pop_tip_open("red","系统繁忙,请稍后重试！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			pop_tip_open("red","系统繁忙,请稍后重试！")
		}
	});
	return flag;
}
function focuscheck(element) {
	$(element).on('focus',function() {
		if(this.id=='industry'){
			$(this).parent().parent().find('.errmsgtip').text('');
		}else{
			$(this).parent().find('.errmsgtip').text('');
		}
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


