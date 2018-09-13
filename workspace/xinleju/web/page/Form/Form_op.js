function canSubmit(curSpFiId, opWiId){
	var selectSpGw = $("select[name='spGw']");
	var selectBackToWp = $("select[name='backToWpId']");
	var inputOp = $("input[name='opCode']");
	var inputUserIds = $("input[id='dealUsersIds']");
	var userNote = $("#spUserNote").val();
	$("#flowInsName").val($("#flowName").val());
	if (isEmpty($("#flowInsName").val())){
		alert("请填写审批标题！");
		return;
	}
	if(inputUserIds && isNotEmpty(inputUserIds.attr("id"))){
		var userIdsVar = $("#dealUsersIds").val();
		if("none" != $("#selectUserDiv").css('display') && isEmpty(userIdsVar)){
			alert("请选择相关参与人！");
			return;
		}
	}
	if(inputOp){
		var spTypeVar = $("input[name='opCode']:checked").val();
		if(isEmpty(spTypeVar)){
			alert("请选择相关操作！");
			return;
		}
	}
	if (selectBackToWp) {
		for (var j = 0; j < selectBackToWp.length; j++) {
			if ("none" != $("#backToWpDiv").css('display') && isEmpty(selectBackToWp[j].value)) {
				alert("请选择" + selectBackToWp[j].title + "！");
				return;
			}
		}
	}
	
	var isStart = $('#isStart').val();
	if(isStart!=1){
		if ("2" == $("input[name='opCode']:checked").attr('noteType') && isEmpty(userNote)) {
			alert("意见不能为空！");
			return;
		}
		if (isNotEmpty(userNote) && userNote.length > 500) {
			alert("意见不能超过500字！");
			return;
		}
	}

	if (selectSpGw) {
		for (var j = 0; j < selectSpGw.length; j++) {
			if ("none" != $("#spGwTr").css('display') && isEmpty(selectSpGw[j].value)) {
				alert("请选择" + selectSpGw[j].title + "！");
				return;
			}
		}
	}
	//处理相关链接
	var canSubmit = true;
	//处理相关流程
	if (canSubmit){
		try{
			canSubmit = initSpRelationHrefs();
		}catch(e){
			canSubmit = true;
		}
	}
	//处理相关流程
	if (canSubmit){
		try{
			canSubmit = initSpRelationFis();
		}catch(e){
			canSubmit = true;
		}
	}
	
	if(canSubmit){
		if(Browser.isIE6() || Browser.isIE7()){
			$('body').mask("正在操作，请稍侯！");
		}else{
			$('body',window.document).mask("正在操作，请稍侯！");
		}
		//判断选择的责任人是否为空，为空则不提交
	    var isStart=$("#isStart").val();
	    if(isStart==1){
			if((parent.his!=null&&parent.his>10) ){
				alert('有责任人为空不请允许提交，请检查是否选择了正确的发起岗位，若仍有空的责任人请联系管理员');
				//parent.location.reload();
				//return;
			}else{
				$.ajax({
					url : 'Form!canDealCompleteWork.ajax',
					data : {"wiId" : opWiId,"t" : (new Date()).getTime()},
					dataType : "json",
					success :function(data){
						if (data.success){
							$("#spFrm").submit();
						} else {
							alert('请先选择相关节点的参与人！');
							changeWps(curSpFiId, opWiId);
						}
					},
					error : function(){
						alert("操作失败！");
					}
				});
			}
	    }else{
	    	$.ajax({
				url : 'Form!canDealCompleteWork.ajax',
				data : {"wiId" : opWiId,"t" : (new Date()).getTime()},
				dataType : "json",
				success :function(data){
					if (data.success){
						$("#spFrm").submit();
					} else {
						alert('请先选择相关节点的参与人！');
						changeWps(curSpFiId, opWiId);
					}
				},
				error : function(){
					alert("操作失败！");
				}
			});
		}
		
	}
	
    	
}
/**
 * 完成工作
 * @param opCode
 * @param opAction
 */
function completeWork() {

}

/**
 * 正常选择人员（至少选择一个）
 */
function selectParticipantByDomOp(userIdDomId, userNameDomId){
	var selectedUserIds = $("#"+userIdDomId).val();
	var maxCount = $("#maxUserCount").val();
	var url = "Orgn!index.do";
	var dto = {
//		callBackFun : "getUserInfo",
//		saveUrl : "Orgn!save.do",
		minCount:1,
		maxCount:maxCount,
		needBackUserInfo : 1,
		selectedUserQueryMethod:"findByRoleId",
		selectedUserIds : selectedUserIds
	}
	var sFeatures = {
		dialogWidth : 1000,
		dialogHeight : 600
	};
	url += "?paramJsonStr=" + encodeURI(Ext.util.JSON.encode(dto));
	var rv = showModalDialogOverride(url, window, sFeatures);
	//OpenWin(url);
	var result = Ext.util.JSON.decode(rv);
	getUserInfo(userIdDomId, userNameDomId,result);
}
function getUserInfo(userIdDomId, userNameDomId,userInfo) {
	var selectIds = "";
	var selectNames = "";
	if(userInfo && userInfo.length>0){
		for(var i=0;i<userInfo.length;i++){
			selectIds += userInfo[i].userid + ((i == userInfo.length-1) ? "" : ",")
			selectNames += userInfo[i].username + ((i == userInfo.length-1) ? "" : ";")
		}
	}
	if (isNotEmpty(selectIds)){
		$("#"+userIdDomId).val(selectIds);
		$("#"+userNameDomId).val(selectNames);
	}
}
/**
 * 正常选择人员（至少选择一个）
 */
function editSpNote(){
	var url = "UserNote!list.do";
	var sFeatures = {
		dialogWidth : 1000,
		dialogHeight : 600
	};
	url += "?t=" + (new Date()).getTime();
	var r = showModalDialogOverride(url, window, sFeatures);
	reloadSpNotes("spNoteSelectId");
}
function reloadSpNotes(spNoteSelectId){
	$.post("UserNote!getUserSpNotes.ajax",
		{"t" : (new Date()).getTime()},
		function(result){
			//清空select
			$("#" + spNoteSelectId).empty();
			$("#" + spNoteSelectId).append("<option value=''>请选择</option>");
			for(var i=0;i<result.length;i++){
				$("#" + spNoteSelectId).append("<option value='" + result[i].note + "'>" + result[i].note + "</option>");
			}
		},"json");
}
/**
 * 审批意见切换
 * @param str
 */
function addNote(str){
	if(isNotEmpty(str)){
		note = str;
	}else{
		note = "发起";
		$('#spNoteSelectId').val(null);
	}
	$('#spUserNote').val(note);
}
/**
 * 重置表单数据
 */
function resetForm(){
	var inputUserIds = $("#dealUsersIds");
	if(inputUserIds){
		$("#dealUsersIds").val('');
		$("#dealUsersNames").val('');
	}
}
/**
 * 切换操作类型
 * @param opType
 */
function changeOpType(opType, opName, note, noteType){
	resetForm();
	$('#opNameHid').val(opName);
	//转办只能选一人
	if(opType == $("#spDealTypeZb").val()){
		$("#selectUserDiv").css('display','block');
		$("#backToWpDiv").css('display','none');
		$("#maxUserCount").val(1);
		$("#spGwTr").css('display','none');
	//协办无限制
	}else if(opType == $("#spDealTypeXb").val()){
		$("#selectUserDiv").css('display','block');
		$("#backToWpDiv").css('display','none');
		$("#maxUserCount").val(null);
		$("#spGwTr").attr("style",{"display":""});
	//驳回
	}else if(opType == $("#spDealTypeBh").val()){
		$("#backToWpDiv").css('display','block');
		$("#selectUserDiv").css('display','none');
		$("#spGwTr").css('display','none');
		
		afresh();
	}else{
		$("#selectUserDiv").css('display','none'); 
		$("#backToWpDiv").css('display','none');
		$("#spGwTr").attr("style",{"display":""});
	}
	changeNoteType(note, noteType);
}
//更改意见
function changeNoteType(note, noteType){
	if("0" == noteType){
		$("#spNoteSelectId").attr("disabled","true");
		$("#spUserNote").attr("readonly","readonly");
	}else{
		$("#spNoteSelectId").removeAttr("disabled");
		$("#spUserNote").removeAttr("readonly");
	}
	addNote(note);
}

//若选择驳回到发起人时则自动勾上重新审批
function afresh(){
	var t=$("#reject_approve").find("option:selected").text();
	var firstPersion="发起";
	var flag=t.indexOf(firstPersion);
	if(flag>=0){
		$('#afresh_approve').attr('checked',true).hide();
		$('#lbl_afresh_approve').hide();
	}else{
		$('#afresh_approve').attr('checked',false).show();
		$('#lbl_afresh_approve').show();
	}
}

$(function() {
	changeOpType($("input[name='opCode']:checked").val(),$("input[name='opCode']:checked").attr('alt'),$("input[name='opCode']:checked").attr('note'),$("input[name='opCode']:checked").attr('noteType'));
});