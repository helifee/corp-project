$(document).ready(function() {
	if ( $("#transFlg").val() == 0 ) {
		$("#isTransfer").attr("checked", "checked");
	}
	
	initCheckBox();
});

function initCheckBox() {
	if ( $("#transFlg").val() == 0 ) {
		$("#isTransfer").attr("checked", "checked");
	}
	
	var chkItmsIds = ";" + $("#authItems").val() + ";";
	$("[name='jobs']").each(function() {
		if ( chkItmsIds.indexOf(";" + $(this).val() + ";", 0) >= 0 ) {
			$(this).attr("checked", "checked");
		}
	});
	
//	var chkScopeIds = ";" + $("#authScope").val() + ";";
//	$("[name='scopes']").each(function() {
//		if ( chkScopeIds.indexOf(";" + $(this).val() + ";", 0) >= 0 ) {
//			$(this).attr("checked", "checked");
//		}
//	});
}

function resetSelFlow(data) {
	$("#selFlowList").empty();
	
	for (var idx = 0; idx < data.length; idx++) {
		$("#selFlowList").append($("<option value='" + data[idx].value + "'>" + data[idx].text + "</option>"));
	}
	
}

function save() {
	resetCheckData();
	
	if(true){
		$('body').mask("数据保存中...");
		$.ajax({
			type : "POST",
			url : "FlowAuth!save.do",
			data : $('#frm').serialize(),
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					window.opener.doRefreshParent();
					window.close();
				} else {
					alert(data.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("网络故障！");
			}
		});
	}else{
		alert("请正确填写信息");
	}
}

function resetCheckData() {
	var jobs = "";
	$("[name='jobs']").each(function() {
		if ($(this).attr("checked")) {
			jobs += ";" + $(this).val();
		}
	});
	$("#authItems").val( jobs.substring(1) );
	
	var scopes = "";
	$("#selFlowList option").each(function(){
		scopes += ";" + $(this).val();
	});
	
	$("#authScope").val( scopes.substring(1) );
}

//选择人员
function selectUser(idDomId,nameDomId,selItem) {
	var url = "TurnOverDeal!parList.do?t=" + (new Date()).getTime();
	var sFeatures = {
		dialogWidth : 1050,
		dialogHeight : 400,
		scroll:'yes'
	};
	var rv = showModalDialogOverride(url, window, sFeatures);
	if (rv) {
		var idVar = rv.id;
		var nameVar  = rv.name;
		$("#" + idDomId).val(idVar.substring(idVar.indexOf("_")+1));
		$("#" + nameDomId).val(nameVar);
		if(selItem == 1){
			resetAuthItems(idVar.substring(idVar.indexOf("_")+1));
		}
	}
}

function orgnSelect(resUserId , resUserName){
	if ( selItem == 1 ) {
		$("#auth2UserId").val( resUserId);
		$("#auth2UserName").val( resUserName);
	} else {
		$("#authUserId").val( resUserId);
		$("#authUserName").val( resUserName);
		
		resetAuthItems(resUserId);
	}
}

function isTransfer(obj) {
	var isChecked = obj.checked;
	$("#bIsTransferNow").val(isChecked);
}

function resetAuthItems(resUserId) {
	if(!resUserId){
		return;
	}

	$('body').mask("操作中...");
	$.ajax({
		url : 'FlowAuth!getUserJobs.do',
		data : {userId : resUserId},
		dataType : "json",
		success :function(data){
			if(data){
				initAuthItems(data);
			}else{
				alert("操作失败!");
			}
			$('body').unmask();
		},
		error : function(){
			alert("操作失败！");
			$('body').unmask();
		}
	});
}

function initAuthItems(data) {
	var authItems = $("#dispAuthItems");
	authItems.html("");

	for ( var idx = 0; idx < data.length; idx++ ) {
		authItems.append($("<input type='checkbox' name='jobs' value='" + data[idx].id + "' />&nbsp;<span>" + data[idx].namefix + "</span></br>") );
	}
}

function chgTransfer() {
	$("#transFlg").val( ($("#isTransfer").attr("checked") == "checked" ? 0 : 1) );
}

/**
 * 引入流程模板
 */
function unionFlow() {
	resetCheckData();
	var authScope = $("#authScope").val();
	openwindow('FlowAuth!unionFlow.do?authScope='+authScope);
}