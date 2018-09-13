/**
 * 引入用户
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
/**
 * 双击选中
 */
var newrowid = 0;
function zTreeOnDblClick(event, treeId, treeNode) {
	if(treeNode.type == 'cata'){
		pop_tip_open("blue","只能选择人员和组织");
		return false;
	}
	var isexist = false ;
	var obj=$("#listScope").jqGrid("getRowData");
	jQuery(obj).each(function(){
		if(this.refId == treeNode.id){
			isexist =  true;
			return false;
		}
	});
	
	if(isexist){
		pop_tip_open("blue","组织或人员已存在，请重新选择");
		return false;
	}
	newrowid = newrowid+1;  
	var dataRow = {    
			scopeName:treeNode.prefixName,   
			refId:treeNode.id,
			type:treeNode.type=='user'?'2':'1'
	}; 
	//将新添加的行插入到第一列  
	$("#listScope").jqGrid("addRowData", newrowid, dataRow, "first");  
    
};

/**
 * 初始化已选择的管辖范围
 */
function initJqGridUser(){
	var ubody = "sys/org/roleUserPostScope/queryScopeByRefId";
	var uall = hostUrl+ubody;
    //创建jqGrid组件
    var jqGrid2 = jQuery("#listScope").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{"roleUserId":window.opener.selRefId},
            datatype : "json",
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
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            ondblClickRow:function(rowid,iRow){
            	$("#listScope").jqGrid("delRowData", rowid);
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
            },
            loadError:function(xhr,status,error){
            	pop_tip_open("red","初始化已选择的用户列表请求失败");
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

var key;
/**
 * 获取人员树
 */
function getUserTree() {
	var time0 = new Date();
	var urlBody = "sys/org/roleUser/selectUserOrgTree";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:'{}',
        success: function(json) {
            var zNodes = json.result;
            var time1 = new Date();
            console.log("数据---->"+(time1.getTime() - time0.getTime()) +"ms");
            recursionArray(zNodes);
            var time2 = new Date();
            console.log("图标---->"+(time2.getTime() - time1.getTime()) +"ms");
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            var time3 = new Date();
            console.log("树---->"+(time3.getTime() - time2.getTime()) +"ms");
            var nodes = zTreeObj.getNodes();
            //默认展开第一个节点
            zTreeObj.expandNode(nodes[0], true, false, false,false);
            var time4 = new Date();
            console.log("展开第一个---->"+(time4.getTime() - time3.getTime()) +"ms");
           
            
            key = $("#key");
            $.xljUtils._searchTreeInputEvent(key,zTreeObj);
            
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","获取人员树请求失败");
        }
    })
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
        }else if(arr[i].type == "dept" ) {
            arr[i].iconSkin = "diy-department";
        }else if(arr[i].type == "group" ) {
            arr[i].iconSkin = "diy-program";
        }else if(arr[i].type == "branch" ) {
            arr[i].iconSkin = "diy-program";
        }else if(arr[i].type == "cata" ) {
        	arr[i].iconSkin = "diy-group";
        }else if(arr[i].type == "post" ) {
        	arr[i].iconSkin = "diy-post";
	    } else if(arr[i].type == "user" ) {
	    	arr[i].iconSkin = "diy-member";
	    } 
    }
};
/**
 * 保存管辖范围
 */
//TODO
function saveScope() {
    var uBody = "sys/org/roleUserPostScope/saveBatchRoleUserPostScope";
    var uAll = hostUrl + uBody;
    var obj=$("#listScope").jqGrid("getRowData");
    var selRefId=window.opener.selRefId;
    var list=[];
    var i=0;
    jQuery(obj).each(function(){
    	var savedata={
    			roleUserId:selRefId,
        		id:this.id,
        		refId:this.refId,
        		type:this.type
        };
    	list[i]=savedata;
    	i++;
	});
    var jsondata={
    		list:list,
    		roleUserId:selRefId
    };
//    console.log(jsondata);
    $.ajax({
        type:'POST',
        url:uAll,
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(jsondata),
        success: function(json) {
            if(json.success == true){
            	var queryDataPostUser={
            			"roleUserId":selRefId
            			};
            	window.opener.jqGridRefScope.jqGrid("setGridParam", { postData: queryDataPostUser }).trigger("reloadGrid");
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
	//初始化initJqGridUser
	initJqGridUser();
	//初始化角色树
	getUserTree();
	//页面加载完毕后更改grid宽高
	$.xljUtils.resizeNestedGrid();
});

/*
*
* miying add
* */

//计算高度
resizeHeight();
function resizeHeight(){
	//左侧  头部底部为60px  title类 为50px
	var w_h = $(window).height();
	$(".slide-left .ztree-box").height((w_h-150)+"px");
}
//grid 自适应宽度
$(window).resize(function(){
	resizeHeight();
});
