$(function(){
	function getUrlParam(name){
    	var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");
    	var r = decodeURI(window.location.search).substr(1).match(reg);
    	if (r!=null ){
    		return unescape(r[2]);
    	}
    	return null;     
	};
	var ad_auth=getUrlParam('ad_auth');
	var loginName;//用户登录账户
	var ver='first_ver';//页签
	if(ad_auth == '1'){
		var userId=window.opener.auth_userId;
		var auth_domain=window.opener.auth_domain;
		loginName=window.opener.auth_loginName+"@"+auth_domain;
		$("#id").val(userId);
		ver='third_ver';
		$("#auth_restPwd").hide();
	}
	    
	function showThisVer(verBox){
        $("form>div").hide();
        $("form>div#"+verBox).show();
    }
    showThisVer(ver);
    var time_num = 60;
    var url=window.document.location.href;
    var findType;//找回方式
    if(url.indexOf("findType")!=-1){
    	findType=url.substring(url.indexOf("findType")+9,url.length);
    }else{
    	findType=1;//默认通过邮箱找回
    }
//    console.log(findType);
    //刷新图片验证码
    //验证码时间动态计算
    function setTimeFn(){
        var timeEle = $(".seconds #num");
        var timer =  setInterval(function(){
            var n = parseInt(timeEle.text());
            timeEle.text(n-1);
            if(n==1){
                clearInterval(timer);
                
                $("#aginGet").text("再次获取验证码").attr("disabled",false).removeClass("nouse");
                var typeVar=$.xljUtils.getUrlParam("findType")==0?"短信":"邮件";
                $(".msg-tip p").text("没有收到"+typeVar+"？您可点击再次获取验证码");
            }
        },1000);
    }
   
    
    //确认提交--重置密码
    $("#sure_submit").on("click",function(e){
       /* showThisVer("four_ver");
        e.stopPropagation();*/
    	//重置密码
    	var id=$("#id").val();
//    	var loginName=$("#loginName").val();
    	var pwd=$("#pwd").val();
    	var pwd2=$("#pwd2").val();
    	if(pwd ==null ||pwd=="" ||pwd == undefined){
    		pop_tip_open("blue",'新密码不可为空！');
    		return false;
    	}
    	if(pwd2 ==null ||pwd2=="" ||pwd2 == undefined){
    		pop_tip_open("blue",'在此输入密码不可为空！');
    		return false;
    	}
    	if(pwd != pwd2){
    		pop_tip_open("blue",'两次输入密码不一致！');
    		return false;
    	}
        var jsonData={
        		password:pwd,
        		id:id,
        		loginName:loginName
        };
        var uBody = "sys/authentication/resetPwd";
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
    					//pop_tip_open("blue",msg);
    					showThisVer("four_ver");
    					
    					setInterval(function () { 
    						var time = $("#time").text(); 
    						time = parseInt(time); 
    						time--; 
    						if (time >0) { 
    							$("#time").text(time); 
    						} else { 
    							window.location.href = "../login.html";
    						} 
    					}, 1000); 
						/*delayURL();
						var delayURL = function(){
							var delay = document.getElementById("time").innerHTML;
							var t = setTimeout("delayURL()", 1000);
							if (delay > 0) {
								delay--;
								document.getElementById("time").innerHTML = delay;
							} else {
								clearTimeout(t);
								window.location.href = "../login.html";
							}
						};*/
    					//e.stopPropagation();
    				}else {
    					pop_tip_open("red",msg);
    				}
    			}else {
    				pop_tip_open("red",'发送验证码失败！');
    			}
    		},
    		error:function(XMLHttpRequest, textStatus, errorThrown){
    			pop_tip_open("red","校验验证码请求失败");
    		}
    	});
    });
    
    $('#third_ver #pwd').on('blur',function() {
		var pwd=$('#third_ver #pwd').val();
		if(pwd==null||pwd==undefined||pwd.trim()==""){
			$(this).parent().find('.errmsgtip').text('密码不能为空');
		}else if(pwd.length<6){
			$(this).parent().find('.errmsgtip').text('密码长度不能小于6位');
		}else{
			$(this).parent().find('.errmsgtip').text('');
		}
	})
	$('#third_ver #pwd2').on('blur',function() {
		var pwd=$('#third_ver #pwd').val();
		var pwd2=$('#third_ver #pwd2').val();
		if(pwd2==null||pwd2==undefined||pwd2.trim()==""){
			$(this).parent().find('.errmsgtip').text('确认密码不能为空');
		}else if(pwd2 !=pwd){
			$(this).parent().find('.errmsgtip').text('两次输入密码不一致，请重新输入');
		}else{
			$(this).parent().find('.errmsgtip').text('');
		}
	})
    
}); 

