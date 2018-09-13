
$(function() {
	var sessionSign = 0;
	//拦截所有ajax请求url，为请求加上session标识
	jQuery.ajaxSetup({
		beforeSend:function (xhr) {
			var key = "mobile_tendCode";
			var tendCode = window.localStorage.getItem(key);
			if(tendCode){
				sessionSign = tendCode;
				var reg = /(\?_s=)|(&_s=)/g;
				var paramStart = this.url.indexOf('?');
				if(paramStart>=0){

					if(!reg.test(this.url)){
						this.url = this.url+'&_s='+sessionSign;
					}
				}else{
					if(!reg.test(this.url)){
						this.url = this.url+'?_s='+sessionSign;
					}
				}
			}

		}
	});
	//初始化选中人员
	initUsers();
});
//获取浏览器参数
$.getUrlParam = function(name){
	var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search).substr(1).match(reg);
	if (r!=null ){
		return unescape(r[2]);
	}
	return null;
};
var curWwwPath = window.document.location.href;
var pathName =  window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPaht = curWwwPath.substring(0,pos);
var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
path = localhostPaht + projectName;
var closeFlag = false;
var userArr = new Array();
//显示选中人员
var temp = "selUsers_";
function initUsers(){
	var key,value;
	var $ul_users = $("#ul_users");
	var localdata = window.localStorage;
	for(var i=0;i<localdata.length;i++ ){
		key = localdata.key(i);;
		if(key.indexOf(temp)>=0){
			var user = {};
			value = localdata.getItem(key);
			user.id = key.replace(temp,"");
			user.name = value;
			userArr.push(user);
			var li_user = $("<li id='"+ key +"'> <span class='del_li'> <span class='close_offset' onclick=\"removeLi('"+ key +"');\"></span></span>"+ value +"</li>");
			$ul_users.append(li_user);
		}
	}
}
//删除人员
function removeLi(key){
	window.localStorage.removeItem(key);
	$("#"+key).remove();
}

//打开选人页面
function openUser(){
	window.location.href = "selectUser.html?isMuti=1";
}
//传阅
function passAndRead(){
	var key = "mobile_instanceId" ;
	var instanceId = window.localStorage.getItem(key);
	var urlText = "/flow/instance/passAndRead/" + instanceId;
	if(userArr.length <=0){
		alert("请选择传阅人员");
		return;
	}
	$.ajax({
		url: path + urlText,
		data:JSON.stringify(userArr),
		type:'POST',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				if(successFlag) {
					alert_close("传阅成功!");
				}else {
					alert(resultData.msg);
				}
			}
		}
	});
}

//重写alert方法
function alert(text){
	$("#alertTitle").text(text);
	$("#alertName").show();
	$('body').css("overflow",'hidden');
}
function alert_close(text){
	$("#alertTitle").text(text);
	$("#alertName").show();
	$('body').css("overflow",'hidden');
	closeFlag = true;
}
function hideBtn(){
	$("#alertName").hide();
	$('body').css("overflow",'auto');
	if(closeFlag){
		var return_url=window.localStorage.getItem("source_url");
		if(!return_url){
			// window.close();//如果上个页面为空，关闭当前页，但是kk移动端此代码不管用
		}else{
			window.location.href = return_url;
		}
	}
}
