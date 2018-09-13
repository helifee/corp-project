/**
 * 引入组织机构
 * @author guoyanhong
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
/**
 * 双击组织机构树
 * @param event
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function zTreeOnDblClick(event, treeId, treeNode) {
	if(treeNode.type == 'cata'){
		pop_tip_open("blue","只能选择组织机构，不能选择目录");
		return false;
	}
	var isexist = false ;
	var obj=$("#listorg").jqGrid("getRowData");
	jQuery(obj).each(function(){
		if(this.refId == treeNode.id){
			isexist =  true;
		}
	});
	
	if(isexist){
		pop_tip_open("blue","组织机构已存在，请重新选择");
		return false;
	}
	//获取单选组织机构树的节点
    var selectedId = $("#listorg").jqGrid("getGridParam", "selrow");   
    var ids = jQuery("#listorg").jqGrid('getDataIDs');  
    newrowid = newrowid+1;  
    var dataRow = {    
        id: treeNode.id,  
        refId:treeNode.id,  
        type:treeNode.type,  
        refName:treeNode.name,  
        prefixName:treeNode.prefixName,
        sort:''
    }; 
    //将新添加的行插入到第一列  
    $("#listorg").jqGrid("addRowData", newrowid, dataRow, "first");
	$.xljUtils.addGridScroll();
	$.xljUtils.gridResizeFn();
};

/**
 * 初始化已选组织
 */
function initJqGridOrg(){
	var ubody = "sys/org/post/queryPostListByRoleId";
	var uall = hostUrl+ubody;
	var roleId=window.opener.importOrgNode.id;
    //创建jqGrid组件
    var jqGridorg = jQuery("#listorg").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{"roleId":roleId,"roleType":"role"},
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                         {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                         {name : 'refId',label : '组织机构id',width : 55,align : "center",hidden : true},
                         {name : 'type',label : '组织机构类型',width : 55,align : "center",hidden : true},
                         {name : 'refName',label : '组织机构名称',width : 410,align : "center"},
                         {name : 'prefixName',label : '所属组织',width : 517,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            ondblClickRow:function(rowid,iRow){
            	$("#listorg").jqGrid("delRowData", rowid);
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
            },
			gridComplete: function() {//当表格所有数据都加载完成，
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
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
	/*lastValue = "";
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var value = $.trim(key.get(0).value);
	//如果搜索框内无内容，不进行搜索，展开所有节点
	if(value == ""){
		zTree.expandAll(true);
		setTimeout(function(){
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
	/*return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};*/
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
            var nodes = zTreeObj.getNodes();
            //默认展开第一个节点
            zTreeObj.expandNode(nodes[0], true, false, false,false);
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

/**
 * 新增标准角色
 */
function savePost() {
    var uBody = "sys/org/post/saveBatch";
    var uAll = hostUrl + uBody;
    var obj=$("#listorg").jqGrid("getRowData");
    var ids = "";
    var uuid = "";
    var types = "";
    jQuery(obj).each(function(){
    	var uuidBody = "generator/getGuuid"+"?time="+Math.random();
        var uuidAll = hostUrl + uuidBody;
    	ids += this.refId + ",";
    	types += this.type + ",";
    	$.ajax({
            type:'GET',
            url:uuidAll,
            dataType:'json',
            async:false,
            contentType:'application/json',
            data:'{}',
            success: function(json) {
            	uuid += json.result+",";
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
    		roleids:window.opener.importOrgNode.id,
    		refId:ids,
    		uuids:uuid,
    		type:types,
    		method:"orgs"
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
            	var queryDataPost={
            			"roleId":window.opener.importOrgNode.id
            			};
            	var queryDataPostUser={
            			"postId":""
            			};
            	window.opener.jqGridPost.jqGrid("setGridParam", { postData: queryDataPost }).trigger("reloadGrid");
            	window.opener.jqGridPostUser.jqGrid("setGridParam", { postData: queryDataPostUser }).trigger("reloadGrid");
            	window.close();
            }else{
            	pop_tip_open("red",json.msg);
            }
        }
    })
}


$(function(){
	/*
	 *
	 * miying add
	 * */
	//计算高度
	resizeHeight();
	function resizeHeight(){
		var w_h = $(window).height();
		//左侧  头部底部为60px  title类 为50px
		$(".slide-left .ztree-box").height((w_h-160)+"px");
		//右侧table
		$(".con-table .mytable").height(w_h-90+"px");
	}
	//grid 自适应宽度
	$(window).resize(function(){
		resizeHeight();
		$("#listRole").setGridWidth($('.mytable').width()-2,true);
		$.xljUtils.gridResizeFn();
	});

	//初始化已选组织
	initJqGridOrg();
	//初始化组织机构树
	getOrgTree();
	//页面加载完毕后更改grid宽高
	$.xljUtils.resizeNestedGrid();
});
