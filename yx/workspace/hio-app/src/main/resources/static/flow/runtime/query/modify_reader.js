/**
 * 修改可阅人
 */
var readerDataGrid;//

$(function () {
	instanceId = $.getUrlParam("instanceId");
	initReaderGridTable();
});

/**
 * 执行提交数据的操作
 */
function doSaveFormAction(){
	var readerObjDto = {};
	readerObjDto.operteType = $("input[type='radio'][name='operteType']:checked").val();
	var allReaderData = readerDataGrid.getRowData();
	var readerList = new Array();
	$.each(allReaderData, function(index, item){
		delete item.type;
		readerList.push(item);
	})
	readerObjDto.readerList = readerList;
	saveFormData(readerObjDto);
}

/**
 * 保存保单数据的处理方法
 */
function saveFormData(readerObjDto){
	var type = readerObjDto.operteType;
	$.ajax({
	       url: serviceUrl+"flow/instance/updateReader/"+type+"/"+instanceId,
	       data: JSON.stringify(readerObjDto.readerList),
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
	readerDataGrid.jqGrid("delRowData", readerLastSel); 
}

/**
 * 岗位的选择范围选择处理事件
 */
$('.singleArray-first').xljSingleArraySelector({
    selectorTypeArray:['person','post'],
	saveCallback: function (treeNodes) {
	   treeNode = treeNodes[0];
       var type = returnCommonTypeMainData(treeNode);
       var item = {id: treeNode.id, type: type, accessibleName: treeNode.name};
       
       var haveShowDataArray = readerDataGrid.jqGrid().getRowData();
	   var existFlag = checkDataItemExistInArray(item, haveShowDataArray);
	   if(existFlag == "NO"){
		   readerDataGrid.jqGrid('addRowData', haveShowDataArray.length + 1, item);
	   }
    }
});


function returnCommonTypeMainData(nodeData){
	//1-人员 2-岗位 3-角色
	var retType =  nodeData.mold;
    if(!retType || retType==null || retType==undefined){
 	   retType = nodeData.type;
    }
    var type = "1";
    if(retType == "person" || retType == "user"){
 	   type = "1";
    }else if(retType == "post"){
 	   type = "2";
    }else if(retType == "role"){
 	   type = "3";
    }
    return type;
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
	readerDataGrid = $("#readerDataGrid");
	readerDataGrid.jqGrid({
		datatype : "local",
		scroll  : true,  scrollrows:true,
		colModel : [ 
            {name:'instanceId',    label:'ID', hidden:true}, 
            {name:'accessibleId',    label:'ID', hidden:true}, 
            {name:'type', label:'类型', align:"center", formatter: typeFormatter},
            {name:'accessibleName', label:'可阅人名称',  sortable:false, align:"left"}],
        onSelectRow: function (rowid, status) {//被选中的状态
        	readerLastSel = rowid;
        },
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
        	$.xljUtils.resizeNestedGrid();
        	$.xljUtils.addGridScroll();
	    }
	});
}
//1-人员 2-岗位 3-角色
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
	if(type == "delete"){
		queryInstanceReaderList();
	} else {
		readerDataGrid.jqGrid('clearGridData',false);
	}
}

function queryInstanceReaderList(){
	var paramData = {instanceIds: $.getUrlParam("instanceId")};              
	var dataList;
	$.ajax({  
	       url: serviceUrl+"flow/instanceAccessible/queryInstanceReaderList",
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
		readerDataGrid.jqGrid('addRowData', composedId, dataItem);

	}
}