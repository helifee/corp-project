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
	  //fit:true,
	  height:$(window).height()-20,
      columns : [[
                  {
	        		  width:150,
		        	  field : 'subcode',
		        	  title : '会计科目编码'
	        	  },
	        	  {
	        		  width:200,
		        	  field : 'subname',
		        	  title : '会计科目名称'
	        	  },
	        	 /* {
	        		  width:150,
	        		  align : 'center',
		        	  field : 'bizData',
		        	  title : '业务数据类型'
	        	  },*/
	        	  {
		        	  field : 'assContent',
		        	  title : '辅助核算内容',
		        	  hidden : true
	        	  },
	        	  {
	        		  width:300,
	        		  align : 'center',
		        	  field : 'assName',
		        	  title : '辅助核算'
	        	  },
	        	  {
	        		  width:220,
		        	  field : 'createDate',
		        	  hidden: true
	        	  }
	  ]],
	  rownumbers:true
  });
  
  $('#assName').combobox({    
	  onChange: function (n, o) {
		  assNameChange(n);
      }      
  });
  
  
  /**
   * 根据辅助核算名称获取辅助核算详细
   * @param assName
   */
function assNameChange(assName){
	var assConentInput = $("#assContent").val();
	//var asstext = $("#assContent").combobox("getText");
  	//alert(asstext);
  	var url=contextPath+"/FiAssMapping!getDetailMapping.do?assName="+encodeURI(encodeURI(assName))+"&accountSetId="+global.accountSetId+"&sysId="+global.sysId;
  	$.get(url,{},function(result){
  		var aArr = new Object();
  		for(var i=0;i<result.length;i++){
  			
  			var assid = result[i].assMappingId;
  			var code = result[i].assItemCode;
  			if(!aArr[assid]){
  				aArr[assid] = new Array();
  				aArr[assid].push(result[i].assItemCode+"/"+result[i].assItemName);
  			}else{
  				aArr[assid].push(result[i].assItemCode+"/"+result[i].assItemName);
  			}
  		}
  		
  		$("#content").combobox({
			valueField:'assItemCode',    
		    textField:'assItemName',
			data:result,
			multiple:false,
			onSelect:function(rec){
				var assContent = $("#assContent").val();
				var assmap = aArr[rec.assMappingId];
				var assArr = assContent.split(",");
				var str = "";
				for(var k=0;k<assArr.length;k++){
					for(var j=0;j<assmap.length;j++){
						if(assArr[k]==assmap[j]){
							//assContent = assContent.replace(assArr[k],"");
							str = assArr[k];
						}
					}
				}
				var changeAssContent = rec.assItemCode+"/"+rec.assItemName;
				var assContentStr = '';
				if(str != ''){
					assContentStr = assContent.replace(str,changeAssContent);
				}else{
					if(assContent != ''){
						assContentStr = assContent+","+changeAssContent;
					}else{
						assContentStr = changeAssContent;
					}
				}
				
				$("#assContent").val(assContentStr);
			}
		});

  	},'json');

  	
  }
  
  
})
/*!
 * 根据账套id会计科目代码
 */
function loadGrid(){
	
	if(global.accountSetCode != null){
		$('#grid').treegrid('options').url =  contextPath+'/FiAccountCaption!loadTreeGrid.do?accountSetCode='+global.accountSetCode+"&sysId="+global.sysId+'&accountSetId='+global.accountSetId;
		 //初始化设置comboTree的值
		 $("#parentAcId").combotree({url:contextPath+'/FiAccountCaption!loadComboTree.do?accountSetCode='+global.accountSetCode+"&sysId="+global.sysId+'&accountSetId='+global.accountSetId});
		 $('#grid').treegrid('reload');
	}
}
/*!
 * 添加会计科目
 */
function addAccountCaption(){
   $('#dlg').dialog('open').dialog('center').dialog('setTitle','新增会计科目');
   $('#fm').form('clear');
   global.saveOrUpdateUrl=contextPath+'/FiAccountCaption!saveOrUpdate.do?accountSetId='+global.accountSetId;
}
/*!
 * 修改会计科目
 */
function editAccountCaption(){
	var row=$("#grid").treegrid('getSelected');
	if(row){
		$("#dlg").dialog('open').dialog('center').dialog('setTitle','编辑会计科目');
		console.log(row);
		$("#fm").form("clear").form("load",{
			id:row.id,
			name:row.subname,
			code:row.subcode,
			parentId:row.pid,
			bizData:row.bizData,
			bizDatamx:row.bizDatamx,
			assContent:row.assContent,
			createDate:row.createDate
		});
		$("#assName").combobox("setValues",row.assName?row.assName:[]);
		global.saveOrUpdateUrl=contextPath+"/FiAccountCaption!saveOrUpdate.do?accountSetId="+global.accountSetId+"&id="+row.id;
	}
}



/**
 * 删除会计科目
 */
function deleteAccountCaption(){
	var row=$("#grid").treegrid("getSelected");
	if(row){
		$.messager.confirm("确认信息","你确定你想要删除该科目吗？",function(r){
			if(r){
				var url=contextPath+"/FiAccountCaption!delete.do";
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
 * 保存会计科目
 */
function saveOrUpdateAccountCaption(){
	$("#accountSetCode").val(global.accountSetCode);
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
