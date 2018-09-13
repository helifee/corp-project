
var fiSysInfoWindow;
var fiExpressionWindow;
var fiAsWindow;
var fiExpressionWindow_summary;
var fiExpressionWindow_drmnyexpr;
var fiExpressionWindow_crmnyexpr;
$(function(){
	
	//业务对象开窗
	fiSysInfoWindow = new TemplateWindow({
		"id":"fiSysInfoWindow",
		"title":'业务对象',
		"templateUrl":contextPath+"/page/dialog/grid.jsp?model=FiSysInfoRef",
		"baseParams":{},
		"width":500,
		"okCallback":function(data){
			$('#sysSearch').textbox("setValue",data.vtargetsysname);
			//将选中的财务系统id值设置到页面的对应隐藏域中
			$('#fisysinfoid').val(data.id);
			$('#grid').datagrid('loadData',[]);
			$('#tree').tree("options").url = contextPath+'/CorpMapping!loadficorp.do'+'?fisysinfoid='+data.id;
			$('#tree').tree("reload");
		}
	});
	
	/**
	 * 公式编辑窗口定义
	 */
	fiExpressionWindow = new TemplateWindow({
		"id":"fiExpressionWindow",
		"title":'公式编辑',
		"templateUrl":contextPath+"/page/FiExpression/FiExpression-dialog.jsp",
		"baseParams":{},
		"width":800,
		"okTitle":'确认',
		"height":$(document).height(),
		"okCallback":function(data){
			$('#condition').attr('value',data);
		}
	});
	
	fiExpressionWindow_summary = new TemplateWindow({
		"id":"fiExpressionWindow_summary",
		"title":'公式编辑',
		"templateUrl":contextPath+"/page/FiExpression/FiExpression-dialog.jsp",
		"baseParams":{},
		"width":800,
		"okTitle":'确认',
		"height":$(document).height(),
		"okCallback":function(data){
			var ed = $('#grid').datagrid('getEditor', {index:editingId,field:'summary'});
            $(ed.target).textbox('setText', data);
		}
	});
	
	fiExpressionWindow_drmnyexpr = new TemplateWindow({
		"id":"fiExpressionWindow_drmnyexpr",
		"title":'公式编辑',
		"templateUrl":contextPath+"/page/FiExpression/FiExpression-dialog.jsp",
		"baseParams":{},
		"width":800,
		"okTitle":'确认',
		"height":$(document).height(),
		"okCallback":function(data){
			var ed = $('#grid').datagrid('getEditor', {index:editingId,field:'drmnyexpr'});
            $(ed.target).textbox('setText', data);
		}
	});
	
	fiExpressionWindow_crmnyexpr = new TemplateWindow({
		"id":"fiExpressionWindow_crmnyexpr",
		"title":'公式编辑',
		"templateUrl":contextPath+"/page/FiExpression/FiExpression-dialog.jsp",
		"baseParams":{},
		"width":800,
		"okTitle":'确认',
		"height":$(document).height(),
		"okCallback":function(data){
			var ed = $('#grid').datagrid('getEditor', {index:editingId,field:'crmnyexpr'});
            $(ed.target).textbox('setText', data);
		}
	});
	
	//业务对象开窗
	businessObjectWindow = new TemplateWindow({
		"id":"businessObjectWindow",
		"title":'业务对象',
		"templateUrl":contextPath+"/page/dialog/grid.jsp?model=formBORef",
		"baseParams":{},
		"width":500,
		"okCallback":function(data){
			$('#boid_name').textbox("setValue",data.vobject);
			$('#boid').val(data.id);
            
		}
		
	});
	
	
	fiAsWindow = new TemplateWindow({
		"id":"fiAsWindow",
		"title":'会计科目',
		"templateUrl":contextPath+"/page/dialog/treegrid.jsp?model=fiAccSubRef",
		"baseParams":{},
		"width":600,
		"okCallback":function(data){
			var ed = $('#grid').datagrid('getEditor', {index:editingId,field:'subid_name'});
            $(ed.target).textbox('setText', data.subname);
            $('#grid').datagrid("getRows")[editingId].subid = data.id;
            $('#grid').datagrid("getRows")[editingId].vsstypename = data.asstypename;
            
		}
	});
	
	//项目搜索框
	$('#sysSearch').textbox({ 
		editable:false,
        missingMessage: '请选择财务系统！',
        iconWidth: 15,
        icons: [{
            iconCls: 'icon-search',
            handler: function (e) {                
            	fiSysInfoWindow.openWindow();
            }
        }]
		}) 
		

	/**
	 * 	业务对象输入框 
	 */
	$('#boid_name').textbox({ 
		editable:false,
        missingMessage: '请选择业务对象！',
        iconWidth: 15,
        icons: [{
            iconCls: 'icon-search',
            handler: function (e) {                
            	businessObjectWindow.openWindow();
            }
        }]
	}) 
	
	/**
	 * 左侧“财务系统公司”树初始化
	 */
	$('#tree').tree({
		 cascadeCheck:false,
		 lines:true,
		 animate:true,
		 onSelect:function(node){
			 //选中节点时候调用
			 if(node.id != -1){
				 //设置加载业务类型的地址.参数fisysinfoid为财务系统id，targsyscorpid为财务系统公司id。
				 $('#tree1').tree("options").url = contextPath+'/FiBM!load.do'+'?fisysinfoid='+$('#fisysinfoid').val()+'&targsyscorpid='+node.id;
				 $('#tree1').tree("reload");
			 }else{
				 clearData();
			 }
		 }
	  });
	
	/**
	 * "业务类型"树初始化
	 */
	
	$('#tree1').tree({
		 cascadeCheck:false,
		 lines:true,
		 animate:false,
		 onSelect:function(node){
			 //选中节点时候调用
			 if(node.id == -1){
				 clearData();
			 }else{
				 loadGrid(node.id); 
			 }
			 
		 },
		 onContextMenu:function(e, node){
				e.preventDefault();
				var id = node.id;
					var rightbuttonobj =  $('#rightclickdiv');
					rightbuttonobj.menu('show', {
						left: e.pageX,
						 top: e.pageY
					});
					rightbuttonobj.menu({
						 onClick:function(item){
							 if( item.name == '001' ){
								 var nodeid = appendnode(node);
								 var newnode = $('#tree').tree('find',nodeid);
									// $('#tree1').tree('beginEdit',newnode.target);
									 setCursorPos(nodeid);
							 }else if( item.name == '002' ){
								 if(id == -1){
										return;
									}
								 oldnodename = node.text;
								 $('#tree1').tree('beginEdit',node.target);
								 var nodeid=node.id;
								 setCursorPos(nodeid);
							 }else if(item.name == '003' ){
								 if(id == -1){
										return;
									}
								 
								 $.ajax({
										type : "POST",
										url : contextPath+'/FiBM!delete.do',
										data : {"id":node.id},
										dataType : "json",
										async: false,
										success : function(data, textStatus, jqXHR) {
											if (data.success) {
												 $('#tree1').tree('remove', node.target);
											} else {
												alert(data.msg);
											}
										},
										error : function(jqXHR, textStatus, errorThrown) {
											$('body').unmask();
											alert("网络故障！");
										},
										dataType : "json"
									});
								 
								
							 }
						 } 
				 });
				
			},
			onAfterEdit:function(node){
				
				var nodedata={"createDate":node.createDate,"createUserId":node.createUserId,"editDate":node.editDate,
						"editUserId":node.editUserId,"fisysinfoid":node.fisysinfoid,"id":node.id,"name":node.text,
						"pid":node.pid,"sort":node.sort,"state":node.state,"status":node.status,"targsyscorpid":node.targsyscorpid,
						"text":node.text
				};
				 $.ajax({
						type : "POST",
						url : contextPath+'/FiBM!save.do',
						data : {"businessMold":JSON.stringify(nodedata)},
						dataType : "json",
						async: false,
						success : function(data, textStatus, jqXHR) {
							if (data.success) {
								 $('#tree1').tree('update',node);
							} else {
								alert(data.msg);
							}
						},
						error : function(jqXHR, textStatus, errorThrown) {
							$('body').unmask();
							alert("网络故障！");
						},
						dataType : "json"
					});
				
				
			}
		
	  });
	
	
	//新增和修改结点名称时自动全选结点名称
	var setCursorPos = function(nodeid){
		var parnote=$("div[node-id='"+nodeid+"']");
		var titlespannote=$(parnote).children(".tree-title");
		var titleinput= $(titlespannote).children("input");		
		var e1=titleinput[0];
		//e1.select();
	}
	
	function appendnode(node){
		var nodeid = node.id;
		var newid = nodeid+"qqq";
		var fisysinfoid = $('#fisysinfoid').val();
		var treenode = $('#tree').tree("getSelected");
		var targsyscorpid = '';
		if(treenode)
		targsyscorpid = treenode.id;
		
		var newnode = null;
		 $.ajax({
				type : "POST",
				url : contextPath+'/FiBM!add.do',
				data : {"pid":node.id,"fisysinfoid":fisysinfoid,"targsyscorpid":targsyscorpid},
				dataType : "json",
				async: false,
				success : function(data, textStatus, jqXHR) {
					if (data) {
						newnode = data;
						newnode.checked = true;
					} else {
						alert(data.msg);
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("网络故障！");
				},
				dataType : "json"
			});
		
		
		$('#tree1').tree('append',{
			parent: (node?node.target:null),
			data:[newnode]
		});
		return newnode.id;
	}
	
	 $('#grid').datagrid({
		  singleSelect : true,
		  toolbar: '#tb2',
		  fit:true,
         columns : [[{
			         field : 'ck',
	   		         checkbox:true
   		     		},
                     {
		        		  width:150,
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
			                            iconCls: 'icon-search',
			                            handler: function (e) { 
			                            	var ed = $('#grid').datagrid('getEditor', {index:editingId,field:'summary'});
			                            	var text = $(ed.target).textbox('getText');
			                            	fiExpressionWindow_summary.templateUrl = contextPath+"/page/FiExpression/FiExpression-dialog.jsp?expression="+encodeURIValue(text),
			                            	fiExpressionWindow_summary.baseParams =  {boid:$('#boid').val()};
			                            	fiExpressionWindow_summary.openWindow();
			                            }
			                        }]
			                    }
			                }
		        	  },
		        	  {
		        		  width:150,
		        		  align : 'center',
			        	  field : 'subid_name',
			        	  title : '会计科目',
			        	  editor: {
			                    type: 'textbox',
			                    options: {
			                        required: true,
			                        missingMessage: '请填入会计科目！',
			                        iconWidth: 15,
			                        icons: [{
			                            iconCls: 'icon-search',
			                            handler: function (e) { 
			                            	fiAsWindow.baseParams = getParams();
			                            	fiAsWindow.openWindow();
			                            }
			                        }]
			                    }
			                }
		        	  },
		        	  {
		        		  width:100,
		        		  align : 'center',
			        	  field : 'vsstypename',
			        	  title : '辅助核算'
		        	  },
		        	  {
		        		  width:100,
		        		  align : 'center',
			        	  field : 'drmnyexpr',
			        	  title : '借方金额',
			        	  editor: {
			                    type: 'textbox',
			                    options: {
			                        iconWidth: 15,
			                        icons: [{
			                            iconCls: 'icon-search',
			                            handler: function (e) { 
			                            	var ed = $('#grid').datagrid('getEditor', {index:editingId,field:'drmnyexpr'});
			                            	var text = $(ed.target).textbox('getText');
			                            	fiExpressionWindow_drmnyexpr.templateUrl = contextPath+"/page/FiExpression/FiExpression-dialog.jsp?expression="+encodeURIValue(text),
			                            	fiExpressionWindow_drmnyexpr.baseParams =  {boid:$('#boid').val()};
			                            	fiExpressionWindow_drmnyexpr.openWindow();
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
			        	  editor: {
			                    type: 'textbox',
			                    options: {
			                        iconWidth: 15,
			                        icons: [{
			                            iconCls: 'icon-search',
			                            handler: function (e) { 
			                            	var ed = $('#grid').datagrid('getEditor', {index:editingId,field:'crmnyexpr'});
			                            	var text = $(ed.target).textbox('getText');
			                            	fiExpressionWindow_crmnyexpr.templateUrl = contextPath+"/page/FiExpression/FiExpression-dialog.jsp?expression="+encodeURIValue(text),
			                            	fiExpressionWindow_crmnyexpr.baseParams =  {boid:$('#boid').val()};
			                            	fiExpressionWindow_crmnyexpr.openWindow();
			                            }
			                        }]
			                    }
			                }
		        	  }        	  
   	  ]],
   	  rownumbers:true,
   	  onDblClickRow:gridEdit,
	  onClickRow:blur
	  });
	
	
	
})


/**
 * 加载凭证模板
 * @param bmid 业务模板类型id
 */
function loadGrid(bmid){
	$.post(contextPath+'/FiVT!edit.do',{"bmid":bmid},function(data){
		var voucherTemplate = data.voucherTemplate;
		$('#bmid').val(voucherTemplate.bmid);
		$('#boid').val(voucherTemplate.boid);
		$('#condition').attr("value",voucherTemplate.filter);
		$('#flag').val(voucherTemplate.flag);
		$('#id').val(voucherTemplate.id);
		$('#note').val(voucherTemplate.note);
		$('#bmid_name').html(voucherTemplate.bmid_name);
		$('#boid_name').textbox("setValue",voucherTemplate.boid_name);
		$('input[name="voucherTemplate.status"]').each(function(){
			if(this.value == voucherTemplate.status){
				$(this).prop("checked",true);
			}else if(this.value == voucherTemplate.status){
				$(this).prop("checked",true);
			}
		})
		if(data.voucherEntryList){
			$('#grid').datagrid('loadData',data.voucherEntryList);	
		}else{
			$('#grid').datagrid('loadData',[]);
		}
		
		$('#save').show();
	})
}



function closeDialog(dialogId) {
    $('#' + dialogId).dialog('close');
}

/**
 * 打开公式编辑窗口
 */
function openExpression(){
	fiExpressionWindow.templateUrl = contextPath+"/page/FiExpression/FiExpression-dialog.jsp?expression="+encodeURIValue($('#condition').attr('value')),
	fiExpressionWindow.baseParams = {boid:$('#boid').val()};
	fiExpressionWindow.openWindow();
}

function editFibm(){
	var node = $('#tree1').tree("getSelected");
}

var newFibm = function(id){
	var fisysinfoid = $('#fisysinfoid').val();
	var node = $('#tree').tree("getSelected");
	var targsyscorpid = '';
	if(node)
	targsyscorpid = node.id;
	if(!(targsyscorpid+"" && fisysinfoid)){
		alert('x');
		return;
	}
	dialoginit({
        self: '#newDialog',
        iframe:contextPath+'/FiBM!edit.do?fisysinfoid='+fisysinfoid+'&targsyscorpid='+targsyscorpid+(id != null ? '&id='+id : '') ,
        size:'small',
        modal: true,
        title: '业务类型编辑',
        onClose: function() {
            $(this).dialog('destroy');
        }
    });
   
    $('#newDialog').dialog('open');
  
};

var editFibm = function(){
	var node = $('#tree1').tree("getSelected");
	    if(node == null || node.id != -1) {
	        ashow('请x选择要修改的一条数据！');
	        return;
	    }
	    newFibm(node.id);
}

function delFibm(){
	var node = $('#tree1').tree("getSelected");
	 $.ajax({
			type : "POST",
			url : "FiBM!delete.do",
			data : {id:node.id},
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

function addVoucherEntry(){
	if(editingId != null){
		var validate = $('#grid').datagrid('validateRow', editingId);
    	if(validate){
    		$('#grid').datagrid('endEdit', editingId);	
    		editingId = null;
    	}else{
    		$('#grid').datagrid('selectRow', editingId);
    		alert('请完整的输入信息');
    		return;
    	}
	}
	var row = {"summary":null,"subid":null,"assid":null,"assname":null,"drmnyexpr":null,"crmnyexpr":null};
	$('#grid').datagrid('insertRow',{index:0,row:row});
}

function delVoucherEntry(){
	if(editingId != null){
		var validate = $('#grid').datagrid('validateRow', editingId);
    	if(validate){
    		$('#grid').datagrid('endEdit', editingId);	
    		editingId = null;
    	}else{
    		$('#grid').datagrid('selectRow', editingId);
    		alert('请完整的输入信息');
    		return;
    	}
	}
	
	
	var rows = $('#grid').datagrid('getSelections');
	if(rows != null && rows.length){
		for(var i = 0,length = rows.length;i < length ; i++){
			$('#grid').datagrid('deleteRow',$('#grid').datagrid('getRowIndex',rows[i]));
		}
	}else{
		alert('请选择要删除的数据');
	}
}

var editingId = null;
function gridEdit(index){
    if (editingId != null) {
    	var validate = $('#grid').datagrid('validateRow', editingId);
    	if(validate){
    		$('#grid').datagrid('endEdit', editingId);	
    	}else{
    		$('#grid').datagrid('selectRow', editingId);
    		alert('请完整的输入信息');
    		return;
    	}
        
    }
        editingId = index;
        $('#grid').datagrid('beginEdit', editingId);
}

function blur(index){
	 if (editingId != undefined) {
		 var validate = $('#grid').datagrid('validateRow', editingId);
	    	if(validate){
	    		$('#grid').datagrid('endEdit', editingId);	
	    	}else{
	    		$('#grid').datagrid('selectRow', editingId);
	    		alert('请完整的输入信息');
	    		return;
	    	}
	    }
}


function save(){
	 $('body').mask("数据保存中...");
	    if (editingId != undefined) {
	        $('#grid').datagrid('endEdit', editingId);
	    }
	   var rows = $('#grid').datagrid('getRows');
	   $('#boFieldInfoList').val(JSON.stringify(rows));
	   $('#boFieldInfoList_delete').val(JSON.stringify($('#grid').datagrid('getChanges','deleted')));
	    $.ajax({
			type : "POST",
			url : "FiVT!save.do",
			data : $('#frm').serialize(),
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					loadGrid($('#tree1').tree('getSelected').id);
				} else {
					alert(data.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("网络故障！");
			},
			dataType : "json"
		});
}

function getParams(){
	var param = {};
	var node=$('#tree').tree('getSelected');
	if(node && node!='null'){
		param.targsyscorpid=node.id;
	}
	param.fisysinfoid = $('#fisysinfoid').val();
	return param;
}

function queryTree(){
	$('#tree1').tree("reload");
}

function clearData(){
			$('#bmid').val('');
			$('#boid').val('');
			$('#condition').attr("value",'');
			$('#flag').val('');
			$('#id').val('');
			$('#note').val('');
			$('#bmid_name').html('');
			$('#boid_name').textbox("setValue",'');
			$('input[name="voucherTemplate.status"]').each(function(){
				
					$(this).prop("checked",false);
				
			})
		
				$('#grid').datagrid('loadData',[]);
			
			$('#save').hide();
			
	
}

function encodeURIValue(value){
	return encodeURI(encodeURI(value)).replace(/\&/g,"%26").replace(/\+/g,"%2B");
	
}
