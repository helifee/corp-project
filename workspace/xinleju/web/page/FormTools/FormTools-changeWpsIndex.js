$(function(){
	$("#reload").attr("href",window.location.href);
})

/**
 * 正常选择人员（至少选择一个）
 */
function addWpUser(opWiId, wpId, subWpId, wiId, userId){
	var maxCount = 1;
	var minCount = 1;
	var selectedUserIds = "";
	var url = "Orgn!index.do";
	var dto = {
		minCount:minCount,
		maxCount:maxCount,
		needBackUserInfo : 1,
		selectedUserQueryMethod:"findByRoleId",
		selectedUserIds : selectedUserIds
	}
	var width = 1000;
	var height = 600;
	var scroll = 'yes';
	url += "?paramJsonStr=" + encodeURI(Ext.util.JSON.encode(dto));
	var rv = window.showModalDialog(url,self,calcShowModalDialogLocation(width, height, scroll));
	var result = Ext.util.JSON.decode(rv);
	var paticipantString = "";
	var paticipantUserNameString = "";
	if(result && result.length>0){
		for(var i=0;i<result.length;i++){
			paticipantString += "User_" + result[i].userid + ":" + result[i].username + ((i == result.length-1) ? "" : ";");
			paticipantUserNameString += result[i].username + ((i == result.length-1) ? "" : ";");
		}
	}
	if (isNotEmpty(paticipantString) && confirm("是否要添加流程参与人:" + paticipantUserNameString + "?")){
		if(Browser.isIE6() || Browser.isIE7()){
			$('body').mask("正在操作，请稍侯！");
		}else{
			$('body',window.document).mask("正在操作，请稍侯！");
		}
		$.ajax({
			url : 'FormTools!changeWpsUsers.ajax',
			data : {opWiId : opWiId, wpId : wpId, subWpId : subWpId, wiId : wiId, userId : userId, paticipantString : paticipantString},
			dataType : "json",
			success :function(data){
				if (isNotEmpty(data.success) && data.success == true){
					$('body').unmask();
				    $("#reload")[0].click();//reload为A中隐藏a标签的id,当然可以换成其它名称
				    window.returnValue = 'refresh';
					 //window.close();
				} else {
					if(data.msg){
						alert(data.msg);
					}
					if(Browser.isIE6() || Browser.isIE7()){
						$('body').unmask();
					}else{
						$('body',window.parent.document).unmask();
					}
				}
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
}

function deleteParticipant(opWiId, wpId, subWpId, wiId, userId){
	if (confirm("是否删除此参与人?")){
		if(Browser.isIE6() || Browser.isIE7()){
			$('body').mask("正在操作，请稍侯！");
		}else{
			$('body',window.document).mask("正在操作，请稍侯！");
		}
		$.ajax({
			url : 'FormTools!deleteParticipant.ajax',
			data : {opWiId : opWiId, wpId : wpId, subWpId : subWpId, wiId : wiId, userId : userId},
			dataType : "json",
			success :function(data){
				if (isNotEmpty(data.success) && data.success == true){
					$('body').unmask();
				    $("#reload")[0].click();//reload为A中隐藏a标签的id,当然可以换成其它名称
				    window.returnValue = 'refresh';
				//	window.close();
				} else {
					alert("操作失败！");
					if(Browser.isIE6() || Browser.isIE7()){
						$('body').unmask();
					}else{
						$('body',window.parent.document).unmask();
					}
				}
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
}

/**
 * 岗位无人的情况下，选择人员
 * @param wpId
 */
function selectParticipantForInput(wpId,finishCtrl,ifSave){
	var maxCount = 1;
	var minCount = 0;
	if(finishCtrl == 'xor'){
		maxCount = 100;
	}
	var selectedUserIds = $("#part_input_hidden_"+wpId).val();
	var url = "Orgn!index.do";
	var dto = {
		minCount:minCount,
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
	var selectIds = "";
	var selectNames = "";
	if(result && result.length>0){
		for(var i=0;i<result.length;i++){
			selectIds += result[i].userid + ((i == result.length-1) ? "" : ",")
			selectNames += result[i].username + ((i == result.length-1) ? "" : ";")
		}
		$("#part_input_hidden_"+wpId).val(selectIds);
		if(ifSave){
			if (isNotEmpty(selectIds) && confirm("是否要将流程参与人改为:" + selectNames + "?")){
				if(Browser.isIE6() || Browser.isIE7()){
					$('body').mask("正在操作，请稍侯！");
				}else{
					$('body',window.document).mask("正在操作，请稍侯！");
				}
				$.ajax({
					url : 'FormTools!changeParticipants.ajax',
					data : {wpId : wpId,selectUserIds : selectIds},
					dataType : "json",
					success :function(data){
						if (isNotEmpty(data.success) && data.success == true){
							window.returnValue = 'refresh';
							window.close();
						} else {
							alert(data.msg);
							if(Browser.isIE6() || Browser.isIE7()){
								$('body').unmask();
							}else{
								$('body',window.parent.document).unmask();
							}
						}
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
		}
	}
}