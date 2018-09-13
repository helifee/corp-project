var zTreeObj;
var urlBody = "";
var urlAll = "";
var jqGrid2;
var jqGrid3;
var jqGrid4;
var jqGrid5;
var impostId ="";

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
		enable: false,
		showRemoveBtn:false,
        showRenameBtn:false
//        drag: {  
//            autoExpandTrigger: true,  
//            prev: dropPrev,  
//            inner: dropInner,  
//            next: dropNext,
//            isCopy: false,
//            isMove: true
//        }
        
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
//        beforeDrag: beforeDrag, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
//        beforeDrop: beforeDrop, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
//        beforeDragOpen: beforeDragOpen, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
//        onDrag: onDrag, //捕获节点被拖拽的事件回调函数  
//        onDrop: onDrop, //捕获节点拖拽操作结束的事件回调函数  
//        onExpand: onExpand, //捕获节点被展开的事件回调函数  
        onClick:zTreeOnClick //点击节点事件
    }  
};


//树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};

/*
 * 初始化岗位和人员列表数据
 */


function initJqGrid2(){
	var ubody = "platform-app/sys/org/post/queryPostListByRoleId";
	var uall = urlHost+ubody;
    //创建jqGrid组件
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{"roleId":""},
            datatype : "json", 
            height:220,
            jsonReader : {
                root:"result"
            },
            autowidth:true,
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                 {name : 'code',label : '所属机构',width : 360,align : "center"},
                 {name : 'name',label : '角色名称',width : 180,align : "center"},
                 {name : 'type',label : '类型',width : 180,align : "center"},
                 {name : 'sort',label : '直属领导岗位',width : 207,align : "center"}
            ],
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            onCellSelect:function(rowid){
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
	var ubody = "platform-app/sys/org/user/queryUserListByRoleId";
	var uall = urlHost+ubody;
    //创建jqGrid组件
    jqGrid4 = jQuery("#list4").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{"roleId":""},
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
                 {name : 'realName',label : '用户名',width : 90,align : "center",cellattr: addCellAttr},
                 {name : 'loginName',label : '账号',width : 90,align : "center"},
                 {name : 'belongOrgId',label : '所属组织机构',width : 164,align : "center"},
                 {name : 'type',label : '用户类型',width : 90,align : "center",formatter:jqGrid3TypeFmatter},
                 {name : 'createDate',label : '创建时间',width : 120,align : "center"},
                 {name : 'status',label : '状态',width : 90,align : "center",formatter:statusFmatter,cellattr: addCellAttr},
                 {name : 'disableTime',label : '禁用时间',width : 134,align : "center"}
            ],
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#pager4',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
//            onCellSelect:function(rowid){
////            	imuserId = rowid;
//	        	var queryData={
//	        			"userId":rowid
//	        			};
//	        	jQuery("#list5").jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
//            },
            
            viewrecords : true
        }).navGrid('#pager4', { add: false, edit: false, del: false,search:false,refresh:false });
}





/*
 * 树点击节点事件
 */

function zTreeOnClick(event, treeId, treeNode) {
	impostId =""
	var queryData2={
			"roleId":treeNode.id
			};
	var queryData3={
			"postId":""
			};
	var queryData4={
			"roleId":treeNode.id
			};
	jQuery("#list2").jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	jQuery("#list3").jqGrid("setGridParam", { postData: queryData3 }).trigger("reloadGrid");
	jQuery("#list4").jqGrid("setGridParam", { postData: queryData4 }).trigger("reloadGrid");
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
    	if(arr[i].mold == "cata") {
            arr[i].icon = "../css/zTreeStyle/img/diy/main.png";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].mold == "role" ) {
            arr[i].icon = "../css/zTreeStyle/img/diy/12.png";
        }
    }
};
var key;
//获取角色树
function getRoleTree() {
    urlBody = "platform-app/sys/org/roleCatalog/getRoleTree";
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

//打开引入组织机构方法
var importOrgNode;
function openImportOrg(){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		alert("请先选择角色");
	}else{
		importOrgNode = nodes[0];
		window.open("importorg.html");
	}
	
}

//移除组织机构，删除岗位
function deleteOrg(){
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
	            			"roleId":nodes[0].id
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
	            			"roleId":nodes[0].id
	            			};
	            	jqGrid4.jqGrid("setGridParam", { postData: queryData4 }).trigger("reloadGrid");
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
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
		window.open("../org/importuser.html");
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





$(function(){
	//初始化initJqGrid2
	initJqGrid2();
	//初始化initJqGrid3
	initJqGrid3();
	//初始化initJqGrid4
	initJqGrid4();
	//初始化角色树
	//getOrgTree();
	getRoleTree();
});

//测试
//var orgTree = $.fn.zTree.getZTreeObj('#treeDemo');
//console.log("tree" + orgTree);

//获取标准角色id
function getStandardId() {
    urlBody = "platform-app/generator/getGuuid";
    urlAll = urlHost + urlBody;
    $.ajax({
        type:'GET',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:'{}',
        success: function(json) {
            $('#id').val(json.result);
        }
    })
}
getStandardId();

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