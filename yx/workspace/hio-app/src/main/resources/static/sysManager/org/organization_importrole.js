/**
 * 引入标准角色
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
	if(treeNode.mold == 'cata'){
		pop_tip_open("blue","只能选择角色，不能选择目录");
		return false;
	}
	var isexist = false ;
	var obj=$("#listRole").jqGrid("getRowData");
	jQuery(obj).each(function(){
		if(this.roleId == treeNode.id){
			isexist =  true;
		}
	});
	
	if(isexist){
		pop_tip_open("blue","角色已存在，请重新选择");
		return false;
	}
    var selectedId = $("#listRole").jqGrid("getGridParam", "selrow");   
    var ids = jQuery("#listRole").jqGrid('getDataIDs');  
    //获得当前最大行号（数据编号）  
//    var rowid = Math.max.apply(Math,ids);  
    //获得新添加行的行号（数据编号）  
    newrowid = newrowid+1;  
    var dataRow = {    
        id: treeNode.id,  
        roleId:treeNode.id,
        name:treeNode.name,
        rolePrefixName:treeNode.prefixName,
        sort:''
    }; 
    //将新添加的行插入到第一列  
    $("#listRole").jqGrid("addRowData", newrowid, dataRow, "first");
	$.xljUtils.addGridScroll();
	$.xljUtils.gridResizeFn();
};

/*
 * 初始化已有岗位列表
 */
function initJqGridPost(){
	var ubody = "sys/org/post/queryPostListByOrgId";
	var uall = serviceUrl+ubody;
	var orgId=window.opener.importroleOrgNode.id;
    //创建jqGrid组件
    var jqGridRole = jQuery("#listRole").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{"orgId":orgId,"ifDownPost":"0"},
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                         {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                         {name : 'roleId',label : '角色Id',width : 55,align : "center",hidden : true},
                         {name : 'name',label : '角色名称',width : 410,align : "center"},
                         {name : 'rolePrefixName',label : '角色树',width : 517,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            ondblClickRow:function(rowid,iRow){
            	$("#listRole").jqGrid("delRowData", rowid);
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
            },
            loadError:function(xhr,status,error){
            	pop_tip_open("red","初始化已有岗位列表请求失败");
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
		$.xljUtils.treeResizeFn();
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
 * 获取标准角色树
 */
function getRoleTree() {
    var urlBody = "sys/org/roleCatalog/getRoleTree";
    var urlAll = serviceUrl + urlBody;
    //标准角色树 add by gyh
    var postdata={
    		type:1,
			delflag:0,
			status:1,
			roleCataDelFlag:0,
			roleCataStatus:1
    }
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(postdata),
        success: function(json) {
            var zNodes = json.result;
            recursionArrayRoleTree(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            var allNodes = zTreeObj.getNodes();
            //默认展开第一个节点
            zTreeObj.expandNode(allNodes[0], true, false, false,false);
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
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","获取标准角色树请求失败");
        }
    })
}

/**
 * 组织机构引入标准角色创建岗位
 */
function savePost() {
    var uBody = "sys/org/post/saveBatch";
    var uAll = serviceUrl + uBody;
//    var uuidBody = "sys/uuid/generator/getGuuid"+"?time="+Math.random();
//    var uuidAll = serviceUrl + uuidBody;
    
    var obj=$("#listRole").jqGrid("getRowData");

    var ids = "";
    var uuid = "";
    jQuery(obj).each(function(){
    	var uuidBody = "sys/uuid/generator/getGuuid"+"?time="+Math.random();
        var uuidAll = serviceUrl + uuidBody;
    	ids += this.roleId + ",";
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
    	pop_tip_open("blue","请选择角色");
    	return false;
    }
    if (ids.length > 0 ) ids = ids.substring(0, ids.length-1);
    if (uuid.length > 0 ) uuid = uuid.substring(0, uuid.length-1);
    var savedata={
    		roleids:ids,
    		refId:window.opener.importroleOrgNode.id,
    		uuids:uuid,
    		type:window.opener.importroleOrgNode.type,
    		method:"roles"
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
            			"orgId":window.opener.importroleOrgNode.id
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
		$(".con-table .mytable").height(w_h-90+"px");
	}
	//grid 自适应宽度
	$(window).resize(function(){
		resizeHeight();
		$("#listRole").setGridWidth($('.mytable').width());
	});
	//初始化initJqGridPost
	initJqGridPost();
	//初始化角色树
	getRoleTree();
	//页面加载完毕后更改grid宽高
	$.xljUtils.resizeNestedGrid();
});

