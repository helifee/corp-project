var currentCompanyId;//当前选中的公司id
var currrecord;//当前选中的公司
$(function(){
	var h = $("#center").height();
	$(".tab_").height(h-35);
	
	
	initCompanyComboBox();
	initFiSysCombobox();
});


/**
 * 初始化公司选择下拉框
 */
function initCompanyComboBox(){
	$("#company").combobox({
		valueField: "id",
		textField: "name",
		data:companyList,
		onSelect:function(record){
			currentCompanyId = record.id; 
			currrecord = record;
			initDatagird();
		}
	});
}

/**
 * 初始化财务系统下拉框
 */
function initFiSysCombobox(){
	$("#fisys").combobox({
		valueField:'id',    
		textField:'fiSysName' ,
		data:fisysList
	});
}

/**
 * 初始化账套表格
 */
function initDatagird(){
	$("#zt").datagrid({
		url:"FiAccountSet!findFiAccountSet.do?companyId="+currentCompanyId,
		onSelect:function(rowIndex, rowData){
			var tab = $('#tt').tabs('getSelected'); 
			var index = $('#tt').tabs('getTabIndex',tab);
			tabOnSelect("",index);
		}
	});
}


/**
 * 新增账套对话框
 */
function editDialog(isEdit){
	if(!currrecord){
		$.messager.alert("提示","请先选择公司!","warning");
		return;
	}
	$("#fm").find("input").val("");
	initFiSysCombobox();
	if(isEdit==1){
		var row = $("#zt").datagrid("getSelected");
		if(!row){
			return;
		}
		$.post("FiAccountSet!getFiSysinfoById.do",{id:row.id},function(data){
			$("#fm").form("load",data);
		});
	}
	$("#editDialog").dialog("open");
}

/**
 * 删除账套
 */
function del(){
	/*if(window.confirm("确认要删除吗？")) {
		var row = $("#zt").datagrid("getSelected");
		if(!row){
			return;
		}
		 $('body').mask("禁止中...");
		$.ajax({
			type : "POST",
			url : "FiAccountSet!deleteFiAccountSet.do",
			data : {id:row.id},
			dataType : "json",
			success : function(res, textStatus, jqXHR) {
				$('body').unmask();
				if (res.success) {
				} else {
					alert("删除失败");
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("执行失败！");
			}
		});
	 }*/
	var row = $("#zt").datagrid("getSelected");
	if(!row){
		return;
	}
	$.messager.confirm("警告","确认要删除吗？",function(r){
	    if (r){
			 $('body').mask("禁止中...");
			$.ajax({
				type : "POST",
				url : "FiAccountSet!deleteFiAccountSet.do",
				data : {id:row.id},
				dataType : "json",
				success : function(res, textStatus, jqXHR) {
					$('body').unmask();
					if (res.success) {
						initDatagird();
					} else {
						alert("删除失败");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("执行失败！");
				}
			});
	    }
	});	
}

/**
 * 保存账套
 */
function save(){
	$("#companyName").val(currrecord.name);
	$("#companyCode").val(currrecord.code);
	$("#companyId").val(currrecord.id);
	$("#fm").form("submit",{
		url: "FiAccountSet!saveFiAccountSet.do",
		//提交成功
		success:function(result){
			result = $.parseJSON(result);//将返回的json字符串转换成json对象
			if(result.success){//操作成功
				$("#editDialog").dialog("close");		
                //重新加载表格数据
				initDatagird();					
			}else{//保存失败
				$.messager.alert("错误","保存数据时出现系统错误!","error");
			}
		}
	});
}

/**
 * 当标签被选中
 * @param title
 * @param index
 */
function tabOnSelect(title,index){
	var tab = $('#tt').tabs('getTab',index); 
	var url = tab.attr("url");
	var frameId = tab.attr("frameId");
	var row = $("#zt").datagrid("getSelected");
	if(!row){
		return;
	}   
	url+=row.id;//账套id
	$("#"+frameId).attr("src",url);
}

/**
 * 当标签取消选中
 * @param title
 * @param index
 */
function tabOnUnselect(title,index){
	var tab = $('#tt').tabs('getTab',index); 
	var url = tab.attr("url");
	var frameId = tab.attr("frameId");
	$("#"+frameId).attr("src","");
}

