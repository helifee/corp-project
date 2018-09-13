//选择需要替换的参与者
function choosePartySonWindow(idDomId,nameDomId) {
	var url = "Participant!treeOrg.do?t=" + (new Date()).getTime();
	var sFeatures = {
		dialogWidth : 300,
		dialogHeight : 440,
		scroll:'yes'
	};
	var rv = showModalDialogOverride(url, window, sFeatures);
	if (rv) {
		var idVar = rv.id;
		var nameVar  = rv.name;
		$("#" + idDomId).val(idVar);
		$("#" + nameDomId).val(nameVar);
	}
}
//替换参与者
function replaceFlParticipants(fromIdDomId,fromNameDomId,toIdDomId,toNameDomId) {
	var ids = getCheckBoxValues("ids");
	var participantString = isNotEmpty($('#' + fromIdDomId).val()) ? $('#' + fromIdDomId).val() : '';
	var participantNameString = isNotEmpty($('#' + fromNameDomId).val()) && '请选择' != $('#' + fromNameDomId).val() ? $('#' + fromNameDomId).val() : '';
	var toParticipantString = isNotEmpty($('#' + toIdDomId).val()) ? $('#' + toIdDomId).val() : '';
	var toParticipantNameString = isNotEmpty($('#' + toNameDomId).val()) && '请选择' != $('#' + toNameDomId).val() ? $('#' + toNameDomId).val() : '';
	if (isEmpty(ids)){
		alert("请选择流程模板！");
	} else if (isEmpty(participantString)){
		alert("请选择原流程参与者！");
	}else {
		if (confirm('确认要将所选原流程参与者:' + participantNameString + '替换为：' + toParticipantNameString + '吗?')){
			$('body',window.parent.document).mask("操作中...");
			$.ajax({
				url : 'TurnOverDeal!replaceFlParticipant.ajax',
				data : {"ids" : ids, "participantString" : encodeURI(participantString + ":" +participantNameString) , "toParticipantString" : encodeURI(isNotEmpty(toParticipantString) ? toParticipantString + ":" + toParticipantNameString : '') , "t" : (new Date()).getTime()},
				dataType : "json",
				success :function(data){
					if (data.success){
						alert('操作成功！');
						window.parent.window.changeTurnOverType(participantString,participantNameString,toParticipantString,toParticipantNameString);
					} else {
						alert('操作失败');
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
function queryFl() {
	$('body').mask("操作中...");
	alert(encodeURI($("#replacePartyPost").html()));
	var url = "TurnOverDeal!flList.do?fromPartyIdVar=" + $("#fromPartyIdVar").val() + "&fromPartyVar=" + $("#fromPartyVar").val() +"&userPostDivHtml=" + encodeURI($("#replacePartyPost").html()) +"&toPartyIdVar=" + $("#toPartyIdVar").val() + "&toPartyVar=" + $("#toPartyVar").val() + "&t=" + (new Date()).getTime();
	url = encodeURI(url);
	$("#objList",window.parent.document).attr("src",url);
}