var postData = {};
var instanceId = "";
var approvalLists;
var jqGrid;
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
	postData.requestSource = $.getUrlParam("requestSource");
	// 初始化审批历史
	approveHistoryInit();
	// 审批历史高宽自适应
	resizeGrid();
	// 添加浏览器纵向滚动条
	addHtmlScroll();
}

/**
 * 初始化审批历史
 */
function approveHistoryInit() {
	jqGrid = $("#_approveHistory").jqGrid(
		{
			url : serviceUrl + "flow/instance/queryApprovalListAdmin",
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
	            {name: 'appId',label : '应用ID',hidden: true},
	            {name: 'instanceId',label : '实例ID',hidden: true},
	            {name: 'groupKey',label : 'groupKey',hidden: true},
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
				{name: 'approvalType',label : '操作',width: 70,editable:false,sortable:false,cellattr:addCellAttr, formatter: typeFormatter},
				{name: 'taskComments',label : '处理意见',editable:false,sortable:false,cellattr:addCellAttr},
				{name: 'attachment',label : '附件',editable:false,sortable:false,cellattr:addCellAttr,formatter:attachmentFormatter},
				{name: 'taskEndTime',label : '处理时间',editable:false,sortable:false,cellattr:addCellAttr}
				
			],
			multiselect:true,
			multiboxonly:true,
			forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
			height: '100%',
			rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
			hoverrows:false,                                    //禁止mouse hovering			
			gridComplete : function() {                         //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
				removeHorizontalScrollBar("_approveHistory");
	        	mergerCell("_approveHistory");                  //合并单元格
	        	setRunningStatus("_approveHistory",false);      //设置运行标识
	        	initjCheckBox();
	        	$('#cb__approveHistory').attr('disabled',true);
	        	$("#cb__approveHistory").hide();
			},
			onSelectRow:function(rowid,status){

				$("#"+rowid).removeClass('ui-state-highlight');

			},

			onRightClickRow:function(rowid,iRow,iCol,e){
				$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
			},
			loadComplete : function(xhr) {                       //当从服务器返回响应时执行
				if(xhr.success){
					approvalLists = xhr.result;
				}else{
					$.xljUtils.tip("red",xhr.msg);
				}
				$('.ui-state-default.ui-jqgrid-hdiv').css({'overflow':'hidden','margin-top':'8px'});
				resizeGrid();       //重置纵向滚动条
				                         
			},
			afterInsertRow: function(rowId, rowData) {
				if(rowData.taskStatus == '3') {
					if(rowData.acType == '1'){
						$('#_attachment-' + rowId).xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.instanceId,mode:'view'});
					}else{
						$('#_attachment-' + rowId).xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.groupKey,mode:'view'});
					}
				}
			},
			loadError : function(xhr, status, error) {            //如果请求服务器失败则调用此方法
				$.xljUtils.getError(xhr.status);
			},
		});
	
}

/**
 * Grid自适应
 */
function resizeGrid(){
	$("#_approveHistory").setGridWidth($('#_approveHistoryDiv').width());
}

function typeFormatter(cellvalue, options, rowObject){
	if(rowObject.taskResult == 'START') {
		return '发起流程';
	} else {
		return (rowObject.taskResultName == null)?'': rowObject.taskResultName;
	} 
}

function sourceFormatter(cellvalue, options, rowObject){
	if("DB" == cellvalue){
		return "待办";
	}else if("DY" == cellvalue){
		return "待阅";
	}else if("start" == cellvalue){
		return "发起";
	}else if("search" == cellvalue){
		return "检索";
	}
}

/**
 * 初始化环节附件
 */
function initjAttachment(){
	var ids = jqGrid.jqGrid('getDataIDs');
	for (var i in ids) {
		$('#_attachment-' + ids[i]).xljAttachment({appId:saveData.appId,businessId:saveData.id,categoryId:saveData.id,mode:'add'});
	}
}
/**
 * 初始化复选框
 */
function initjCheckBox(){
	var ids = jqGrid.jqGrid('getDataIDs');
	for (var i in ids) {
		var rowData = jqGrid.jqGrid('getRowData',ids[i]);
		if(rowData.taskStatus==3||rowData.acType == '3'||rowData.acStatus== '3'){
			$('#jqg__approveHistory_' + ids[i]).remove();
		}
	}
}
/**
 * 前加签
 */
function addAcPrefix(){
	var ids = jqGrid.jqGrid('getDataIDs');
	var ids = jqGrid.jqGrid('getGridParam','selarrrow');
	var srcRowIndex = jqGrid.getInd(ids[0], false);
	for (var i in ids) {
		var rowData = jqGrid.jqGrid('getRowData',ids[i]);
		if(rowData.taskStatus != ''){
			$.xljUtils.tip("blue","点亮环节不可以前加签！");
			return;
		}
	}
	jqGrid.jqGrid('resetSelection');
	if(ids.length == 0){
		$.xljUtils.tip("blue","至少选择一条数据！");
		return;
	}else if (ids.length > 1){
		$.xljUtils.tip("blue","最多选择一条数据!");
		return;
	}else if (ids.length == 1){
		var interval = $("#sequence" + ids[0]).attr('rowspan');
		if(typeof (interval) == "undefined"){interval = 0;}
		openWin(serviceUrl + "flow/runtime/query/instance_ac.html?instanceId="+$.getUrlParam("instanceId")+"&srcRowIndex="+srcRowIndex+"&interval="+interval+"&position=before&code=QJQHJ&name=前加签环节&time=" + Math.random());
	}	
	
}
/**
 * 后加签
 */
function addAcSuffix(){
	var ids = jqGrid.jqGrid('getGridParam','selarrrow');
	var srcRowIndex = jqGrid.getInd(ids[0], false);
	jqGrid.jqGrid('resetSelection');
	if(ids.length == 0){
		$.xljUtils.tip("blue","至少选择一条数据！");
		return;
	}else if (ids.length > 1){
		$.xljUtils.tip("blue","最多选择一条数据!");
		return;
	}else if (ids.length == 1){
		var interval = $("#sequence" + ids[0]).attr('rowspan');
		if(typeof (interval) == "undefined"){interval = 0;}
		openWin(serviceUrl + "flow/runtime/query/instance_ac.html?instanceId="+$.getUrlParam("instanceId")+"&srcRowIndex="+srcRowIndex+"&interval="+interval+"&position=after&code=HJQHJ&name=后加签环节&time=" + Math.random());
	}	
}
/**
 * 删除
 */
function deleteAc(){
	var acId = '';
	var result = false;
	var ids = jqGrid.jqGrid('getGridParam','selarrrow');
	if(ids.length == 0){
		$.xljUtils.tip("blue","至少选择一条数据！");
		return;
	}else{
		for(var i in ids){
			var rowid = ids[i];
			var rowspan = $("#sequence" + ids[i]).attr('rowspan');
			var rowData = jqGrid.jqGrid('getRowData',ids[i]);
			if(rowData.taskStatus != ''){
				$.xljUtils.tip("blue","点亮环节不可以删除！");
				return;
			}
			acId = jqGrid.jqGrid('getCell',rowid,'acId');
			if(typeof (rowspan) == "undefined"){
				rowspan = 0;
				result = jqGrid.jqGrid('delRowData',ids[i]);
			}else{
				for(var j = 0; j < rowspan; j ++){
					rowid = parseInt(ids[i])+parseInt(j);
					result = jqGrid.jqGrid('delRowData',rowid);
				}
			}
			delApprovalList(acId);
		}
		jqGrid.jqGrid('resetSelection');
	}
}
/**
 * 保存
 */
function save(){
	$.ajax({
	    url: serviceUrl + "flow/instance/adjustAc",
	    data:JSON.stringify(approvalLists),
	    type:'POST',
	    contentType:'application/json',
	    dataType:'JSON',
	    success:function (data) {
	        if(data) {
	            var success = data.success;
	            if(success) {
	                $.xljUtils.tip("green","保存成功！");
	                jqGrid.jqGrid("setGridParam").trigger("reloadGrid");
	                window.opener.jqGrid.jqGrid("setGridParam").trigger("reloadGrid");
	            }else {
	         	  $.xljUtils.tip("red","保存失败！");
	            }
	        }
	    }
	});	
}
/**
 * 设置删除状态(//0：不变；1：新增；2：删除；3：修改)
 */
function delApprovalList(acId){
	for(var i in approvalLists){
		if(approvalLists[i].acId == acId){
			approvalLists[i].changeType = 2;
		}
	}
}
/**
 * 添加ApprovalList
 */
function addApprovalList(index,howmany,items) {
	var newItems = {};
	for(var key in items){
		newItems[key] = items[key];
	}
	approvalLists.splice(index, howmany,newItems);
}