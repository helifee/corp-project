/**
 * 引入其他对象数据权限
 * @author shiyong
 */

var zTreeObj;

//树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};

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
		onDblClick: zTreeOnDblClick,
		onCollapse: function(){
          $.xljUtils.treeResizeFn();
      },
      onExpand: function(){
          $.xljUtils.treeResizeFn();
      }//点击节点事件
//      beforeRename: zTreeBeforeRename,//编辑节点之前
//      onRename: zTreeOnRename//编辑节点之后
	}
};


var newrowid = 0;
function zTreeOnDblClick(event, treeId, treeNode) {
	var objType = $('#objectType').val();
	if("standardPost"==objType){//标准岗位
		if(treeNode.mold == 'cata'){
			pop_tip_open("blue","只能选择角色，不能选择目录");
			return false;
		}
	}else if("role"==objType){//角色
		if(treeNode.mold == 'cata'){
			pop_tip_open("blue","只能选择角色，不能选择目录");
			return false;
		}
	}else if("post"==objType){//岗位
		if(treeNode.type != 'post'){
			pop_tip_open("blue","只能选择岗位");
			return false;
		}
	}else if("user"==objType){//用户
		if(treeNode.type != 'user'){
			pop_tip_open("blue","只能选择用户");
			return false;
		}
	}
	
	
	jQuery("#listUser").jqGrid("clearGridData");
	var isexist = false ;
	var obj=$("#listUser").jqGrid("getRowData");
	jQuery(obj).each(function(){
		if(this.objectId == treeNode.id){
			isexist =  true;
		}
	});
	
	if(isexist){
		pop_tip_open("blue","选择的已存在，请重新选择");
		return false;
	}
    //获得当前最大行号（数据编号）  
//    var rowid = Math.max.apply(Math,ids);  
    //获得新添加行的行号（数据编号）  
    newrowid = newrowid+1;  
    var dataRow = {    
        id: treeNode.id,  
        objectId:treeNode.id,
        name:treeNode.name
    }; 
    //将新添加的行插入到第一列  
    $("#listUser").jqGrid("addRowData", newrowid, dataRow, "first");
	$.xljUtils.addGridScroll();
	$.xljUtils.gridResizeFn();
};

/*
 * 初始化引入列表
 */
function initJqGridPost(){
    //创建jqGrid组件
    var jqGridRole = jQuery("#listUser").jqGrid(
        {
        	width:$('.mytable').width(),
			height:$('.mytable').height()-41,
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                         {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                         {name : 'objectId',label : '对象Id',width : 55,align : "center",hidden : true},
                         {name : 'name',label : '名称',width : 410,align : "center"}
//                         {name : 'rolePrefixName',label : '角色树',width : 517,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            ondblClickRow:function(rowid,iRow){
            	$("#listUser").jqGrid("delRowData", rowid);
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
function clickRadio() {
	var searchKeys = ['loginName', 'name'];
	var zTreeObj = $.fn.zTree.getZTreeObj("treeDemo");
	$.xljUtils._searchTreeBtnEvent(key,zTreeObj,searchKeys);
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
 * 递归获取树图片样式
 */
function recursionArrayRoleTree(arr) {
    for(var i in arr) {
    	if(/['"#$%&\^*]/.test(arr[i].name)){
    		arr[i].name=$.xljUtils.htmlDecode(arr[i].name);
    	}
    	if(arr[i].mold == "cata") {
            arr[i].iconSkin = "diy-roleType";
            if(arr[i].children.length > 0) {
            	recursionArrayRoleTree(arr[i].children);
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
 * 获取角色树(标准岗位-角色到岗位)
 */
function getRoleTree(objType) {
	var urlBody = "sys/org/roleCatalog/getRoleTree";
	var data = {type:1,roleCataStatus:1};
	if("standardPost"==objType){//标准岗位
		urlBody = 'sys/org/roleCatalog/getRoleTree';
		data = {type:1,roleCataStatus:1};
	}else if("role"==objType){//角色
		urlBody = 'sys/org/roleCatalog/getRoleTree';
		data = {type:0,roleCataStatus:1};
	}else if("post"==objType){//岗位
		urlBody = 'sys/org/post/getPostTree';
		data = {rootDelFlag: 0, orgDelFlag: 0, postDelFlag: 0, rootStatus: 1, orgStatus: 1, postStatus: 1};
	}else if("user"==objType){//用户
		urlBody = 'sys/org/user/getUserTree';
		data = {rootDelFlag: 0, orgDelFlag: 0, postDelFlag: 0, rootStatus: 1, orgStatus: 1, postStatus: 1,userStatus:1,userDelFlag:0};
	}
	
	var urlAll = serviceUrl + urlBody;
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
			var searchKeys = ['loginName', 'name'];
			$.xljUtils._searchTreeInputEvent(key,zTreeObj,searchKeys);
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
		}
	})
}

/**
 * 递归获取树图片样式
 */
function recursionArray(arr) {
	for(var i in arr) {
		if(arr[i].type == "1" || arr[i].type == "0"){
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
		}else{
			//所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
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
	        }else if(arr[i].type == "post" ) {
	        	arr[i].iconSkin = "diy-roleType";
	        }else if(arr[i].type == "user" ) {
	        	arr[i].iconSkin = "diy-member";
	        }
	    }
	}
};

/**
 * 绑定下拉框(角色到动作点和查看角色页面)
 */
function binSelEvent(){
	$('#objectType').on("change",function(e){
		var objType = $('#objectType').val();
		getRoleTree(objType);
	});
}


/**
 * 保存 引入数据权限
 */
function save() {
    var uBody = "sys/res/dataPermission/saveBatchDataImport";
    var uAll = serviceUrl + uBody;
//    var importType = $('input[name="importType"]').filter(':checked').val();
    var obj=$("#listUser").jqGrid("getRowData");

    var ids = "";
    jQuery(obj).each(function(){
    	ids += this.objectId + ",";
    });
    if(ids == ""){
    	pop_tip_open("blue","请选择对象");
    	return false;
    }
    if (ids.length > 0 ) ids = ids.substring(0, ids.length-1);
    var savedata={
    		objectids:ids,
//    		importType:importType,
    		importObjectId:window.opener.importObjectId
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
            	window.opener.showAuthorizationData();
            	window.close();
            }else{
            	pop_tip_open("red",json.msg);
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","保存请求失败");
        }
    })
}


$(function(){
	var w_h = $(window).height();
	//计算高度
	resizeHeight();
	function resizeHeight(){
		//左侧  头部底部为60px  title类 为50px
		$(".slide-left .ztree-box").height((w_h-160)+"px");
		//右侧table
		$(".con-table .mytable").height(w_h-110+"px");
	}
	//grid 自适应宽度
	$(window).resize(function(){
		resizeHeight();
		$("#listUser").setGridWidth($('.mytable').width());
	});
	//初始化引入列表（空）
	initJqGridPost();
	//绑定下拉框
	binSelEvent();
	//初始化角色树
	getRoleTree();
});

