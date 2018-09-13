$(function($) {
	initstructUserList();
});


function initstructUserList(){
}

function doSearch() {
	$('#frm').submit();
}
//导出报表
function exportReport(){
		OpenWin("ReportSetting!reportBasic.do?reportName=用户基本信息&queryPath=PT/user_arg.rpx&resultPath=PT/user.rpx");
}

function chooseCheckBox(id){
	$.each($("input:checkbox") , function() {
		$(this).prop("checked",false); 
	});
//	obj.checked=true;
	$("#"+id).prop("checked", true);

	refreshR();

}

function refreshR(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var userId = $(this).val();
			var iframe = document.getElementById("role_frame");
			Ext.get(iframe).dom.src ="User!userRoleList.do?limit=10&userId=" + userId;

			//  iframe 加载完以后 撑开父页面高度
			if (iframe.attachEvent){ 
				iframe.attachEvent("onload", function(){ 
					window.parent.setAutoHeight('user_frame',0);
				}); 
			} else { 
				iframe.onload = function(){ 
					window.parent.setAutoHeight('user_frame',0);
				}; 
			} 
		});
	}

}

function add(parentEntityId,partyStructTypeId){
	openwindow('User!edit.do?parentEntityId='+parentEntityId+'&partyStructTypeId='+partyStructTypeId);
}


function edit(parentEntityId,partyStructTypeId){

	if($("input:checkbox:checked").length != 1){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var userId = $(this).val();
			openwindow('User!edit.do?id='+userId+'&parentEntityId='+parentEntityId+'&partyStructTypeId='+partyStructTypeId+'&start='+$("#start").attr("value"));

		});
	}

}

function clickEdit(userId,parentEntityId,partyStructTypeId){
		
	openwindow('User!edit.do?id='+userId+'&parentEntityId='+parentEntityId+'&partyStructTypeId='+partyStructTypeId);

}

function showEnable(id, flag){
	var flg = $("#status_"+id).attr("value");
	try{
		if(flg == 1){
			$("#flagDisable").hide();
			$("#flagEnable").show();
		} else {
			$("#flagDisable").show();
			$("#flagEnable").hide();
		}
	}catch(e){
		
	}
	
}

function disable(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {

			var userId = $(this).val();
			$('body').mask('操作中...');
			$.post('User!disable.do?userId='+userId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				//window.location.reload();
				if($("#status_"+userId).val()==0){
					$("#statusCN_"+userId).html("禁用");
					$("#t_"+userId).addClass("disabledTr");
					$("#status_"+userId).val("1");
					showEnable(userId,true);
				}else{
					$("#statusCN_"+userId).html("启用");
					$("#t_"+userId).removeClass("disabledTr");
					$("#status_"+userId).val("0");
					showEnable(userId,false);
				}

			});

		});
	}
}


function enable(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {

			var userId = $(this).val();
			$('body').mask('操作中...');
			$.post('User!enable.do?userId='+userId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				//window.location.reload();
				if($("#status_"+userId).val()==0){
					$("#statusCN_"+userId).html("禁用");
					$("#t_"+userId).addClass("disabledTr");
					$("#status_"+userId).val("1");
					showEnable(userId,true);
				}else{
					$("#statusCN_"+userId).html("启用");
					$("#t_"+userId).removeClass("disabledTr");
					$("#status_"+userId).val("0");
					showEnable(userId,false);
				}

			});

		});
	}
}

var win;
//兼职岗位
function jobWindow() { 
     
	if($("input:checkbox:checked").length != 1){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {

			var userId = $(this).val();

			if(win!=null){
				win.close(); 
			}
			var partyStructTypeId = $("#partyStructTypeId").val();
			win = new Ext.Window({ 
				width:275,
				height:300,
				resizable:false,
				html:'<iframe height=\'230\' width=\'260\' src=\"User!roleTree.do?partyStructTypeId='+partyStructTypeId+'&userId='+userId+'\"></iframe>',
				title:"岗位" ,
				buttonAlign: 'center',
				buttons: [
				          { text: '确定', handler: function(){win.close();} }
				          ]
			});  
			win.show(); 


		});
	}
}
