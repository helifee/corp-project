var postData = {};
var instanceId = "";
$(function() {

	var instanceId = $.xljUtils.getUrlParam('instanceId');
	var sourceInstanceId = $.xljUtils.getUrlParam('sourceInstanceId');
	validateInstanceDataAuth(instanceId,sourceInstanceId);
	// 
	var tendCode = $.getUrlParam("tendCode");
	/*if(tendCode != null) {
		$.ajax({
			url: serviceUrl + "/sys/thirdPartyAuthentication/setLoginInfo?tendCode=" + tendCode + "&userId=" + $.getUrlParam("uid"),
			type: 'GET',
			async: true,
			success: function(data) {
			}
		});
	}*/
	
	pageInit();
	
	//tab切换
	$(".addPad button").on("click", function(){
		var index = $(this).index();
		var name = $(this).attr("name");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		var tabboxs = $(this).parent().parent().find(".tabbox");
		$("#approveHistoryDiv").hide();
		$("#instanceDiv").hide();
		$("#readRecordDiv").hide();
		$("#" + name + "Div").show();
		resizeGrid();
		setEnglishTip(name + "Div");
		if(index==0){//切换回审批记录tab时刷新业务表单解决ie在业务表单未加载完成时切换导致表单变形问题
        	resizeIframe();
        }
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

	//流程实例流转图
	$('#showInstanceChartBtn').on('click',function () {
		if($(this).find('i').hasClass('glyphicon-chevron-up')){
			$('#instanceChartIframe').css({height:($('#lcbegin').height()-100)+'px'});
			$(this).find('i').addClass('glyphicon-chevron-down');
			$(this).find('i').removeClass('glyphicon-chevron-up');
			$(this).find('i').html('&nbsp;收起');
			$('#instanceChartDiv').show();
			$('#instanceTransferGrid').parents('.grid-container').hide();
		}else{
			$(this).find('i').addClass('glyphicon-chevron-up');
			$(this).find('i').removeClass('glyphicon-chevron-down');
			$(this).find('i').html('&nbsp;展开');
			$('#instanceChartDiv').hide();
			$('#instanceTransferGrid').parents('.grid-container').show();
		}
	});

});

$(window).resize(function(){
	resizeGrid();
	var h = $(window).height()-$("#beginapproval").outerHeight()-$(".settitle").outerHeight()-130;
	$("#lcbegin").height(h+"px");
	$("#approveArea").height(h+"px");
	//resizeInstanceChartIframe();
});

function resizeInstanceChartIframe() {
	$('#instanceChartIframe').css({height:($('#lcbegin').height()-100)+'px'});
}

function validateInstanceDataAuth(instanceId,sourceInstanceId) {
	if(!instanceId){
		return;
	}
	var urlParam = '';
	if(sourceInstanceId){
		urlParam = '?sourceInstanceId='+sourceInstanceId;
	}
	$.ajax({
		type: 'GET',
		url: serviceUrl + 'flow/instance/validateInstanceDataAuth/'+ instanceId + urlParam,
		dataType: 'JSON',
		async:false,
		success: function(data) {
			if(data.success) {
				if(!data.result){
					window.open(serviceUrl + 'nopower.html','_self');
				}
			} else {
				//$.xljUtils.tip('red', data.msg);
				window.open(serviceUrl + 'nopower.html','_self');
			}
		}
	});
}

/**
 * 初始化页面
 */
function pageInit(){

	var h = $(window).height()-$("#beginapproval").outerHeight()-$(".settitle").outerHeight()-130;
	$("#lcbegin").height(h+"px");
	$("#approveArea").height(h+"px");

	// 构造请求数据
	postData.instanceId = $.getUrlParam("instanceId");
	postData.businessId = $.getUrlParam("businessId");
	postData.flCode = $.getUrlParam("flCode");
	postData.appId = $.getUrlParam("appId");
	postData.userId = $.getUrlParam("userId");
	
	$.ajax({
	    url: serviceUrl + "flow/instance/flowView",
	    data: JSON.stringify(postData),
	    type: 'POST',
	    contentType: 'application/json',
	    dataType: 'JSON',
	    success: function(data) {
//	    	if(!data.success) {
//	    		$.xljUtils.tip('red', data.msg);
//	    		return ;
//	    	}
	    	
	    	if(!data.success && data.code == 'relogin') {
	    		location.href = serviceUrl + 'login.html';
	    		return ;
	    	}
	    	
	    	window.viewBean = data.result;
	    	
	    	//设置流程标题
	    	$(".settitle span").html(data.result.instanceName);
	    	
	    	//加载业务表单
				loadBusinessForm(data.result);

				//初始化关联流程
				initRelateFlow(data.result);
	    	
				setTimeout(function(){
					//1、查询审批列表
					initApprovalList(data.result.list);
					
					//加载功能操作按钮
					initButton(data.result.btnCodes);
					
					//加载审批操作
					initApproveOperation(data.result);
					
					// 初始化阅读日志
					readRecordInit(data.result.instanceId);
					
					// 初始化审批流转日志
					instanceTransferInit(data.result.instanceId);
					
					//设置对应消息为已打开过状态(如果地址URL中有msgId)
					setMessageOpened();

					//待阅变已阅
					chnageStatusOfMsg('YY', 'DY');

					//$('body').data('flowRecordList',data.result.list);
					//加载流程实例流转图
					$('#instanceChartIframe').attr('src', 'http://127.0.0.1:8081/platform-app/flow/runtime/approve/flow_chart.html?instanceId='+ data.result.instanceId);
				}, 1000);


	    }
	});
}

function chnageStatusOfMsg(destState, sourceState) {
	var msgId = $.getUrlParam("msgId");
	if (msgId) {
		// 因为入口比较多,所以改为默认都执行该方法，去执行力流程可阅人的操作日志状态(从view.js迁移过来)
		var instanceId = $.getUrlParam("instanceId");
		changeInstanceReaderStatus(instanceId);
		
		var paramData = {
			id : msgId,
			'newStatus' : destState,
			'oldStatus' : sourceState
		};
		var fullUrl = serviceUrl + "flow/sysNoticeMsg/updateStatusOfNoticeMsg";
		$.ajax({ // 发送更新的ajax请求
			type : "post",
			url : fullUrl,
			dataType : "json",
			data : JSON.stringify(paramData),
			contentType : 'application/json;charset=utf-8', // 设置请求头信息
			success : function(data) {
				//3之后处理刷新消息列表问题
				setTimeout(function () {
					refreshTaskList();
				},3000);
			},
			error : function(data) {
				if (data.msg) {
					pop_tip_open('red', data.msg);
				} else {
					pop_tip_open('red', "调用改变消息状态的接口失败！");
				}
			}
		});
	}
}

/**
 * 初始化关联流程
 */
function initRelateFlow(viewBean) {
	if (viewBean.relateFlows != null && viewBean.relateFlows.length > 0) {
		$("#gllc").show();
		$.each(viewBean.relateFlows, function(index, item) {
			var url = serviceUrl + 'flow/runtime/approve/flow.html?instanceId=' + item.id + '&flCode='
			+ item.flCode + '&businessId=' + item.businessId + '&sourceInstanceId='+viewBean.instanceId;
			if(sessionSign){
				url += '&_s='+sessionSign;
			}
			var linkText = '<a target="_blank" href="' + url + '" >' + item.name + '</a><br/>';
			$('#relateFlow').append($(linkText));
		});
	} else {
		$("#gllc").hide();
	}
}

/**
 * 初始化按钮状态
 */
function initButton(btnCodes) {
	var buttonDataSortArr = buttonSort(btnCodes);
	var buttonHtml = "";
	var aHtml = "";
	if(buttonDataSortArr.length <= 6){
		for(var i = buttonDataSortArr.length-1; i>=0 ;i--) {
			if(buttonDataSortArr[i].name == "print"){
				buttonHtml += "<button type='button' class='btn btn-sm btn-adv' onclick='customPrint()' title='printing' id='print'>打印</button>";
			}else if(buttonDataSortArr[i].name == "shut"){
				$("#shut").show();
			}else{
				buttonHtml += "<button type='button' class='btn btn-sm btn-adv' onclick='"+buttonDataSortArr[i].name+"()' id='"+buttonDataSortArr[i].name+"' title='"+buttonDataSortArr[i].tip+"'>"+buttonDataSortArr[i].value+"</button>";
			}
		}
	}else{
		for(var i = 3; i>=0 ;i--) {
			buttonHtml += "<button type='button' class='btn btn-sm btn-adv' onclick='"+buttonDataSortArr[i].name+"()' id='"+buttonDataSortArr[i].name+"' title='"+buttonDataSortArr[i].tip+"'>"+buttonDataSortArr[i].value+"</button>";
			if(buttonDataSortArr[i].name == "print"){
				buttonHtml += "<button type='button' class='btn btn-sm btn-adv' onclick='customPrint()' id='print' title='printing'>打印</button>";
			}
		}
		for(var i = 4; i < buttonDataSortArr.length;i++){
			if(buttonDataSortArr[i].name == "print"){
				aHtml += "<li><a onclick='customPrint()' id='print' title='printing'>打印</a></li>"
			}else if(buttonDataSortArr[i].name == "shut"){
				$("#shut").show();
			}else{
				aHtml += "<li><a onclick='"+buttonDataSortArr[i].name+"();' id='"+buttonDataSortArr[i].name+"' title='"+buttonDataSortArr[i].tip+"'>"+buttonDataSortArr[i].value+"</a></li>"
			}
		}
		$("#prMore").show();
	}
	$("#btnArea").append(buttonHtml);
	$("#menu").html(aHtml);
}

/*英文提示*/
function buttonDataTipFN(){
	var buttonDataArrTip = {};
	buttonDataArrTip["modifyAc"] = "adjust the link";
	buttonDataArrTip["finishApproval"] = "approval finish";
	buttonDataArrTip["cancelInstance"] = "nullify flow";
	buttonDataArrTip["modifyApproverAdvice"] = "modify approval suggestion";
	buttonDataArrTip["letItGo"] = "release";
	buttonDataArrTip["skipCurrentApprover"] = "skip current approver";
	buttonDataArrTip["modifyApprover"] = "modify approver";
	buttonDataArrTip["modifyReader"] = "modify reader";
	buttonDataArrTip["withDrawFlow"] = "revoke approval process";
	buttonDataArrTip["remind"] = "hasten";
	buttonDataArrTip["withDrawTask"] = "withdraw the task";
	buttonDataArrTip["pass"] = "deliver";
	buttonDataArrTip["collect"] = "enshrine";
	buttonDataArrTip["print"] = "printing";
	buttonDataArrTip["shut"] = "close";
	return buttonDataArrTip;
}
/**
 * 按钮排序
 * @returns
 */
function buttonSort(btnCodes){
	var buttonDataArr = buttonData();
	var buttonDataTip = buttonDataTipFN();
	var buttonDataSortArr = new Array()
	for(var key in buttonDataArr){
		$.each(btnCodes, function(index, item) {
			if(item == key){
				var buttonDataSort = {};
				buttonDataSort["name"] = key;
				buttonDataSort["tip"] = buttonDataTip[key];
				buttonDataSort["value"] = buttonDataArr[key];
				buttonDataSortArr.push(buttonDataSort);
				return true;
			}
		});
	}
	return buttonDataSortArr;
}

/**
 * 把按钮按顺序放入数组里面
 * @returns
 */
function buttonData(){
	var buttonDataArr = {};
	buttonDataArr["modifyAc"] = "调整环节";
	buttonDataArr["finishApproval"] = "审结";
	buttonDataArr["cancelInstance"] = "作废流程";
	buttonDataArr["modifyApproverAdvice"] = "修改处理意见";
	buttonDataArr["letItGo"] = "放行";
	buttonDataArr["skipCurrentApprover"] = "跳过当前审批人";
	buttonDataArr["modifyApprover"] = "修改审批人";
	buttonDataArr["modifyReader"] = "修改可阅人";
	buttonDataArr["withDrawFlow"] = "撤回流程";
	buttonDataArr["remind"] = "催办";
	buttonDataArr["withDrawTask"] = "撤回任务";
	buttonDataArr["pass"] = "传阅";
	buttonDataArr["collect"] = "收藏";
	buttonDataArr["print"] = "打印";
	buttonDataArr["shut"] = "关闭";
	return buttonDataArr;
}

/**
 * 根据URL中的消息ID，将消息置为已打开过状态
 * 判断审批人能否撤回任务时使用
 * 
 * @returns
 */
function setMessageOpened() {
	var msgId = $.getUrlParam("msgId");
	if(msgId != null) {
		$.ajax({
			type: 'GET',
			url: serviceUrl + 'flow/sysNoticeMsg/setMessageOpened?messageId=' + msgId,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: function() {
				//console.info('更新消息状态成功！msgId=' + $.getUrlParam("msgId"));
			}
		});		
	}
}

function initApprovalList(list) {
	$("#approvalList").jqGrid({
//		data: list,
		datatype: 'local',
		hoverrows:false,
		forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
		rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
		width: $("#approvalListDiv").width(),
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
			{name: 'postName',label : '岗位',width: 180,sortable:false,editable:false,cellattr:addCellAttr, formatter: postFormatter},
			{name: 'postStatus',label : '岗位点亮状态', hidden: true,sortable:false,editable:false},
			{name: 'approverId',label : '责任ID',  hidden: true,editable:false,sortable:false},
			{name: 'approverName',label : '责任人',width: 70,editable:false,sortable:false,cellattr:addCellAttr},
			{name: 'approverStatus',label : '责任人状态',hidden: true,sortable:false,editable:false},	//用于页面控制行挂起状态
			{name: 'taskId',label : '任务ID',hidden: true,sortable:false,editable:false},
			{name: 'taskStatus',label : '责任人点亮状态',hidden: true,sortable:false,editable:false},
			{name: 'approvalType',label : '操作',width: 70,editable:false,sortable:false,cellattr:addCellAttr, formatter: typeFormatter},
			{name: 'approvalTypeId',label : '审批类型ID',hidden: true,sortable:false,editable:false},
			{name: 'taskComments',label : '处理意见',width: 250,editable:false,sortable:false,cellattr:addCellAttr,formatter: taskFormatter},
			{name: 'taskEndTime',label : '处理时间',width: 70,editable:false,sortable:false,cellattr:addCellAttr,formatter: dateFormatter}
			
		],
		gridComplete : function() {                         //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
        	mergerCell("approvalList");                  //合并单元格
        	setRunningStatus("approvalList",false);      //设置运行标识
			$("#approvalList").closest(".ui-jqgrid-bdiv").css("height", "auto");
			$("#approvalList").jqGrid().setGridWidth($("#approvalListDiv").width(),true);
			//列头英文悬浮提示
			addApproveEnglishTip();
		},
		onRightClickRow:function(rowid,iRow,iCol,e){
			$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
		},
		beforeSelectRow:function(rowid, e){
			return false;
		},
		afterInsertRow: function(rowId, rowData) {
			if(rowData.taskStatus == '3') {
				if(rowData.acType == '1'){
					$('#_attachment-' + rowId).xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.instanceId,mode:'table',hideButtonsWithNoFile:true});
				}else{
					if(rowData.groupKey != null) {
						$('#_attachment-' + rowId).xljAttachment({appId:rowData.appId,businessId:rowData.instanceId,categoryId:rowData.groupKey,mode:'table',hideButtonsWithNoFile:true});
					}
				}
			}					
		}
	});
	
	for(var i=0; i<list.length; i++) {
		$("#approvalList").jqGrid().addRowData(i + 1, list[i]);
	}
}

/**
 * 获取流程审批列表数据
 * @returns {jQuery}
 */
function getApproveListForInstanceChart() {
	return $('#approvalList').jqGrid('getRowData');
}

function initApproveOperation(viewBean) {
	if(viewBean.operations != null 
			&& viewBean.operations.length > 0
			&& $.getUrlParam("source") != 'FQ') {
		$('#_currentAttachment').xljAttachment({
			appId: viewBean.appId, 
			businessId: viewBean.instanceId, 
			categoryId: viewBean.currentGroupKey, 
			mode:'edit',
		});
		
		$('#approveArea').show();
		$('#withDrawTask').hide();
		$('#lcbegin').removeClass('col-xs-12').addClass('b_left col-xs-9');
		$('#approvalList').jqGrid().setGridWidth($('#approvalListDiv').width());
		
		//2、初始化操作类型
		initOperation(viewBean.operations);
		
		//3、初始化下一环节
		initNext(viewBean.nextAc);
		
		//绑定审批事件
		$("#approval").on("click", function(e) {
			
			//禁用提交按钮，防止反复提交
			$(this).css("background","#F0F0F0");
			$(this).attr({ disabled: "disabled" });
			$(this).text("提交中...");
			
			//审批前检查
			if(!validateBeforeApprove()) {
				
				$(this).css("background","#ac2925");
				$(this).removeAttr('disabled');
				$(this).text("提交审批");
				
				return ;
			}
			
			submitProcess(viewBean);
		});
	} 
}

function initOperation(operations) {
	//加载操作类型
	$.each(operations, function() {
		if(this.operationCode == 'XB') {
			$('<label title="' + this.eName + '"><input name="approvalResult" type="radio" onclick="radioChange(\'' + this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" />' + this.showName + '</label>'
			+'<input type="hidden" class="form-control" id="XB-noteType" readonly="readonly" >').appendTo('#operate');

			$('<div id="XBDIV" style="display:none" class="input-group"><input type="text" class="form-control" id="xbPersonName" readonly="readonly" placeholder="选择人员（多选）">'
				+'<input type="hidden" class="form-control" id="xbPersonId" readonly="readonly" title="选择人员（多选）" placeholder="选择人员（多选）">'
				+'<span class="input-group-addon multiple-selector" data-selectorType="onlyPerson" ' + "data-selectNodeType=\"{type:'user',msg:'只能选择人员！'}\""+
				'data-title="选择人员" data-targetname="xbPersonName" data-treeparam="{userStatus:true}" data-targetid="xbPersonId">...</span></div>').insertAfter('#operate');


			$('#XB-noteType').val(this.noteType);
		} else if(this.operationCode == 'ZB') {
			$('<label title="' + this.eName + '"><input name="approvalResult" type="radio" onclick="radioChange(\'' + this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" />' + this.showName + '</label>'
			+'<input type="hidden" class="form-control" id="ZB-noteType" readonly="readonly" >').appendTo('#operate');

			$('<div id="ZBDIV" style="display:none" class="input-group"><input type="text" class="form-control" id="zbPersonName" readonly="readonly" placeholder="选择人员">'
				+'<input type="hidden" class="form-control" id="zbPersonId" readonly="readonly" title="选择人员" placeholder="选择人员">'
				+'<span class="input-group-addon single-selector" data-selectorType="person" data-title="选择人员" data-targetname="zbPersonName" data-targetid="zbPersonId">...</span></div>').insertAfter('#operate');


			$('#ZB-noteType').val(this.noteType);
		} else if(this.operationCode == 'WYY' || this.operationCode == 'TY') {
			$('<label title="' + this.eName + '"><input name="approvalResult" type="radio" onclick="radioChange(\'' + this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" checked/>' + this.showName + '</label>'
			+'<input type="hidden" class="form-control" id="TY-noteType" readonly="readonly" >').appendTo('#operate');
			$('#approvalText').val(this.defaultNote);

			$('#TY-noteType').val(this.noteType);
		} else if(this.operationCode == 'DH') {
			$('<label title="' + this.eName + '"><input name="approvalResult" type="radio" onclick="radioChange(\'' + this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" />' + this.showName + '</label>'
			+'<input type="hidden" class="form-control" id="DH-noteType" readonly="readonly" >').appendTo('#operate');
			$('#DH-noteType').val(this.noteType);
			var selector = $('<div class="input-group select-box" id="selectDHRBox" style="display:none"><span class="input-group-addon" title="rebut">打回到</span><select id="selectDHR" class="form-control"></select></div>')
			selector.appendTo('#operate');
			$('#noteType').val(this.noteType);
			$('<div id="approveRepeatDiv" style="display:none"><span style="margin-right: 5px;">重新审批</span>'
				+ '<input name="approveRepeat" type="radio" value="1" checked />是&nbsp&nbsp&nbsp&nbsp'
				+ '<input name="approveRepeat" type="radio" value="0" />否</div>').appendTo('#operate');

		} else {
			$('<label  title="' + this.eName + '"><input name="approvalResult" type="radio" onclick="radioChange(\''
					+ this.operationCode + '\', \'' + this.defaultNote + '\')" value="' + this.operationCode + '" />' + this.showName + '</label>'
					+ '<input type="hidden" class="form-control" id="' + this.operationCode + '-noteType" readonly="readonly" >').appendTo('#operate');
			$('#' + this.operationCode + '-noteType').val(this.noteType);
		}
        //获取用户自定义意见
        getUserOpinions();
	});

	$('#operate input[name=approvalResult]')[0].checked = true;

	$('#operate').parents('table').xljMultipleSelectorUtil();
	$('#operate').parents('table').xljSingleSelectorUtil();
}
//获取用户自定义意见
function getUserOpinions(flag){
	$.ajax({ 
	    type: "post",  
	    url: serviceUrl+"flow/flowUserOpinion/queryUserOpinion",    
	    dataType:"json",  
	    data: "{}",
	    contentType: 'application/json;charset=utf-8',
	    success: function(data){ 
	    	var list = data.result;
	    	if(list && list.length >0){
	    		$('#_defaultUserNode').empty();
                var optObj = $('<option></option>');
                optObj.val("");
                optObj.text("请选择自定义审批意见");
                $('#_defaultUserNode').append(optObj);
	    		for(var i=0;i<list.length;i++){
	    			var optObj = $('<option></option>');
	    			optObj.val(list[i].id);
	    			optObj.text(list[i].opinion);
	    			$('#_defaultUserNode').append(optObj);
	    		}
	    		if(flag){
	    			setUserNode();
	    		}
	    	}
	    },  
	    error: function(data){  
	    	if(data.msg){
	    		pop_tip_open("red",data.msg);
	    	}else{
	    		pop_tip_open("red","修改失败！");
	    	}
	    }  
	}); 
}
/**
 * 设置默认审批意见
 */
function setUserNode(){
	var val = $('#_defaultUserNode').find('option:selected').val();
	var name = $('#_defaultUserNode').find('option:selected').text();
	if(val == ''){
        name = "";
	}
	$("#approvalText").val(name);
}
function initNext(next) {
	var nexAc = '';
	if(next != '') {
		$.each(next, function() {
			if(this != '') {
				nexAc = nexAc + this + ', ';				
			}
		});
		if(nexAc!=''){
			
			if(nexAc.indexOf('\\')>=0) {
				nexAc = nexAc.replace(/\\/g, '');
			}
			
			$("#next").html(nexAc.substring(0, nexAc.length - 2));
		}else{
			$("#next").html(nexAc);
		}
		
	}
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
	
	if(!approvalText || approvalText==""){
		if($("#" + approvalResult + "-noteType").val()=='true'){
			$.xljUtils.tip('red', '请填写处理意见！');
			return false;
		}
	}

	return true;
}

function submitProcess(viewBean) {
	window.approvalSubmit = {};
	approvalSubmit.instanceId = getCurrentInstanceId();
	
	//确定当前提交人的任务ID
	$.each(viewBean.list, function(index, item) {
		if(item.approverId == viewBean.currentUserId
				&& item.taskStatus == '2') {
			
			//不从当前URL中取值，是因为当用户提交审批后，下一审批人还是他本人的情况，此时第二次提交，URL中的taskId不是当前点亮行中的taskId
			var taskId = $.getUrlParam('taskId');
			var msgId = $.getUrlParam('msgId');
			approvalSubmit.taskId = (taskId == '') ? item.taskId : taskId;
			approvalSubmit.msgId = (msgId == '') ? item.msgId : msgId;
			return false;
		}
	});
	

	approvalSubmit.operationType = $("input[name='approvalResult']:checked").val();
	approvalSubmit.operationName = $("input[name='approvalResult']:checked").parent().text();
	approvalSubmit.userNote = $("#approvalText").val();
	approvalSubmit.userOpinionId = $('#_defaultUserNode').val();

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
				url: serviceUrl + 'flow/instance/approval',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				data: JSON.stringify(approvalSubmit),
				success: function(data) {
					if(data.success) {
						$.xljUtils.tip('green', '审批成功！');
						$('#_currentAttachment').xljAttachmentSubmit();
						
						//审批完成后刷新任务列表
						refreshTaskList();
						
						location.reload();

					} else {
						$.xljUtils.tip('red', data.msg);
						
						
						$(this).css("background","#ac2925");
						$(this).removeAttr('disabled');
						$(this).text("提交审批");
					}
				}
			});
		}
	});
}

/**
 * 获取当前流程实例ID
 * @returns
 */
function getCurrentInstanceId() {
	var currentInstanceId = $.getUrlParam('instanceId');
	
	//从业务表单查询审批记录过来时URL中没有instanceId
	if(currentInstanceId == null) {
		currentInstanceId = viewBean.instanceId;
	}
	return currentInstanceId;
}

function shut() {
	closeWin();
}

function withDrawTask() {
	var url = serviceUrl + 'flow/instance/withDrawTask?instanceId=' + getCurrentInstanceId();
	if($.getUrlParam("taskId") != null) {
		url = url + '&taskId=' + $.getUrlParam("taskId");
	}
	url = url + '&time=' + Math.random();	//IE下存在缓存问题。
	$.ajax({
		type: 'GET',
		url: url,
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
function dateFormatter(cellvalue, options, rowObject){
	var getUsaFormatter = function (strDate) {
		// 减去时区差，计算出模拟的美国时间, 需要优化，美国的时区会有不同
		var millSecUsaOffset = -43200000; //-12 * 60 * 60 * 1000;
		var usaDate = new Date((new Date(strDate)).getTime() + millSecUsaOffset);
		var arUsa = usaDate.toString().split(' ');
		// "Mon Oct 16 2017 02:37:51 GMT+0800 (中国标准时间)"
		var usaDateTime = arUsa[0] + ' ' + arUsa[1] + ' ' + arUsa[2] + ' ' + arUsa[3] + '<br/>' + arUsa[4];
		return usaDateTime;
	};

	if(cellvalue != null) {
		var a=cellvalue.substring(0,10)+'<br/>';
		var b=cellvalue.substring(11,19)
		// 切换美国时间
		if (window.BROWSER_LANGUAGE && window.BROWSER_LANGUAGE == 'EN') {
			return getUsaFormatter(cellvalue.substring(0,10).replace(/-/g, '/') + ' ' + b);
		}
		return a+b;
		
	} else {
		return '';
	}
}

function radioChange(code, defaultNote){
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
			url: serviceUrl + 'flow/instance/queryApproverDone',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			data: JSON.stringify({instanceId: viewBean.instanceId}),
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
   	  $('#approvalText').val(defaultNote);
    }
}
/**
 * Grid自适应
 */
function resizeGrid(){
	$("#approvalList").setGridWidth($('#approvalListDiv').width());
	$("#approvalList").setGridHeight("auto");
	$("#instanceTransferGrid").setGridWidth($('#instanceDiv').width());
	$("#instanceTransferGrid").setGridHeight("auto");
	$("#readRecordGrid").setGridWidth($('#readRecordDiv').width());
	$("#readRecordGrid").setGridHeight("auto");
}
//表头设置英文提示
function setEnglishTip(boxid){
	if(boxid == "approvalListDiv"){
		addApproveEnglishTip();
	}else if(boxid == "instanceDiv"){
		addApplogEnglishTip();
	}else{
		addReadlogEnglishTip();
	}
}
/**
 * 初始化阅读日志
 */
function readRecordInit(instanceId) {
	var paramData = {fiId: instanceId};
	var url = serviceUrl + "flow/instanceReadRecord/queryList";
	if(sessionSign){
		url += '?_s='+sessionSign;
	}

	$("#readRecordGrid").jqGrid( {
		url : url,
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
		],
		forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
		// width: '100%',
		width: $("#lcbegin").width()-10,
		rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
		hoverrows:false,                                    //禁止mouse hovering			
		sortname : 'readDate',//初始化的时候排序的字段
        sortorder : "desc",//排序方式,可选desc,asc
		onRightClickRow:function(rowid,iRow,iCol,e){
			$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
		},
		loadComplete : function(xhr) {  //当从服务器返回响应时执行
				//列头英文悬浮提示readRecordDiv
			addReadlogEnglishTip();
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
function instanceTransferInit(instanceId) {
	var paramData = {instanceId: instanceId};
	var url = serviceUrl + "flow/instance/queryTransferList";
	if(sessionSign){
		url += '?_s='+sessionSign;
	}
	$("#instanceTransferGrid").jqGrid( {
		url : url,
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
		// width: '100%',
		width:$("#lcbegin").width()-10,
		rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
		hoverrows:false,                                    //禁止mouse hovering			
		onRightClickRow:function(rowid,iRow,iCol,e){
			$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
		},
		loadComplete : function(xhr) {  //当从服务器返回响应时执行
			addApplogEnglishTip();
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
function collect() {
	var urlText = "flow/instance/collection/" + getCurrentInstanceId();
	$.ajax({
	    url: serviceUrl + urlText,
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
function loadBusinessForm(viewBean) {
	var startChar = '?';
	if(viewBean.pcUrl.indexOf('?') != -1) {
		startChar = '&';
	}
	
	var url = viewBean.pcUrl + startChar
			+ 'businessId=' + viewBean.businessId + '&time=' + Math.random();
	
	//针对旧的业务系统参数
	url = url + '&bizId=' + viewBean.businessId + '&flCode=' + viewBean.flCode
	+ '&DTL_SESSION_ID=' + getCookie('DTL_SESSION_ID') + '&userId=' + viewBean.currentUserId;
	
	url = url + '&approveType=' + viewBean.currentApprovalTypeId + '&iframeMode=' + viewBean.iframeMode;
	if(sessionSign){
		url += '&_s='+sessionSign;
	}

	// 跳过自定义表单的iframe注入加载方式
	// 不等于“customFormInstance_flow.html”则用iframe加载
  $('#bizForm').attr('src',url);
	if (url && url.indexOf('customFormInstance_flow.html') == -1) {
		$('#bizForm').ready(function(){
			setTimeout(function(){
				$("#approvalList").setGridWidth($('#approvalListDiv').width());
			},1000);
		});
	} else {
		// 如果是“customFormInstance_flow.html”， 则隐藏iframe
		$('#bizForm').hide();
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
	//高度计算
	var b_height;
	if(document.bizForm) {
		b_height = $("#form-composer",document.bizForm.document.body).height();
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
			$(document.bizForm.document).find('#form-composer').width("100%")
		}else{
			$(b_iframe).height(b_height + 20);
		}
	} else {
		//ff
		var iframeBody = document.getElementById('bizForm').contentDocument.body;
		var $iframeBody = $(iframeBody).find('#form-composer');

		var b_iframe = document.getElementById("bizForm");
		$iframeBody.width("100%");
		if ($iframeBody) {
			//自定义表单自适应设置
			$(b_iframe).height(b_height);
		}else{
			$(b_iframe).height(b_height + 20);
		}
	}
}
function resizeIframeTo() {
	var b_height;
	$("#bizForm").attr("scrolling","no");
	if(document.bizForm) {
		b_height = Math.max(document.bizForm.document.body.scrollHeight,document.bizForm.document.body.clientHeight);
	}else {
		// ff
		var iframeBody = document.getElementById('bizForm').contentDocument.body;
		b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
	}
	var b_iframe = document.getElementById("bizForm");
	$(b_iframe).height(b_height+20+50);
	$("#bizForm").css("width","99.2%");
	$("#bizForm").css("margin","0 5px 0 5px");
}

/**
 * 岗位格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 */
function postFormatter(cellvalue, options, rowObject){
	if(cellvalue == '' || cellvalue == null){
		if(rowObject.acType != '3'){	//非结束节点！
			return '无岗位';
		}
		return '';
	}else{
		var lastIndex = cellvalue.lastIndexOf('/');
		var first = cellvalue.substring(0, lastIndex);
		var last = cellvalue.substring(lastIndex + 1, cellvalue.length);
		return first + '<br/>' + last;
	}
}

/**
 * 撤回流程
 * @returns
 */
function withDrawFlow() {
	$.ajax({
		type: 'GET',
		url: serviceUrl + 'flow/instance/withDrawFlow/' + getCurrentInstanceId(),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(data) {
			if(data.success) {
//				location.
// ();
				//刷新业务系统页面
				try{
					var FunName = window.opener.flowCallBack;
					if(window.opener && FunName) {
						FunName();
					}
			    }catch (e){
			    	//跨域时，window.opener.flowCallBack会报错，导到后面的代码走不到，无法关闭页面
			    }
				closeWin();
			} else {
				$.xljUtils.tip('red', data.msg);
			}
		}
	});	
}

function pass(){
	 $("#circulation").click();
}

//修改可阅人
function modifyReader(){
	var url = encodeURI(serviceUrl+"flow/runtime/query/batch_modify_reader.html?instanceId=" + getCurrentInstanceId())
	openWin(url);
}

//调整环节
function modifyAc(){
	var url = encodeURI("http://127.0.0.1:8081/platform-app/flow/runtime/query/modifyAc.html?&instanceId=" + getCurrentInstanceId() + "&requestSource=adjust");
	openWin(url);
}

//修改审批人
function modifyApprover(){
	var url = encodeURI(serviceUrl+"flow/runtime/query/modify_approver.html?instanceId=" + getCurrentInstanceId());
	openWin(url);
}

//修改审批人意见
function modifyApproverAdvice(){
	var url = encodeURI(serviceUrl+"flow/runtime/query/modify_advice.html?instanceId=" + getCurrentInstanceId());
	openWin(url);
}

//修改过程附件
function modifyAttachment(){
	commonModifyInstance("attachment");
}

function commonModifyInstance(type){
	var url = encodeURI(serviceUrl+"flow/runtime/query/modifyInstance.html?type=" + type + "&instanceId=" + getCurrentInstanceId());
	openWin(url);
}

//审结
function finishApproval(){
	var urlText = "flow/instance/finishApproval/" + getCurrentInstanceId();
	var paramObject = {}; 
	commonAjaxAction(urlText, paramObject, "审结");
}

//跳过当前审批人
function skipCurrentApprover(){
	var urlText = "flow/instance/skipCurrentApprover/" + getCurrentInstanceId();
	var paramObject = {}; 
	commonAjaxAction(urlText, paramObject, "跳过当前审批人");
}

//放行
function letItGo(){
	var urlText = "flow/instance/letItGo/" + getCurrentInstanceId();
	var paramObject = {}; 
	commonAjaxAction(urlText, paramObject, "放行流程");
	
	chnageStatusOfMsg('YB', 'DB');
	
	refreshTaskList();
}

//作废流程
function cancelInstance(){
	var urlText = "flow/instance/cancelInstance/" + getCurrentInstanceId();
	var paramObject = {}; 
	commonAjaxAction(urlText, paramObject, "作废流程");
}

//传阅
function passAndRead(data){
	var urlText = "flow/instance/passAndRead/" + getCurrentInstanceId();
	var paramObject = new Array();

	for (var i in data) {
		var userId = data[i].userId;
		userId = (!userId||userId=='')?data[i].id:userId;
		paramObject.push({"id":userId,"name":data[i].name,"loginName":data[i].loginName});
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
 * 如果参数的值是YES,调用修改操作日志的状态待阅变为已阅
 */
function changeInstanceReaderStatus(instanceId){
	var paramData = {instanceId: instanceId};
    var fullUrl = serviceUrl + "flow/instanceOperateLog/changeToReadIntoHaveRead";
	//fullUrl += '?_s='+sessionSign;
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

function refreshTaskList() {
	//刷新任务列表
	try {
		if(window.opener && $.isFunction(window.opener.refreshMyTaskData)) {
			window.opener.refreshMyTaskData();
		}
	} catch (e) {
		
	}
}

/**
 * 催办
 */
function remind(){
	var urlText = "flow/instance/remind/" + getCurrentInstanceId();
	var paramObject = new Array(); 
	commonAjaxAction(urlText, paramObject, "催办");	
}

/**
 * 审批列表刷新
 * 
 * @returns
 */
function gridReload() {
	$.ajax({
	    url: serviceUrl + "flow/instance/flowView",
	    data: JSON.stringify(postData),
	    type: 'POST',
	    contentType: 'application/json',
	    dataType: 'JSON',
	    success: function(data) {
	    	$('#approvalList').jqGrid().setGridParam({
	    		datatype: 'local',
	    		data: data.result.list
	    	}).trigger("reloadGrid");
	    }
	});
}
//审批英文提示
function addApproveEnglishTip(){
	$("#approvalListDiv tr.ui-jqgrid-labels th:visible:eq(0)").attr("title", "order");
	$("#approvalListDiv tr.ui-jqgrid-labels th:visible:eq(1)").attr("title", "link name");
	$("#approvalListDiv tr.ui-jqgrid-labels th:visible:eq(2)").attr("title", "post name");
	$("#approvalListDiv tr.ui-jqgrid-labels th:visible:eq(3)").attr("title", "incumbent person");
	$("#approvalListDiv tr.ui-jqgrid-labels th:visible:eq(4)").attr("title", "operate");
	$("#approvalListDiv tr.ui-jqgrid-labels th:visible:eq(5)").attr("title", "approval suggestion");
	$("#approvalListDiv tr.ui-jqgrid-labels th:visible:eq(6)").attr("title", "dispose time");
}
//审批日志提示
function addApplogEnglishTip(){
//列头英文悬浮提示
	$("#instanceDiv tr.ui-jqgrid-labels th:visible:eq(0)").attr("title", "approval person");
	$("#instanceDiv tr.ui-jqgrid-labels th:visible:eq(1)").attr("title", "link name");
	$("#instanceDiv tr.ui-jqgrid-labels th:visible:eq(2)").attr("title", "operate");
	$("#instanceDiv tr.ui-jqgrid-labels th:visible:eq(3)").attr("title", "time");
}
//阅读日志提示
function addReadlogEnglishTip(){
	$("#readRecordDiv tr.ui-jqgrid-labels th:visible:eq(0)").attr("title", "person name");
	$("#readRecordDiv tr.ui-jqgrid-labels th:visible:eq(1)").attr("title", "post name");
	$("#readRecordDiv tr.ui-jqgrid-labels th:visible:eq(2)").attr("title", "time");
}