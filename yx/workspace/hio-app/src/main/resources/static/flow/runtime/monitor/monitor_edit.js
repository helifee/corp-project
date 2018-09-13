/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-04-09
 */

/**
 * 此文件实现流程的代理的增加或修改的操作
 */

var monitorId;
var chooseType = "";//monitor/ monitored /flow-选择流程模板
var chooseArray = new Array(); 
var monitorGrid, monitoredGrid, flowGrid;//分别对应监控人、被监控人和模板结果数据的JqGrid数据
var monitorLastSel, monitoredLastSel, flowLastSel;

//切换流程监控的类型   放到自己的js文件里
var eleObjs = {
    1:{
        "show":["monitorPoint1","monitorPerson"],
        "hide":["monitorflow","monitorPoint2","monitorPoint3"]
    },
    2:{
        "show":["monitorPoint2","monitorflow"],
        "hide":["monitorPerson","monitorPoint1","monitorPoint3"]
    },
    3:{
        "show":["monitorPoint3"],
        "hide":["monitorPerson","monitorPoint1","monitorPoint2","monitorflow"]
    }
}

function activeType(type) {
    var index = parseInt(type);
    for(var i in eleObjs){
        if(index==i){
            var showObj = eleObjs[index]["show"];
            var hideObj = eleObjs[index]["hide"];
            for(var s in showObj){
                $("#"+showObj[s]).show();
            }
            for(var h in hideObj){
                $("#"+hideObj[h]).hide();
            }
        }
    }
}

//点击radio事件
$("input[name='monitorType']").on("click",function(){
    activeType($(this).val());
});

$(function () {
	initDatetimepicker();
	//获取两个参数
	monitorId = $.getUrlParam("monitorId");
	$("#id").val(monitorId);
	initThreeGridTable();
	if("-1"!= monitorId){
		queryMonitorObject();
		$("#idTitle").html("流程监控信息-修改");
		$("#titleDiv").html("流程监控信息-修改");
	}else{
		$("#idTitle").html("流程监控信息-新增");
		$("#titleDiv").html("流程监控信息-新增");
	}
	//$('html').niceScroll().show().resize();//重置纵向滚动条
	
	 $("#modalWindow").on('hide.bs.modal',function () {
	 	$("#modal-body").find('.ui-jqgrid-bdiv').getNiceScroll().hide();
     });
	 $("#modalWindow").on('shown.bs.modal',function () {
	 	$("#modal-body").find('.ui-jqgrid-bdiv').getNiceScroll().show().resize();
     });
 $(window).resize(function() {
    // $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($("#monitorDataGrid").height());
  	$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(".grid-container").width()-2, true);

 })

});

//初始化日期控件
function initDatetimepicker(){
  $('.form_datetime').datetimepicker({
      language:  'zh-CN',
      format: 'yyyy-mm-dd hh:ii:ss',
      weekStart: 1,
      todayBtn:  1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      forceParse: 0,
      showMeridian: 1,
	  pickerPosition:'top-right'
  });
}

/**
 * 查询所对应的监控对象
 */
function queryMonitorObject(){
	$.ajax({
	       url: serviceUrl+"flow/monitorSetting/get/"+monitorId+"?t="+ new Date().getTime(),
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   setFormData(dataObj);
	       }
	});
}

/**
 * 设置Form表单的元素的值
 * @param dataObj
 */
function setFormData(dataObj){
	var setttingId = dataObj.id;
	//根据Value值设置Radio为选中状态 
	$("#concurrencyVersion").val(dataObj.concurrencyVersion);//并发版本
	$("input[name='monitorType'][value='"+dataObj.monitorType+"']").attr("checked",true);
	
	activeType(dataObj.monitorType);
	
	$("input[name='status'][value='"+dataObj.status+"']").attr("checked",true);
	$("#name").val(dataObj.name);//名称
	$("#startDate").val(dataObj.startDate);
	$("#status").val(dataObj.status);
	$("#endDate").val(dataObj.endDate);
	$("#remark").val(dataObj.remark);//说明
//	//设置多个checkbox的选中值
//	var valueArray = dataObj.monitorPoint.split(",");
//	for(var idx=0; idx<valueArray.length; idx++){
//		var value = valueArray[idx];
//		$("input[name='monitorPoint'][value='"+value+"']").attr('checked',true);
//	}
	
	var monitorText = "";
	var monitorId = "";
	$.each(dataObj.monitorList, function(index, item) {
		if(!window.monitor) {
			window.monitor = new Array();
		}
		window.monitor.push(item);
		if(monitorText == "") {
			monitorText = item.name;
			monitorId = item.id;
		} else {
			monitorText = monitorText + ", " + item.name;
			monitorId = monitorId + "," + item.id;
		}
	});
	$('#monitorArea').val(monitorText);
	$('#monitorId').val(monitorId);
	
	var monitoredText = "";
	var monitoredId = "";
	$.each(dataObj.monitoredList, function(index, item) {
		if(!window.monitored) {
			window.monitored = new Array();
		}
		window.monitored.push(item);
		if(monitoredText == "") {
			monitoredText = item.name;
			monitoredId = item.id;
		} else {
			monitoredText = monitoredText + ", " + item.name;
			monitoredId = monitoredId + "," + item.id;
		}
	});
	$('#monitoredArea').val(monitoredText);
	$('#monitoredId').val(monitoredId);
	
	var flowText = "";
	$.each(dataObj.flowList, function(index, item) {
		chooseArray.push(item);
		if(flowText == "") {
			flowText = item.flName;
		} else {
			flowText = flowText + ", " + item.flName;
		}
	});
	$('#flowArea').val(flowText);
	
	//初始化检查点
	if(dataObj.monitorType == '1'){
		$.each(dataObj.pointList, function(index, item){
			$('#monitorPoint1 input[name="monitorPoint"][value="' + item.id + '"]').attr('checked',true);
			$('#monitorPoint1 input[name="point' + item.id + '"][value="' + item.handle + '"]').attr('checked',true);
		})
		
	} else if(dataObj.monitorType == '2') {
		$.each(dataObj.pointList, function(index, item){
			$('#monitorPoint2 input[name="monitorPoint"][value="' + item.id + '"]').attr('checked',true);
			$('#monitorPoint2 input[name="point' + item.id + '"][value="' + item.handle + '"]').attr('checked',true);
		})
	}
}

/**
 * 通用的数据查询接口
 * @param setttingId
 * @param urlText
 * @returns
 */
function commonQueryAndReturnData(setttingId, urlText){
	var paramData = {monitorSettingId: setttingId};
	var dataList;
	$.ajax({  
	       url: urlText,
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
	////console.info("------------------------001---------------------------");
	////console.info(dataList);
	return dataList;
}

/**
 * 查询和展示监控人数据
 * @param setttingId
 */
function queryAndShowMonitorData(setttingId){
	var urlText = serviceUrl+"flow/monitorPerson/queryList";
	var dataList = commonQueryAndReturnData(setttingId, urlText);
	monitorGrid.jqGrid('clearGridData',false);//先清除旧数据
	for(var i=0; i<dataList.length; i++){
		monitorGrid.jqGrid('addRowData', i + 1, dataList[i]);
	}
}



/**
 * 查询和展示被监控的模板数据
 * @param setttingId
 */
function queryAndShowFlowData(setttingId){//   
	var urlText = serviceUrl+"flow/monitorFl/queryMonitorFlowList";
	var dataList = commonQueryAndReturnData(setttingId, urlText);
	flowGrid.jqGrid('clearGridData',false);//先清除旧数据
	for(var i=0; i<dataList.length; i++){
		flowGrid.jqGrid('addRowData', i + 1, dataList[i]);
	}
}

/**
 * 查询和展示被监控人数据
 * @param setttingId
 */
function queryAndShowMonitoredData(setttingId){
	var urlText = serviceUrl+"flow/monitoredPerson/queryList";
	var monitoredList = commonQueryAndReturnData(setttingId, urlText);
	monitoredGrid.jqGrid('clearGridData',false);//先清除旧数据
	for(var idx=0; idx<monitoredList.length; idx++){
		monitoredGrid.jqGrid('addRowData', idx, monitoredList[idx]);
	}
}
/**
 * 保存按钮的点击事件
 */
function saveForm(){
	
	$("#monitorForm").attr("data-validate-success","doSaveFormAction()");
	$("#monitorForm").submit();
}

/**
 * 执行提交数据的操作
 */
function doSaveFormAction(){
	
	var startTime = new Date($('#startDate').val()).getTime();
	var endTime = new Date($('#endDate').val()).getTime();
	if(startTime>endTime){
		pop_tip_open("red","开始时间必须小于截止时间!");
		return;
	}
	
	if(!window.monitor){
		pop_tip_open("red","监控人列表不能为空!");
		return;
	}
	
	var type = $("input[name='monitorType']:checked").val();
	var pointList = new Array();
	if(type == '1') {
		if(!window.monitored) {
			pop_tip_open("red","被监控人列表不能为空!");
			return;
		}
		var points = $('#monitorPoint1 input[name="monitorPoint"]:checked');
		if(points.length == 0) {
			pop_tip_open("red","请选择至少一个监控点!");
			return;
		} else {
			$.each(points, function(index, item) {
				var name = $(item).next().text();
				var handle = $('input[name="point' +　item.value + '"]:checked').val();
				pointList.push({pointId: item.value, pointName: name, handle: handle});
			});
		}
		
	} else if(type == '2') {
		var points = $('#monitorPoint2 input[name="monitorPoint"]:checked');
		if(points.length == 0) {
			pop_tip_open("red","请选择至少一个监控点!");
			return;
		} else {
			$.each(points, function(index, item) {
				var name = $(item).next().text();
				var handle = $('input[name="point' +　item.value + '"]:checked').val();
				pointList.push({pointId: item.value, pointName: name, handle: handle});
			});
		}
	} else {
		pointList.push({pointId: '5', pointName: '挂起', handle: '3'});
	}
	
	var monitorObjDto = {};
	monitorObjDto.name = $('#name').val();
	monitorObjDto.monitorType = $('input[name="monitorType"]:checked').val();
	monitorObjDto.delflag = false;
	monitorObjDto.status = $('input[name="status"]:checked').val();
	monitorObjDto.id = $.getUrlParam("monitorId");
	monitorObjDto.startDate = $('#startDate').val();
	monitorObjDto.endDate = $('#endDate').val();
	monitorObjDto.remark = $('#remark').val();
	
	var monitorList = new Array();
	if(window.monitor){
		$.each(window.monitor, function(index, item){
			monitorList.push({id: item.id, name: item.name, type: item.type});
		});
	}

	monitorObjDto.monitorList = monitorList;//[{monitorId:"0001-Id", monitorName:"0001-Name", monitorType:"1"}];
	
	var monitoredList = new Array();
	if(window.monitored){
		$.each(window.monitored, function(index, item){
			monitoredList.push({id: item.id, name: item.name, type: item.type});
		});
	}

	monitorObjDto.monitoredList = monitoredList;
	
//	var flowList = new Array();
//	$.each(chooseArray, function(index, item){
//		flowList.push({id: item.flId, name: item.flName});
//	})
	monitorObjDto.flowList = chooseArray;
	
	monitorObjDto.pointList = pointList;
	
	//console.info(monitorObjDto);
	if("-1" == monitorObjDto.id){
		monitorObjDto.status = "1";
	}
	
	monitorObjDto.concurrencyVersion = $("#concurrencyVersion").val(); 
	saveFormData(monitorObjDto);
}

/**
 * 保存保单数据的处理方法
 */
function saveFormData(monitorObjDto){
	$.ajax({
	       url: serviceUrl+"flow/monitorSetting/saveAllSettingData",
	       data: JSON.stringify(monitorObjDto),
	       type: 'POST',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success:function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
				   opener.setJqGridAddedRowId(result.id);
	               opener.refreshJqGridData();
	               if(successFlag) {
	                   pop_tip_open("green","数据保存操作成功！");
	               }else {
	            	   pop_tip_open("red","数据保存操作失败！");
	               }
	               closeMe();
	           }
	       }
	});
}

/**
 * 授权人的回调函数处理事件
 * @param data
 * @param ele
 */
function authorizerCallback(data, ele){
	$("#authorizer").val(data.name);
	$("#authorizerId").val(data.id);
}

/**
 * 代理人的回调函数处理事件
 * @param data
 * @param ele
 */
function authorizedCallback(data, ele){
	$("#authorized").val(data.name);
	$("#authorizedId").val(data.id);
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
function deleteMonitored() {
	monitoredGrid.jqGrid("delRowData", monitoredLastSel); 
}


/**
 * 岗位的选择范围删除处理事件
 */
function deleteMonitor() {
	monitorGrid.jqGrid("delRowData", monitorLastSel); 
}

/**
 * 岗位的选择范围选择处理事件
 */
$('.singleArray-first').xljSingleArraySelector({
    selectorTypeArray:['person','post','role'],
	saveCallback: function (treeNode) {
       var type = returnCommonTypeMainData(treeNode);
       var item = {id: treeNode.id, monitorType: type, monitorName: treeNode.name};
       
       var haveShowDataArray = monitorGrid.jqGrid().getRowData();
	   var existFlag = checkDataItemExistInArray(item, haveShowDataArray);
	   if(existFlag == "NO"){
		   monitorGrid.jqGrid('addRowData', haveShowDataArray.length + 1, item);
	   }
    }
});

/**
 * 岗位的选择范围选择处理事件
 */
$('#selectMonitor').xljSingleArraySelector({
    selectorTypeArray:['person','post'],
    targetId: 'monitorId',
    treeSettings:{
    	check:{
               autoCheckTrigger:false,
               chkboxType:{ "Y": "", "N": "" },
               chkStyle:'checkbox',
               enable:true,
               nocheckInherit:false,
               chkDisabledInherit:false,
               radioType:'level'
           }
    },
	saveCallback: function (treeNode) {
		//console.info(treeNode);
		window.monitor = treeNode;
		var monitorText = '';
		$.each(treeNode, function(index, item) {
			if(monitorText == '') {
				monitorText = item.name;
				
			} else {
				monitorText = monitorText + ', ' + item.name;
			}
		})
		$('#monitorArea').val(monitorText);
    }
});

/**
 * 岗位的选择范围选择处理事件
 */
$('#selectMonitored').xljSingleArraySelector({
    selectorTypeArray:['person','post'],
    targetId: 'monitoredId',
    treeSettings:{
    	check:{
               autoCheckTrigger:false,
               chkboxType:{ "Y": "", "N": "" },
               chkStyle:'checkbox',
               enable:true,
               nocheckInherit:false,
               chkDisabledInherit:false,
               radioType:'level'
           }
    },
	saveCallback: function (treeNode) {
		//console.info(treeNode);
		window.monitored = treeNode;
		var monitorText = '';
		$.each(treeNode, function(index, item) {
			if(monitorText == '') {
				monitorText = item.name;
				
			} else {
				monitorText = monitorText + ', ' + item.name;
			}
		})
		$('#monitoredArea').val(monitorText);
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

$('.singleArray-second').xljSingleArraySelector({
    selectorTypeArray:['person','post','role'],
	saveCallback: function (treeNode) {
       var type = returnCommonTypeMainData(treeNode);
       var item = {id: treeNode.id, monitoredType: type, monitoredName: treeNode.name};
       var haveShowDataArray = monitoredGrid.jqGrid().getRowData();
	   var existFlag = checkDataItemExistInArray(item, haveShowDataArray);
	   if(existFlag == "NO"){
		   monitoredGrid.jqGrid('addRowData', haveShowDataArray.length + 1, item);
	   }       
    }
});

/**
 * 岗位的选择范围删除处理事件
 */
function deleteFlow() {
	flowGrid.jqGrid("delRowData",flowLastSel);
}

/**
 * 岗位的选择范围选择处理事件
 */
function chooseFlow() {
	chooseType = "flow";//选择岗位
	$("#modalTitle").html("选择授权模板");//修改标题
	$("#modalWindow").modal("show");
	initChooseGrid();
	setTimeout(function(){
		$.xljUtils.gridResizeFn();
	},300);
}

/**
 * 提交模态弹出框的数据，并关闭窗口
 */
function submitAndCloseModelWindow(){
	var idText="";
	var postGrid = $("#"+chooseType+"ChooseGrid");
	if(chooseType == "monitor" || chooseType == "monitoreds"){
		postGrid = $("#postChooseGrid");
	}
	chooseArray.splice(0,chooseArray.length);//先清空数据内的所有元素
	var rowIds = postGrid.jqGrid('getGridParam','selarrrow');
	var flowText = '';
	$.each(rowIds, function(index, item){
		var rowData = postGrid.jqGrid('getRowData',item);
		if(chooseType == "flow"){//id flName busiObjectName  code
			var item = {flId: rowData.id,code:rowData.code, flName:rowData.name,
					busiObjectName: rowData.businessObjectName};
			chooseArray.push(item);
			if(flowText == '') {
				flowText = item.flName;
			} else {
				flowText = flowText + ', ' + item.flName;
			}
			$('#flowArea').val(flowText);
		}
	})
	closeModelWindow();
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

/**
 * 关闭模态弹出框窗口
 */
function closeModelWindow(){
	$("#modalWindow").modal("hide");
}

function initChooseGrid(){
	var tempGrid;
	var paramUrl = "";
	var postData = { delflag:false};
	var colModel;
	if(chooseType == "monitor" || chooseType == "monitored"){
		tempGrid = $("#postChooseGrid");
		$("#choosePostDiv").show();
		$("#chooseFlowDiv").hide();
		paramUrl = serviceUrl+"flow/approveType/queryList";
		colModel = [{name:'id',label:'ID',align:"center",hidden:true},
		            {name:'code',label:'编码',align:"center"},
		            {name:'name',label:'名称',align:"center"} ];
	}else if(chooseType == "flow"){
		tempGrid = $("#flowChooseGrid");
		$("#choosePostDiv").hide();
		$("#chooseFlowDiv").show();
		paramUrl = serviceUrl+"flow/fl/queryFlowBusiObjectList";
		colModel = [{name:'id',label:'ID',align:"center",hidden:true},
		            {name:'name',label:'名称',align:"center"},
		            {name:'businessObjectName',label:'业务对象',align:"center"},
		            {name:'code',label:'编码',align:"center"}];
	}
	tempGrid.jqGrid({
        url: paramUrl,
        postData: postData,
        datatype: "json", 
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        mtype: "post", 
        jsonReader : { root:"result" },
        colModel: colModel,
        height: 310,
        width: 560,
        rowNum: -1,
        multiselect: true,//定义是否可以多选
        sortname: 'id',//默认的排序列
        sortorder: "desc",//排序方式,可选desc,asc
        viewrecords: true, //定义是否要显示总记录数
        gridComplete: function() {//当表格所有数据都加载完成
        	//$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
        	$.xljUtils.addGridScroll();
	    }
	});
}

function initThreeGridTable(){//monitorDataGrid  monitoredDataGrid
	var outerWidth= $("#dataGridTD").outerWidth()-15;
	monitorGrid = $("#monitorDataGrid");
	monitorGrid.jqGrid({
		datatype : "local",
		height  : 150,
		//width:   800,
		scroll  : true,  scrollrows:true,
		colModel : [ {name:'id',    label:'ID', hidden:true}, 
		             {name:'monitorType', label:'类型',align:"center", formatter: typeFormatter},
		             {name:'monitorName', label:'名称' ,align:"center"}],
        onSelectRow: function (rowid, status) {//被选中的状态
        	monitorLastSel = rowid;
        },
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
	    }
	});
	monitorGrid.jqGrid("setGridWidth", outerWidth, true);
	
	monitoredGrid = $("#monitoredDataGrid");
	monitoredGrid.jqGrid({
		datatype : "local",
		height  : 150,
		//width:   800,
		scroll  : true,  scrollrows:true,
		colModel : [ {name:'id',    label:'ID', hidden:true}, 
		             {name:'monitoredType', label:'类型',align:"center", formatter: typeFormatter}, 
		             {name:'monitoredName', label:'名称',align:"center"}],
        onSelectRow: function (rowid, status) {//被选中的状态
        	monitoredLastSel = rowid;
        },
		
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
	    }
	});
	monitoredGrid.jqGrid("setGridWidth", outerWidth, true);
	// 
	flowGrid = $("#flowDataGrid");
	flowGrid.jqGrid({
		datatype : "local",
		height  : 150,
		//width:   800,
		scroll  : true,  scrollrows:true,  
		colModel : [ {name:'flId',    label:'ID', hidden:true}, 
		             {name:'flName', label:'模板名称',align:"center"},
           {name:'busiObjectName', label:'业务对象',align:"center"}, 
           {name:'code', label:'模板编码',align:"center"}
        ],
        onSelectRow: function (rowid, status) {//被选中的状态
        	flowLastSel = rowid;
        },
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
	    }
	});
	flowGrid.jqGrid("setGridWidth", outerWidth, true);
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
