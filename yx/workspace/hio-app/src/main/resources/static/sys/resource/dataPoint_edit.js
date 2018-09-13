/** 数据权限作用域列表
 * @author gyh
 * @date 2017-3-22
 */
//控制点ID
var pointId=window.opener.dataPointId;
//打开方式：0新增，1编辑。默认新增
var editType=window.opener.editType;
//作用域业务对象ID
var itemId=window.opener.itemId;
if(editType==1){
	$("#editTitel").text("修改");
}else{
	$("#editTitel").text("新增");
}


/**
 * 修改--初始化数据
 */
function initDataPoint(){
	var ubody = "sys/res/dataPoint/get/"+pointId;
	var uall = baseUrl+ubody;
	$.ajax({
		type:'GET',
		url:uall,
		dataType:'json',
//		contentType:'application/json',
//		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.success){
				if(data.result){	
					var item=data.result;
					$("#id").val(item.id);
					$("#itemId").val(item.itemId);
					$("#code").val(item.code);
					$("#name").val(item.name);
					if(item.type=='1'){//普通
						$("#dataPointFrom input[name='type'][value='1']").attr("checked",true);
						$("#url").attr("disabled",true);
						$("#dataPointFrom input[name='model']").attr("disabled",true);
					}else if(item.type=='2'){//引用
						$("#dataPointFrom input[name='type'][value='2']").attr("checked",true);
						$("#url").attr("disabled",false);
						$("#dataPointFrom input[name='model']").attr("disabled",false);
					}
					$("#busObjId").val(item.busObjId);
					$("#url").val(item.url);
					if(item.model=='1'){//树型
						$("#dataPointFrom input[name='model'][value='1']").attr("checked",true);
					}else if(item.model=='2'){//表格
						$("#dataPointFrom input[name='model'][value='2']").attr("checked",true);
					}
					$("#remark").val(item.remark);
				}
			}else{
				return data.msg
			}
		}
	})
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
 * 新增-保存数据
 */
function addSaveForm(){
	var dataPointArr= $("#dataPointFrom").serializeArray();
	var dataPointDto={};
	for(var i in dataPointArr){
		dataPointDto[dataPointArr[i].name]=dataPointArr[i].value;
	}
	dataPointDto.delflag=false;
	//所属业务对象ID
	dataPointDto.itemId=itemId;
	var uBody = "sys/res/dataPoint/save";
	var uAll = serviceUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(dataPointDto),
		type:'POST',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					alert('数据保存成功！');
					refresh();
				}else {
					alert(msg);
				}
			}
		}
	});

}

/**
 * TODO 修改-保存数据
 */
function editSaveForm(){
	var dataPointArr= $("#dataPointFrom").serializeArray();
	var dataPointDto={};
	for(var i in dataPointArr){
		dataPointDto[dataPointArr[i].name]=dataPointArr[i].value;
	}
	dataPointDto.delflag=false;
	//所属业务对象ID
	var uBody = "sys/res/dataPoint/update/"+pointId;
	var uAll = serviceUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(dataPointDto),
		type:'PUT',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					alert('数据保存成功！');
					refresh();
				}else {
					alert(msg);
				}
			}
		}
	});

}


/**
 * 切换控制点类型，控制输入框是够可编
 */
function changeType(){
	var checkedType=$("#dataPointFrom").find("input[name='type']:checked").val();
	if(checkedType=="1"){//普通
		$("#url").attr("disabled",true);
		$("#dataPointFrom input[name='model']").attr("checked",false);
		$("#dataPointFrom input[name='model']").attr("disabled",true);
	}else{//引入
		$("#url").attr("disabled",false);
		$("#dataPointFrom input[name='model']").attr("disabled",false);
	}

};

/**
 * 刷新控制点表格
 */
function refresh() {	
	var queryData2={
			delflag:false
	};
	window.opener.dataPointGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	window.opener.opener.dataItemGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	closeWin();
};
/*
 * 关闭页面
 */
function closeWin(){
	window.close();
}
/*
 * 初始化主键ID
 */
function initUuid(){
	var uBody = "sys/uuid/generator/getGuuid";
	var uAll = serviceUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#dataPointFrom").find("input[name='id']").val(guuid);
		}
	})
}

$(function () {
	//初始化数据
	if(editType==1){//编辑
		initDataPoint();
	}else{//新增
		initUuid();
	}
});





