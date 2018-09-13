/**
 * 给用户引入岗位列表
 * @author shiyong
 */
//组织机构树
var zTreeObj;
var urlBody = "";
var urlAll = "";
var jqGridPostRole;

//树 搜索名称参数
var lastValue = "", nodeList = [], rnodeList = [], fontCss = {};

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
 * 选择树节点插入表格
 * @param event
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function zTreeOnDblClick(event, treeId, treeNode) {
	var obj=$("#listPost").jqGrid("getRowData");
	var isexist = false ;
	jQuery(obj).each(function(){
		if(this.tragtId == treeNode.id){
			isexist =  true;
		}
	});

	if(isexist){
		pop_tip_open("blue","岗位已存在，请重新选择");
		return false;
	}
	if(treeNode.type == 'post'){
		var selectedId = $("#listPost").jqGrid("getGridParam", "selrow");   
		var ids = jQuery("#listPost").jqGrid('getDataIDs');  
		//获得新添加行的行号（数据编号）  
		newrowid = newrowid+1;  
		var dataRow = {  
				id:newrowid,
				tragtId: treeNode.id,  
				roleName:treeNode.name,  
				prefixName:treeNode.prefixName,  
				roleType:'标准角色',
				roleTypeId:'1'
		}; 
		//将新添加的行插入到第一列  
		$("#listPost").jqGrid("addRowData", newrowid, dataRow, "first");  
	}else if(treeNode.mold  == 'role'){
		var selectedId = $("#listPost").jqGrid("getGridParam", "selrow");   
		var ids = jQuery("#listPost").jqGrid('getDataIDs');  
		//获得新添加行的行号（数据编号）  
		newrowid = newrowid+1;  
		var dataRow = {    
				id: newrowid,  
				tragtId: treeNode.id,  
				roleName:treeNode.name,  
				prefixName:"",  
				roleType:'虚拟角色',
				roleTypeId:'0'
		}; 
		//将新添加的行插入到第一列  
		$("#listPost").jqGrid("addRowData", newrowid, dataRow, "first");  
	}else{
		pop_tip_open("blue","只能选择岗位，不能选择组织");
		return false;
	}
};

/*
 * 初始化已选择岗位数据
 */
function initJqGridPost_(){
	var ubody = "sys/org/post/queryPostListByUserId";
	var uall = hostUrl+ubody;
//	var userId=window.open.imuserId;
	var userId=window.opener.imuserId;
	//创建jqGrid组件
	jqGridPostRole = jQuery("#listPost").jqGrid(
			{
				url: uall,
				ajaxGridOptions: { contentType: 'application/json' },
				mtype : "POST",  
				contentType : "application/json",  
				postData:{"userId":userId},
				datatype : "json", 
				jsonReader : {
					root:"result"
				},
				rownumbers: true,
				width:$('.mytable').width(),
				height:$('.mytable').height()-45,
//				multiselect: true,//复选框
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'id',index:'id',label : '序号',width : 55,align : "center",hidden : true},
				             {name : 'mid',index:'id',label : '序号',width : 55,align : "center",hidden : true},
				             {name : 'isDefault',label : '是否主岗',width : 55,align : "center",hidden : true},
				             {name : 'isDefault1',label : '是否主岗',width : 110,align : "center",
				            	 formatter:function(cellvalue, options, rowObject){
				            		 if(rowObject.isDefault=="1"){
				            			 return "<input type='radio' name='radio' onclick=\"checkIsDefault('"+rowObject.id+"')\" checked/>";
				            		 }else if(rowObject.roleTypeId=='0'||rowObject.roleTypeId=='虚拟角色'){
				            			 return "<input type='radio' name='radio' onclick=\"checkIsDefault('"+rowObject.id+"')\" disabled/>";
				            		 }else{
				            			 return "<input type='radio' name='radio' onclick=\"checkIsDefault('"+rowObject.id+"')\"/>";
				            		 }
				            	 }
				             },
				             {name : 'belongOrgId',label : '所属组织',width : 350,align : "center",hidden : true},
				             {name : 'prefixName',label : '所属组织',width : 350,align : "center"},
				             {name : 'tragtId',label : '目标id',width : 55,align : "center",hidden : true},
				             {name : 'roleId',label : '角色名称',width : 200,align : "center",hidden : true},
				             {name : 'roleName',label : '岗位名称',width : 320,align : "center"},
				             {name : 'roleTypeId',label : '类型',width : 270,align : "center",formatter:roleTypeFmatter},
				             {name : 'isDefault',label : '是否主岗',width : 80,align : "center", hidden : true}
				             ],
				             rowNum : -1,//一页显示多少条
				             sortname : 'id',//初始化的时候排序的字段
				             sortorder : "desc",//排序方式,可选desc,asc
//				             mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
				             gridComplete : function() { 
				            	 initCheck();
								 $.xljUtils.addGridScroll();
								 $.xljUtils.gridResizeFn();
				             },
				             ondblClickRow:function(rowid,iRow){
				            	 $("#listPost").jqGrid("delRowData", rowid);  
				             },
				             loadError:function(xhr,status,error){
			            		pop_tip_open("red","初始化已选择岗位数据请求失败");
			            	 },
				             viewrecords : true
			});
}
/**
 * 选择是否主岗
 */
function checkIsDefault(rowId){
	var obj=$("#listPost").jqGrid("getRowData");
	//修改其他是否主岗为否
	var noSelData={
			isDefault:'0'
	};
	jQuery(obj).each(function(){
		if(this.id!=rowId){
			jqGridPostRole.jqGrid('setRowData', this.id, noSelData, '');
		}
	});
	//修改主岗为1
	var selData={
			isDefault:'1'
	};
	jqGridPostRole.jqGrid('setRowData', rowId, selData, '');//rowId行ID；selData更新的数据
}

/**
 * 角色类型格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function roleTypeFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "0"){
		return "虚拟角色";
	}else if(cellvalue == "1"){
		return "标准角色";
	}
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
//	lastValue = value;
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
	//searchNodeR(e);

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
 * 递归设置组织机构岗位树的图片样式
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
        }else if(arr[i].type == "post" ) {
        	arr[i].iconSkin = "diy-post";
        } 
    }
};
var key;
/**
 * 获取岗位树
 */
function getPostTree() {
	urlBody = "sys/org/post/getPostTree";
	urlAll = hostUrl + urlBody;
	var jsonData={
    		rootDelFlag:0,
    		orgDelFlag:0,
    		postDelFlag:0,
    		rootStatus:1,
    		orgStatus:1,
    		postStatus:1
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
			var pid = window.opener.imtreeId;
			var node = zTreeObj.getNodeByParam("id",pid);
			if(node !=null){
				zTreeObj.selectNode(node,true);//指定选中ID的节点  
				zTreeObj.expandNode(node, true, false);//指定选中ID节点展开  
			}else{
				node=zTreeObj.getNodes()[0];
				zTreeObj.expandNode(node, true, false);
			}
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
			pop_tip_open("red","获取岗位树请求失败");
		}
	})
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
/**
 * 获取角色树（虚拟角色树）
 */
function getRoleTree() {
	urlBody = "sys/org/roleCatalog/getRoleTree";
	urlAll = hostUrl + urlBody;
	//虚拟角色树 
	var postdata={
			type:0,
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
			zTreeObj = $.fn.zTree.init($("#treeRole"), setting, zNodes);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取虚拟角色树请求失败");
		}
	})
}

function searchNodeR(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeRole");
	var keyType = "name";
	var value = $.trim(key.get(0).value);
	if (lastValue === value) return;
	lastValue = value;
	if (value === "") return;
	updateNodesR(false);

	rnodeList = zTree.getNodesByParamFuzzy(keyType, value);
	for(var i=0;i<rnodeList.length;i++){
		var node=rnodeList[i];
		var parentNode=node.getParentNode();
		if(parentNode && !parentNode.open){
			zTree.expandNode(parentNode,true,false,false,false);
		}
	}
	updateNodesR(true);

}
function updateNodesR(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("treeRole");
	for( var i=0, l=rnodeList.length; i<l; i++) {
		rnodeList[i].highlight = highlight;
		zTree.updateNode(rnodeList[i]);
	}
}
/**
 * 新增用户岗位关系
 */
function savePostUser() {
	var uBody = "sys/org/postUser/savePostUserAndRoleUser";
	var uAll = hostUrl + uBody;
	var obj=$("#listPost").jqGrid("getRowData");

	var dataList=new Array();//需要保存的记录
	var i=0;
	var flag=true;
	jQuery(obj).each(function(){
		var savedata={};//单条记录
		savedata.isDefault=this.isDefault;
		if(this.isDefault=="1"&&this.roleTypeId=='虚拟角色'){
			pop_tip_open("blue","虚拟角色不能设置为主岗");
			flag= false;
		}
		savedata.tragtId=this.tragtId;
		savedata.id=this.mid;
		savedata.userId=window.opener.imuserId;
		savedata.roleTypeId=this.roleTypeId;
		dataList[i]=savedata;
		i++;
	});
	if(!flag){
		return false;
	}
	var jsonData={list:dataList,userId:window.opener.imuserId};
	$.ajax({
		type:'POST',
		url:uAll,
		async: false,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(jsonData),
		success: function(json) {
			if(json.success == true){
				var queryDataUserPost={
						"userId":window.opener.imuserId
				};
				window.opener.jqGridUserPost.jqGrid("setGridParam", { postData: queryDataUserPost }).trigger("reloadGrid");
				window.close();
			}else{
				pop_tip_open("red",json.msg);
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","保存用户岗位关系请求失败");
		}
	})
}

/**
 * 设置默认选中主岗的radio
 */
function initCheck(){
	var obj=jqGridPostRole.jqGrid("getRowData");
	var i=1;
	jQuery(obj).each(function(){
		if(this.isDefault=='1'){
			jqGridPostRole.jqGrid('setSelection',i);
		}
		i++;
	});
}


$(function(){
	//初始化initJqGridPost_
	initJqGridPost_();

	//初始化角色树
	getPostTree();
	//getRoleTree();
	
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
	var w_h = $(window).height();
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