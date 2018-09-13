var rowData;//当前选中数据
var rowDataBefore;
$(function() {
	pageInit();
	   $.xljUtils.resizeNestedGrid();
	$("#sysName").keypress(function(e) {
		var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if (eCode == 13) {
			searchData();
		}
	})
});
function pageInit() {
	getFinanceSystemList();
}
/**
 * @auther liuf
 * @discution grid show
 */
function getFinanceSystemList() {
	 jQuery("#systemGrid").jqGrid(
	            {
	                url: hostUrl+'finance/sysRegister/getSystemRegisterpage',
	                ajaxGridOptions: { contentType: 'application/json' },
	                mtype : "POST",  
	                contentType : "application/json",  
	                datatype : "json", 
	                autowidth:true,
	                rownumbers:true,
	                postData:{sysName : "",
							  status : ""},
	                jsonReader : {
	                           repeatitems: false
	                },
	                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
	                             {
	             					name : 'id',
	             					label : 'id',
	             					hidden : true,
	             					align : "center"
	             				}, {
	             					name : 'fiSysCode',
	             					label : '财务系统标识',
	             					align : "center"
	             				}, {
	             					name : 'fiSysName',
	             					label : '财务系统名称',
	             					align : "center",cellattr: addCellAttr
	             				}, {
	             					name : 'type',
	             					label : '业务类型',
	             					align : "center",
	             					formatter : function(type) {
	             						if (type == "-1") {
	             							return "webService";
	             						} else {
	             							return "";
	             						}
	             					}
	             				}, {
	             					name : 'sender',
	             					label : '发送方',
	             					align : "center"
	             				}, {
	             					name : 'status',
	             					label : '状态',
	             					align : "center",
	             					formatter : function(status) {
	             						if (status == "0") {
	             							return "禁用";
	             						} else if (status == "1") {
	             							return "启用";
	             						}
	             					},cellattr: addCellAttr
	             				}, {
	             					name : 'webUrl',
	             					label : '财务系统webService地址',
	             					align : "center"
	             				}
	                ],
	                rowNum : 20,//一页显示多少条
	                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
	                pager : '#systemGridPage',//表格页脚的占位符(一般是div)的id
	                ondblClickRow:function(rowid){
	                	editFinanceSystem();
	                },
	                onCellSelect: function(){
	                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
	                		//重新选择行时清除上一次选中行的样式
	                		$('#systemGrid'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
	                	}
	                },
	                onSelectRow: function () {
	                	var rowId=$('#systemGrid').jqGrid("getGridParam","selrow");
	        		      rowData = $('#systemGrid').jqGrid('getRowData',rowId);
	                },
	                viewrecords : true,
	                loadError:function(jqXHR, textStatus, errorThrown){
	             	   $.xljUtils.getError(jqXHR.status);
	                },
	                gridComplete:function(){
	                	 $.xljUtils.addGridScroll();
						$.xljUtils.gridResizeFn();
						rowDataBefore = rowData;
	                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
	                    	//添加回显选中行样式
	                    	$('#systemGrid').setSelection(rowDataBefore.id,true);
	                    	$('#systemGrid'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
	                    }
	                 }
	            });
}
function searchData() {
	var status = $("#status").val();
	var sysName = $("#sysName").val();
	jQuery("#systemGrid").jqGrid("setGridParam", {
		postData : {
			status : status,
			sysName : sysName
		},
		page:1
	}).trigger("reloadGrid");
	getFinanceSystemList();
}

function editFinanceSystem() {
	var id = $('#systemGrid').jqGrid('getGridParam', 'selrow');
	if (!id) {
		pop_tip_open("blue", "请选择要编辑的行！");
		return;
	}
	window.open("financesystem_edit.html?type=edit&id="+id);
	}
function addFinanceSystem() {
	window.open("financesystem_edit.html?type=add");
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
			url : hostUrl + "finance/sysRegister/deletePseudo/" + id,
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

function updateStatus(e) {
	var id = $('#systemGrid').jqGrid('getGridParam', 'selrow');
	if (!id) {
		pop_tip_open("blue", "请选择要修改状态的行");
		return;
	}
	var rowData = $("#systemGrid").jqGrid("getRowData", id);
	var dataStatus = "";
	if (rowData.status == "启用") {
		dataStatus = 1;
	} else if (rowData.status == "禁用") {
		dataStatus = 0;
	}
	if (e == dataStatus) {
		return;
	} else {
		$.ajax({
			url : hostUrl + "finance/sysRegister/updateStatus/" + id,
			type : 'PUT',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData && resultData.success) {
					pop_tip_open("green", "修改状态成功！");
					$('#systemGrid').jqGrid().trigger("reloadGrid");
				} else {
					pop_tip_open("red", resultData.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
	}
}

function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}

function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowData={id:id};
	 $('#systemGrid').jqGrid().trigger("reloadGrid");
}