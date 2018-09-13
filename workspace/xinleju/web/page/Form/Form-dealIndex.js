var selWpId = null;

var rebuildFi = function(postId, fiId, userId){
	if(Browser.isIE6() || Browser.isIE7()){
		$('body').mask("正在操作，请稍侯！");
	}else{
		$('body',window.document).mask("正在操作，请稍侯！");
	}
	$.ajax({
		url : 'Form!rebuildFi.do',
		data : {postId : postId,fiId : fiId, userId : userId},
		dataType : "json",
		success :function(data){
			//alert(2);
			his=10;
			if (isNotEmpty(data.nextWpParticipantsName) && $("#participantsDisplayNameSpan")){
				$("#participantsDisplayNameSpan").html(data.nextWpParticipantsName);
			}
			$("#historyInfo_div_1").css('display','none');
			$("#historyInfo_div_2").css('display','block');
			$('#historyInfo_div_2_frameInfo').attr('src', $('#historyInfo_url').val() + (new Date().getTime()));

			var hisFrame = $('#historyInfo_div_2_frameInfo')[0];

			if (hisFrame.attachEvent){
				hisFrame.attachEvent("onload", function(){
					//alert(1);
					if(Browser.isIE6() || Browser.isIE7()){
						$('body').unmask();
					}else{
						$('body',window.document).unmask();
					}
				});
			} else {
				hisFrame.onload = function(){
					//alert(1);
					if(Browser.isIE6() || Browser.isIE7()){
						$('body').unmask();
					}else{
						$('body',window.document).unmask();
					}
				};
			}

			//if(Browser.isIE6() || Browser.isIE7()){
			//	$('body').unmask();
			//}else{
			//	$('body',window.document).unmask();
			//}
		},
		error : function(){
			if(Browser.isIE6() || Browser.isIE7()){
				$('body').unmask();
			}else{
				$('body',window.document).unmask();
			}
		}
	});
}
var showWithDraw = function(fiId,wiId){
	var width = 1270;
	var height = 500;
	var scroll = 'yes';
	var url = "Form!withDrawNote.do?fiId=" + fiId + "&wiId=" + wiId;
    var dt = new Date().getTime();
    if(url!=null&&url.indexOf('dt')<0){
        if(url.indexOf('?')>-1){
        	url += "&dt="+dt;
        }else{
        	url += "?dt="+dt;
        }
    }
    var returnValue = window.showModalDialog(url,self,calcShowModalDialogLocation(width, height, scroll));
    if (isNotEmpty(returnValue) && "reFlash" == returnValue){
    	if(Browser.isIE6() || Browser.isIE7()){
			$('body').mask("正在操作，请稍侯！");
		}else{
			$('body',window.parent.document).mask("正在操作，请稍侯！");
		}
    	var hrefVar = window.location.href;
    	if(hrefVar.indexOf('?')>-1){
    		hrefVar += "&dt="+dt;
        }else{
        	hrefVar += "?dt="+dt;
        }
		window.location.href = hrefVar;
		//撤销后回调函数
		if (typeof(window.opener.spCallBack) != "undefined"){
			window.opener.spCallBack();
		}
	}
}
var showCuiBan = function(fiId){
	var width = 1000;
	var height = 600;
	var scroll = 'yes';
	var url = "Form!showCuiBan.do?fiId=" + fiId;
    var dt = new Date().getTime();
    if(url!=null&&url.indexOf('dt')<0){
        if(url.indexOf('?')>-1){
        	url += "&dt="+dt;
        }else{
        	url += "?dt="+dt;
        }
    }
    var returnValue = window.showModalDialog(url,self,calcShowModalDialogLocation(width, height, scroll));
}
var chuanYue = function(fiId){
	if (isEmpty(fiId)){
		alert('流程id丢失，无法传阅！');
		return;
	}
	var maxCount = 100;
	var minCount = 1;
	var selectedUserIds = "";
	var url = "Orgn!index.do";
	var dto = {
		minCount: minCount,
		maxCount:maxCount,
		needBackUserInfo : 1,
		selectedUserQueryMethod:"findByRoleId",
		selectedUserIds : selectedUserIds
	}
	var sFeatures = {
		dialogWidth : 1000,
		dialogHeight : 600,
		croll : 'yes'
	};
	url += "?paramJsonStr=" + encodeURI(Ext.util.JSON.encode(dto));
	var rv = showModalDialogOverride(url, window, sFeatures);
	var result = Ext.util.JSON.decode(rv);
	var paticipantString = "";
	if(result && result.length>0){
		for(var i=0;i<result.length;i++){
			paticipantString += "User_" + result[i].userid + ":" + result[i].username + ((i == result.length-1) ? "" : ";");
		}
	}
	if (isNotEmpty(paticipantString)){
		$.ajax({
			url : 'Form!chuanYue.ajax',
			data : {fiId : fiId, paticipantString : encodeURI(paticipantString)},
			dataType : "json",
			success :function(data){
				if (data.success){
					alert("传阅成功！");
				} else {
					alert(data.msg);
				}
			},
			error : function(){
				alert("传阅失败！");
			}
		});
	}
}

function doBizEidt(bizUrl){
	
	if(!bizUrl){
		
		alert("业务表单编辑路径不存在，请配置表单路径");
		return;
	}
	
	window.open(bizUrl);
}

/**
 * 一键通过审批
 */
function doAllWi(fiId){
	if(!fiId){
		alert("请选择当前审批流！");
		return;
	}
	if(window.confirm("是否要一键通过审批？")){
		$('body').mask("操作中...");
		$.ajax({
			url : 'Form!doAllWi.do',
			data : {fiId: fiId},
			dataType : "json",
			success :function(data){
				if(data && data.success){
					alert("操作成功!");
					$("#frm").submit();
				}else{
					alert("操作失败!");
					$('body').unmask();
				}
			},
			error : function(){
				alert("操作失败！");
				$('body').unmask();
			}
		})
	}
}

/**
 * 跳过当前审批人
 */
function jumpOverWi(fiId){
	if(!fiId){
		alert("没有找到当前审批工作！");
		return;
	}
	if(window.confirm("是否要跳过当前审批人？")){
		$('body').mask("操作中...");
		$.ajax({
			url : 'Form!jumpOverWi.do',
			data : {fiId: fiId},
			dataType : "json",
			success :function(data){
				if(data && data.success){
					alert("操作成功!");
					$("#frm").submit();
				}else{
					alert("操作失败!");
					$('body').unmask();
				}
			},
			error : function(){
				alert("操作失败！");
				$('body').unmask();
			}
		})
	}
}

function rejectWi(fiId) {
	if(!fiId){
		alert("没有找到当前审批工作！");
		return;
	}

	var url = "Form!rejectStepSel.do?fiId=" + fiId + "&t=" + (new Date()).getTime();
	var sFeatures = {
		dialogWidth : 900,
		dialogHeight : 500,
		scroll:'yes'
	};
	var rv = showModalDialogOverride(url, window, sFeatures);
	if (rv) {
		var wiId = rv.selWiId;
		var backSkip = rv.backSkip;
		if (!wiId) {
			alert("请选择要驳回的节点");
		}
		
		if(wiId && window.confirm("是否要驳回当前审批人？")){
			$('body').mask("操作中...");
			$.ajax({
				url : 'Form!rejectWi.do',
				data : {fiId: fiId, wiId: wiId, backSkip: backSkip},
				dataType : "json",
				success :function(data){
					if(data && data.success){
						alert("操作成功!");
						$("#frm").submit();
					}else{
						alert("操作失败!");
						$('body').unmask();
					}
				},
				error : function(){
					alert("操作失败！");
					$('body').unmask();
				}
			})
		}
	}
}

function rejectFi(fiId) {
	if(!fiId){
		alert("没有找到当前审批工作！");
		return;
	}

	if(window.confirm("是否重新发起审批？")){
		window.location.href = "Form!rejectFi.do?fiId=" + fiId;
		window.close();
	}
}
function gotoWi(fiId) {
	if(!fiId){
		alert("没有找到当前审批工作！");
		return;
	}

	var url = "Form!gotoStepSel.do?fiId=" + fiId + "&t=" + (new Date()).getTime();
	var sFeatures = {
		dialogWidth : 900,
		dialogHeight : 500,
		scroll:'yes'
	};
	var rv = showModalDialogOverride(url, window, sFeatures);
	if (rv) {
		var gotoToWpId = rv.gotoToWpId;
		if (!gotoToWpId) {
			alert("请选择要跳转的节点");
		}

		if(gotoToWpId && window.confirm("是否要跳转到指定节点？")){
			$('body').mask("操作中...");
			$.ajax({
				url : 'Form!gotoWi.do',
				data : {fiId: fiId, gotoToWpId: gotoToWpId},
				dataType : "json",
				success :function(data){
					if(data && data.success){
						alert("操作成功!");
						$("#frm").submit();
					}else{
						alert("操作失败!");
						$('body').unmask();
					}
				},
				error : function(){
					alert("操作失败！");
					$('body').unmask();
				}
			})
		}
	}
}

function updateNote(fiId) {
	var url = "Form!updateHistoryNote.do?fiId="+fiId+"&t=" + (new Date()).getTime();
	var sFeatures = {
		dialogWidth : 900,
		dialogHeight : 500,
		scroll:'yes'
	};
	
	openWindow(url, "修改审批意见", 900, 500);
}
function changeWps(fiId,wiId){
	var width = 1000;
	var height = 800;
	var scroll = 'yes';
	var url = "FormTools!changeWpsIndex.do?fiId="+fiId+"&opWiId="+wiId;
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
		$('body').mask("操作中...");
		$.ajax({
			url : 'Form!refreshNextWpParticipantsName.do',
			data : {wiId : wiId},
			dataType : "json",
			success :function(data){
				if (isNotEmpty(data.nextWpParticipantsName) && $("#participantsDisplayNameSpan")){
					$("#participantsDisplayNameSpan").html(data.nextWpParticipantsName);
				}
				$('#frameInfo').attr('src', $('#frameInfo').attr('src'));
				$('body').unmask("");
			},
			error : function(){
				$('body').unmask("");
			}
		});
    }
}
function refresh() {
	$("#frm").submit();
}

/**
 * 需要替换的对象
 * @param idDomId
 * @param nameDomId
 */
function replaceParticipants(fiId) {
	var url = "Participant!treeOrg.do?t=" + (new Date()).getTime();
	var sFeatures = {
		dialogWidth : 900,
		dialogHeight : 500,
		scroll:'yes'
	};
	var rv = showModalDialogOverride(url, window, sFeatures);
	if (rv) {

		var userId = rv.id;
		var userName = rv.name;
		if (!userId) {
			alert("请选择要替换的人员！");
		} else {
			replaceWiParticipants(fiId, userId, userName);
		}
		
	}
}

function replaceWiParticipants(fiId, userId, userName) {
	if(!fiId){
		alert("没有找到当前审批工作！");
		return;
	}

	if(userId && window.confirm("确认要将所选任务的参与者替换为：" + (isNotEmpty(userName) ?  userName : "") + "吗?")){
		$('body').mask("操作中...");
		$.ajax({
			url : 'Form!replaceWiParticipants.do',
			data : {fiId : fiId, userId : encodeURI(isNotEmpty(userId) ? userId + ":" + userName : '')},
			dataType : "json",
			success :function(data){
				if(data && data.success){
					alert("操作成功!");
					$("#frm").submit();
				}else{
					alert("操作失败!");
					$('body').unmask();
				}
			},
			error : function(){
				alert("操作失败！");
				$('body').unmask();
			}
		})
	}
}

function deleteWp(fiId) {
	if(!fiId){
		alert("没有找到当前审批工作！");
		return;
	}
	
	if ( !selWpId ) {
		alert("请选择要减少的审批人！");
		return;
	}

	if(window.confirm("确认要减少当前选中审批人吗?")){
		$('body').mask("操作中...");
		$.ajax({
			url : 'Form!deleteWp.do',
			data : {fiId : fiId, wpId : selWpId},
			dataType : "json",
			success :function(data){
				if(data && data.success){
					if ( data.msg ) {
						alert(data.msg);
					} else {
						alert("操作成功!");
						$("#frm").submit();
						
					}
					
				}else{
					if ( data.msg ) {
						alert( data.msg );
					} else {
						alert("操作失败!");
					}
					$('body').unmask();
				}
			},
			error : function(){
				alert("操作失败！");
				$('body').unmask();
			}
		})
	}
}

function deleteFi(fiId) {
	if(!fiId){
		alert("没有找到当前审批工作！");
		return;
	}
	
	if(window.confirm("确认要作废当前流程实例吗?")){
		$('body').mask("操作中...");
		$.ajax({
			url : 'Form!deleteFi.do',
			data : {fiId : fiId},
			dataType : "json",
			success :function(data){
				if(data && data.success){
					if ( data.msg ) {
						alert(data.msg);
					} else {
						alert("操作成功!");
						$("#frm").submit();
						
					}
					
				}else{
					if ( data.msg ) {
						alert( data.msg );
					} else {
						alert("操作失败!");
					}
					$('body').unmask();
				}
			},
			error : function(){
				alert("操作失败！");
				$('body').unmask();
			}
		})
	}
}

/**
 * 流程收藏
 * @author lwp
 * @param fiId
 * @returns
 */
var fiStore = function(fiId){
	if(Browser.isIE6() || Browser.isIE7()){
		$('body').mask("数据加载中...");
	}else{
		$('body',window.parent.document).mask("数据加载中...");
	}
	$.ajax({
		url : 'Form!fiStore.ajax',
		data : {fiId : fiId},
		dataType : "json",
		success :function(data){
			if (data.success){
				alert("收藏成功！");
			} else {
				alert(data.msg);
			}
			if(Browser.isIE6() || Browser.isIE7()){
				$('body').unmask();
			}else{
				$('body',window.parent.document).unmask();
			}
		},
		error : function(){
			if(Browser.isIE6() || Browser.isIE7()){
				$('body').unmask();
			}else{
				$('body',window.parent.document).unmask();
			}
		}
	});
}
/**
 * 流程取消
 * @author lwp
 * @param fiStoreId
 * @returns
 */
var fiStoreCancel = function(fiStoreId){
	if(Browser.isIE6() || Browser.isIE7()){
		$('body').mask("数据加载中...");
	}else{
		$('body',window.parent.document).mask("数据加载中...");
	}
	$.ajax({
		url : 'Form!fiStoreCancel.ajax',
		data : {fiStoreId : fiStoreId},
		dataType : "json",
		success :function(data){
			if (data.success){
				alert("取消收藏成功！");
			} else {
				alert(data.msg);
			}
			$('#frm').submit();
		},
		error : function(){
			alert("网络连接失败，请检查网络或联系管理员！");
			if(Browser.isIE6() || Browser.isIE7()){
				$('body').unmask();
			}else{
				$('body',window.parent.document).unmask();
			}
		}
	});
}
var tsqxDeal = function(fiId){
	var width = 1270;
	var height = 500;
	var scroll = 'yes';
	var url = "FormTools!tsqxDeal.do?fiId=" + fiId;
    var dt = new Date().getTime();
    if(url!=null&&url.indexOf('dt')<0){
        if(url.indexOf('?')>-1){
        	url += "&dt="+dt;
        }else{
        	url += "?dt="+dt;
        }
    }
    var returnValue = window.showModalDialog(url,self,calcShowModalDialogLocation(width, height, scroll));
    if (isNotEmpty(returnValue)){
    	if ("reFlash" == returnValue){
    		if(Browser.isIE6() || Browser.isIE7()){
    			$('body').mask("正在操作，请稍侯！");
    		}else{
    			$('body',window.parent.document).mask("正在操作，请稍侯！");
    		}
        	var hrefVar = window.location.href;
        	if(hrefVar.indexOf('?')>-1){
        		hrefVar += "&dt="+dt;
            }else{
            	hrefVar += "?dt="+dt;
            }
    		window.location.href = hrefVar;
    	} else if ("closeOpWin" == returnValue){
    		try{
    			window.opener.document.frm.submit();
    		}catch (e) {
				// TODO: handle exception
			}
			window.close();
    	}
	}
}