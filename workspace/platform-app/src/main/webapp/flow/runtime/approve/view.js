var postData = {};
var instanceId = "";
var firstTime = "";
$(function() {
	pageInit();
	//tab切换
	$(".addPad button").on("click",function(e){
		var index = $(this).index();
		var name = $(this).attr("name");
		////console.info("click--->>>index="+index+"; name="+name);
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
	
	//因为入口比较多,所以改为默认都执行该方法，去执行力流程可阅人的操作日志状态
	changeInstanceReaderStatus();
});
$(window).resize(function(){
	$(".my-addauto-box").height($(window).height()-70+"px");
	resizeGrid();
});

/**
 * 初始化页面
 */
function pageInit(){
	$(".my-addauto-box").height($(window).height()-70+"px");
	initRelateFlow();
	
	// 构造请求数据
	postData.instanceId = $.getUrlParam("instanceId");
	instanceId = postData.instanceId;
	firstTime = $.getUrlParam("firstTime");
	postData.requestSource = $.getUrlParam("requestSource");
	// 初始化审批历史
	approveHistoryInit();
	
	// 初始化阅读日志
	readRecordInit();
	// 初始化审批流转日志
	instanceTransferInit();
	//待阅改已阅
	chnageStatusOfMsg();
}

function chnageStatusOfMsg(){
	var paramData = {id: $.getUrlParam("msgId"), 'newStatus': 'YY', 'oldStatus': 'DY'};
    var fullUrl = hostUrl+"flow/sysNoticeMsg/updateStatusOfNoticeMsg";
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: fullUrl,
        dataType: "json",
        async: false,
        data: JSON.stringify( paramData ),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
            //console.info("调用待阅变已阅的接口 已成功!");
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "调用待阅变已阅的接口失败！");
            }
        }
    });
}

/**
 * 如果参数的值是YES,调用修改操作日志的状态待阅变为已阅
 */
function changeInstanceReaderStatus(){
	var paramData = {instanceId: instanceId};
    var fullUrl = hostUrl+"flow/instanceOperateLog/changeToReadIntoHaveRead";
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: fullUrl,
        dataType: "json",
        async: true,//改为异步加载处理方式
        data: JSON.stringify( paramData ),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
            //console.info("调用修改操作日志的状态待阅变为已阅的接口 已成功!");
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "调用修改操作日志的状态待阅变为已阅的接口  失败！");
            }
        }
    });
}
/**
 * 初始化审批历史
 */
function approveHistoryInit() {
	$("#_approveHistory").jqGrid(
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
				{name: 'appId',label : 'appId', hidden: true,sortable:false,editable:false},
				{name: 'instanceId',label : 'instanceId', hidden: true,sortable:false,editable:false},
				{name: 'groupKey',label : 'groupKey', hidden: true,sortable:false,editable:false},
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
			forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
			width: $("#approveHistoryDiv").width(),
			rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
			hoverrows:false,                                    //禁止mouse hovering			
			gridComplete : function() {                         //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
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
					$(".settitle span").html(xhr.result[0].instanceName);
					window.flCode = xhr.result[0].flCode;
					//加载业务表单
					loadBusinessForm();
				}else{
					$.xljUtils.tip("red",xhr.msg);
				}
				setTimeout(function(){
					$("#_approveHistory").closest(".ui-jqgrid-bdiv").getNiceScroll().remove();
				},500);
			},
			afterInsertRow: function(rowId, rowData) {
				if(rowData.taskStatus == '3') {
					if(rowData.acType == '1'){
						$('#_attachment-' + rowId).xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.instanceId,mode:'table',hideButtonsWithNoFile:true});
						
						//判断当前用户是否是流程发起人
						if(window.userId == rowData.approverId) {
							$('#_btnUrge').show();
							$('#_btnBack').show();
						}
						
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

/**
 * 初始化阅读日志
 */
function readRecordInit() {
	var paramData = { fiId: instanceId};
	$("#readRecordGrid").jqGrid( {
		url : hostUrl + "flow/instanceReadRecord/queryList",
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
		loadComplete : function(xhr) {  //当从服务器返回响应时执行
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
 * 初始化审批流转日志
 */
function instanceTransferInit() {
	var paramData = { instanceId: instanceId, requestSource: 'DB'};
	$("#instanceTransferGrid").jqGrid( {
		url : hostUrl + "flow/instance/queryTransferList",
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

/**
 * 流程收藏
 * 
 * @returns
 */
function collection() {
	var urlText = "flow/instance/collection/" + $.getUrlParam('instanceId');
	$.ajax({
	    url: hostUrl + urlText,
	    type:'POST',
	    contentType:'application/json',
	    dataType:'JSON',
	    success:function (resultData) {
	        if(resultData) {
	            var successFlag = resultData.success;
	            if(successFlag) {
	                $.xljUtils.tip("green","收藏成功！");
	            }else {
	         	  $.xljUtils.tip("red","收藏失败！");
	            }
	        }
	    }
	});	
}
/**
 * 加载业务表单
 */
function loadBusinessForm() {
	var pcUrl=$.getUrlParam("pcUrl");
	var url;
	if(pcUrl == ''||pcUrl==null){
		var jdata={
				"instanceId":$.getUrlParam('instanceId')
		};
		$.ajax({
			type: 'POST',
			url: hostUrl + 'flow/fl/getFlowRetractForInstance',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			data:JSON.stringify(jdata),
			success: function(data) {
				if(data.success) {
					pcUrl=data.result.pcUrl;
					url = pcUrl + '?businessId=' + $.getUrlParam("businessId") + '&time=' + new Date().getTime();
					$('#bizForm').load(url,function(){

					});
				} 
			}
		});	
	}else{
		
		var startChar = '?';
		if(pcUrl.indexOf('?') != -1) {
			startChar = '&';
		}
		
		url = pcUrl + startChar + 'businessId=' + $.getUrlParam("businessId") + '&time=' + new Date().getTime();
		
		url = url + '&bizId=' + $.getUrlParam("businessId") + '&flCode=' + window.flCode
			+ '&DTL_SESSION_ID=' + getCookie('DTL_SESSION_ID') + '&userId=' + window.userId;

		
		$('#bizForm').attr('src',url);
		

	}

}

/**
 * 初始化关联流程
 */
function initRelateFlow() {
	$.ajax({
		type : 'GET',
		url : hostUrl + 'flow/instance/getRelateInstances?instanceId=' + $.getUrlParam("instanceId"),
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		success : function(data) {
			if (data.result != "") {
				$("#gllc").show();
				if (data.success) {
					$.each(data.result, function(index, item) {
						var url = hostUrl + 'flow/runtime/approve/flow_view.html?flCode='
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
 * 计算iframe高度自适应
 */
function resizeIframe() {
//	if(document.bizForm) {
//		var b_height = Math.max(document.bizForm.document.body.scrollHeight,document.bizForm.document.body.clientHeight);
//		var b_iframe = document.getElementById("bizForm");
//		$(b_iframe).height(b_height + 20);
//	}
	//高度计算
	var b_height;
	if(document.bizForm) {
		b_height = Math.max(document.bizForm.document.body.scrollHeight, document.bizForm.document.body.clientHeight);
	} else {
		// ff
		var iframeBody = document.getElementById('bizForm').contentDocument.body;
		b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
	}
	
	//自适应设置
	if(document.bizForm) {
		// ie, chrome
		var b_iframe = document.getElementById("bizForm");
		if (!$.isEmptyObject(document.bizForm) && $(document.bizForm.document).find('#form-composer')) {
			//自定义表单自适应设置
			$(b_iframe).height(b_height);
			$(document.bizForm.document).find('#form-composer').width($(document.bizForm).width())
		}else{
			$(b_iframe).height(b_height + 20);
		}
	} else {
		//ff
		var iframeBody = document.getElementById('bizForm').contentDocument.body;
		var $iframeBody = $(iframeBody).find('#form-composer');		
		var b_iframe = document.getElementById("bizForm");
		if ($iframeBody) {
			//自定义表单自适应设置
			$(b_iframe).height(b_height);
			$iframeBody.width($(b_iframe).width());
		}else{
			$(b_iframe).height(b_height + 20);
		}
	}
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