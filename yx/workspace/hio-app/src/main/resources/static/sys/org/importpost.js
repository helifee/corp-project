var zTreeObj;
var urlBody = "";
var urlAll = "";
var jqGrid2;

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

//TODO 选择
var newrowid = 0;
function zTreeOnDblClick(event, treeId, treeNode) {
	var obj=$("#list2").jqGrid("getRowData");
	jQuery(obj).each(function(){
		if(this.tragtId == treeNode.id){
			alert("岗位已存在，请重新选择");
			return false;
		}
	});

	if(treeNode.type == 'post'){
		var selectedId = $("#list2").jqGrid("getGridParam", "selrow");   
		var ids = jQuery("#list2").jqGrid('getDataIDs');  
		//获得新添加行的行号（数据编号）  
		newrowid = newrowid+1;  
		var dataRow = {    
				id: treeNode.id,  
				tragtId: treeNode.id,  
				roleName:treeNode.name,  
				roleType:'标准角色',
				roleTypeId:'1'
		}; 
		//将新添加的行插入到第一列  
		$("#list2").jqGrid("addRowData", newrowid, dataRow, "first");  
	}else if(treeNode.mold  == 'role'){
		var selectedId = $("#list2").jqGrid("getGridParam", "selrow");   
		var ids = jQuery("#list2").jqGrid('getDataIDs');  
		//获得新添加行的行号（数据编号）  
		newrowid = newrowid+1;  
		var dataRow = {    
				id: treeNode.id,  
				tragtId: treeNode.id,  
				roleName:treeNode.name,  
				roleType:'虚拟角色',
				roleTypeId:'0'
		}; 
		//将新添加的行插入到第一列  
		$("#list2").jqGrid("addRowData", newrowid, dataRow, "first");  
	}else{
		alert("只能选择岗位，不能选择组织");
		return false;
	}
};

/*
 * 初始化岗位和人员列表数据
 */
function initJqGrid2_(){
	var ubody = "platform-app/sys/org/post/queryPostListByUserId";
	var uall = urlHost+ubody;
//	var userId=window.open.imuserId;
	var userId=window.opener.imuserId;
	//创建jqGrid组件
	jqGrid2 = jQuery("#list2").jqGrid(
			{
				url: uall,
				ajaxGridOptions: { contentType: 'application/json' },
				mtype : "POST",  
				contentType : "application/json",  
				postData:{"userId":userId},
				datatype : "json", 
				height:500,
				jsonReader : {
					root:"result"
				},
				rownumbers: true,
//				multiselect: true,//复选框
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
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
				             {name : 'belongOrgId',label : '所属组织',width : 350,align : "center"},
				             {name : 'tragtId',label : '目标id',width : 55,align : "center",hidden : true},
				             {name : 'roleId',label : '角色名称',width : 200,align : "center",hidden : true},
				             {name : 'roleName',label : '角色名称',width : 320,align : "center"},
				             {name : 'roleTypeId',label : '角色类型',width : 270,align : "center",formatter:roleTypeFmatter},
				             {name : 'isDefault',label : '是否主岗',width : 80,align : "center", hidden : true}
				             ],
				             sortname : 'id',//初始化的时候排序的字段
				             sortorder : "desc",//排序方式,可选desc,asc
//				             mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
				             gridComplete : function() { 
				            	 initCheck();
				             },
				             ondblClickRow:function(rowid,iRow){
				            	 $("#list2").jqGrid("delRowData", rowid);  
				             },            
				             viewrecords : true
			}).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}
/*
 * 选择是否主岗
 */
function checkIsDefault(rowId){
	var obj=$("#list2").jqGrid("getRowData");
	//修改其他是否主岗为否
	var noSelData={
			isDefault:'0'
	};
	jQuery(obj).each(function(){
		if(this.id!=rowId){
			jqGrid2.jqGrid('setRowData', this.id, noSelData, '');
		}
	});
	//修改主岗为1
	var selData={
			isDefault:'1'
	};
	jqGrid2.jqGrid('setRowData', rowId, selData, '');//rowId行ID；selData更新的数据
}

//角色类型
function roleTypeFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "0"){
		return "虚拟角色";
	}else if(cellvalue == "1"){
		return "标准角色";
	}
}

//是否主岗
function isDfaultFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "否";
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
		if(arr[i].type == "post") {
			arr[i].icon = "../css/zTreeStyle/img/diy/12.png";
		}else{
			arr[i].icon = "../css/zTreeStyle/img/diy/main.png";
			if(arr[i].children.length > 0) {
				recursionArray(arr[i].children);
			}
		}
	}
};
var key;
//获取岗位树
function getPostTree() {
	urlBody = "platform-app/sys/org/post/getPostTree";
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
			var pid = window.opener.imtreeId;
			var node = zTreeObj.getNodeByParam("id",pid);
			zTreeObj.selectNode(node,true);//指定选中ID的节点  
			zTreeObj.expandNode(node, true, false);//指定选中ID节点展开  
			key = $("#key");
			key.bind("focus", focusKey)
			.bind("blur", blurKey)
			.bind("propertychange", searchNode)
			.bind("input", searchNode);
		}
	})
}

//递归树传icon
function recursionArrayRoleTree(arr) {
	for(var i in arr) {
		if(arr[i].mold == "cata") {
			arr[i].icon = "../css/zTreeStyle/img/diy/main.png";
			if(arr[i].children.length > 0) {
				recursionArrayRoleTree(arr[i].children);
			}
		}else if(arr[i].mold == "role" ) {
			arr[i].icon = "../css/zTreeStyle/img/diy/12.png";
		}
	}
};
var key;
//获取角色树 add by gyh
function getRoleTree() {
	urlBody = "platform-app/sys/org/roleCatalog/getRoleTree";
	urlAll = urlHost + urlBody;
	//虚拟角色树 
	var postdata={
			type:0
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
			key = $("#key");
			key.bind("focus", focusKey)
			.bind("blur", blurKey)
			.bind("propertychange", searchNode)
			.bind("input", searchNode);
		}
	})
}
//新增用户岗位关系
function savePostUser() {
	var uBody = "platform-app/sys/org/postUser/savePostUserAndRoleUser";
	var uAll = urlHost + uBody;
	var obj=$("#list2").jqGrid("getRowData");

	var dataList=new Array();//需要保存的记录
	var i=0;
	var flag=true;
	jQuery(obj).each(function(){
		var savedata={};//单条记录
		savedata.isDefault=this.isDefault;
		if(this.isDefault=="1"&&this.roleTypeId=='虚拟角色'){
			alert("虚拟角色不能设置为主岗");
			flag= false;
		}
		savedata.tragtId=this.tragtId;
		savedata.userId=window.opener.imuserId;
		savedata.roleTypeId=this.roleTypeId;
		dataList[i]=savedata;
		i++;
	});
	if(!flag){
		return false;
	}
	if(dataList.length==0){
		alert("请选择岗位或虚拟角色");
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
				alert(json.msg);
				var queryData5={
						"userId":window.opener.imuserId
				};
				window.opener.jqGrid5.jqGrid("setGridParam", { postData: queryData5 }).trigger("reloadGrid");
				window.close();
			}else{
				alert(json.msg);
			}
		}
	})
}


$(function(){
	//初始化initJqGrid2
	initJqGrid2_();

	//初始化角色树
	getPostTree();
	getRoleTree();
});

function initCheck(){
	var obj=jqGrid2.jqGrid("getRowData");
	var i=1;
	jQuery(obj).each(function(){
		if(this.isDefault=='1'){
			jqGrid2.jqGrid('setSelection',i);
		}
		i++;
	});
}
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
//		data:'{}',
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