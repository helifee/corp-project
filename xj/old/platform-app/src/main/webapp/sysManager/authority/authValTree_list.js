/* 授权值-树型展示
 * @author gyh
 * @date 2017-3-22
 */

//获取数据的url
var initUrl=window.opener.openUrl;
//树对象
var zTreeObj;
//表格对象
var valGrid;

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

/**
 * 双击树选中授权值
 */
var newrowid = 0;
function zTreeOnDblClick(event, treeId, treeNode) {
	var obj=$("#list2").jqGrid("getRowData");
	jQuery(obj).each(function(){
		if(this.tragtId == treeNode.id){
			alert("已存在，请重新选择");
			return false;
		}
	});

	var selectedId = $("#list2").jqGrid("getGridParam", "selrow");   
	var ids = jQuery("#list2").jqGrid('getDataIDs');  
	//获得新添加行的行号（数据编号）  
	newrowid = newrowid+1;  
	var dataRow = {    
			id: treeNode.id,  
			code: treeNode.code,  
			name:treeNode.name
	}; 
	//将新添加的行插入到第一列  
	$("#list2").jqGrid("addRowData", newrowid, dataRow, "first");  
	
};

/**
 * 递归树传icon
 */
function recursionArrayRoleTree(arr) {
	for(var i in arr) {
		if(arr[i].mold == "cata") {
			arr[i].iconSkin = "diy-company";
			if(arr[i].children.length > 0) {
				recursionArrayRoleTree(arr[i].children);
			}
		}else if(arr[i].mold == "role" ) {
			arr[i].iconSkin = "diy-company";
		}
	}
};
/**
 * 改变树样式
 */
function updateNodes(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("roleTree");
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
var key;
/**
 * 初始化数据值树
 */
function initValTree() {
	urlAll = baseUrl + initUrl;
	var postdata={
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
			zTreeObj = $.fn.zTree.init($("#valTree"), setting, zNodes);
		}
	})
}
/**
 * 初始化岗位和人员列表数据
 */
function initSelVal(){
	//创建jqGrid组件
	valGrid = jQuery("#list2").jqGrid(
			{
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'id',label : 'ID',width : 300,align : "center"},
				             {name : 'code',label : 'CODE',width : 250,align : "center"},
				             {name : 'name',label : 'NAME',width : 280,align : "center"}
				             ],
				             rowNum : -1,
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
/**
 * 行统计赋值
 */
function initCheck(){
	var obj=valGrid.jqGrid("getRowData");
	var i=1;
	jQuery(obj).each(function(){
		if(this.isDefault=='1'){
			valGrid.jqGrid('setSelection',i);
		}
		i++;
	});
}

/**
 * 保存授权值
 */
function saveDataVal() {
	//获取表格所有数据
	var obj=valGrid.jqGrid("getRowData");
	//修改数据授权列表
	var selPointGrid=window.opener.dataAuthGrid;
	var selId=selPointGrid.jqGrid('getGridParam','selrow');
	var vals=[];
	var ids=[];
	$.each(obj,function(i,val){
		vals[i]=val.name;
		ids[i]=val.id;
	});
	var selData={
			valIds:ids,
			val:vals
	};
	selPointGrid.jqGrid('setRowData', selId, selData, '');
	closeWin();
};
/**
 * 关闭窗口
 */
function closeWin(){
	window.close();
}


$(function(){
	//初始化valTree
	initValTree();
	initSelVal();
});

/*
 *
 * miying add
 * */
var w_h = $(window).height();
/* 点击查询 出现 隐藏search框 */
$(".my-search-btn").on("click",function(e){
	$(this).parent().next().toggle();
	$(".searchBox").is(':hidden') ? $(".slide-left .ztree-box").height((w_h-140)+"px"):$(".slide-left .ztree-box").height((w_h-191)+"px");
	e.stopPropagation();
});

$(window).resize(function() {
	resizeHeight();
});
//计算高度
function resizeHeight(){
	//左侧  头部底部为60px  title类 为50px

	$(".slide-left .ztree-box").height((w_h-140)+"px");
	//右侧table
	$(".con-table .mytable").height((w_h-180)/2+"px");
}
//右侧table加滚动条
$(".mytable").mCustomScrollbar({
	axis:"yx",
	scrollInertia: 80
});
//表格上面 按岗位 切换
$(".right-content .con-tit button").on("click",function(e){
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	e.stopPropagation();
});
//左侧加滚动条
$(".ztree-box").mCustomScrollbar({
	scrollInertia: 80
});