var resultData,postData,xName;
$(function() {
	pageInit();
	var bizForm = $('#bizForm');//the element I want to monitor
	bizForm.bind('DOMNodeInserted', function(e) {
	});
});

$(window).resize(function(){
	$("#lcbegin").height(($(window).height()-140)+"px");
	$("#ar_right_box").height(($(window).height()-140)+"px");
	resizeGrid();
});
//相关流程id
var linkId=[];
/**
 * 初始化页面
 */
function pageInit(){
	$("#lcbegin").height(($(window).height()-170)+"px");
	$("#ar_right_box").height(($(window).height()-170)+"px");
	//隐藏自定义
    $("#yc_defaultUserNode").hide();
	// 设置审批意见
	$("#_userNote").val($('#_defaultUserNode option:selected').val());
	// 构造请求数据
	postData = {};
	postData.flCode = $.getUrlParam("flCode");
	postData.businessId = $.getUrlParam("businessId");
	postData.businessObjectCode = $.getUrlParam("businessObjectCode");
	$("#_userNote").val($('#_defaultUserNode option:selected').val());
	// 初始化审批历史
	approveHistoryInit();
	
	$('#addRelateFlow').xljFlowRelationSelector({
		saveCallback: function(selectedData ,ele) {
			$.each(selectedData, function(index, item){
				var url = hostUrl + 'flow/runtime/approve/flow.html?flCode='
					+ item.flCode + '&businessId=' + item.businessId + '&instanceId=' + item.id;
				//不可重复添加
				if(linkId.indexOf(item.id) == -1){
					var linkText = '<div id="_Div_'+item.id+'"><a target="_blank" href="'+url+'" id="'+item.id+'">'+item.name+'</a><button onclick=removeDiv("'+item.id+'")></button><br/></div>';
					$('#relateFlow').append($(linkText));
					linkId.push(item.id);
				}
			});
		}
	});
	
	$('#clearRelateFlow').click(function() {
		$('#relateFlow').html('');
		linkId=[];
	});
	// 审批历史高宽自适应
	resizeGrid();
}

function removeDiv(id){
	$("#_Div_"+id).remove();
	var index = linkId.indexOf(id);
	if (index > -1) {
		linkId.splice(index, 1);
	}
}
/**
 * 初始化审批历史
 */
function approveHistoryInit() {
	$("#_approveHistory").jqGrid(
		{
			url : hostUrl + "flow/start",
			postData : postData,
			datatype : "json",
			ajaxGridOptions : {
				contentType : 'application/json;charset=utf-8'
			},
			mtype : "post",
			jsonReader : {
				root : function (data) {
					if(data.success) {
						var result = data.result;
						var approvalLists = result.approvalLists;
						var postArr = [];
						if(approvalLists&&approvalLists.length>0){
							for(var i in approvalLists){
								var approval = approvalLists[i];
								if(approval.postId&&approval.postId!=''){
									postArr.push(approval);
								}
							}
							if(postArr.length==0){
								//人员岗位为空时重新刷新页面
								var flushCount = window.sessionStorage.getItem('flushCount')==null?0:window.sessionStorage.getItem('flushCount');
								if(flushCount!=null&&parseInt(flushCount)<3){
									window.sessionStorage.setItem('flushCount',(parseInt(flushCount)+1));
									window.location.href = window.location.href;
								}
							}else{
								window.localStorage.removeItem('flushCount');
								return approvalLists;
							}
						}
						
					} else {
//						$.xljUtils.confirm('blue', data.msg, function(){}, false);
						return false;
					}
				}

			},
			colModel : [
				    {name: 'sequence',label : '序号',align:'center', width: 40,sortable:false,editable:false,cellattr:addCellAttr},
					{name: 'acId',label : '环节ID', hidden: true,sortable:false,editable:false},
					{name: 'acType',label : '环节类型', hidden: true,sortable:false,editable:false},
					{name: 'acName',label : '环节名称',width: 70,sortable:false,editable:false,cellattr:addCellAttr},
					{name: 'acStatus',label : '环节点亮状态', hidden: true,sortable:false,editable:false},
					{name: 'postId',label : '岗位ID',hidden: true,sortable:false,editable:false},
					{name: 'postName',label : '岗位',width: 180,sortable:false,editable:false,cellattr:addCellAttr,formatter:postFormatter},
					{name: 'postStatus',label : '岗位点亮状态', hidden: true,sortable:false,editable:false},
					{name: 'approverId',label : '责任ID',  hidden: true,editable:false,sortable:false},
					{name: 'approverName',label : '责任人',width: 70,editable:false,sortable:false,cellattr:addCellAttr,formatter:approverFormatter},
					{name: 'taskStatus',label : '责任人点亮状态',hidden: true,sortable:false,editable:false},
					{name: 'approvalType',label : '操作',width: 70,editable:false,sortable:false,cellattr:addCellAttr},
					{name: 'taskComments',label : '处理意见',width: 250,editable:false,sortable:false,cellattr:addCellAttr},
					{name: 'taskEndTime',label : '处理时间',editable:false,sortable:false,cellattr:addCellAttr},
					{name: 'setApproverWhenStart',label : '发起人指定审批人', hidden: true,sortable:false,editable:false},
					{name: 'isStart',label : '发起人指定审批人为空能否发起流程', hidden: true,sortable:false,editable:false},
					{name: 'postNull',label : '岗位为空策略', hidden: true,sortable:false,editable:false},
					{name: 'approverNull',label : '审批人为空策略', hidden: true,sortable:false,editable:false}
				
			],
			forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
			width: $("#_approveHistoryDiv").width(),
			autowidth:true,
			rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
			hoverrows:false,                                    //禁止mouse hovering			
			gridComplete : function() {                         //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
	        	mergerCell("_approveHistory");                  //合并单元格
	        	setRunningStatus("_approveHistory",true);       //设置运行标识
				$("#_approveHistory").closest(".ui-jqgrid-bdiv").css("height", "auto");
				$("#_approveHistory").jqGrid().setGridWidth($("#_approveHistoryDiv").width(),true);
				//列头英文悬浮提示
				$("#_approveHistoryDiv tr.ui-jqgrid-labels th:visible:eq(0)").attr("title", "order");
				$("#_approveHistoryDiv tr.ui-jqgrid-labels th:visible:eq(1)").attr("title", "link name");
				$("#_approveHistoryDiv tr.ui-jqgrid-labels th:visible:eq(2)").attr("title", "post name");
				$("#_approveHistoryDiv tr.ui-jqgrid-labels th:visible:eq(3)").attr("title", "incumbent person");
				$("#_approveHistoryDiv tr.ui-jqgrid-labels th:visible:eq(4)").attr("title", "operate");
				$("#_approveHistoryDiv tr.ui-jqgrid-labels th:visible:eq(5)").attr("title", "approval suggestion");
				$("#_approveHistoryDiv tr.ui-jqgrid-labels th:visible:eq(6)").attr("title", "dispose time");
			},
			beforeSelectRow:function(rowid, e){
				return false;
			},
			afterInsertRow: function(rowId, rowData) {
				if(rowData.setApproverWhenStart == true) {
				 var selectPersonScript = $("<input type='button' class='personSelectInput' value='选择'  onclick='addMultipleGird(this)' />");
					$("#_approveHistory").setCell(rowId, "approverName", selectPersonScript);
				//	selectPersonScript.parent('td').xljMultipleSelectorUtil();
				}
			},
			onRightClickRow:function(rowid,iRow,iCol,e){
				$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
			},
			loadComplete : function(xhr) {                       //当从服务器返回响应时执行
				if(xhr.success){
					$('#submitbutton').attr('disabled',false);//审批信息加载完成后，提交按钮放开
					resultData = xhr.result;
					resultData.id = getGuuid();
					$(".settitle input").val(resultData.flowTitle);
					$(".settitle").show();
					setNextAc(resultData.acDtoList);
					$('#_currentAttachment').xljAttachment({appId:resultData.appId,businessId:resultData.id,categoryId:resultData.id,mode:'add', hideButtonsWithNoFile:true});
					
					//加载流程表单数据
					loadBusinessForm();	//其中的resizeIframe在IE11上存在兼容性问题
				}else{
					$.xljUtils.tip("red",xhr.msg);
				}
				setTimeout(function(){
					$("#_approveHistory").closest(".ui-jqgrid-bdiv").getNiceScroll().remove();
				},500);
			},
			loadError : function(xhr, status, error) {            //如果请求服务器失败则调用此方法
				$.xljUtils.getError(xhr.status);
			},
		});
	
}

function selectPerson(backData,ele){
	var currentRowId = $(ele).parents("tr").attr("id");
	var acId = $("#_approveHistory").getCell(currentRowId, "acId");
//	cachePerson = backData;
	$.each(resultData.acDtoList, function(i, ac) {
		if(acId == ac.id) {
			var posts = [];
			$.each(backData, function(index, item){
				var postId = item.postId;
				var postName = item.prefixName + '/' + item.postName;
				var person = [{id: item.userId, name: item.name}];
				var post = {id: postId, name: postName};
				post.users = person;
				posts.push(post);
			});
			ac.posts = JSON.stringify(posts);
		}
	});
	
	if(backData.length == 0) {
		$("#_approveHistory").setCell(currentRowId, "postId", "&nbsp;");
		$("#_approveHistory").setCell(currentRowId, "postName", "无岗位");
		$("#_approveHistory").setCell(currentRowId, "approverId", "&nbsp;");
		var selectPersonScript = $("<input type='button' class='personSelectInput' value='选择'  onclick='addMultipleGird(this)' />");
		$("#_approveHistory").setCell(currentRowId, "approverName", selectPersonScript);
	}
	
	if(backData.length > 0) {
		var hiddenId = 'hidden' + currentRowId;
		var approverIds = '';
		var approverNames = '';
		var postNames = '';
		var userIds='';
		$.each(backData, function(index, item) {
			var postId = item.postId;
			var postName = item.prefixName + '/' + item.postName;
			if(index == 0) {
				userIds = item.userId;
				approverIds = item.id;
				approverNames = item.name;
				postNames = postName;
				
			} else {
				userIds = userIds + ',' + item.userId;
				approverIds = approverIds + ',' + item.id;
				approverNames = approverNames + '<br/>' + item.name;
				postNames = postNames + '<br/>' + postName;
			}
		    xName=postNames;

			$("#_approveHistory").setCell(currentRowId, "postId", postId);
			 $("#_approveHistory").setCell(currentRowId, "postName", postNames);
			$("#_approveHistory").setCell(currentRowId, "approverId", item.id);
			var selectPersonScript = $("<label>" + approverNames + "</label><br/>"
					+ "<input type='hidden' id='" + hiddenId + "' />"
					+ "<input type='button' value='选择'  onclick='addMultipleGird(this)'/>");
			$("#_approveHistory").setCell(currentRowId, "approverName", selectPersonScript);
	//		 $(selectPersonScript).xljMultipleSelectorUtil();
		});
		// $('#' + hiddenId).val(approverIds);
		$('#' + hiddenId).val(userIds);
	}
}
/**
 * 添加已选的人addMultipleGird
 */
function addMultipleGird(ele) {
	$(ele).xljMultipleSelector({
		selectorType: 'person',//选择器类型
		immediatelyShow: true,//是否立即显示，默认是false，已click事件触发
		title: '选择',//选择器标题
		targetId: $(ele).siblings('input:hidden').attr('id'),
		treeParam:{userStatus:true},
		//选择器保存按钮回调函数
		saveCallback: function (data, e){
			selectPerson(data,e);
		}
	});
}

/**
 * 设置下一环节
 */
function setNextAc(acDtoList){
	var nexAc = '';
	var acDto = acDtoList[1];
	if(acDto.acType == '2'){
		var flowPostParticipantDtos = acDto.flowPostParticipantDtos;
		if(flowPostParticipantDtos != null){
			for(var j = 0; j < flowPostParticipantDtos.length; j++){
				var flowPostParticipantDto = flowPostParticipantDtos[j]
				if(flowPostParticipantDto.userName!=null){
					nexAc = nexAc  + flowPostParticipantDto.userName + ','
				}
			}					
		}
	}
	
	if(acDto.acType == '3'){
		nexAc = acDto.name;
	}
	
	if(acDto.acType == '5') {
		var nextArray = acDto.nextNodeDtos;
		for(var i=0; i<nextArray.length; i++) {
			for(var k = 0; k < acDtoList.length; k++){
				if(nextArray[i] == acDtoList[k].nodeId) {
					var flowPostParticipantDtos = acDtoList[k].flowPostParticipantDtos;
					if(flowPostParticipantDtos != null){
						for(var j = 0; j < flowPostParticipantDtos.length; j++){
							var flowPostParticipantDto = flowPostParticipantDtos[j]
							if(flowPostParticipantDto.userName!=null){
								nexAc = nexAc  + flowPostParticipantDto.userName + ','
							}
						}					
					}					
					break;
				}
			}
		}
	}

	if(nexAc!=''){
		$("#next").html(nexAc.substring(0, nexAc.length-1));
	}else{
		$("#next").html(nexAc);
	}
}

/**
 * 必输项验证
 */
function validate(){
	/**添加指定审批人校验*/
	if($(".settitle input").val() == ''){
		$.xljUtils.tip("blue", "流程标题为空！");
		return false;
	}
	
	if($("#_userNote").val() == ''){
		$.xljUtils.tip("blue", "处理意见为空！");
		return false;
	}
	
	//优化岗位检查
	var rows = $("#_approveHistory").getRowData();
	for(var i=0; i<rows.length - 1; i++) {
		
		var setInTemplateOrStart = rows[i].setApproverWhenStart;
		var isStart = rows[i].isStart;
		
		//发起人指定审批人
		if(setInTemplateOrStart == 'true') {
			if(isStart == 'true' && rows[i].approverId == '') {
				$.xljUtils.tip("blue", "审批人为空, 请选择！");
				return false;
			}
			
			//在模板指定审批人
		} else {
			//岗位为空检查:postNull=1表示不能发起postNull=''表示未配置
			if(rows[i].postId == '' ) {
				if(rows[i].postNull == '1' || rows[i].postNull == '') {
					$.xljUtils.tip("blue", "岗位为空！");
					return false;
				}
				
			} else {
				//审批人为空检查
				if(rows[i].approverId == '') {
					if(rows[i].approverNull == '1' || rows[i].approverNull == '') {
						$.xljUtils.tip("blue", "审批人为空！");
						return false;
					}
				}
			}
		}
	}
	
	//流程完整性校验
	//校验没有结束环节的情况
	var rowIds = $("#_approveHistory").getDataIDs();
	var acType = $("#_approveHistory").getCell(rowIds[rowIds.length - 1], 'acType');
	if(acType != '3') {
		$.xljUtils.tip("blue", "流程没有结束节点，请检查！");
		return false;
	}
	
	return true;
}

/**
 * 提交
 */
$("#submitbutton").on("click", function(e) {
	if(validate()){
		//禁用提交按钮，防止反复提交
		$(this).css("background","#F0F0F0");
		$(this).attr({ disabled: "disabled" });
		$(this).text("提交中...");

		resultData.name = $(".settitle input").val();
		resultData.userNote = $("#_userNote").val();
		resultData.customFormId = $.getUrlParam("customFormId");
		resultData.relateInstanceIds = getRelateFlowInstanceId();
		transferData();
		$('#_currentAttachment').xljAttachmentSubmit(function(success, result) {
			if(success == false) {
			} else {
				$.ajax({
					url : hostUrl + "flow/instance/saveAllInstanceData",
					data : JSON.stringify(resultData),
					type : 'POST',
					contentType : 'application/json',
					dataType : 'JSON',
					success : function(data) {
						if (data) {
							var successFlag = data.success;
							if (successFlag) {
								var instanceId = data.result.instanceId;
								$.xljUtils.tip("green", "提交成功！");
								$('#_currentAttachment').xljAttachmentSubmit();
								//打开
								var oUrl= hostUrl + "flow/runtime/approve/flow.html"
										+ "?instanceId=" + instanceId
										+ "&time=" + new Date().getTime();
								oUrl=encodeURI(oUrl);
								window.location.href=oUrl;
								//刷新业务系统页面
								/**********add by wangjianxin 20170714 for 跨域时，window.opener.flowCallBack会报错，导到后面的代码走不到，无法关闭页面 start***********************************************/
								try{
									var FunName = window.opener.flowCallBack;
									if(window.opener && FunName) {
										FunName();
									}
							    }catch (e){
							    	//跨域时，window.opener.flowCallBack会报错，导到后面的代码走不到，无法关闭页面
							    }
							    /**********add by wangjianxin 20170714 for 跨域时，window.opener.flowCallBack会报错，导到后面的代码走不到，无法关闭页面 end***********************************************/
								var callbackUrl = data.result.callbackUrl;
								var c_iframe = document.getElementById("c_iframe");
								if(callbackUrl!=null && callbackUrl!='' && callbackUrl!=undefined){
									c_iframe.src = callbackUrl+"?random="+Date.now();
									setTimeout("window.close();",500);
								}else{
									if(!oUrl){
										//关闭
										window.close();							
									}
								}
		
							} else {
								$.xljUtils.tip("red", data.msg);
							}
						}
					},
					error : function(xhr) {
						$.xljUtils.getError(xhr.status);
					}
				});
			}
		});
	}
});

function getRelateFlowInstanceId() {
	var relateInstanceIds = '';
	$('#relateFlow a').each(function(index, item){
		if(index == 0) {
			relateInstanceIds = item.id;
		} else {
			relateInstanceIds = relateInstanceIds + ',' + item.id;
		}
	});
	return relateInstanceIds;
}

/**
 * 转换数据格式
 */
function transferData(){
	//转换业务变量数据格式
	var data = resultData.variableDtoList;
	var paramArray = new Array();
    for (x in data){  
    	var item = {};
    	item.name = x;
    	item.val = data[x]+"";
    	paramArray.push(item);
    };
    resultData.variableDtoList = paramArray;
    delete resultData.approvalLists;
    delete resultData.flowTitle;
    
    window.pcUrl = resultData.pcUrl;
    delete resultData.pcUrl;
}
/**
 * 设置默认审批意见
 */
function setUserNode(){
	$("#_userNote").val($("#_defaultUserNode").val());
}
/**
 * Grid自适应
 */
function resizeGrid(){
	$("#_approveHistory").setGridWidth($('#_approveHistoryDiv').width());
	$("#_approveHistory").setGridHeight("auto");
}
function typeFormatter(cellvalue, options, rowObject){
	//console.info('cellvalue' + cellvalue);
	//console.info(rowObject);
	if(rowObject.approvalTypeId == 'start') {
		return '发起';
	} else {
		return (rowObject.approvalType == null)?'': rowObject.approvalType;
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
		if(rowObject.acType != '3'){	//非结束节点！
			window.postIsNull = true;
			return '无岗位';
		}
		return '';
	}else{
//		window.postIsNull = false;
		var lastIndex = cellvalue.lastIndexOf('/');
		var first = cellvalue.substring(0, lastIndex);
		var last = cellvalue.substring(lastIndex + 1, cellvalue.length);
		return first + '<br/>' + last;
	}
}
/**
 * 审批人格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 */
function approverFormatter(cellvalue, options, rowObject){	
	if(cellvalue == '' || cellvalue == null){
		if(rowObject.acType != '3'){
			window.approverIsNull = true;
		}
		return '';
	}else{
//		window.approverIsNull = false;
		return cellvalue;
	}
}
/**
 * 加载业务表单
 */
function loadBusinessForm() {
	if(resultData.pcUrl == ''){
		$.xljUtils.tip("blue", "请配置业务对象的【审批URL】属性！");
		return;
	}
	
	var startChar = '?';
	if(resultData.pcUrl.indexOf('?') != -1) {
		startChar = '&';
	}
	// var url = resultData.pcUrl + startChar + 'businessId=' + $.getUrlParam("businessId") + '&time=' + new Date().getTime();
	var url = resultData.pcUrl + startChar + 'businessId=' + $.getUrlParam("businessId");
	
	//针对旧的业务系统参数
	var agentUrl = hostUrl + 'agent.html';
	url = url 
		+ '&bizId=' + $.getUrlParam("businessId")
		+ '&flCode=' + $.getUrlParam("flCode")
		+ '&DTL_SESSION_ID=' + getCookie('DTL_SESSION_ID')
		+ '&agentUrl=' + agentUrl
		+ '&userId=' + window.userId;
	
//	$('#bizForm').load(url,function(){
//		$('html').getNiceScroll().show().resize();
//		resizeIframe();
//	});

	// 跳过自定义表单的iframe注入加载方式
	// 不等于“customFormInstance_flow.html”则用iframe加载
	$('#bizForm').attr('src',url);
	if (url && url.indexOf('customFormInstance_flow.html') == -1) {
		$('#bizForm').load(function(){
			setTimeout(function(){
				$("#_approveHistory").setGridWidth($('#_approveHistoryDiv').width());
			},500);
		});

	} else {
		// 如果是“customFormInstance_flow.html”， 则隐藏iframe
		$('#bizForm').hide();

	}
//	resizeIframe();
	resizeBizFormHeight();
}

/**
 * 计算iframe高度自适应
 */
function resizeIframe() {
	var b_height;
	if(document.bizForm) {
		b_height = $("#form-composer",document.bizForm.document.body).height();
	} else {
		// ff
		var iframeBody = document.getElementById('bizForm').contentDocument.body;
		b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
	}
	
	var b_iframe = document.getElementById("bizForm");
	$(b_iframe).height(b_height);
	
	if(document.bizForm) {
		if (!$.isEmptyObject(document.bizForm) && $(document.bizForm.document).find('#form-composer')) {
			$(document.bizForm.document).find('#form-composer').width($(document.bizForm).width())
		}	
	} else {
		//ff
		var iframeBody = document.getElementById('bizForm').contentDocument.body;
		$(iframeBody).find('#form-composer').width($(b_iframe).width());
	}
	$("#_approveHistory").setGridWidth($('#_approveHistoryDiv').width());
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

//定时刷新iframe内容高度
var resizeBizFormHeight = function () {
	//定时检测iframe内容高度
	var intervalIndex = setInterval(function () {
		var iframeHeight = window.location.hash.slice(1);
		if(iframeHeight!=''&&iframeHeight.indexOf('flowTopHeight=')!=-1){
			iframeHeight = iframeHeight.replace('flowTopHeight=','');
			$('#bizForm').height(parseInt(iframeHeight));
			$('#bizForm').parent('div').height(parseInt(iframeHeight));
			//window.clearInterval(intervalIndex);
		}
	},100);

	//超时30秒清除定时任务
	setTimeout(function () {
		window.clearInterval(intervalIndex);
	},30000);
};

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
function  updateObjectFormHight(){
var iframeHight=$("#bizForm").contents().find("body").height();
console.log(iframeHight);
}