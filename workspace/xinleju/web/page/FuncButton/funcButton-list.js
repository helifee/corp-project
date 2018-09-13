

/**
 * submit
 */
function doSearch() {
	 $('#frm').submit();
}
/**
 * 增加功能按钮
 */
function addFuncButton(funcModuleId) {
	openwindow("FuncButton!edit.do?funcModuleId=" + funcModuleId);
}
/**
 * 编辑功能按钮
 */
function editFuncButton() {
	if ($("input:checkbox:checked").length != 1) {
		alert('请选中一条记录')
	} else {
		$.each($("input:checkbox:checked"),function(){
			var funcButtonId = $(this).val();
			openwindow('FuncButton!edit.do?id=' + funcButtonId);
		});
	}
}
/**
 * 删除功能按钮
 */
function deleteFuncButton() {
	if(confirm("您确定删除吗?")){
		if($("input:checkbox:checked").length==0){
			alert("请先选中一条记录");
		}else{
			var id = $("input:checkbox:checked").val();
			$('body').mask("删除中...");
			 $.ajax({
					type : "POST",
					url : "FuncButton!delete.do",
					data : {funcButtonId:id},
					dataType : "json",
					success : function(data, textStatus, jqXHR) {
						$('body').unmask();
						if (data && data.success) {
							alert("删除成功！");
							queryFrm();
						} else {
							alert("删除失败！");
						}
					},
					error : function(jqXHR, textStatus, errorThrown) {
						$('body').unmask();
						alert("删除失败！");
					}
				});
		}
	}
}

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

