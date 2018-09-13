var query = function() {
	var fiSysId = $("#fiSysId").val();
	$('#gridCorp').datagrid('options').queryParams = {
		keyword : fiSysId
	};

	$('#gridCorp').datagrid("reload");
};

var global={};
//账套Id
global.accountSetId='';

var accountSetId;
var accountSetCode;
var company_code;
var company_name;
var companyId;

$(function(){
	$('#gridCorp').datagrid({
		//height:$(window).height()-80,
		onClickRow:function(index,data){
		    //获取选中的一行数据并获取账套ID
			//var row=$('#gridCorp').datagrid('getSelected');
			accountSetId = data.id;
			accountSetCode = data.code;
			company_code = data.companyCode;
			company_name = data.companyName;
			companyId = data.companyId;
		
			//alert(company_id);
			//给科目管理和辅助核算的账套赋值

			//var tab = $('#tt').tabs('getSelected');
			//var index = $('#tt').tabs('getTabIndex',tab);
//			//if(index == 0){
//				$("#fd").attr("src","FiAccountSetData!list.do?setId="+accountSetId);
//			//}else if(index == 1){
//				$("#fs").attr("src","FiAccountSubject!list.do?accountSetId="+accountSetId);
//			//}else if(index == 2){
//				$("#fb").attr("src","FiBudgetCap!list.do?accountSetId="+accountSetId);
//			//}else if(index == 3){
//				$("#fm").attr("src","FiAssMapping!list.do?accountSetId="+accountSetId+"&companyId="+companyId);
//			//}else{
//				$("#ft").attr("src","FiVoucherTempType!list.do?accountSetId="+accountSetId);
//				
//			//}
			
			$(".tabs-scroller-right").css("z-index","1");
		}
	})
});




function tabOnSelect(title,index){
	var rh = $("#center").height();
	if(title == '公司对照'){
		//alert(h);
		$("#h1").height(rh-35);
    	$("#t1").height(rh-35);
    }

    if(title == '会计科目同步'){
    	$("#h2").height(rh-35);
    	$("#t2").height(rh-35);
    }
	if(title == '辅助核算对照'){
		$("#h3").height(rh-35);
		$("#t3").height(rh-35);
	}
	if(title == '凭证模板设置'){
		$("#h4").height(rh-35);
		$("#t4").height(rh-35);
	}
	
	if(title == '预算科目对照'){
		$("#h5").height(rh-35);
		$("#t5").height(rh-35);
	}
	if(title == '现金流量项目'){
		$("#h6").height(rh-35);
		$("#t6").height(rh-35);
	}
	if(title == '银行科目对照'){
		$("#h7").height(rh-35);
		$("#t7").height(rh-35);
	}
	if(title == '代收类型科目对照'){
		$("#h8").height(rh-35);
		$("#t8").height(rh-35);
	}
	if(title == '成本控制科目对照'){
		$("#h9").height(rh-35);
		$("#t9").height(rh-35);
	}
	if(title == '成本款项类型对照'){
		$("#h10").height(rh-35);
		$("#t10").height(rh-35);
	}
	if(title == '成本控制科目对照(投入)'){
		$("#h11").height(rh-35);
		$("#t11").height(rh-35);
	}
	var ownerSys=$('#ownerSys').combobox('getValue');
	if(ownerSys == '销售系统'){
		ownerSys = 1;
	}
	if(ownerSys !=1 && index == 6){
		index = 0;
	}
	
	var tab = $('#tt').tabs('getTab',index); 
	var url = tab.attr("url");
	var frameId = tab.attr("frameId");

    url += accountSetId+"&accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&companyCode="+company_code;
	$("#"+frameId).attr("src",url);
	$(".tabs-scroller-right").css("z-index","1");
}


//新增财务公司信息
function newAccountset(id){
	$('#frm2').form("reset");
	var fiSysId = $("#fiSysId").val();
	$("#sys_id").val(fiSysId);
	

		if (id) {
		$.post("FiAccountSet!getFiSysinfoById.do?id=" + id, {}, function(data) {
			$("#frm2").form("load", {
				"fiAccountSet.name" : data.name,
				"fiAccountSet.code" : data.code,
				"fiAccountSet.companyName" : data.companyName,
				"fiAccountSet.companyCode" : data.companyCode,
				"fiAccountSet.id" : data.id
			});
		});
	} else {
		{
			if (accountSetId != '') {
				// alert(company_name);
				$('#cn').val(company_name);
				$('#asId').val(accountSetId);
				$('#cCode').val(company_code);
				$('#accountsetid').val("");
			} else {
				alert('请选择一个公司');
				return;
			}

		}
	}
	
	$("#editDialog").dialog("open");
}



//新增财务公司信息
function save(){
	$('#frm2').form("submit",{
		url:"FiAccountSet!saveFiAccountSet.do",
		ajax:true,
		//提交前验证
		onSubmit:function(){
            //提交显示提示信息
			$.messager.progress({
				title:"提示",
				text:"数据处理中，请稍后...."
			});	
                        //校验表单
			var isValid = $(this).form("validate");
			if (!isValid) {//校验不通过关提示信息
				$.messager.progress("close");
			}
			return isValid;
		},		
		success:function(data){
			$.messager.progress("close");//关闭在提交表单前显示的提示信息
	    	data = $.parseJSON(data);
	        if(data.success){
	        	$("#editDialog").dialog("close");
	        	$('#gridCorp').datagrid("reload");
	        }else{
	        	alert(data.msg);
	        }
	    }
	});	
}



var newCorp = function(id) {
	if (id == null) {
		
		if (accountSetId != '') {
			//alert(company_name);
			$('#cn').val(company_name);
			$('#asId').val(accountSetId);
			//alert($('#asId').val());
			$('#cCode').val(company_code);
		} else {
			alert('请选择一个公司');
			return;
		}

	}
	
	$('#frm3').form("reset");

	if(id){
		$.post("FiAccountSetData!getFiAccountSetDataById?id="+id,{},function(data){
			$("#frm3").form("load",{
				"fiAccountSetData.companyName":data.companyName,
				"fiAccountSetData.projectName":data.projectName,
				"fiAccountSetData.projectCode":data.projectCode,
				"fiAccountSet.companyCode":data.companyCode,
				"fiAccountSet.id":data.id,
				"fiAccountSetData.paymentOrganName":data.paymentOrganName,
				"fiAccountSetData.paymentOrganCode":data.paymentOrganCode,
				"fiAccountSetData.sysId":data.sysId,
			});
		});
	}

	$('#editDialog3').dialog('open');

};

//公司对照
function saveCrop(){
	$('#frm3').form("submit",{
		url:"FiAccountSetData!saveFiAccountSetData.do",
		ajax:true,
		//提交前验证
		onSubmit:function(){
            //提交显示提示信息
			$.messager.progress({
				title:"提示",
				text:"数据处理中，请稍后...."
			});	
                        //校验表单
			var isValid = $(this).form("validate");
			if (!isValid) {//校验不通过关提示信息
				$.messager.progress("close");
			}
			return isValid;
		},		
		success:function(data){
			$.messager.progress("close");//关闭在提交表单前显示的提示信息
	    	data = $.parseJSON(data);
	        if(data.success){
	        	$("#editDialog3").dialog("close");
	        	$('#gridCorpMapp').datagrid("reload");
	        }else{
	        	alert(data.msg);
	        }
	    }
	});	
}

var unable = function() {
	var id = getGridCheckBoxValues("id");
	if (!id) {
		alert("请选择一条记录进行操作！");
		return;
	}
	if (window.confirm("确认要禁止吗？")) {
		$('body').mask("禁止中...");
		$.ajax({
			type : "POST",
			url : "CorpMapping!unable.do",
			data : {
				id : id
			},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert("禁止成功！");
					query();
				} else {
					alert("禁止失败！");
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("执行失败！");
			}
		});
	}
};

var enable = function() {
	var id = getGridCheckBoxValues("id");
	if (!id) {
		alert("请选择一条记录进行操作！");
		return;
	}
	if (window.confirm("确认要启动吗？")) {
		$('body').mask("启动中...");
		$.ajax({
			type : "POST",
			url : "CorpMapping!enable.do",
			data : {
				id : id
			},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert("启动成功！");
					query(0);
				} else {
					alert("启动失败！");
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("启动失败！");
			}
		});
	}
};

//删除财务系统公司信息
var deleteAccountSet = function() {
	var id = getGridCheckBoxValues("id");
	if (!id) {
		alert("请选择一条记录进行操作！");
		return;
	}
	if (window.confirm("确认要删除吗？")) {
		$('body').mask("删除中...");
		$.ajax({
			type : "POST",
			url : "FiAccountSet!deleteFiAccountSet.do",
			data : {
				id : id
			},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert("删除成功！");
					query(0);
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
};

var del = function() {
	var id = getGridCheckBoxValues("id");
	if (!id) {
		alert("请选择一条记录进行操作！");
		return;
	}
	if (window.confirm("确认要删除吗？")) {
		$('body').mask("删除中...");
		$.ajax({
			type : "POST",
			url : "CorpMapping!delete.do",
			data : {
				id : id
			},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert("删除成功！");
					query(0);
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
};

function AutoCheckAll(ele) {
	var check = document.getElementsByName("id");
	if (ele.checked) {
		for (i = 0; i < check.length; i++) {
			check[i].checked = true;
		}
	} else {
		for (i = 0; i < check.length; i++) {
			check[i].checked = false;
		}
	}

}

var fiSysInfoWindow;
$(function() {
	var gridheight = $(window).height()-20;
	$('#gridCorp').datagrid({
		height:gridheight,
		url : 'FiAccountSet!getByFiSysId.do',
		toolbar : '#aa',
		columns : [ [ 
		{
		    field : 'ck',
		    checkbox:true
		},
		{
			field : 'code',
			title : '账套编码',
			width : 30,
			align : 'center'

		},{
			field : 'name',
			title : '账套名称',
			width : 30,
			align : 'center'

		}, {
			field : 'companyCode',
			title : '公司编码',
			width : 80,
			align : 'center',
		}, {
			field : 'companyName',
			title : '公司名称',
			width : 160,
			align : 'left'
		},
        {
            field: 'id',
            title: '操作',
            width: 50,
            formatter : function(v,r){
            	return '<a href="javascript:void(0);" onclick="newAccountset(\''+v+'\')">编辑</a>';
            }
        }
		
		] ],
		onLoadSuccess:function(data){
			$('#gridCorp').datagrid("selectRow", 0);
			var row = $('#gridCorp').datagrid('getSelected');
			accountSetId = row.id;
			accountSetCode = row.code;
			var ownerSys=$('#ownerSys').combobox('getValue');
			if(ownerSys == '销售系统'){
				ownerSys = 1;
			}
			$("#t1").attr("src","FiAccountSetData!list.do?accountSetId="+accountSetId+"&sysId="+ownerSys);
		},
		onSelect:function(index, row){
			accountSetId = row.id;
			accountSetCode = row.code;
			company_code = row.companyCode;
			company_name = row.companyName;
			var ownerSys=$('#ownerSys').combobox('getValue');
			if(ownerSys == '销售系统'){
				ownerSys = 1;
			}
			//给科目管理和辅助核算的账套赋值
			var tab = $('#tt').tabs('getSelected');
			var index = $('#tt').tabs('getTabIndex',tab);
			if(ownerSys != 1){
				for (var i = 0; i < spanEl.length; i++) {
			    	if(spanEl[i].innerHTML == '代收类型科目对照'){
			    		$(spanEl[i].parentNode).hide();
			    	}
			    } 
				if(index == 6){
	    			index = 0;
	    		}
			}else{
				for (var i = 0; i < spanEl.length; i++) {
			    	if(spanEl[i].innerHTML == '代收类型科目对照'){
			    		$(spanEl[i].parentNode).show();
			    	}
			    }  
			}
			if(ownerSys != 2){
				for (var i = 0; i < spanEl.length; i++) {
			    	if(spanEl[i].innerHTML == '成本控制科目对照' || spanEl[i].innerHTML == '成本款项类型对照' || spanEl[i].innerHTML == '成本控制科目对照(投入)'){
			    		$(spanEl[i].parentNode).hide();
			    	}
			    } 
				if(index == 7 || index == 8 || index == 9){
	    			index = 0;
	    		}
			}else{
				for (var i = 0; i < spanEl.length; i++) {
			    	if(spanEl[i].innerHTML == '成本控制科目对照' || spanEl[i].innerHTML == '成本款项类型对照' || spanEl[i].innerHTML == '成本控制科目对照(投入)'){
			    		$(spanEl[i].parentNode).show();
			    	}
			    }  
			}
			if(ownerSys ==3){
                for (var i = 0; i < spanEl.length; i++) {
                    if(spanEl[i].innerHTML == '银行科目对照'){
                        $(spanEl[i].parentNode).hide();
                    }
                } 
                if(index == 5){
                    index = 0;
                }
            }else{
                for (var i = 0; i < spanEl.length; i++) {
                    if(spanEl[i].innerHTML == '银行科目对照'){
                        $(spanEl[i].parentNode).show();
                    }
                }  
            }
			
            if(index == 0){
            	$("#t1").attr("src","FiAccountSetData!list.do?accountSetId="+accountSetId+"&sysId="+ownerSys);
            }
            if(index == 1){
            	$("#t2").attr("src","FiAccountSubject!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
            if(index == 2){
            	$("#t6").attr("src","FiCashFlowCase!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
            if(index == 3){
            	$("#t5").attr("src","FiBudgetCap!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
            if(index == 4){
            	$("#t3").attr("src","FiAssMapping!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
            if(index == 10){
            	$("#t4").attr("src","FiVoucherTempType!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
            if(index == 5){
            	$("#t7").attr("src","FiBankCap!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
            if(index == 6){
            	$("#t8").attr("src","FiCollectionTypeCap!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
            if(index == 7){
            	$("#t9").attr("src","FiCoCap!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
            if(index == 8){
                $("#t11").attr("src","FiCoCapInput!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
            if(index == 9){
            	$("#t10").attr("src","FiPaymentType!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
            }
//			$("#fd").attr("src","FiAccountSetData!list.do?setId="+accountSetId);
//			$("#fs").attr("src","FiAccountSubject!list.do?accountSetId="+accountSetId);
//			$("#fm").attr("src","FiAssMapping!list.do?accountSetId="+accountSetId);
//			$("#ft").attr("src","FiVoucherTempType!list.do?accountSetId="+accountSetId)
		},
		//fit : true,
		border : false,
		pagination : true,
		singleSelect : true,
		rownumber : true
	});

	var p = $('#gridCorp').datagrid('getPager');
	$(p).pagination({
		beforePageText : '第',
		afterPageText : '共{pages}页',
		displayMsg : '显示{from}到{to},共{total}记录'
	});
	$(".tabs-scroller-right").css("z-index","1");
})


function getGridCheckBoxValues() {

	var rows = $('#gridCorp').datagrid('getSelections');
	var cpList = [];
	if (rows != null && rows) {
		for ( var jj = 0, length = rows.length; jj < length; jj++) {

			cpList.push(rows[jj].id);

		}
	}

	var val_string = "";
	if (cpList.length > 0)
		val_string = cpList.join(";");

	return val_string;
}

function loadGrid() {
	var param = {};
	var node = $('#tree').tree('getSelected');
	if (node && node != 'null') {
		param.targsyscorpid = node.id;
	}
	param.fisysinfoid = $('#fisysinfoid').val();
	$('#gridCorp').datagrid('options').queryParams = param;

	if (!$('#gridCorp').datagrid('options').url) {
		$('#gridCorp').datagrid('options').url = contextPath
				+ '/CorpMapping!loadlist.do';
	}

	$('#gridCorp').datagrid('reload');
}

function closeDialog(dialogId) {
	$('#' + dialogId).dialog('close');
}

function selectFormatter(value, data) {
	var str = new Array();
	var values = (value + "").split(',');
	for ( var i = 0, length = data.length; i < length; i++) {
		for ( var j = 0, length1 = values.length; j < length; j++) {
			if (values[j] + "" == data[i].key + "") {
				str.push(data[i].value + "");
			}
		}

	}

	return str.join(',');
}

/**
 * 导出
 */
function exportAccountSet(){
	var ownerSys=$('#ownerSys').combobox('getValue');
	if(ownerSys == '销售系统'){
		ownerSys = 1;
	}
	window.location.href="CorpMapping!exportPr.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId;
}

function importAccountSet(){
	$("#importDialog").dialog("open");
}
function updateload() {
	var file = $("#uploadfile");
	if(file.val()==""){
       alert("择您要上传的文件!")
       theform.theFile.focus;
       return (false);
    }else{
       str= file.val();
       strs=str.toLowerCase();
       lens=strs.length;
       extname=strs.substring(lens-4,lens);
       if(extname!=".xls"){
         alert("请选择excel文件！")
         return (false);
       }
    }
	var ownerSys=$('#ownerSys').combobox('getValue');
	if(ownerSys == '销售系统'){
		ownerSys = 1;
	}
	
    $('#importfrm').form("submit",{
		url:"CorpMapping!importPr.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code,
		
		ajax:true,
		type : "POST",
		//提交前验证
		onSubmit:function(){
            //提交显示提示信息
			$.messager.progress({
				title:"提示",
				text:"数据处理中，请稍后...."
			});	
                        //校验表单
			var isValid = $(this).form("validate");
			if (!isValid) {//校验不通过关提示信息
				$.messager.progress("close");
			}
			return isValid;
		},		
		success:function(data){
			$.messager.progress("close");//关闭在提交表单前显示的提示信息
			$("#importDialog").dialog("close");
		    file.after(file.clone().val(""));
		    file.remove();
	    }
	});	
}
/*
function save(){
	$('#importfrm').form("submit",{
		url:"CorpMapping!importPr.do",
		ajax:true,
		//提交前验证
		onSubmit:function(){
            //提交显示提示信息
			$.messager.progress({
				title:"提示",
				text:"数据处理中，请稍后...."
			});	
                        //校验表单
			var isValid = $(this).form("validate");
			if (!isValid) {//校验不通过关提示信息
				$.messager.progress("close");
			}
			return isValid;
		},		
		success:function(data){
			$.messager.progress("close");//关闭在提交表单前显示的提示信息
	    	data = $.parseJSON(data);
	        if(data.success){
	        	$("#importDialog").dialog("close");
	        }else{
	        	alert(data.msg);
	        }
	    }
	});	
}
*/