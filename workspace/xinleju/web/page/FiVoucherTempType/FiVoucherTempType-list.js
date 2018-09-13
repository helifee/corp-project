/**
 * 凭证模板业务类型
 */
var global={};
var summarydata="";
var filterdata="";
var cashflowdata="";
var remarksdata="";
var drmnyexpr="";
var crmnyexpr="";
var rowindex="";
global.accountSetId="";
global.accountSetCode="";
global.saveOrUpdateUrl="";
global.sysId="";
var companyCode = '';
var companyId="";
/**
 * 当前正在编辑的摘要
 */
var curSummary = null;

/**
 * 当前正在编辑的筛选条件
 */
var curFilter = null;


/**
 * 当前正在编辑的科目
 */
var curCaption = null;

/**
 * 当前正在编辑的现金流量项目
 */
var curCashFlow = null;


/**
 * 当前正在编辑的借方金额
 */
var curD = null;
/**
 * 当前正在编辑的贷方金额
 */
var curC = null;

/**
 * 当前正在编辑的备注
 */
var curRemarks = null;

//页面初始化
$(function(){
	loadTree();
	initDataGrid();
	initCaptionTreeGrid();
	initCashFlowTreeGrid();
});

var copy_tempId = -1 ;
//复制
function copy(){
	copy_tempId = $("#bmid").val();
}
//黏贴
function plaster(){
	if(copy_tempId != -1){
		loadFormData(copy_tempId,'1');
	}
}

/**
 * 初始化左侧模板类型树
 */
function loadTree(){
	var url=contextPath+"/FiVoucherTempType!loadTree.do?accountSetCode="+global.accountSetCode+"&sysId="+global.sysId+"&accountSetId="+global.accountSetId+"&companyId="+companyId;
	$("#tree1").tree({
		url:url,
		onClick:function(node){
			//if($("#tree1").tree("isLeaf",node.target)){
				$("#bmid").val(node.id);
				$("#bmid_name").text(node.text);
				loadFormData(node.id,'0');
			//}
		}
	});
}

/**
 * 加载右侧凭证模板表单数据
 * isPaster:'0' 时全部加载  
 * isPaster:'1' 不加载bmid_name 和 bmid
 * @author songjunjie ztl
 * @param typeId 凭着模板类别id
 */
function loadFormData(typeId,isPaster){
	$("#frm").form("reset");
	var url = "FiVoucherTemplate!load.do?typeId="+typeId;
	$.post(url,{},function(data){
		if(data.success){
			$("#frm").form("load",data.temp);
			//data.temp;//凭证模板
			if(isPaster == '0'){
				$("#bmid_name").attr("value",data.temp.bizTypeName);
				$("#bmid").attr("value",data.temp.typeId);
			}
			$("#condition").attr("value",data.temp.filter);
			$("#note").attr("value",data.temp.note);
			$("#boid_name").combobox('setValue',data.temp.bizObjectId);
			var boId = encodeURI(data.temp.bizObjectId);
			//加载对象属性
			$.ajax({  
		         url: "FiVoucherTempType!getFiledByboId.do?regClassName="+encodeURI(boId)+"&sysId="+global.sysId,  
		         type: "GET",  
		         async: false,  
		         dataType: "json",   
		         success: function (date) {  
		        	 $('#billField').datagrid({data: date})
		        	 billFieldJson = date;
		         }
		    });
			$("#flag").attr("value",data.temp.flag);
			$("#accountSetId").val(global.accountSetId);
			if(data.temp.id==0 || isPaster == '1'){
				$("#id").attr("value",null);
				data.temp.id = null;
				$.each(data.temp.fiVoucherEntryList, function (n, value) {  
		              value.id = null;
		              value.voucherTemplateId = null;
		        });  
			}else{
				$("#id").attr("value",data.temp.id);
			}
			//alert($("#grid").width());
			//data.temp.fiVoucherEntryList;//凭证分录
			$("#grid").datagrid('loadData', data.temp.fiVoucherEntryList);
			//alert($("#grid").width());
			$(".datagrid-body").css("height","80%"); // chc add 2016.8.2 设置凭证模板分录高度以显示横向滚动条
			$(".datagrid-view2").parent().css("height","80%");
			$("#tb2").parent().css("height","540px");
			$(".datagrid-view").css("overflow","auto");
			$(".datagrid .panel-body").css("overflow","auto");
			$(".layout-panel").css("overflow","auto");
			$(".panel").css("overflow","auto");
			$(".panel-noscroll").css("overflow","auto");
		}
	},"json");
}

function add(){
	
	var node=$("#tree1").tree("getSelected");
	$("#fm").form("clear").form("load",{
		parentName:node?node.text:'',
		parentId:node?node.id:'',
		name:""
	});
	$("#dlg").dialog("open").dialog("center").dialog("setTitle","凭证业务类型");
	global.saveOrUpdateUrl=contextPath+"/FiVoucherTempType!saveOrUpdateTempType.do?accountSetId="+global.accountSetId;
}

function update(){
	var node=$("#tree1").tree("getSelected");
	if(node){
		$("#fm").form("clear").form("load",{
			parentName:$("#tree1").tree("getParent",node.target).text,
			parentId:$("#tree1").tree("getParent",node.target).id,
			id:node.id,
			name:node.text
		});
		$("#dlg").dialog("open").dialog("center").dialog("setTitle","凭证业务类型");
		global.saveOrUpdateUrl=contextPath+"/FiVoucherTempType!saveOrUpdateTempType.do?accountSetId="+global.accountSetId;
	}else{
		$.messager.alert("信息","请选择一个节点");
	}
}

function del(){
	var node=$("#tree1").tree("getSelected");
	if(!node){
		$.messager.alert("信息","请选择一个节点");
	}else if(!$("#tree1").tree("isLeaf",node.target)){
		$.messager.alert("信息","该节点包含子节点无法删除");
	}else{
		$.messager.confirm("确认信息","你确定你想要删除该节点吗？",function(r){
			if(r){
				var url=contextPath+"/FiVoucherTempType!delete.do";
				$.post(url,{id:node.id},function(result){
					if(result.success){
						$("#tree1").tree("reload");
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
function saveOrUpdate(){
	$("#accountSetCode").val(global.accountSetCode);
	$("#sysId").val(global.sysId);
	
	if(companyId==""){
		alert("请选择公司！");
		return false;
	}
	$("#companyId").val(companyId);
	$("#fm").form('submit',{
		url:global.saveOrUpdateUrl,
		onSubmit:function(){
			return $(this).form('validate');
		},
		success:function(result){
			var result=eval('('+result+')');
			if(result.success){
				$("#dlg").dialog('close');
			    $('#tree1').tree('reload');
			}else{
				$.messager.show({
					title:'出错信息',
					msg:result.msg
				});
			}
		}
	});
}

/*========================================
 * 下是凭证模板分录表格初始化，以及行编辑的相关操作。
 *========================================/

/**
 * 初始化模板会计分录
 */
function initDataGrid(){
	$('#grid').datagrid({
		singleSelect : true,
		toolbar: '#tb2',
	    fit:true,
        columns : [[
               {
		         field : 'captionId',
   		         checkbox:true
	     	   },
               {
        		  width:250,
        		  align : 'center',
	        	  field : 'summary',
	        	  title : '摘要',
	        	  editor: {
	                    type: 'textbox',
	                    options: {
	                        required: true,
	                        missingMessage: '请填入摘要！',
	                        iconWidth: 15,
	                        icons: [{
	                            iconCls: 'icon-edit',
	                            handler: function (e) { 
	                            	$("#summaryDialog").dialog("open");
	                            	console.log(e.data.target);         
	                            	var row=$('#grid').datagrid("getSelected"); 
	                            	summarydata=row.summary;
	                            	curSummary=e.data.target;
	                            	initItemGrid();
	                            	
	                            }
	                        }]
	                    }
	                }
	        	  },
	        	  {
	        		  width:250,
	        		  align : 'center',
		        	  field : 'filter',
		        	  title : '筛选条件',
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                        //required: true,
		                        //missingMessage: '请填入摘要！',
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	$("#filterDialog").dialog("open");
		                            	console.log(e.data.target);         
		                            	var row=$('#grid').datagrid("getSelected");             
		                            	filterdata=row.filter;
		                            	initFilterGrid();
		                            	curFilter=e.data.target;
		                            }
		                        }]
		                    }
		                }
		          },
	        	  {
	        		  width:150,
	        		  align : 'center',
		        	  field : 'captionName',
		        	  title : '会计科目',
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                        required: true,
		                        missingMessage: '请填入会计科目！',
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	openCaptionDialog();//打开会计科目窗口
		                            	curCaption=e.data.target;
		                            }
		                        }]
		                    }
		                }
	        	  },
	        	  {
	        		  width:100,
	        		  align : 'center',
		        	  field : 'assCode',
		        	  title : '辅助核算',
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                    	readonly:true,
		                        iconWidth: 15,
		                    }
		                }
	        	  },
	        	  {
	        		  width:150,
	        		  align : 'center',
		        	  field : 'cashFlowName',
		        	  title : '现金流量项目',
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	openCashFlowDialog();//打开会计科目窗口
		                            	curCashFlow=e.data.target;
		                            }
		                        }]
		                    }
		                }
	        	  },
	        	  {
	        		  width:100,
	        		  align : 'center',
		        	  field : 'drmnyexpr',
		        	  title : '借方金额',
		        	  /*editor:{
							type:'text',
							options:{
								valueField:'value',
								textField:'text'
								//data:[{value:"1",text:"正"},{value:"0",text:"0"},{value:"-1",text:"负"}],
								//required:true
							}
						}*/
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                       // required: true,
		                        missingMessage: '请填入借方金额！',
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	$("#dDialog").dialog("open");
		                            	console.log(e.data.target);         
		                            	var row=$('#grid').datagrid("getSelected");             
		                            	drmnyexpr=row.drmnyexpr;
		                            	initDGrid();
		                            	curD=e.data.target;
		                            }
		                        }]
		                    }
		                }
	        	  },
	        	  {
	        		  width:100,
	        		  align : 'center',
		        	  field : 'crmnyexpr',
		        	  title : '贷方金额',
		        	  /*editor:{
							type:'text',
							options:{
								valueField:'value',
								textField:'text'
								//data:[{value:"1",text:"正"},{value:"0",text:"0"},{value:"-1",text:"负"}],
								//required:true
							}
					  }*/
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                        //required: true,
		                        missingMessage: '请填入贷方金额！',
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	$("#cDialog").dialog("open");
		                            	console.log(e.data.target);         
		                            	var row=$('#grid').datagrid("getSelected");             
		                            	crmnyexpr=row.crmnyexpr;
		                            	initCGrid();
		                            	curC=e.data.target;
		                            	
		                            }
		                        }]
		                    }
		                }
	        	  },
	        	  {
	        		  width:200,
	        		  align : 'center',
		        	  field : 'remarks',
		        	  title : '备注',
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                        //required: true,
		                        //missingMessage: '请填入备注！',
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	$("#remarksDialog").dialog("open");
		                            	console.log(e.data.target);         
		                            	var row=$('#grid').datagrid("getSelected");             
		                            	remarksdata=row.remarks;
		                            	initRemarksGrid();
		                            	curRemarks=e.data.target;
		                            }
		                        }]
		                    }
		                }
	        	  },
//	        	  {
//	        		  	field:'action',title:'操作',width:120,align:'center',
//						formatter:function(value,row,index){
//							if (row.editing){
//								var s = '<a href="#" class="easyui-linkbutton btn_a" plain="true" iconCls="icon-ok" onclick="saverow(this)">确定</a> ';
//								var c = '<a href="#" class="easyui-linkbutton btn_a" plain="true" iconCls="icon-cancel" onclick="cancelrow(this)">取消</a>';
//								return s+c;
//							} else {
////								var e = '<a href="#" class="easyui-linkbutton btn_a" plain="true" iconCls="icon-edit" onclick="editrow(this)">编辑</a> ';
//								var d = '<a href="#" class="easyui-linkbutton btn_a" plain="true" iconCls="icon-remove" onclick="deleterow(this)">删除</a>';
////								return e+d;
//							}
//						}
//					}
	       ]],
	       rownumbers:true,
//	       onAfterEdit:function(index,row){
//				row.editing = false;
//				updateActions(index);
//			},
//			onBeforeEdit:function(index,row){
//				row.editing = true;
//				updateActions(index);
//			},
//			onCancelEdit:function(index,row){
//				row.editing = false;
//				updateActions(index);
//			},
			onLoadSuccess:function(data){
				$(".btn_a").linkbutton({});
			},
			onBeforeLoad:function(param)
			{
				
			}
			
	  });
}

/**
 * 分录中的会计科目列格式化。将会计科目id转换成名字。
 * 从会计科目列表中查询出对应id的名字。
 * @param v
 * @param row
 * @param index
 * @returns
 */
//TODO 
function captionFormater(v ,row ,index){
	for(var i=0;i<captionList.length;i++){
		if(captionList[i].id ==v){
			return captionList[i].subname;
		}
	}
}


function cashFlowFormater(v ,row ,index){
	for(var i=0;i<cashFlowList.length;i++){
		if(cashFlowList[i].id ==v){
			return cashFlowList[i].subname;
		}
	}
}

/**
 * 更新编辑行的操作列的状态
 * @param index
 */
function updateActions(index){
	$('#grid').datagrid('updateRow',{
		index: index,
		row:{}
	});
	$(".btn_a").linkbutton({});
}
var flag = true;//是否可编辑、新增
/**
 * 增加分录
 */
function append(){
	if(flag){
		flag = false;
		var row = {"summary":null,"subid":null,"assid":null,"assname":null,"drmnyexpr":null,"crmnyexpr":null,"remarks":null,editing:false};
		$('#grid').datagrid('appendRow',row);
		//TODO 
		var editIndex = $('#grid').datagrid('getRows').length-1;
		$('#grid').datagrid('selectRow', editIndex);
		$('#grid').datagrid('beginEdit', editIndex);
		$(".btn_a").linkbutton({});
		$(".datagrid-body").css("height","80%"); // chc add 2016.8.2 设置凭证模板分录高度以显示横向滚动条
		$(".datagrid-view2").parent().css("height","80%");
		$(".datagrid-view").css("overflow","auto");
		$(".datagrid .panel-body").css("overflow","auto");
		$(".layout-panel").css("overflow","auto");
		$(".panel").css("overflow","auto");
		$(".panel-noscroll").css("overflow","auto");
	}else{
		alert("请先保存在编辑的分录!");
	}
}

/**
 * 删除分录
 * @param target
 */
//function deleterow(target){
//	$.messager.confirm('提示','确认要删除此条分录吗?',function(r){
//		if (r){
//			var index = getRowIndex(target);
//			$('#grid').datagrid('deleteRow', index);
//			var delList = $("#grid").datagrid("getChanges","deleted");
//			var delRowsJson = JSON.stringify(delList);
//			$("#delRowsJson").val(delRowsJson);
//		}
//	});
//}

function deleterow(){
	$.messager.confirm('提示','确认要删除此条分录吗?',function(r){
//		var rows = $("#grid").datagrid("getRows");
//		for(var i=0;i<rows.length;i++){
//			var index = $("#grid").datagrid("getRowIndex",rows[i]);
//			$('#grid').datagrid('deleteRow', index);
//		}
		
		if (r){
			var row=$('#grid').datagrid("getSelected");
			var index = $("#grid").datagrid("getRowIndex",row);
			$('#grid').datagrid('deleteRow', index);
			var delList = $("#grid").datagrid("getChanges","deleted");
			var delRowsJson = JSON.stringify(delList);
			$("#delRowsJson").val(delRowsJson);
		}
	});
	$(".datagrid-body").css("height","80%"); // chc add 2016.8.2 设置凭证模板分录高度以显示横向滚动条
	$(".datagrid-view2").parent().css("height","80%");
	$(".datagrid-view").css("overflow","auto");
	$(".datagrid .panel-body").css("overflow","auto");
	$(".layout-panel").css("overflow","auto");
	$(".panel").css("overflow","auto");
	$(".panel-noscroll").css("overflow","auto");
}


/**
 * 保存当前编辑的行
 */
function saverow(target){
	
	$('#grid').datagrid('endEdit', getRowIndex(target));
	
	
}

/**
 * 编辑行
 * @param target
 */

function editrow(){
//function editrow(target){
//	$("#grid").datagrid("selectRow",getRowIndex(target));
//	$('#grid').datagrid('beginEdit', getRowIndex(target));
	if(flag){
		flag = false;
		var row=$('#grid').datagrid("getSelected");
		var index = $("#grid").datagrid("getRowIndex",row);
		$('#grid').datagrid('beginEdit', index);
		$(".datagrid-body").css("height","80%"); // chc add 2016.8.2 设置凭证模板分录高度以显示横向滚动条
		$(".datagrid-view2").parent().css("height","80%");
		$(".datagrid-view").css("overflow","auto");
		$(".datagrid .panel-body").css("overflow","auto");
		$(".layout-panel").css("overflow","auto");
		$(".panel").css("overflow","auto");
		$(".panel-noscroll").css("overflow","auto");
	}else{
		alert("请先保存在编辑的分录!");
	}
}


/**
 * 取消编辑
 * @param target
 */
function cancelrow(target){
	$('#grid').datagrid('cancelEdit', getRowIndex(target));
}

/**
 * 得到当前编辑的行号
 * @param target
 * @returns
 */
function getRowIndex(target){
	var tr = $(target).closest('tr.datagrid-row');
	return parseInt(tr.attr('datagrid-row-index'));
}


/**
 * 得到编辑过的行。
 */
function getChanges(){
	var rows = $('#grid').datagrid('getChanges');
//	alert(rows.length+' rows are changed!');
}


/**
 * 得到分录数据
 */
function getFenLuData(){
	var rows = $("#grid").datagrid("getRows");
}

/*========================================
 * END
 *========================================/




/**
 * 当点分录表格一行的时候，正在编辑的行结束编辑状态
 * @param index
 */
//function editRowBlur(index){
//	 if (editingId != undefined) {
//		var validate = $('#grid').datagrid('validateRow', editingId);
//    	if(validate){
//    		var row = $("#grid").datagrid("getSelected");
//    		
//    		//得到当前所选行的索引
//    		var index = $("#grid").datagrid("getRowIndex",row);
//    		//更新当前编辑的分录
//    		$('#grid').datagrid('updateRow',{
//    			index: index,
//    			row:row
//    		});
//    		$('#grid').datagrid('endEdit', editingId);	
//    	}else{
//    		$('#grid').datagrid('selectRow', editingId);
//    		alert('请完整的输入信息');
//    		return;
//    	}
//	 }
//}


/**
 * 打开会计科目选窗口
 */
function openCaptionDialog(){
	$("#captionDialog").dialog("open");
}

/**
 * 打开现金流量项目选窗口
 */
function openCashFlowDialog(){
	$("#cashflowDialog").dialog("open");
}


/**
 * 初始化弹出的会计科目窗口的会计科目列表。
 */
function initCaptionTreeGrid(data){
	$('#captionGrid').treegrid({
		  data:captionList,
		  singleSelect : true,
		  toolbar: '#tb',
		  idField:'id',    
		  treeField:'subcode',
		  fit:true,
	      columns : [[
	                 /* {
			        	  field : 'id',
			        	  checkbox:true
	                  },*/
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
		        	  {
		        		  width:150,
		        		  align : 'center',
			        	  field : 'assName',
			        	  title : '辅助核算'
		        	  }
		  ]],
		  rownumbers:true,
		  onClickRow:function(row){
//			  var lv = $("#captionGrid").tree("getLevel",node.target);
//			  alert(lv);


		  }
		  
	  });
}

/**
 * 初始化弹出的现金流量列表
 */
function initCashFlowTreeGrid(data){
	$('#cashflowGrid').treegrid({
		  data:cashFlowList,
		  singleSelect : true,
		  toolbar: '#tb',
		  idField:'id',    
		  treeField:'subcode',
		  fit:true,
	      columns : [[
	                 /* {
			        	  field : 'id',
			        	  checkbox:true
	                  },*/
	                  {
		        		  width:150,
			        	  field : 'subcode',
			        	  title : '编码'
		        	  },
		        	  {
		        		  width:200,
			        	  field : 'subname',
			        	  title : '名称'
		        	  }
		        	  
		  ]],
		  rownumbers:true,
		  onClickRow:function(row){

		  }
		  
	  });
}

/**
 * 科目选择对话框确认按钮点击时调用。将选中的会计科目赋值到分录中
 */
function captionSelect(){		
	var captionRow = $("#captionGrid").treegrid("getSelected");
	if(!captionRow){
		$.messager.alert('提示','请选择一个科目');   
	}else{
		var row = $("#grid").datagrid("getSelected");
		//得到当前所选行的索引
		var index = $("#grid").datagrid("getRowIndex",row);
		//将选择的会计科目设置到输入框
        $(curCaption).textbox('setText', captionRow.subname);
        row.captionId = captionRow.id
        //TODO 设置辅助核算,应该设置id。
        $(curCaption).parents("td[field=captionName]").next("td").find("input[type=text]").val(captionRow.assName)
        $(curCaption).parents("td[field=captionName]").next("td").find("input[type=hidden]").val(captionRow.assName)
        row.assCode = captionRow.assName;
        
        $("#captionDialog").dialog("close");
//        $('#grid').datagrid("getRows")[editingId].subid = data.id;
//        $('#grid').datagrid("getRows")[editIndex].assCode = captionRow.assName;
//        $("#grid").datagrid("endEdit",editIndex);
	}
}


/**
 * 现金流量项目选择对话框确认按钮点击时调用。将选中的现金流量项目赋值到分录中
 */
function cashflowSelect(){		
	var cashflowRow = $("#cashflowGrid").treegrid("getSelected");
	if(!cashflowRow){
		$.messager.alert('提示','请选择一条现金流量项目');   
	}else{
		var row = $("#grid").datagrid("getSelected");
		//得到当前所选行的索引
		var index = $("#grid").datagrid("getRowIndex",row);
		//将选择的现金流量设置到输入框
        $(curCashFlow).textbox('setText', cashflowRow.subname);
        row.cashFlowId = cashflowRow.id;
        row.cashFlowCode = cashflowRow.subcode;
      
        $("#cashflowDialog").dialog("close");

	}
}

/**
 * 当科目窗口关闭时调用。取消所有的选择的。
 */
function captionDialogClose(){
	$("#captionGrid").treegrid("unselectAll");
}

function cashflowDialogClose(){
	$("#cashflowGrid").treegrid("unselectAll");
}
/**
 * 初始化摘要中的单据字段列表
 */
function initItemGrid(){
	$("#summary_").val(summarydata);
	$("#gd_xm").datagrid({
		fit:true,
		data:billFieldJson,
		fitColumns:true,
		singleSelect:true,
		columns:[[    
		          {field:'code',title:'代码'},    
		          {field:'name',title:'名字'}    
		      ]],
		onSelect:function(index,rowData){
			$("#summary_").insertAtCursor("{!"+rowData.code+":"+rowData.name+";}");
			//$("#summary_").val("{"+rowData.code+":"+rowData.name+"}");
			
		}
	});
}


/**
 * 初始化摘要中的单据字段列表
 */
function initFilterGrid(){
	$("#filter_").val(filterdata);
	$("#gd_f").datagrid({
		fit:true,
		data:billFieldJson,
		fitColumns:true,
		singleSelect:true,
		columns:[[    
		          {field:'code',title:'代码'},    
		          {field:'name',title:'名字'}    
		      ]],
		onSelect:function(index,rowData){
			$("#filter_").insertAtCursor("{!"+rowData.code+":"+rowData.name+";}");
			//$("#summary_").val("{"+rowData.code+":"+rowData.name+"}");
			
		}
	});
}


/**
 * 初始化备注中的单据字段列表
 */
function initRemarksGrid(){
	$("#remarks_").val(remarksdata);
	$("#gmr_xm").datagrid({
		fit:true,
		data:billFieldJson,
		fitColumns:true,
		singleSelect:true,
		columns:[[    
		          {field:'code',title:'代码'},    
		          {field:'name',title:'名字'}    
		      ]],
		onSelect:function(index,rowData){
			$("#remarks_").insertAtCursor("{!"+rowData.code+":"+rowData.name+";}");
			
		}
	});
}


/**
* 初始化借方金额的单据列表
*/
function initDGrid(){
	$("#d_").val(drmnyexpr);
	$("#gd_d").datagrid({
		fit:true,
		data:billFieldJson,
		fitColumns:true,
		singleSelect:true,
		columns:[[    
		          {field:'code',title:'代码'},    
		          {field:'name',title:'名字'}    
		      ]],
		onSelect:function(index,rowData){
			$("#d_").insertAtCursor("{!"+rowData.code+":"+rowData.name+";}");
			//$("#summary_").val("{"+rowData.code+":"+rowData.name+"}");
			
		}
	});
}

/**
* 初始化贷方金额的单据列表
*/
function initCGrid(){
	$("#c_").val(crmnyexpr);
	$("#gd_c").datagrid({
		fit:true,
		data:billFieldJson,
		fitColumns:true,
		singleSelect:true,
		columns:[[    
		          {field:'code',title:'代码'},    
		          {field:'name',title:'名字'}    
		      ]],
		onSelect:function(index,rowData){
			$("#c_").insertAtCursor("{!"+rowData.code+":"+rowData.name+";}");
			//$("#summary_").val("{"+rowData.code+":"+rowData.name+"}");
		}
	});
}

/**
 * 摘要编辑对话框确定按钮点击
 */
function summarySelect(){
//	var ed = $('#grid').datagrid('getEditor', {index:editIndex,field:'summary'});
	//summarydata = $("#summary_").val();
	var row=$('#grid').datagrid("getSelected"); 
	row.summary = $("#summary_").val();
    $(curSummary).textbox('setText', $("#summary_").val());
    $("#summaryDialog").dialog("close");
}


/**
 * 筛选条件编辑对话框确定按钮点击
 */
function filterSelect(){
//	var ed = $('#grid').datagrid('getEditor', {index:editIndex,field:'summary'});
	var row=$('#grid').datagrid("getSelected");
	row.filter = $("#filter_").val();
    $(curFilter).textbox('setText', $("#filter_").val());
    $("#filterDialog").dialog("close");
}

/**
 * 备注编辑对话框确定按钮点击
 */
function remarksSelect(){
	var row=$('#grid').datagrid("getSelected");
	row.remarks = $("#remarks_").val();
	$(curRemarks).textbox('setText', $("#remarks_").val());
    $("#remarksDialog").dialog("close");
}

/**
 * 借方金额编辑对话框确定按钮点击
 */
function dSelect(){
//	var ed = $('#grid').datagrid('getEditor', {index:editIndex,field:'summary'});
	var row=$('#grid').datagrid("getSelected");
	row.drmnyexpr = $("#d_").val();
    $(curD).textbox('setText', $("#d_").val());
    $("#dDialog").dialog("close");
}

/**
 * 贷方金额编辑对话框确定按钮点击
 */
function cSelect(){
//	var ed = $('#grid').datagrid('getEditor', {index:editIndex,field:'summary'});
	var row=$('#grid').datagrid("getSelected");
	row.crmnyexpr = $("#c_").val();
    $(curC).textbox('setText', $("#c_").val());
    $("#cDialog").dialog("close");
}

/**
 * 打开筛选表达式编辑对话框
 */
function openExpression(){
	$("#expression").val($("#condition").val());
	$("#ex_dialog").dialog("open");
}

/**
 * 将编辑的表达式赋值到筛选条件输入框 
 */
function saveExpression(){
	if($("#expression").val().length==0){
		$.messager.alert('提示','请编辑表达式','warning');
		return ;
	}
	$("#condition").val($("#expression").val());
	$("#ex_dialog").dialog("close");
}

/**
 * 保存分录模板
 */
function saveVoucherTemp(){
	var rows = $("#grid").datagrid("getRows");
	var row = $("#grid").datagrid("getSelected");
	var index1 = $("#grid").datagrid("getRowIndex",row);
	for(var i=0;i<rows.length;i++){
		var index = $("#grid").datagrid("getRowIndex",rows[i]);
		if(index1 == index){
			$('#grid').datagrid('endEdit', index);
			if(rows[i].captionId=="" || rows[i].captionName=="" || typeof(rows[i].captionId)=="undefined" || typeof(rows[i].captionName)=="undefined"){
				alert("请选择会计科目！");
				return false;
			}
		}
	}
	//var rowsJson = JSON.stringify(rows);
	var rowsJson = JSON.stringify(row);
	$("#fenLuJson").val(rowsJson);//将分录数据的json形式放到一个文本域中。
	$('#frm').form({    
	    onSubmit: function(){    
	    },    
	    success:function(data){ 
	    	data = $.parseJSON(data);
	       if(data.success){
	    	   $("#id").val(data.templateid);
	    	   $.messager.alert('信息','保存成功！','info');
	       }else{
	    	   $.messager.alert('信息','保存失败！','error');
	       }  
	    }    
	});    

	$('#frm').submit();
	$('#grid').datagrid('clearSelections');
	$(".datagrid-body").css("height","80%"); // chc add 2016.8.2 设置凭证模板分录高度以显示横向滚动条
	$(".datagrid-view2").parent().css("height","80%");
	$(".datagrid-view").css("overflow","auto");
	$(".datagrid .panel-body").css("overflow","auto");
	$(".layout-panel").css("overflow","auto");
	$(".panel").css("overflow","auto");
	$(".panel-noscroll").css("overflow","auto");
	flag = true;
}


function tabOnSelect(title,index){
	var tab = $('#tt').tabs('getTab',index); 
	var url = tab.attr("url");
	var frameId = tab.attr("frameId");
	/*var row = $("#zt").datagrid("getSelected");
	if(!row){
		return;
	}
	url+=row.id;*/
	
	url += global.accountSetId;
    
	$("#"+frameId).attr("src",url);
	
	 $('#'+frameId).treegrid({
		  url:url,
		  singleSelect : true,
		  idField:'id',  
		  treeField:'subcode',
		  fit:true,
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
		        	  {
		        		  width:300,
		        		  align : 'center',
			        	  field : 'assName',
			        	  title : '辅助核算'
		        	  }
		  ]],
		  rownumbers:false
	  });
   
	
	

}


//jquery扩展在光标处插入内容/////////////
$.fn.extend({
    insertAtCursor : function(myValue) {
        var $t = $(this)[0];
        if (document.selection) {
            this.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
        } else if ($t.selectionStart || $t.selectionStart == '0') {
            var startPos = $t.selectionStart;
            var endPos = $t.selectionEnd;
            var scrollTop = $t.scrollTop;
            $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
            this.focus();
            $t.selectionStart = startPos + myValue.length;
            $t.selectionEnd = startPos + myValue.length;
            $t.scrollTop = scrollTop;
        } else {
            this.value += myValue;
            this.focus();
        }
    }
});

function reloadTree(){
	loadTree();
	//$("#grid tr:not(:first)").html("");
	
	$("#bmid_name").attr("value","");
	$("#bmid").attr("value","");
	
	$("#condition").attr("value","");
	$("#note").attr("value","");
	$("#boid_name").combobox('setValue',"");
	
	$("#flag").attr("value","");
	$("#accountSetId").val(global.accountSetId);
	
	$("#id").attr("value",null);
	//$("#grid  tr:not(:first)").html("");

	//alert($('#grid').datagrid("url"));
	var rows=$("#grid").datagrid("getRows");
	var index=rows.length;
	
	while(index>0){
		 $("#grid").datagrid("deleteRow",0);
		 rows=$("#grid").datagrid("getRows");
		 index=rows.length;
	}
	
}

/**
 * 导出
 */
function exportVoucher(){
	window.location.href="FiVoucherTempType!exportPr.do?accountSetCode="+global.accountSetCode+"&sysId="+global.sysId+"&accountSetId="+global.accountSetId+"&companyId="+companyId;
}

function importVoucher(){
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
		url:"FiVoucherTempType!importPr.do?accountSetCode="+global.accountSetCode+"&sysId="+global.sysId+"&accountSetId="+global.accountSetId+"&companyCode="+companyCode+"&companyId="+companyId,
		
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
