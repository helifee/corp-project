/**
 * 选中行
 */
function chooseThisRow( id ) {
	//先使所有的行不选中
	$.each($("input:checkbox"),function(){
		$(this).attr("checked",false);
	});
	//再使点击的行选中
	$("#" + id).attr("checked",!$("#" + id).attr("checked"));
}
/**
 * submit
 */
function doSearch() {
	 $('#frm').submit();
}
/**
 * 增加菜单
 * @param parentId 父节点id
 */
function addMenu(parentId){
	openwindow("Menu!edit.do?parentId=" + parentId);
}
/**
 * 编辑菜单
 */
function editMenu() {
	if ($("input:checkbox:checked").length != 1) {
		alert('请选中一条记录')
	} else {
		$.each($("input:checkbox:checked"),function(){
			var funcModuleId = $(this).val();
			openwindow('Menu!edit.do?id=' + funcModuleId);
		});
	}
}

/**
 * 禁用
 */
function disable(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var menuId = $(this).val();
			$('body').mask("操作中...");
			$.post('Menu!disable.do?menuId='+menuId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				doSearchRefreshParentTree();
			});
		});
	}
}

/**
 * 启用
 */

function enable(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var menuId = $(this).val();
			$('body').mask("操作中...");
			$.post('Menu!enable.do?menuId='+menuId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				doSearchRefreshParentTree();
			});
		});
	}
}
function doSearchRefreshParentTree() {
	this.refreshParentTree();
	window.location.reload();
}

function refreshParentTree() {
	try {
		window.parent.refreshTree($('#parentId').val());
	} catch(e){
		
	}
}


function maintButton(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var moduleId = $(this).val();
			openwindow('FuncButton!list.do?funcModuleId='+moduleId);
		});
	}
	
}
