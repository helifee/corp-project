var $grid;

/**
 * datagrid列表加载
 * module: 模块id
 * toolbar：查询那妞div id
 * url：执行地址
 * _columns：列表
 * sortName: 排序名称
 * sortOrder:排序方式
 */
function bodyLoad(module,toolbar,url,_columns,_method,sortName,sortOrder){
	//判断是否为空
	module = module || 'module';
	sortName = sortName || 'id';
	sortOrder = sortOrder || 'asc';
	_method = _method || 'get';
	
	$grid=$('#'+module).datagrid({
    	url:url,
    	columns:_columns,
		pagination:true,
		rownumbers:true,
		border:false,
		sortName:sortName,
		method:_method,
		sortOrder:sortOrder,
		toolbar:'#'+toolbar,
		pageSize:5,
		singleSelect: false,
		selectOnCheck: true,
		checkOnSelect: true,
		pageList:[5,10,20,30,40],
		fit:true,
		fitColumns:true,
		onLoadSuccess: function (data){
			if(data.code != undefined && data.code != 1){
				$.messager.show({
		            msg : data.desc,
		            title : '提示'
		        });
			}
			$(this).datagrid('clearSelections');
		}
    });
}
/**
*dataGrid审核列表页
*fun1:onUncheck执行函数
*fun2:onCheck执行函数
*fun3:onCheckAll执行函数
*fun4:onUncheckAll执行函数
**/
function bodyLoadVerifyDG(module,toolbar,url,_columns,fun1,fun2,fun3,fun4){
	$grid=$('#'+module).datagrid({
	    	url:url,
	    	columns:_columns,
			pagination:true,
			rownumbers:true,
			border:false,
			toolbar:'#toolbar',
			method:'get',
			pageSize:5,
			singleSelect: false,
			selectOnCheck: true,
			checkOnSelect: true,
			pageList:[5,10,20,30,40],
			fit:true,
			fitColumns:true,
			onLoadSuccess: function (data){
				if(data.code != undefined && data.code != 1){
					$.messager.show({
			            msg : data.desc,
			            title : '提示'
			        });
				}
				$(this).datagrid('clearSelections');
			},
			onUncheck: function(row_index,row_data){
				fun1 && fun1();
			},
			onCheck: function(row_index,row_data){
				fun2 && fun2();
			},
			onCheckAll: function(rows){
				fun3 && fun3();
			},
			onUncheckAll: function(rows){
				fun4 && fun4();
			}
	    });
}

/** 查询方法
 *  module: 模块id
 *  searchForm：查询form表单id
 *  */
function query(module,searchForm){
	$('#'+module).datagrid('reload',serializeObject($('#'+searchForm).form()));
}

/** 清空方法 
 *  module: 模块id
 *  searchForm：查询form表单id
 * */
function cleanSearch(module,searchForm){
	//$('#'+module).datagrid('load',serializeObject($('#'+searchForm).find('input').val('')));
	serializeObject($('#'+searchForm).find('input').val(''));
}

/** 新增*/
function add(title,width,height,doUrl,saveUrl){
	  parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : doUrl,
		buttons : [{
			text : '保存',
			handler : function() {
				parent.$.modalDialog.openner= $grid;
				var f = parent.$.modalDialog.handler.find("#form");
				f.attr("action",saveUrl);
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

/** 修改 
 *  doUrl: 查询地址；
 *  queryUrl：通过id从数据库中查询对象
 *  saveUrl： 表单form 提交地址
 * */
function edit(title,width,height,doUrl,queryUrl,saveUrl) {
	var rows = $grid.datagrid('getSelections');
    if(rows == ''){
        $.messager.show({
            msg : '请先选择您要修改的记录',
            title : '提示'
        });
    }
	else if ( rows.length != 1 && rows.length != 0) {
		$.messager.show({
			msg : '只能选择一条记录进行修改。您已经选择了' + rows.length + '条。',
			title : '提示'
		});
	} else if (rows.length == 1) {
		parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : doUrl,
			onLoad:function(){
				var f = parent.$.modalDialog.handler.find("#form");
				$.ajax({
					url : queryUrl+"?id="+rows[0].id,
					cache : false,
					dataType : "json",
					success : function(result) {
						f.form("load", result);
					}
				});
			},
			buttons : [{
				text : '保存',
				handler : function() {
					parent.$.modalDialog.openner= $grid;
					var f = parent.$.modalDialog.handler.find("#form");
					f.attr("action",saveUrl);
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
}

/** 插入操作 */
$("#form").form({
	onSubmit : function() {
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
		result = eval("("+result+")");
		if (result){
			//成功后处理
			if(result.code =='1'){
				parent.$.modalDialog.openner.datagrid('reload');//之所以能在这里调用到parent.$.modalDialog.openner_datagrid这个对象，是因为role.jsp页面预定义好了
				parent.$.modalDialog.handler.dialog('close');
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


/** 
此方法是del
单个删除操作 */
function delBySingle(url,id){
	$.messager.confirm('请确认', '您要删除当前记录？', function(r) {
		if (r) {
			$.ajax({
				url : url,
				data : {ids:id},
				cache : false,
				dataType : "json",
				success : function(response) {
					$('#module').datagrid('reload');
					$.messager.show({
						title : '提示',
						msg : '删除成功'
					});
				}
			});
		}
	});
}


/** 删除操作 
 *  多个删除
 * */
function delByIds(url){
	var ids = [];
	var rows = $grid.datagrid('getSelections');
	if (rows.length > 0) {
		$.messager.confirm('请确认', '您要删除当前所选记录？', function(r) {
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
							msg : '删除成功！'
						});
					}
				});
			}
		});
	} else {
		$.messager.show({
			title:'提示',
			msg:'请先选择您要删除的记录。'
		});
	}
}

/** 将form 表单的元素值序列化成对象*/
function serializeObject(form){
	var obj = {};
	$.each(form.serializeArray(),function(index){
		if(obj[this['name']]){
			obj[this['name']] = obj[this['name']] +","+ this['value'];
		}else{
			obj[this['name']] = this['value'];
		}
	});
	return obj
}

/** 按钮权限判断
    json: 是拥有的权限内容
    此方法目前没使用，待完善
*/
function btnJur(btnParId,json){
    var buttons = {'buts':'new,update'};
      	 var buttodddns = $('#buttons');
      	 var btnChil = buttodddns.children('a');
      	 var options = buttons.buts;
      	 if(options){
      	 	var aa = options.split(',');
      	 	for(var i=0; i<aa.length; i++){
      	 		for(var j=0; j<btnChil.length;j++){
      	 			if(aa[i] == btnChil.eq(j).attr('data-code')){
      	 				btnChil.eq(j).removeClass('hide');
      	 			}
      	 		}
      	 	}
      	 }
}

/**
 * 增加formatString功能
 * 使用方法：$.formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 * @returns 格式化后的字符串
 */
$.formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};