/** 
 * 数据权限作用域列表
 * @author gyh
 * @date 2017-3-22
 */

//业务对象ID
var dataItemId=window.opener.dataItemId;
//打开方式：0新增，1编辑
var editType=window.opener.editType;
//console.log(editType);
if(editType==1){
	$("title").html("数据权限-修改");
	$("#editFormTitel").text("修改");
}else{
	$("title").html("数据权限-新增");
	$("#editFormTitel").text("新增");
}

/**
 * 初始化数据
 */
function initDataItem(){
	var ubody = "sys/res/dataItem/queryDataItemAndPointList";
	var uall = hostUrl+ubody;
	var postdata ={
			delflag:false,
			id:dataItemId
	};
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.success){
				if(data.result){	
					var item=data.result[0];
					$("#appId").append("<option value='"+item.appId+"'>"+item.appName+"</option>");
					$("#ctrlCode").val(item.ctrlCode);
					$("#ctrlName").val(item.ctrlName);
					$("#itemCode").val(item.itemCode);
					$("#itemName").val(item.itemName);
					$("#remark").val(item.remark);
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化数据请求失败");
		}
	})
}

/**
 *  修改-保存修改数据
 */
function editSaveForm(){
	var resourceArr= $("#dataItemFrom").serializeArray();
	var dataItemDto={};
	for(var i in resourceArr){
		dataItemDto[resourceArr[i].name]=resourceArr[i].value;
	}
	dataItemDto.delflag=false;
	dataItemDto.id=dataItemId;
	var uBody = "sys/res/dataItem/checkRepeat";
	var uAll = hostUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(dataItemDto),
		type:'POST',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					//保存数据
					var uBody = "sys/res/dataItem/update/"+dataItemId;
					var uAll = hostUrl + uBody;
					$.ajax({
						url:uAll,
						data:JSON.stringify(dataItemDto),
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
									add();
								}else {
									pop_tip_open("red",msg);
								}
							}else {
								pop_tip_open("red","数据保存失败");
							}
						},error:function(XMLHttpRequest, textStatus, errorThrown){
							pop_tip_open("red","数据保存请求失败");
						}
					});
				}else {
					pop_tip_open("red",msg);
				}
			}else {
				pop_tip_open("red","数据保存失败");
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});
}

/**
 *  新增-保存新增数据
 */
function addSaveForm(){
	var resourceArr= $("#dataItemFrom").serializeArray();
	var resourceDto={};
	for(var i in resourceArr){
		resourceDto[resourceArr[i].name]=resourceArr[i].value;
	}
	resourceDto.delflag=false;

	var uBody = "sys/res/dataItem/saveDataItem";
	var uAll = hostUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(resourceDto),
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
					window.opener.dataItemId=resourceDto.id;
					add();
				}else {
					pop_tip_open("red",msg);
				}
			}else {
				pop_tip_open("red","数据保存失败");
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});
}
/**
 * 保存-新增或编辑保存
 */
function saveForm(){
	if(editType==1){//编辑
		editSaveForm();
	}else{//新增
		addSaveForm();
	}
}
/**
 * 刷新表格
 */
function add() {	
	var queryData2={
			delflag:false
	};
	window.opener.dataItemGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	closeWin();
};

/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}

/**
 * 初始化系统下拉框数据
 */
function getAppData(){
	var ubody = "sys/res/appSystem/queryList";
	var uall = hostUrl+ubody;
	var postdata ={
			appDelFlag:"0",
			appStatus:"1"
	};
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.success){
				if(data.result){	
					var appList=data.result;
					if(editType==0){
						//上级选中app
						var selAppId=window.opener.selAppId;
						var selAppName=window.opener.selAppName;
						if(selAppId ==undefined || selAppName ==undefined||selAppId =="" || selAppId ==null || selAppName =="" || selAppName ==null ){
							
						}else{
							$("#appId").append("<option value='"+selAppId+"'>"+selAppName+"</option>")
							
						}
						for(var o in appList){
							$("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
						}
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化系统下拉框数据请求失败");
		}
	})
}
/**
 * 切换系统下拉框
 */
function selectAppForm(ele){
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.attr("value", "");
	parentIdName.attr("value", "");
}

/**
 * 初始化主键ID
 */
function initUuid(){
	var uBody = "generator/getGuuid"+"?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#dataItemFrom").find("input[name='id']").val(guuid);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化主键ID请求失败");
		}
	})
}

/**
 * 初始化数据
 */
$(function () {
	//初始化系统下拉框
	getAppData();
	//初始化数据
	if(editType==1){//编辑
		initDataItem();
	}else{//新增
		initUuid();
	}
	$("#saveFormBtn").on('click',function(){
		  $("#dataItemFrom").attr("data-validate-success","saveForm()");
		  $("#dataItemFrom").submit();
		});
});





