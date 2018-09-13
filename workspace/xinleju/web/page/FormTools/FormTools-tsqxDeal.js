var spCallBack = function (){
	maskBody('');
	$("#frm").submit();
}
var maskBody = function (maskMsg){
	if (isEmpty(maskMsg)){
		maskMsg = "正在操作，请稍侯！";
	}
	if(Browser.isIE6() || Browser.isIE7()){
		$('body').mask(maskMsg);
	}else{
		$('body',window.document).mask(maskMsg);
	}
}
var unmaskBody = function (){
	if(Browser.isIE6() || Browser.isIE7()){
		$('body').unmask();
	}else{
		$('body',window.parent.document).unmask();
	}
}
function viewGraph(fiId){
	var h = screen.height;
	var w = screen.width;
	var opts = 'height=' + h + ',width=' + w + ',top=' + (screen.height - h) / 2 + ',left=' + (screen.width - w) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no';
	var dt = new Date();
	window.open('Graph!index.do?fiId=' + fiId + '', 'g_' + dt.getTime(), opts);
}

function synWork(wiId, opFlag, note, ct, st) {
	if(!opFlag){
		return;
	}
	note = encodeURI(isNotEmpty(note) ? note : "");
	//更换参与人
	if (opFlag == '2'){
		var maxCount = 1;
		var minCount = 1;
		var selectedUserIds = "";
		var url = "user_orgn_tree!chooseUserIndex.do";
		var dto = {
			queryMethod : "findSelectedUserBySelectedUserIds",
			minCount : minCount,
			maxCount : maxCount,
			selectedUserIds : selectedUserIds
		}
		var width = 1000;
		var height = 600;
		var scroll = 'yes';
		url += "?paramJsonStr=" + encodeURI(Ext.util.JSON.encode(dto));
		var rv = window.showModalDialog(url,self,calcShowModalDialogLocation(width, height, scroll));
		var result = Ext.util.JSON.decode(rv);
		var userId = "";
		var userName = "";
		if(result && result.length>0){
			userId = result[0].userId;
			userName = userName = result[0].userName;
		}
		if (isNotEmpty(userId) && confirm('是否要将参与人修改为' + userName + '?')){
			maskBody();
			$.ajax({
				url : 'flow_tools!changeWiUser.ajax',
				data : {wiId : wiId, userId : userId},
				dataType : "json",
				success :function(data){
					if (data.success){
						alert("操作成功！");
						$("#frm").submit();
					} else {
						alert(data.msg);
						unmaskBody();
					}
				},
				error : function(){
					unmaskBody();
				}
			});
		}
	} else if(confirm('确认'+$('#opSelectId_'+wiId).find('option:selected').text()+'?')){
		maskBody();
		$.ajax({
			url : 'FormTools!syncWork.do',
			data : {spId: $('#spId').val(),wiId : wiId,opFlag : opFlag,note : note,ct:ct,st:st },
			dataType : "json",
			success :function(responseText){
				if(responseText && responseText.success){
					alert("操作成功！");
					$("#frm").submit();
				}else{
					alert("操作失败!");
					unmaskBody();
				}
			},
			error : function(){
				alert("操作失败！");
				unmaskBody();
			}
		});
	}
}

/**
 * 跳转到对应的wp
 */
function gotoWp(wpId,wpName){
	if (!isEmpty(wpId) && confirm('确定要跳转到' + wpName + '节点？')){
		maskBody();
		$.ajax({
			url : 'flow_tools!gotoWp.ajax',
			data : {wpId: wpId, t: (new Date()).getTime()},
			dataType : "json",
			success :function(responseText){
				if(responseText && responseText.success){
					alert("操作成功!");
					$('#frm').submit();
				}else{
					alert("操作失败!失败原因："+responseText.msg);
					unmaskBody();
				}
			},
			error : function(){
				alert("操作失败！");
				unmaskBody();
			}
		});
	} else {
		return;
	}
}

/**
 * 一键通过审批
 */
function doAllWi(spId){
	if(!spId){
		alert("请选择当前审批流！");
		return;
	}
	if(window.confirm("确认要一键通过审批么？仅方便测试使用，请谨慎操作！")){
		maskBody();
		$.ajax({
			url : 'FormTools!doAllWi.do',
			data : {spId: spId},
			dataType : "json",
			success :function(responseText){
				if(responseText && responseText.success){
					alert("操作成功!");
					$("#frm").submit();
				}else{
					alert("操作失败!");
					unmaskBody();
				}
			},
			error : function(){
				alert("操作失败！");
				unmaskBody();
			}
		})
	}
}

var changeWi = function (wiId){
	if(Browser.isIE6() || Browser.isIE7()){
		$('body').mask("正在操作，请稍侯！");
	}else{
		$('body',window.document).mask("正在操作，请稍侯！");
	}
	$('input[id^=wiId_]').each(function(){
		$(this).removeAttr("checked");
		$(this).parent().parent().removeClass("tron");
	});
	if (!isEmpty(wiId)){
		$("#wiId_" + wiId).attr("checked",'true'); 
		$("#wiId_" + wiId).parent().parent().addClass("tron");
	}
	$('#tsqxDealOpFrame').attr('src','flow_tools!tsqxDealOp.do?wiId='+wiId+'&t='+(new Date()).getTime());
}
$(function(){
	var wiId = $('input[id^=wiId_]:checked').val();
	if (!isEmpty(wiId)){
		changeWi(wiId);
	}
});