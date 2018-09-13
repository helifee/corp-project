var account;//账号
var password;//密码
var url='../login.html';//云平台登陆页
$(function(){
	
	//获取url参数并赋值
	$('#account').text($.xljUtils.getUrlParam("ac"));
	$('#password').text($.xljUtils.getUrlParam("pd"));
	 //绑定登陆跳转
	 $('.gologin').on('click',function () {
		 window.open(url,'_self');
	 });
	});

