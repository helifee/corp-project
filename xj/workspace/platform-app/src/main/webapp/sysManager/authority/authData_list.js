/**
 * 数据授权
 * @author shiyong
 */
//计算高度
function resizeHeight(){
	$('.embed-responsive-4by3').css({overflow:'hidden'})
	$('.embed-responsive-4by3').height($(window).height() -$("#headerContainer").outerHeight()-$("#breadcrumbContainer").outerHeight());
}
function resizeGrid(){
	//动态计算各grid的宽高
	var w_h = $(window).height();
	$('#listAuth').jqGrid().setGridWidth($('.roleScroll').width()-10, true,true);
	$('#listDataPoint').jqGrid().setGridWidth($('.roleScroll').width()-10, true,true);
	$('#listDataRole').jqGrid().setGridWidth($('.dataScroll').width()-10, true);
}

//grid 自适应宽度
$(window).resize(function(){
	resizeHeight();
	resizeTreeHeight();
	resizeGrid();
});
//计算高度
function resizeTreeHeight(){
	//左侧  头部底部为60px  title类 为50px
	var w_h = $(window).height();
	//$('.tab-content').css('height',w_h - 145);
	$(".firstItem .ztree-box").height((w_h-171)+"px");
	$(".secondItem .ztree-box").height((w_h-180)+"px");
	$(".thirdItem .ztree-box").height((w_h-180)+"px");
	$(".roleScroll").height((w_h-320)+"px");
	$('.dataScroll').height((w_h - 128)+"px");
	$('.tab-content').height((w_h - 128)+"px");
}
//数据列的定义
var colModeldata =[];

//（角色到数据）引用控制点数据列的定义
var colImportDataPointModeldata =[];

//动作点-角色 数据列的定义
var colRoleModeldata =[];

//缓存要保存的数据（角色到数据-----指定数据）
var authData={};

//缓存要保存的数据（角色到数据-----控制点数据）
var authPointData={};

//缓存已授权的角色到控制点数据（角色到数据-----角色与控制点）
var authOldDataItem={};

//缓存要保存的数据（动作点-角色）
var authRoleData={};

//角色树
var zTreeObj;
//角色树(查看权限时)
var zTreeShowObj;
//按钮树
var zTreeObjButton;

//记录tab2保存时的类型（dataPoint控制点，其余的为指定数据）
var tab2SaveType="";
//记录tab2保存时控制点Id或者指定数据val（dataPoint控制点，其余的为指定数据）
var pointIdOrVal="";

//角色树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};

//按钮树搜索名称参数
var lastValueOp = "", nodeListOp = [];

//查看权限角色树搜索名称参数
var lastValueShow = "", nodeListShow = [];

////引用控制点下的(暂时不用全局变量)
//var dataPointUrl ="";

//角色到数据权限点第一个jqgrid
var listAuthJqgrid;

//数据到角色的jqgrid
var listDataRoleJqgrid;

//引入其他对象权限前的对象Id
var importObjectId;

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
		onClick:zTreeOnClick, //点击节点事件
		onCollapse: function(){
            $.xljUtils.treeResizeFn();
        },
        onExpand: function(){
            $.xljUtils.treeResizeFn();
        }
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
        }
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
		onClick:buttonzTreeOnClick, //点击节点事件
		onCollapse: function(){
            $.xljUtils.treeResizeFn();
        },
        onExpand: function(){
            $.xljUtils.treeResizeFn();
        }
	}
};

/**
 * 查看权限对象树点击节点事件（查看已授权数据权限数据）
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
//					var appList=data.result;
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
	
	$("#powerMenu").empty();
	var powerMenu ="";
	
	var objTypeShow = $('#appIdShow').val();
	
	for(var i in objList ){
		powerMenu += "<div role='tabpanel' class='tab-pane active' id='powerTab"+objTypeShow+"'>";
		powerMenu += "<a href='javascript:void(0)' class='tabA level0' onclick='flexPower($(this),$(this).next())'>"+objList[i]+"</a><div class='tabContent' id='powerApp"+objTypeShow+""+i+"'><ul class='checkList clearfix' id='button"+objTypeShow+""+i+"'></ul></div>";
		powerMenu += "</div>";
	}
	
	
	
	for(var o in allApp){
		/*if(o ==0 ){
			$("#powerApp").append("<li role='presentation' class='active'><a href='#powerTab"+allApp[o].id+"' aria-controls='powerTab"+allApp[o].id+"' role='tab' data-toggle='tab'>"+allApp[o].name+"</a></li>");
			powerMenu += "<div role='tabpanel' class='tab-pane active' id='powerTab"+allApp[o].id+"'>";
			for(var i in objList ){
				powerMenu += "<a href='javascript:void(0)' class='tabA level0' onclick='flexPower($(this),$(this).next())'>"+objList[i]+"</a><div class='tabContent' id='powerApp"+allApp[o].id+""+i+"'></div>";
			}
			powerMenu += "</div>";
		}else{
			$("#powerApp").append("<li role='presentation'><a href='#powerTab"+allApp[o].id+"' aria-controls='powerTab"+allApp[o].id+"' role='tab' data-toggle='tab'>"+allApp[o].name+"</a></li>");
			powerMenu += "<div role='tabpanel' class='tab-pane' id='powerTab"+allApp[o].id+"'>";
			for(var i in objList ){
				powerMenu += "<a href='javascript:void(0)' class='tabA level0' onclick='flexPower($(this),$(this).next())'>"+objList[i]+"</a><div class='tabContent' id='powerApp"+allApp[o].id+""+i+"'></div>";
			}
			powerMenu += "</div>";
		}*/
		appIds+=allApp[o].id+",";
	}
	
	$("#powerMenu").append(powerMenu);
	var dataItemId = $('#dataItemIdShow option:selected').val();
	var queryByPramPostdata ={
			delflag:false,
			itemId:dataItemId
	};	
	var dataPointUrl = "";
	
	$.ajax({
		type:'post',
		url:hostUrl+'sys/res/dataPoint/queryByPram',
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(queryByPramPostdata),
		async: false,
		success: function(data) {
			if(data.success){
				if(data.result){
					var appList=data.result;
					for(k in appList){
						if(appList[k].type == "1"){
							for(var i in objList ){
								$("#button"+objTypeShow+""+i+"").append("<li class='uncheck' id='b"+appList[k].id+""+i+"' >"+appList[k].name+"</li>");
							}
						}else{
							for(var i in objList ){
								$("#button"+objTypeShow+""+i+"").append("<li class='uncheck' id='b"+appList[k].id+""+i+"' >"+appList[k].name+"</li>");
							}
							dataPointUrl = appList[k].url;
						}
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取控制点请求失败");
		}
	});
	if(dataPointUrl == ''){
	}else{
		var uuurl ="";
		if(dataPointUrl.indexOf("http")>-1){
			uuurl = dataPointUrl;
		}else{
			uuurl = hostUrl+dataPointUrl;
		}
		$.ajax({
			type:'post',
			url:uuurl,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(queryByPramPostdata),
			async: false,
			success: function(data) {
				if(data.success){
					if(data.result){
						var appList=data.result;
						for(k in appList){
							if(appList[k].level == '1'){
								for(var i in objList ){
									$("#powerApp"+objTypeShow+""+i+"").append("<a href='javascript:void(0)' class='tabA level1 open' onclick='flexPower($(this),$(this).next())'>"+appList[k].name+"<span class='nook' id='c"+appList[k].id+""+i+"'></span></a><div style='display: none;' class='div"+appList[k].id+"' id='divtop"+appList[k].id+""+i+"'></div>");
								}
							}
							
							if(appList[k].level == '2'){
									for(var i in objList ){
										$("#divtop"+appList[k].parentId+""+i+"").append("<a href='javascript:void(0)' class='tabA level2 open' onclick='flexPower($(this),$(this).next())'>"+appList[k].name+"<span class='nook' id='c"+appList[k].id+""+i+"'></span></a><div style='display: none;' class='div"+appList[k].id+"' id='divtop"+appList[k].id+""+i+"'></div>");
									}
							}
							
							if(appList[k].level == '3'){
									for(var i in objList ){
										$("#divtop"+appList[k].parentId+""+i+"").append("<a href='javascript:void(0)' class='tabA level3 open' onclick='flexPower($(this),$(this).next())'>"+appList[k].name+"<span class='nook' id='c"+appList[k].id+""+i+"'></span></a><div style='display: none;' class='div"+appList[k].id+"' id='divtop"+appList[k].id+""+i+"'></div>");
									}
							}
							if(appList[k].level == '4'){
									for(var i in objList ){
										$("#divtop"+appList[k].parentId+""+i+"").append("<a href='javascript:void(0)' class='tabA level4 open' onclick='flexPower($(this),$(this).next())'>"+appList[k].name+"<span class='nook' id='c"+appList[k].id+""+i+"'></span></a><div style='display: none;' class='div"+appList[k].id+"' id='divtop"+appList[k].id+""+i+"'></div>");
									}
							}
							
						}
					}
				}else{
					pop_tip_open("red",data.msg);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red","获取控制点请求失败");
			}
		});
	}
	
	
	checkAuthData(dataItemId,idids,objList);
	
	// if (appIds.length > 0 ) appIds = appIds.substring(0, appIds.length-1);
	// var url = hostUrl+'sys/res/funcPermission/queryAuthorizationListByAppIds';
	// var postAllData={
	// 		appIds:appIds
	// }
	
	//加滚动条
	addCheckboxScroll(".tab-content");
	$(".tab-content").getNiceScroll().show().resize();
}

/**
 * 查看已授权，更改已授权的数据变成绿色
 */

function checkAuthData(dataItemId,idids,objList){
	
	var ubody = "sys/res/dataPermission/queryAuthDataByitemIdAndroleIds";
	var uall = hostUrl+ubody;
	var postdata ={
			itemId:dataItemId,
			roleIds:idids
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
					var resultMap=data.result;
					console.log(resultMap);
					var listDataPermission = resultMap.listDataPermission;
					var listDataPointPermission = resultMap.listDataPointPermission;
					
					//已授权的控制点数据
					for(k in listDataPermission){
						var roleId = listDataPermission[k].role_id;
						var dataPointId = listDataPermission[k].data_point_id;
						
						for(var i in objList ){
						   if(roleId == i){
							   $("#b"+dataPointId+""+i+"").attr('class','checked');
						   }
						}
					}
					
					//已授权的指定数据
					for(k in listDataPointPermission){
						var roleId = listDataPointPermission[k].role_id;
						var val = listDataPointPermission[k].val;
						
						for(var i in objList ){
						   if(roleId == i){
							   $("#c"+val+""+i+"").attr('class','ok');
						   }
						}
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化已选中授权数据请求失败");
		}
	});
	$("#powerMenu").find("li").each(function(){
		var el = $(this),
			data_val = el.attr("class");

		if(data_val === "uncheck"){
			el.remove();
		}
	});
	$("#powerMenu").find("span").each(function(){
		var el = $(this),
			data_val = el.attr("class");

		if(data_val === "nook"){
			el.parent('a:first').remove();
		}
	});
}

/**
 * 控制点树点击节点事件（动作点-角色）
 */

function buttonzTreeOnClick(event, treeId, treeNode) {
	authRoleData = {};
	colRoleModeldata=[];
	colRoleModeldata.push({name : 'id',label : 'id',hidden:true,align : "center"});
	colRoleModeldata.push({name : 'name',label : '角色',align : "center"});
	colRoleModeldata.push({name : 'operationname',operationId:'operationId',label : ' ',align : "center",formatter: formatterRolecheck});
	var operationIds = treeNode.id;
	colRoleModeldata.push({name : 'operationname',operationId:treeNode.id,label : treeNode.name,align : "center",formatter: formatterRolecheck});
	tab2SaveType = treeNode.type;
	pointIdOrVal = treeNode.id;
	getRoleAuthorizationData(operationIds,treeNode.type);
	//重新算一下动作点-角色里面的grid的高
	$('#listDataRole').jqGrid().setGridHeight($(window).height() - 120 - 42);
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
	$.xljUtils._searchTreeBtnEvent(key,zTreeObj, searchKeys);
//	$.xljUtils._searchTreeBtnEvent(key,zTreeObj);
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
	{'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
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

/**
 * 递归设置树的图片样式
 */
function recursionArrayTwo(arr) {
	//所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
    for(var i in arr) {
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
        } 
    }
};




/**
 * 获取指定数据树（数据到角色）
 */
function getButtonTree() {
	var dataItemId = $('#dataItemIdTwo option:selected').val();
	if(!dataItemId){
		var zNodes =[];
		zTreeObjButton = $.fn.zTree.init($("#treeButton"), settingButton, zNodes);
		pop_tip_open("red","授权项为空");
		return false;
	}
	var queryByPramPostdata ={
			delflag:false,
			itemId:dataItemId
	};	
	var dataPointUrl = "";
	var dataPointNodes;
	$.ajax({
		type:'post',
		url:hostUrl+'sys/res/dataPoint/queryByPram',
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(queryByPramPostdata),
		async: false,
		success: function(data) {
			if(data.success){
				if(data.result){
					var appList=data.result;
					var zNodes = data.result;
					dataPointNodes = data.result;
//			          recursionArrayButton(zNodes);
					recursionArrayTwo(zNodes);
					for(k in zNodes){
						zNodes[k].type = "dataPoint";
					}
			          zTreeObjButton = $.fn.zTree.init($("#treeButton"), settingButton, zNodes);
			          zTreeObjButton.expandAll(true); 
					for(k in appList){
						if(appList[k].type == "1"){
							
						}else{
							dataPointUrl = appList[k].url;
						}
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取控制点请求失败");
		}
	});
	if(null == dataPointUrl || dataPointUrl == ""){
	}else{
		var uuurl ="";
		if(dataPointUrl.indexOf("http")>-1){
			uuurl = dataPointUrl;
		}else{
			uuurl = hostUrl+dataPointUrl;
		}
		$.ajax({
			type:'post',
			url:uuurl,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(queryByPramPostdata),
			async: false,
			success: function(data) {
				if(data.success || data.isSuccess){
					if(data.result){
						var appList=data.result;
						var newNodes = new Array();
						
						var zNodes = data.result;
						
						for(var k =0;k<dataPointNodes.length;k++){
							var innerNodes = {};
							innerNodes.id = dataPointNodes[k].id;
							innerNodes.pId = "";
							innerNodes.type = "dataPoint";
							innerNodes.name = dataPointNodes[k].name;
							newNodes[k] = innerNodes;
						}
						
						for(var kk = 0;kk<appList.length;kk++){
							var innerNodes = {};
							innerNodes.id = appList[kk].id;
							innerNodes.pId = appList[kk].parentId;
							innerNodes.name = appList[kk].name;
							innerNodes.type = appList[kk].type;
							var num = kk+dataPointNodes.length;
							newNodes[num] = innerNodes;
						}
						recursionArrayTwo(newNodes);
						
						zTreeObjButton = $.fn.zTree.init($("#treeButton"), settingButton, newNodes);
				          zTreeObjButton.expandAll(true); 
				          setTimeout(function(){
								$.xljUtils.addTreeScroll('ztree-box');
								$.xljUtils.treeResizeFn();
							},300);
					}
				}else{
					pop_tip_open("red",data.msg);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red","获取控制点请求失败");
			}
		});
	}	
	
}

/**
 * 功能按钮数据(数据-角色)
 */
function getRoleAuthorizationData(operationIds,type){
	$.xljUtils.removeGridScroll();
	var dataItemId = $('#dataItemIdTwo option:selected').val();
	var objType = $('#objectTypeTab2').val();
	var queryAuthorizationListUrl = "";
	if("standardPost"==objType){//标准岗位
		queryAuthorizationListUrl = hostUrl+'sys/res/funcPermission/queryAuthorizationListAllRoles';
	}else if("role"==objType){//角色
		queryAuthorizationListUrl = hostUrl+'sys/res/funcPermission/queryAuthorizationListAllCurrencyRoles';
	}else if("post"==objType){//岗位
		queryAuthorizationListUrl = hostUrl+'sys/res/funcPermission/queryAuthorizationListAllPost';
	}else if("user"==objType){//用户
		queryAuthorizationListUrl = hostUrl+'sys/res/funcPermission/queryAuthorizationListAllUser';
	}
	if(false){
		listDataRoleJqgrid.jqGrid("setGridParam", { url: queryAuthorizationListUrl}).trigger("reloadGrid");
	}else{
		jQuery("#listDataRole").GridUnload();
		listDataRoleJqgrid = jQuery("#listDataRole").jqGrid({
			url: queryAuthorizationListUrl,
			ajaxGridOptions: { contentType: 'application/json' },
			mtype : "POST",
			postData:{},
			treeGrid: true,
			treeGridModel: "adjacency",
			ExpandColumn:"name",
			datatype : "json",
			subGrid:true,
			autowidth:true,
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
//				var time3=new Date().getTime();
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
//				var time4=new Date().getTime();
//				console.log("处理滚动条时间："+(time4-time3));
				var ubody = "sys/res/dataPermission/queryAuthDataByitemIdAndPointId";
				var uall = hostUrl+ubody;
				var dataItemIdNew = $('#dataItemIdTwo option:selected').val();
				var postdata ={
						itemId:dataItemIdNew,
						ids:operationIds,
						type:type
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
//								var time5=new Date().getTime();
//								console.log("查询已授权数据时间："+(time5-time4));
								var resultMap=data.result;
								var listDataPermission = resultMap.listDataPermission;
								var listDataPointPermission = resultMap.listDataPointPermission;
								//获取所有控制点单选按钮
								
								//已授权的控制点数据
								for(k in listDataPermission){
									var roleId = listDataPermission[k].role_id;
									var dataPointId = listDataPermission[k].data_point_id;
									
									var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
									for(var ao =0;ao<authorizationCheck_obj.length;ao++){
										var checkauthids = authorizationCheck_obj[ao].value;
										var checkappIds = checkauthids.split("#");
										if(checkappIds[1] == listDataPermission[k].data_point_id){
											if(checkappIds[0].indexOf(listDataPermission[k].role_id) >=0 ){
												authorizationCheck_obj[ao].checked = true;
											}
										}
									}
								}
								
								//已授权的指定数据
								for(k in listDataPointPermission){
									var roleId = listDataPointPermission[k].role_id;
									var val = listDataPointPermission[k].val;
									
									var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
									for(var ao =0;ao<authorizationCheck_obj.length;ao++){
										var checkauthids = authorizationCheck_obj[ao].value;
										var checkappIds = checkauthids.split("#");
										if(checkappIds[1] == listDataPointPermission[k].val){
											if(checkappIds[0].indexOf(listDataPointPermission[k].role_id) >=0 ){
												authorizationCheck_obj[ao].checked = true;
											}
										}
									}
								}
//								var time6=new Date().getTime();
//								console.log("处理已授权数据时间："+(time6-time5));
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
 * 功能按钮数据(角色-数据)
 */
function getAuthorizationData(dataItemId,roleIds){
	var postdata ={
			delflag:false,
			itemId:dataItemId
	};
	if(false){
		listAuthJqgrid.jqGrid("setGridParam", { postData: postdata,colModel:colModeldata }).trigger("reloadGrid");
	}else{
		jQuery("#listAuth").GridUnload();
		listAuthJqgrid = jQuery("#listAuth").jqGrid({
			url: hostUrl+'sys/res/dataPoint/queryByPram',
			ajaxGridOptions: { contentType: 'application/json' },
			mtype : "POST",
			postData:postdata,
			datatype : "json",
			// width:$(".roleScroll").width()-10,
			autowidth: true,
			jsonReader : {
				root:"result"
			},
			colModel:colModeldata,
			rowNum:-1,
			ondblClickRow:function(id,iRow,iCol,e){

			},

			onCellSelect:function(){
			},
			loadError:function(jqXHR, textStatus, errorThrown){
				$.xljUtils.getError(jqXHR.status);
			},
			gridComplete:function(){
				
				var role_obj = document.getElementsByName("roleCheck");
				var role_check_val = "";
				for(var k =0;k<role_obj.length;k++){
					if(role_obj[k].checked){
						var idandname = role_obj[k].value.split("#");
						role_check_val += idandname[0] + ",";
					}
				}
				if (role_check_val.length > 0 ) role_check_val = role_check_val.substring(0, role_check_val.length-1);
				var dataItemIdNew = $('#dataItemId option:selected').val();
				
				var obj=jQuery("#listAuth").jqGrid("getRowData");
				var dataPointUrl ="";
				if(obj==null ||obj.length==0){
					pop_tip_open("blue","当前无权限点");
					return false;
				}else{
					jQuery(obj).each(function(){
						if(this.type == '2'){
							dataPointUrl = this.url;
						}
					});
				}
				$("#listAuth").closest(".ui-jqgrid-bdiv").css({ 'height' : 'auto' });
				addCheckboxScroll(".roleScroll");
				resizeScroll(".roleScroll");
				getDataPoint(dataPointUrl,dataItemIdNew,role_check_val);
			}
		});
	}
}

/**
 * 获取引用控制点，指定的数据
 */
function  getDataPoint(dataPointUrl,dataItemId,roleIds){
	jQuery("#listDataPoint").GridUnload();
	
	if(!dataPointUrl){
//		dataPointUrl = "sys/res/funcPermission/queryAuthorizationListByAppIds";
		//获取已授权的数据（包括控制点和指定数据）
		queryAuthDataByitemIdAndroleIds(dataItemId,roleIds);
	}else{
		var url = "";
		if(dataPointUrl.indexOf("http")>-1){
			url = dataPointUrl;
		}else{
			url = hostUrl+dataPointUrl;
		}
		var appIds = $('#appId option:selected').val();
		jQuery("#listDataPoint").jqGrid({
			url: url,
			ajaxGridOptions: { contentType: 'application/json' },
			mtype : "POST",
			postData:{"appIds":appIds},
			treeGrid: true,
			treeGridModel: "adjacency",
			ExpandColumn:"name",
			datatype : "json",
			subGrid:true,
			// width:$(".roleScroll").width()-10,
			autowidth: true,
			jsonReader : {
				root:function(data){
					return data.result;
				},
				repeatitems : false
			},
			colModel:colImportDataPointModeldata,
			rowNum:-1,
			treeReader:{
				level_field: "level",
				parent_id_field: "parentId",
				leaf_field: "isLeaf",
				expanded_field: "expanded"
			},
			ondblClickRow:function(id,iRow,iCol,e){},
			onCellSelect:function(){},
			loadError:function(jqXHR, textStatus, errorThrown){
				$.xljUtils.getError(jqXHR.status);
				//获取已授权的数据（包括控制点和指定数据）
				queryAuthDataByitemIdAndroleIds(dataItemId,roleIds);
			},
			gridComplete:function(){
				$("#listDataPoint").closest(".ui-jqgrid-bdiv").css({ 'height' : 'auto' });
				addCheckboxScroll(".roleScroll");
				resizeScroll(".roleScroll");
				//获取已授权的数据（包括控制点和指定数据）
				queryAuthDataByitemIdAndroleIds(dataItemId,roleIds);
				// expandData(1);
			}
		});
	}
}


/**
 * 获取已授权的数据（包括控制点和指定数据）
 */
function queryAuthDataByitemIdAndroleIds(dataItemId,roleIds){
	authOldDataItem ={};
	var ubody = "sys/res/dataPermission/queryAuthDataByitemIdAndroleIds";
	var uall = hostUrl+ubody;
	var postdata ={
			itemId:dataItemId,
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
					var resultMap=data.result;
					console.log(resultMap);
					var listDataPermission = resultMap.listDataPermission;
					var listDataPointPermission = resultMap.listDataPointPermission;
					//获取所有控制点单选按钮
					var radios = $('input:radio');
					
					//已授权的控制点数据
					for(k in listDataPermission){
						var roleId = listDataPermission[k].role_id;
						var dataPointId = listDataPermission[k].data_point_id;
						//已授权的数据进行赋值（控制点）
						authOldDataItem[roleId] = dataPointId;
						//设置页面对应的控制点单选按钮被选中
						for(var i=0;i<radios.length;i++){
							var radioids = radios[i].value.split("#");
							if(roleId == radioids[1] && dataPointId == radioids[0]){
								radios[i].checked = true;
							}
						}
					}
					
					//已授权的指定数据
					for(k in listDataPointPermission){
						var roleId = listDataPointPermission[k].role_id;
						var val = listDataPointPermission[k].val;
						//设置页面对应的指定数据多选框进行选中
						var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
						for(var ao =0;ao<authorizationCheck_obj.length;ao++){
							var checkauthids = authorizationCheck_obj[ao].value;
							var checkappIds = checkauthids.split("#");
							if(roleId == checkappIds[1] && val == checkappIds[2]){
								authorizationCheck_obj[ao].checked = true;
							}
						}
					}
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
 * 设置页面改动过的授权数据(角色到数据)
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
 * 保存授权数据（角色到数据）
 */
function saveAuthData(){
	for(var k in authData){
//	   console.log(k+" :：：：：：：：： "+authData[k]);
	}
	authPointData ={};
	//获取所有控制点单选按钮
	var radios = $('input:radio');
	//选中的按钮添加到保存数据里面
	for(var i=0;i<radios.length;i++){
		if(radios[i].checked){
			var radioids = radios[i].value.split("#");
			var key = radioids[0]+"#"+radioids[1];
			var type = radioids[2];
			authPointData[key] = "1";
			console.log(radios[i].value+'================'+radios[i].checked);
		}
	}
	for(var i=0;i<radios.length;i++){
			var radioids = radios[i].value.split("#");
			//key是角色Id，value是控制点Id
			console.log(radioids[1]+'=======000========='+authPointData['1231312312']);
	}
	//循环已有的控制点数据，
	//如果保存数据里面有，值不一样（添加到保存数据中，做删除操作）值一样（从保存数据中去掉数据(设置成标识为2，也不做保存)，不做保存，原来就有值）
	//如果保存数据里面没有，添加到保存数据中（做删除操作）
	for(var k in authOldDataItem){
		   var pointIdOld = authOldDataItem[k];
		   var kkey = pointIdOld+"#"+k;
		   var isexist = false;
			for(var o in authPointData){
				var roleIdAndPointId = o.split("#");
				var pointId = roleIdAndPointId[0];
				var roleId = roleIdAndPointId[1];
				//保存数据中有
				if(k == roleId){
					if(pointIdOld == pointId){
						//delete authPointData[o];//值一样
						authPointData[o] = "2";//值一样
					}else{
						authPointData[kkey] = "0";//值不一样
					}
					isexist = true;
					break;
				}
			}
			//保存数据中没有
			if(!isexist){
				authPointData[kkey] = "0";
			}
	}
//	return;
	var postData ={
		savePointData:authPointData,
		saveData:authData
	}
	var uBody = "sys/res/dataPermission/saveDataAuthRoleToData";
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
				authOldDataItem={};
				authData = {};
				for(var o in authPointData){
					var roleIdAndPointId = o.split("#");
					var pointId = roleIdAndPointId[0];
					var roleId = roleIdAndPointId[1];
					if(authPointData[o] == "2" || authPointData[o] == "1"){
						authOldDataItem[roleId] = pointId;
					}
				}
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
	var dataItemId = $('#dataItemIdTwo option:selected').val();
	
	var postData ={
		saveData:authRoleData,
		type:tab2SaveType,
		dataItemId:dataItemId,
		id:pointIdOrVal
		
	}
//	var uBody = "sys/res/funcPermission/saveBatchFunToRole";
	var uBody = "sys/res/dataPermission/saveBatchDataToObjectBytypeAndItemId";
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
 * 点击引用控制点多选框的变化值（角色-数据）
 * @param e
 */
function changeCheck(e){
	var authids = e.value.split("#");
	var prefix_id = authids[0];
	var roldId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	
	//获取控制点的全选的多选框
	var authAllcheckObj = document.getElementsByName("authAllcheck");
	//获取所有控制点单选按钮
	var radios = $('input:radio');
	//如果选中了指定数据的全选，将控制点的指定类型类型被选中
	if(roldId == "roleId"){
		if(e.checked){
			for(var k =0;k<authAllcheckObj.length;k++){
				var authAllcheckObjIds = authAllcheckObj[k].value.split("#");
				if(authAllcheckObjIds[2] == 2){
					authAllcheckObj[k].checked = true;
				}else{
					authAllcheckObj[k].checked = false;
				}
			}
			//设置所有控制点单选按钮为指定类型的被选中
			for(var i=0;i<radios.length;i++){
				var radioids = radios[i].value.split("#");
				if(radioids[2] == 2){
				   radios[i].checked = true;
				}
			}
		}else{
		}
	}else{
		//如果选中了指定数据非全选，将同列的控制点设置成指定类型被选中，
		if(e.checked){
			for(var i=0;i<radios.length;i++){
				var radioids = radios[i].value.split("#");
				if(radioids[1] == roldId && radioids[2] == 2){
				   radios[i].checked = true;
				}
			}
		}else{
		}
	}
	
	
	var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
	for(var k =0;k<authorizationCheck_obj.length;k++){
		var checkauthids = authorizationCheck_obj[k].value.split("#");
		//判断是否等于自己，如果是把自己放到或者删除在缓存中
		if(authorizationCheck_obj[k].value == e.value){
			if(e.checked){
				cacheData(e.value,"1");
			}else{
				cacheData(e.value,"0");
			}
		}else{
			if(roldId == "roleId"){
				//横向改变复选框
				if(prefix_id == checkauthids[0]){
					if(e.checked){
						if(e.checked != authorizationCheck_obj[k].checked){
							cacheData(authorizationCheck_obj[k].value,"1");
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(e.checked != authorizationCheck_obj[k].checked){
							cacheData(authorizationCheck_obj[k].value,"0");
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
				//竖向改变复选框
				if(prefix_id.indexOf(checkauthids[0]) >= 0 || checkauthids[0].indexOf(prefix_id) >= 0){
					if(e.checked){
						if(e.checked != authorizationCheck_obj[k].checked){
							cacheData(authorizationCheck_obj[k].value,"1");
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(e.checked != authorizationCheck_obj[k].checked){
							cacheData(authorizationCheck_obj[k].value,"0");
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
			}else{
				//竖向改变复选框
				if(checkauthids[1] == roldId && checkauthids[0] != prefix_id && (prefix_id.indexOf(checkauthids[0]) >=0 || checkauthids[0].indexOf(prefix_id) >= 0)){
					if(e.checked){
						if(e.checked != authorizationCheck_obj[k].checked){
							cacheData(authorizationCheck_obj[k].value,"1");
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(e.checked != authorizationCheck_obj[k].checked){
							cacheData(authorizationCheck_obj[k].value,"0");
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
			}
		}
	}
}

/**
 * 点击多选框的变化值（动作点-角色）
 * @param e
 */
function changeRoleCheck(e){
	var authids = e.value.split("#");
	var prefix_id = authids[0];
	var operationId = authids[1];
	var prefix_sort = authids[2];
	var type = authids[3];
	var authorizationCheck_obj = document.getElementsByName("authorizationRoleCheck");
//	for(k in authorizationCheck_obj){
	for(var k =0;k<authorizationCheck_obj.length;k++){
		var checkauthids = authorizationCheck_obj[k].value.split("#");
		//判断是否等于自己，如果是把自己放到或者删除在缓存中
		if(authorizationCheck_obj[k].value == e.value){
			if(type=="role" || type=="user" || type=="post"){
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
						if(checkauthids[3]=="role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"1");
							}
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(checkauthids[3]=="role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
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
						if(checkauthids[3]=="role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"1");
							}
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(checkauthids[3]=="role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
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
						if(checkauthids[3]=="role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"1");
							}
						}
						authorizationCheck_obj[k].checked = true;
					}else{
						if(checkauthids[3]=="role" || checkauthids[3]=="user" || checkauthids[3]=="post"){
							if(e.checked != authorizationCheck_obj[k].checked){
								cacheRoleData(authorizationCheck_obj[k].value,"0");
							}
						}
						authorizationCheck_obj[k].checked = false;
					}
				}
			}
		}
	}
}


/**
 * 点击控制点all，全选的多选框按钮
 * @param e
 */
function changeAllCheck(e){
	var authids = e.value.split("#");
	var id = authids[0];
	var roldId = authids[1];
	var type = authids[2];
	console.log(id+'---'+roldId+'---'+type);
	//如果不是指定类型，并且被选中，去掉所有指定数据
	if(type != 2){
		if(e.checked){
			var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
			for(var k =0;k<authorizationCheck_obj.length;k++){
				//如果选中到不被选中，记录要删除数据
				if(true == authorizationCheck_obj[k].checked){
					cacheData(authorizationCheck_obj[k].value,"0");
				}
				authorizationCheck_obj[k].checked = false;
			}
		}
	}else{
		//如果是指定类型，但是是不被选中，也去点所有指定数据
		if(!e.checked){
			var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
			for(var k =0;k<authorizationCheck_obj.length;k++){
				//如果选中到不被选中，记录要删除数据
				if(true == authorizationCheck_obj[k].checked){
					cacheData(authorizationCheck_obj[k].value,"0");
				}
				authorizationCheck_obj[k].checked = false;
			}
		}
	}
	//获取所有控制点单选按钮
	var radios = $('input:radio');
	//如果被选中，设置同列其他多选按钮取消选中
	if(e.checked){
		var authAllcheckObj = document.getElementsByName("authAllcheck");
		for(var k =0;k<authAllcheckObj.length;k++){
			if(authAllcheckObj[k].value != e.value){
				authAllcheckObj[k].checked = false;
			}
		}
	}
	//设置同行单选按钮进行选中或者取消选中
	for(var i=0;i<radios.length;i++){
		var radioids = radios[i].value.split("#");
		if(id == radioids[0]){
			if(e.checked){
				radios[i].checked = true;
			}else{
				radios[i].checked = false;
			}
		}
//		console.log(radios[i].checked);
//		console.log(radios[i].value);
	}
}

/**
 * 点击控制点单选按钮
 * @param e
 */
function clickDataRadio(e){
	var authids = e.value.split("#");
	var id = authids[0];
	var roldId = authids[1];
	var type = authids[2];
	//获取所有控制点单选按钮
//	var radios = $('input:radio');
//	for(var i=0;i<radios.length;i++){
//		console.log(radios[i].value+'================'+radios[i].checked);
//	}
	//如果不是指定类型，把指定数据同列都去掉
	if(type != 2){
		var authorizationCheck_obj = document.getElementsByName("authorizationCheck_1");
		for(var k =0;k<authorizationCheck_obj.length;k++){
			var checkauthids = authorizationCheck_obj[k].value.split("#");
			if(roldId == checkauthids[1]){
				//如果选中到不被选中，记录要删除数据
				if(true == authorizationCheck_obj[k].checked){
					cacheData(authorizationCheck_obj[k].value,"0");
				}
				authorizationCheck_obj[k].checked = false;
			}
		}
	}
//	$.xljUtils._searchTreeBtnEvent(key,zTreeObj);
}

/**
 * 显示（角色-数据）授权列表
 */

function showAuthorizationData(){
	authData = {};
	colModeldata=[];
	colModeldata.push({name : 'id',label : 'id',hidden:true,align : "center"});
	colModeldata.push({name : 'type',label : 'type',hidden:true,align : "center"});
	colModeldata.push({name : 'url',label : 'url',hidden:true,align : "center"});
	colModeldata.push({name : 'name',label : '权限点',width : 400,align : "center"});
	colModeldata.push({name : 'rolename',roleId:'roleId',label : '全选',align : "center",formatter: formatterAllcheck});
	
	colImportDataPointModeldata=[];
	colImportDataPointModeldata.push({name : 'id',label : 'id',hidden:true,align : "center"});
	colImportDataPointModeldata.push({name : 'type',label : 'type',hidden:true,align : "center"});
	colImportDataPointModeldata.push({name : 'url',label : 'url',hidden:true,align : "center"});
	colImportDataPointModeldata.push({name : 'name',label : '权限点',width : 400,align : "left"});
	colImportDataPointModeldata.push({name : 'rolename',roleId:'roleId',label : '全选',align : "center",formatter: formatterImportDataPointcheck});
	
	var role_obj = document.getElementsByName("roleCheck");
	var role_check_val = "";
	for(var k =0;k<role_obj.length;k++){
		if(role_obj[k].checked){
			var idandname = role_obj[k].value.split("#");
			role_check_val += idandname[0] + ",";
			colModeldata.push({name : 'rolename',roleId:idandname[0],label : idandname[1],align : "center",formatter: formattercheck});
			colImportDataPointModeldata.push({name : 'rolename',roleId:idandname[0],label : idandname[1],align : "center",formatter: formatterImportDataPointcheck});
		}
	}
	if (role_check_val.length > 0 ) role_check_val = role_check_val.substring(0, role_check_val.length-1);
	var dataItemId = $('#dataItemId option:selected').val();
	if(!dataItemId){
		pop_tip_open("blue","没有授权项");
		return;
	}
	getAuthorizationData(dataItemId,role_check_val);
}

/**
 * (角色到数据、控制点)数据全选多选框格式化
 */
function formatterAllcheck (cellvalue, options, rowObject) {
	return "<input type='checkbox' data-authids='"+rowObject.id+"#"+options.colModel.roleId+"#"+rowObject.type+"' onchange='changeAllCheck(this)' name='authAllcheck' value='"+rowObject.id+"#"+options.colModel.roleId+"#"+rowObject.type+"'>";
}

/**
 * (角色到数据、控制点)数据单选框格式化
 */
function formattercheck (cellvalue, options, rowObject) {
	return "<input type='radio' data-authids='"+rowObject.id+"#"+options.colModel.roleId+"#"+rowObject.type+"' onclick='clickDataRadio(this)' name='authorizationRadio"+options.colModel.roleId+"' value='"+rowObject.id+"#"+options.colModel.roleId+"#"+rowObject.type+"'>";
}

/**
 * (引用控制点)数据多选框格式化
 */
function formatterImportDataPointcheck (cellvalue, options, rowObject) {
	return "<input type='checkbox' data-authids='"+rowObject.prefix_id+"#"+options.colModel.roleId+"#"+rowObject.id+"#"+rowObject.type+"' onchange='changeCheck(this)' name='authorizationCheck_1' value='"+rowObject.prefix_id+"#"+options.colModel.roleId+"#"+rowObject.id+"#"+rowObject.type+"'>";
}

/**
 * 数据多选框格式化(动作点-角色)
 */
function formatterRolecheck (cellvalue, options, rowObject) {
	return "<input type='checkbox' data-authids='"+rowObject.prefix_id+"#"+options.colModel.operationId+"#"+rowObject.prefix_sort+"#"+rowObject.type+"' onchange='changeRoleCheck(this)' name='authorizationRoleCheck' value='"+rowObject.prefix_id+"#"+options.colModel.operationId+"#"+rowObject.prefix_sort+"#"+rowObject.type+"'>";
}

/**
 * 展开数据树(角色到动作点)
 */
function expandData(level){
	var arrdata=jQuery("#listDataPoint").jqGrid('getRowData');
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
	resizeScroll(".roleScroll");
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
		}
	}
	$.xljUtils.gridResizeFn("",".secondItem");
}

/**
 * 按层级展开tree(无用，去掉的方法)
 * @param treeObj
 * @param node
 * @param level
 */
function expandLevel(treeObj,node,level)
{
	var childrenNodes = node.children;
	for(var i=0;i<childrenNodes.length;i++)
	{
		treeObj.expandNode(childrenNodes[i], true, false, false);
		level=level-1;
		if(level>0)
		{
			expandLevel(treeObj,childrenNodes[i],level);
		}
	}
}




/**
 * 加载系统下拉框（角色到数据、查看数据权限）
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
					getDataItemData(appList[0].id);
					getDataItemDataShow(appList[0].id);
					getDataItemDataTwo(appList[0].id);
					for(var o=0;o< appList.length;o++){
						//角色到数据
						$("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
						//查看数据权限
						$("#appIdShow").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
						//数据到角色
						$("#appIdTwo").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
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
 * 获取授权项（角色到数据）
 */
function getDataItemData(appId){
	$("#dataItemId").empty();
	var ubody = "sys/res/dataItem/queryDataItemAndPointList";
	var uall = hostUrl+ubody;
	var postdata ={
			delflag:false
	};
//	var appId = $('#appId option:selected').val();
	if(appId !=null){
		postdata.appId=appId;
	}
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.success){
				if(data.result){
					var dtaItemList=data.result;
					for(var o=0;o< dtaItemList.length;o++){
						$("#dataItemId").append("<option value='"+dtaItemList[o].id+"'>"+dtaItemList[o].itemName+"</option>")
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","加载授权项请求失败");
		}
	})
}

/**
 * 获取授权项（查看数据权限）
 */
function getDataItemDataShow(appId){
	$("#dataItemIdShow").empty();
	var ubody = "sys/res/dataItem/queryDataItemAndPointList";
	var uall = hostUrl+ubody;
	var postdata ={
			delflag:false
	};
//	var appId = $('#appId option:selected').val();
	if(appId !=null){
		postdata.appId=appId;
	}
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.success){
				if(data.result){
					var dtaItemList=data.result;
					for(var o=0;o< dtaItemList.length;o++){
						$("#dataItemIdShow").append("<option value='"+dtaItemList[o].id+"'>"+dtaItemList[o].itemName+"</option>")
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","加载授权项请求失败");
		}
	})
}

/**
 * 获取授权项（数据到角色）
 */
function getDataItemDataTwo(appId){
    $("#appIdTwo").attr("disabled",true);
	$("#dataItemIdTwo").empty();
	var ubody = "sys/res/dataItem/queryDataItemAndPointList";
	var uall = hostUrl+ubody;
	var postdata ={
			delflag:false
	};
//	var appId = $('#appId option:selected').val();
	if(appId !=null){
		postdata.appId=appId;
	}
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.success){
				if(data.result){
					var dtaItemList=data.result;
					for(var o=0;o< dtaItemList.length;o++){
						$("#dataItemIdTwo").append("<option value='"+dtaItemList[o].id+"'>"+dtaItemList[o].itemName+"</option>")
					}
				}
                $("#appIdTwo").attr("disabled",false);
				getButtonTree();
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","加载授权项请求失败");
		}
	})
}

/**
 * 切换系统下拉框（角色到数据）
 * @param ele
 */
function selectAppForm(ele){
	getDataItemData(ele.value);
}

/**
 * 切换系统下拉框（查看数据权限）
 * @param ele
 */
function selectAppFormShow(ele){
	getDataItemDataShow(ele.value);
}
/**
 * 切换系统下拉框（数据到角色）
 * @param ele
 */
function selectAppFormTwo(ele){
	getDataItemDataTwo(ele.value);
}

var key;
var keyShow;
/**
 * 获取角色树（角色到数据）
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
		},
     	error: function(XMLHttpRequest, textStatus, errorThrown) {
  		  pop_tip_open("red","服务异常,请联系管理员！");
        }
	})
}

/**
 * 获取角色树(标准岗位-查看授权)
 */
function getRoleTreeShow(objType,isShowId) {
    $("#objectTypeShow").attr("disabled",true);
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



/**
 * 角色树点击节点事件(角色-数据)
 */

function zTreeOnClick(event, treeId, treeNode) {
	$('#checkAll')[0].checked = false;
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
	$(".check_group").getNiceScroll().show().resize();
}

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


/**
 * 打开引入其他对象页面
 */
function openAuthdataImport(){
	var role_obj = document.getElementsByName("roleCheck");
	var role_check_val = "";
	var colNum=0;
	for(var k =0;k<role_obj.length;k++){
		if(role_obj[k].checked){
			var idandname = role_obj[k].value.split("#");
			role_check_val += idandname[0] + ",";
		}
	}
	
	if (role_check_val.length > 0 ) {
		role_check_val = role_check_val.substring(0, role_check_val.length-1);
	}else{
		pop_tip_open("red","请选择对象");
		return false;
	}
	importObjectId = role_check_val;
	window.open("authData_import.html");
}



$(function() {
	
	//样式初始化
	initStyle();
	//初始化系统
	getAppData();
	//绑定下拉框
	binSelEvent();
	//初始化角色树
	getRoleTree();
	//初始化显示角色树
	getRoleTreeShow();
	//初始化按钮树
//	getButtonTree();
	//tab切换功能
	switchPage();
	//选中或取消权限
	checkPower();
	
	//判断是否是跳转过来的页面
		istiaozhuan();
	
});


/**
 * 是否跳转过来的
 */
function istiaozhuan() {
//	var authFunStandardPostId = window.opener.authFunStandardPostId;
//	var authFunUserId = window.opener.authFunUserId;
	var dataParam = window.parent.childParamCache();
	if(dataParam.authDataStandardPostId){
		$('.tabItem').css('display','none');
		$("#objectTypeShow").val("standardPost");
		//初始化显示角色树
		getRoleTreeShow("standardPost",dataParam.authDataStandardPostId);
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
	}else if(dataParam.authDataUserId){
		$('.tabItem').css('display','none');
		$("#objectTypeShow").val("user");
		//初始化显示角色树
		getRoleTreeShow("user",dataParam.authDataUserId);
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
 * 样式初始化
 */
function initStyle(){
	$('#tabGrid1').height($(window).height() - 319);
	$('.tab-content').css('height',$(window).height() - 105);
	resizeTreeHeight();
	$('#checkAll').change(function() {
		var flag = $(this)[0].checked;
		$('#checkL > ul > li > input').each(function(i,ele){
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
				$('#tabGrid1').height($(window).height() - 319);
				var gridHeadrHeight = $('#listAuth').parents(".ui-jqgrid-bdiv").siblings('.ui-jqgrid-hdiv').outerHeight();
                var gridFooterHeight = $('#listAuth').parents(".ui-jqgrid-view").siblings(".ui-jqgrid-pager").outerHeight();
//				$('#listAuth').jqGrid().setGridHeight($(window).height() - gridHeadrHeight-gridFooterHeight-325);
				$(".check_group").getNiceScroll().show();
			}else{
				$('.slidespan').text('展开');
				$('.slide').children('.fa').addClass('fa-chevron-down');
				$('.slide').children('.fa').removeClass('fa-chevron-up');
				$('#tabGrid1').height($(window).height() - 179);
				var gridHeadrHeight = $('#listAuth').parents(".ui-jqgrid-bdiv").siblings('.ui-jqgrid-hdiv').outerHeight();
                var gridFooterHeight = $('#listAuth').parents(".ui-jqgrid-view").siblings(".ui-jqgrid-pager").outerHeight();
//				$('#listAuth').jqGrid().setGridHeight($(window).height() - gridHeadrHeight-gridFooterHeight-183);
				$(".check_group").getNiceScroll().hide();
			}
			$.xljUtils.gridResizeFn();
		},400)
	});
}
/**
 * tab页切换
 */
function switchPage() {
	$('.bigBtn').click(function() {
		$('.tabItem').css('display','none');
		var index = $(this).index();
		$('.bigBtn').removeClass('active');
		$(this).addClass('active');
		var tabitem = $('.tabItem')[index];
		$(tabitem).css('display','block');
		$.xljUtils.gridResizeFn("",".secondItem");
		$.xljUtils.gridResizeFn("",".thirdItem");
		resizeScroll();
		resizeScroll(".roleScroll");
		resizeScroll(".tab-content");
		$.xljUtils.treeResizeFn();
	})
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
 * 展开及收缩权限
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
	},300);
}
//重置
function resizeScroll(cl){
	if(!cl) cl = ".check_group";
	$(cl).getNiceScroll().show().resize();
}
//右侧滚动条
function addCheckboxScroll(cl){
	if(!cl) cl = ".check_group";
	$(cl).niceScroll({
		autohidemode: false,
		cursorcolor: "#eee",
		cursorwidth: "6px", // 滚动条的宽度，单位：便素
		cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
		horizrailenabled: true, // nicescroll可以管理水平滚动
		background: "#fff"
	});
}