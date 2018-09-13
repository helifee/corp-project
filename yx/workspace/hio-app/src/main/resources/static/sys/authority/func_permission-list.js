var zTreeObj;
var zTreeObjButton;
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
		onClick:zTreeOnClick //点击节点事件
	}
};

//Button zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var settingButton = {
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
	check: {
		enable: true,
		chkStyle: "checkbox",
		chkboxType: { "Y": "ps", "N": "ps" }
	},
	callback: {
	}
};

/*
 * 树点击节点事件
 */

function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.mold == 'cata'){
		return false;
	}else if(treeNode.mold == 'role'){
		var postdata={
				roleId:treeNode.id
		}
		var uBody = "platform-app/sys/res/funcPermission/queryList";
		var uAll = urlHost + uBody;
		$.ajax({
		       type:'POST',
		       url:uAll,
		       async: false,
		       dataType:'json',
		       contentType:'application/json',
		       data:JSON.stringify(postdata),
		       success: function(json) {
		           if(json.success == true){
		        	   zTreeObjButton.checkAllNodes(false);
		        	   if(json.result.length>0){
		        		   for(var i=0;i<json.result.length;i++){
		        			   var node = zTreeObjButton.getNodeByParam("id",json.result[i].operationId);
		        			   zTreeObjButton.checkNode(node, true, true);
		        		   }
		        	   }
		        	   zTreeObjButton.updateNode(node);
		           }else{
		        	   alert(json.msg);
		           }
		       }
		   });
	}
}

/*
 * 初始化按钮树
 */
function initJqGridButton(){
	var ubody = "platform-app/sys/res/resource/getfuncPermissionButtonJqgridTreeByAppid";
	var uall = urlHost+ubody;
    //创建jqGrid组件
    var jqGridButton = jQuery("#listButton").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{"appId":"6fbd2eb96cde4bb699e4e481b3bf8ce7"},
            datatype : "json", 
            treeGrid: true,
            treeGridModel: "adjacency", 
            ExpandColumn:"name",
            height:500,
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                         {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                         {name : 'name',label : '名称',width : 410,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
//            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
//            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            treeReader:{
     		   level_field: "level",
     		   parent_id_field: "parentId",
     		   leaf_field: "isLeaf",
     		   expanded_field: "expanded",
     		   left_field:"lft",
     		   right_field: "rgt"
     		},
            ondblClickRow:function(rowid,iRow){
            	$("#listButton").jqGrid("delRowData", rowid);  
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
    urlBody = "platform-app/sys/org/roleCatalog/getRoleTree";
    urlAll = urlHost + urlBody;
    //标准角色树 add by gyh
//    var postdata={
//    		type:1
//    }
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:"{}",
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


//递归按钮树传icon
function recursionArrayButton(arr) {
    for(var i in arr) {
    	if(arr[i].type == "APPSystem") {
            arr[i].icon = "../css/zTreeStyle/img/diy/main.png";
            if(arr[i].children.length > 0) {
            	recursionArrayButton(arr[i].children);
            }
        }else if(arr[i].type == "RESOURCE") {
            arr[i].icon = "../css/zTreeStyle/img/diy/main.png";
            if(arr[i].children.length > 0) {
            	recursionArrayButton(arr[i].children);
            }
        }else if(arr[i].type == "OPERATION" ) {
            arr[i].icon = "../css/zTreeStyle/img/diy/12.png";
        }
    }
};
//获取按钮树
function getButtonTree(appIds) {
  urlBody = "platform-app/sys/res/resource/getOperationTreeByAppId";
  urlAll = urlHost + urlBody;
  var postdata={
		 appId:appIds
//  		appId:"6fbd2eb96cde4bb699e4e481b3bf8ce7"
  }
  $.ajax({
      type:'POST',
      url:urlAll,
      dataType:'json',
      contentType:'application/json',
      data:JSON.stringify(postdata),
      success: function(json) {
          var zNodes = json.result;
          recursionArrayButton(zNodes);
          zTreeObjButton = $.fn.zTree.init($("#treeButton"), settingButton, zNodes);
          zTreeObjButton.expandAll(true); 
      }
  })
}


//获取系统
function getAppData(){
	var ubody = "platform-app/sys/res/appSystem/queryList";
	var uall = urlHost+ubody;
	var postdata ={
			delflag:false
	};
	$.ajax({
        type:'post',
        url:uall,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(postdata),
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var appList=data.result;
        			 for(var o in appList){
        				 if(o == 0){
        					 getButtonTree(appList[o].id);
//        					 getResourceTree(appList[o].id);
        				 }
        				 $("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
        			 }
        		 }
        	}else{
        		return data.msg
        	}
     }
	})
}

function SelectAppForm(ele){
	getButtonTree(ele.value);
  }

//新增功能授权
function saveFunc() {
  var uBody = "platform-app/sys/res/funcPermission/saveBatch";
  var uAll = urlHost + uBody;
  var uuidBody = "platform-app/sys/uuid/generator/getGuuid";
  var uuidAll = urlHost + uuidBody;
	var roleId;
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		alert("请选择角色");
		return;
	}else{
		if(nodes[0].mold == "cata"){
			alert("不能选择目录，只能选择角色");
			return;
		}else if(nodes[0].mold == "role"){
			roleId = nodes[0].id;
		}
	}
	var treeCheckNodes = zTreeObjButton.getCheckedNodes();
	var uuids="";
	var ids="";
	for(var i=0;i<treeCheckNodes.length;i++){
		if(treeCheckNodes[i].type == "OPERATION"){
			ids += treeCheckNodes[i].id + ",";
			$.ajax({
	            type:'GET',
	            url:uuidAll,
	            dataType:'json',
	            async:false,
	            contentType:'application/json',
	            success: function(json) {
	            	uuids += json.result+",";
	            }
	        });
		}
	}
	  if (ids.length > 0 ) ids = ids.substring(0, ids.length-1);
	  if (uuids.length > 0 ) uuids = uuids.substring(0, uuids.length-1);
	var savedata={
			ids:ids,
			uuids:uuids,
			roleId:roleId
	};
	alert(ids);
	alert(uuids);
	alert(roleId);
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
           }else{
           	alert(json.msg);
           }
       }
   })

}


$(function(){
	//初始化initJqGridButton
//	initJqGridButton();
	//初始化角色树
	getAppData();
	getRoleTree();
//	getButtonTree();
});

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