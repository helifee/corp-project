/** 
 * 数据权限作用域列表
 * @author add by shiyong , updata by gyh
 * @date 2017-3-23
 */
//打开方式：0新增，1编辑
var editType=window.opener.editType;
if(editType==1){
	$("#editFormTitel").text("修改");
	$("title").html("邮件服务器-修改");
}else{
	$("#editFormTitel").text("新增");
	$("title").html("邮件服务器-新增");
}

/**
 * 初始化主键ID
 */
function initUuid(){
	var uBody = "sys/uuid/generator/getGuuid"+"?time="+Math.random();
	var uAll = serviceUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#mailServerForm").find("input[name='id']").val(guuid);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化主键ID请求失败");
		}
	})
}
/**
 * 新增--数据保存
 */
function addSaveForm(ifNew){
	var appArr= $("#mailServerForm").serializeArray();
	var appDto={};
	for(var i in appArr){
		if(appArr[i].name=='isDefault'){
			var isdefault=appArr[i].value;
			isdefault=isdefault==1?true:false;
			appDto[appArr[i].name]=isdefault
		}else{
			appDto[appArr[i].name]=appArr[i].value;
		}
	}
	appDto.delflag=false;
	var uBody = "sys/notice/mailServer/save";
	var uAll = serviceUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(appDto),
		type:'POST',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					//pop_tip_open("blue",'数据保存成功！');
					refreshGrid(result.id);
					if(ifNew==1){//保存并新增
						refreshWin();
					}else{
						closeWin();
					}
				}else {
					pop_tip_open("red",msg);
				}
			}else {
				pop_tip_open("red",'数据保存失败！');
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});

}
/**
 * 刷新业务系统表格
 */
function refreshGrid(id) {
	var queryData2={
			delflag:false
	};
	window.opener.mailServerGridObj.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	if(id !=null &&id !=""){
		window.opener.mailServerOnId=id;
	}
};
/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}

/**
 * 编辑页面-初始化服务器信息
 */
function getMailServerById(serverId){
	var appId = window.opener.updateAppId;
	var uBody = "sys/notice/mailServer/get/"+serverId+"?time="+Math.random();
	var uAll = serviceUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#mailServerForm").find("input[name='id']").val(data.result.id);
			$("#mailServerForm").find("input[name='code']").val(data.result.code);
			$("#name").val(data.result.name);
			$("#host").val( data.result.host);
			$("#displayName").val(data.result.displayName);
			$("#username").val(data.result.username);
			$("#password").val(data.result.password);
			if(data.result.isDefault == "1"){
				$("input[name='isDefault'][value=1]").attr("checked",true); 
			}else{
				$("input[name='isDefault'][value=0]").attr("checked",true); 
			}
			$("#remark").val(data.result.remark);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化服务器信息请求失败");
		}
	})
}
/**
 * 编辑--保存
 */
function editSaveForm(ifNew){
	var appArr= $("#mailServerForm").serializeArray();
	var appDto={};
	for(var i in appArr){
		if(appArr[i].name=='isDefault'){
			var isdefault=appArr[i].value;
			isdefault=isdefault==1?true:false;
			appDto[appArr[i].name]=isdefault
		}else{
			appDto[appArr[i].name]=appArr[i].value;
		}
	}
	appDto.delflag=false;

	var appId = $('#id').val(); 
	var uBody = "sys/notice/mailServer/update/"+appId;
	var uAll = serviceUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(appDto),
		type:'PUT',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					//pop_tip_open("blue",'数据保存成功！');
					refreshGrid(appId);
					if(ifNew==1){//保存并新增
						refreshWin();
					}else{
						closeWin();
					}
				}else {
					pop_tip_open("red",msg);
				}
			}else {
				pop_tip_open("red",'数据保存失败！');
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});
}

/**
 * 保存-新增或编辑保存
 * @param ifNew:0只保存，1保存并新增
 */
function saveForm(ifNew){
	if(editType==1){//编辑
		editSaveForm(ifNew);
	}else{//新增
		addSaveForm(ifNew);
	}
}
/**
 * 初始化数据
 */
$(function () {
	$("#saveBtn").on('click',function(){
		$("#mailServerForm").attr("data-validate-success","saveForm(0)");
		$("#mailServerForm").submit();
	});

	if(editType==1){
		var updateMailServerId=window.opener.updateMailServerId;
		getMailServerById(updateMailServerId);
	}else{
		initUuid();
	}
});


