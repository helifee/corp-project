var postData = {};
var instanceId = "";
$(function() {
	pageInit();
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

	//编辑业务表单按钮事件，跳转业务表单编辑页面
	$('#editBusiForm').on('click',function () {
		try {
			if(window.document.bizForm&&$.isFunction(window.document.bizForm.editBusiForm)){
				window.document.bizForm.editBusiForm();
			}
		}catch (e){
			$.xljUtils.tip('blue','跳转业务表单编辑页面失败！');
		}

	});

	//保存业务表单
	$('#saveBusiForm').on('click',function () {
		try {
			if(window.document.bizForm&&$.isFunction(window.document.bizForm.saveBusiForm)){
				window.document.bizForm.saveBusiForm();
			}
		}catch (e){
			$.xljUtils.tip('blue','跳转业务表单编辑页面失败！');
		}
	});

	//取消保存业务表单
	$('#cancelSaveBusiForm').on('click',function () {
		try {
			if(window.document.bizForm&&$.isFunction(window.document.bizForm.cancelSaveBusiForm)){
				window.document.bizForm.cancelSaveBusiForm();
			}
		}catch (e){
			$.xljUtils.tip('blue','跳转业务表单编辑页面失败！');
		}
	});
});
$(window).resize(function(){
	resizeGrid();
	$("#lcbegin").height(($(window).height()-140)+"px");
	$("#approveArea").height(($(window).height()-140)+"px");
});

/**
 * 初始化页面
 */
function pageInit(){

	$("#lcbegin").height(($(window).height()-140)+"px");
	$("#approveArea").height(($(window).height()-140)+"px"
	);
//	getCurrentUser();
	
	//初始化关联流程
	initRelateFlow();
	
	// 构造请求数据
	postData.instanceId = $.getUrlParam("instanceId");
	postData.requestSource = $.getUrlParam("requestSource");
	
	//1、查询审批列表
	initApprovalList();
	
	// 初始化阅读日志
	readRecordInit();
	
	// 初始化审批流转日志
	instanceTransferInit();
	
	//设置对应消息为已打开过状态
	setMessageOpened();

//	initButton();
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
 * 初始化按钮状态
 */
function initButton() {
	// 1-运行中、2-正常完成、3-撤回、4-打回、7-作废、9-挂起
	var status=1;
	var data={
			"instanceId":$.getUrlParam('instanceId')
	};
	$.ajax({
		type: 'POST',
		url: hostUrl + 'flow/fl/getFlowRetractForInstance',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data:JSON.stringify(data),
		success: function(data) {
			if(data.success) {
				if(data.result == null) {
					return ;
				}
				status=data.result.incStatus;
				if (status == '4' ) {
					$('#btnArea').hide();
					$('#_BtnCloseOne').show();
				}else{
					$('#btnArea').show();
					$('#_BtnCloseOne').hide();
				}
			} 
		}
	});
	
}
/**
 * 根据URL中的消息ID，将消息置为已打开过状态
 * 判断审批人能否撤回任务时使用
 * 
 * @returns
 */
function setMessageOpened() {
	$.ajax({
		type: 'GET',
		url: hostUrl + 'flow/sysNoticeMsg/setMessageOpened?messageId=' +$.getUrlParam("msgId"),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function() {
			// //console.info('更新消息状态成功！msgId=' + $.getUrlParam("msgId"));
		}
	});		
}

function initApprovalList() {

	$("#approvalList").jqGrid(
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
					{name: 'approverStatus',label : '责任人状态',hidden: true,sortable:false,editable:false},	//用于页面控制行挂起状态
					{name: 'taskId',label : '任务ID',hidden: true,sortable:false,editable:false},
					{name: 'taskStatus',label : '责任人点亮状态',hidden: true,sortable:false,editable:false},
					{name: 'approvalType',label : '操作',width: 70,editable:false,sortable:false,cellattr:addCellAttr, formatter: typeFormatter},
					{name: 'approvalTypeId',label : '审批类型ID',hidden: true,sortable:false,editable:false},
					{name: 'taskComments',label : '处理意见',editable:false,sortable:false,cellattr:addCellAttr,formatter: taskFormatter},
					{name: 'taskEndTime',label : '处理时间',editable:false,sortable:false,cellattr:addCellAttr}
					
				],
				forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。

				width: $("#approveHistoryDiv").width(),
				rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
				hoverrows:false,                                    //禁止mouse hovering			
				gridComplete : function() {                         //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件

		        	mergerCell("approvalList");                  //合并单元格
		        	setRunningStatus("approvalList",false);      //设置运行标识
					$("#approvalList").closest(".ui-jqgrid-bdiv").css("height", "auto");
					$("#approvalList").jqGrid().setGridWidth($("#approveHistoryDiv").width(),true);
					
					//加载流程表单数据(当前环节计算出后加载业务表单)
//					loadBusinessForm();

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
							
							//如果流程结束，隐藏撤回按钮
							if(xhr.result[0].instanceStatus == '2') {
								$('#withDrawTask').hide();
							}
						}
					}else{
						$.xljUtils.tip("red",xhr.msg);
					}
					setTimeout(function(){
						$("#approvalList").closest(".ui-jqgrid-bdiv").getNiceScroll().remove();
					},500);
				},
				loadError : function(xhr, status, error) {            //如果请求服务器失败则调用此方法
					$.xljUtils.getError(xhr.status);
				},
				afterInsertRow: function(rowId, rowData) {
					
					if(rowData.taskStatus == '3') {
						if(rowData.acType == '1'){
							$('#_attachment-' + rowId).xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.instanceId,mode:'table',hideButtonsWithNoFile:true});
							// //console.info({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.instanceId,mode:'view',hideButtonsWithNoFile:true});
						}else{
							if(rowData.groupKey != null) {
								$('#_attachment-' + rowId).xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.groupKey,mode:'table',hideButtonsWithNoFile:true});
								// //console.info({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.groupKey,mode:'view',hideButtonsWithNoFile:true});
							}
						}
					}					
					//当前人
					if(rowData.taskId == $.getUrlParam("taskId")) {
						
						//当前用户是当行审批人
						if(rowData.taskStatus == '2') {
							$('#_currentAttachment').xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.groupKey,mode:'add',hideButtonsWithNoFile:true});
							$('#approveArea').show();
							$('#withDrawTask').hide();
//							$('#btnArea').hide();
//							$('#_BtnCloseOne').show();
							$('#lcbegin').removeClass('col-xs-12').addClass('b_left col-xs-9');
							$('#approvalList').jqGrid().setGridWidth($('#approveHistoryDiv').width());
							
							//2、初始化操作类型
							initOperation();
							
							//3、初始化下一环节
							initNext();
							
							approve();
							
							//保存当前节点审批类型
							window.currentApprovalTypeId = $('#approvalList').getCell(rowId, 'approvalTypeId');
							
							//当前用户已审批完成
						} /*else if(rowData.taskStatus == '3') {
							$('#btnArea').show();
							$('#_BtnCloseOne').hide();
						}*/
						
					};					
				}
			});
		
}

function approve() {
	$("#approval").click(function() {
		
		//审批前检查
		if(!validateBeforeApprove()) {
			return ;
		}

//不再保存业务系统表单数据		
//		try {
//			if(window.bizForm&&$.isFunction(window.bizForm.bizFormSubmit)){
//				var def = window.bizForm.bizFormSubmit();
//				/*if(!formSaveResult){
//					$.xljUtils.tip('red','表单数据保存失败');
//					return;
//				}*/
//				$.when(def).done(function (data) {
//					if(data){
//						submitProcess();
//					}else{
//						$.xljUtils.tip('red','表单数据保存失败');
//					}
//				});
//
//			}else{
//				submitProcess();
//			}
//		} catch(e) {	//跨域时异常
//			submitProcess();
//		}
		
		submitProcess();
	});
}

function validateBeforeApprove() {
	var approvalResult = $('input[name="approvalResult"]').filter(':checked').val();
	var approvalText = $("#approvalText").val();
	if("XB" == approvalResult){
		var xbPersonId = $("#xbPersonId").val();
		if(!xbPersonId){
			$.xljUtils.tip('red', '请选择协办人！');
			return false;
		}
		if(!approvalText || approvalText==""){
		  if($("#XB-noteType").val()=='true'){
			$.xljUtils.tip('red', '请填写处理意见！');
			return false;
		}
	 }
	}
	if("ZB" == approvalResult){
		var zbPersonId = $("#zbPersonId").val();
		if(!zbPersonId){
			$.xljUtils.tip('red', '请选择转办人！');
			return false;
		}
		if(!approvalText || approvalText==""){
			  if($("#ZB-noteType").val()=='true'){
				$.xljUtils.tip('red', '请填写处理意见！');
				return false;
			}
		 }
	}

	if("DH" == approvalResult) {
		if(!approvalText || approvalText==""){
			if($("#DH-noteType").val()=='true'){
				$.xljUtils.tip('red', '请填写处理意见！');
				return false;
			}
		}
	}
	
	if("TY" == approvalResult) {
		if(!approvalText || approvalText==""){
			if($("#TY-noteType").val()=='true'){
				$.xljUtils.tip('red', '请填写处理意见！');
				return false;
			}
		}
	}

	return true;
}

function submitProcess() {
	window.approvalSubmit = {};
	approvalSubmit.instanceId = $.getUrlParam('instanceId');
	approvalSubmit.taskId = $.getUrlParam('taskId');
	approvalSubmit.msgId = $.getUrlParam('msgId');
	approvalSubmit.operationType = $("input[name='approvalResult']:checked").val();
	approvalSubmit.operationName = $("input[name='approvalResult']:checked").parent().text();
	approvalSubmit.userNote = $("#approvalText").val();

	if(approvalSubmit.operationType == 'XB') {
		approvalSubmit.assisters = $('#xbPersonId').val();
		approvalSubmit.assistersName = $('#xbPersonName').val();

	} else if(approvalSubmit.operationType == 'ZB') {
		approvalSubmit.transferId = $('#zbPersonId').val();
		approvalSubmit.transferName = $('#zbPersonName').val();

	} else if(approvalSubmit.operationType == 'DH') {
		approvalSubmit.returnApprover = $('#selectDHR').val();
		approvalSubmit.returnApproverName = $('#selectDHR option:selected').attr('data-returnName')
		approvalSubmit.approveRepeat = $("input[name='approveRepeat']:checked").val();
	}
	
	$('#_currentAttachment').xljAttachmentSubmit(function(success, result) {
		if(success == false) {
//			if (result.code == $.xljUtils.uploadResultCode.uploadUnfinished) {
//				
//			} else {
//				
//			}
		} else {
			$.ajax({
				type: 'POST',
				url: hostUrl + 'flow/instance/approval',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				data: JSON.stringify(approvalSubmit),
				success: function(data) {
					if(data.success) {
						$.xljUtils.tip('green', '审批成功！');
						$('#_currentAttachment').xljAttachmentSubmit();
						location.reload();

					} else {
						$.xljUtils.tip('red', data.msg);
					}
				}
			});
		}
	});

	
}

function shut() {
	closeWin();
}
/**
 * 传阅
 */
function passAndRead(data){
	var urlText = "flow/instance/passAndRead/"+$.getUrlParam('instanceId');
	var paramObject = new Array(); 
	for (var i in data) {
		paramObject.push({"id":data[i].userId,"name":data[i].realName,"loginName":data[i].loginName});
	}
	commonAjaxAction(urlText, paramObject, "传阅");	
}
function withDrawTask() {
	$.ajax({
		type: 'GET',
		url: hostUrl + 'flow/instance/withDrawTask?instanceId=' + $.getUrlParam('instanceId') 
			+ '&taskId=' + $.getUrlParam("taskId"),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(data) {
			if(data.success) {
				location.reload();
			} else {
				$.xljUtils.tip('red', data.msg);
			}
		}
	});		
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
function typeFormatter(cellvalue, options, rowObject){
	if(rowObject.taskResult == 'START') {
		return '发起流程';
	} else {
		return (rowObject.taskResultName == null)?'': rowObject.taskResultName;
	} 
}

function initOperation() {
	//加载操作类型
	$.ajax({
		type: 'POST',
		url: hostUrl + 'flow/approveOperation/queryListByApproveRoleCode',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({typeCode: $.getUrlParam('approveType'), approveRole: $.getUrlParam('taskType')}),
		success: function(data) {
			if(data.result == null || data.result.length == 0) {
				$.xljUtils.tip("red", "操作类型配置为空！");
			}
			$.each(data.result, function() {
				if(this.operationCode == 'XB') {
					$('<label><input name="approvalResult" type="radio" onclick="radioChange(\'' + this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" />' + this.showName + '</label>'
					+'<input type="hidden" class="form-control" id="XB-noteType" readonly="readonly" >').appendTo('#operate');

					$('<div id="XBDIV" style="display:none" class="input-group"><input type="text" class="form-control" id="xbPersonName" readonly="readonly" placeholder="选择人员（多选）">'
						+'<input type="hidden" class="form-control" id="xbPersonId" readonly="readonly" title="选择人员（多选）" placeholder="选择人员（多选）">'
						+'<span class="input-group-addon multiple-selector" data-selectorType="person" data-title="选择人员" data-targetname="xbPersonName" data-targetid="xbPersonId">...</span></div>').insertAfter('#operate');


					$('#XB-noteType').val(this.noteType);
				} else if(this.operationCode == 'ZB') {
					$('<label><input name="approvalResult" type="radio" onclick="radioChange(\'' + this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" />' + this.showName + '</label>'
					+'<input type="hidden" class="form-control" id="ZB-noteType" readonly="readonly" >').appendTo('#operate');

					$('<div id="ZBDIV" style="display:none" class="input-group"><input type="text" class="form-control" id="zbPersonName" readonly="readonly" placeholder="选择人员">'
						+'<input type="hidden" class="form-control" id="zbPersonId" readonly="readonly" title="选择人员" placeholder="选择人员">'
						+'<span class="input-group-addon single-selector" data-selectorType="person" data-title="选择人员" data-targetname="zbPersonName" data-targetid="zbPersonId">...</span></div>').insertAfter('#operate');


					$('#ZB-noteType').val(this.noteType);
				} else if(this.operationCode == 'WYY' || this.operationCode == 'TY') {
					$('<label><input name="approvalResult" type="radio" onclick="radioChange(\'' + this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" checked/>' + this.showName + '</label>'
					+'<input type="hidden" class="form-control" id="TY-noteType" readonly="readonly" >').appendTo('#operate');
					$('#approvalText').val(this.defaultNote);
					$('#TY-noteType').val(this.noteType);
				} else if(this.operationCode == 'DH') {
					$('<label><input name="approvalResult" type="radio" onclick="radioChange(\'' + this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" />' + this.showName + '</label>'
					+'<input type="hidden" class="form-control" id="DH-noteType" readonly="readonly" >').appendTo('#operate');
					$('#DH-noteType').val(this.noteType);
					var selector = $('<div class="input-group select-box" id="selectDHRBox" style="display:none"><span class="input-group-addon">打回到</span><select id="selectDHR" class="form-control"></select></div>')
					selector.appendTo('#operate');
					$('#noteType').val(this.noteType);
					$('<div id="approveRepeatDiv" style="display:none"><span style="margin-right: 5px;">重新审批</span>'
						+ '<input name="approveRepeat" type="radio" value="1" checked />是&nbsp&nbsp&nbsp&nbsp'       
						+ '<input name="approveRepeat" type="radio" value="0" />否</div>').appendTo('#operate');
					
				} else {
					$('<label><input name="approvalResult" type="radio" onclick="radioChange(\'' + this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" />' + this.showName + '</label>').appendTo('#operate');
				}
			});
			
			$('#operate input[name=approvalResult]')[0].checked = true;
			
			$('#operate').parents('table').xljMultipleSelectorUtil();
			$('#operate').parents('table').xljSingleSelectorUtil();
		}
	});	
}

function initNext() {
	var nexAc = '';
	//计算下一环节
	$.ajax({
		type: 'POST',
		url: hostUrl + 'flow/instance/queryNext',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({instanceId: $.getUrlParam('instanceId'), taskId: $.getUrlParam('taskId')}),
		success: function(data) {
			if(data.result == '') {
				$("#next").html('结束');
			} else {
				$.each(data.result, function() {
//					alert(this.split('-')[0]);
//					$('<label>' + this + '</label><br/>').appendTo('#next');
					nexAc = nexAc + this.split('-')[0] + ',';
				});
				if(nexAc!=''){
					$("#next").html(nexAc.substring(0, nexAc.length-1));
				}else{
					$("#next").html(nexAc);
				}
			}
		}
	});	
}

function radioChange(code, defaultNote){
	// //console.info("radioChange----"+code);
	$("#ZBDIV").hide();
	$("#XBDIV").hide();
	$('#selectDHRBox').hide();
	$('#approveRepeatDiv').hide();
	if("ZB"==code || "XB"==code){
		$("#"+code+"DIV").show();
		
		
		//查询打回目标人
	} else if(code == 'DH') {
		$('#selectDHRBox').show();
		$('#approveRepeatDiv').show();
		$.ajax({
			type: 'POST',
			url: hostUrl + 'flow/instance/queryApproverDone',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			data: JSON.stringify({instanceId: $.getUrlParam('instanceId'), taskId: $.getUrlParam('taskId')}),
			success: function(data) {
				$('#selectDHR').empty();
				$.each(data.result, function() {
					$('#selectDHR').append('<option value="'+ this.id + '" data-returnName="' + this.name + '">' + this.displayName + '</option>'); 
				});
			}
		});	
	}
	//设置各个操作的默认值
     if($('#approvalText').val()=="无异议"||$('#approvalText').val()=="沟通"||$('#approvalText').val()=="协办"||$('#approvalText').val()=="转办"){
    	  $('#approvalText').val('<font color=red>*</font>'+defaultNote);
     }
}
/**
 * Grid自适应
 */
function resizeGrid(){
	$("#approvalList").setGridWidth($('#approveHistoryDiv').width());
	$("#approvalList").setGridHeight("auto");
	$("#instanceTransferGrid").setGridWidth($('#instanceDiv').width());
	$("#instanceTransferGrid").setGridHeight("auto");
	$("#readRecordGrid").setGridWidth($('#readRecordDiv').width());
	$("#readRecordGrid").setGridHeight("auto");
}

/**
 * 初始化阅读日志
 */
function readRecordInit() {
	// //console.info("readRecordInit----");
	var paramData = { fiId: $.getUrlParam("instanceId")};
	// //console.info(paramData);
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
	var paramData = { instanceId: $.getUrlParam("instanceId"), requestSource: 'DB'};
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
	if($.getUrlParam("pcUrl") == ''){
		return;
	}	
	
	var startChar = '?';
	if($.getUrlParam("pcUrl").indexOf('?') != -1) {
		startChar = '&';
	}
	
	var url = $.getUrlParam("pcUrl") + startChar
			+ 'businessId=' + $.getUrlParam("businessId") + '&time=' + Math.random();
	
	//针对旧的业务系统参数
	url = url + '&bizId=' + $.getUrlParam("businessId") + '&flCode=' + $.getUrlParam("flCode")
	+ '&DTL_SESSION_ID=' + getCookie('DTL_SESSION_ID') + '&userId=' + window.userId;
	
	url = url + '&approveType=' + window.currentApprovalTypeId;

//	$('#bizForm').load(url,function(){
//	});
	$('#bizForm').attr('src',url);

	if (document.documentElement.clientHeight < document.documentElement.offsetHeight-4) //减4是因为浏览器的边框是2像素, 否则会一直判断有滚动条
	{
		$("#approvalList").setGridWidth($('#approveHistoryDiv').width()-15);
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
 * JS API:用于内嵌的业务页面调用，取得当前审批类型
 * @returns
 */
function getCurrentApproveType() {
	return window.currentApprovalTypeId;
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
