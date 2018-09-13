/**
 * 全局变量区
 */
var global={};
//账套Id
global.accountSetId="";
global.accountSetCode="";
global.saveOrUpdateUrl="";
global.sysId="";
companyId = '';
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
	        		  width:200,
		        	  field : 'subname',
		        	  title : '预算科目名称'
	        	  },
	        	  {
	        		  width:100,
		        	  field : 'accountcode',
		        	  title : '财务科目编码'
	        	  },
	        	  {
	        		  width:200,
		        	  field : 'accountname',
		        	  title : '财务科目名称'
	        	  },
	        	  {
	        		  width:120,
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
	$("#companyId").val(companyId)
	if(global.accountSetCode != null){
		$('#grid').treegrid('options').url =  contextPath+'/FiCoCap!loadTreeGrid.do?accountSetCode='+global.accountSetCode+'&sysId='+global.sysId+'&accountSetId='+global.accountSetId+"&companyId="+companyId;
		 $("#acId").combotree({url:contextPath+'/FiAccountCaption!loadComboTree.do?accountSetCode='+global.accountSetCode+'&sysId='+global.sysId+'&accountSetId='+global.accountSetId,
			 disabled:false,
			 panelHeight:350,
			 onSelect: function (data) {
				 $('#accountCapId').val(data.id);
				 $('#accountCapCode').val(data.subcode);
				 $('#accountCapName').val(data.subname);
           },
           });
		 
		 $("#coId").combotree({url:contextPath+'/FiCoCap!loadComboTree.do?accountSetCode='+global.accountSetCode+'&sysId='+global.sysId+'&accountSetId='+global.accountSetId+"&companyId="+companyId,
			 disabled:false,
			 panelHeight:350,
			 onSelect: function (data) {
				 $('#bid').val(data.id);
				 $('#code').val(data.subcode);
				 $('#name').val(data.subname);
           },	 
		 });
		 
		 $('#grid').treegrid('reload');
		// $(".panel-body-noheader").css("height","350px"); 
	}
}
/*!
 * 添加预算科目
 */
function addCoCap(){
   $('#dlg').dialog('open').dialog('center').dialog('setTitle','新增预算科目');
   $('#fm').form('clear');
   global.saveOrUpdateUrl=contextPath+'/FiCoCap!saveOrUpdate.do?accountSetId=';
}
/*!
 * 修改预算科目
 */
function editCoCap(){
	var row=$("#grid").treegrid('getSelected');
	if(row){
		//alert(row.acPid);
		$("#dlg").dialog('open').dialog('center').dialog('setTitle','编辑预算科目');
		console.log(row);
		$("#fm").form("clear").form("load",{
			id:row.id,
			name:row.subname,
			code:row.subcode,
			parentAcId:row.acPid,
			bid:row.bid,
			coId:row.bid,
			createDate:row.createDate,
			accountCapName:row.accountname,
			accountCapCode:row.accountcode,
			accountCapId:row.acPid
		});
		//alert(row.id);
		global.saveOrUpdateUrl=contextPath+"/FiCoCap!saveOrUpdate.do?accountSetId=&fiCoCap.id="+row.id+"&fiCoCap.sysId="+global.sysId+"&fiCoCap.parentId="+row.pid+"&fiCoCap.companyId="+row.companyId;
	}
}
/*!
 * 删除预算科目
 */
function deleteCoCap(){
	var row=$("#grid").treegrid("getSelected");
	if(row){
		$.messager.confirm("确认信息","你确定你想要删除该科目吗？",function(r){
			if(r){
				var url=contextPath+"/FiCoCap!delete.do";
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
function saveOrUpdateFiCoCap(){
	$('#companyId').val(companyId);
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

/**
 * 导出
 */
function exportCoCap(){
	window.location.href="FiCoCap!exportPr.do?accountSetCode="+global.accountSetCode+"&sysId="+global.sysId+"&accountSetId="+global.accountSetId+"&companyId="+companyId;
}

function importCoCap(){
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
	
	
    $('#importfrm').form("submit",{
		url:"FiCoCap!importPr.do?accountSetCode="+global.accountSetCode+"&sysId="+global.sysId+"&accountSetId="+global.accountSetId+"&companyId="+companyId,
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
		    $('#grid').treegrid('reload');
	    }
	});	
}