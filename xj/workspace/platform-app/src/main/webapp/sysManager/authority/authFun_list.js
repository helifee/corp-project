/**
 * 功能授权
 * @author shiyong
 */

//计算高度
function resizeHeight(){
	//左侧  头部底部为60px  title类 为50px
	var w_h = $(window).height();
	$('.xj-main-grid').height(w_h - 276);
	$('.listRoleGrid').height(w_h - 120);
	//$('.tab-content').css('height',w_h - 145);
	$(".ztree-box").height((w_h-170)+"px");
	//动态计算各grid的宽高
	//$('#listAuth').jqGrid().setGridWidth($('.xj-main-grid').width()-2, true);
	$('#listRoleAuth').jqGrid().setGridWidth($('.listRoleGrid').width()-2, true);
	//$('#listAuth').jqGrid().setGridHeight(w_h - 276 - 42);
	$('#listRoleAuth').jqGrid().setGridHeight(w_h - 120 - 42);
	//动态计算tab-content的高度
	$('.tab-content').height(w_h-$('#powerApp').height() - 75);
}

//grid 自适应宽度
$(window).resize(function(){
	resizeHeight();
	if($(".xjtreegrid-body").length>0){
		$(".xjtreegrid-body").height($(".xj-main-grid").height()-30);
	}

	//$("input[name!='newsletter']").attr("checked", true);
	$(".xjtreegrid-cell[othercols='true']").css("width",($(".listAuthTable").width()-370-60-15)/colNumG);
});
//数据列的定义
var colModeldata =[];
var colNames =[];
var colNumG = 1;
//动作点-角色 数据列的定义
var colRoleModeldata =[];

//缓存要保存的数据
var authData={};

//缓存要保存的数据（动作点-角色）
var authRoleData={};

//角色树
var zTreeObj;
//角色树(查看权限时)
var zTreeShowObj;
//按钮树
var zTreeObjButton;

//角色树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};

//按钮树搜索名称参数
var lastValueOp = "", nodeListOp = [];

//查看权限角色树搜索名称参数
var lastValueShow = "", nodeListShow = [];


//加载数据

var loadJsonData = new Array();

//已授权的数据
var loadJsonDataAuth = new Array();

//funXjJqgrid

var $funXjJqgrid;

//动作点到角色的jqgrid
var listRoleAuthJqgrid;

//引入其他对象权限前的对象Id
var importObjectId;
//引入其他对象权限前的系统Id
var importAppId;

//所有系统
var allApp;
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
		onClick:zTreeOnClick,
		onCollapse: function(){
            $.xljUtils.treeResizeFn();
        },
        onExpand: function(){
            $.xljUtils.treeResizeFn();
        }//点击节点事件
//        beforeRename: zTreeBeforeRename,//编辑节点之前
//        onRename: zTreeOnRename//编辑节点之后
	}
};

//查看权限时的 zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var settingShow = {
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
		onClick:zTreeShowOnClick, //点击节点事件
		onCollapse: function(){
            $.xljUtils.treeResizeFn();
        },
        onExpand: function(){
            $.xljUtils.treeResizeFn();
        } //捕获节点被展开的事件回调函数  
//        beforeRename: zTreeBeforeRename,//编辑节点之前
//        onRename: zTreeOnRename//编辑节点之后
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
		enable: false
	},
	callback: {
		onClick:buttonzTreeOnClick,
		onCollapse: function(){
            $.xljUtils.treeResizeFn();
        },
        onExpand: function(){
            $.xljUtils.treeResizeFn();
        }//点击节点事件
	}
};


/**
 * 角色树点击节点事件(角色-动作点)
 */

function zTreeOnClick(event, treeId, treeNode) {
	$('#lCheckAll')[0].checked = false;
	$("#roleList").empty();
	if(treeNode.type==0||treeNode.type==1){
		if(treeNode.mold == "role"){//标准岗位和角色
			$("#roleList").append("<li><input type='checkbox' name='roleCheck' value='"+treeNode.id+"#"+treeNode.name+"'><span title='"+treeNode.name+"'>"+treeNode.name+"</span></li>");
		}else{
			var childrenNodes = treeNode.children;
			if (childrenNodes) {
				for (var i = 0; i < childrenNodes.length; i++) {
					var childNode = childrenNodes[i];
					if(childNode.mold == "role"){
						$("#roleList").append("<li><input type='checkbox' name='roleCheck' value='"+childNode.id+"#"+childNode.name+"'><span title='"+childNode.name+"'>"+childNode.name+"</span></li>");
					}else{
						
					}
				}
			}
		}
	}else{//岗位和用户
		if(treeNode.type == "post"||treeNode.type=="user"){
			$("#roleList").append("<li><input type='checkbox' name='roleCheck' value='"+treeNode.id+"#"+treeNode.name+"'><span title='"+treeNode.name+"'>"+treeNode.name+"</span></li>");
		}else{
			var childrenNodes = treeNode.children;
			if (childrenNodes) {
				for (var i = 0; i < childrenNodes.length; i++) {
					var childNode = childrenNodes[i];
					if(childNode.type == "post"||childNode.type=="user"){
						$("#roleList").append("<li><input type='checkbox' name='roleCheck' value='"+childNode.id+"#"+childNode.name+"'><span title='"+childNode.name+"'>"+childNode.name+"</span></li>");
					}else{
						
					}
				}
			}
		}
	}
	//加滚动条
	addCheckboxScroll();
	$(".check_scroll").getNiceScroll().show().resize();
}

/**
 * 查看权限角色树点击节点事件（查看已授权数据）
 */

function zTreeShowOnClick(event, treeId, treeNode) {
	if(treeNode.mold == "cata"){
		pop_tip_open("blue","请选择角色");
		return false;
	}
	var roleIds = treeNode.id;
	
	//根据类型和ID查询权限范围（自有的，继承的）
	var objTypeShow = $('#objectTypeShow').val();
	var ubodyType = "sys/res/funcPermission/queryListByObjectType";
	var uall = hostUrl+ubodyType;
	var postdata ={
		objTypeShow:objTypeShow,
		id:roleIds
	};
	var objList;
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postdata),
		async: false,
		success: function(data) {
			if(data.success){
				if(data.result){
					objList = data.result;
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","查询权限范围数据请求失败");
		}
	});
	var idids ="";
	for(var i in objList ){
		idids += i+",";
	}
	if (idids.length > 0 ) idids = idids.substring(0, idids.length-1);
	//查询所有功能点按钮，TODO 提到初始化里面
	var appIds = "";
	$("#powerApp").empty();
	$("#powerMenu").empty();
	var powerMenu ="";
	for(var o in allApp){
		if(o ==0 ){
			$("#powerApp").append("<li role='presentation' class='active'><a href='#powerTab"+allApp[o].id+"' aria-controls='powerTab"+allApp[o].id+"' role='tab' data-toggle='tab'>"+allApp[o].name+"</a></li>");
			powerMenu += "<div role='tabpanel' class='tab-pane active' id='powerTab"+allApp[o].id+"'>";
			for(var i in objList ){
				powerMenu += "<a href='javascript:void(0)' class='tabA level0 open' onclick='flexPowerRole($(this),$(this).next(),\""+i+"\",\""+allApp[o].id+"\")'>"+objList[i]+"</a><div style='display: none;' class='tabContent' id='powerApp"+allApp[o].id+""+i+"'></div>";
			}
			powerMenu += "</div>";
		}else{
			$("#powerApp").append("<li role='presentation'><a href='#powerTab"+allApp[o].id+"' aria-controls='powerTab"+allApp[o].id+"' role='tab' data-toggle='tab'>"+allApp[o].name+"</a></li>");
			powerMenu += "<div role='tabpanel' class='tab-pane' id='powerTab"+allApp[o].id+"'>";
			for(var i in objList ){
				powerMenu += "<a href='javascript:void(0)' class='tabA level0 open' onclick='flexPowerRole($(this),$(this).next(),\""+i+"\",\""+allApp[o].id+"\")'>"+objList[i]+"</a><div style='display: none;' class='tabContent' id='powerApp"+allApp[o].id+""+i+"'></div>";
			}
			powerMenu += "</div>";
		}
	}
	
	$("#powerMenu").append(powerMenu);
}
function selAuthByRoleAndAppId(roleId,appId){
	var url = hostUrl+'sys/res/funcPermission/queryAuthorizationListByAppId';
	var postAllData={
		appId:appId,
		roleId:roleId
	}
	var w_h = $(window).height();
	$('.tab-content').height(w_h-$('#powerApp').height() - 73);
	//查看功能权限 右侧 tab切换 重置tab-content滚动条
	$("#powerApp").find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$(".tab-content").getNiceScroll().show().resize();
	});
	$.ajax({
		type:'post',
		url:url,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postAllData),
		async: false,
		success: function(data) {
			if(data.success){
				if(data.result){
					var i = roleId;
					var appList=data.result;
					for(k in appList){
						if(appList[k].level == "2"){
							$("#powerApp"+appList[k].parentId+""+i+"").append("<a href='javascript:void(0)' class='tabA level1 open' onclick='flexPower($(this),$(this).next())'>"+appList[k].name+"</a><div style='display: none;' class='div"+appList[k].id+"' id='divtop"+appList[k].id+""+i+"'><ul class='checkList0 checkList clearfix' id='button"+appList[k].id+""+i+"'></ul></div>");
						}

						if(appList[k].level == "3"){
							if(appList[k].type == 'OPERATION'){
								$("#button"+appList[k].parentId+""+i+"").append("<li class='checked' id='b"+appList[k].id+""+i+"' >"+appList[k].name+"</li>");
							}else{
								$("#divtop"+appList[k].parentId+""+i+"").append("<a href='javascript:void(0)' class='tabA levell level2 open' onclick='flexPower($(this),$(this).next())'>"+appList[k].name+"</a><div style='display: none;' class='div"+appList[k].id+"' id='divtop"+appList[k].id+""+i+"'><ul class='checkList1 checkList clearfix' id='button"+appList[k].id+""+i+"'></ul></div>");
							}
						}

						if(appList[k].level == "4"){
							if(appList[k].type == 'OPERATION'){
								$("#button"+appList[k].parentId+""+i+"").append("<li class='checked' id='b"+appList[k].id+""+i+"' >"+appList[k].name+"</li>");
							}else{
								$("#divtop"+appList[k].parentId+""+i+"").append("<a href='javascript:void(0)' class='tabA level2 level3 open' onclick='flexPower($(this),$(this).next())'>"+appList[k].name+"</a><div style='display: none;' class='div"+appList[k].id+"' id='divtop"+appList[k].id+""+i+"'><ul class='checkList2 checkList clearfix' id='button"+appList[k].id+""+i+"'></ul></div>");
							}
						}
						if(appList[k].level == "5") {
							if (appList[k].type == 'OPERATION') {
								$("#button" + appList[k].parentId + "" + i + "").append("<li class='checked' id='b" + appList[k].id + "" + i + "' >" + appList[k].name + "</li>");
							} else {
								$("#divtop" + appList[k].parentId + "" + i + "").append("<a href='javascript:void(0)' class='tabA level3 level4 open' onclick='flexPower($(this),$(this).next())'>" + appList[k].name + "</a><div style='display: none;' class='div" + appList[k].id + "' id='divtop" + appList[k].id + "" + i + "'><ul class='checkList3 checkList clearfix' id='button" + appList[k].id + "" + i + "'></ul></div>");
							}
						}
						if(appList[k].level == "6") {
							if (appList[k].type == 'OPERATION') {
								$("#button" + appList[k].parentId + "" + i + "").append("<li class='checked' id='b" + appList[k].id + "" + i + "' >" + appList[k].name+ "</li>");
							} else {
								$("#divtop" + appList[k].parentId + "" + i + "").append("<a href='javascript:void(0)' class='tabA level5 level6 open' onclick='flexPower($(this),$(this).next())'>" + appList[k].name + "</a><div style='display: none;' class='div" + appList[k].id + "' id='divtop" + appList[k].id + "" + i + "'><ul class='checkList3 checkList clearfix' id='button" + appList[k].id + "" + i + "'></ul></div>");
							}
						}
					}
					$(".tab-content").niceScroll({
						autohidemode: false,
						cursorcolor: "#eee",
						cursorwidth: "6px", // 滚动条的宽度，单位：便素
						cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
						horizrailenabled: true, // nicescroll可以管理水平滚动
						background: "#fff"
					});
					$(".tab-content").getNiceScroll().show().resize();
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取所有功能点请求失败");
		}
	});
}
/**
 * 查看已授权，更改已授权的数据变成绿色
 */

function checkAuthData(appIds,roleIds,objList){
//	var time1=new Date().getTime();
	var ubody = "sys/res/funcPermission/queryAuthDataByappIdsAndroleIds";
	var uall = hostUrl+ubody;
	var postdata ={
		appIds:appIds,
		roleIds:roleIds
	};
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postdata),
		async: false,
		success: function(data) {
			if(data.success){
				if(data.result){
//					var time2=new Date().getTime();
//					console.log("获取当前对象所有授权数据时间："+(time2-time1));
					var appList=data.result;
//					console.log("获取当前对象所有授权数据的长度："+appList.length);
					for(k in appList){
//					   $("#b"+appList[k].operation_id).attr('class','checked');
//					   $("#b"+appList[k].operation_id+"a").attr('class','checked');
					   for(var i in objList ){
						   if(appList[k].role_id == i){
							   $("#b"+appList[k].operation_id+""+i+"").attr('class','checked');
						   }
						}
					}
//					var time3=new Date().getTime();
//					console.log("更改已授权的数据变成绿色的时间："+(time3-time2));
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化已选中授权数据请求失败");
		}
	});
}

/**
 * 按钮树点击节点事件（动作点-角色）
 */

function buttonzTreeOnClick(event, treeId, treeNode) {
	authRoleData = {};
	colRoleModeldata=[];
	colRoleModeldata.push({name : 'id',label : 'id',hidden:true,align : "center"});
	colRoleModeldata.push({name : 'name',label : '对象',width : 370,align : "left"});
	colRoleModeldata.push({name : 'operationname',operationId:'operationId',appId:'appId',resourceId:'resourceId',width : 60,label : '全选',align : "center",formatter: formatterRolecheck});
	
	var operationIds = "";
	if(treeNode.type == 'RESOURCE'){
		var childNodes = treeNode.children;
		
		var colNum=0;
		for(var k =0;k<childNodes.length;k++){
			var cNode = childNodes[k];
			if(cNode.type == 'OPERATION'){
				colNum++;
			}
		}
		if(colNum == 0){
			pop_tip_open("red","没有按钮");
			return false;
		}
		var colWidth = 100;
		if(colNum < 9){
			colWidth = ($('.listRoleAuthTable').width()-370-75)/colNum;
		}
		
		for(var c=0;c<childNodes.length;c++){
			var cNode = childNodes[c];
			if(cNode.type == 'OPERATION'){
				operationIds += cNode.id+",";
				colRoleModeldata.push({name : 'operationname',operationId:cNode.id,appId:cNode.appId,resourceId:cNode.resourceId,label : cNode.name,width : colWidth,align : "center",formatter: formatterRolecheck});
			}
		}
		if (operationIds.length > 0 ) operationIds = operationIds.substring(0, operationIds.length-1);
	}else if(treeNode.type == 'OPERATION'){
		var colWidth = $('.listRoleAuthTable').width()-370-75;
		operationIds = treeNode.id;
		colRoleModeldata.push({name : 'operationname',operationId:treeNode.id,appId:treeNode.appId,resourceId:treeNode.resourceId,label : treeNode.name,width : colWidth,align : "center",formatter: formatterRolecheck});
	}
	getRoleAuthorizationData(operationIds);
	//重新算一下动作点-角色里面的grid的高
	$('#listRoleAuth').jqGrid().setGridHeight($(window).height() - 120 - 42);
}


/**
 * 角色树搜索方法
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
	/*lastValue = "";
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var value = $.trim(key.get(0).value);
	//如果搜索框内无内容，不进行搜索，展开所有节点
	if(value == ""){
		zTree.expandAll(true);
		setTimeout(function(){
			$.xljUtils.addTreeScroll('ztree-box');
			$.xljUtils.treeResizeFn();
		},300);
	}else{
		searchNode();
	}*/
	var zTreeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var searchKeys = ['loginName', 'name'];
	$.xljUtils._searchTreeBtnEvent(key,zTreeObj, searchKeys);
//	$.xljUtils._searchTreeBtnEvent(key,zTreeObj);
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

/**
 * 按钮树搜索方法
 */

function focusKeyOp(e) {
	if (keyOp.hasClass("empty")) {
		keyOp.removeClass("empty");
	}
}
function blurKeyOp(e) {
	if (keyOp.get(0).value === "") {
		keyOp.addClass("empty");
	}
}

function clickRadioOp() {
	/*lastValueOp = "";
	var zTree = $.fn.zTree.getZTreeObj("treeButton");
	var value = $.trim(keyOp.get(0).value);
	//如果搜索框内无内容，不进行搜索，展开所有节点
	if(value == ""){
		zTree.expandAll(true);
		setTimeout(function(){
			$.xljUtils.addTreeScroll('ztree-box');
			$.xljUtils.treeResizeFn();
		},300);
	}else{
		searchNodeOp();
	}*/
	var zTreeObj = $.fn.zTree.getZTreeObj("treeButton");
	var searchKeys = ['loginName', 'name'];
	$.xljUtils._searchTreeBtnEvent(keyOp,zTreeObj, searchKeys);
//	$.xljUtils._searchTreeBtnEvent(keyOp,zTreeObj);
}
function searchNodeOp(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeButton");
	var keyType = "name";
	var value = $.trim(keyOp.get(0).value);
	if (lastValueOp === value) return;
	lastValueOp = value;
	if (value === "") return;
	updateNodesOp(false);

	nodeListOp = zTree.getNodesByParamFuzzy(keyType, value);
	for(var i=0;i<nodeListOp.length;i++){
		var node=nodeListOp[i];
		var parentNode=node.getParentNode();
		if(parentNode && !parentNode.open){
			zTree.expandNode(parentNode,true,false,false,true);
		}
	}
	updateNodesOp(true);

}
function updateNodesOp(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("treeButton");
	for( var i=0, l=nodeListOp.length; i<l; i++) {
		nodeListOp[i].highlight = highlight;
		zTree.updateNode(nodeListOp[i]);
	}
}

/**
 * 查看授权角色树搜索方法
 */

function focusKeyShow(e) {
	if (keyShow.hasClass("empty")) {
		keyShow.removeClass("empty");
	}
}
function blurKeyShow(e) {
	if (keyShow.get(0).value === "") {
		keyShow.addClass("empty");
	}
}

function clickRadioShow() {
	/*lastValueShow = "";
	var zTree = $.fn.zTree.getZTreeObj("treeshow");
	var value = $.trim(keyShow.get(0).value);
	//如果搜索框内无内容，不进行搜索，展开所有节点
	if(value == ""){
		zTree.expandAll(true);
		setTimeout(function(){
			$.xljUtils.addTreeScroll('ztree-box');
			$.xljUtils.treeResizeFn();
		},300);
	}else{
		searchNodeShow();
	}*/
	var zTreeObj = $.fn.zTree.getZTreeObj("treeshow");
	var searchKeys = ['loginName', 'name'];
	$.xljUtils._searchTreeBtnEvent(keyShow,zTreeObj, searchKeys);
//	$.xljUtils._searchTreeBtnEvent(keyShow,zTreeObj);
}
function searchNodeShow(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeshow");
	var keyType = "name";
	var value = $.trim(keyShow.get(0).value);
	if (lastValueShow === value) return;
	lastValueShow = value;
	if (value === "") return;
	updateNodesShow(false);

	nodeListShow = zTree.getNodesByParamFuzzy(keyType, value);
	for(var i=0;i<nodeListShow.length;i++){
		var node=nodeListShow[i];
		var parentNode=node.getParentNode();
		if(parentNode && !parentNode.open){
			zTree.expandNode(parentNode,true,false,false,true);
		}
	}
	updateNodesShow(true);

}
function updateNodesShow(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("treeshow");
	for( var i=0, l=nodeListShow.length; i<l; i++) {
		nodeListShow[i].highlight = highlight;
		zTree.updateNode(nodeListShow[i]);
	}
}



/*function getFontCss(treeId, treeNode) {
 return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
 }*/

/**
 * 个性化文字样式，只针对 zTree 在节点上显示的对象
 * @param treeId
 * @param treeNode
 * @returns
 */
function getFontCss(treeId, treeNode) {
	/*return (!!treeNode.highlight) ? {color:'#A60000', "font-weight":"bold"} : {color:"#333", "font-weight":"normal"} | (treeNode.status&&treeNode.status=='0') ?
	 {'color':'#CD0000'} :
	 {color:"#333", "font-weight":"normal",'font-style':'normal'};*/
	/*return (treeNode.highlight) ?
	{'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold",color:"#CD0000"} :
		{color:"#333", "font-weight":"normal",'font-style':'normal'} | (treeNode.status&&treeNode.status=='0') ?
		{'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
		{color:"#333", "font-weight":"normal",'font-style':'normal'};*/
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
 * 按钮递归获取树图片样式
 */
function recursionArrayButton(arr) {
    for(var i in arr) {
    	if(arr[i].type == "APPSystem") {
    		arr[i].iconSkin = "diy-system";
            if(arr[i].children.length > 0) {
            	recursionArrayButton(arr[i].children);
            }
        }else if(arr[i].type == "RESOURCE") {
        	arr[i].iconSkin = "diy-menu";
            if(arr[i].children.length > 0) {
            	recursionArrayButton(arr[i].children);
            }
        }else if(arr[i].type == "OPERATION" ) {
        	arr[i].iconSkin = "diy-function";
        	if(arr[i].children.length > 0) {
            	recursionArrayButton(arr[i].children);
            }
        }
    }
};

var key;
var keyShow;
/**
 * 获取角色树(标准岗位-角色到岗位)
 */
function getRoleTree(objType) {
    $("#objectType").attr("disabled",true);
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
	
	var urlAll = hostUrl + urlBody;
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
            $("#objectType").attr("disabled",false);
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
 * 获取角色树(标准岗位-查看授权)
 */
function getRoleTreeShow(objType,isShowId) {
    $("#objectTypeShow").attr("disabled",true);
	var urlBody = "sys/org/roleCatalog/getRoleTree";
	var data = {type:1};
	if("standardPost"==objType){//标准岗位
		urlBody = 'sys/org/roleCatalog/getRoleTree';
		data = {type:1};
	}else if("role"==objType){//角色
		urlBody = 'sys/org/roleCatalog/getRoleTree';
		data = {type:0};
	}else if("post"==objType){//岗位
		urlBody = 'sys/org/post/getPostTree';
		data = {rootDelFlag: 0, orgDelFlag: 0, postDelFlag: 0, rootStatus: 1, orgStatus: 1, postStatus: 1};
	}else if("user"==objType){//用户
		urlBody = 'sys/org/user/getUserTree';
		data = {rootDelFlag: 0, orgDelFlag: 0, postDelFlag: 0, rootStatus: 1, orgStatus: 1, postStatus: 1,userStatus:1,userDelFlag:0};
	}
	
	var urlAll = hostUrl + urlBody;
	$.ajax({
		type:'POST',
		url:urlAll,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(data),
		success: function(json) {
			var zNodes = json.result;
			recursionArray(zNodes);
			zTreeShowObj = $.fn.zTree.init($("#treeshow"), settingShow, zNodes);
            $("#objectTypeShow").attr("disabled",false);
            var nodesshow = zTreeShowObj.getNodes();
            //默认展开第一个节点和第二个节点
            zTreeShowObj.expandNode(nodesshow[0], true, false, false,false);
            zTreeShowObj.expandNode(nodesshow[1], true, false, false,false);
			keyShow = $("#keyShow");
			/*keyShow.bind("focus", focusKeyShow)
				.bind("blur", blurKeyShow)
				.bind("propertychange", searchNodeShow)
				.bind("input", searchNodeShow);*/
			var searchKeys = ['loginName', 'name'];
			$.xljUtils._searchTreeInputEvent(keyShow,zTreeShowObj,searchKeys);
			
			if(isShowId){
				var nodes = zTreeShowObj.getNodesByParam('id',isShowId);
				  zTreeShowObj.selectNode(nodes[0]);
				  zTreeShowObj.setting.callback.onClick(null, zTreeShowObj.setting.treeId, nodes[0]);
			}
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
		}
	})
}




var keyOp;
/**
 * 获取按钮树
 */
function getButtonTree(appId) {
    $("#appIdTwo").attr("disabled",true);
  urlBody = "sys/res/resource/getOperationTreeByAppId";
  urlAll = hostUrl + urlBody;
  var postdata={
		  appId:appId
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
          $("#appIdTwo").attr("disabled",false);
//          zTreeObjButton.expandAll(true); 
          keyOp = $("#keyOp");
          keyOp.bind("focus", focusKeyOp)
			.bind("blur", blurKeyOp)
			.bind("propertychange", searchNodeOp)
			.bind("input", searchNodeOp);

          //update by dgh on 2017/05/15 start
		  var urlParam = $.xljUtils.getUrlParams();
		  if(urlParam&&urlParam.menuId){
			  var nodes = zTreeObjButton.getNodesByParam('id',urlParam.menuId);
			  if(nodes && nodes[0].children && nodes[0].children.length>0){
				  zTreeObjButton.selectNode(nodes[0].children[0]);
		          zTreeObjButton.setting.callback.onClick(null, zTreeObjButton.setting.treeId, nodes[0].children[0]);
			  }else{
				  zTreeObjButton.selectNode(nodes[0]);
		          zTreeObjButton.setting.callback.onClick(null, zTreeObjButton.setting.treeId, nodes[0]);
			  }
		  }
		  
          //update by dgh on 2017/05/15 end

          setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
      }
  })
}

/**
 * 功能按钮数据(动作点-角色)
 */
function getRoleAuthorizationData(operationIds){
	var ttype="";
	$.xljUtils.removeGridScroll();
	var objType = $('#objectTypeButton').val();
	var queryAuthorizationListUrl = "";
	if("standardPost"==objType){//标准岗位
		queryAuthorizationListUrl = hostUrl+'sys/res/funcPermission/queryAuthorizationListAllRoles';
		ttype = "role";
	}else if("role"==objType){//角色
		queryAuthorizationListUrl = hostUrl+'sys/res/funcPermission/queryAuthorizationListAllCurrencyRoles';
		ttype = "role";
	}else if("post"==objType){//岗位
		queryAuthorizationListUrl = hostUrl+'sys/res/funcPermission/queryAuthorizationListAllPost';
		ttype = "post";
	}else if("user"==objType){//用户
		queryAuthorizationListUrl = hostUrl+'sys/res/funcPermission/queryAuthorizationListAllUser';
		ttype = "user";
	}
	
	if(false){
		listRoleAuthJqgrid.jqGrid("setGridParam", { url: queryAuthorizationListUrl}).trigger("reloadGrid");
	}else{
		jQuery("#listRoleAuth").GridUnload();
		listRoleAuthJqgrid = jQuery("#listRoleAuth").jqGrid({
			url: queryAuthorizationListUrl,
			ajaxGridOptions: { contentType: 'application/json' },
			mtype : "POST",
			postData:{},
			treeGrid: true,
			treeGridModel: "adjacency",
			ExpandColumn:"name",
			datatype : "json",
			subGrid:true,
			shrinkToFit:false,
			width:$('.listRoleAuthTable').width(),
//			autowidth:true,
			height:$(window).height() - 150,
			jsonReader : {
				root:"result",
				repeatitems : false
			},
			colModel:colRoleModeldata,
			rowNum:-1,
			treeReader:{
				level_field: "level",
				parent_id_field: "parentId",
				leaf_field: "isLeaf",
				expanded_field: "expanded"
			},
			ondblClickRow:function(id,iRow,iCol,e){

			},

			onCellSelect:function(){
			},
			loadError:function(jqXHR, textStatus, errorThrown){
				$.xljUtils.getError(jqXHR.status);
			},
			gridComplete:function(){
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
				var ubody = "sys/res/funcPermission/queryAuthDataByOperationIds";
				var uall = hostUrl+ubody;
				var postdata ={
						operationIds:operationIds,
						type:ttype
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
//								for(k in appList){
								for(var k=0;k< appList.length;k++){
									var newauthids = appList[k].prefix_id+"#"+appList[k].operation_id+"#"+appList[k].prefix_sort+"#role";
//	        							var appids = appList[k].prefix_id.split("/");
									var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
									for(var ao =0;ao<authorizationCheck_obj.length;ao++){
										var checkauthids = authorizationCheck_obj[ao].value;
										var checkappIds = checkauthids.split("#");
										if(checkappIds[1] == appList[k].operation_id){
											if((appList[k].prefix_id).indexOf(checkappIds[0]) >=0 ){
												authorizationCheck_obj[ao].checked = true;
											}
										}
//	        								if(newauthids == checkauthids){
//	        									authorizationCheck_obj[ao].checked = true;
//	        								}
									}
								}
							}
						}else{
							pop_tip_open("red",data.msg);
						}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						pop_tip_open("red","初始化动作点-角色已选中授权数据请求失败");
					}
				})
			}
		});
	}

}





/**
 * XjTreegrid功能按钮数据(角色-动作点)
 */
function getAuthorizationDataXjTreegrid(appIds,roleIds){
	$.xljUtils.removeGridScroll("xjtreegrid-body");
	//参数跟jqgrid相似
	var options={
	    ExpandLevel:2,//默认打开的级次，从0开始
	    colNames:colNames,
	    colModel:colModeldata
//	    click:function(id,row,col,colname,value){//回调方法，单击单元格时触发，分别表示id、行号、列号、列名（colModel中name值）、单元格内容
//	    	console.log(id);
//	    	console.log(row);
//	    	console.log(col);
//	    	console.log(colname);
//	    	console.log(value);
//            if(colname!="name"){
//                var beginTime=new Date().getTime();
//                var cellValue=$funXjJqgrid.getCellData(id,colname);
//                console.log(cellValue);
////                console.log(cellValue.checked);
//                var endTime=new Date().getTime();
//                console.log(endTime-beginTime);
//            }
//        }
	};
	var ppdata={"appIds":appIds};
	var arr = new Array();
//	var time1=new Date().getTime();
	$.ajax({
		type:'post',
		url:hostUrl+'sys/res/funcPermission/queryAuthorizationListByAppIds',
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(ppdata),
		async: false,
		success: function(data) {
			if(data.success){
				if(data.result){
//					var time2=new Date().getTime();
//					console.log("查询数据时间："+(time2-time1));
		        	   var array=new Array();
		        	   arr=data.result;
		        	   var name=$("#operationName").val();// 获取名称
		    		   if(name){//名称存在时
		    			   for(var o in arr){
		    				   for(var j=1;j<colModeldata.length;j++){
		    					   //也是roleId
		    					   var key = colModeldata[j].name;
		    					   var checkStr = "<input type='checkbox' id='"+arr[o].id+"-"+key+"' data-prefixId='"+arr[o].prefix_id+"' data-resourceId='"+arr[o].reousce_id+"' data-appId='"+arr[o].app_id+"'  data-authids='"+arr[o].prefix_id+"#"+key+"#"+arr[o].prefix_sort+"#"+arr[o].type+"#"+arr[o].app_id+"#"+arr[o].reousce_id+"' onchange='changeCheck(this)' name='authorizationCheck_1' value='"+arr[o].prefix_id+"#"+key+"#"+arr[o].prefix_sort+"#"+arr[o].type+"#"+arr[o].app_id+"#"+arr[o].reousce_id+"'>";
		    					   arr[o][key] = checkStr;
		    				   }
		    				   arr[o].fullid=arr[o].prefix_id;
		    				   arr[o].isShow=false;
		    				   if(arr[o].name.indexOf(name)>-1){
		    					   array.push(arr[o].prefix_sort);
		    				   }
		    			   }
		    		   }else{
		    			   for(var o in arr){
		    				   for(var j=1;j<colModeldata.length;j++){
		    					   //也是roleId
		    					   var key = colModeldata[j].name;
		    					   var checkStr = "<input type='checkbox' id='"+arr[o].id+"-"+key+"' data-prefixId='"+arr[o].prefix_id+"' data-resourceId='"+arr[o].reousce_id+"' data-appId='"+arr[o].app_id+"'  data-authids='"+arr[o].prefix_id+"#"+key+"#"+arr[o].prefix_sort+"#"+arr[o].type+"#"+arr[o].app_id+"#"+arr[o].reousce_id+"' onchange='changeCheck(this)' name='authorizationCheck_1' value='"+arr[o].prefix_id+"#"+key+"#"+arr[o].prefix_sort+"#"+arr[o].type+"#"+arr[o].app_id+"#"+arr[o].reousce_id+"'>";
		    					   arr[o][key] = checkStr;
		    				   }
		    				   arr[o].fullid=arr[o].prefix_id;
		    				   arr[o].isShow=true;
		    				   arr[o].isloaded=true;
//		    				   array.push(arr[o].prefix_sort);
		    			   }
		    		   }
		    	   if(array.length>0){
		    		  for(var d in array){
		    			  for(var i in arr){
		    				  if(array[d].indexOf(arr[i].prefix_sort)>-1){
		    					  arr[i].isShow=true;
		    				  }
		    			  }
		    		  } 
		    	    }
//	    			   for(var o in arr){
//	    				   for(var j=1;j<colModeldata.length;j++){
//	    					   //也是roleId
//	    					   var key = colModeldata[j].name;
//	    					   var checkStr = "<input type='checkbox' id='"+arr[o].id+"-"+key+"'  data-authids='"+arr[o].prefix_id+"#"+key+"#"+arr[o].prefix_sort+"#"+arr[o].type+"#"+arr[o].app_id+"#"+arr[o].reousce_id+"' onchange='changeCheck(this)' name='authorizationCheck_1' value='"+arr[o].prefix_id+"#"+key+"#"+arr[o].prefix_sort+"#"+arr[o].type+"#"+arr[o].app_id+"#"+arr[o].reousce_id+"'>";
//	    					   arr[o][key] = checkStr;
//	    				   }
//	    				   arr[o].fullid=arr[o].prefix_id;
//	    			   }
//    			   var time3=new Date().getTime();
//					console.log("处理数据格式化多选框时间："+(time3-time2));
//					console.log("所有数据长度========："+arr.length);
					loadJsonData=[];
					loadJsonData = arr;
		    		return arr; 
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化已选中授权数据请求失败");
		}
	})
//	var time4=new Date().getTime();
	$funXjJqgrid=$("#listAuth").xjTreegrid(options);
	$funXjJqgrid.loadJsonData(arr);
	$(".xjtreegrid-body").height($(".xj-main-grid").height()-30);
	$.xljUtils.addGridScroll("xjtreegrid-body");
	$.xljUtils.treeResizeFn("xjtreegrid-body");
	var time5=new Date().getTime();
//	console.log("装载数据时间："+(time5-time4));
	//初始化已选数据
	initCheckData(appIds,roleIds);
}

/**
 * 初始化已选数据
 */
function  initCheckData(appIds,roleIds){
	var time1=new Date().getTime();
	var ubody = "sys/res/funcPermission/queryAuthDataByappIdsAndroleIds";
	var uall = hostUrl+ubody;
	var postdata ={
		appIds:appIds,
		roleIds:roleIds
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
					var time2=new Date().getTime();
					console.log("查询已授权数据时间："+(time2-time1));
					var appList=data.result;
					loadJsonDataAuth = appList;
					console.log("已授权数据长度========："+appList.length);
					var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
					console.log("所有多选框数据长度========："+authorizationCheck_obj.length);
					
					for(k in appList){
						var AROids = appList[k].prefix_id.split("/");
						var checkRoleId = appList[k].role_id
						for(var ao =0;ao<AROids.length;ao++){
							var checkId = AROids[ao]+"-"+checkRoleId;
							if(null != $("#"+checkId)[0] && $("#"+checkId)[0] != "undefined" && $("#"+checkId)[0] != undefined){
								$("#"+checkId)[0].checked = true;
							}
						}
//						var checkOperationId = appList[k].operation_id+"-"+appList[k].role_id;
//						var checkResourceId = appList[k].resource_id+"-"+appList[k].role_id;
//						var checkAppId = appList[k].app_id+"-"+appList[k].role_id;
//						$("#"+checkOperationId)[0].checked = true;
//						$("#"+checkResourceId)[0].checked = true;
//						$("#"+checkAppId)[0].checked = true;
//						var authorizationCheck_obj_like = $("input[type=checkbox][name=authorizationCheck_1][value*="+appList[k].role_id+"]");
//						console.log("同列数据长度========："+authorizationCheck_obj_like.length);
//						for(var ao =0;ao<authorizationCheck_obj_like.length;ao++){
//							var checkauthids = authorizationCheck_obj_like[ao].value;
//							var checkappIds = checkauthids.split("#");
//							if(checkappIds[1] == appList[k].role_id){
//								if(appList[k].prefix_id.indexOf(checkappIds[0]) >=0 ){
//									authorizationCheck_obj_like[ao].checked = true;
//								}
//							}
//						}
					}
					var time3=new Date().getTime();
					console.log("处理已选中数据打中对勾时间："+(time3-time2));
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化已选中授权数据请求失败");
		}
	})
}


/**
 * 加载系统下拉框
 */
function getAppData(){
	var ubody = "sys/res/appSystem/queryList";
	var uall = hostUrl+ubody;
	var postdata ={
		appDelFlag:"0",
		appStatus:"1"
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
					//$("#appId").append("<option value=''>全部</option>");
					allApp = data.result;
					var queryData2={
						menuDelFlag:"0",
						appId:appList[0].id
					};
					for(var o in appList){
						$("#appList").append("<li><input type='checkbox' name='appCheck' value='"+appList[o].id+"#"+appList[o].name+"'><span>"+appList[o].name+"</span></li>");

					}
					//加滚动条
					addCheckboxScroll();
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","加载系统请求失败");
		}
	})
}

/**
 * 加载系统下拉框
 */
function getAppDataTwo(){
	var ubody = "sys/res/appSystem/queryList";
	var uall = hostUrl+ubody;
	var postdata ={
		appDelFlag:"0",
		appStatus:"1"
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
					$("#appIdTwo").empty();
					for(var o in appList){
						//数据到角色
						$("#appIdTwo").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
					}
					//初始化按钮树
					getButtonTree(appList[0].id);
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","加载系统请求失败");
		}
	})
}



/**
 * 设置页面改动过的授权数据(角色到动作点)
 * @param key
 * @param value
 */
function cacheData(key,value){
	var isexist = false;
	for(var k in authData){
		if(key == k){
			delete authData[k];
			isexist = true;
			break;
		}
	}
	if(!isexist){
		authData[key] = value;
	}
}

/**
 * 设置页面改动过的授权数据（动作点到角色）
 * @param key
 * @param value
 */
function cacheRoleData(key,value){
	var isexist = false;
	for(var k in authRoleData){
		if(key == k){
			delete authRoleData[k];
			isexist = true;
			break;
		}
	}
	if(!isexist){
		authRoleData[key] = value;
	}
}

/**
 * 保存授权数据（角色到动作点）
 */
function saveAuthData(){
//	for(var k in authData){
//	   alert(k+" : "+authData[k]);
//	}
	var postData ={
		saveData:authData
	}
	var uBody = "sys/res/funcPermission/saveBatch";
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'POST',
		url:uAll,
		async: false,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postData),
		success: function(json) {
			if(json.success == true){
				pop_tip_open("green","数据保存成功！");
				authData = {};
			}else{
				pop_tip_open("red","数据修改保存失败！"+json.msg);
			}
		}
	})
}

/**
 * 保存授权数据(动作点到角色)
 */
function saveAuthRoleData(){
//	for(var k in authRoleData){
//	   alert(k+" : "+authRoleData[k]);
//	}
	var postData ={
		saveData:authRoleData
	}
	var uBody = "sys/res/funcPermission/saveBatchFunToRole";
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'POST',
		url:uAll,
		async: false,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postData),
		success: function(json) {
			if(json.success == true){
				pop_tip_open("green","数据保存成功！");
				authRoleData = {};
			}else{
				pop_tip_open("red","数据修改保存失败！"+json.msg);
			}
		}
	})
}

/**
 * 点击多选框的变化值（角色-动作点）
 * @param e
 */
function changeCheck(e){
	var authids = e.value.split("#");
	var prefix_id = authids[0];
	var roldId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	
	
	//全选的多选框
	if(roldId == "roleId"){
		if(e.checked){
			var sameIds = getSameIdsOne(e.id);
			//设置同级节点变成选中
			for(var i=0;i<sameIds.length;i++){
				var saveId = sameIds[i];
				if(saveId != e.id){
					var splitids = $("#"+saveId)[0].value.split("#");
					if(splitids[3] == "OPERATION"){
						if($("#"+saveId)[0].checked != e.checked){
							cacheData($("#"+saveId)[0].value,"1");
						}
					}
					$("#"+saveId)[0].checked = true;
				}
			}
			var childIds = getAllChildIdsOne(e.id);
			var parentIds = getAllParentNodeIdOne(e.id);
			//设置所有下级变成选中
			for(var i=0;i<childIds.length;i++){
	            var cid=childIds[i];
	            var checkauthids = $("#"+cid)[0].value.split("#");
	            if(checkauthids[3]=="OPERATION" ){
					if(e.checked != $("#"+cid)[0].checked){
						cacheData($("#"+cid)[0].value,"1");
					}
				}
	            $("#"+cid)[0].checked = true;
	        }
			//设置所有父级变成选中
			for(var i=0;i<parentIds.length;i++){
	            var pid=parentIds[i];
	            var checkauthids = $("#"+pid)[0].value.split("#");
	            if(checkauthids[3]=="OPERATION"){
					if(e.checked != $("#"+pid)[0].checked){
						cacheData($("#"+pid)[0].value,"1");
					}
				}
	            $("#"+pid)[0].checked = true;
	        }
		}else{
			var sameIds = getSameIdsOne(e.id);
			for(var i=0;i<sameIds.length;i++){
				var saveId = sameIds[i];
				if(saveId != e.id){
					var splitids = $("#"+saveId)[0].value.split("#");
					if(splitids[3] == "OPERATION"){
						if($("#"+saveId)[0].checked != e.checked){
							cacheData($("#"+saveId)[0].value,"0");
						}
					}
					$("#"+saveId)[0].checked = false;
				}
			}
			var childIds = getAllChildIdsOne(saveId);
			var parentIds = getAllParentNodeIdOne(saveId);
			//设置所有下级变成取消
			for(var i=0;i<childIds.length;i++){
	            var cid=childIds[i];
	            var checkauthids = $("#"+cid)[0].value.split("#");
	            if(checkauthids[3]=="OPERATION"){
					if(e.checked != $("#"+cid)[0].checked){
						cacheData($("#"+cid)[0].value,"0");
					}
				}
	            $("#"+cid)[0].checked = false;
	        }
			//设置父级变成取消状态（如果父级有其他选中的，则不被取消）
			for(var i=parentIds.length-1;i>=0;i--){
	            var pid=parentIds[i];
	            var cIds = getChildIdsOne(pid);
	            var haveCheck=0;
	            for(var j=0;j<cIds.length;j++){
	                var sid=cIds[j];
	                if($("#"+sid)[0].checked){
	                	haveCheck++;
	                }
	            }
	            if(haveCheck==0){
	            	 var checkauthids = $("#"+pid)[0].value.split("#");
	 	            if(checkauthids[3]=="OPERATION"){
	 					if(e.checked != $("#"+pid)[0].checked){
	 						cacheData($("#"+pid)[0].value,"0");
	 					}
	 				}
	            	$("#"+pid)[0].checked = false;
	            }
	        }
		}
	}else{
		//单列的
		//获取当前是选中还是取消
//		console.log(e.checked);
		//选中多选框
		if(e.checked){
			if(type=="OPERATION"){
				cacheData(e.value,"1");
			}
			var childIds = getChildIdsOne(e.id);
			var parentIds = getParentNodeIdOne(e.id);
			//设置所有下级变成选中
			for(var i=0;i<childIds.length;i++){
	            var cid=childIds[i];
	            var checkauthids = $("#"+cid)[0].value.split("#");
	            if(checkauthids[3]=="OPERATION" ){
					if(e.checked != $("#"+cid)[0].checked){
						cacheData($("#"+cid)[0].value,"1");
					}
				}
	            $("#"+cid)[0].checked = true;
	        }
			//设置所有父级变成选中
			for(var i=0;i<parentIds.length;i++){
	            var pid=parentIds[i];
	            var checkauthids = $("#"+pid)[0].value.split("#");
	            if(checkauthids[3]=="OPERATION"){
					if(e.checked != $("#"+pid)[0].checked){
						cacheData($("#"+pid)[0].value,"1");
					}
				}
	            $("#"+pid)[0].checked = true;
	        }
		}else{
			//把自己添加到缓存数据中
			if(type=="OPERATION"){
				cacheData(e.value,"0");
			}
			var childIds = getChildIdsOne(e.id);
			var parentIds = getParentNodeIdOne(e.id);
			//设置所有下级变成取消
			for(var i=0;i<childIds.length;i++){
	            var cid=childIds[i];
	            var checkauthids = $("#"+cid)[0].value.split("#");
	            if(checkauthids[3]=="OPERATION"){
					if(e.checked != $("#"+cid)[0].checked){
						cacheData($("#"+cid)[0].value,"0");
					}
				}
	            $("#"+cid)[0].checked = false;
	        }
			//设置父级变成取消状态（如果父级有其他选中的，则不被取消）
			for(var i=parentIds.length-1;i>=0;i--){
	            var pid=parentIds[i];
	            var cIds = getChildIdsOne(pid);
	            var haveCheck=0;
	            for(var j=0;j<cIds.length;j++){
	                var sid=cIds[j];
	                if($("#"+sid)[0].checked){
	                	haveCheck++;
	                }
	            }
	            if(haveCheck==0){
	            	 var checkauthids = $("#"+pid)[0].value.split("#");
	 	            if(checkauthids[3]=="OPERATION"){
	 					if(e.checked != $("#"+pid)[0].checked){
	 						cacheData($("#"+pid)[0].value,"0");
	 					}
	 				}
	            	$("#"+pid)[0].checked = false;
	            }
	        }
		}
	}
	
	/*
	var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
//	for(k in authorizationCheck_obj){
	for(var k =0;k<authorizationCheck_obj.length;k++){
		var checkauthids = authorizationCheck_obj[k].value.split("#");
		//判断是否等于自己，如果是把自己放到或者删除在缓存中
		if(authorizationCheck_obj[k].value == e.value){
			if(type=="OPERATION"){
				if(e.checked){
					cacheData(e.value,"1");
				}else{
					cacheData(e.value,"0");
				}
			}
		}else{
			if(roldId == "roleId"){
				//横向改变复选框
				if(prefix_id == checkauthids[0]){
					if(e.checked){
						if(checkauthids[3]=="OPERATION"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheData(authorizationCheck_obj[k].value,"1");
							}
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(checkauthids[3]=="OPERATION"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheData(authorizationCheck_obj[k].value,"0");
							}
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
				//竖向改变复选框
				if(prefix_id.indexOf(checkauthids[0]) >= 0 || checkauthids[0].indexOf(prefix_id) >= 0){
					if(e.checked){
						if(checkauthids[3]=="OPERATION"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheData(authorizationCheck_obj[k].value,"1");
							}
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(checkauthids[3]=="OPERATION"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheData(authorizationCheck_obj[k].value,"0");
							}
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
			}else{
				//竖向改变复选框
				if(checkauthids[1] == roldId && checkauthids[0] != prefix_id && (prefix_id.indexOf(checkauthids[0]) >=0 || checkauthids[0].indexOf(prefix_id) >= 0)){
					if(e.checked){
						if(checkauthids[3]=="OPERATION"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheData(authorizationCheck_obj[k].value,"1");
							}
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(checkauthids[3]=="OPERATION"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheData(authorizationCheck_obj[k].value,"0");
							}
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
			}
		}
	}*/
}
/**
 * 获取复选框父节点Id(动作点到角色)
 */
function getParentNodeId(id){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	//循环所有多选框
	var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
	for(var k =0;k<authorizationCheck_obj.length;k++){
		var checkauthids = authorizationCheck_obj[k].value.split("#");
		//判断是一列
		if(checkauthids[1] == operationId){
			//匹配到上级
			if(prefix_id.indexOf(checkauthids[0]) >= 0){
				/*
				//取直属上级
				var moreLength = prefix_id.split("/").length - checkauthids[0].split("/").length;
				if(moreLength == 1){
					console.log(authorizationCheck_obj[k].id);
					ids.push(authorizationCheck_obj[k].id);
				}*/
				//取所有上级，不包括自己
				if(prefix_id != checkauthids[0]){
//					console.log(authorizationCheck_obj[k].id);
					ids.push(authorizationCheck_obj[k].id);
				}
			}
		}
	}
	return ids;
}
/**
 * 获取复选框子节点Id(动作点到角色)
 */
function getChildIds(id){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	//循环所有多选框
	var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
	for(var k =0;k<authorizationCheck_obj.length;k++){
		var checkauthids = authorizationCheck_obj[k].value.split("#");
		//判断是一列
		if(checkauthids[1] == operationId){
			//匹配到下级
			if(checkauthids[0].indexOf(prefix_id) >= 0){
				/*
				var moreLength = checkauthids[0].split("/").length - prefix_id.split("/").length;
				//取直属下级
				if(moreLength == 1){
					console.log(authorizationCheck_obj[k].id);
					ids.push(authorizationCheck_obj[k].id);
				}*/
				//取所有下级，不包括自己
				if(prefix_id != checkauthids[0]){
//					console.log(authorizationCheck_obj[k].id);
					ids.push(authorizationCheck_obj[k].id);
				}
			}
		}
	}
	return ids;
}

/**
 * 获取全选复选框同级节点（包括自己）(动作点到角色)
 */
function getSameIds(id){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	//循环所有多选框
	var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
	for(var k =0;k<authorizationCheck_obj.length;k++){
		var checkauthids = authorizationCheck_obj[k].value.split("#");
		if(prefix_id == checkauthids[0]){
//			console.log(authorizationCheck_obj[k].id);
			ids.push(authorizationCheck_obj[k].id);
		}
	}
	return ids;
}

/**
 * 获取全部复选框父节点Id(动作点到角色)
 */
function getAllParentNodeId(id){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	//循环所有多选框
	var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
	for(var k =0;k<authorizationCheck_obj.length;k++){
		var checkauthids = authorizationCheck_obj[k].value.split("#");
		//匹配到上级
		if(prefix_id.indexOf(checkauthids[0]) >= 0){
			/*
			//取直属上级
			var moreLength = prefix_id.split("/").length - checkauthids[0].split("/").length;
			if(moreLength == 1){
				console.log(authorizationCheck_obj[k].id);
				ids.push(authorizationCheck_obj[k].id);
			}*/
			//取所有上级，不包括自己
			if(prefix_id != checkauthids[0]){
//				console.log(authorizationCheck_obj[k].id);
				ids.push(authorizationCheck_obj[k].id);
			}
		}
	}
	return ids;
}
/**
 * 获取全部复选框子节点Id(动作点到角色)
 */
function getAllChildIds(id){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	//循环所有多选框
	var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
	for(var k =0;k<authorizationCheck_obj.length;k++){
		var checkauthids = authorizationCheck_obj[k].value.split("#");
		//匹配到下级
		if(checkauthids[0].indexOf(prefix_id) >= 0){
			/*
			var moreLength = checkauthids[0].split("/").length - prefix_id.split("/").length;
			//取直属下级
			if(moreLength == 1){
				console.log(authorizationCheck_obj[k].id);
				ids.push(authorizationCheck_obj[k].id);
			}*/
			//取所有下级，不包括自己
			if(prefix_id != checkauthids[0]){
//				console.log(authorizationCheck_obj[k].id);
				ids.push(authorizationCheck_obj[k].id);
			}
		}
	}
	return ids;
}


/**
 * 获取复选框父节点Id(角色到动作点)
 */
function getParentNodeIdOne(id,type){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	
	var prefix_ids = prefix_id.split("/");
	for(var ao =0;ao<prefix_ids.length-1;ao++){
		var parentId = prefix_ids[ao]+"-"+operationId;
		ids.push(parentId);
	}
	
	
//	//循环所有多选框
//	var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
//	var authorizationCheck_obj_like = $("input[type=checkbox][name=authorizationCheck_1][value*="+operationId+"]");
////	$("input[type=checkbox][name=authorizationCheck_1][value*="+operationId+"]").attr("checked",true);
//	console.log(authorizationCheck_obj_like.length);
//	for(var k =0;k<authorizationCheck_obj_like.length;k++){
//		var checkauthids = authorizationCheck_obj_like[k].value.split("#");
//		//判断是一列
//		if(checkauthids[1] == operationId){
//			//匹配到上级
//			if(prefix_id.indexOf(checkauthids[0]) >= 0){
//				/*
//				//取直属上级
//				var moreLength = prefix_id.split("/").length - checkauthids[0].split("/").length;
//				if(moreLength == 1){
//					console.log(authorizationCheck_obj[k].id);
//					ids.push(authorizationCheck_obj[k].id);
//				}*/
//				//取所有上级，不包括自己
//				if(prefix_id != checkauthids[0]){
////					console.log(authorizationCheck_obj[k].id);
//					ids.push(authorizationCheck_obj_like[k].id);
//				}
//			}
//		}
//	}
	return ids;
}
/**
 * 获取复选框子节点Id(角色到动作点)
 */
function getChildIdsOne(id){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	//循环所有多选框
//	var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
	var authorizationCheck_obj_like = $("input[type=checkbox][name=authorizationCheck_1][value*="+operationId+"]");
	for(var k =0;k<authorizationCheck_obj_like.length;k++){
		var checkauthids = authorizationCheck_obj_like[k].value.split("#");
		//判断是一列
		if(checkauthids[1] == operationId){
			//匹配到下级
			if(checkauthids[0].indexOf(prefix_id) >= 0){
				/*
				var moreLength = checkauthids[0].split("/").length - prefix_id.split("/").length;
				//取直属下级
				if(moreLength == 1){
					console.log(authorizationCheck_obj[k].id);
					ids.push(authorizationCheck_obj[k].id);
				}*/
				//取所有下级，不包括自己
				if(prefix_id != checkauthids[0]){
//					console.log(authorizationCheck_obj[k].id);
					ids.push(authorizationCheck_obj_like[k].id);
				}
			}
		}
	}
	return ids;
}

/**
 * 获取全选复选框同级节点（包括自己）(角色到动作点)
 */
function getSameIdsOne(id){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	//循环所有多选框
//	var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
	
	var prefix_ids = prefix_id.split("/");
	var aroId = prefix_ids[prefix_ids.length-1];
	var authorizationCheck_obj_like = $("input[type=checkbox][name=authorizationCheck_1][id^="+aroId+"]");
	for(var k =0;k<authorizationCheck_obj_like.length;k++){
		var checkauthids = authorizationCheck_obj_like[k].value.split("#");
		if(prefix_id == checkauthids[0]){
//			console.log(authorizationCheck_obj[k].id);
			ids.push(authorizationCheck_obj_like[k].id);
		}
	}
	return ids;
}


/**
 * 获取全选复选框父节点Id(角色到动作点)
 */
function getAllParentNodeIdOne(id,type){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	
	var prefix_ids = prefix_id.split("/");
	for(var ao =0;ao<prefix_ids.length-1;ao++){
		var authorizationCheck_obj_like = $("input[type=checkbox][name=authorizationCheck_1][id^="+prefix_ids[ao]+"]");
		for(var k =0;k<authorizationCheck_obj_like.length;k++){
			ids.push(authorizationCheck_obj_like[k].id);
		}
	}
//	var authorizationCheck_obj_like = $("input[type=checkbox][name=authorizationCheck_1][id^="+aroId+"]");
//	
//	//循环所有多选框
//	var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
//	for(var k =0;k<authorizationCheck_obj.length;k++){
//		var checkauthids = authorizationCheck_obj[k].value.split("#");
//		//匹配到上级
//		if(prefix_id.indexOf(checkauthids[0]) >= 0){
//			/*
//			//取直属上级
//			var moreLength = prefix_id.split("/").length - checkauthids[0].split("/").length;
//			if(moreLength == 1){
//				console.log(authorizationCheck_obj[k].id);
//				ids.push(authorizationCheck_obj[k].id);
//			}*/
//			//取所有上级，不包括自己
//			if(prefix_id != checkauthids[0]){
////				console.log(authorizationCheck_obj[k].id);
//				ids.push(authorizationCheck_obj[k].id);
//			}
//		}
//	}
	return ids;
}
/**
 * 获取全选复选框子节点Id(角色到动作点)
 */
function getAllChildIdsOne(id){	
	//获取当前ID的所有值
	var authids = $("#"+id)[0].value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var ids=[];
	
	var prefix_ids = prefix_id.split("/");
	var aroId = prefix_ids[prefix_ids.length-1];
	var authorizationCheck_obj_like = $("input[type=checkbox][name=authorizationCheck_1][value*="+aroId+"]");
	
//	//循环所有多选框
//	var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
	for(var k =0;k<authorizationCheck_obj_like.length;k++){
		var checkauthids = authorizationCheck_obj_like[k].value.split("#");
			//匹配到下级
		if(checkauthids[0].indexOf(prefix_id) >= 0){
			/*
			var moreLength = checkauthids[0].split("/").length - prefix_id.split("/").length;
			//取直属下级
			if(moreLength == 1){
				console.log(authorizationCheck_obj[k].id);
				ids.push(authorizationCheck_obj[k].id);
			}*/
			//取所有下级，不包括自己
			if(prefix_id != checkauthids[0]){
//				console.log(authorizationCheck_obj[k].id);
				ids.push(authorizationCheck_obj_like[k].id);
			}
		}
	}
	return ids;
}

/**
 * 点击多选框的变化值（动作点-角色）
 * @param e
 */
function changeRoleCheck(e){
//	getChildIds(e.id);
//	getParentNodeId(e.id);
	var authids = e.value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	
	//全选的多选框
	if(operationId == "operationId"){
		if(e.checked){
			var sameIds = getSameIds(e.id);
			//设置同级节点变成选中
			for(var i=0;i<sameIds.length;i++){
				var saveId = sameIds[i];
				if(saveId != e.id){
					var splitids = $("#"+saveId)[0].value.split("#");
					if(splitids[3] == "role" || splitids[3]=="user" || splitids[3]=="post"){
						if($("#"+saveId)[0].check != e.checked){
							cacheRoleData($("#"+saveId)[0].value,"1");
						}
					}
					$("#"+saveId)[0].checked = true;
				}
			}
			var childIds = getAllChildIds(e.id);
			var parentIds = getAllParentNodeId(e.id);
			//设置所有下级变成选中
			for(var i=0;i<childIds.length;i++){
	            var cid=childIds[i];
	            var checkauthids = $("#"+cid)[0].value.split("#");
	            if(checkauthids[3] == "role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
					if(e.checked != $("#"+cid)[0].checked){
						cacheRoleData($("#"+cid)[0].value,"1");
					}
				}
	            $("#"+cid)[0].checked = true;
	        }
			//设置所有父级变成选中
			for(var i=0;i<parentIds.length;i++){
	            var pid=parentIds[i];
	            var checkauthids = $("#"+pid)[0].value.split("#");
	            if(checkauthids[3] == "role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
					if(e.checked != $("#"+pid)[0].checked){
						cacheRoleData($("#"+pid)[0].value,"1");
					}
				}
	            $("#"+pid)[0].checked = true;
	        }
		}else{
			var sameIds = getSameIds(e.id);
			for(var i=0;i<sameIds.length;i++){
				var saveId = sameIds[i];
				if(saveId != e.id){
					var splitids = $("#"+saveId)[0].value.split("#");
					if(splitids[3] == "role" || splitids[3]=="user" || splitids[3]=="post"){
						if($("#"+saveId)[0].check != e.checked){
							cacheRoleData($("#"+saveId)[0].value,"0");
						}
					}
					$("#"+saveId)[0].checked = false;
				}
			}
			var childIds = getAllChildIds(saveId);
			var parentIds = getAllParentNodeId(saveId);
			//设置所有下级变成取消
			for(var i=0;i<childIds.length;i++){
	            var cid=childIds[i];
	            var checkauthids = $("#"+cid)[0].value.split("#");
	            if(checkauthids[3] == "role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
					if(e.checked != $("#"+cid)[0].checked){
						cacheRoleData($("#"+cid)[0].value,"0");
					}
				}
	            $("#"+cid)[0].checked = false;
	        }
			//设置父级变成取消状态（如果父级有其他选中的，则不被取消）
			for(var i=parentIds.length-1;i>=0;i--){
	            var pid=parentIds[i];
	            var cIds = getChildIds(pid);
	            var haveCheck=0;
	            for(var j=0;j<cIds.length;j++){
	                var sid=cIds[j];
	                if($("#"+sid)[0].checked){
	                	haveCheck++;
	                }
	            }
	            if(haveCheck==0){
	            	 var checkauthids = $("#"+pid)[0].value.split("#");
	 	            if(checkauthids[3] == "role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
	 					if(e.checked != $("#"+pid)[0].checked){
	 						cacheData($("#"+pid)[0].value,"0");
	 					}
	 				}
	            	$("#"+pid)[0].checked = false;
	            }
	        }
		}
	}else{
		//单列的
		//获取当前是选中还是取消
//		console.log(e.checked);
		//选中多选框
		if(e.checked){
			//把自己添加到缓存数据中
			if(type=="role"  || type=="user" || type=="post"){
				cacheRoleData(e.value,"1");
			}
			var childIds = getChildIds(e.id);
			var parentIds = getParentNodeId(e.id);
			//设置所有下级变成选中
			for(var i=0;i<childIds.length;i++){
	            var cid=childIds[i];
	            var checkauthids = $("#"+cid)[0].value.split("#");
	            if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
					if(e.checked != $("#"+cid)[0].checked){
						cacheRoleData($("#"+cid)[0].value,"1");
					}
				}
	            $("#"+cid)[0].checked = true;
	        }
			//设置所有父级变成选中
			for(var i=0;i<parentIds.length;i++){
	            var pid=parentIds[i];
	            var checkauthids = $("#"+pid)[0].value.split("#");
	            if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
					if(e.checked != $("#"+pid)[0].checked){
						cacheRoleData($("#"+pid)[0].value,"1");
					}
				}
	            $("#"+pid)[0].checked = true;
	        }
		}else{
			var childIds = getChildIds(e.id);
			var parentIds = getParentNodeId(e.id);
			//把自己添加到缓存数据中
			if(type=="role"  || type=="user" || type=="post"){
				cacheRoleData(e.value,"0");
			}
			//设置所有下级变成取消
			for(var i=0;i<childIds.length;i++){
	            var cid=childIds[i];
	            var checkauthids = $("#"+cid)[0].value.split("#");
	            if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
					if(e.checked != $("#"+cid)[0].checked){
						cacheRoleData($("#"+cid)[0].value,"0");
					}
				}
	            $("#"+cid)[0].checked = false;
	        }
			//设置父级变成取消状态（如果父级有其他选中的，则不被取消）
			for(var i=parentIds.length-1;i>=0;i--){
	            var pid=parentIds[i];
	            var cIds = getChildIds(pid);
	            var haveCheck=0;
	            for(var j=0;j<cIds.length;j++){
	                var sid=cIds[j];
	                if($("#"+sid)[0].checked){
	                	haveCheck++;
	                }
	            }
	            if(haveCheck==0){
	            	 var checkauthids = $("#"+pid)[0].value.split("#");
	 	            if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
	 					if(e.checked != $("#"+pid)[0].checked){
	 						cacheRoleData($("#"+pid)[0].value,"0");
	 					}
	 				}
	            	$("#"+pid)[0].checked = false;
	            }
	        }
		}
	}
	/*
	var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
//	for(k in authorizationCheck_obj){
	for(var k =0;k<authorizationCheck_obj.length;k++){
		var checkauthids = authorizationCheck_obj[k].value.split("#");
		//判断是否等于自己，如果是把自己放到或者删除在缓存中
		if(authorizationCheck_obj[k].value == e.value){
			if(type=="role"  || type=="user" || type=="post"){
				if(e.checked){
					cacheRoleData(e.value,"1");
				}else{
					cacheRoleData(e.value,"0");
				}
			}
		}else{
			if(operationId == "operationId"){
				//横向改变复选框
				if(prefix_id == checkauthids[0]){
					if(e.checked){
						if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"1");
							}
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"0");
							}
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
				//竖向改变复选框
				if(prefix_id.indexOf(checkauthids[0]) >= 0 || checkauthids[0].indexOf(prefix_id) >= 0){
					if(e.checked){
						if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"1");
							}
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"0");
							}
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
			}else{
				//竖向改变复选框
				if(checkauthids[1] == operationId && checkauthids[0] != prefix_id && (prefix_id.indexOf(checkauthids[0]) >=0 || checkauthids[0].indexOf(prefix_id) >= 0)){
					if(e.checked){
						if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"1");
							}
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(checkauthids[3]=="role"  || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"0");
							}
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
			}
		}
	}*/
}


/**
 * 显示授权列表
 */

function showAuthorizationData(){
	authData = {};
	colNames=[];
	colNames.push("功能动作点");
	colNames.push("全选");
	colModeldata=[];
	colModeldata.push({name : 'name',width : 370,align : "left"});
	colModeldata.push({name : 'roleId',width : 60,align : "center"});
	var role_obj = document.getElementsByName("roleCheck");
	var role_check_val = "";
	var colNum=0;
	//获取选中的个数
	for(var k =0;k<role_obj.length;k++){
		if(role_obj[k].checked){
			colNum++;
		}
	}
	if(colNum == 0){
		pop_tip_open("red","请选择对象");
		return false;
	}
	colNumG = colNum;
	var colWidth = 100;
	//如果个数小于9，计算一下每个的宽度，如果大于9，固定每个宽度为100
//	if(colNum < 9){
//		colWidth = ($('.listAuthTable').width()-370-60-15)/colNum;	
//	}
	colWidth = ($('.listAuthTable').width()-370-60-15)/colNum;	
//	for(k in role_obj){
	for(var k =0;k<role_obj.length;k++){
		if(role_obj[k].checked){
			var idandname = role_obj[k].value.split("#");
			role_check_val += idandname[0] + ",";
			colNames.push(idandname[1]);
			colModeldata.push({name : idandname[0],label : idandname[1],width : colWidth,align : "center"});
		}
	}
	
	var app_obj = document.getElementsByName("appCheck");
	var app_check_val = "";
//	for(k in app_obj){
	for(var k =0;k<app_obj.length;k++){
		if(app_obj[k].checked){
			var idandname = app_obj[k].value.split("#");
			app_check_val += idandname[0] + ",";
//        	app_check_val += app_obj[k].value + ",";
		}
	}
	if (role_check_val.length > 0 ) role_check_val = role_check_val.substring(0, role_check_val.length-1);
	if (app_check_val.length > 0 ) app_check_val = app_check_val.substring(0, app_check_val.length-1);
	getAuthorizationDataXjTreegrid(app_check_val,role_check_val);
}


/**
 * 打开引入其他对象页面
 */
function openAuthfunImport(){
	var role_obj = document.getElementsByName("roleCheck");
	var role_check_val = "";
	for(var k =0;k<role_obj.length;k++){
		if(role_obj[k].checked){
			var idandname = role_obj[k].value.split("#");
			role_check_val += idandname[0] + ",";
		}
	}
	
	var app_obj = document.getElementsByName("appCheck");
	var app_check_val = "";
	for(var k =0;k<app_obj.length;k++){
		if(app_obj[k].checked){
			var idandname = app_obj[k].value.split("#");
			app_check_val += idandname[0] + ",";
		}
	}
	if (role_check_val.length > 0 ) {
		role_check_val = role_check_val.substring(0, role_check_val.length-1);
	}else{
		pop_tip_open("red","请选择对象");
		return false;
	}
	if (app_check_val.length > 0 ) app_check_val = app_check_val.substring(0, app_check_val.length-1);
	importObjectId = role_check_val;
	importAppId = app_check_val;
	window.open("authFun_import.html");
}


/**
 * 数据多选框格式化
 */
function formattercheck (cellvalue, options, rowObject) {
	return "<input type='checkbox' id='"+rowObject.id+"-"+options.colModel.roleId+"'  data-authids='"+rowObject.prefix_id+"#"+options.colModel.roleId+"#"+rowObject.prefix_sort+"#"+rowObject.type+"#"+rowObject.app_id+"#"+rowObject.reousce_id+"' onchange='changeCheck(this)' name='authorizationCheck_1' value='"+rowObject.prefix_id+"#"+options.colModel.roleId+"#"+rowObject.prefix_sort+"#"+rowObject.type+"#"+rowObject.app_id+"#"+rowObject.reousce_id+"'>";
}

/**
 * 数据多选框格式化(动作点-角色)
 */
function formatterRolecheck (cellvalue, options, rowObject) {
	return "<input type='checkbox' id='"+rowObject.id+"-"+options.colModel.operationId+"'  data-authids='"+rowObject.prefix_id+"#"+options.colModel.operationId+"#"+rowObject.prefix_sort+"#"+rowObject.type+"#"+options.colModel.appId+"#"+options.colModel.resourceId+"' onchange='changeRoleCheck(this)' name='authorizationRoleCheck' value='"+rowObject.prefix_id+"#"+options.colModel.operationId+"#"+rowObject.prefix_sort+"#"+rowObject.type+"#"+options.colModel.appId+"#"+options.colModel.resourceId+"'>";
}

/**
 * 展开数据树(角色到动作点)
 */
function expandData(level){
	$funXjJqgrid.options.ExpandLevel = level;
	$(".xjtreegrid-body .xjtreegrid-row").each(function(i,n){
		if(parseInt($(n).attr("level"))>parseInt(level)){
			$(n).removeClass("xjtreegrid-show");
			$(n).addClass("xjtreegrid-hide");
		}else{
			$(n).removeClass("xjtreegrid-hide");
			$(n).addClass("xjtreegrid-show");
		}
	});
	//$funXjJqgrid.loadJsonData(loadJsonData);
	$(".xjtreegrid-body").height($(".xj-main-grid").height()-30);
	$.xljUtils.addGridScroll("xjtreegrid-body");
	$.xljUtils.treeResizeFn("xjtreegrid-body");
	for(k in loadJsonDataAuth){
		var newauthids = loadJsonDataAuth[k].prefix_id+"#"+loadJsonDataAuth[k].role_id+"#"+loadJsonDataAuth[k].prefix_sort+"#OPERATION";
//			var appids = loadJsonDataAuth[k].prefix_id.split("/");
		var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
		for(var ao =0;ao<authorizationCheck_obj.length;ao++){
			var checkauthids = authorizationCheck_obj[ao].value;
			var checkappIds = checkauthids.split("#");
			if(checkappIds[1] == loadJsonDataAuth[k].role_id){
				if(loadJsonDataAuth[k].prefix_id.indexOf(checkappIds[0]) >=0 ){
					authorizationCheck_obj[ao].checked = true;
				}
			}
//				if(newauthids == checkauthids){
//					authorizationCheck_obj[ao].checked = true;
//				}
		}
	}
}

/**
 * 展开数据树（动作点到角色）
 */
function expandRoleData(level){
	var arrdata=jQuery("#listRoleAuth").jqGrid('getRowData');
	for(var o in arrdata){
		$("#"+arrdata[o].id).show();
		if(arrdata[o].level > level){
			arrdata[o].expanded = false;
			$("#"+arrdata[o].id).hide();
		}else if(arrdata[o].level == level){
			var div=$("#"+arrdata[o].id).find('div.ui-icon.treeclick.ui-icon-triangle-1-s.tree-minus') ;
			div.removeClass("ui-icon-triangle-1-s tree-minus").addClass("ui-icon-triangle-1-e tree-plus");
		}else{
			var div=$("#"+arrdata[o].id).find('div.ui-icon.treeclick.ui-icon-triangle-1-e.tree-plus') ;
			div.removeClass("ui-icon-triangle-1-e tree-plus").addClass("ui-icon-triangle-1-s tree-minus");
		}
	}
	$.xljUtils.gridResizeFn();
}

/**
 * 绑定下拉框(角色到动作点和查看角色页面)
 */
function binSelEvent(){
	$('#objectType').on("change",function(e){
		var objType = $('#objectType').val();
		getRoleTree(objType);
	});
	
	$('#objectTypeShow').on("change",function(e){
		var objTypeShow = $('#objectTypeShow').val();
		getRoleTreeShow(objTypeShow);
	});
}

$(function() {

	//样式初始化
	initStyle();
	//绑定下拉框
	binSelEvent();
	//初始化角色树
	getRoleTree();
	//初始化系统
	getAppData();
	//tab切换功能
	switchPage();
	//udpate dgh  on 2017/05/15 start
	var urlParam = $.xljUtils.getUrlParams();
	if(urlParam&&urlParam.menuId){
		$('.xj-form-header').show();
		$('.bigBtn').removeClass('active');
		$($('.bigBtn')[1]).addClass('active');
		$($('.bigBtn')[1]).click();
		$('.tabItem').hide();
		$($('.tabItem')[1]).show();
		var w_h = $(window).height();
		var header = $('.xj-form-header').
		$('.xj-main-grid').height(w_h - 276);
		$('.listRoleGrid').height(w_h - 120);
		//$('.tab-content').css('height',w_h - 145);
		$(".ztree-box").height((w_h-170)+"px");
		//动态计算各grid的宽高
		$('#listAuth').jqGrid().setGridWidth($('.xj-main-grid').width()-2, true);
		$('#listRoleAuth').jqGrid().setGridWidth($('.listRoleGrid').width()-2, true);
		$('#listAuth').jqGrid().setGridHeight(w_h - 276 - 42);
		$('#listRoleAuth').jqGrid().setGridHeight(w_h - 120 - 42);
		//动态计算tab-content的高度
		$('.tab-content').height(w_h-$('#powerApp').height() - 77);

	}
	//udpate dgh  on 2017/05/15 end
	//$.xljUtils.resizeNestedGrid();
	//选中或取消权限
	checkPower();


	//判断是否是跳转过来的页面
	istiaozhuan();
	
});
/**
 * 样式初始化
 */
function initStyle(){
	resizeHeight();
	$('#lCheckAll').change(function() {
		var flag = $(this)[0].checked;
		$('#checkL > ul > li > input').each(function(i,ele){
			ele.checked = flag;
		});
	});
	$('#rCheckAll').change(function() {
		var flag = $(this)[0].checked;
		$('#checkR > ul > li > input').each(function(i,ele){
			ele.checked = flag;
		});
	});

	$('.slide').click(function() {
		var checks = $('.check_group');
		checks.fadeToggle('fast');
		setTimeout(function() {
			if(checks.css('display') == 'block') {
				$('.slidespan').text('收起');
				$('.slide').children('.fa').addClass('fa-chevron-up');
				$('.slide').children('.fa').removeClass('fa-chevron-down');
				$('.xj-main-grid').height($(window).height() - 276);
				$(".xjtreegrid-body").height($(".xj-main-grid").height()-30);
				if($('#listAuth').parents(".ui-jqgrid-bdiv").length>0){
					var gridHeadrHeight = $('#listAuth').parents(".ui-jqgrid-bdiv").siblings('.ui-jqgrid-hdiv').outerHeight();
					var gridFooterHeight = $('#listAuth').parents(".ui-jqgrid-view").siblings(".ui-jqgrid-pager").outerHeight();
					$('#listAuth').jqGrid().setGridHeight($(window).height() - gridHeadrHeight-gridFooterHeight-280);
				}

				$(".check_scroll").getNiceScroll().show();
			}else{
				$('.slidespan').text('展开');
				$('.slide').children('.fa').addClass('fa-chevron-down');
				$('.slide').children('.fa').removeClass('fa-chevron-up');
				$('.xj-main-grid').height($(window).height() - 178);
				$(".xjtreegrid-body").height($(".xj-main-grid").height()-30);
				if($('#listAuth').parents(".ui-jqgrid-bdiv").length>0) {
					var gridHeadrHeight = $('#listAuth').parents(".ui-jqgrid-bdiv").siblings('.ui-jqgrid-hdiv').outerHeight();
					var gridFooterHeight = $('#listAuth').parents(".ui-jqgrid-view").siblings(".ui-jqgrid-pager").outerHeight();
					$('#listAuth').jqGrid().setGridHeight($(window).height() - gridHeadrHeight - gridFooterHeight - 180);
				}
				$(".check_scroll").getNiceScroll().hide();
			}
			$.xljUtils.gridResizeFn();
			$.xljUtils.treeResizeFn("xjtreegrid-body");
		},400)
	});
}

/**
 * 切换系统下拉框（动作点到角色）
 * @param ele
 */
function selectAppFormTwo(ele){
	getButtonTree(ele.value);
}
/**
 * tab页切换
 */
function switchPage() {
	$('.bigBtn').click(function() {
		$('.tabItem').css('display','none');
		var index = $(this).index();
		if(index == 1){
			getAppDataTwo();
		}else if(index == 2){
			$("#objectTypeShow").val("standardPost");
			//初始化显示角色树
			getRoleTreeShow();
		}
		$('.bigBtn').removeClass('active');
		$(this).addClass('active');
		var tabitem = $('.tabItem')[index];
		$(tabitem).css('display','block');
		$.xljUtils.treeResizeFn();
		$.xljUtils.gridResizeFn();
		$(".check_scroll").getNiceScroll().show().resize();
		$(".tab-content").getNiceScroll().show().resize();
		$.xljUtils.treeResizeFn("xjtreegrid-body");
	})
}
/**
 * 是否跳转过来的
 */
function istiaozhuan() {
//	var authFunStandardPostId = window.opener.authFunStandardPostId;
//	var authFunUserId = window.opener.authFunUserId;
	var dataParam = window.parent.childParamCache();
	if(dataParam.authFunStandardPostId){
		$('.tabItem').css('display','none');
		$("#objectTypeShow").val("standardPost");
		//初始化显示角色树
		getRoleTreeShow("standardPost",dataParam.authFunStandardPostId);
		$('.bigBtn').removeClass('active');
		var bigBtnitem = $('.bigBtn')[2];
		$(bigBtnitem).addClass('active');
		var tabitem = $('.tabItem')[2];
		$(tabitem).css('display','block');
		$.xljUtils.treeResizeFn();
		$.xljUtils.gridResizeFn();
		$(".check_scroll").getNiceScroll().show().resize();
		$(".tab-content").getNiceScroll().show().resize();
		$.xljUtils.treeResizeFn("xjtreegrid-body");
	}else if(dataParam.authFunUserId){
		$('.tabItem').css('display','none');
		$("#objectTypeShow").val("user");
		//初始化显示角色树
		getRoleTreeShow("user",dataParam.authFunUserId);
		$('.bigBtn').removeClass('active');
		var bigBtnitem = $('.bigBtn')[2];
		$(bigBtnitem).addClass('active');
		var tabitem = $('.tabItem')[2];
		$(tabitem).css('display','block');
		$.xljUtils.treeResizeFn();
		$.xljUtils.gridResizeFn();
		$(".check_scroll").getNiceScroll().show().resize();
		$(".tab-content").getNiceScroll().show().resize();
		$.xljUtils.treeResizeFn("xjtreegrid-body");
	}
	
}




/**
 * 选中或取消权限
 */
function checkPower() {
	$('.checkList li').click(function() {
		if($(this).attr('class') == 'checked') {
			$(this).removeClass('checked').addClass('uncheck');
		}else{
			$(this).removeClass('uncheck').addClass('checked');
		}
	})
}
/**
 * 展开及收缩权限--角色
 * @param self
 * @param ele
 */
function flexPowerRole(self,ele,roleId,appId) {
	ele.fadeToggle('fast');
	setTimeout(function() {
		if(ele.css('display') == 'none') {
			self.addClass('open');
		}else{
			if(ele.children().length==0){
				selAuthByRoleAndAppId(roleId,appId);
			};
			self.removeClass('open');
		}
		$(".tab-content").getNiceScroll().show().resize();
	},300);
}
/**
 * 展开及收缩权限--菜单及按钮
 * @param self
 * @param ele
 */
function flexPower(self, ele) {
	ele.fadeToggle('fast');
	setTimeout(function() {
		if(ele.css('display') == 'none') {
			self.addClass('open');
		}else{
			self.removeClass('open');
		}
		$(".tab-content").getNiceScroll().show().resize();
		// $.xljUtils.gridResizeFn();
	},300);
}
//右侧checkbox滚动条
function addCheckboxScroll(bd){
	if(!bd) bd = ".check_scroll";
		$(bd).niceScroll({
		autohidemode: false,
		cursorcolor: "#eee",
		cursorwidth: "6px", // 滚动条的宽度，单位：便素
		cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
		horizrailenabled: true, // nicescroll可以管理水平滚动
		background: "#fff"
	});
}