var postData = {};
var instanceId = "";
var lastSel,flag;
var historyGrid;
var historyDataArray;
$(function() {
	pageInit();
});
$(window).resize(function(){
	resizeGrid();
});

/**
 * 初始化页面
 */
function pageInit(){
	// 构造请求数据
	postData.instanceId = $.getUrlParam("instanceId");
	instanceId = postData.instanceId;
	postData.requestSource = "view"; //$.getUrlParam("requestSource");
	// 初始化审批历史
	approveHistoryInit();
	resizeGrid();// 审批历史高宽自适应
}

/**
 * 初始化审批历史
 */
function approveHistoryInit() {
	historyGrid = $("#_approveHistory");
	historyGrid.jqGrid(
		{
			url : hostUrl + "flow/instance/queryApprovalList",
			postData : postData,
			datatype : "json",
			ajaxGridOptions : {
				contentType : 'application/json;charset=utf-8'
			},
			mtype : "post",
			jsonReader : {
				root : "result"
			},
			colModel : [
				    {name: 'sequence',label : '序号',align:'center', width: 40,sortable:false,editable:false,cellattr:addCellAttr},
					{name: 'acId',label : '环节ID', hidden: true,sortable:false,editable:false},
					{name: 'acType',label : '环节类型', hidden: true,sortable:false,editable:false},
					{name: 'acName',label : '环节名称',width: 70,sortable:false,editable:false,cellattr:addCellAttr},
					{name: 'acStatus',label : '环节点亮状态', hidden: true,sortable:false,editable:false},
					{name: 'postId',label : '岗位ID',hidden: true,sortable:false,editable:false},
					{name: 'postName',label : '岗位',width: 200,sortable:false,editable:false,cellattr:addCellAttr},
					{name: 'postStatus',label : '岗位点亮状态', hidden: true,sortable:false,editable:false},
					{name: 'approverId',label : '责任ID',  hidden: true,editable:false,sortable:false},
					{name: 'approverName',label : '责任人',width: 70,editable:false,sortable:false,cellattr:addCellAttr},
					{name: 'taskStatus',label : '责任人点亮状态',hidden: true,sortable:false,editable:false},
					{name: 'approvalType',label : '操作',width: 70,editable:false,sortable:false,cellattr:addCellAttr},
					{name: 'taskComments',label : '处理意见',editable:true,sortable:false,cellattr:addCellAttr},
					{name: 'taskEndTime',label : '处理时间',editable:false,sortable:false,cellattr:addCellAttr}
				
			],
			forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
			height: '100%',
			rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
			hoverrows:false,                                    //禁止mouse hovering			
			gridComplete : function() {                         //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
				removeHorizontalScrollBar("_approveHistory");
	        	mergerCell("_approveHistory");                  //合并单元格
	        	setRunningStatus("_approveHistory",false);      //设置运行标识
	        	changeGridIntoEditStatus();
			},
			beforeSelectRow:function(rowid, e){//不让用户进行选中操作
				return false;
			},
			onRightClickRow:function(rowid,iRow,iCol,e){
				$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
			},
			loadComplete : function(xhr) { //当从服务器返回响应时执行
				historyDataArray = xhr.result;
				//console.info(historyDataArray);
				if(xhr.success){
					//$(".settitle span").html(xhr.result[0].instanceName);
				}else{
					$.xljUtils.tip("red",xhr.msg);
				}
				
				$('html').getNiceScroll().show().resize();       //重置纵向滚动条
				$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});                        
			},
			loadError : function(xhr, status, error) {            //如果请求服务器失败则调用此方法
				$.xljUtils.getError(xhr.status);
			},
			
		});
}

/**
 * 将grid设置为编辑模式
 * @param tableId
 */
function changeGridIntoEditStatus(){
    var ids = historyGrid.jqGrid('getDataIDs');
    var rowDatas = historyGrid.jqGrid('getRowData');
    for (var i = 0; i < ids.length; i++) {
    	var itemData = rowDatas[i];
    	////console.info(itemData);
    	var taskEndTime = itemData.taskEndTime;
    	var taskStatus = itemData.taskStatus;
    	if(taskEndTime && taskEndTime.length>5 && taskStatus == 3){
    		historyGrid.jqGrid('editRow',ids[i]);
    	}
    }
}

/**
 * 执行提交数据的操作
 */
function doSaveFormAction(){
	var ids = historyGrid.jqGrid('getDataIDs');
    for (var i = 0; i < ids.length; i++) {//关闭所有编辑模式
    	historyGrid.jqGrid('saveRow',ids[i]);
    }
	
	var rowDatas = historyGrid.jqGrid('getRowData');
	var newDataArray = new Array();
	for (var idx = 0; idx < rowDatas.length; idx++) {
    	var itemData = rowDatas[idx];
    	var oldItemData = historyDataArray[idx];
    	//console.info(itemData);
    	var taskEndTime = itemData.taskEndTime;
    	var taskStatus = itemData.taskStatus;
    	if(taskEndTime && taskEndTime.length>5 && taskStatus == 3){//
    		oldItemData.taskComments = itemData.taskComments;
    		oldItemData.changeType = 3;//修改
    	}
    	newDataArray.push(oldItemData);
    }
	saveFormData(newDataArray);
}

/**
 * 保存保单数据的处理方法
 */
function saveFormData(dataDto){
	$.ajax({
	       url: hostUrl+"flow/instance/updateApprovalComments",
	       data: JSON.stringify(dataDto),
	       type: 'POST',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success:function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               if(successFlag) {
					   if(window.opener&&window.opener.refreshApproveHistoryGridData){
						   opener.refreshApproveHistoryGridData();
					   }

					   if(window.opener&&window.opener.refreshApproveList){
						   window.opener.refreshApproveList();
					   }

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
 * Grid自适应
 */
function resizeGrid(){
	$("#_approveHistory").setGridWidth($('#_approveHistoryDiv').width());
}

function commonAjaxAction(urlText, paramObject, actionName){
	$.ajax({
	    url: hostUrl + urlText,
	    data:JSON.stringify(paramObject),
	    type:'POST',
	    contentType:'application/json',
	    dataType:'JSON',
	    success:function (resultData ) {
	        if(resultData) {
	            var successFlag = resultData.success;
	            if(successFlag) {
	              $.xljUtils.tip("green",actionName+"成功！");
	            }else {
	         	  $.xljUtils.tip("red",actionName+"失败！");
	            }
	        }
	    }
	});
}
//
/*ondblClickRow: function(rowid){ 
//console.info("ondblClickRow >>> rowid="+rowid+"; lastSel="+lastSel);
	lastSel = rowid;  
	flag = true;
	historyGrid.jqGrid('editRow', rowid, true); 
},
onSelectRow: function(rowid) {
	//console.info("onSelectRow>>> rowid="+rowid+"; lastSel="+lastSel);
if (flag && lastSel && rowid !== lastSel) {
	historyGrid.jqGrid('saveRow', lastSel, save());
}
}*/
