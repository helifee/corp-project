var sysId = '';
var companyId = '';
var accountSetCode = '';
var companyCode = '';
var projectId = '';
var assMappingId = '';

var assbizObjectId = '';
var assid = '';
var assbuildId = '';
$(function(){
	/*$('#frm_fiAssMapping_vtype').combobox({    
	    data:vtype_ref,    
	    valueField:'key',    
	    textField:'value'   
	});*/
	//initGrid();//初始化列表
})


/** 初始业务对象列表 **/
function initGrid() {
	//辅助核算列表
    $('#grid1').datagrid({
        url: 'FiAssMapping!loadlist.do?fiAssMapping.accountSetId='+document.getElementById("accountSetId").value+'&sysId='+sysId+"&companyId="+companyId,
        toolbar: '#grid1_tb',
        columns: [[{
	            field : 'ck',
	            checkbox:true
	        },
	           
	        {
	            field: 'bizObjectName',
	            title: '业务对象',
	            width: 150,
	            align: 'center',
	        },
	        {
	            field: 'assName',
	            title: '科目辅助核算',
	            width: 150
	        },
	        {
	            field: 'isDirectCode',
	            title: '传输类型',
	            width: 150,
	            formatter : function(v,r){
	            	if(v == 1){
	            		return '核算代码';
	            	}else if(v == 2){
	            		return '核算名称';
	            	}else if(v == 3){
	            		return '业务对象代码';
	            	}else if(v == 4){
	            		return '业务对象名称';
	            	}else if(v == 5){
	            		return '默认设置';
	            	}else{
	            		return '';
	            	}
	            	
	            }
	        },
	        {
	            field: 'id',
	            title: '操作',
	            width: 150,
	            formatter : function(v,r){
	            	return '<a class="easyui-linkbutton lbbj" plain="true" iconCls="icon-edit" onclick="editFiAssMappingDialog(\''+v+'\')">编辑</a>';
	            }
	        }
        ]],
        onClickRow:function(rowIndex,rowData){
        	if(rowData.isDirectCode!=3&&rowData.isDirectCode!=4){
        		showSelectedRow(rowData);
        	}else{
        		showGrid2(0);
        	}
            
           },
        fit: true,
        border: false,
        singleSelect: true,
        rownumber: true,
        onLoadSuccess:function(){
        	$(".lbbj").linkbutton({});
        }
    });
    
    showGrid2(0);
    reloadTree();
}

//单击行事件
function showSelectedRow(rowData){
	var bizObjectName=rowData.bizObjectName;
	
	var id=rowData.id;
	
	var bizObjectId = rowData.bizObjectId;
	$('#grid2').datagrid('loadData', { total: 0, rows: [] });
	if(bizObjectName=='房间信息'){
		$("#room").css('display','block');
		$("#room").parent().css("width", "185px");
		$("#room").parent().css("left", "0px");
		$("#room").parent().css("top", "299px");
		$("#room1").css('left','184px');
		$("#room1").parent().css("left", "184px");
		showproject(bizObjectId,id);
	}else{
		$("#room").css('display','none');
		$("#room1").css('left','0px');
		$("#room1").parent().css("left", "0px");
		showGrid2(bizObjectId,id);
	}
	
}

function showproject(bizObjectId,id){
	$("#project").combobox({
		valueField:'id',    
	    textField:'name',
		url:'FiAssMapping!loadProjectBrance.do?fiAssMapping.id='+id+'&companyId='+companyId,
        onChange:function(newValue,oldValue){
        	projectId = newValue;
        	showBuilds(bizObjectId,id,projectId);
	    } ,
        onLoadSuccess: function() { //加载完成后,设置选中第一项
             var val = $(this).combobox("getData");
             $(this).combobox("select", val[0].id);
             projectId = val[0].companyId;
        }
	});
}

function showBuilds(bizObjectId,id,projectId){
	var url="FiAssMapping!loadBuildTree.do?sysId="+sysId+"&projectId="+projectId;
	$("#builds").tree({
		url:url,
		onClick:function(node){
			//$("#bmid").val(node.id);
			//$("#bmid_name").text(node.text);
			showRoomGrid(bizObjectId,id,node.id);
		}
	});
}

function showGrid2(bizObjectId,id){
	assbizObjectId = bizObjectId;
	assid = id;
	//alert(bizObjectId);
    var datagrid; //定义全局变量datagrid
	var editRow = undefined; //定义全局变量：当前编辑的行
	datagrid=$('#grid2').datagrid({
	        url: 'FiAssMapping!loadlistDetail.do?fiAssMapping.id='+id+'&fiAssMapping.bizObjectId='+bizObjectId+'&accountSetId='+document.getElementById("accountSetId").value+"&companyId="+companyId+"&sysId="+sysId,//传一个业务编码：1代表是公司2代表是项目分期3代表是产品类型
	        toolbar: '#t2',
	        columns: [[
	            {
	                field: 'assItemCode',
	                title: '核算代码',
	                width: 150,
	                align: 'center',
	                editor: { type: 'validatebox', options: { required: true} }
	            },
	            {
	                field: 'assItemName',
	                title: '核算名称',
	                width: 150,
	                editor: { type: 'validatebox', options: { required: true} }
	            },
	            {
	                field: 'objectItemCode',
	                title: '业务对象代码',
	                width: 150
	            },
	            {
	                field: 'objectItemName',
	                title: '业务对象名称',
	                width: 150
	            },  
	                
	             ]],  
	             
	             toolbar: [
                     { text: '新增', iconCls: 'icon-add', handler: function () {
  	                     //取消当前编辑行把当前编辑行罢undefined回滚改变的数据,取消选择的行
  	               	     var row = {"assItemCode":null,"assItemName":null,"objectItemCode":null,"objectItemName":null,editing:true};
		  	          	 $('#grid2').datagrid('appendRow',row);
		  	          	 //TODO 
		  	          	 var editIndex = $('#grid2').datagrid('getRows').length-1;
		  	          	 $('#grid2').datagrid('selectRow', editIndex);
		  	          	 $('#grid2').datagrid('beginEdit', editIndex);
		  	             editRow = editIndex;
  	                    } 
                     }, '-',    
	                 { text: '修改', iconCls: 'icon-edit', handler: function () {
	                     //修改时要获取选择到的行
	                     var rows = datagrid.datagrid("getSelections");
	                     //如果只选择了一行则可以进行修改，否则不操作
	                     if (rows.length == 1) {
	                         //修改之前先关闭已经开启的编辑行，当调用endEdit该方法时会触发onAfterEdit事件
	                         if (editRow != undefined) {
	                             datagrid.datagrid("endEdit", editRow);
	                         }
	                         //当无编辑行时
	                         if (editRow == undefined) {
	                             //获取到当前选择行的下标
	                             var index = datagrid.datagrid("getRowIndex", rows[0]);
	                             //开启编辑
	                             datagrid.datagrid("beginEdit", index);
	                             //把当前开启编辑的行赋值给全局变量editRow
	                             editRow = index;
	                             //当开启了当前选择行的编辑状态之后，
	                             //应该取消当前列表的所有选择行，要不然双击之后无法再选择其他行进行编辑
	                             datagrid.datagrid("unselectAll");
	                         }
	                     }else{
	                    	 alert("请选择一行进行修改");
	                     }
	                 }
	                 }, '-',
	                 { text: '保存', iconCls: 'icon-save', handler: function () {
	                     //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
	                     datagrid.datagrid("endEdit", editRow);
	                 }
	                 }, '-',
	                 { text: '取消编辑', iconCls: 'icon-redo', handler: function () {
	                     //取消当前编辑行把当前编辑行罢undefined回滚改变的数据,取消选择的行
	                     editRow = undefined;
	                     datagrid.datagrid("rejectChanges");
	                     datagrid.datagrid("unselectAll");
	                 }
	                 }, '-',
	                 { text: '导出', iconCls: 'icon-save', handler: function () {
	                	 window.location.href="FiAssMapping!exportDetailMapping.do?assMappingId="+id;
	                 }
	                 }, '-',
	                 { text: '导入', iconCls: 'icon-save', handler: function () {
	                	 assMappingId = id;
	                	 importDetailMapping();
	                 }
	                 }, '-'],
	                onAfterEdit: function (rowIndex, rowData, changes) {
	                	var rows = $('#grid2').datagrid('getRows');
	                	var rows1 = $('#grid1').datagrid('getSelections');
	                	
	                	var id=rows[rowIndex].id;
	                	var assItemCode=rows[rowIndex].assItemCode;
	                	var assItemName=rows[rowIndex].assItemName;
	                	var objectItemCode=rows[rowIndex].objectItemCode;
	                	var objectItemName=rows[rowIndex].objectItemName;
	                	var objectId = rows[rowIndex].objectId;
	                	var assMappingId=rows1[0].id;
	                	
	                	
	                	//插入到数据库
	                	 $.ajax({
	         				type : "POST",
	         				url : "FiAssMapping!saveAssDetailMapping.do",
	         				data : {id:id,assItemCode:assItemCode,assItemName:assItemName,objectItemCode:objectItemCode,objectItemName:objectItemName,assMappingId:assMappingId,objectId:objectId},
	         				dataType : "json",
	         				success : function(data, textStatus, jqXHR) {
	         					if (data && data.success) {
	         						alert("保存成功！");
	         					} else {
	         						alert("保存失败！");
	         					}
	         				},
	         				error : function(jqXHR, textStatus, errorThrown) {
	         					alert("保存失败！");
	         				}
	         			});
	                	
	                    //endEdit该方法触发此事件
	                    console.info(rowData);
	                    editRow = undefined;
	                },
	                onDblClickRow: function (rowIndex, rowData) {
	                //双击开启编辑行
	                    if (editRow != undefined) {
	                        datagrid.datagrid("endEdit", editRow);
	                    }
	                    if (editRow == undefined) {
	                        datagrid.datagrid("beginEdit", rowIndex);
	                        editRow = rowIndex;
	                    }
	                },
	            
	             

	        fit: true,
	        border: false,
	        singleSelect: true,
	        rownumber: true
	    });
	    
}

function showRoomGrid(bizObjectId,id,buildId){
	assbizObjectId = bizObjectId;
	assid = id;
	assbuildId = buildId;
	//alert(bizObjectId);
    var datagrid; //定义全局变量datagrid
	var editRow = undefined; //定义全局变量：当前编辑的行
	datagrid=$('#grid2').datagrid({
	        url: 'FiAssMapping!loadlistDetail.do?fiAssMapping.id='+id+'&fiAssMapping.bizObjectId='+bizObjectId+'&accountSetId='+document.getElementById("accountSetId").value+"&companyId="+companyId+"&sysId="+sysId+"&buildId="+buildId,//传一个业务编码：1代表是公司2代表是项目分期3代表是产品类型
	        toolbar: '#t2',
	        columns: [[
	            {
	                field: 'assItemCode',
	                title: '核算代码',
	                width: 150,
	                align: 'center',
	                editor: { type: 'validatebox', options: { required: true} }
	            },
	            {
	                field: 'assItemName',
	                title: '核算名称',
	                width: 150,
	                editor: { type: 'validatebox', options: { required: true} }
	            },
	            {
	                field: 'objectItemCode',
	                title: '业务对象代码',
	                width: 150
	            },
	            {
	                field: 'objectItemName',
	                title: '业务对象名称',
	                width: 150
	            },  
	                
	             ]],  
	             
	             toolbar: [
                     { text: '新增', iconCls: 'icon-add', handler: function () {
  	                     //取消当前编辑行把当前编辑行罢undefined回滚改变的数据,取消选择的行
  	               	     var row = {"assItemCode":null,"assItemName":null,"objectItemCode":null,"objectItemName":null,editing:true};
		  	          	 $('#grid2').datagrid('appendRow',row);
		  	          	 //TODO 
		  	          	 var editIndex = $('#grid2').datagrid('getRows').length-1;
		  	          	 $('#grid2').datagrid('selectRow', editIndex);
		  	          	 $('#grid2').datagrid('beginEdit', editIndex);
		  	             editRow = editIndex;
  	                    } 
                     }, '-',    
	                 { text: '修改', iconCls: 'icon-edit', handler: function () {
	                     //修改时要获取选择到的行
	                     var rows = datagrid.datagrid("getSelections");
	                     //如果只选择了一行则可以进行修改，否则不操作
	                     if (rows.length == 1) {
	                         //修改之前先关闭已经开启的编辑行，当调用endEdit该方法时会触发onAfterEdit事件
	                         if (editRow != undefined) {
	                             datagrid.datagrid("endEdit", editRow);
	                         }
	                         //当无编辑行时
	                         if (editRow == undefined) {
	                             //获取到当前选择行的下标
	                             var index = datagrid.datagrid("getRowIndex", rows[0]);
	                             //开启编辑
	                             datagrid.datagrid("beginEdit", index);
	                             //把当前开启编辑的行赋值给全局变量editRow
	                             editRow = index;
	                             //当开启了当前选择行的编辑状态之后，
	                             //应该取消当前列表的所有选择行，要不然双击之后无法再选择其他行进行编辑
	                             datagrid.datagrid("unselectAll");
	                         }
	                     }else{
	                    	 alert("请选择一行进行修改");
	                     }
	                 }
	                 }, '-',
	                 { text: '保存', iconCls: 'icon-save', handler: function () {
	                     //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
	                     datagrid.datagrid("endEdit", editRow);
	                 }
	                 }, '-',
	                 { text: '取消编辑', iconCls: 'icon-redo', handler: function () {
	                     //取消当前编辑行把当前编辑行罢undefined回滚改变的数据,取消选择的行
	                     editRow = undefined;
	                     datagrid.datagrid("rejectChanges");
	                     datagrid.datagrid("unselectAll");
	                 }
	                 }, '-',
	                 { text: '导出', iconCls: 'icon-save', handler: function () {
	                	 window.location.href="FiAssMapping!exportRoom.do?assMappingId="+id+"&buildId="+buildId;
	                 }
	                 }, '-',
	                 { text: '导入', iconCls: 'icon-save', handler: function () {
	                	 assMappingId = id;
	                	 importRooms();
	                 }
	                 }, '-'],
	                onAfterEdit: function (rowIndex, rowData, changes) {
	                	var rows = $('#grid2').datagrid('getRows');
	                	var rows1 = $('#grid1').datagrid('getSelections');
	                	
	                	var id=rows[rowIndex].id;
	                	var assItemCode=rows[rowIndex].assItemCode;
	                	var assItemName=rows[rowIndex].assItemName;
	                	var objectItemCode=rows[rowIndex].objectItemCode;
	                	var objectItemName=rows[rowIndex].objectItemName;
	                	var objectId = rows[rowIndex].objectId;
	                	var assMappingId=rows1[0].id;
	                	
	                	
	                	//插入到数据库
	                	 $.ajax({
	         				type : "POST",
	         				url : "FiAssMapping!saveAssDetailMapping.do",
	         				data : {id:id,assItemCode:assItemCode,assItemName:assItemName,objectItemCode:objectItemCode,objectItemName:objectItemName,assMappingId:assMappingId,objectId:objectId},
	         				dataType : "json",
	         				success : function(data, textStatus, jqXHR) {
	         					if (data && data.success) {
	         						alert("保存成功！");
	         					} else {
	         						alert("保存失败！");
	         					}
	         				},
	         				error : function(jqXHR, textStatus, errorThrown) {
	         					alert("保存失败！");
	         				}
	         			});
	                	
	                    //endEdit该方法触发此事件
	                    console.info(rowData);
	                    editRow = undefined;
	                },
	                onDblClickRow: function (rowIndex, rowData) {
	                //双击开启编辑行
	                    if (editRow != undefined) {
	                        datagrid.datagrid("endEdit", editRow);
	                    }
	                    if (editRow == undefined) {
	                        datagrid.datagrid("beginEdit", rowIndex);
	                        editRow = rowIndex;
	                    }
	                },
	            
	             

	        fit: true,
	        border: false,
	        singleSelect: true,
	        rownumber: true
	    });
	    
}

/**
 * 保存
 */
function saveFiAssMapping(){
	$('#sysId').val(sysId);
	$('#companyId').val(companyId);
	$('#frm2').form("submit",{
		url:"FiAssMapping!saveFiAssMapping.do",
		ajax:true,
	    success:function(data){    
	    	data = $.parseJSON(data);
	        if(data.success){
	        	$("#editDialog").dialog("close");
	        	$('#grid1').datagrid("reload");
	        }else{
	        	alert(data.msg);
	        }
	    }
	});	
}

/**
 * 编辑辅助核算窗口
 * @param id
 */
function editFiAssMappingDialog(id){
	$('#frm2').form("reset");
	if(id){
		$.post("FiAssMapping!getFiAssMappingById.do?id="+id,{},function(data){
			$("#frm2").form("load",{
				"fiAssMapping.assName":data.assName,
				"fiAssMapping.bizObjectName":data.bizObjectName,
				"fiAssMapping.bizObjectId":data.bizObjectId,
				"fiAssMapping.accountSetId":data.accountSetId,
				"fiAssMapping.id":data.id,
				"fiAssMapping.status":data.status,
				"fiAssMapping.isDirectCode":data.isDirectCode,
			});
		});
	}
	$("#editDialog").dialog("open");
};


/**
 * 删除
 */
function del(){
	var id = getGridCheckBoxValues("id");
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要删除吗？")) {
		 $('body').mask("删除中...");
		 $.ajax({
				type : "POST",
				url : "FiAssMapping!delete.do",
				data : {id:id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("删除成功！");
						$('#grid1').datagrid('reload');
					} else {
						alert("删除失败！");
					}
					
					$('#grid1').datagrid("reload");
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("删除失败！");
				}
			});
	 }
}

function getGridCheckBoxValues(){

	var rows = $('#grid1').datagrid('getSelections');
	 var cpList = [];

	 if(rows != null && rows){
		 for (var jj = 0,length = rows.length; jj < length; jj++) {
		      
		            cpList.push(rows[jj].id);
		      
		    }
	 }

	    var val_string = "";
	    if (cpList.length > 0) val_string = cpList.join(";");
	    return val_string;
}

/**
 * 导出
 */
function exportAssMapping(){
	window.location.href="FiAssMapping!exportPr.do?accountSetCode="+accountSetCode+"&sysId="+sysId+"&accountSetId="+document.getElementById("accountSetId").value+"&companyId="+companyId;
}

function importAssMapping(){
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
		url:"FiAssMapping!importPr.do?accountSetCode="+accountSetCode+"&sysId="+sysId+"&accountSetId="+document.getElementById("accountSetId").value+"&companyCode="+companyCode+"&companyId="+companyId,
		
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

function reloadTree(){
	var rows=$("#grid2").datagrid("getRows");
	var index=rows.length;
	while(index>0){
		 $("#grid2").datagrid("deleteRow",0);
		 rows=$("#grid2").datagrid("getRows");
		 index=rows.length;
	}
}

function importRooms(){
	$("#importRoomDialog").dialog("open");
}
function updateloadRoom() {
	var file = $("#uploadRoomFile");
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
	
	
    $('#importroomfrm').form("submit",{
		url:"FiAssMapping!importRoomPr.do?assId="+assMappingId+"&sysId="+sysId+"&accountSetId="+document.getElementById("accountSetId").value+"&companyCode="+companyCode+"&companyId="+companyId,
		
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
			$("#importRoomDialog").dialog("close");
		    file.after(file.clone().val(""));
		    file.remove();
		    showRoomGrid(assbizObjectId,assid,assbuildId);
	    }
	});	
}

function importDetailMapping(){
	$("#importDetailDialog").dialog("open");
}

function updateloadDetail() {
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
	
	
    $('#importDetailfrm').form("submit",{
		url:"FiAssMapping!importDetailPr.do?assId="+assMappingId,
		
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
			$("#importDetailDialog").dialog("close");
		    file.after(file.clone().val(""));
		    file.remove();
		    showGrid2(assbizObjectId,assid);
	    }
	});	
}