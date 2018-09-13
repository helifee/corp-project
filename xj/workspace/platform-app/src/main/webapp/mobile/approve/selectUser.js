
$(function() {
	var sessionSign = 0;
	//拦截所有ajax请求url，为请求加上session标识
	jQuery.ajaxSetup({
		beforeSend:function (xhr) {
			var key = "mobile_tendCode";
			var tendCode = window.localStorage.getItem(key);
//			var tendCode = $.getUrlParam("tendCode");
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
mui.init({
	swipeBack:true //启用右滑关闭功能
});
//获取页面参数
//0单选，1多选
var isMuti = $.getUrlParam("isMuti");
if(!isMuti){
	isMuti = 0;//默认单选
}
var templateId = isMuti=="1"?"checkboxTemplate":"radioTemplate";
//已选择的用户
var selectArray=new Array();
var backUrl = document.referrer;//上个页面url
var index = backUrl.indexOf("approve_detail.html");
if(index >=0){
	var msgId = $.getUrlParam("msgId");
	var isback = $.getUrlParam("isback");
	var opCode = $.getUrlParam("opCode");
	var tabIdx = $.getUrlParam("tabIdx");
	var isMuti = $.getUrlParam("isMuti");
	var key = "mobile_tendCode";
	var tendCode = window.localStorage.getItem(key);
	backUrl = backUrl.substring(0,(index+19));
	backUrl += "?msgId="+msgId + "&isback=YES" + "&opCode="+opCode + "&tabIdx="+tabIdx + "&isMuti="+isMuti ;
	if(tendCode){
		backUrl += "&tendCode="+tendCode;
	}
}
var temp = "selUsers_";
//点击确定按钮
$("#confirm").bind("tap",function(){
	if(isMuti == 1){//多选
		for(var i=0;i<selectArray.length;i++ ){
			var key = temp + selectArray[i].value;
			if(!window.localStorage.getItem(key)){
				window.localStorage.setItem(key,selectArray[i].name);
			}
		}
	}else{//单选
		if(selectArray.length > 0){
			clearLocal(temp);
			var key = temp + selectArray[0].value;
			window.localStorage.setItem(key,selectArray[0].name);
		}
	}
	
	setTimeout(function() {
		window.location.href = backUrl;
	},1000);
});
//事件代理
$("#userTable").delegate("input","change",function(){
	var name = $(this).attr("data-name");
	var value = $(this).val();
	if($(this).is(":checked")){
		var item={name:name, value:value};
		selectArray.push(item);
	}else{
		//删除一个元素
		for(var i=0;i<selectArray.length;i++){
			if(selectArray[i].name==name){
				selectArray.splice(i, 1);
			}
		}
	}
});

//点击取消按钮
$("#cancel").bind("tap",function(){
	setTimeout(function() {
		window.location.href = backUrl;
	},1000);
});

//输入框的事件
$("#search").bind('input propertychange', function(data) {
	var $this=$(this);
	var keyword = $this.val();
	if(keyword && keyword.length>0){
		$.ajax({
			type: "POST", contentType: 'application/json', dataType: 'JSON',
			url: path + "/sys/org/user/queryUserAndPostsByUname",
			data: JSON.stringify({keyword: keyword}),
			success:function(msg){
				var dataList = msg.result;
				if(dataList && dataList.length>0){
					var frag="";
					for(var i=0;i<dataList.length;i++){
						var itemData = dataList[i];
						itemData.id=itemData.uId;
						var pName = itemData.pName;
						if(!isNaN(pName) || !pName){
							pName = "";
						}
						frag+=template(templateId,{user:itemData, pName: pName});
					}
					$("#userTable").empty().append(frag);
				}
			}
		});// end $.ajax({
	}
});

//初始化查询本部门用户
function initUserList(){}

//清除localStorage缓存
function clearLocal(localTemp){
	var localLength=window.localStorage.length;
	var name;
	var remove=[];
	for(var i=0; i<localLength; i++ ){
		name=window.localStorage.key(i);
		if(name && name.indexOf(localTemp)>=0){
			remove.push(name);
		}
	}
	for(var i=0; i<remove.length; i++ ){
		window.localStorage.removeItem(remove[i]);
	}
}
