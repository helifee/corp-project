//选择需要替换的参与者
function choosePartySonWindow(idDomId,nameDomId) {
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
		var  id=idVar.replace("Part_","");
		
		$.ajax({
			url : 'FlowAuth!getUserJobs.do',
			data : {userId : id},
			dataType : "json",
			success :function(data){
				var replacePartyPost = $("#replacePartyPost");
				replacePartyPost.html("");
				for ( var idx = 0; idx < data.length; idx++ ) {
					if( idx%3==0){
 						replacePartyPost.append($("<input type='checkbox' name='jobs' value='" + data[idx].id + "' />&nbsp;<span>" + data[idx].name + "</span></br>") );
 					}else{
 						replacePartyPost.append($("<input type='checkbox' name='jobs' value='" + data[idx].id + "' />&nbsp;<span>" + data[idx].name + "</span>") );
 					}
				}
				$("#" + idDomId).val(idVar);
				$("#" + nameDomId).val(nameVar);
			},
			error : function(){
				alert("操作失败！");
			}
		});
		
	}
}
//替换参与者
function replaceWiParticipants(toIdDomId,toNameDomId,fromIdDomId,fromNameDomId) {
	var ids = getCheckBoxValues("ids");
	var toParticipantString = isNotEmpty($('#' + toIdDomId).val()) ? $('#' + toIdDomId).val() : '';
	var toParticipantNameString = isNotEmpty($('#' + toNameDomId).val()) && '请选择' != $('#' + toNameDomId).val() ? $('#' + toNameDomId).val() : '';
	var fromParticipantString = isNotEmpty($('#' + fromIdDomId).val()) ? $('#' + fromIdDomId).val() : '';
	var fromParticipantNameString = isNotEmpty($('#' + fromNameDomId).val()) && '请选择' != $('#' + fromNameDomId).val() ? $('#' + fromNameDomId).val() : '';
	if (isEmpty(ids)){
		alert("请选择任务信息！");
	} else if (isEmpty(toParticipantString)){
		alert("请选目标参与者！");
	}  else if (isEmpty(fromParticipantString)){
		alert("请选原参与者！");
	} else {
		if (confirm('确认要将所选任务的参与者替换为：' + (isNotEmpty(toParticipantString) ?  toParticipantNameString : '') + '吗?')){
			
			$('body',window.parent.document).mask("操作中...");
			$.ajax({
				url : 'TurnOverDeal!replaceWiParticipant.ajax',
				data : {"ids" : ids, "toParticipantString" : encodeURI(isNotEmpty(toParticipantString) ? toParticipantString + ":" + toParticipantNameString : '') ,
					        "fromParticipantString" : encodeURI(isNotEmpty(fromParticipantString) ? fromParticipantString + ":" + fromParticipantNameString : '') ,"t" : (new Date()).getTime()},
				dataType : "json",
				success :function(data){
					if (data.success){
						alert('操作成功！');
						window.parent.window.changeTurnOverType(fromParticipantString,fromParticipantNameString,toParticipantString,toParticipantNameString);
					} else {
						var errorMsg = "操作失败!";
						if (isNotEmpty(data.msg)){
							errorMsg = data.msg;
						}
						alert(errorMsg);
						$('body',window.parent.document).unmask();
					}
				},
				error : function(){
					alert("操作失败！");
					$('body',window.parent.document).unmask();
				}
			});
		}
	}
}

//查询
function queryWi() {
	$('body').mask("操作中...");
	var url = "TurnOverDeal!wiList.do?fromPartyIdVar=" + $("#fromPartyIdVar").val() + "&fromPartyVar=" + $("#fromPartyVar").val()  +"&toPartyIdVar=" + $("#toPartyIdVar").val() + "&toPartyVar=" + $("#toPartyVar").val() + "&t=" + (new Date()).getTime();
	url = encodeURI(url);
	$("#objList",window.parent.document).attr("src",url);
}