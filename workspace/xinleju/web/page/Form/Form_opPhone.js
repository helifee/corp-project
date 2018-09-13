function canSubmit(curSpFiId, opWiId, curSpId){
	$.ajax({
		url : 'Form!canDealCompleteWork.ajax',
		data : {"wiId" : opWiId,"t" : (new Date()).getTime()},
		dataType : "json",
		success :function(data){
			if (data.success){
				completeWork();
			} else {
				alert('请先选择相关节点的参与人！');
				//changeWps(curSpFiId, opWiId, curSpId);
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
	$("#flowInsName").val($("#flowInsName").val());
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
		$("#spFrm").submit();
	}
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
	}else{
		$("#spNoteSelectId").removeAttr("disabled");
		$("#spUserNote").removeAttr("readonly");
	}
	addNote(note);
}
function selectUser(){
	$('.theme-popover-mask').fadeIn(100);
	$('.theme-popover').slideDown(200);
}

function closeSelectUser(){
	$('.theme-popover-mask').fadeOut(100);
	$('.theme-popover').slideUp(200);
}

var setting = {
		async: {
			enable: true,
			url:"SelectUser!getUserTree.do",
			autoParam:["id","pId"]
		},
		view: {
			selectedMulti: false,
			showIcon: true,
		},
		callback : {
			onClick : function(event, treeId, treeNode, clickFlag) {
				expand(treeNode);
			}
		}
		
	};
var zTree;
var expand=function(treeNode){
	zTree.expandNode(treeNode, true, true, true);
}
var queryDept=function(){
	 var dept=document.getElementById('dept');
     var userTree=document.getElementById('userTree');
     
     var one=document.getElementById('one');
     var all=document.getElementById('all');
     
     one.setAttribute("class", "active");
     all.setAttribute("class", "");
     
     dept.style.display="block";
	 userTree.style.display="none";

}

var queryAll=function(){
	var dept=document.getElementById('dept');
    var userTree=document.getElementById('userTree');
    
    var one=document.getElementById('one');
    var all=document.getElementById('all');
    
    all.setAttribute("class", "active");
    one.setAttribute("class", "");
    
    dept.style.display="none";
	userTree.style.display="block";
}

var selectUserId;
var selectUserName;
var dealSelectUser=function(id,userName){
	var user=document.getElementById(id);
	$('a').each(function(index,domEle) {
		domEle.setAttribute("class", "");
	});
	user.setAttribute("class", "active");
	selectUserId = id;
	selectUserName = userName;
}

var ensureSelected=function(){
	var dept=document.getElementById('dept');
    var userTree=document.getElementById('userTree');
    var user;
    if(userTree.style.display=="block"){
    	if(zTree) {
    		var selectedNodes = zTree.getSelectedNodes();
    		if(selectedNodes && selectedNodes.length >0){
    			if(selectedNodes[0].nodeType!="user"){
    				alert("请选择用户类型");
    				return;
    			}else{
    				setUserInfo('dealUsersIds', 'dealUsersNames',selectedNodes[0].id,selectedNodes[0].name );
    			}
    		}
    	}
    }else if(dept.style.display=="block"){
    	if(selectUserId==null||selectUserId==""||selectUserId=="undefined"){
    		alert("请选择用户");
    	}else{
    		setUserInfo('dealUsersIds', 'dealUsersNames',selectUserId,selectUserName);
    	}
    }
}
function setUserInfo(userIdDomId, userNameDomId,userId,userName) {
	var selectIds = userId;
	var selectNames = userName;
	if (isNotEmpty(selectIds)){
		$("#"+userIdDomId).val(selectIds);
		$("#"+userNameDomId).val(selectNames);
	}
	closeSelectUser();
}
$(function() {
	changeOpType($("input[name='opCode']:checked").val(),$("input[name='opCode']:checked").attr('alt'),$("input[name='opCode']:checked").attr('note'),$("input[name='opCode']:checked").attr('noteType'));
	zTree = $.fn.zTree.init($("#userTree"), setting);
});