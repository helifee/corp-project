var $grid;
var $dg;
/**
 * treegrid列表加载
 * module: 用渲染的div的id
 * toolbar：查询按钮div id
 * url：执行地址
 * _columns：列表
 */
var $grid;
function bodyLoad(module,toolbar,url,_columns,rootId){
		module = module || 'module';
		rootId = rootId || '1';
		$dg = $('#'+module);
		$grid=$dg.treegrid({
			 	url : url+"?"+getAjaxTmp(),
				fitColumns : true,
				striped:true,
				nowrap : true,
				border : false,
				toolbar:'#'+toolbar,
				idField:'id',
				treeField:'text',
				rownumbers: false,
				onExpand:function (){
					 $dg.treegrid('unselectAll');
				},
				columns:_columns,
				onLoadSuccess:function(row, data){
					if(data[0].id == rootId){ //判断是否是根节点，如果是根节点才展开第一级
						$dg.treegrid('reload',data[0].id);
		        	}
				}
			 })
}

function bodyLoadAndParam(module,toolbar,url,_columns,rootId){
	module = module || 'module';
	rootId = rootId || '1';
	$dg = $('#'+module);
	$grid=$dg.treegrid({
		 	url : url+"&"+getAjaxTmp(),
			fitColumns : true,
			striped:true,
			nowrap : true,
			border : false,
			toolbar:'#'+toolbar,
			idField:'id',
			treeField:'text',
			rownumbers: false,
			onExpand:function (){
				 $dg.treegrid('unselectAll');
			},
			columns:_columns,
			onLoadSuccess:function(row, data){
				if(data!=null&&data.length>0){
					if(data[0].id == rootId){ //判断是否是根节点，如果是根节点才展开第一级
						$dg.treegrid('reload',data[0].id);
		        	}
				}
			}
		 })
}

/**
 * treegrid新增
 * title: 弹出框的标题
 * width：弹出框的宽
 * height:弹出框的高
 * onLoadMethod：执行方法在加载的时候
 * doUrl：跳转到哪个action 为了转向新增页面
 * saveUrl：保存时调用的action
 */
function add(title,width,height,onLoadMethod,doUrl,saveUrl){
		parent.$.modalDialog({
				title : title,
				width : width,
				height : height,
				iconCls: 'icon-plus',
				href : doUrl,
			 	onLoad:onLoadMethod,
				buttons : [{
				text : '保存',
				//iconCls : 'i-ok',
				handler : function() {
					parent.$.modalDialog.openner= $grid;
					var f = parent.$.modalDialog.handler.find("#form");
					f.attr("action",saveUrl+"?"+getAjaxTmp());
					f.submit();
				}
			}, 
			{
				text : '取消',
				//iconCls : 'i-cancel',
				handler : function() {
					parent.$.modalDialog.handler.dialog('destroy');
					parent.$.modalDialog.handler = undefined;
				}
			}
			]
		});
}
/**
 * treegrid修改
 * title: 弹出框的标题
 * width：弹出框的宽
 * height:弹出框的高
 * onLoadMethod：执行方法在加载的时候
 * doUrl：跳转到哪个action 为了转向新增页面
 * saveUrl：保存时调用的action
 */
function updRowsOpenDlg(title,width,height,doUrl,saveUrl,onLoadMethod) {
	var row = $dg.treegrid('getSelected');
	if(row){
		if(row.id=='0' || row.id=='-1'){
			parent.$.messager.show({
				title :"提示",
				msg :"根节点不能进行修改操作"
			});
		}else{
			parent.$.modalDialog({
				title : title,
				width : width,
				height : height,
				iconCls: 'icon-pencil',
				href : doUrl,
				onLoad:onLoadMethod,
				buttons : [{
					text : '保存',
					//iconCls : 'i-ok',
					handler : function() {
						parent.$.modalDialog.openner= $grid;
						var f = parent.$.modalDialog.handler.find("#form");
						f.attr("action",saveUrl+"?"+getAjaxTmp());
						f.submit();
					}
				}, 
				{
					text : '取消',
					//iconCls : 'i-cancel',
					handler : function() {
						parent.$.modalDialog.handler.dialog('destroy');
						parent.$.modalDialog.handler = undefined;
					}
				}
				]
			});
			}
		}else{
			parent.$.messager.show({
				title :"提示",
				msg :"请先选择您要修改的记录"
			});
		}
}
/** 插入操作 */
$("#form").form({
    onSubmit : function() {
        if($(this).form('validate')){
            return true;
        }else{
            return false;
        }
    },
    success : function(result) {
        if(ajaxResultValidate(result)){
            result  = ajaxResultValidate(result);
            if (result) {
                parent.$.modalDialog.openner.datagrid('reload');//之所以能在这里调用到parent.$.modalDialog.openner_datagrid这个对象，是因为role.jsp页面预定义好了
                parent.$.modalDialog.handler.dialog('close');
                parent.$.messager.show({
                    title : "提示",
                    msg : "操作成功",
                    timeout : 1000 * 2
                });
            }
        }
    }
});
function deleteNode(doUrl){
	var node = $dg.treegrid('getSelected');
	if(node){
		parent.$.messager.confirm("提示","确定要删除记录吗?",function(r){  
		    if (r){  
		    	$.post(doUrl+"?"+getAjaxTmp(), node, function(rsp) {
		    		if(ajaxResultValidate(rsp)){
		    			$dg.treegrid('remove', node.id);
		    			parent.$.messager.show({
		    				title : "提示",
		    				msg : "删除成功"
		    			});
		    		}
		    		
				}, "JSON").error(function() {
					parent.$.messager.show({
						title :"提示",
						msg :"提交错误了"
					});
				});
		    }  
		});
	}else{
		parent.$.messager.show({
			title :"提示",
			msg :"请先选择您要删除的记录"
		});
	}
}

/**
 * 点击名称展开/收缩操作
 * @param id
 * @returns
 */
function toToggle(id){
	$dg.treegrid('toggle',id);
}