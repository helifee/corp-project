/**
 * 角色管理列表
 * @author shiyong，update by guoyanhong
 */

//全局参数
//角色树
var zTreeObj;
//通用角色对象
var jqGridRef;
//对象管辖范围
var jqGridRefScope;

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
	var resultVal =false;
	if(treeNode.mold =="cata"){
		var urlBody = "sys/org/roleCatalog/update/"+treeNode.id;
	    var urlAll = hostUrl + urlBody;
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
	            	resultVal =true;
	            }else{
	            	pop_tip_open("red",json.msg);
	            	resultVal =false;
	            }
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","修改角色分类请求失败");
	        	resultVal =false;
	        }
	    })
	}else{
		var urlBody = "sys/org/standardRole/update/"+treeNode.id;
	    var urlAll = hostUrl + urlBody;
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
	            	resultVal =true;
	            }else{
	            	pop_tip_open("red",json.msg);
	            	resultVal =false;
	            }
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","修改角色状态请求失败");
	        	resultVal =false;
	        }
	    })
	}
	
	return resultVal;
	
	
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
var refOnId='';
/**
 * 通用角色对象
 */
function initJqGridRef(){
	var ubody = "sys/org/roleUser/queryRoleRefListByRoleId";
	var uall = hostUrl+ubody;
    //创建jqGrid组件
    jqGridRef = jQuery("#listRef").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{"roleId":""},
            datatype : "json", 
            // width:$('.mytable').width(),
            autowidth:true,
            height:$('.mytable').height()-45,
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            // colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
            //      {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
            //      {name : 'userId',label : '用户Id',width : 55,align : "center",hidden : true},
            //      {name : 'postId',label : '岗位Id',width : 55,align : "center",hidden : true},
            //      {name : 'targetType',label : '对象类型',width : 180,align : "center",formatter:refTypeFmatter},
            //      {name : 'targetName',label : '对象',width : 180,align : "center"}
            // ],
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : '序号',align : "center",hidden : true},
                 {name : 'userId',label : '用户Id',align : "center",hidden : true},
                 {name : 'postId',label : '岗位Id',align : "center",hidden : true},
                 {name : 'targetType',label : '对象类型',align : "center",formatter:refTypeFmatter},
                 {name : 'targetName',label : '对象',align : "center"}
            ],
            rowNum : -1,//一页显示多少条
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            onCellSelect:function(rowid){
	        	var queryData={
	        			"roleUserId":rowid
	        			};
				var gridW = $(".mytable").eq(0).width()-2;
	        	jQuery("#listRefScope").jqGrid("setGridParam", { postData: queryData }).setGridWidth(gridW, true).trigger("reloadGrid");
            },
			gridComplete: function () {
				if(refOnId){
            		$(this).jqGrid("setSelection",refOnId);
            	}
				$(".ui-widget-content").css({"overflow":"hidden"});
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
			},
            viewrecords : true
        });
}

/**
 * 对象管辖范围
 */
var refScopeOnId;
function initJqGridRefScope(){
	var ubody = "sys/org/roleUserPostScope/queryScopeByRefId";
	var uall = hostUrl+ubody;
    jqGridRefScope = jQuery("#listRefScope").jqGrid({
		   url: uall,
	       ajaxGridOptions: { contentType: 'application/json' },
	       mtype : "POST",  
	       contentType : "application/json",  
	       datatype : "json", 
	       postData:{"roleUserId":""},
	       loadonce:false,
	       width:$('.mytable').width(),
	       height:$('.mytable').height()-45,
	       jsonReader : {
	           root:"result"
	       },
	       rownumbers: true,
	       colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                        {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                        {name : 'type',label : '管辖范围类型',width : 517,align : "center",hidden : true},
                        {name : 'refId',label : '管辖范围类型',width : 517,align : "center",hidden : true},
                        {name : 'scopeName',label : '管辖范围',width : 517,align : "center"}
           ],
	       rowNum : -1,//一页显示多少条
			gridComplete: function () {
				if(refScopeOnId){
            		$(this).jqGrid("setSelection",refScopeOnId);
            	}
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
		impostId =""
    	var queryDataUser={
    			"roleId":treeNode.id
    			};
    	jQuery("#listRef").jqGrid("setGridParam", { postData: queryDataUser }).trigger("reloadGrid");
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
	/*lastValue = "";
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var value = $.trim(key.get(0).value);
	//如果搜索框内无内容，不进行搜索，展开所有节点
	if(value == ""){
		zTree.expandAll(true);
		setTimeout(function(){
			$.xljUtils.addTreeScroll('ztree-box');
			$.xljUtils.treeResizeFn();
		},300);
	}else{
		searchNode();
	}*/
	$.xljUtils._searchTreeBtnEvent(key,zTreeObj);
}
function searchNode(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var keyType = "name";
	var value = $.trim(key.get(0).value);
	if (lastValue === value) return;
	lastValue = value;
	if (value === "") return;
	updateNodes(false);

	nodeList = zTree.getNodesByParamFuzzy(keyType, value);
	for(var i=0;i<nodeList.length;i++){
		var node=nodeList[i];
		var parentNode=node.getParentNode();
		if(parentNode && !parentNode.open){
			zTree.expandNode(parentNode,true,false,false,true);
		}
	}
	updateNodes(true);

}
function updateNodes(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	for( var i=0, l=nodeList.length; i<l; i++) {
		nodeList[i].highlight = highlight;
		zTree.updateNode(nodeList[i]);
	}
}
/*function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}*/

/**
 * 个性化文字样式，只针对 zTree 在节点上显示的对象
 * @param treeId
 * @param treeNode
 * @returns
 */
function getFontCss(treeId, treeNode) {
	/*return (!!treeNode.highlight) ? {color:'#A60000', "font-weight":"bold"} : {color:"#333", "font-weight":"normal"} | (treeNode.status&&treeNode.status=='0') ?
	        {'color':'#CD0000'} :
	        {color:"#333", "font-weight":"normal",'font-style':'normal'};*/
	/*return (treeNode.highlight) ?
		    {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
		        {color:"#333", "font-weight":"normal",'font-style':'normal'} | (treeNode.status&&treeNode.status=='0') ?
		        {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
		        {color:"#333", "font-weight":"normal",'font-style':'normal'};*/
	return (treeNode.highlight&&treeNode.highlight=='true') ?
            {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
                {color:"#333", "font-weight":"normal",'font-style':'normal'} | (treeNode.status&&treeNode.status=='0') ?
                {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
                {color:"#333", "font-weight":"normal",'font-style':'normal'};
}
function filter(node) {
	return !node.isParent && node.isFirstNode;
}


function showLog(str) {
	if (!log) log = $("#log");
	log.append("<li class='"+className+"'>"+str+"</li>");
	if(log.children("li").length > 8) {
		log.get(0).removeChild(log.children("li")[0]);
	}
}
function getTime() {
	var now= new Date(),
	h=now.getHours(),
	m=now.getMinutes(),
	s=now.getSeconds(),
	ms=now.getMilliseconds();
	return (h+":"+m+":"+s+ " " +ms);
}

function setTrigger() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.setting.edit.drag.autoExpandTrigger = $("#callbackTrigger").attr("checked");
}

/**
 * 递归获取树图片样式
 */
function recursionArray(arr) {
    for(var i in arr) {
//    	arr[i].name=$.xljUtils.htmlDecode(arr[i].name);
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
    var urlAll = hostUrl + urlBody;
    var data={
    		type:0
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
				window.open("role_edit.html");
			}
		}
	}else{
		editType = 0;
		var nodes = zTreeObj.getSelectedNodes();
		if(nodes.length==1 && nodes[0].mold=="cata"){
			selNodeId=nodes[0].id;
			selNodeName=nodes[0].name;
			selNodeType=nodes[0].type;
		}
		window.open("role_edit.html");
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
    var urlAll = hostUrl + urlBody;
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
    var urlAll = hostUrl + urlBody;
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
 * 修改角色状态
 */
function updatestatusRole(node,sign){
	var urlBody = "sys/org/standardRole/update/"+node.id;
    var urlAll = hostUrl + urlBody;
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
    var urlAll = hostUrl + urlBody;
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
//				pop_text_open("blue","确定要删除"+nodes[0].name+"这个角色吗？",function(){
				pop_text_open("blue","确定要删除这个角色吗？",function(){
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
    var urlAll = hostUrl + urlBody;
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
    var urlAll = hostUrl + urlBody;
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
 * 通用角色引入对象
 */
var importOrgNode;
function openImportRef(){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择角色");
	}else{
		if(nodes[0].mold == "cata"){
			pop_tip_open("blue","请选择角色，不能选择分类");
		}else{
			importOrgNode = nodes[0];
			window.open("role_importRef.html");
		}
	}
	
}

/**
 * 通用角色删除引用对象
 */
function deleteRef(){
	//多选框获取IDS
//	var ids=jqGridRef.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
	var ids=jqGridRef.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择引用对象");
	}else{
		pop_text_open("blue",'确定删除这【1】条数据吗？',function(){
			var uBody = "sys/org/roleUser/deletePseudo/"+ids;
		    var uAll = hostUrl + uBody;
			$.ajax({
		        type:'DELETE',
		        url:uAll,
		        dataType:'json',
		        success: function(json) {
		        	if(json.success == true){
		            	pop_tip_open("green",json.msg);
		            	var roleUserId="";
		            	var nodes = zTreeObj.getSelectedNodes();
		            	var nextId = '';
		            	if($("#listRef #"+ids).next().length >0){
		            		nextId=$("#listRef #"+ids).next()[0].id;//获取选择数据下一行的ID
		            	}
		            	var lastId = '';
		            	if($("#listRef #"+ids).prev().length >0){
		            		lastId=$("#listRef #"+ids).prev()[0].id;//获取选择数据上一行的ID
		            	}
		            	var flag=true;
		            	if(lastId!='' && lastId!=null){
		            		refOnId=lastId;
		            		flag=false;
		            	}
		            	
		            	if(flag && nextId!='' && nextId!=null){
		            		refOnId=nextId;
		            	}
		            	if(refOnId !=null && (lastId !='' ||nextId!='' )){
		            		roleUserId=refOnId;
		            	}
		            	var queryDataPost={
		            			"roleUserId":roleUserId
		            			};
		            	jqGridRef.jqGrid("setGridParam", { postData: queryDataPost }).trigger("reloadGrid");
		            	var queryDataPostUser={
		            			"roleUserId":roleUserId
		            			};
		            	jqGridRefScope.jqGrid("setGridParam", { postData: queryDataPostUser }).trigger("reloadGrid");
		            }else{
		            	pop_tip_open("red",json.msg);
		            }
		        },error:function(XMLHttpRequest, textStatus, errorThrown){
		        	pop_tip_open("red","删行请求失败");
		        }
		    })
	    },true);
		
	}
}
var selRefId;
/**
 * 引入管辖范围
 */
function openImportScope(){
	var ids=jqGridRef.jqGrid('getGridParam','selrow');
	if(null == ids){
		pop_tip_open("blue","请先选择引用对象");
	}else{
		selRefId = ids;
		window.open("role_importScope.html");
	}
}



/**
 * 移除管辖范围
 */
function deleteScope(){
	//多选框获取IDS
//	var ids=jqGridRefScope.jqGrid('getGridParam','selarrrow');
	//单选移除用户id
	var ids=jqGridRefScope.jqGrid('getGridParam','selrow');
	var list = new Array();
	if(null == ids){
		pop_tip_open("blue","请选择引用对象");
	}else{
		list.push(ids);
		//引用对象ID
		var post_ids=jqGridRef.jqGrid('getGridParam','selrow');
		if(list.length == 0){
			pop_tip_open("blue","请选择用户");
		}else{
			pop_text_open("blue",'确定要移除这条管辖范围吗？',function(){
				var deletedata ={
						userIds:list,
						postIds:post_ids,
						type:"users"
				}
				var uBody = "sys/org/roleUserPostScope/delete/"+ids;
			    var uAll = hostUrl + uBody;
				$.ajax({
					type:'DELETE',
			        url:uAll,
			        async: false,
			        dataType:'json',
			        contentType:'application/json',
			        data:JSON.stringify(deletedata),
			        success: function(json) {
			            if(json.success == true){
			            	pop_tip_open("green",json.msg);
			            	var nextId = '';
			            	if($("#listRefScope #"+ids).next().length >0){
			            		nextId=$("#listRefScope #"+ids).next()[0].id;//获取选择数据下一行的ID
			            	}
			            	var lastId = '';
			            	if($("#listRefScope #"+ids).prev().length >0){
			            		lastId=$("#listRefScope #"+ids).prev()[0].id;//获取选择数据上一行的ID
			            	}
			            	var flag=true;
			            	if(lastId!='' && lastId!=null){
			            		refScopeOnId=lastId;
			            		flag=false;
			            	}
			            	
			            	if(flag && nextId!='' && nextId!=null){
			            		refScopeOnId=nextId;
			            	}
			            	var queryDataPostUser={
			            			"roleUserId":post_ids
			            			};
			            	jqGridRefScope.jqGrid("setGridParam", { postData: queryDataPostUser }).trigger("reloadGrid");
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
 * 引用类型格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function refTypeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "人员";
	}else if(cellvalue == "2"){
		return "岗位";
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



$(function(){
	//miying样式初始化需要
    resizeHeight();
    //初始化角色树
	getRoleTree();
	//初始化按岗位岗位列表
	initJqGridRef();
	//初始化按岗位用户列表
	initJqGridRefScope();
	
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    
    $("#leaderButton").on('click',function(){
    	//获取选择的岗位
    	var ids=jqGridRef.jqGrid('getGridParam','selrow');
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
//grid 自适应宽度
$(window).resize(function(){
	resizeHeight();
	resizeGrid();
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