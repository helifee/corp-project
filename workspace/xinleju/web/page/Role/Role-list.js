function doSearch() {
	 $('#frm').submit();
}
function doSearchRefreshParentTree() {
	this.refreshParentTree();
	this.doSearch();
	//window.location.reload();
}
function refreshParentTree() {
	try {
		window.parent.refreshTree($('#parentId').val());
	} catch(e){
		
	}
}
function addRole(parentId){
	openwindow("Role!edit.do?parentId=" + parentId);
}
function editRole(){
	if($("input:checkbox:checked").length != 1){
		alert("请只选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			openwindow('Role!edit.do?id='+roleId);
		});
	}
	
}

function deleteRole(){
	if($("input:checkbox:checked").length != 1){
		alert("请只选中一条记录");
	}else{
		if(confirm("确定要删除吗")){
			$.each($("input:checkbox:checked") , function() {
				var roleId = $(this).val();
				// modify by liuhm 20150814 角色删除前引用校验
//				$.post('PartyStruct!roleHaveParent.ajax?childEntityId='+roleId,  function(data) {
				$.post('Role!roleRefChk.ajax?childEntityId='+roleId,  function(data) {
//				$('body').unmask();
//				doSearchRefreshParentTree();
					//	alert(data.haveParent);
//					if(data.haveParent){
					if(!data.isCanDel){
					// modify by liuhm 20150814 end
//						alert("此角色不可删除！");
						alert ( data.errMsg );
					}else{
						$.post('Role!deleteRole.ajax?roleId='+roleId,  function(data2) {
							doSearchRefreshParentTree();
						});
					}
				});
			});
			
		}
		
	}
	
}




function disable(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			$('body').mask("操作中...");
			$.post('Role!disable.do?roleId='+roleId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				doSearchRefreshParentTree();
			});
		});
	}
}


function enable(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			$('body').mask("操作中...");
			$.post('Role!enable.do?roleId='+roleId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				doSearchRefreshParentTree();
			});
		});
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


//数据授权
function grantData(){
	if($("input:checkbox:checked").length == 0){
		alert("请只选中一条记录");
	}else if($("input:checkbox:checked").length ==1){
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			openwindow('BizAuth!bizBtnList.do?systemCode=PT&roleId='+roleId);
		});
	}else if($("input:checkbox:checked").length >1){
		alert("给多种角色授权，且覆盖原有权限！");
		 var data = "";
	     $('input:checkbox:checked').each(function(i){
	      if(0==i){
	    	  data = $(this).val();
	      }else{
	    	  data += (","+$(this).val());
	      }
	     });
	     openwindow('BizAuth!rolesBizBtnList.do?systemCode=PT&roleIds='+data);
	}
	
}
// 功能授权
function grantFunc(){
	if($("input:checkbox:checked").length == 0){
		alert("请至少选中一条记录");
	}else if($("input:checkbox:checked").length ==1){
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			openwindow('FuncAuth!funcBtnList.do?systemCode=PT&roleId='+roleId);
		});
	}else if($("input:checkbox:checked").length >1){
		alert("给多种角色授权，且覆盖原有功能！");
		 var data = "";
	     $('input:checkbox:checked').each(function(i){
	      if(0==i){
	    	  data = $(this).val();
	      }else{
	    	  data += (","+$(this).val());
	      }
	     });
	     openwindow('FuncAuth!rolesFuncBtnList.do?systemCode=PT&roleIds='+data);
	}
	
}

