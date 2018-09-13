/**
 * 设置管辖范围
 * @author shiyong
 */
var zTreeObj;

//树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};

//zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
		view: {
            fontCss: getFontCss
        },
	edit: {
		enable: false,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onDblClick: zTreeOnDblClick,
		onCollapse: function(){
            $.xljUtils.treeResizeFn();
        },
        onExpand: function(){
            $.xljUtils.treeResizeFn();
        }
	}
};

var newrowid = 0;
function zTreeOnDblClick(event, treeId, treeNode) {
	
	if(treeNode.type == 'cata'){
		pop_tip_open("blue","只能选择组织机构，不能选择目录");
		return false;
	}
	var isexist = false ;
	var obj=$("#listscope").jqGrid("getRowData");
	jQuery(obj).each(function(){
		if(this.id == treeNode.id){
			isexist =  true;
		}
	});
	
	if(isexist){
		pop_tip_open("blue","组织机构已存在，请重新选择");
		return false;
	}
	
	
    //获得新添加行的行号（数据编号）  
    newrowid = newrowid+1;  
    var dataRow = {    
        id: treeNode.id,  
        type:treeNode.type,  
        name:treeNode.name,
        prefixName:treeNode.prefixName
    }; 
    //将新添加的行插入到第一列  
    $("#listscope").jqGrid("addRowData", newrowid, dataRow, "first");  
    
};

/**
 * 默认插入管辖范围数据
 */
function initJpGridinsertScope() {
	if(window.opener.scope_orgIds != ""){
		var s_orgIds = window.opener.scope_orgIds.split(",");
		var s_orgNames = window.opener.scope_orgNames.split(",");
		if(s_orgIds.length > 0){
			for(var i=0;i<s_orgIds.length;i++){
				//获得新添加行的行号（数据编号）  
				  newrowid = newrowid+1;  
				  var treeNode = zTreeObj.getNodeByParam("id", s_orgIds[i], null);
				  var dataRow = {    
				      id: s_orgIds[i],  
				      type:"",  
				      name:s_orgNames[i],
				  	  prefixName:treeNode.prefixName
				  }; 
				  //将新添加的行插入到第一列  
				  $("#listscope").jqGrid("addRowData", newrowid, dataRow, "first");  
			}
		}
	}
	
};


/*
 * 初始化管辖范围
 */
function initJqGridscope(){
    //创建jqGrid组件
    var jqGridscope = jQuery("#listscope").jqGrid(
        {
            width:$('.mytable').width(),
			height:$('.mytable').height()-45,
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                         {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                         {name : 'type',label : '序号',width : 55,align : "center",hidden : true},
                         {name : 'name',label : '组织机构名称',width : 410,align : "center"},
                         {name : 'prefixName',label : '所属组织',width : 410,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            ondblClickRow:function(rowid,iRow){
            	$("#listscope").jqGrid("delRowData", rowid);  
            },
            viewrecords : true
        });
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
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var value = $.trim(key.get(0).value);
	//如果搜索框内无内容，不进行搜索，展开所有节点
	if(value == ""){
		zTree.expandAll(true);
		$.xljUtils.treeResizeFn();
	}else{
		searchNode();
	}
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



/**
 * 递归设置树的图片样式
 */
function recursionArray(arr) {
	//所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
    for(var i in arr) {
    	if(/['"#$%&\^*]/.test(arr[i].name)){
    		arr[i].name=$.xljUtils.htmlDecode(arr[i].name);
    	}
    	if(arr[i].type == "zb" || arr[i].type == "company") {
            arr[i].iconSkin = "diy-company";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "dept" ) {
            arr[i].iconSkin = "diy-department";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "group" ) {
            arr[i].iconSkin = "diy-program";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "branch" ) {
            arr[i].iconSkin = "diy-program";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "cata" ) {
        	arr[i].iconSkin = "diy-group";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        } 
    }
};
var key;
/**
 * 获取组织机构树
 */
function getOrgTree() {
    var urlBody = "sys/org/root/getTree";
    var urlAll = hostUrl + urlBody;
    var jsonData={
    		rootDelFlag:0,
    		orgDelFlag:0,
    		rootStatus:1,
    		orgStatus:1
    };
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(jsonData),
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            var pid = window.opener.imScopeOrgId;
            var node = zTreeObj.getNodeByParam("id",pid);
            zTreeObj.selectNode(node,true);//指定选中ID的节点  
            zTreeObj.expandNode(node, true, false);//指定选中ID节点展开  
            key = $("#key");
			key.bind("focus", focusKey)
			.bind("blur", blurKey)
			.bind("propertychange", searchNode)
			.bind("input", searchNode);
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
			initJpGridinsertScope();
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","获取组织机构树请求失败");
        }
    })
}

/**
 * 保存管辖范围
 */
function savePost() {
    var uBody = "sys/org/userPostScope/saveBatch";
    var uAll = hostUrl + uBody;
    var uuidBody = "generator/getGuuid"+"?time="+Math.random();
    var uuidAll = hostUrl + uuidBody;
    
    
    
    var obj=$("#listscope").jqGrid("getRowData");

    var ids = "";
    var uuid = "";
    var types = "";
    jQuery(obj).each(function(){
    	ids += this.id + ",";
    	types += this.type + ",";
    	$.ajax({
            type:'GET',
            url:uuidAll,
            dataType:'json',
            async:false,
            contentType:'application/json',
//            data:'{}',
            success: function(json) {
//                $('#id').val(json.result);
            	uuid += json.result+",";
            },error:function(XMLHttpRequest, textStatus, errorThrown){
            	pop_tip_open("red","获取ID请求失败");
            }
        });

    });
    if(ids == ""){
    	pop_tip_open("blue","请选择组织机构");
    	return false;
    }
    if (ids.length > 0 ) ids = ids.substring(0, ids.length-1);
    if (types.length > 0 ) types = types.substring(0, types.length-1);
    if (uuid.length > 0 ) uuid = uuid.substring(0, uuid.length-1);
    var savedata={
    		userId:window.opener.scope_userId,
    		postId:window.opener.scope_postId,
    		uuids:uuid,
    		refId:ids
    };
    
    $.ajax({
        type:'POST',
        url:uAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(savedata),
        success: function(json) {
            if(json.success == true){
            	var queryDataUserPost={
            			"userId":window.opener.scope_userId
            			};
            	window.opener.jqGridUserPost.jqGrid("setGridParam", { postData: queryDataUserPost }).trigger("reloadGrid");
            	window.close();
            }else{
            	pop_tip_open("red",json.msg);
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","保存管辖范围请求失败");
        }
    })
}


$(function(){
	//初始化initJqGridscope
	initJqGridscope();
	//初始化组织机构树
	getOrgTree();
	//初始化数据
//	initJpGridinsertScope();
});
/*
*
* miying add
* */
var w_h = $(window).height();
//计算高度
resizeHeight();
function resizeHeight(){
	//左侧  头部底部为60px  title类 为50px
	$(".slide-left .ztree-box").height((w_h-160)+"px");
	//右侧table
	$(".con-table .mytable").height(w_h-90+"px");
}
//grid 自适应宽度
$(window).resize(function(){
	resizeHeight();
	$("#listRole").setGridWidth($('.mytable').width());
});
/*//右侧table加滚动条
$(".mytable").mCustomScrollbar({
	axis:"yx",
	scrollInertia : 20//滚动的缓动速度
}).mCustomScrollbar("scrollTo","right");//跳到最右;

//左侧加滚动条
$(".ztree-box").mCustomScrollbar({
	scrollInertia : 20//滚动的缓动速度
});*/


