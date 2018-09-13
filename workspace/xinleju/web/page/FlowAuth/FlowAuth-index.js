$(document).ready(function(){
    $(".trCls").click(function(){
       $(this).focus();
       $(this).css("background", "red");
    });
    
    $("#flagDisable").hide();
	$("#flagEnable").hide();
}); 

function doSearch() {
	 $('#frm').submit();
}
function doRefreshParent() {
	window.location.reload();
}
function addFlowAuth(){
	openwindow("FlowAuth!edit.do", "流程授权编辑");
}
function editFlowAuth(){
	if($("input:checkbox:checked").length != 1){
		alert("请只选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var flowAuthId = $(this).val();
			openwindow('FlowAuth!edit.do?id='+flowAuthId, "流程授权编辑");
		});
	}
	
}

function deleteFlowAuth(){
	if($("input:checkbox:checked").length != 1){
		alert("请只选中一条记录");
	}else{
		if(confirm("确定要删除吗？")){
			$.each($("input:checkbox:checked") , function() {
				var flowAuthId = $(this).val();
				$.post('FlowAuth!deleteFlowAuth.ajax?flowAuthId='+flowAuthId,  function(data2) {
					doRefreshParent();
				});
			});
			
		}
		
	}
	
}

function chooseCheckBox(obj){
	$.each($("input:checkbox") , function() {
		$(this).attr("checked",false); 
	});
	obj.checked=true;
}

function chooseThisRow( id ) {
	$.each($("input:checkbox") , function() {
		$(this).attr("checked",false); 
	});

	$("#"+id).attr("checked", !$("#"+id).attr("checked"));
}

function showEnable(id, flag){
	var flg = $("#status_"+id).val();
	if(flg == 0){
		$("#flagDisable").show();
		$("#flagEnable").hide();
	}else {
		$("#flagDisable").hide();
		$("#flagEnable").show();
	}
}

function disable(){
	$('body').mask('操作中...');
	
	var selId = findSelId();
	$.post('FlowAuth!disable.do?id='+selId, $('#frm').serialize(), function(data) {
		$('body').unmask();

		if($("#status_"+selId).val()==1){
			$("#status_img_"+selId).html("<img src=\"images/icon_yes.png\" width=\"16\" height=\"16\" />");
			$("#"+selId).addClass("disabledTr");
			$("#status_"+selId).val("0");
			showEnable(selId, false);
		}else{
			$("#status_img_"+selId).html("<img src=\"images/icon_no.png\" width=\"16\" height=\"16\" />");
			$("#"+selId).removeClass("disabledTr");
			$("#status_"+selId).val("1");
			showEnable(selId, true);
		}
	});

}

function enable(){
	$('body').mask('操作中...');
	
	var selId = findSelId();
	$.post('FlowAuth!enable.do?id='+selId, $('#frm').serialize(), function(data) {
		$('body').unmask();

		if($("#status_"+selId).val()==1){
			$("#status_img_"+selId).html("<img src=\"images/icon_yes.png\" width=\"16\" height=\"16\" />");
			$("#status_"+selId).val("0");
			showEnable(selId, false);
		}else{
			$("#status_img_"+selId).html("<img src=\"images/icon_no.png\" width=\"16\" height=\"16\" />");
			$("#status_"+selId).val("1");
			showEnable(selId, true);
		}
	});

}

function findSelId() {
	var id = $("#flowAuthId").val();
	if(id != null && id.split("_").length > 1){
		id = id.split("_")[1];
	}
	return id;
}

//选中行
function changCo(id){
    $("tr[id*='changeCo_']").each(function(){
        $(this).removeAttr("class");
    });
    $("#changeCo_"+id).attr("class","current");
    $("#flowAuthId").val(id);
}