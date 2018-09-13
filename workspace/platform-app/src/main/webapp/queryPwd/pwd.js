$(function(){
	function showThisVer(verBox){
        $("form>div").hide();
        $("form>div#"+verBox).show();
    }
    showThisVer("first_ver");
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
    var loginName;
    /**
     * 下一步按钮，校验账户，发送验证码
     */
    $("#next_btn").on("click",function(e){
        //发送验证码
    	loginName=$("#loginName").val();
    	var uPicCode=$("#passwordCode").val();
    	if(loginName ==null ||loginName=="" ||loginName == undefined){
    		pop_tip_open("blue",'账号不可为空！');
    		return false;
    	}
    	if(loginName.indexOf("@")<0){
    		loginName=loginName+"@xy";
    	}
        var jsonData={
        		loginName:loginName,
        		uPicCode:$("#uPicCode").val(),
        		findType:findType
        };
        var uBody = "sys/authentication/authCheckCode";
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
    					//pop_tip_open("blue",'发送验证码成功！');
//    					console.log(result);
    					$("#id").val(result.id);
    					$("#phoneOrMail").text(result.email);
    					showThisVer("second_ver");
    					var typeVar=$.xljUtils.getUrlParam("findType")==0?"手机":"邮箱";
    					$(".msg-tip p").html("已向您绑定的"+typeVar+"<span>"+result.email+"</span>发送验证码");
    			        setTimeFn();
    			        
    			        e.stopPropagation();
    				}else {
    					pop_tip_open("red",msg);
    					passwordCode();
    				}
    			}else {
    				pop_tip_open("red",'发送验证码失败！');
    			}
    		},
    		error:function(XMLHttpRequest, textStatus, errorThrown){
    			pop_tip_open("red","发送验证码请求失败");
    		}
    	});

    });
    //获取验证码
    $("#aginGet").on("click",function(e){
        //发送短信或邮件------------
        /*$(".msg-tip p").html("已向您绑定的邮箱<span>10****@qq.com</span>发送短信验证码");
        $(this).attr("disabled",true).addClass("nouse");
        $(".seconds #num").text(time_num);
        setTimeFn();
        e.stopPropagation();*/
//    	$("#next_btn").click();
    	 //再次发送验证码
    	var that = $(this);
//    	var loginName=$("#loginName").val();
    	if(loginName ==null ||loginName=="" ||loginName == undefined){
    		pop_tip_open("blue",'账号不可为空！');
    		return false;
    	}
        var jsonData={
        		loginName:loginName,
        		findType:findType,
        		aginGet:true
        };
        var uBody = "sys/authentication/authCheckCode";
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
    					//pop_tip_open("blue",'发送验证码成功！');
//    					console.log(result);
    					$("#id").val(result.id);
    					$("#phoneOrMail").text(result.email);
    					("second_ver");
    					var typeVar=$.xljUtils.getUrlParam("findType")==0?"手机":"邮箱";
    					$(".msg-tip p").html("已向您绑定的"+typeVar+"<span>"+result.email+"</span>发送验证码");
    					$(that).html('<span class="seconds"><span id="num">'+time_num+'</span></span>秒后再次获取').attr("disabled",true).addClass("nouse");
    			       
    					
    			        setTimeFn();
    			        e.stopPropagation();
    				}else {
    					pop_tip_open("red",msg);
    					passwordCode();
    				}
    			}else {
    				pop_tip_open("red",'发送验证码失败！');
    			}
    		},
    		error:function(XMLHttpRequest, textStatus, errorThrown){
    			pop_tip_open("red","发送验证码请求失败");
    		}
    	});
    	
    });

    //提交验证
    $("#submit_ver").on("click",function(e){
    	//验证验证码是否正确
    	var verifcode=$("#verifcode").val();
//    	var loginName=$("#loginName").val();
    	var id=$("#id").val();
    	if(verifcode ==null ||verifcode=="" ||verifcode == undefined){
    		pop_tip_open("blue",'验证码不可为空！');
    		return false;
    	}
        var jsonData={
        		verifcode:verifcode,
        		id:id,
        		loginName:loginName
        };
        var uBody = "sys/authentication/verifByVcode";
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
    					showThisVer("third_ver");
    			        e.stopPropagation();
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
    
    /**
     * 选择验证方式
     */
    $(".find-pwd-type .type").on("click",function(){
    	var findType = $(this).attr("attr");
    	var typeVar=findType==0?"手机":"邮箱";
    	$("#pOrMText").text(typeVar);
    	window.location.href="find_pwd.html?findType="+findType; 
    });
}); 

