var postData = {};
var instanceId = "";
var jqGrid;
$(function() {
	//初始化页面
	pageInit();
	//初始化按钮状态
	initButton();
	//tab切换
	$(".addPad button").on("click",function(e){
		var index = $(this).index();
		var name = $(this).attr("name");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		var tabboxs = $(this).parent().parent().find(".tabbox");
		e.stopPropagation();
		$("#approveHistoryDiv").hide();
		$("#instanceDiv").hide();
		$("#readRecordDiv").hide();
		
		$("#"+name+"Div").show();
		resizeGrid();
	});
});
$(window).resize(function(){
	$(".my-addauto-box").height($(window).height()-70+"px");
	resizeGrid();
});

/**
 * 初始化按钮状态
 */
function initButton() {
	// 1-运行中、2-正常完成、3-撤回、4-打回、7-作废、9-挂起
//	var status=1;
//	var data={
//			"instanceId":$.getUrlParam('instanceId')
//	};
//	$.ajax({
//		type: 'POST',
//		url: serviceUrl + 'flow/fl/getFlowRetractForInstance',
//		contentType: 'application/json; charset=utf-8',
//		dataType: 'json',
//		data:JSON.stringify(data),
//		success: function(data) {
//			if(data.success) {
//				status=data.result.incStatus;
//				if (status == '7' || status == '3' || status == '4' ) {
//					$("#_btnLetIt").hide();
//					
//					$("#_btnAdjust").hide();
//					
//					$("#_btnFinish").hide();
//					$("#_btnPassRead").hide();
//					
//					$("#_btnMore").hide();
//				}else if(status == '1'){
////					$("#_btnLetIt").attr('disabled',true);
//					$("#_btnLetIt").hide();
//					$("#_btnCloseOne").hide();
//				}else if (status == '2') {
//					$("#_btnLetIt").hide();
//					$("#_btnSkip").hide();
//					$("#_btnFinish").hide();
//					$("#_btnAdjust").hide();
//					$("#_btnCloseOne").hide();
//				}
//			} 
//		}
//	});
	
	//流程实例状态已从列表页传回，不再查询DB
	var status = $.getUrlParam('status');
	if (status == '7' || status == '3' || status == '4' ) {
	$("#_btnLetIt").hide();
		$("#_btnAdjust").hide();
		$("#_btnFinish").hide();
		$("#_btnPassRead").hide();
		$("#_btnMore").hide();
		
	}else if(status == '1'){
		//	$("#_btnLetIt").attr('disabled',true);
		$("#_btnLetIt").hide();
		$("#_btnCloseOne").hide();
		
	}else if (status == '2') {
		$("#_btnLetIt").hide();
		$("#_btnSkip").hide();
		$("#_btnFinish").hide();
		$("#_btnAdjust").hide();
		$("#_btnCloseOne").hide();
		$("#_btnDrop").hide();		//流程正常完成不能作废
	}
}



/**
 * 初始化页面
 */
function pageInit(){
	$(".my-addauto-box").height($(window).height()-70+"px");
	initRelateFlow();
	
	// 构造请求数据
	postData.instanceId = $.getUrlParam("instanceId");
	instanceId = postData.instanceId;
	postData.requestSource = $.getUrlParam("requestSource");

	// 初始化审批历史
	approveHistoryInit();
	// 初始化阅读日志
	readRecordInit();
	// 初始化审批流转日志
	instanceTransferInit();
}

/**
 * 初始化审批历史
 */
function approveHistoryInit() {
	jqGrid = $("#_approveHistory").jqGrid(
		{
			url : serviceUrl + "flow/instance/queryApprovalList",
			postData : postData,
			datatype : "json",
			ajaxGridOptions : {
				contentType : 'application/json;charset=utf-8'
			},
			mtype : "post",
			jsonReader : {
				root : "result"
			},
			width: $("#approveHistoryDiv").width(),
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
					{name: 'postName',label : '岗位',width: 260,sortable:false,editable:false,cellattr:addCellAttr, formatter: postFormatter},
					{name: 'postStatus',label : '岗位点亮状态', hidden: true,sortable:false,editable:false},
					{name: 'approverId',label : '责任ID',  hidden: true,editable:false,sortable:false},
					{name: 'approverName',label : '责任人',width: 70,editable:false,sortable:false,cellattr:addCellAttr},
					{name: 'approverStatus',label : '责任人状态',hidden: true,sortable:false,editable:false},
					{name: 'taskStatus',label : '责任人点亮状态',hidden: true,sortable:false,editable:false},
					{name: 'approvalType',label : '操作',width: 70,editable:false,sortable:false,cellattr:addCellAttr, formatter: typeFormatter},
					{name: 'taskComments',label : '处理意见',editable:false,sortable:false,cellattr:addCellAttr, formatter: taskFormatter},
					{name: 'taskEndTime',label : '处理时间',editable:false,sortable:false,cellattr:addCellAttr}
				
			],
			//forceFit:true,
			rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
			hoverrows:false,                                    //禁止mouse hovering			
			gridComplete : function() {                         //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
				//$("#"+gridId).closest(".ui-jqgrid-bdiv").css("minHeight", "200px");
				//$.xljUtils.addGridScroll();
				//$.xljUtils.gridResizeFn();

				mergerCell("_approveHistory");                  //合并单元格
	        	setRunningStatus("_approveHistory",false);      //设置运行标识
				$("#_approveHistory").closest(".ui-jqgrid-bdiv").css("height", "auto");
				$("#_approveHistory").jqGrid().setGridWidth($("#approveHistoryDiv").width(),true);
			},
			beforeSelectRow:function(rowid, e){
				return false;
			},
			onRightClickRow:function(rowid,iRow,iCol,e){
				$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
			},
			loadComplete : function(xhr) {                       //当从服务器返回响应时执行
				if(xhr.success){
					if(xhr.result.length != 0) {
						$(".settitle span").html(xhr.result[0].instanceName);
					} 
					
					window.flCode = xhr.result[0].flCode;
					//加载业务表单
					loadBusinessForm();
					
				}else{
					$.xljUtils.tip("red",xhr.msg);
				}
				window.flCode = xhr.result[0].flCode;
				setTimeout(function(){
					$("#_approveHistory").closest(".ui-jqgrid-bdiv").getNiceScroll().remove();
				},500);
			},
			afterInsertRow: function(rowId, rowData) {
				if(rowData.taskStatus == '3') {
					if(rowData.acType == '1'){
						$('#_attachment-' + rowId).xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.instanceId,mode:'table',hideButtonsWithNoFile:true});
					}else{
						$('#_attachment-' + rowId).xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.groupKey,mode:'table',hideButtonsWithNoFile:true});
					}
				}
			},			
			loadError : function(xhr, status, error) {            //如果请求服务器失败则调用此方法
				$.xljUtils.getError(xhr.status);
			},
		});
	
}

function typeFormatter(cellvalue, options, rowObject){
	if(rowObject.taskResult == 'START') {
		return '发起流程';
	} else {
		return (rowObject.taskResultName == null)?'': rowObject.taskResultName;
	} 
}

function refreshApproveHistoryGridData(){
	$("#_approveHistory").jqGrid('setGridParam', {
        datatype: 'json', postData: postData,
    }).trigger("reloadGrid");
}
/**
 * 初始化阅读日志
 */
function readRecordInit() {
	var paramData = { fiId: instanceId};
	$("#readRecordGrid").jqGrid( {
		url : serviceUrl + "flow/instanceReadRecord/queryList",
		postData : paramData,
		datatype : "json",
		ajaxGridOptions : {
			contentType : 'application/json;charset=utf-8'
		},
		mtype : "post",
		jsonReader : {
			root : "result"
		},
		colModel : [
		    {name: 'id',label : 'ID', hidden: true},
			{name: 'userName',label : '人员名称', align:"center" },
			{name: 'postName',label : '岗位' , align:"center"},
			{name: 'readDate',label : '时间' , align:"center"}
			//,{name: 'source',label : '阅读方式', align:"center", formatter: sourceFormatter}
		],
		forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
		width: '100%',
		rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
		hoverrows:false,                                    //禁止mouse hovering
		sortname : 'readDate',//初始化的时候排序的字段
        sortorder : "desc",//排序方式,可选desc,asc
		onRightClickRow:function(rowid,iRow,iCol,e){
			$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
		},
		loadComplete : function(xhr) {
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
	$("#_approveHistory").setGridWidth($('#approveHistoryDiv').width());
	$("#_approveHistory").setGridHeight("auto");
	$("#instanceTransferGrid").setGridWidth($('#instanceDiv').width());
	$("#instanceTransferGrid").setGridHeight("auto");
	$("#readRecordGrid").setGridWidth($('#readRecordDiv').width());
	$("#readRecordGrid").setGridHeight("auto");
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
 * 初始化审批流转日志
 */
function instanceTransferInit() {
	var paramData = { instanceId: instanceId, requestSource: 'DB'};
	$("#instanceTransferGrid").jqGrid( {
		url : serviceUrl + "flow/instance/queryTransferList",
		postData : paramData,
		datatype : "json",
		ajaxGridOptions : {
			contentType : 'application/json;charset=utf-8'
		},
		mtype : "post",
		jsonReader : {
			root : "result"
		},
		colModel : [
		    {name: 'id',label : 'ID', hidden: true},
			{name: 'transationUserName',label : '审批人', align:"center" },
			{name: 'acName',label : '环节名称' , align:"center" },
			{name: 'actionName',label : '操作' , align:"center" },
			{name: 'transationDate',label : '时间', align:"center" }
		],
		forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
		width: '100%',
		rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
		hoverrows:false,                                    //禁止mouse hovering			
		onRightClickRow:function(rowid,iRow,iCol,e){
			$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
		},
		loadComplete : function(xhr) {  //当从服务器返回响应时执行
		},
		loadError : function(xhr, status, error) {            //如果请求服务器失败则调用此方法
			$.xljUtils.getError(xhr.status);
		},
	});
	
}

//修改可阅人
function modifyReader(){
	var url = encodeURI("http://127.0.0.1:8081/platform-app/flow/runtime/query/modify_reader.html?instanceId="+instanceId);
	openWin(url);
}

//调整环节
function modifyAc(){
	var url = encodeURI("http://127.0.0.1:8081/platform-app/flow/runtime/query/modifyAc.html?&instanceId=" + $.getUrlParam('instanceId') + "&requestSource=adjust");
	openWin(url);
}

//修改审批人
function modifyApprover(){
	var url = encodeURI(serviceUrl+"flow/runtime/query/modify_approver.html?instanceId="+instanceId);
	openWin(url);
}

//修改审批人意见
function modifyApproverAdvice(){
	var url = encodeURI(serviceUrl+"flow/runtime/query/modify_advice.html?instanceId="+instanceId);
	openWin(url);
}

//修改过程附件
function modifyAttachment(){
	commonModifyInstance("attachment");
}

function commonModifyInstance(type){
	var url = encodeURI(serviceUrl+"flow/runtime/query/modifyInstance.html?type="+type+"&instanceId="+instanceId);
	openWin(url);
}

//审结
function finishApproval(){
	var urlText = "flow/instance/finishApproval/"+$.getUrlParam('instanceId');
	var paramObject = {}; 
	commonAjaxAction(urlText, paramObject, "审结");
}

//跳过当前审批人
function skipCurrentApprover(){
	var urlText = "flow/instance/skipCurrentApprover/"+$.getUrlParam('instanceId');
	var paramObject = {}; 
	commonAjaxAction(urlText, paramObject, "跳过当前审批人");
}

//放行
function letItGo(){
	var urlText = "flow/instance/letItGo/"+$.getUrlParam('instanceId');
	var paramObject = {}; 
	commonAjaxAction(urlText, paramObject, "放行流程");
}

//作废流程
function cancelInstance(){
	var urlText = "flow/instance/cancelInstance/"+$.getUrlParam('instanceId');
	var paramObject = {}; 
	commonAjaxAction(urlText, paramObject, "作废流程");
}

//传阅
function passAndRead(data){
	var urlText = "flow/instance/passAndRead/"+$.getUrlParam('instanceId');
	var paramObject = new Array(); 
	for (var i in data) {
		paramObject.push({"id":data[i].userId,"name":data[i].realName,"loginName":data[i].loginName});
	}
	commonAjaxAction(urlText, paramObject, "传阅");	
}
//打印
function printInfo(){
	$("#approveHistoryDiv").printFinal({
		preview: false,//打印预览
		impcss: false//引入css文件						 
    });
}

function commonAjaxAction(urlText, paramObject, actionName){
	$.ajax({
	    url: serviceUrl + urlText,
	    data:JSON.stringify(paramObject),
	    type:'POST',
	    contentType:'application/json',
	    dataType:'JSON',
	    success:function (resultData ) {
	        if(resultData) {
	            var successFlag = resultData.success;
	            if(successFlag) {
	              $.xljUtils.tip("green",actionName+"成功！");
	              location.reload();
	            }else {
	         	  $.xljUtils.tip("red",resultData.msg);
	            }
	        }
	    }
	});
}
/**
 * 加载业务表单
 */
function loadBusinessForm() {
	if($.getUrlParam("pcUrl") == ''){
		return;
	}
	
	var startChar = '?';
	if($.getUrlParam("pcUrl").indexOf('?') != -1) {
		startChar = '&';
	}
	
	var url = $.getUrlParam("pcUrl") + startChar + 'businessId=' + $.getUrlParam("businessId") + '&time=' + new Date().getTime();
	
	//针对旧的业务系统参数
	url = url + '&bizId=' + $.getUrlParam("businessId") + '&flCode=' + $.getUrlParam("flCode")
	+ '&DTL_SESSION_ID=' + getCookie('DTL_SESSION_ID') + '&userId=' + window.userId;
	
	$('#bizForm').attr('src',url);
	
	if (document.documentElement.clientHeight < document.documentElement.offsetHeight-4) //减4是因为浏览器的边框是2像素, 否则会一直判断有滚动条
	{
		$("#_approveHistory").setGridWidth($('#approveHistoryDiv').width()-15);
	}
}

/**
 * 初始化关联流程
 */
function initRelateFlow() {
	$.ajax({
		type : 'GET',
		url : serviceUrl + 'flow/instance/getRelateInstances?instanceId=' + $.getUrlParam("instanceId"),
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		success : function(data) {
			if (data.result != "") {
				$("#gllc").show();
				if (data.success) {
					$.each(data.result, function(index, item) {
						var url = serviceUrl + 'flow/runtime/approve/flow_view.html?flCode='
						+ item.flCode + '&businessId=' + item.businessId;
						var linkText = '<a target="_blank" href="' + url + '" >' + item.name + '</a><br/>';
						$('#relateFlow').append($(linkText));
					});
				}
			} else {
				$("#gllc").hide();
			}
		}
	});
}

/**
 * 获取cookie值
 * @param c_name
 * @returns {string}
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

/**
 * 计算iframe高度自适应
 */
function resizeIframe() {
//	if(document.bizForm) {
//		var b_height = Math.max(document.bizForm.document.body.scrollHeight,document.bizForm.document.body.clientHeight);
//		var b_iframe = document.getElementById("bizForm");
//		$(b_iframe).height(b_height + 20);
//	}
	
	var b_height;
	if(document.bizForm) {
		b_height = Math.max(document.bizForm.document.body.scrollHeight, document.bizForm.document.body.clientHeight);
	} else {
		// ff
		var iframeBody = document.getElementById('bizForm').contentDocument.body;
		b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
	}
	
	var b_iframe = document.getElementById("bizForm");
	$(b_iframe).height(b_height + 20);
	
	if(document.bizForm) {
		if (!$.isEmptyObject(document.bizForm) && $(document.bizForm.document).find('#form-composer')) {
			$(document.bizForm.document).find('#form-composer').width($(document.bizForm).width())
		}	
	} else {
		//ff
		var iframeBody = document.getElementById('bizForm').contentDocument.body;
		$(iframeBody).find('#form-composer').width($(b_iframe).width());
	}
}

/**
 * 岗位格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 */
function postFormatter(cellvalue, options, rowObject){	
	if(cellvalue == '' || cellvalue == null){
		return '';
	}else{
		var lastIndex = cellvalue.lastIndexOf('/');
		var first = cellvalue.substring(0, lastIndex);
		var last = cellvalue.substring(lastIndex + 1, cellvalue.length);
		return first + '<br/>' + last;
	}
}