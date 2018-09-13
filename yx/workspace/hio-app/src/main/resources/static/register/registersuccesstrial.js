var account;//账号
var password;//密码
var url='../login.html';//云平台登陆页
function closeBrowser() {
	window.RyJsBridge.callHandler(
		'closeBrowser'
	);
}
function setupWebViewJavascriptBridge(callback) {

	if (window.RyJsBridge) { return callback(RyJsBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

setupWebViewJavascriptBridge(function(bridge) {

	var uniqueId = 1
	bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
		log('ObjC called testJavascriptHandler with', data)
		var responseData = { 'Javascript Says':'Right back atcha!' }
		log('JS responding with', responseData)
		responseCallback(responseData)
	})
	$('.gologin').on('click',function (e) {
		e.preventDefault()
		bridge.callHandler(
			'closeBrowser'
		);
	});
})
$(function(){
	var old = $.xljUtils.getUrlParam("old");
	var ld =  $.xljUtils.getUrlParam("ld");
	//获取url参数并赋值
	$('#account').text($.xljUtils.getUrlParam("ac"));
	$('#password').text($.xljUtils.getUrlParam("pd"));
	if(old&&old=='1'){
      $('#msgContent').text("你已注册过，试用剩余"+ld+"天.");
	}else{
		$('#msgContent').text("恭喜获得30天免费试用资格.");
	}
	 //绑定登陆跳转
	// var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
	// callbackButton.innerHTML = '关闭页面'
	// callbackButton.setAttribute("id","closePageButton")
	// callbackButton.id = "closePageButton";
	// callbackButton.onclick = function(e){
	// 	e.preventDefault();
	// 	closeBrowser();
	// }
	 $('.gologin').on('click',function () {
		 // window.open(url,'_self');
		 // window.opener=null;
		 // window.open('','_self');
		 // window.close();
		 e.preventDefault();
		 closeBrowser();
	 });
	});

