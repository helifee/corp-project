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
		        	  field : 'subcode',
		        	  title : '编码'
	        	  },
	        	  {
	        		  width:260,
		        	  field : 'subname',
		        	  title : '名称'
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
		$('#grid').treegrid('options').url =  contextPath+'/FiCashFlowCase!loadTreeGrid.do?accountSetCode='+global.accountSetCode+"&sysId="+global.sysId+'&accountSetId='+global.accountSetId;
		 //初始化设置comboTree的值
		 $("#parentAcId").combotree({url:contextPath+'/FiCashFlowCase!loadComboTree.do?accountSetCode='+global.accountSetCode+"&sysId="+global.sysId+'&accountSetId='+global.accountSetId});
		 $('#grid').treegrid('reload');
	}
}
/*!
 * 添加
 */
function addCashFlowCase(){
   $('#dlg').dialog('open').dialog('center').dialog('setTitle','新增现金流量项目');
   $('#fm').form('clear');
   global.saveOrUpdateUrl=contextPath+'/FiCashFlowCase!saveOrUpdate.do?accountSetId='+global.accountSetId+'&accountSetCode='+global.accountSetCode+"&sysId="+global.sysId;
}
/*!
 * 修改
 */
function editCashFlowCase(){
	var row=$("#grid").treegrid('getSelected');
	if(row){
		$("#dlg").dialog('open').dialog('center').dialog('setTitle','编辑现金流量项目');
		console.log(row);
		$("#fm").form("clear").form("load",{
			id:row.id,
			name:row.subname,
			code:row.subcode,
			parentId:row.pid,
			createDate:row.createDate
		});
		
		global.saveOrUpdateUrl=contextPath+"/FiCashFlowCase!saveOrUpdate.do?accountSetCode="+global.accountSetCode+"&id="+row.id+"&sysId="+global.sysId;
	}
}



/**
 * 删除会计科目
 */
function deleteCashFlowCase(){
	var row=$("#grid").treegrid("getSelected");
	if(row){
		$.messager.confirm("确认信息","你确定你想要删除该科目吗？",function(r){
			if(r){
				var url=contextPath+"/FiCashFlowCase!delete.do";
				$.post(url,{id:row.id},function(result){
					if(result.success){
						$("#grid").treegrid("reload");
						$("#parentAcId").combotree('reload');
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
 * 保存
 */
function saveOrUpdateCashFlowCase(){
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
			    $("#parentAcId").combotree('reload');
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
