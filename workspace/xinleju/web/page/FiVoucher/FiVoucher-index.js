var currentCompanyId = "";//当前选中的公司id
var currrecord;//当前选中的公司
var accountSetId="";
var accountSetCode="";
var sysId = "1";
var typeId = "";
var companyId = "";
var beginDate = "";
var endDate = "";
function setStandardRole(node){
	typeId = node;
	
}

function setCompanyId(node){
	companyId = node;
}

function setBeginDate(node){
	beginDate = node;
}

function setEndDate(node){
	endDate = node;
}

$(function(){
	
	
	//设置右侧标签页的高度
	var h = $("#center").height();
	$(".tab_").height(h-35);
	
	//initCompanyComboBox();
	
	$('#grid').datagrid({
		url : 'FiAccountSet!getByFiSysIdBill.do?sysId='+sysId,
		singleSelect:true,
		toolbar : '#aa',
		columns : [ [ 
		/*{
		    field : 'ck',
		    checkbox:true
		},*/
		{
			field : 'code',
			title : '账套编码',
			width : 40,
			align : 'center'

		}, {
			field : 'companyCode',
			title : '公司编码',
			width : 120,
			align : 'center',
		}, {
			field : 'companyName',
			title : '公司名称',
			width : 150,
			align : 'center'
		}
		] ],
		onLoadSuccess:function(data){
			$('#grid').datagrid("selectRow", 0);
			var row = $('#grid').datagrid("getSelected");
			currentCompanyId =  row.companyCode;
			accountSetId = row.id;
			accountSetCode = row.code;
			var tab = $('#tt').tabs('getSelected'); 
			var index = $('#tt').tabs('getTabIndex',tab);
			tabOnSelect("",index);
		},
		onClickRow:function(index,data){
			accountSetId = data.id;
			accountSetCode = data.code;
			currentCompanyId = data.companyCode;
			currrecord = data.companyName;
			
			var tab = $('#tt').tabs('getSelected'); 
			var index = $('#tt').tabs('getTabIndex',tab);
			tabOnSelect("",index);
		},
		fit : true,
		border : false,
		pagination : true,
		rownumber : true
//		onSelect:function(rowIndex, rowData){
//			var tab = $('#tt').tabs('getSelected'); 
//			var index = $('#tt').tabs('getTabIndex',tab);
//			tabOnSelect("",index);
//		}
	
	});

	var p = $('#grid').datagrid('getPager');
	$(p).pagination({
		beforePageText : '第',
		afterPageText : '共{pages}页',
		displayMsg : '显示{from}到{to},共{total}记录'
	});
	
	
	
});

var query = function() {
	
	var fiSysId = $("#fiSysId").val();
	$('#grid').datagrid('options').queryParams = {
		keyword : fiSysId
	};
	$('#grid').datagrid("reload");
};


/**
 * 初始化公司选择下拉框
 */
/*function initCompanyComboBox(){
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
}*/


function tabOnSelect(title,index){
	
	var tab = $('#tt').tabs('getTab',index); 
	var url = tab.attr("url");
	var frameId = tab.attr("frameId");
	url += currentCompanyId+'&accountSetId='+accountSetId+"&accountSetCode="+accountSetCode+"&sysId="+sysId;
	$("#"+frameId).attr("src",url);	
}


