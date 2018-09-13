var registerSuccessUrl='registersuccess.html';//注册成功跳转页
$(function(){
	//初始页面
	initPage();
	});
/**
 * 初始化页面
 */
function initPage(){
	    
	    //隐藏发送验证码页
	    $('#sendmessage').hide();
	    //启用验证码按钮
	    $("#btnSendCode").removeAttr("disabled");
	    //清空验证码
	    $('#authCode').val('');
		//绑定按钮事件
		//保存窗口
		 $("#saveTendTrialBtn").on('click',function () {
			 //表单提交
			 submitForm();
		 });
		 //绑定获取验证码
		 $('#btnSendCode').on('click',function () {
			 postAuthCode();
		 });
		 //绑定登陆跳转
		 $('#gologin').on('click',function () {
			 window.open('../../login.html','_self');
		 });
		  //禁用所有按钮的默认行为
		    $('.btn').click(function() {
		        return false;
		    });
		    //阻止默认行为
		    $('.btn').click(function(e) {
		        e.preventDefault();
		    });
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
		alert("请填入手机号！");
		return;
	}
	curCount = count;
	    //设置button效果，开始计时
	     $("#btnSendCode").attr("disabled", "true");
	     $("#btnSendCode").text("请在" + curCount + "秒内输入验证码");
	     InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	$.ajax({
	       type:"POST",
	       url:baseUrl+"/sys/tendTrial/post/authCode/"+phone+'?time='+Math.random(),
	       dataType:"json",
	       success: function(xhr, textStatus) {
	    		  if(xhr){
	    			  if(xhr.success){
	    				 var authCode =  xhr.result;
	    				 $('#tipmessage').text("已向手机:"+phone+"发送验证码，请进行验证");
	    				 
	    				 console.log(authCode);
	    				  
	    			  }else{
	    				  //异常处理
	    						pop_tip_open("red",xhr.msg);
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
//timer处理函数
function SetRemainTime() {
            if (curCount == 0) {                
                window.clearInterval(InterValObj);//停止计时器
                $("#btnSendCode").removeAttr("disabled");//启用按钮
                $("#btnSendCode").text("重新发送验证码");
            }
            else {
                curCount--;
                $("#btnSendCode").text("请在" + curCount + "秒内输入验证码");
            }
        }

/**
 * 表单保存提交
 */
function submitForm(){
	var authCode = $('#authCode').val();
	if(authCode==''){
		return;
	}
	$('#registerForm').attr('action',baseUrl+'/sys/tendTrial/register/'+authCode);
	 //初始化UUID
   $.ajax({
       type:"GET",
       url:baseUrl+"sys/uuid/generator/getGuuid"+'?time='+Math.random(),
       dataType:"json",
       success: function(resultValue, textStatus) {
             uuid = resultValue.result;
             $('#id').val(uuid);//租户id
             $('#type').val("0");//试用租户
       },
     	 error: function(XMLHttpRequest, textStatus, errorThrown) {
     		 pop_tip_open("red","服务异常,请联系管理员！");
         }
   });
	 $('#registerForm').submit();
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



