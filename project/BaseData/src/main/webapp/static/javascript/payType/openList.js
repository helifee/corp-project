$(function(){
//  	 var url = baseUrl+"/payType/openList.json";
	var url = baseUrl+"/paytype/queryall";
  	 var _columns = [[
  	                 {field:'id',title:'序号',width:'5',checkbox:true},  
				      {field:'payType',title:'支付类型',width:'100'},   				    
					  {field:'action',title:'操作',width:'150',formatter : function(value, row, index) {
						 var str = '';
						 str +=$.formatString('<a href="javascript:void(0)" onclick="update('+row.id+')">修改</a>', row.id);
						 str =str+' '+$.formatString('<a href="javascript:void(0)" onclick="rowDelete('+row.id+')">删除</a>', row.id);
						  str =str+' '+$.formatString('<a href="javascript:void(0)" onclick="detailsEdit('+row.id+')">详情</a>', row.id);
						 return str;
						}}]]; 
  	 bodyLoad('module','toolbar',url,_columns);
});

function update(id) {
		parent.$.modalDialog({
			title : '',
			width : 300,
			height : 300,
			href :baseUrl+'/pages/payType/openListUpdate.jsp',
			onLoad:function(){
				var f = parent.$.modalDialog.handler.find("#form");
				$.ajax({
					url : "../../data/edit.json?id="+id,
					cache : false,
					dataType : "json",
					success : function(result) {
						f.form("load", result);
					}
				});
			},
			buttons : [{
				text : '提交审核',
				handler : function() {
					parent.$.modalDialog.openner= $grid;
					var f = parent.$.modalDialog.handler.find("#form");
					f.attr("action","后台url");
					f.submit();
				}
			}, 
			{
				text : '取消',
				handler : function() {
					parent.$.modalDialog.handler.dialog('destroy');
					parent.$.modalDialog.handler = undefined;
				}
			}
			]
		});
	}


/** 响应码的详情
 *  
 * */
function detailsEdit(id) {
		parent.$.modalDialog({
			title : '',
			width : 300,
			height : 300,
			href : 'openListDetils.jsp',
			onLoad:function(){
				var f = parent.$.modalDialog.handler.find("#form");
				$.ajax({
					url : "openListDetils.json?id="+id,
					cache : false,
					dataType : "json",
					success : function(result) {
						f.form("load", result);
					}
				});
			},
			buttons : [
			{
				text : '关闭',
				handler : function() {
					parent.$.modalDialog.handler.dialog('destroy');
					parent.$.modalDialog.handler = undefined;
				}
			}
			]
		});
	}


/** 单个删除操作 */
function rowDelete(id){
	$.messager.confirm('请确认', '您要删除当前所选记录？', function(r) {
		if (r) {
			$.ajax({
				url : '../../data/balanceAcctDetial2.json',
				data : id,
				cache : false,
				dataType : "json",
				success : function(data) {
					if(data.code == '1'){
						$('#module').datagrid('reload');
						$.messager.show({
							title : '提示',
							msg : '删除成功'
						});
					}else{
						$.messager.show({
							title : '提示',
							msg : data.desc
						});
					}
				}
			});
		}
	});
}

/** 单个启用/停止操作 */
function onlyStatus(id){
	$.messager.confirm('请确认', '您要启用当前所选记录？', function(r) {
		if (r) {
			$.ajax({
				url : '后台url',
				data : id,
				cache : false,
				dataType : "json",
				success : function(response) {
					$('#module').datagrid('reload');
					$.messager.show({
						title : '提示',
						msg : '操作成功'
					});
				}
			});
		}
	});
}

/** 启用,停用 操作 
 *  多个启用,停用
 * */
function useStatus(url){
	var ids = [];
	var rows = $grid.datagrid('getSelections');
	if (rows.length > 0) {
	$.messager.confirm('请确认', '您要启用当前所选记录？', function(r) {
		if (r) {
			for ( var i = 0; i < rows.length; i++) {
                ids.push(rows[i].id);
            }
			$.ajax({
				url : url,
				data : {ids : ids.join(',')},
				cache : false,
				dataType : "json",
				success : function(response) {
					$('#module').datagrid('reload');
					$.messager.show({
						title : '提示',
						msg : '操作成功！'
					});
				}
			});
		}
	});
	} else {
		$.messager.show({
			title:'提示',
			msg:'请先选择您要启用的记录。'
		});
	}
}
