/**
 * 全局变量区
 */
var global={};
//账套Id
global.accountSetId="";
global.accountSetCode="";
global.saveOrUpdateUrl="";
global.sysId="";

$(function(){
  
  $('#grid').treegrid({
	  singleSelect : true,
	  idField:'id',  
	  treeField:'subcode',
	  fit:true,
      columns : [[
				  {
					  width:150,
					  field : 'id',
					  hidden: true
				  },
                  {
	        		  width:150,
		        	  field : 'subcode',
		        	  title : '预算科目编码'
	        	  },
	        	  {
	        		  width:120,
		        	  field : 'subname',
		        	  title : '预算科目名称'
	        	  },
	        	  {
	        		  width:100,
		        	  field : 'accountcode',
		        	  title : '财务科目编码'
	        	  },
	        	  {
	        		  width:100,
		        	  field : 'accountname',
		        	  title : '财务科目名称'
	        	  },
	        	  {
	        		  width:120,
		        	  field : 'cashflowcode',
		        	  title : '现金流量项目编码'
	        	  },
	        	  {
	        		  width:220,
		        	  field : 'cashflowname',
		        	  title : '现金流量项目名称'
	        	  },
	        	  {
	        		  width:220,
		        	  field : 'createDate',
		        	  hidden: true
	        	  }
	        	 
	  ]],
	  rownumbers:true
  });
})
/*!
 * 根据账套id会计科目代码
 */
function loadGrid(){
	if(global.accountSetCode != null){
		
		$('#grid').treegrid('options').url =  contextPath+'/FiBudgetCap!loadTreeGrid.do?accountSetCode='+global.accountSetCode+'&sysId='+global.sysId+'&accountSetId='+global.accountSetId;
		 //初始化设置comboTree的值
		 $("#parentId").combotree({url:contextPath+'/FiBudgetCap!loadComboTree.do?accountSetCode='+global.accountSetCode+'&sysId='+global.sysId+'&accountSetId='+global.accountSetId});
		 
		 $("#acId").combotree({url:contextPath+'/FiAccountCaption!loadComboTree.do?accountSetCode='+global.accountSetCode+'&sysId='+global.sysId+'&accountSetId='+global.accountSetId,disabled:false});
		 
		 $("#clId").combotree({url:contextPath+'/FiCashFlowCase!loadComboTree.do?accountSetCode='+global.accountSetCode+"&sysId="+global.sysId+'&accountSetId='+global.accountSetId});
		 $('#grid').treegrid('reload');
	}
}
/*!
 * 添加预算科目
 */
function addBudgetCap(){
   $('#dlg').dialog('open').dialog('center').dialog('setTitle','新增预算科目');
   $('#fm').form('clear');
   global.saveOrUpdateUrl=contextPath+'/FiBudgetCap!saveOrUpdate.do?accountSetId=';
}
/*!
 * 修改预算科目
 */
function editBudgetCap(){
	var row=$("#grid").treegrid('getSelected');
	if(row){
		//alert(row.acPid);
		$("#dlg").dialog('open').dialog('center').dialog('setTitle','编辑预算科目');
		console.log(row);
		$("#fm").form("clear").form("load",{
			//TODO 成本销售测试
			id:row.id,
			name:row.subname,
			code:row.subcode,
			parentId:row.pid,
			parentAcId:row.acPid,
			bid:row.bid,
			createDate:row.createDate
		});
		//alert(row.id);
		global.saveOrUpdateUrl=contextPath+"/FiBudgetCap!saveOrUpdate.do?accountSetId=&fiBudgetCap.id="+row.id+"&fiBudgetCap.sysId="+global.sysId+"&fiBudgetCap.parentId="+row.pid+"&fiBudgetCap.companyId="+row.companyId;
	}
}
/*!
 * 删除预算科目
 */
function deleteBudgetCap(){
	var row=$("#grid").treegrid("getSelected");
	if(row){
		$.messager.confirm("确认信息","你确定你想要删除该科目吗？",function(r){
			if(r){
				var url=contextPath+"/FiBudgetCap!delete.do";
				$.post(url,{id:row.id},function(result){
					if(result.success){
						$("#grid").treegrid("reload");
						$("#parentId").combotree('reload');
					}else{
						$.messager.show({
							title:'出错信息',
							msg:result.msg
						});
					}
				},'json');
			}
		});
	}
}
/*!
 * 保存预算科目
 */
function saveOrUpdateFibudgetCap(){
	
	$("#accountSetCode").val(global.accountSetCode);
	$("#sysId").val(global.sysId);
	$("#accountSetId").val(global.accountSetId);
	$("#fm").form('submit',{
		url:global.saveOrUpdateUrl,
		onSubmit:function(){
			return $(this).form('validate');
		},
		success:function(result){
			var result=eval('('+result+')');
			if(result.success){
				$("#dlg").dialog('close');
			    $('#grid').treegrid('reload');
			    $("#parentId").combotree('reload');
			}else{
				$.messager.show({
					title:'出错信息',
					msg:result.msg
				});
			}
		}
	});
}
function closeDialog(dialogId) {
    $('#' + dialogId).dialog('close');
}


function selectFormatter(value,data){
	var str = new Array();
	var values = (value+"").split(',');
	for(var i = 0, length = data.length;i<length;i++){
		for(var j = 0,length1 = values.length;j<length;j++){
			if(values[j]+"" == data[i].key+""){
				str.push(data[i].value+"");
			}
		}
		
	}
   
        return str.join(',');
}

function loadYsDepts(){
	var url = "FiYsDept!loadYsDepts.do";
	alert(url);
	$.get(url, {}, function(result) {
		alert();
	},'json');	
}
