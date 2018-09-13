<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>菜单管理——启用数据</title>
	<jsp:include  page='${ctx}/pages/common/tags.jsp'></jsp:include>
	<script type="text/javascript">
	$(function(){
		var url = "${ctx}/menu/tree";
		var _columns = [[{field:'text',title:'菜单名称',width:'300'},   
				       {field:'url',title:'菜单URL',width:'300'}, 
				       {field:'location',title:'菜单位置',width:'300'}
				      ]];
		var $grid = $('#module').treegrid({   
		    url:url,
		    idField:'id',
		    treeField:'text',   
		    columns:_columns,
		});  

		$('#location').combobox({
			valueField: 'label',
			textField: 'value',
			data:[{
				label: 'portal',
				value: '门户'
			},{
				label: 'platform',
				value: '平台'
			}],
			onSelect:function(record){
				var url = '';
				if(record.value == '门户'){
					url='../../data/menu1.json';
				}else{
					url='../../data/menu.json';
				};
				$grid.treegrid({
					url:url,	
		    		method:'get',    
		    		idField:'id',
		    		treeField:'text',   
		    		columns:_columns,
				});
			}
		});
	})

	function removeMenu(){
		var row = $('#module').treegrid("getSelected");
		if(row == null){
			$.messager.alert("提示","请选中需要删除的菜单。");
		}else{
			$.messager.confirm("确定","您确定要删除该菜单吗？",function(r){
				if(r){
					$.ajax({
						url:'../../data/form.json',
						method:'get',
						cache:false,
						data:row.id,
						success:function(data){
							if(data.code == 1){
								$.messager.show({
									title:'提示',
									msg:data.desc
								});
							}else{
								$.messager.show({
									title:'提示',
									msg:data.desc
								});
							}
						}
					});
				}
			})
		}
	}

	function showMenu(){
		var row = $('#module').treegrid("getSelected");
		if(row == null){
			$.messager.alert("提示","请选中需要查看的菜单。");
		}else{
			parent.$.modalDialog({
				title:'菜单详情',
				width:'600',
				height:'400',
				href:'menuDetail.html',
				onLoad:function(){
					var f = parent.$.modalDialog.handler.find("#ff");
					f.form('load','../../data/menuDetail.json?id='+row.id);
				}
			})
		}
	}

	function editMenu(){
		var row = $('#module').treegrid("getSelected");
		if(row == null){
			$.messager.alert("提示","请选中需要查看的菜单。");
		}else{
			parent.$.modalDialog({
				title:'编辑菜单',
				width:'800',
				height:'400',
				href:'menuEdit.html',
				onLoad:function(){
					var f = parent.$.modalDialog.handler.find("#ff");
					f.form('load','../../data/menuAdd.json');
					f.find("input[id=location]").combobox({
						valueField: 'label',
						textField: 'value',
						data:[{
							label: 'portal',
							value: '门户'
						},{
							label: 'platform',
							value: '平台'
						}],
						panelHeight:'auto'
					});
					f.form({
						onLoadSuccess:function(data){
							setTimeout(function() {
								var operations = data.operations;
								if(operations.length > 0){
									for(var i=0;i<=operations.length-1;i++){
										$('#operation').combogrid('grid').datagrid("selectRecord",operations[i].id);
										if(i<operations.length-1){
											$('#selectedOperation').append(operations[i].name+',');	
										}else{
											$('#selectedOperation').append(operations[i].name);	
										}
									}
								}
							}, 1000);
							
						}
					});
				},
				buttons:[{
					text:"保存",
					handler:function(){
						var f = parent.$.modalDialog.handler.find("#ff");
						f.attr("action",'../../data/form.json?id'+row.id);
						f.submit();
					}
				},{
					text:"取消",
					handler:function(){
						parent.$.modalDialog.handler.dialog('destroy');
						parent.$.modalDialog.handler = undefined;
					}
				}]
			})
		}
	}

	function addMenu(){
		parent.$.modalDialog({
			title:'添加菜单',
			width:'600',
			height:'400',
			href:'menuAdd.jsp',
			onLoad:function(){
				var f = parent.$.modalDialog.handler.find("#ff");
				f.find("input[id=location]").combobox({
					valueField: 'label',
					textField: 'value',
					data:[{
						label: 'portal',
						value: '门户'
					},{
						label: 'platform',
						value: '平台'
					}],
					panelHeight:'auto'
				});
			},
			buttons:[{
					text:"保存",
					handler:function(){
						var f = parent.$.modalDialog.handler.find("#ff");
// 						f.attr("action",'/myproject/test');
						f.attr("action",'${ctx}/menu/add');
						f.submit();
					}
				},{
					text:"取消",
					handler:function(){
						parent.$.modalDialog.handler.dialog('destroy');
						parent.$.modalDialog.handler = undefined;
					}
				}]
		})
	}
	</script>
</head>
<body>
    <!-- 头部加载内容-->
	 <div id="toolbar" style="padding:5px" class="clearfix toolbar">
	  	<!-- 查询按钮 条件-->
		 <form id="searchForm" method="post" class="searchForm">	
			<table>
				<tr>
					<td>
						<label>菜单位置</label>
						<input id="location" name="location" value="门户" type="text" class="easyui-combobox" data-options="panelHeight:'auto',editable:false"/>
					</td>
					<td>
	    				<a href="javascript:void(0);" class="easyui-linkbutton"  data-options="iconCls:'icon-add'" onclick="addMenu()" >添加菜单</a>
	    				<a href="javascript:void(0);" class="easyui-linkbutton"  data-options="iconCls:'icon-edit'" onclick="editMenu()" >编辑菜单</a>
	    				<a href="javascript:void(0);" class="easyui-linkbutton"  data-options="iconCls:'icon-remove'" onclick="removeMenu()" >删除菜单</a>
	    				<a href="javascript:void(0);" class="easyui-linkbutton"  data-options="iconCls:'icon-search'" onclick="showMenu()" >菜单详情</a>
					</td>
				</tr>
			</table>	
		</form>
	 </div>
	<!-- 列表 -->
	<table id='module'></table>
    
</body>
</html>