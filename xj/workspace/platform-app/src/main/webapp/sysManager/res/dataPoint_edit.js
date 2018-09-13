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
	$("title").html("控制点-修改");
	$("#editFormTitel").text("修改");
}else{
	$("title").html("控制点-新增");
	$("#editFormTitel").text("新增");
}


/**
 * 修改--初始化数据
 */
function initDataPoint(){
	var ubody = "sys/res/dataPoint/get/"+pointId+"?time="+Math.random();
	var uall = hostUrl+ubody;
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
				pop_tip_open("red",data.msg);
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化控制点数据请求失败");
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
	var uAll = hostUrl + uBody;
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
					//pop_tip_open("blue",'数据保存成功！');
					refresh();
				}else {
					pop_tip_open("red",msg);
				}
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});

}

/**
 * 修改-保存数据
 */
function editSaveForm(){
	var dataPointArr= $("#dataPointFrom").serializeArray();
	var dataPointDto={};
	for(var i in dataPointArr){
		dataPointDto[dataPointArr[i].name]=dataPointArr[i].value;
	}
	dataPointDto.delflag=false;
	dataPointDto.url=$("#url").val();
	if(dataPointDto.model == undefined ){
		dataPointDto.model="";
	}
	//所属业务对象ID
	var uBody = "sys/res/dataPoint/update/"+pointId;
	var uAll = hostUrl + uBody;
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
					//pop_tip_open("blue",'数据保存成功！');
					refresh();
				}else {
					pop_tip_open("red",msg);
				}
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});

}


/**
 * 切换控制点类型，控制输入框是够可编
 */
function changeType(){
	var checkedType=$("#dataPointFrom").find("input[name='type']:checked").val();
	if(checkedType=="1"){//普通
		//不可编辑
		$("#url").attr("disabled",true);
		$("#url").val("");
		$("#dataPointFrom input[name='model']").attr("checked",false);
		$("#dataPointFrom input[name='model']").attr("disabled",true);
		//不校验
		$("#dataPointFrom input[name='model']").rules("remove");
		$("#url").rules("remove");
		//去除样式
		$("#url").parent('td').removeClass('has-error');
	}else{//引入
		//可编辑
		$("#url").attr("disabled",false);
		$("#dataPointFrom input[name='model']").attr("disabled",false);
		//校验
		$("#url").rules("add", { required: true,messages: { required: "业务对象url不能为空"} });
		$("#dataPointFrom input[name='model']").rules("add", { required: true,messages: { required: "打开方式不能为空"} });
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
/**
 * 关闭页面
 */
function closeWin(){
	window.close();
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
			$("#dataPointFrom").find("input[name='id']").val(guuid);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化主键ID请求失败");
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
	
	$("#saveFormBtn").on('click',function(){
		  $("#dataPointFrom").attr("data-validate-success","saveForm()");
		  $("#dataPointFrom").submit();
		});
});





