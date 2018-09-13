/**
 * 角色管理列表
 * @author guoyanhong
 */

//全局参数
//角色树
var zTreeObj;
//按岗位岗位列表
var jqGridPost;
//按岗位用户列表
var jqGridPostUser;
//按用户用户列表
var jqGridUser;
var impostId ="";
//默认的组织ID
var imtreeId;


//zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
		view: {
            dblClickExpand: false,  
            showLine: true,  
            selectedMulti: false,
            fontCss: getFontCss,
            nameIsHTML: true
        },  
	edit: {  
		enable: true,
		showRemoveBtn:false,
        showRenameBtn:showRenameBtn
    },  
    data: {
    	keep: {
			leaf: false,
			parent: true
		},
        simpleData: {
            enable: true
        }
    },
    callback: {  
        onClick:zTreeOnClick, //点击节点事件
        beforeDrag:function(){return false;},//角色不允许拖拽
        beforeRename: zTreeBeforeRename,//编辑节点之前
        onRename: zTreeOnRename,//编辑节点之后
		onCollapse: function(){
			$.xljUtils.treeResizeFn();
		},
		onExpand:  function(){
			$.xljUtils.treeResizeFn();
		} //捕获节点被展开的事件回调函数
    }  
};

/**
 * 用于捕获节点编辑名称结束（Input 失去焦点 或 按下 Enter 键）之后，更新节点名称数据之前的事件回调函数，并且根据返回值确定是否允许更改名称的操作
 * @param treeId
 * @param treeNode
 * @param newName
 * @param isCancel
 * @returns {Boolean}
 */
function zTreeBeforeRename(treeId, treeNode, newName, isCancel) {
	if(newName == ""){
		pop_tip_open("blue","名称不能为空");
		return false;
	}
	if(newName.length > 200){
		pop_tip_open("blue","名称长度不能大于200");
		return false;
	}
	if(treeNode.mold =="cata"){
		var urlBody = "sys/org/roleCatalog/update/"+treeNode.id;
	    var urlAll = serviceUrl + urlBody;
	    newName=$.xljUtils.htmlEncode(newName);
	    var updatedata ={
				name:newName,
		};
		$.ajax({
			type:'PUT',
	        url:urlAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        success: function(json) {
	            if(json.success == true){
	            	pop_tip_open("green","修改成功");
	            	return true;
	            }else{
	            	pop_tip_open("red",json.msg);
	            	return false;
	            }
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","修改角色分类请求失败");
	        	return false;
	        }
	    })
	}else{
		var urlBody = "sys/org/standardRole/update/"+treeNode.id;
	    var urlAll = serviceUrl + urlBody;
	    newName=$.xljUtils.htmlEncode(newName);
	    var updatedata ={
				name:newName,
		};
		$.ajax({
			type:'PUT',
	        url:urlAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        success: function(json) {
	            if(json.success == true){
	            	pop_tip_open("green","修改成功");
	            	return true;
	            }else{
	            	pop_tip_open("red",json.msg);
	            	return false;
	            }
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","修改角色状态请求失败");
	        	return false;
	        }
	    })
	}
	
	
}

/**
 * 用于捕获节点编辑名称结束之后的事件回调函数。
 * @param event
 * @param treeId
 * @param treeNode
 * @param isCancel
 */
function zTreeOnRename(event, treeId, treeNode, isCancel) {
}

/**
 * 设置显示编辑按钮
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function showRenameBtn(treeId, treeNode) {
	if(treeNode.parentId == null || treeNode.parentId == ""){
		return false;
	}else{
		return true;
	}
}

//树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};
var postOnId;
/**
 * 初始化按岗位的岗位列表
 */
function initJqGridPost(){
	var ubody = "sys/org/post/queryPostListByRoleId";
	var uall = serviceUrl+ubody;
    //创建jqGrid组件
    jqGridPost = jQuery("#listPost").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{"roleId":"","fristLimit":limit},
            datatype : "json", 
            width:$('.mytable').width(),
            height:$('.mytable').height()-45,
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                 {name : 'refId',label : '组织机构Id',width : 55,align : "center",hidden : true},
                 {name : 'prefixName',label : '所属机构',width : 180,align : "center"},
                 {name : 'name',label : '标准岗位',width : 180,align : "center"},
                 {name : 'type',label : '类型',width : 180,align : "center",formatter:postTypeFmatter},
                 {name : 'leaderName',label : '直属领导岗位',width : 207,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
            rownumWidth:55,
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            onCellSelect:function(rowid){
	        	var queryData={
	        			"postId":rowid
	        			};
				var gridW = $(".mytable").eq(0).width()-2;
	        	jQuery("#listPostUser").jqGrid("setGridParam", { postData: queryData }).setGridWidth(gridW, true).trigger("reloadGrid");
            },
			gridComplete: function () {
				if(postOnId){
					$(this).jqGrid("setSelection",postOnId);
           	 	}
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
			},
            viewrecords : true
        });
}

/**
 * 追加表格数据，模拟分页
 * TODO
 */
//初始化数据
var pageFlag=true;
var limit=50;//每页条数，更改只需更改此参数
var start=limit;//下拉分页初始条数
function addGridPage(){
	var gridH=$('#ascrail2000');
	var gridHight=$('#ascrail2000').height();
	var scroll=gridH.find('div')[0];
	var top=$(scroll).css('top').replace('px','');
	var sH=$('#ascrail2000 div').height();
	if(gridHight-top-sH<=30 && pageFlag){
		pageFlag=false;
		var queryDataPost=getGridParam();
		queryDataPost.start=start;
		queryDataPost.limit=limit;
		//请求数据
		var ubody = "sys/org/post/queryPostListByRoleId";
		var uall = serviceUrl+ubody;
		$.ajax({
			type:'POST',
			url:uall,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(queryDataPost),
			success: function(json) {
				if(json.success == true){
					var dataRow=json.result;
					if(dataRow.length>0){
						jqGridPost.jqGrid("addRowData","id", dataRow, "last");
						pageFlag=true;
						start=start+limit;
					}
				}else{
					pop_tip_open("red",json.msg);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red","查询列表请求失败");
			}
		})
	}
}
/**
 * 获取post表格查询条件
 */
function getGridParam(){
	var nodes = zTreeObj.getSelectedNodes();
	var queryDataPost={};
	if(nodes.length == 1 ){
		queryDataPost.roleId=nodes[0].id;
		queryDataPost.roleType=nodes[0].mold ;
	}
	queryDataPost.fristLimit=limit;
	return queryDataPost;
}
//重置分页
function resetParam(){
	pageFlag=true;
	start=limit;
}
/**
 * 按岗位的用户列表
 */
function initJqGridPostUser(){
	var ubody = "sys/org/user/queryUserListByPostId";
	var uall = serviceUrl+ubody;
    jqGridPostUser = jQuery("#listPostUser").jqGrid({
		   url: uall,
	       ajaxGridOptions: { contentType: 'application/json' },
	       mtype : "POST",  
	       contentType : "application/json",  
	       datatype : "json", 
	       postData:{"postId":""},
	       loadonce:false,
	       width:$('.mytable').width(),
	       height:$('.mytable').height()-45,
	       jsonReader : {
	           root:"result"
	       },
	       rownumbers: true,
	       colModel : [ 
	           {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
	           {name : 'realName',label : '用户名',width : 180,align : "center",cellattr: addCellAttr},
	           {name : 'loginName',label : '登录账号',width : 180,align : "center"},
	           {name : 'type',label : '用户类型',width : 180,align : "center",formatter:jqGridPostUserTypeFmatter},
	           {name : 'status',label : '状态',width : 150,align : "center",formatter:statusFmatter,cellattr: addCellAttr},
	           {name : 'createDate',label : '创建时间',width : 150,align : "center"},
	           {name : 'mobile',label : '手机号',width : 300,align : "center"}
	       ],
	       rowNum : -1,//一页显示多少条
			gridComplete: function () {
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
			},
	       viewrecords : true
	});
}

/**
 * 树点击节点事件
 */

function zTreeOnClick(event, treeId, treeNode) {
	resetParam();
	var queryDataPost=getGridParam();
	var queryDataPostUser={
			"postId":""
			};
	var gridW = $(".mytable").eq(0).width()-2;
	jQuery("#listPost").jqGrid("setGridParam", { postData: queryDataPost }).setGridWidth(gridW, true).trigger("reloadGrid");
}



/**
 * 树搜索方法
 */

function focusKey(e) {
	if (key.hasClass("empty")) {
		key.removeClass("empty");
	}
}
function blurKey(e) {
	if (key.get(0).value === "") {
		key.addClass("empty");
	}
}

function clickRadio() {
	$.xljUtils._searchTreeBtnEvent(key,zTreeObj);
}

/**
 * 个性化文字样式，只针对 zTree 在节点上显示的对象
 * @param treeId
 * @param treeNode
 * @returns
 */
function getFontCss(treeId, treeNode) {
	return (treeNode.highlight&&treeNode.highlight=='true') ?
            {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
                {color:"#333", "font-weight":"normal",'font-style':'normal'} | (treeNode.status&&treeNode.status=='0') ?
                {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
                {color:"#333", "font-weight":"normal",'font-style':'normal'};
}

/**
 * 递归获取树图片样式
 */
function recursionArray(arr) {
    for(var i in arr) {
    	if(arr[i].mold == "cata") {
            arr[i].iconSkin = "diy-roleType";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].mold == "role" ) {
        	if(arr[i].type == "0" ){
        		arr[i].iconSkin = "diy-fictitious";
        	}else{
        		arr[i].iconSkin = "diy-role";
        	}
        }
    }
};
var key;
/**
 * 获取角色树
 */
function getRoleTree() {
    var urlBody = "sys/org/roleCatalog/getRoleTree";
    var urlAll = serviceUrl + urlBody;
    var data={
    		type:1
    };
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(data),
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            var nodes = zTreeObj.getNodes();
            //默认展开第一个节点和第二个节点
            zTreeObj.expandNode(nodes[0], true, false, false,false);
            zTreeObj.expandNode(nodes[1], true, false, false,false);
            key = $("#key");
			/*key.bind("focus", focusKey)
			.bind("blur", blurKey)
			.bind("propertychange", searchNode)
			.bind("input", searchNode);*/
            $.xljUtils._searchTreeInputEvent(key,zTreeObj);
            
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
        }
    })
}

//跳转修改页面时父页面选中的tree节点组织Id
var edit_roleId;
//角色新增、修改打开方式：0新增，1修改。默认新增
var editType=0;
var selNodeId;//选中节点id
var selNodeName;//选中节点name
var selNodeType;//选中节点selNodeType
var editmold = "role";
/**
 * 新增和修改角色方法
 * @param sign 跳转信号0新增，1修改
 */
function editRoleInfo(sign){
	if(sign == 1){
		var nodes = zTreeObj.getSelectedNodes();
		if(nodes.length < 1 ){
			pop_tip_open("blue","请先选择角色或者角色类型");
		}else{
			if(nodes[0].parentId == null || nodes[0].parentId == ""){
				pop_tip_open("blue","根级角色分类不允许修改");
			}else{
				editType = 1;
				edit_roleId = nodes[0].id;
				editmold = nodes[0].mold;
				//上级name
				var pNode = nodes[0].getParentNode();
				selNodeId=pNode.id;
				selNodeName=pNode.name;
				selNodeType=pNode.type;
				window.open("standardPost_edit.html");
			}
		}
	}else{
		editType = 0;
		var nodes = zTreeObj.getSelectedNodes();
		if(nodes.length==1 && nodes[0].mold=="cata"){
			selNodeId=nodes[0].id;
			selNodeName=nodes[0].name;
			selNodeType=nodes[0].type;
		}else if(nodes.length==1){
			selNodeId=nodes[0].getParentNode().id;
			selNodeName=nodes[0].getParentNode().name;
			selNodeType=nodes[0].getParentNode().type;
		}else{
			selNodeId="";
			selNodeName="";
			selNodeType="";
		}
		window.open("standardPost_edit.html");
	}
	
}

/**
 * 上移下移角色节点
 */
function moveNode(sign){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择角色或者角色分类");
		return;
	}else if(nodes[0].parentId == null || nodes[0].parentId == ""){
		pop_tip_open("blue","根级角色分类不允许移动");
		return;
	}
	if(sign == 0){
		var index = nodes[0].getIndex();
		if(index == 0){
			pop_tip_open("blue","已经是顶部，不能上移");
			return;
		}else{
			var node = nodes[0].getPreNode();
			if(node==null){
				pop_tip_open("blue","已经是顶部，不能上移");
				return;
			}else{
				if(nodes[0].mold == "cata"){
					if(node.mold == "role"){
						pop_tip_open("blue","已经是顶部分类，不能上移到角色上面");
						return;
					}
					var resulttag = updateroleCataSort(nodes[0].id,node.sort,node.prefixSort);
					var resultsou = updateroleCataSort(node.id,nodes[0].sort,nodes[0].prefixSort);
					if(resulttag && resultsou){
						pop_tip_open("green","修改成功");
						var sortOld = node.sort;
						var prefixSort = node.prefixSort;
						node.sort = nodes[0].sort;
						node.prefixSort = nodes[0].prefixSort;
						nodes[0].sort = sortOld;
						nodes[0].prefixSort = prefixSort;
						zTreeObj.moveNode(node,nodes[0], "prev");
					}else{
						pop_tip_open("blue","修改失败");
					}
				}else{
					var resulttag = updateroleSort(nodes[0].id,node.sort,node.prefixSort);
					var resultsou = updateroleSort(node.id,nodes[0].sort,nodes[0].prefixSort);
					if(resulttag && resultsou){
						pop_tip_open("green","修改成功");
						zTreeObj.moveNode(node,nodes[0], "prev");
						var sortOld = node.sort;
						var prefixSort = node.prefixSort;
						node.sort = nodes[0].sort;
						node.prefixSort = nodes[0].prefixSort;
						nodes[0].sort = sortOld;
						nodes[0].prefixSort = prefixSort;
					}else{
						pop_tip_open("blue","修改失败");
					}
				}
			}
		}
	}else{
		var node = nodes[0].getNextNode();
		if(node==null){
			pop_tip_open("blue","已经是底部，不能下移");
			return;
		}else{
			if(nodes[0].mold == "cata"){
				var resulttag = updateroleCataSort(nodes[0].id,node.sort,node.prefixSort);
				var resultsou = updateroleCataSort(node.id,nodes[0].sort,nodes[0].prefixSort);
				if(resulttag && resultsou){
					pop_tip_open("green","修改成功");
					var sortOld = node.sort;
					var prefixSort = node.prefixSort;
					node.sort = nodes[0].sort;
					node.prefixSort = nodes[0].prefixSort;
					nodes[0].sort = sortOld;
					nodes[0].prefixSort = prefixSort;
					zTreeObj.moveNode(node,nodes[0], "next");
				}else{
					pop_tip_open("blue","修改失败");
				}
			}else{
				if(node.mold == "cata"){
					pop_tip_open("blue","已经是底部角色，不能下移到角色分类下面");
					return;
				}
				var resulttag = updateroleSort(nodes[0].id,node.sort,node.prefixSort);
				var resultsou = updateroleSort(node.id,nodes[0].sort,nodes[0].prefixSort);
				if(resulttag && resultsou){
					pop_tip_open("green","修改成功");
					var sortOld = node.sort;
					var prefixSort = node.prefixSort;
					node.sort = nodes[0].sort;
					node.prefixSort = nodes[0].prefixSort;
					nodes[0].sort = sortOld;
					nodes[0].prefixSort = prefixSort;
					zTreeObj.moveNode(node,nodes[0], "next");
				}else{
					pop_tip_open("blue","修改失败");
				}
			}
			
		}
	}
}
/**
 * 修改角色分类排序
 * @param id
 * @param sort
 * @returns {Boolean}
 */
function updateroleCataSort(id,sort,prefixSort){
	var result = false;
	var urlBody = "sys/org/roleCatalog/update/"+id;
    var urlAll = serviceUrl + urlBody;
    var updatedata ={
    		sort:sort,
    		prefixSort:prefixSort
	};
	$.ajax({
		type:'PUT',
        url:urlAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(updatedata),
        success: function(json) {
            if(json.success == true){
            	result= true;
            }else{
            	result= false;
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","修改角色分类排序请求失败");
        	result= false;
        }
    })
    
    return result;
}

/**
 * 修改角色排序
 * @param id
 * @param sort
 * @returns {Boolean}
 */
function updateroleSort(id,sort,prefixSort){
	var result = false;
	var urlBody = "sys/org/standardRole/update/"+id;
    var urlAll = serviceUrl + urlBody;
    var updatedata ={
    		sort:sort,
    		prefixSort:prefixSort
	};
	$.ajax({
		type:'PUT',
        url:urlAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(updatedata),
        success: function(json) {
            if(json.success == true){
            	result= true;
            }else{
            	result= false;
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","修改角色排序请求失败");
        	result= false;
        }
    })
    
    return result;
}

/**
 * 禁用或者启用角色或者角色分类的状态
 */
function updateRolestatus(sign){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes[0].parentId == null || nodes[0].parentId == ""){
		pop_tip_open("blue","根级角色分类不允许禁用启用");
		return false;
	}
	var signString = "";
	if(sign == 1){
		signString ="启用";
	}else{
		signString ="禁用";
	}
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择角色或者角色分类");
	}else{
		var mold = nodes[0].mold;
		var id = nodes[0].id;
			if(mold == "cata"){
				pop_text_open("blue","确定要"+signString+nodes[0].name+"这个角色分类吗？",function(){
					updatestatusRolecata(nodes[0],sign);
				},function(){
				});
			}else{
				pop_text_open("blue","确定要"+signString+nodes[0].name+"这个角色吗？",function(){
					updatestatusRole(nodes[0],sign);
				},function(){
				});
			}
	}
}
/**
 * 显示功能授权和数据授权
 * @param sign 跳转信号1功能授权，0数据授权
 */
function showAuthFromSp(sign){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择标准岗位");
		return false;
	}else{
		if(nodes[0].parentId == null || nodes[0].parentId == ""){
			pop_tip_open("blue","根级分类没有授权");
			return false;
		}
		var mold = nodes[0].mold;
//		var id = nodes[0].id;
		if(mold == "cata"){
			pop_tip_open("blue","请先选择标准岗位");
			return false;
		}else{
			if(sign == 1){
				var dataParam={
						authFunStandardPostId:nodes[0].id
				};
				window.parent.childParamCache(dataParam);
				window.parent.switchPro("PT","QXGL");
			}else if(sign == 0){
				var dataParam={
						authDataStandardPostId:nodes[0].id
				};
				window.parent.childParamCache(dataParam);
				window.parent.switchPro("PT","SJSQ");
			}
		}
	}
}




/**
 * 修改角色状态
 */
function updatestatusRole(node,sign){
	var urlBody = "sys/org/standardRole/update/"+node.id;
    var urlAll = serviceUrl + urlBody;
    var updatedata ={
			status:sign,
	};
	$.ajax({
		type:'PUT',
        url:urlAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(updatedata),
        success: function(json) {
            if(json.success == true){
            	pop_tip_open("green","修改成功");
            	//更改角色状态颜色
            	node.status = ""+sign;
//            	zTreeObj.updateNode(node);
            	lockOrUnNodes(sign, node);
            }else{
            	pop_tip_open("red",json.msg);
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","修改角色状态请求失败");
        }
    })
}


/**
 * 修改角色分类状态
 */
function updatestatusRolecata(node,sign){
	var urlBody = "sys/org/roleCatalog/update/"+node.id;
    var urlAll = serviceUrl + urlBody;
    var updatedata ={
			status:sign,
	};
	$.ajax({
		type:'PUT',
        url:urlAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(updatedata),
        success: function(json) {
            if(json.success == true){
            	pop_tip_open("green","修改成功");
            	//更改角色状态颜色
//            	node.status = ""+sign;
//            	zTreeObj.updateNode(node);
            	lockOrUnNodes(sign, node);
            }else{
            	pop_tip_open("red",json.msg);
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","修改角色状态请求失败");
        }
    })
}

/**
 * 改变父节点或子节点样式
 * @param status 0禁用，1启用
 * @param node 节点
 */
function lockOrUnNodes(status,node) {
	var zTree=$.fn.zTree.getZTreeObj("treeDemo");
	if(status == 0){
		lockAllChildrenNodes(node,zTree);
	}else{
		unLockAllParentNodes(node,zTree);
	}
}
/**
 * 禁用所有子节点
 * @param treeNode
 * @param result
 * @returns
 */
function lockAllChildrenNodes(treeNode,zTree){
	treeNode.status="0";
	zTree.updateNode(treeNode);
	var childrenNodes = treeNode.children;
	if (childrenNodes) {
		for (var i = 0; i < childrenNodes.length; i++) {
			//递归
			lockAllChildrenNodes(childrenNodes[i],zTree);
		}
	}
}
/**
 * 启用所有父节点
 * @param treeNode
 * @param result
 * @returns
 */
function unLockAllParentNodes(treeNode,zTree){
	treeNode.status="1";
	zTree.updateNode(treeNode);
	var pNode = treeNode.getParentNode();
	if(pNode!=null){
		unLockAllParentNodes(pNode,zTree);
	}
}





/**
 * 删除角色分类或者角色
 */
function deleteobject(){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择角色或者角色分类");
		return false;
	}else if(nodes[0].parentId == null || nodes[0].parentId == ""){
		pop_tip_open("blue","根级角色分类不允许删除");
		return false;
	}else{
		/*if(null!= nodes[0].children && ""!=nodes[0].children && nodes[0].children.length>0){
			pop_tip_open("blue","有下级目录或者角色不让删除");
		}else{*/
			var mold = nodes[0].mold;
			var id = nodes[0].id;
			if(mold == "cata"){
				pop_text_open("blue","确定要删除这个分类及其下级吗？",function(){
//				pop_text_open("blue","确定要删除"+nodes[0].name+"这个角色分类吗？",function(){
					deleteRolecata(nodes[0]);
				},function(){
				});
			}else{
				pop_text_open("blue","确定要删除这个岗位吗？",function(){
//				pop_text_open("blue","确定要删除"+nodes[0].name+"这个角色吗？",function(){
					deleteRole(nodes[0]);
				},function(){
				});
			}
//		}
	}
}
/**
 * 删除角色分类
 */

function deleteRolecata(node){
	var urlBody = "sys/org/roleCatalog/deletePseudo/"+node.id;
    var urlAll = serviceUrl + urlBody;
	$.ajax({
        type:'DELETE',
        url:urlAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:"{}",
        success: function(json) {
            if(json.success == true){
            	var fNode=node.getParentNode();//父节点
    			var preNode=node.getPreNode();//上一个节点
    			//删除选中的节点及其子节点
    			zTreeObj.removeChildNodes(node);
    			zTreeObj.removeNode(node);
    			if(fNode.children==null || fNode.children.length ==0){
    				fNode.isParent=false;
    				zTreeObj.updateNode(fNode);
    			}
    			//焦点上移
    			if(preNode!=null){
    				zTreeObj.selectNode(preNode);
    			}else{
    				zTreeObj.selectNode(fNode);
    			}
            	pop_tip_open("green","删除成功");
//            	zTreeObj.removeNode(node);
            }else{
            	pop_tip_open("red",json.msg);
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","删除角色分类请求失败");
        }
    })
}

/**
 * 删除角色
 */

function deleteRole(node){
	var urlBody = "sys/org/standardRole/deletePseudo/"+node.id;
    var urlAll = serviceUrl + urlBody;
	$.ajax({
        type:'DELETE',
        url:urlAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:"{}",
        success: function(json) {
            if(json.success == true){
            	var fNode=node.getParentNode();//父节点
    			var preNode=node.getPreNode();//上一个节点
    			//删除选中的节点及其子节点
    			zTreeObj.removeChildNodes(node);
    			zTreeObj.removeNode(node);
    			if(fNode.children==null || fNode.children.length ==0){
    				fNode.isParent=false;
    				zTreeObj.updateNode(fNode);
    			}
    			//焦点上移
    			if(preNode!=null){
    				zTreeObj.selectNode(preNode);
    			}else{
    				zTreeObj.selectNode(fNode);
    			}
            	pop_tip_open("green","删除成功");
//            	zTreeObj.removeNode(node);
            }else{
            	pop_tip_open("red",json.msg);
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","删除角色请求失败");
        }
    })
}
/**
 * 打开引入组织机构方法
 */
var importOrgNode;
function openImportOrg(){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择角色");
	}else{
		if(nodes[0].mold == "cata"){
			pop_tip_open("blue","请选择角色，不能选择分类");
		}else{
			importOrgNode = nodes[0];
			window.open("standardPost_importorg.html");
		}
	}
	
}

/**
 * 移除组织机构，删除岗位
 */
function deleteOrg(){
	//多选框获取IDS
//	var ids=jqGridPost.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
	var ids=jqGridPost.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择岗位");
	}else{
		var uBody = "sys/org/post/deletePseudoBatch/"+ids;
	    var uAll = serviceUrl + uBody;
		$.ajax({
	        type:'DELETE',
	        url:uAll,
	        dataType:'json',
//	        contentType:'application/json',
//	        data:'{}',
	        success: function(json) {
	        	if(json.success == true){
	            	pop_tip_open("green",json.msg);
	            	var queryDataPost=getGridParam();
	            	var queryDataUser={
	            			"postId":""
	            			};
	            	jqGridPost.jqGrid("setGridParam", { postData: queryDataPost }).trigger("reloadGrid");
	            	jqGridPostUser.jqGrid("setGridParam", { postData: queryDataUser }).trigger("reloadGrid");
	            	//焦点上移
	            	var lastId = '';
					if($("#listPost #"+ids).prev().length >0){
						lastId=$("#listPost #"+ids).prev()[0].id;//获取选择数据上一行的ID
					}
					if(lastId!='' && lastId!=null){
						postOnId=lastId;
					}
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        }
	    })
	}
}



var selRoleId;
/**
 * 引入用户
 */
function importUser(){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length != 1 ||nodes[0].mold !='role'){
		pop_tip_open("blue","请先选择虚拟角色");
	}else{
		selRoleId = nodes[0].id;
		window.open("standardPost_importuser.html");
	}
}

/**
 * 修改用户状态
 */
function updatestatus(status){
	var ids=jqGridUser.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择用户");
	}else{
		var updatedata ={
				status:status,
				id:ids
		};
		var uBody = "sys/org/user/update/"+ids;
	    var uAll = serviceUrl + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        success: function(json) {
	            if(json.success == true){
	            	pop_tip_open("green",json.msg);
	            	var nodes = zTreeObj.getSelectedNodes();
	            	var queryDataUser={
	            			"roleId":nodes[0].id
	            			};
	            	jqGridUser.jqGrid("setGridParam", { postData: queryDataUser }).trigger("reloadGrid");
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        }
	    })
	}
	
}


/**
 * 打开引入用户方法
 */
function openImportUser(){
	var ids=jqGridPost.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择岗位");
	}else{
		var rowData = jqGridPost.jqGrid('getRowData',ids);
		imtreeId = rowData.refId;
		impostId = ids;
		window.open("../org/organization_importuser.html");
	}
	
}

/**
 * 移除用户一岗多用户
 */
function deleteUser(){
	//多选框获取IDS
//	var ids=jqGridPostUser.jqGrid('getGridParam','selarrrow');
	//单选移除用户id
	var ids=jqGridPostUser.jqGrid('getGridParam','selrow');
	var list = new Array();
	if(null == ids){
		pop_tip_open("blue","请选择用户");
	}else{
		list.push(ids);
		//岗位ID
		var post_ids=jqGridPost.jqGrid('getGridParam','selrow');
		if(list.length == 0){
			pop_tip_open("blue","请选择用户");
		}else{
			pop_text_open("blue",'确定要移除这条用户吗？',function(){
				var deletedata ={
						userIds:list,
						postIds:post_ids,
						type:"users"
				}
				var uBody = "sys/org/postUser/deleteBatchByUserOrPostIds";
			    var uAll = serviceUrl + uBody;
				$.ajax({
					type:'POST',
			        url:uAll,
			        async: false,
			        dataType:'json',
			        contentType:'application/json',
			        data:JSON.stringify(deletedata),
			        success: function(json) {
			            if(json.success == true){
			            	pop_tip_open("green",json.msg);
			            	var queryDataPostUser={
			            			"postId":post_ids
			            			};
			            	jqGridPostUser.jqGrid("setGridParam", { postData: queryDataPostUser }).trigger("reloadGrid");
			            }else{
			            	pop_tip_open("red",json.msg);
			            }
			        }
			    })
			},function(){
				
			});
		}
	}
}

/**
 * 岗位类型格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function postTypeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "zb"){
		return "集团";
	}else if(cellvalue == "company"){
		return "公司";
	}else if(cellvalue == "dept"){
		return "部门";
	}else if(cellvalue == "group"){
		return "项目";
	}else if(cellvalue == "branch"){
		return "项目分期";
	}else{
		return "";
	}
}
/**
 * 用户类型数据格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */

function jqGridPostUserTypeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "普通用户";
	}else if(cellvalue == "2"){
		return "管理员";
	}else if(cellvalue == "3"){
		return "超级管理员";
	}else if(cellvalue == "0"){
		return "非用户";
	}
}

/**
 * initJqGrid数据格式化
 */
function statusFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "启用";
	}else if(cellvalue == "0"){
		return "禁用";
	}
}

/**
 * 格式化样式
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}

/**
 * 设置领导岗位
 * @param data
 */
function postCallback(data) {
	//获取选择的岗位
	var ids=jqGridPost.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择岗位");
	}else{
		var leaderId='';
		if(data!=null&&data!=''){
			leaderId=data.id;
		}
		var list=[];
		var updatedata ={
				id:ids,
				leaderId:leaderId
		};
		list[0]=updatedata;
		var jdata={
				list:list
		}
		var uBody = "sys/org/post/updateBatchLeaderId";
//		var uBody = "sys/org/post/update/"+ids;
	    var uAll = serviceUrl + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(jdata),
	        success: function(json) {
	            if(json.success == true){
	            	pop_tip_open("green",json.msg);
	            	var queryDataPost=getGridParam();
	            	jqGridPost.jqGrid("setGridParam", { postData: queryDataPost }).trigger("reloadGrid");
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","设置领导岗位请求失败");
	        }
	    })
	}
}




$(function(){
	//miying样式初始化需要
    resizeHeight();
    //初始化角色树
	getRoleTree();
	//初始化按岗位岗位列表
	initJqGridPost();
	//初始化按岗位用户列表
	initJqGridPostUser();
	//初始化按用户用户列表
	//initJqGridUser();
	
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    
    $("#leaderButton").on('click',function(){
    	//获取选择的岗位
    	var ids=jqGridPost.jqGrid('getGridParam','selrow');
    	if(ids == "" || ids == null){
    		pop_tip_open("blue","请选择岗位");
    		return false;
    	}else{
    		$(this).xljSingleSelector({
				title:'选择领导岗位',//选择器标题，默认是'选择组织机构'
	            selectorType:'post',//选择器类型，默认是组织机构选择器
	            immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
	            treeUrl:'',
	            treeParam:'',//生成zTree树的参数
//	            targetId:'resourceId',//选择的数据的ID存储input域
//	            targetName:'resourceIdName',//选择的数据的Name存储input域
	            ajaxType: 'POST',	//ajax的type 默认为post
	            /**
	             * 保存回调函数
	             * @param selectDatas 已选择的数据json对象
	             * @param ele 绑定选择器的对象
	             */
	            saveCallback:postCallback,
	            formatTreeJson:function(data){return data;},
	            treeSettings:{}
			});
    	}
			
			
	});
    //清除领导岗位
    $("#delLeaderButton").on('click',function(){
    	postCallback(null);
    });
  //下拉加载
    $('.ui-jqgrid-bdiv').bind("scroll", function (event){  
    	addGridPage();
    });
    
});

/* 点击查询 出现 隐藏search框 */
$(".my-search-btn").on("click",function(e){
	var w_h = $(window).height();
    $(this).parent().parent().next().toggle();
    $(".searchBox").is(':hidden') ? $(".slide-left .ztree-box").height((w_h-90)+"px"):$(".slide-left .ztree-box").height((w_h-141)+"px");
    e.stopPropagation();
});
//计算高度
function resizeHeight(){
	var w_h = $(window).height();
    //左侧  头部底部为60px  title类 为50px
    $(".slide-left .ztree-box").height((w_h-90)+"px");
    //右侧table
    $(".con-table .mytable").height((w_h-130)/2+"px");
  //右侧table
    $(".con-table .myUsertable").height((w_h-70)+"px");
}
//计算表格宽度
function resizeGrid(){
	var mytable = $(".mytable").eq(0);
	$(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(mytable).height()-45);
	$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(mytable).width()-2, true);
	$.xljUtils.gridResizeFn();
	//$(".ui-jqgrid-bdiv").height(($(".mytable").height()-45)+"px");
	//$(".ui-jqgrid-bdiv").height(($(".mytable").width())+"px");
}
function resizeZTree(){
	$('.ztree-box').niceScroll().resize();
}
//grid 自适应宽度
$(window).resize(function(){
	resizeHeight();
	resizeGrid();
});
/*展开收起*/
$(".expend-col").on("click",function(){
	$(this).toggleClass("col");
	var mytable = $(this).parents(".con-table").find(".tableStyle").eq(0);
	var mytable1 = $(this).parents(".con-table").find(".tableStyle").eq(1);
	var my_h = mytable.height();
	if($(this).hasClass("col")){
		mytable.height(my_h*2);
		mytable.find(".ui-jqgrid-bdiv table").setGridHeight($(mytable).height()-45);
		mytable1.hide();
	}else{
		mytable.height(my_h/2);
		mytable.find(".ui-jqgrid-bdiv table").setGridHeight($(mytable).height()-45);
		mytable1.show();
	}
	$.xljUtils.gridResizeFn();
});
//表格上面 按岗位 切换
$(".right-content .con-tit button").on("click",function(e){
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
	var index = $(this).index();
	var tables = $(".right-content").find(".con-table");
	tables.hide();
	tables.eq(index).show();
    e.stopPropagation();
});