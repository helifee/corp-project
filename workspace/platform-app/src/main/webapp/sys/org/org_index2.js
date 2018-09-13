var zTreeObj;
var urlBody = "";
var urlAll = "";
var jqGrid2;
var jqGrid3;
var jqGrid4;
var jqGrid5;
var impostId ="";
var imuserId ="";

var includelow = "0";


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
        showRenameBtn:false,
        drag: {  
            autoExpandTrigger: true,  
            prev: dropPrev,  
            inner: dropInner,  
            next: dropNext,
            isCopy: false,
            isMove: true
        }
        
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
        onClick: null,  
        beforeDrag: beforeDrag, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
        beforeDrop: beforeDrop, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
        beforeDragOpen: beforeDragOpen, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
        onDrag: onDrag, //捕获节点被拖拽的事件回调函数  
        onDrop: onDrop, //捕获节点拖拽操作结束的事件回调函数  
        onExpand: onExpand, //捕获节点被展开的事件回调函数  
        onClick:zTreeOnClick //点击节点事件
    }  
};

//拖拽树的参数
var log, className = "dark", curDragNodes, autoExpandNode;
var source;
var target;
var type;

//树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};

/*
 * 初始化岗位和人员列表数据
 */
function initJqGrid2(){
	var ubody = "platform-app/sys/org/post/queryPostListByOrgId";
	var uall = urlHost+ubody;
    //创建jqGrid组件
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{"orgId":""},
            datatype : "json", 
            height:220,
            autowidth:true,
            rownumbers: true,
            jsonReader : {
                root:"result"
            },
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : '序号',align : "center" ,hidden : true},
                 {name : 'code',label : '所属机构',align : "center"},
                 {name : 'name',label : '角色名称',align : "center"},
                 {name : 'type',label : '角色类型',align : "center", formatter:postTypeFmatter},
                 {name : 'sort',label : '直属领导岗位',align : "center"}
            ],
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            onCellSelect:function(rowid){
            	//impostId = rowid;
	        	var queryData={
	        			"postId":rowid
	        			};
	        	jQuery("#list3").jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
            },
            
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

function initJqGrid3(){
	var ubody = "platform-app/sys/org/user/queryUserListByPostId";
	var uall = urlHost+ubody;
     jqGrid3 = jQuery("#list3").jqGrid({
		   url: uall,
	       ajaxGridOptions: { contentType: 'application/json' },
	       mtype : "POST",  
	       contentType : "application/json",  
	       datatype : "json", 
	       postData:{"postId":""},
	       loadonce:false,
	       jsonReader : {
	           root:"result"
	       },
           autowidth:true,
	       rownumbers: true,
	       multiselect: true,//复选框
	       colModel : [ 
	           {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
	           {name : 'realName',label : '用户名',width : 180,align : "center",cellattr: addCellAttr},
	           {name : 'loginName',label : '登录账号',width : 180,align : "center"},
	           {name : 'type',label : '用户类型',width : 180,align : "center",formatter:jqGrid3TypeFmatter},
	           {name : 'status',label : '状态',width : 150,align : "center",formatter:statusFmatter,cellattr: addCellAttr},
	           {name : 'createDate',label : '创建时间',width : 150,align : "center"},
	           {name : 'disableTime',label : '禁用时间',width : 300,align : "center"}
	       ],
	       rowNum : 10,//一页显示多少条
	       rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
	       pager : '#pager3',
	       viewrecords : true
	});
}

function initJqGrid4(){
	var ubody = "platform-app/sys/org/user/queryUserListByOrgId";
	var uall = urlHost+ubody;
    //创建jqGrid组件
    jqGrid4 = jQuery("#list4").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{"orgId":"","includelow":"0"},
            datatype : "json", 
            height:360,
            jsonReader : {
                root:"result"
            },
            autowidth:true,
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                 {name : 'sort',label : '排序号',width : 60,align : "center"},
                 {name : 'realName',label : '用户名',width : 180,align : "center",cellattr: addCellAttr},
                 {name : 'loginName',label : '账号',width : 90,align : "center"},
                 {name : 'belongOrgId',label : '所属组织机构',width : 164,align : "center"},
                 {name : 'type',label : '用户类型',width : 90,align : "center",formatter:jqGrid3TypeFmatter},
                 {name : 'createDate',label : '创建时间',width : 120,align : "center"},
                 {name : 'status',label : '状态',width : 90,align : "center",formatter:statusFmatter,cellattr: addCellAttr},
                 {name : 'disableTime',label : '禁用时间',width : 160,align : "center"}
            ],
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#pager4',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            onCellSelect:function(rowid){
//            	imuserId = rowid;
	        	var queryData={
	        			"userId":rowid
	        			};
	        	jQuery("#list5").jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
            },
            
            viewrecords : true
        }).navGrid('#pager4', { add: false, edit: false, del: false,search:false,refresh:false });
}

function initJqGrid5(){
	var ubody = "platform-app/sys/org/post/queryPostListByUserId";
	var uall = urlHost+ubody;
     jqGrid5 = jQuery("#list5").jqGrid({
		   url: uall,
	       ajaxGridOptions: { contentType: 'application/json' },
	       mtype : "POST",  
	       contentType : "application/json",  
	       datatype : "json", 
	       postData:{"userId":""},
	       loadonce:false,
	       jsonReader : {
	           root:"result"
	       },
	       autowidth:true,
	       rownumbers: true,
	       multiselect: true,//复选框
	       colModel : [ 
	           {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                 {name : 'code',label : '所属机构',width : 360,align : "center"},
                 {name : 'name',label : '角色名称',width : 100,align : "center"},
                 {name : 'type',label : '角色类型',width : 100,align : "center", formatter:postTypeFmatter},
                 {name : 'sort',label : '直属领导岗位',width : 207,align : "center"},
                 {name : 'a',label : '是否主岗',width : 80,align : "center"},
                 {name : 'orgIds',label : '管辖范围Ids',align : "center",hidden : true},
                 {name : 'orgNames',label : '管辖范围',width : 80,align : "center"}
	       ],
	       rowNum : 10,//一页显示多少条
	       rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
	       pager : '#pager5',
	       viewrecords : true
	});
}


/*
 * 更改组织机构排序
 */
function updateOrgSort(source,target,type) {
    var urlBody_updateOrgSort = "platform-app/sys/org/orgnazation/updateOrgSort";
    var urlAll_updateOrgSort = urlHost + urlBody_updateOrgSort;
    $.ajax({
        type:'POST',
        url:urlAll_updateOrgSort,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:{'source':source[0],'target':target,'type':'root'},
        success: function(json) {
            var result = json.result;
            alert(result);
        }
    })
}

/*
 * 拖拽回调方法
 */

function getFont(treeId, node) {
    return node.font ? node.font : {};
}
function dropPrev(treeId, nodes, targetNode) {  
    var pNode = targetNode.getParentNode();  
    if (pNode && pNode.dropInner === false) {  
        return false;  
    } else {  
        for (var i=0,l=curDragNodes.length; i<l; i++) {  
            var curPNode = curDragNodes[i].getParentNode();  
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {  
                return false;  
            }  
        }  
    }  
    return true;  
}  
function dropInner(treeId, nodes, targetNode) {  
    if (targetNode && targetNode.dropInner === false) {  
        return false;  
    } else {  
        for (var i=0,l=curDragNodes.length; i<l; i++) {  
            if (!targetNode && curDragNodes[i].dropRoot === false) {  
                return false;  
            } else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {  
                return false;  
            }  
        }  
    }  
    return true;  
}  
function dropNext(treeId, nodes, targetNode) {  
    var pNode = targetNode.getParentNode();  
    if (pNode && pNode.dropInner === false) {  
        return false;  
    } else {  
        for (var i=0,l=curDragNodes.length; i<l; i++) {  
            var curPNode = curDragNodes[i].getParentNode();  
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {  
                return false;  
            }  
        }  
    }  
    return true;  
}  

function beforeDrag(treeId, treeNodes) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
	for (var i=0,l=treeNodes.length; i<l; i++) {
		if (treeNodes[i].drag === false) {
			curDragNodes = null;
			return false;
		} else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
			curDragNodes = null;
			return false;
		}
	}
	curDragNodes = treeNodes;
	return true;
}
function beforeDragOpen(treeId, treeNode) {
	autoExpandNode = treeNode;
	return true;
}
function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
	showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"));
//	updateOrgSort(treeNodes, targetNode, moveType);
	var urlBody_updateOrgSort = "platform-app/sys/org/orgnazation/updateOrgSort";
    var urlAll_updateOrgSort = urlHost + urlBody_updateOrgSort;
    var data ={
    		source:treeNodes[0],
    		target:targetNode,
    		type:moveType
    }
    var ret = false;
    $.ajax({
        type:'POST',
        url:urlAll_updateOrgSort,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(data),
        success: function(json) {
            if(json.success == true){
            	alert(json.msg);
            	ret = true;
            }else{
            	alert(json.msg);
            	ret = false;
            }
        }
    })
	return ret;
}
function onDrag(event, treeId, treeNodes) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" onDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
}
function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" onDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
	showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"))
}
function onExpand(event, treeId, treeNode) {
	if (treeNode === autoExpandNode) {
		className = (className === "dark" ? "":"dark");
		showLog("[ "+getTime()+" onExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
	}
}


/*
 * 树点击节点事件
 */

function zTreeOnClick(event, treeId, treeNode) {
	//将引入用户和引入岗位的ID设置为空
	imuserId = "";
	impostId = "";
	var queryData2={
			"orgId":treeNode.id
			};
	var queryData3={
			"postId":""
			};
	var queryData4={
			"orgId":treeNode.id,
			"includelow":includelow
			};
	var queryData5={
			"userId":""
			};
	jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	jqGrid3.jqGrid("setGridParam", { postData: queryData3 }).trigger("reloadGrid");
	jqGrid4.jqGrid("setGridParam", { postData: queryData4 }).trigger("reloadGrid");
	jqGrid5.jqGrid("setGridParam", { postData: queryData5 }).trigger("reloadGrid");
}



/*
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

function clickRadio(e) {
	lastValue = "";
	searchNode(e);
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
			zTree.expandNode(parentNode,true,false,false,false);
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
function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
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



//递归树传icon
function recursionArray(arr) {
    for(var i in arr) {
    	if(arr[i].type == "zb" || arr[i].type == "company") {
            arr[i].icon = "../css/zTreeStyle/img/diy/main.png";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "dept" ) {
            arr[i].icon = "../css/zTreeStyle/img/diy/1_open.png";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "group" ) {
            arr[i].icon = "../css/zTreeStyle/img/diy/5.png";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "branch" ) {
            arr[i].icon = "../css/zTreeStyle/img/diy/3.png";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "cata" ) {
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        } 
    }
};
var key;
//获取组织机构树
function getOrgTree() {
    urlBody = "platform-app/sys/org/root/getTree";
    urlAll = urlHost + urlBody;
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:'{}',
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            key = $("#key");
			key.bind("focus", focusKey)
			.bind("blur", blurKey)
			.bind("propertychange", searchNode)
			.bind("input", searchNode);
        }
    })
}


//打开引入标准角色方法
var importroleOrgNode;
function openImportRole(){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		alert("请先选择组织机构");
	}else{
		importroleOrgNode = nodes[0];
		window.open("importrole.html");
	}
	
}
//打开引入岗位方法
function openImportPost(){
	//判断是否选择了用户
	//
//	if(imuserId == ""){
//		alert("请先选择用户");
//	}else{
//		window.open("importpost.html");
//	}
	
	
	var ids=jqGrid4.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择用户");
	}else{
		imuserId = ids;
		window.open("importpost.html");
	}
	
}
//打开引入用户方法
function openImportUser(){
	//判断是否选择了岗位
//	var ids=jqGrid2.jqGrid('getGridParam','selarrrow');
//	
//	if(ids.length == 0){
//		alert("请先选择岗位");
//	}else if(ids.length == 2){
//		alert("请选择一个岗位");
//	}else{
//		impostId = ids[0];
//		window.open("importuser.html");
//	}
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择岗位");
	}else{
		impostId = ids;
		window.open("importuser.html");
	}
	
}

//打开新增用户方法
function openAdduser(){
//	var nodes = zTreeObj.getSelectedNodes();
//	if(nodes.length < 1 ){
//		alert("请先选择组织机构");
//	}else{
//		importroleOrgNode = nodes[0];
//		window.open("importrole.html");
//	}
	window.open("adduser.html");
	
}

//移除标准角色
function deleteRole(){
	//多选框获取IDS
//	var ids=jqGrid2.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择岗位");
	}else{
		var uBody = "platform-app/sys/org/post/deletePseudoBatch/"+ids;
	    var uAll = urlHost + uBody;
		$.ajax({
	        type:'DELETE',
	        url:uAll,
	        dataType:'json',
//	        contentType:'application/json',
//	        data:'{}',
	        success: function(json) {
	        	if(json.success == true){
	            	alert(json.msg);
	            	var nodes = zTreeObj.getSelectedNodes();
	            	var queryData2={
	            			"orgId":nodes[0].id
	            			};
	            	var queryData3={
	            			"postId":""
	            			};
	            	jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            	jqGrid3.jqGrid("setGridParam", { postData: queryData3 }).trigger("reloadGrid");
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
	}
}

//移除用户一岗多用户
function deleteUser(){
	//多选框获取IDS
	var ids=jqGrid3.jqGrid('getGridParam','selarrrow');
	//岗位ID
	var post_ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids.length == 0){
		alert("请选择用户");
	}else{
		var deletedata ={
				userIds:ids,
				postIds:post_ids,
				type:"users"
		}
		var uBody = "platform-app/sys/org/postUser/deleteBatchByUserOrPostIds";
	    var uAll = urlHost + uBody;
		$.ajax({
			type:'POST',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(deletedata),
	        success: function(json) {
	            if(json.success == true){
	            	alert(json.msg);
	            	var queryData3={
	            			"postId":post_ids
	            			};
	            	jqGrid3.jqGrid("setGridParam", { postData: queryData3 }).trigger("reloadGrid");
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
	}
}

//移除岗位一用户多岗
function deletePost(){
	//多选框获取IDS
	var ids=jqGrid5.jqGrid('getGridParam','selarrrow');
	//userID
	var user_ids=jqGrid4.jqGrid('getGridParam','selrow');
	if(ids.length == 0){
		alert("请选择岗位");
	}else{
		var deletedata ={
				userIds:user_ids,
				postIds:ids,
				type:"posts"
		}
		var uBody = "platform-app/sys/org/postUser/deleteBatchByUserOrPostIds";
	    var uAll = urlHost + uBody;
		$.ajax({
			type:'POST',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(deletedata),
	        success: function(json) {
	            if(json.success == true){
	            	alert(json.msg);
	            	var queryData5={
	            			"userId":user_ids
	            			};
	            	jqGrid5.jqGrid("setGridParam", { postData: queryData5 }).trigger("reloadGrid");
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
	}
}

var scope_userId;
var scope_postId;
var scope_orgIds;
var scope_orgNames;
//设置管辖范围
function userPostScope(){
	//多选框获取IDS
	var ids=jqGrid5.jqGrid('getGridParam','selarrrow');
	//userID
	var user_id=jqGrid4.jqGrid('getGridParam','selrow');
	//获取岗位行数据，准备获取现有的管辖范围
	var rowData = jqGrid5.jqGrid('getRowData',ids);
	if(ids.length == 0){
		alert("请选择岗位");
	}else if(ids.length > 1){
		alert("只能选择一个岗位");
	}else{
		scope_userId = user_id;
		scope_postId = ids[0];
		scope_orgIds = rowData.orgIds;
		scope_orgNames = rowData.orgNames;
		window.open("importorg.html");
	}
}


//修改用户状态
function updatestatus(status){
	var ids=jqGrid4.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择用户");
	}else{
		var updatedata ={
				status:status,
		};
		var uBody = "platform-app/sys/org/user/update/"+ids;
	    var uAll = urlHost + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        success: function(json) {
	            if(json.success == true){
	            	alert(json.msg);
	            	
	            	var nodes = zTreeObj.getSelectedNodes();
	            	var queryData4={
	            			"orgId":nodes[0].id,
	            			"includelow":includelow
	            			};
	            	jqGrid4.jqGrid("setGridParam", { postData: queryData4 }).trigger("reloadGrid");
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
	}
	
}



//用户类型数据格式化
function jqGrid3TypeFmatter (cellvalue, options, rowObject) {
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

//岗位类型数据格式化
function postTypeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "company"){
		return "公司";
	}else if(cellvalue == "dept"){
		return "部门";
	}else if(cellvalue == "group"){
		return "项目";
	}else if(cellvalue == "branch"){
		return "分期";
	}
}

//initJqGrid数据格式化
function statusFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "启用";
	}else if(cellvalue == "0"){
		return "禁用";
	}
}


//格式化样式
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}


//包含下级组织
function includelowOrg(obj){
	if(obj.checked){
		includelow="1";
    }else{
    	includelow="0";
    }
	
	var nodes = zTreeObj.getSelectedNodes();
	var queryData4={
			"orgId":nodes[0].id,
			"includelow":includelow
			};
	jqGrid4.jqGrid("setGridParam", { postData: queryData4 }).trigger("reloadGrid");
	
}

$(function(){
	//初始化initJqGrid2
	initJqGrid2();
	//初始化initJqGrid3
	initJqGrid3();
	//初始化initJqGrid4
	initJqGrid4();
	//初始化initJqGrid5
	initJqGrid5();
	//初始化组织机构树
	getOrgTree();
});

//测试
//var orgTree = $.fn.zTree.getZTreeObj('#treeDemo');
//console.log("tree" + orgTree);

//新增标准角色
function addStandardRole() {
    urlBody = "platform-app/sys/org/standardRole/save";
    urlAll = urlHost + urlBody;
    $.ajax({

    })
}

$('.sidebar-toggle').click(function() {
    if($('body').hasClass('sidebar-collapse')) {
        console.log('false');
        $('.btnContainer').css('display','block');
        $('#treeDemo').css('display','block');
    }else{
        console.log('true');
        $('.btnContainer').css('display','none');
        $('#treeDemo').css('display','none');
    }
});