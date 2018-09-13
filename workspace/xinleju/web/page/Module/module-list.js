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
 * 查询
 * @returns
 */
var query = function(start) {
	if (start && start >= 0) {
		document.getElementsByName('start')[0].value = start;
	}
	$('body').mask("数据查询中...");
	$("#frm").submit();
};
/**
 * 新增模块
 * @returns
 */
var newModule = function() {
	var dt = new Date();
	window.open('Module!edit.do', 'flow_' + dt.getTime(),isNotEmpty(opts) ? opts.replace("scrollbars=no", "scrollbars=yes") : "");
};
/**
 * 更新模块状态
 * @returns
 */
var updateModule = function(status) {
	
};
/**
 * 编辑模块
 * @returns
 */
var editModule = function() {
	var dt = new Date();
	var ids = getCheckBoxValues("ids");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return false;
	} else if (ids.indexOf(';') > 0){
		alert("请选择一条记录进行操作！");
		return false;
	} else {
		window.open('Module!edit.do?id=' + ids, 'flow_' + dt.getTime(),isNotEmpty(opts) ?  opts.replace("scrollbars=no", "scrollbars=yes") : "");
	}
};



/**
 * 禁用
 */
function disable(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var moduleId = $(this).val();
			$('body').mask("操作中...");
			$.post('Module!disable.do?moduleId='+moduleId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				window.location.reload();
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
			var moduleId = $(this).val();
			$('body').mask("操作中...");
			$.post('Module!enable.do?moduleId='+moduleId, $('#frm').serialize(), function(data) {
				window.location.reload();
				$('body').unmask();
			});
		});
	}
}
