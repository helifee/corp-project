$(function($) {
	
	$.post("App!checkPTIndexPagePower.do", function(datas) {
		var obj = eval(datas);
		if(obj.userPowerCheck) {
			initUserList();
		}else {
			setNoPower("user_wraper", "用户管理");
		}
		if(obj.bizAuthPowerCheck) {
			initBizAuthList();
		}else {
			setNoPower("biz_auth_wraper", "数据权限");
		}
		if(obj.ctPowerCheck) {
			initCtList();	
		}else {
			setNoPower("ct_wraper", "流程模板查询");
		}
		if(obj.todoFiPowerCheck) {
			initTodoFiList();
		}else {
			setNoPower("todo_fi_wraper", "流程实例查询");
		}
	});
	
});

function setNoPower(wraper_id, title) {
	$("#"+wraper_id).empty().html(getNoPowerHtml(title))
}

function getNoPowerHtml(title) {
	var html = '<div class="panel panel-default nopower full_height">' +
				  '<div class="panel-heading height_34 bold">'+title+'</div>'+
				 ' <div class="panel-body">'+
				   '<p class="text-center line_height_170 bold">您没有权限访问 </p>'+
				  '</div>'+
				'</div>';
	return html;
}

function initUserList(){
	$.post("User!structUserListAjax.do?limit=5&parentEntityId=0&partyStructTypeId=1 ", function(data) {
		for(var i=0;i<data.length;i++){
			 var _tr = "<tr>" +
      		"<td title=\""+data[i].realName+"\">"+data[i].realName+"</td>" +
      		"<td title=\""+data[i].loginName+"\">"+data[i].loginName+"</td>" +
      		"<td title=\""+data[i].mobile+"\">"+data[i].mobile+ "</td>" +
      		"<td title=\""+data[i].position+"\">"+data[i].position+ "</td>" +
      		
		  "</tr>"; 
			 $("#user_list_table > tbody").append(_tr); 
		}
		
		for(var j=0;j<5-data.length;j++){
			 var _tr = "<tr>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		
			  "</tr>"; 
				 //alert(_tr);
				 $("#user_list_table > tbody").append(_tr); 
		}
	});
}

function initBizAuthList(){
	$.post("BizAuth!authListAjax.do?limit=5 ", function(data) {
		for(var i=0;i<data.length;i++){
			 var _tr = "<tr>" +
      		"<td title=\""+data[i][0]+"\">"+data[i][0]+"</td>" +
      		"<td title=\""+data[i][1]+"\">"+data[i][1]+"</td>" +
      		"<td title=\""+data[i][2]+"\">"+data[i][2]+ "</td>" +
      		
      		
		  "</tr>"; 
			 $("#biz_auth_table > tbody").append(_tr); 
		}
		
		for(var j=0;j<5-data.length;j++){
			 var _tr = "<tr>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      	
	      		
			  "</tr>"; 
				 //alert(_tr);
				 $("#biz_auth_table > tbody").append(_tr); 
		}
	});
}



function initCtList(){
	$.post("Ct!listAjax.do?limit=5&start=0 ", function(data) {
		
		for(var i=0;i<data.length;i++){
			var _tr = "<tr>" +
      		"<td title=\""+data[i].flowName+"\"><a href=\"#\" onclick=\"javascript:viewFlow('"+data[i].flowId+"')\">" + data[i].flowName + "</a></td>" +
      		"<td title=\""+data[i].flowCode+"\">" + data[i].flowCode + "</td>" +
      		"<td title=\""+data[i].flowVersion+"\">" + data[i].flowVersion + "</td>" +
      		"<td title=\""+data[i].ctName+"\">" + data[i].ctName + "</td>" +
      		"<td title=\""+data[i].allPath+"\">" + data[i].allPath + "</td>" +
      		"<td title=\""+data[i].isCommited+"\">" + data[i].isCommited + "</td>" +
      		"<td title=\""+data[i].isDefault+"\">" + data[i].isDefault + "</td>" +
			"</tr>"; 
			$("#ct_list_table > tbody").append(_tr); 
		}
		
		for(var j=0;j<5-data.length;j++){
			 var _tr = "<tr>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		
			  "</tr>"; 
				 //alert(_tr);
				 $("#ct_list_table > tbody").append(_tr); 
		}
	});
}

function initTodoFiList() {
	$.post("TodoFi!listAjax.do?limit=5&start=0 ", function(data) {
		for(var i=0;i<data.length;i++){
			var _tr = "<tr>" +
      		"<td title=\""+data[i].title+"\"><a href=\"#\" onclick=\"openwindow('Form!dealIndex.do?fiId="+data[i].id+"','fi_wi',1270,0)\">" + data[i].title + "</a></td>" +
      		"<td title=\""+data[i].flowType+"\">" + data[i].flowType + "</td>" +
      		"<td title=\""+data[i].code+"\">" + data[i].code + "</td>" +
      		"<td title=\""+data[i].compary+"\">" + data[i].compary + "</td>" +
      		"<td title=\""+data[i].applyPsn+"\">" + data[i].applyPsn + "</td>" +
      		"<td title=\""+data[i].applyTime+"\">" + data[i].applyTime + "</td>" +
			"</tr>"; 
			$("#todo_fi_table > tbody").append(_tr); 
		}
		
		for(var j=0;j<5-data.length;j++){
			 var _tr = "<tr>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		"<td>&nbsp;</td>" +
	      		
			  "</tr>"; 
				
				 $("#todo_fi_table > tbody").append(_tr); 
		}
	});
}