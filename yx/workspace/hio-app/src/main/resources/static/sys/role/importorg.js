var zTreeObj;
var urlBody = "";
var urlAll = "";

//树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};

//zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
		view: {
            fontCss: getFontCss
        },
	edit: {
		enable: true,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onDblClick: zTreeOnDblClick
	}
};

var newrowid = 0;
function zTreeOnDblClick(event, treeId, treeNode) {
//    alert(treeNode ? treeNode.tId + ", " + treeNode.name : "isRoot");
	if(treeNode.type == 'cata'){
		alert("只能选择组织机构，不能选择目录");
		return false;
	}
	
    var selectedId = $("#list2").jqGrid("getGridParam", "selrow");   
    var ids = jQuery("#list2").jqGrid('getDataIDs');  
//    alert(ids);
    //获得当前最大行号（数据编号）  
//    var rowid = Math.max.apply(Math,ids);  
    //获得新添加行的行号（数据编号）  
    newrowid = newrowid+1;  
    var dataRow = {    
        id: treeNode.id,  
        type:treeNode.type,  
        name:treeNode.name,  
        sort:''
    }; 
    //将新添加的行插入到第一列  
    $("#list2").jqGrid("addRowData", newrowid, dataRow, "first");  
    
};

/*
 * 初始化岗位和人员列表数据
 */
function initJqGrid2(){
	var ubody = "platform-app/sys/org/post/queryPostListByOrgId";
	var uall = urlHost+ubody;
    //创建jqGrid组件
    var jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{"orgId":""},
            datatype : "json", 
            height:500,
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                         {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                         {name : 'type',label : '序号',width : 55,align : "center",hidden : true},
                         {name : 'name',label : '组织机构名称',width : 410,align : "center"},
                         {name : 'sort',label : '所属组织',width : 517,align : "center"}
            ],
//            rowNum : 10,//一页显示多少条
//            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
//            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            ondblClickRow:function(rowid,iRow){
            	$("#list2").jqGrid("delRowData", rowid);  
            },
            
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
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

//新增标准角色
function savePost() {
    var uBody = "platform-app/sys/org/post/saveBatch";
    var uAll = urlHost + uBody;
    var uuidBody = "platform-app/sys/uuid/generator/getGuuid";
    var uuidAll = urlHost + uuidBody;
    
    
    
    var obj=$("#list2").jqGrid("getRowData");

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
            data:'{}',
            success: function(json) {
//                $('#id').val(json.result);
            	uuid += json.result+",";
            }
        });

    });
    if(ids == ""){
    	alert("请选择组织机构");
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
            	alert(json.msg);
            	var queryData2={
            			"roleId":window.opener.importOrgNode.id
            			};
            	var queryData3={
            			"postId":""
            			};
            	window.opener.jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
            	window.opener.jqGrid3.jqGrid("setGridParam", { postData: queryData3 }).trigger("reloadGrid");
            	window.close();
            }else{
            	alert(json.msg);
            }
        }
    })
}


$(function(){
	//初始化initJqGrid2
	initJqGrid2();
	//初始化角色树
	getRoleTree();
});

//测试
//var orgTree = $.fn.zTree.getZTreeObj('#treeDemo');
//console.log("tree" + orgTree);

//获取标准角色id
function getStandardId() {
    urlBody = "platform-app/sys/uuid/generator/getGuuid";
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