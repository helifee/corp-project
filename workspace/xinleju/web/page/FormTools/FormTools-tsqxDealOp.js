var rebuildFi = function(postId, fiId, spId,userId){
	if(Browser.isIE6() || Browser.isIE7()){
		$('body',window.parent).mask("正在操作，请稍侯！");
	}else{
		$('body',window.parent.document).mask("正在操作，请稍侯！");
	}
	$.ajax({
		url : 'sp!rebuildFi.do',
		data : {postId : postId,fiId : fiId, spId : spId,userId : userId},
		dataType : "json",
		success :function(data){
			alert('操作成功!');
			if(Browser.isIE6() || Browser.isIE7()){
				$('body',window.parent).unmask();
			}else{
				$('body',window.parent.document).unmask();
			}
		},
		error : function(){
			alert('操作失败!');
			if(Browser.isIE6() || Browser.isIE7()){
				$('body',window.parent).unmask();
			}else{
				$('body',window.parent.document).unmask();
			}
		}
	});
}
var changeWps = function(fiId,wiId,spId){
	var width = 1000;
	var height = 600;
	var scroll = 'yes';
	var url = "flow_tools!changeWpsIndex.do?fiId="+fiId+"&opWiId="+wiId;
    var dt = new Date().getTime();
    if(url!=null&&url.indexOf('dt')<0){
        if(url.indexOf('?')>-1){
        	url += "&dt="+dt;
        }else{
        	url += "?dt="+dt;
        }
    }
    var returnValue = window.showModalDialog(url,self,calcShowModalDialogLocation(width, height, scroll));
    if (isNotEmpty(returnValue) && "refresh" == returnValue){
    	
    }
}
function canSubmit(curSpFiId, opWiId, curSpId){
	$.ajax({
		url : 'flow_tools!canSubmit.ajax',
		data : {"wiId" : opWiId,"t" : (new Date()).getTime()},
		dataType : "json",
		success :function(data){
			if (data.success){
				completeWork();
			} else {
				alert('请先选择相关节点的参与人！');
				changeWps(curSpFiId, opWiId, curSpId);
			}
		},
		error : function(){
			alert("操作失败！");
		}
	});
}
/**
 * 完成工作
 * @param opCode
 * @param opAction
 */
function completeWork() {
	var selectSpGw = $("select[name='spGw']");
	var selectBackToWp = $("select[name='backToWpId']");
	var inputOp = $("input[name='opCode']");
	var inputUserIds = $("input[id='dealUsersIds']");
	var userNote = $("#spUserNote").val();
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
	if ("2" == $("input[name='opCode']:checked").attr('noteType') && isEmpty(userNote)) {
		alert("意见不能为空！");
		return;
	}
	if (isNotEmpty(userNote) && userNote.length > 500) {
		alert("意见不能超过500字！");
		return;
	}
	if (selectSpGw) {
		for (var j = 0; j < selectSpGw.length; j++) {
			if ("none" != $("#spGwTr").css('display') && isEmpty(selectSpGw[j].value)) {
				alert("请选择" + selectSpGw[j].title + "！");
				return;
			}
		}
	}
	//是否可以提交
	var canSubmit = true;
	if(canSubmit){
		if(Browser.isIE6() || Browser.isIE7()){
			$('body',window.parent).mask("正在操作，请稍侯！");
		}else{
			$('body',window.parent.document).mask("正在操作，请稍侯！");
		}
		$("#spFrm").submit();
	}
}

/**
 * 正常选择人员（至少选择一个）
 */
function selectParticipantByDomOp(userIdDomId, userNameDomId){
	var selectedUserIds = $("#"+userIdDomId).val();
	var maxCount = $("#maxUserCount").val();
	var url = "user_orgn_tree!chooseUserIndex.do";
	var dto = {
		queryMethod : "findSelectedUserBySelectedUserIds",
		minCount : 1,
		maxCount : maxCount,
		selectedUserIds : selectedUserIds
	}
	var sFeatures = {
		dialogWidth : 1000,
		dialogHeight : 600
	};
	url += "?paramJsonStr=" + encodeURI(Ext.util.JSON.encode(dto));
	var rv = showModalDialogOverride(url, window, sFeatures);
	var result = Ext.util.JSON.decode(rv);
	var selectIds = "";
	var selectNames = "";
	if(result && result.length>0){
		for(var i=0;i<result.length;i++){
			selectIds += result[i].userId + ((i == result.length-1) ? "" : ",")
			selectNames += result[i].userName + ((i == result.length-1) ? "" : ";")
		}
		$("#"+userIdDomId).val(selectIds);
		$("#"+userNameDomId).val(selectNames);
	}
	
}

/**
 * 正常选择人员（至少选择一个）
 */
function editSpNote(userId){
	var url = "sp_note!list.do?userId="+userId;
	var sFeatures = {
		dialogWidth : 1000,
		dialogHeight : 600
	};
	url += "&t=" + (new Date()).getTime();
	var r = showModalDialogOverride(url, window, sFeatures);
	reloadSpNotes("spNoteSelectId",userId);
}
function reloadSpNotes(spNoteSelectId,userId){
	$.post("sp!getSpNotes.ajax",
		{'userId' : userId,'t' : (new Date()).getTime()},
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
		note = "";
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
//		$("#spUserNote").cssClass("disabled","disabled");
	}else{
		$("#spNoteSelectId").removeAttr("disabled");
		$("#spUserNote").removeAttr("readonly");
	}
	addNote(note);
}

$(function() {
	changeOpType($("input[name='opCode']:checked").val(),$("input[name='opCode']:checked").attr('alt'),$("input[name='opCode']:checked").attr('note'),$("input[name='opCode']:checked").attr('noteType'));
});