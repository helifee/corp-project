var rowData;//当前选中数据
var rowDataBefore;
$(function() {
	pageInit();
	 $.xljUtils.resizeNestedGrid();
});
function pageInit() {
	getFinanceSystemList();
	$("#saveBtn").on('click', function() {
		$("#financeForm").submit();
	});
	$("#sysName").change(function(){
		var sysName = $("#sysName").val();
		$('#systemGrid').jqGrid("setGridParam",{postData:{sysName:sysName},page:1}).trigger("reloadGrid");
	});
}
/**
 * @auther liuf
 * @discution grid show
 */
function getFinanceSystemList() {
	var sysName = $("#sysName").val();
	jQuery("#systemGrid").jqGrid(
			{
				url : hostUrl + 'finance/sysBizItem/getSysBizItempage',
				ajaxGridOptions : {
					contentType : 'application/json'
				},
				mtype : "POST",
				contentType : "application/json",
				datatype : "json",
				postData : {
					sysName : sysName
				},
				autowidth : true,
				rownumbers : true,
				jsonReader : {
					repeatitems : false
				},
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				{
					name : 'id',
					label : 'id',
					hidden : true,
					align : "center"
				}, {
					name : 'appCode',
					label : '所属系统',
					align : "center",
					formatter : function(appCode) {
						if (appCode == "SA") {
							return "销售系统";
						} else if (appCode == "CO") {
							return "成本系统";
						} else if (appCode == "EX") {
							return "费用系统";
						}
					}
				}, {
					name : 'name',
					label : '名称',
					align : "center"
				}, {
					name : 'code',
					label : '编码',
					align : "center"
				}, {
					name : 'url',
					label : '接口地址',
					align : "center"
				}, {
					name : 'method',
					label : '调用方法',
					align : "center"
				} ],
				rowNum : 20,//一页显示多少条
				rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
				pager : '#systemGridPage',//表格页脚的占位符(一般是div)的id
				onCellSelect : function() {
					if (rowDataBefore != null && rowDataBefore != 'undefined') {
						//重新选择行时清除上一次选中行的样式
						$('#systemGrid' + '#' + rowDataBefore.id).find("td")
								.removeClass("ui-state-highlight");
					}
				},
				onSelectRow : function() {
					var rowId = $('#systemGrid').jqGrid("getGridParam",
							"selrow");
					rowData = $('#systemGrid').jqGrid('getRowData', rowId);
				},
				viewrecords : true,
				loadError : function(jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
				},
				gridComplete : function() {
					$.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
					rowDataBefore = rowData;
					if (rowDataBefore != null && rowDataBefore != 'undefined') {
						//添加回显选中行样式
						$('#systemGrid').setSelection(rowDataBefore.id, true);
						$('#systemGrid' + '#' + rowDataBefore.id).find("td")
								.addClass("ui-state-highlight");
					}
				}

			});
}
function getuuid() {

	$.ajax({
		beforeSend : function() {
			var guuid = "";
		},
		type : 'get',
		async : false,
		url : hostUrl + 'generator/getGuuid?time=' + Math.random(),
		success : function(data) {
			if (data.success) {
				guuid = data.result;

			} else {
				pop_tip_open("red", data.msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
		},
		complete : function() {
			return guuid;
		}
	});
	return guuid;
}
function addFinanceSystem() {
	var sysName=$("#sysName").val();
	window.open("sysBizItem_edit.html?type=add&sysName="+sysName);
}
function editFinanceSystem() {
	var sysName=$("#sysName").val();
	var id = $('#systemGrid').jqGrid('getGridParam', 'selrow');
	if (!id) {
		pop_tip_open("blue", "请选择要编辑的行！");
		return;
	}
	window.open("sysBizItem_edit.html?type=edit&id="+id+"&sysName="+sysName);

}
function delFinanceSystem() {
	var id = $('#systemGrid').jqGrid('getGridParam', 'selrow');
	if (!id) {
		pop_tip_open("blue", "请选择要删除的行！");
		return;
	}
	var prvid=$("#"+id).prev().attr("id");
	pop_text_open("blue", '确认要删除这条数据吗？', function() {
		$.ajax({
			url : hostUrl + "finance/sysBizItem/deletePseudo/" + id,
			type : 'DELETE',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData && resultData.success) {
					rowData={id:prvid};
					$('#systemGrid').jqGrid().trigger("reloadGrid");
					pop_tip_open("green", "删除成功！");
				} else {
					pop_tip_open("red", resultData.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
	}, function() {
		return;
	});
}
function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowData={id:id};
	 $('#systemGrid').jqGrid().trigger("reloadGrid");
}