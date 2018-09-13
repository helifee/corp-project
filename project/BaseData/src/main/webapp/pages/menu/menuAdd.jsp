<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<script type="text/javascript">
$(function(){
	$("#ff").form({
		onSubmit : function() {
			var ids = '';
			var rows = $('#operation').combogrid('grid').datagrid("getSelections");
			if(rows.length>0){
				for(var i=0;i<=rows.length-1;i++){
					if(i!=rows.length-1){
						ids += rows[i].id+",";
					}else{
						ids += rows[i].id;
					}
				}
				$("input[name=operation]").attr('value',ids);
			}
			if($(this).form('validate')){
			  parent.$.messager.progress({
	            title : '提示',
	            text : '正在处理，请稍后....'
		      });
				return true;
			}else{
				return false;
			}
		},
		success : function(result) {
			$.messager.progress('close');
			if (result){
				//成功后处理
				if(result.code =='1'){
					parent.$.modalDialog.handler.dialog('close');
					$("#module").treegrid('reload');
					parent.$.messager.show({
						title : "提示",
						msg : "操作成功,数据进入待审核状态",
						timeout : 1000 * 2
					});
				}else{
					parent.$.messager.show({
						title : "提示",
						msg : result.desc,
						timeout : 1000 * 2
					});
				}	
			}
		}
	});

	$("#operation").combogrid({
		panelWidth: 260,
		panelHeight: 400,
		multiple: true,
		idField:'id',   
        textField:'name',   
        url:'${pageContext.request.contextPath}/menu/operations', 
        columns:[[   
	        {field:'id',title:'',checkbox:true},   
	        {field:'name',title:'操作',width:20}
   	 	]],
   	 	fitColumns: true,
   	 	editable:false
	})
})
</script>
<div style="padding:10px 60px 20px 60px">
<form id="ff" method="post">
	<table cellpadding="5">
		<tr>
			<td>菜单名称:</td>
			<td><input class="easyui-textbox" type="text" name="name" data-options="required:true,missingMessage:'菜单名称不能为空'" style="width:260px;"></input></td>
		</tr>
		<tr>
			<td>菜单Url:</td>
			<td><input class="easyui-textbox" type="text" name="url" style="width:260px;"></input></td>
		</tr>
		<tr>
			<td>菜单位置:</td>
			<td><input class="easyui-textbox" type="text" id="location" name="location" style="width:160px;"></input></td>
		</tr>
		<tr>
			<td>功能选择:</td>
			<td><select class="easyui-combogrid" id="operation" name="operation" style="width:260px;height:60px;" data-options="multiline:true"></select></td>
		</tr>
		<tr>
			<td>审核意见:</td>
			<td><input class="easyui-textbox" name="content" data-options="multiline:true" style="height:60px;width:260px;"></input></td>
		</tr>
	</table>
</form>
	
	