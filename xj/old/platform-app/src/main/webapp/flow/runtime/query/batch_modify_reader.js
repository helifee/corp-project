/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-04-09
 */

/**
 * 此文件实现流程的代理的增加或修改的操作
 */

var dataTypeArray = ["人员", "岗位", "组织"];
var defaultDataType = "1";
var deleteLocalDataText = "";
var instanceIds;
var readerDataGrid;
$(function () {
	instanceIds = opener.selectedIds;
	if(!instanceIds && $.getUrlParam('instanceId') != null) {
		instanceIds = [$.getUrlParam('instanceId')];
	}
	initReaderGridTable();
	/*$("#modalWindow").on('hide.bs.modal',function () {
		$("#modal-body").find('.ui-jqgrid-bdiv').getNiceScroll().hide();
    });
	$("#modalWindow").on('shown.bs.modal',function () {
		$("#modal-body").find('.ui-jqgrid-bdiv').getNiceScroll().show();
    });*/
});


/**
 * 通用的数据查询接口
 * @param setttingId
 * @param urlText
 * @returns
 */
function queryInstanceReaderList(){
	var keyword = $("#keyword").val();
	var paramData = {instanceIds: instanceIds.join(","), name: keyword};              
	var dataList;
	$.ajax({  
	       url: hostUrl+"flow/instanceAccessible/queryInstanceReaderList",
	       data: JSON.stringify(paramData),
	       type: 'POST',
	       async: false,
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success: function (resultData ) {
	           if(resultData) {
	               dataList = resultData.result;
	           }
	       }
	});
	readerDataGrid.jqGrid('clearGridData',false);//先清除旧数据
	for(var i=0; i<dataList.length; i++){
		var dataItem = dataList[i];
		var composedId = dataItem.instanceId+"&&"+dataItem.accessibleId;
		if(deleteLocalDataText.indexOf(composedId)>-1){
			console.log("该数据已经被选中为删除状态!!!!");
		}else{
			readerDataGrid.jqGrid('addRowData', composedId, dataItem);
		}
		
	}
}


/**
 * 执行提交数据的操作
 */
function doSaveFormAction(){
	var readerObjDto = {};
	readerObjDto.operateType = $("input[type='radio'][name='operateType']:checked").val();
	if(readerObjDto.operateType == "delete"){//删除
		var deleteDataText = "";
		if(deleteLocalDataText && deleteLocalDataText.length>10){
			readerObjDto.instanceIdText = deleteLocalDataText;
			//实际上是var composedId = dataItem.instanceId+"&&"+dataItem.accessibleId+"__";
			deleteReaderByFormData(readerObjDto);
		}else{
			closeMe();
		}
	}else if(readerObjDto.operateType == "add") {//增加或重新设置
		readerObjDto.readerList = getTableAllTRTDData("addReader");
		readerObjDto.instanceIdText = instanceIds.join(",");
		if(readerObjDto.readerList && readerObjDto.readerList.length>0){
			addResetReaderFormData(readerObjDto);
		}else{
			closeMe();
		}
	}else if(readerObjDto.operateType == "reset") {//增加或重新设置
		readerObjDto.readerList = getTableAllTRTDData("resetReader");
		readerObjDto.instanceIdText = instanceIds.join(",");
		if(readerObjDto.readerList && readerObjDto.readerList.length>0){
			addResetReaderFormData(readerObjDto);
		}else{
			closeMe();
		}
	}
}

/**
 * 保存保单数据的处理方法
 */
function deleteReaderByFormData(readerObjDto){
	$.ajax({
	       url: hostUrl+"flow/instanceAccessible/deleteReaderByFormData",
	       data: JSON.stringify(readerObjDto),
	       type: 'POST',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success:function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               if(successFlag) {
	                   pop_tip_open("green","数据保存操作成功！");
	                   closeMe();
	               }else {
	            	   pop_tip_open("red","数据保存操作失败！");
	               }
	           }
	       }
	});
}

/**
 * 保存保单数据的处理方法
 */
function addResetReaderFormData(readerObjDto){
	$.ajax({
	       url: hostUrl+"flow/instanceAccessible/addResetReaderFormData",
	       data: JSON.stringify(readerObjDto),
	       type: 'POST',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success:function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               if(successFlag) {
	                   pop_tip_open("green","数据保存操作成功！");
	                   closeMe();
	               }else {
	            	   pop_tip_open("red","数据保存操作失败！");
	               }
	           }
	       }
	});
}

/**
 * 关闭按钮的点击事件
 */
function closeMe(){
	window.opener=null;
	window.open('','_self');
	window.close();
}

/**
 * 岗位的选择范围删除处理事件
 */
function deleteReader() {
	monitoredGrid.jqGrid("delRowData", monitoredLastSel); 
}

function checkDataItemExistInArray(checkItem,showDataArray){
	var existFlag = "NO";
	for(var idx=0; idx<showDataArray.length; idx++){
		var item = showDataArray[idx];
		if(item.id == checkItem.id){
			existFlag = "YES";
			break;
		}
	}
	return existFlag;
}

function initReaderGridTable(){//
	//var outerWidth= $("#dataGridTD").outerWidth()-15;  
	readerDataGrid = $("#readerDataGrid");
	readerDataGrid.jqGrid({
		datatype : "local",
		scroll  : true,  scrollrows:true,
		colModel : [ 
		             {name:'instanceId',    label:'ID', hidden:true}, 
		             {name:'accessibleId',    label:'ID', hidden:true}, 
		             {name:'instanceName', label:'实例名称', sortable:false, align:"left"},
		             {name:'accessibleName', label:'可阅人名称',  sortable:false, align:"left"}],
        multiselect:true,//定义是否可以多选
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	//$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
        	//$('.ui-state-default.ui-jqgrid-hdiv').css({'overflow':'hidden','margin-top':'8px'});
        	$.xljUtils.addGridScroll();
        	$.xljUtils.resizeNestedGrid();
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
			$('#deleteDiv').find(".ui-jqgrid-bdiv").getNiceScroll().show();
			$.xljUtils.gridResizeFn();
	    }
	});
	//monitorGrid.jqGrid("setGridWidth", outerWidth, true);
	//$.xljUtils.resizeNestedGrid();
	//$.xljUtils.addGridScroll();
}
////1-人员 2-岗位 3-角色
function typeFormatter(cellvalue, options, rowObject) {
    if (cellvalue =="3") {
        return "角色";
    }else if (cellvalue =="2") {
        return "岗位";
    }else {
        return "人员";
    }
}


function changeOperteType(type){
	$("#addReaderDiv").hide();
	$("#resetReaderDiv").hide();
	$("#deleteReaderDiv").hide();
	
	if(type == "delete"){
		$("#deleteReaderDiv").show();
		
		//从管理员查询页面过来(flow.js)
		if($.getUrlParam('instanceId') != null) {
			instanceIds = [$.getUrlParam('instanceId')];
		}
		queryInstanceReaderList();
	}else if(type == "reset"){
		$("#resetReaderDiv").show();
	}else if(type == "add"){
		$("#addReaderDiv").show();
	}
}

function deleteLocalReaderData(){
	var selectedDataIds = readerDataGrid.jqGrid('getGridParam','selarrrow');
	deleteLocalDataText += selectedDataIds.join("__");
	queryInstanceReaderList();
}
