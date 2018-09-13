/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-04-08
 */

/**
 * 此文件实现流程配置的批量修改可阅人
 */
var selectedFlowIds;
var deleteLocalDataText = "";
var readerDataGrid;
/**
 * 页面JS的执行入口处
 */
$(function () {
	selectedFlowIds = opener.selectedFlowIds;
	initReaderGridTable();
});


function changeOperteType(type){
	$("#addReaderDiv").hide();
	$("#resetReaderDiv").hide();
	$("#deleteReaderDiv").hide();
	
	if(type == "delete"){
		$("#deleteReaderDiv").show();
		queryFlowReaderList();
	}else if(type == "reset"){
		$("#resetReaderDiv").show();
	}else if(type == "add"){
		$("#addReaderDiv").show();
	}
}

function initReaderGridTable(){//
	readerDataGrid = $("#readerDataGrid");
	readerDataGrid.jqGrid({
		datatype : "local",
		scroll  : true,  scrollrows:true,
		colModel : [ {name:'id',    label:'ID', hidden:true}, 
		             {name:'flId',    label:'ID', hidden:true}, 
		             {name:'participantId', label:'ID', hidden:true}, 
		             {name:'flowName', label:'模板名称', width:'150', sortable:false, align:"left"},
		             {name:'participantType', label:'数据类型', width:'75', sortable:false, align:"left", formatter:typeFormatter},
		             {name:'participantScopeName', label:'数据范围', width:'75', sortable:false, align:"left"},
		             {name:'participantIdName', label:'可阅人名称',  width:'200', sortable:false, align:"left"}],
        multiselect:true,//定义是否可以多选
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$.xljUtils.addGridScroll();
        	$.xljUtils.resizeNestedGrid();
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
			$('#deleteDiv').find(".ui-jqgrid-bdiv").getNiceScroll().show();
			$.xljUtils.gridResizeFn();
	    }
	});
}

function typeFormatter(cellvalue, options, rowObject){
    if(cellvalue == "1"){//1:人员,2: 岗位,3:角色,4:相对参与人
        return "人员";        
    }else if(cellvalue == "2"){
    	return "岗位";
    }else if(cellvalue == "3"){
    	return "角色";
    }else if(cellvalue == "4"){
    	return "相对参与人";
    }else if(cellvalue == "5"){
    	return "通用角色";
    }	
}

function scopeFormatter(cellvalue, options, rowObject){
	 return getParticipantScopeText(cellvalue);
}

function queryFlowReaderList(){
	var keyword = $("#keyword").val();
	var paramData = {flowIds: selectedFlowIds.join(","), name: keyword};              
	var dataList;
	$.ajax({  
	       url: hostUrl+"flow/participant/queryFlowReaderList",
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
	var resultList = getReaderDataListForBatchModify(dataList);
	console.log("resultList="+JSON.stringify(resultList));
	readerDataGrid.jqGrid('clearGridData',false);//先清除旧数据
	for(var i=0; i<resultList.length; i++){
		var dataItem = resultList[i];
		if(deleteLocalDataText.indexOf(dataItem.id)>-1){
			console.log("该数据已经被选中为删除状态!!!!");
		}else{
			if(keyword && keyword.length>0){//如果关键字不为空
				if( dataItem.participantIdName.indexOf(keyword)>-1){
					readerDataGrid.jqGrid('addRowData', dataItem.id, dataItem);
				}
			}else{//关键字不起作用
				readerDataGrid.jqGrid('addRowData', dataItem.id, dataItem);
			}
			
		}
		
	}
}

/**
 * 关闭当前的子窗口
 */
function closeMe(){
	lastSel_rowId = "";
	window.opener=null;
	window.open('','_self');
	window.close();
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
			readerObjDto.flowIdText = deleteLocalDataText;
			deleteReaderByFormData(readerObjDto);
		}else{
			closeMe();
		}
	}else if(readerObjDto.operateType == "add") {//增加或重新设置
		readerObjDto.partcipantList = processReaderDataBeforeSumit( getTableAllTRTDData("one") );
		console.log("add --- partcipantList="+JSON.stringify(readerObjDto.partcipantList));
		readerObjDto.flowIdText = selectedFlowIds.join(",");
		if(readerObjDto.partcipantList && readerObjDto.partcipantList.length>0){
			addResetReaderFormData(readerObjDto);
		}else{
			closeMe();
		}
	}else if(readerObjDto.operateType == "reset") {//增加或重新设置
		readerObjDto.partcipantList = processReaderDataBeforeSumit( getTableAllTRTDData("two") );
		readerObjDto.flowIdText = selectedFlowIds.join(",");
		console.log("reset --- partcipantList="+JSON.stringify(readerObjDto.partcipantList));
		if(readerObjDto.partcipantList && readerObjDto.partcipantList.length>0){
			addResetReaderFormData(readerObjDto);
		}else{
			closeMe();
		}
	}
}

function processReaderDataBeforeSumit(partcipantList){
	var dataList = new Array();
	for(var idx=0; idx<partcipantList.length; idx++){
		var item = partcipantList[idx];
		var newItem = new Object();
		newItem.type = 3;
		//"participantType":"1","participantScope"
		if(item.participantType=="1" && item.participantScope == "11"){
			var partIdText = item.participantId;
			var dataArray = partIdText.split("&&");
			newItem.participantId = dataArray[0];
			newItem.paramValue = dataArray[1];
		}else{
			newItem.participantId = item.participantId;
			newItem.paramValue = item.paramValue;
		}
		newItem.participantType = item.participantType;
		newItem.participantScope = item.participantScope;
		newItem.sort = item.sort;
		dataList.push(newItem);
	}
	return dataList;
}

/**
 * 保存保单数据的处理方法
 */
function deleteReaderByFormData(readerObjDto){
	console.log("readerObjDto="+JSON.stringify(readerObjDto));
	$.ajax({
	       url: hostUrl+"flow/participant/deleteReaderByFormData",
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
	                   //closeMe();
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
	console.log("readerObjDto="+JSON.stringify(readerObjDto));
	$.ajax({
	       url: hostUrl+"flow/participant/addResetReaderFormData",
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

function deleteLocalReaderData(){
	var selectedDataIds = readerDataGrid.jqGrid('getGridParam','selarrrow');
	deleteLocalDataText += selectedDataIds.join(",")+",";
	console.log("deleteLocalDataText="+deleteLocalDataText);
	queryFlowReaderList();
}