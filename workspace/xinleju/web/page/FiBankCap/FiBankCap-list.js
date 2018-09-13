/**
 * 全局变量区
 */
var global={};
//账套Id
global.accountSetId="";
global.accountSetCode="";
global.saveOrUpdateUrl="";
global.sysId="";
global.companyCode ="";
companyId = '';

$(function(){
  
  $('#grid').treegrid({
	  singleSelect : true,
	  idField:'id',  
	  treeField:'accountCapCode',
	  fit:true,
      columns : [[
				  {
					  width:150,
					  field : 'id',
					  hidden: true
				  },
                  {
	        		  width:150,
		        	  field : 'accountCapCode',
		        	  title : '会计科目编码'
	        	  },
	        	  {
	        		  width:120,
		        	  field : 'accountCapName',
		        	  title : '会计科目名称'
	        	  },
	        	  {
	        		  width:200,
		        	  field : 'bankCode',
		        	  title : '银行账户编码'
	        	  },
	        	  {
	        		  width:200,
		        	  field : 'bankName',
		        	  title : '银行账户名称'
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
		$("#companyId").val(companyId)
		$('#grid').treegrid('options').url =  contextPath+'/FiBankCap!loadTreeGrid.do?accountSetCode='+global.accountSetCode+'&sysId='+global.sysId+'&accountSetId='+global.accountSetId+"&companyId="+companyId;
		 $("#acId").combotree({
			 url:contextPath+'/FiBankCap!loadCompanyTree.do?accountSetCode='+global.accountSetCode+'&sysId='+global.sysId+'&accountSetId='+global.accountSetId+"&companyId="+companyId,
			 disabled:false,
			 panelHeight:350,
			 onSelect: function (data) {
				 $('#bankId').val(data.id);
				 $('#bankCode').val(data.code);
				 $('#bankName').val(data.name);
            },
		 });
		 $("#capId").combotree({
			 url:contextPath+'/FiAccountCaption!loadComboTree.do?accountSetCode='+global.accountSetCode+'&sysId='+global.sysId+'&accountSetId='+global.accountSetId,
			 disabled:false,
			 panelHeight:350,
			 onSelect: function (data) {
				 $('#accountCapId').val(data.id);
				 $('#accountCapCode').val(data.subcode);
				 $('#accountCapName').val(data.subname);
           },
		});
		 
		 $('#grid').treegrid('reload');
	}
}
/*!
 * 添加银行科目对照
 */
function addBankCap(){
   $('#dlg').dialog('open').dialog('center').dialog('setTitle','新增银行科目对照');
   $('#fm').form('clear');
   global.saveOrUpdateUrl=contextPath+'/FiBankCap!saveOrUpdate.do?accountSetId=';
}
/*!
 * 修改银行科目对照
 */
function editBankCap(){
	var row=$("#grid").treegrid('getSelected');
	if(row){
		$("#dlg").dialog('open').dialog('center').dialog('setTitle','编辑银行科目对照');
		console.log(row);
		$("#fm").form("clear").form("load",{
			//TODO 成本销售测试
			id:row.id,
			accountCapName:row.accountCapName,
			accountCapCode:row.accountCapCode,
			parentId:row.pid,
			parentAcId:row.bid,
			bid:row.bid,
			createDate:row.createDate,
			capAcId:row.accountCapId,
			accountCapId:row.accountCapId,
			bankCode:row.bankCode,
			bankName:row.bankName,
			createDate:row.createDate
		});
		//alert(row.id);
		global.saveOrUpdateUrl=contextPath+"/FiBankCap!saveOrUpdate.do?accountSetId=&fiBankCap.id="+row.id+"&fiBankCap.sysId="+global.sysId+"&fiBankCap.parentId="+row.pid;//+"&fiBankCap.companyId="+row.companyId;
	}
}
/*!
 * 删除银行科目对照
 */
function deleteBankCap(){
	var row=$("#grid").treegrid("getSelected");
	if(row){
		$.messager.confirm("确认信息","你确定你想要删除该科目吗？",function(r){
			if(r){
				var url=contextPath+"/FiBankCap!delete.do";
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
 * 保存银行科目对照
 */
function saveOrUpdateFiBankCap(){
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
function exportBankCap(){
	window.location.href="FiBankCap!exportPr.do?accountSetCode="+global.accountSetCode+"&sysId="+global.sysId+"&accountSetId="+global.accountSetId+"&companyId="+companyId;
}

function importBankCap(){
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
		url:"FiBankCap!importPr.do?accountSetCode="+global.accountSetCode+"&sysId="+global.sysId+"&accountSetId="+global.accountSetId+"&companyCode=&companyId="+companyId,
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