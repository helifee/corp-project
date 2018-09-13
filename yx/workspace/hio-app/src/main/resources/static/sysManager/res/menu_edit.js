/** 
 * 数据权限作用域列表
 * @author add by shiyong , updata by gyh
 * @date 2017-3-23
 */
//打开方式：0新增，1编辑
var editType=window.opener.editType;
//console.log(editType);
if(editType==1){
	$("title").html("菜单-修改");
	$("#editFormTitel").text("修改");
}else{
	$("title").html("菜单-新增");
	$("#editFormTitel").text("新增");
}
/**
 * 根据ID获取菜单
 */
function getMenuById(){
	var resourceId = window.opener.updateMenuId;
	var uBody = "sys/res/resource/get/"+resourceId+"?time="+Math.random();
	var uAll = serviceUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#menuFrom").find("input[name='id']").val(data.result.id);
			$("#menuFrom").find("input[name='code']").val(data.result.code);
			$("#name").val(data.result.name);
			$("#parentId").val(data.result.parentId);
			$("#parentIdName").val(data.result.parentName);
			$("#url").val(data.result.url);
			$("#mobileUrl").val(data.result.mobileUrl);
			if(data.result.isinventedmenu == "1"){
				$("input[name='isinventedmenu'][value=1]").attr("checked",true); 
			}else{
				$("input[name='isinventedmenu'][value=0]").attr("checked",true); 
			}
			if(data.result.isoutmenu == "1"){
				$("input[name='isoutmenu'][value=1]").attr("checked",true); 
			}else{
				$("input[name='isoutmenu'][value=0]").attr("checked",true); 
			}
			if(data.result.openmode == "1"){
				$("input[name='openmode'][value=1]").attr("checked",true); 
			}else{
				$("input[name='openmode'][value=0]").attr("checked",true); 
			}
			if(data.result.status == "1"){
				$("input[name='status'][value=1]").attr("checked",true); 
			}else{
				$("input[name='status'][value=0]").attr("checked",true); 
			}
			$("#icon").val(data.result.icon);
			$("#sort").val(data.result.sort);
			$("#remark").val(data.result.remark);
			getAppData(data.result.appId);
//			$("#appFrom").find("input[name='id']").val(guuid);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化菜单信息请求失败");
		}
	})
}
/**
 * 清空上级菜单
 */
function restParent(){
	/*$("#parentId").attr("value", "");
	$("#parentIdName").attr("value", "");*/
	$("#parentId").val("");
	$("#parentIdName").val("");
}

/**
 * 获取上级菜单树
 */
function getMenuTree(appIds) {
	var urlBody = "sys/res/resource/getResourceTree";
	var urlAll = serviceUrl + urlBody;
	var dataPost={
			menuDelFlag:"0",
			menuStatus:"1",
			appId:appIds
	}
	$.ajax({
		type:'POST',
		url:urlAll,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(dataPost),
		success: function(json) {
			var zNodes = json.result;
			/*var menuId=$("#id").val();
			if(menuId !=null &&menuId !=undefined){
				for(var o in zNodes){
					if(zNodes[o].id==menuId){
						zNodes.splice(o,1);
					}
				}
			}*/
			recursionArray(zNodes);
			zTreeObj = $.fn.zTree.init($("#treeOrg"), setting, zNodes);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取上级菜单树请求失败");
		}
	})
}

/**
 * 递归设置树的图片样式
 */
function recursionArray(arr) {
    for(var i in arr) {
        arr[i].iconSkin = "diy-menu";
        if(arr[i].children!=null&&arr[i].children.length > 0) {
            recursionArray(arr[i].children);
        }
    }
}
var rowNum=1;
var zTreeObj;

var setting = {
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			beforeClick: beforeClick,
			onDblClick: onDblClick
		}
};

function beforeClick(treeId, treeNode) {
	return true;
}
/**
 * 树双击事件
 * @param e
 * @param treeId
 * @param treeNode
 */
function onDblClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeOrg"),
	nodes = zTree.getSelectedNodes(),
	v = "";
	k = "";
	nodes.sort(function compare(a,b){return a.id-b.id;});
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
		k += nodes[i].id + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	if (k.length > 0 ) k = k.substring(0, k.length-1);
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.attr("value", k);
	parentIdName.attr("value", v);
	$("#treeModal").modal('hide');
}

/**
 * 上级菜单回调函数
 * @param data
 */
function menuCallback(data) {
	if(data.id == $("#id").val()){
		pop_tip_open("blue","上级菜单不可选自己");
		return false;
	}else{
		$("#menuFrom").find("input[id='parentId']").val(data.id);
		$("#menuFrom").find("input[id='parentIdName']").val(data.name);
	}
}



/**
 * 展开树
 */
function showMenu() {
	var cityObj = $("#parentIdName");
	var cityOffset = $("#parentIdName").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);
}
/**
 * 隐藏树
 */
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}


/**
 * 初始化主键ID
 */
function initUuid(){
	var uBody = "sys/uuid/generator/getGuuid"+"?time="+Math.random();
	var uAll = serviceUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#menuFrom").find("input[name='id']").val(guuid);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化主键ID请求失败");
		}
	})
}


/**
 * 保存-新增或编辑保存
 * @param ifNew:0只保存，1保存并新增
 */
function saveForm(ifNew){
	if(editType==1){//编辑
		editSaveForm(ifNew);
	}else{//新增
		addSaveForm(ifNew);
	}
}
/**
 * 编辑--保存
 */
function editSaveForm(ifNew){
	var resourceArr= $("#menuFrom").serializeArray();
	var resourceDto={};
	for(var i in resourceArr){
		if(resourceArr[i].name=="registrationDate"||"createDate"==resourceArr[i].name||"updateDate"==resourceArr[i].name|| "disabledDate"==resourceArr[i].name){

		}else if(resourceArr[i].name=="parentIdName" || resourceArr[i].name=="upLeaderIdName" || resourceArr[i].name=="leaderIdName"|| resourceArr[i].name=="_id"|| resourceArr[i].name=="_name" ){

		}else if(resourceArr[i].name=="url"){
			resourceDto[resourceArr[i].name]=resourceArr[i].value.replace("&amp;", "&");
		}else{
			resourceDto[resourceArr[i].name]=resourceArr[i].value;
		}
	}
	resourceDto.delflag=false;

	var resourceId = $('#id').val(); 

	var uBody = "sys/res/resource/update/"+resourceId;
	var uAll = serviceUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(resourceDto),
		type:'PUT',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					//pop_tip_open("blue",'数据保存成功！');
					refreshGrid(resourceId);
					if(ifNew==1){//保存并新增
						refreshWin();
					}else{
						closeWin();
					}
				}else {
					pop_tip_open("red",msg);
				}
			}else {
				pop_tip_open("red","数据保存请求失败");
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});

}
/**
 * 新增--保存
 */
function addSaveForm(ifNew){
	var resourceArr= $("#menuFrom").serializeArray();
	var resourceDto={};
	for(var i in resourceArr){
		if(resourceArr[i].name=="registrationDate"||"createDate"==resourceArr[i].name||"updateDate"==resourceArr[i].name|| "disabledDate"==resourceArr[i].name){

		}else if(resourceArr[i].name=="parentIdName" || resourceArr[i].name=="upLeaderIdName" || resourceArr[i].name=="leaderIdName"|| resourceArr[i].name=="_id"|| resourceArr[i].name=="_name"){

		}else if(resourceArr[i].name=="url"){
			resourceDto[resourceArr[i].name]=resourceArr[i].value.replace("&amp;", "&");
		}else{
			resourceDto[resourceArr[i].name]=resourceArr[i].value;
		}
	}
	resourceDto.delflag=false;

	var uBody = "sys/res/resource/save";
	var uAll = serviceUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(resourceDto),
		type:'POST',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					//pop_tip_open("blue",'数据保存成功！');
					refreshGrid(result.id);
					if(ifNew==1){//保存并新增
						refreshWin();
					}else{
						closeWin();
					}
					window.opener.menuOnId=resourceDto.parentId;
				}else {
					pop_tip_open("red",msg);
				}
			}else {
				pop_tip_open("red","数据保存请求失败");
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});

}
/**
 * 刷新菜单列表
 */
function refreshGrid(id) {
/*	var queryData2={
			menuDelFlag:"0"
	};*/
	window.opener.resetMenuParam();
	var queryData2=window.opener.getMenuParam();
	//window.opener.menuGridObj.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	if(id !=null &&id !=""){
		window.opener.menuOnId=id;
	}
};
function closeWin(){
	window.close();
}

/**
 * 初始化系统下拉框
 * @param appId
 */
function getAppData(appId){
	var ubody = "sys/res/appSystem/queryList"+"?time="+Math.random();
	var uall = serviceUrl+ubody;
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
					//TODO 选中关联
					if(editType==0){
						//上级选中app
						var selAppId=window.opener.selAppId;
						var selAppName=window.opener.selAppName;
						if(selAppId ==undefined || selAppName ==undefined||selAppId =="" || selAppId ==null || selAppName =="" || selAppName ==null ){
							
						}else{
							//$("#appId").append("<option value='"+selAppId+"'>"+selAppName+"</option>")
							appId=selAppId;
						}
					}
					if(appId == undefined || appId== null){
						getMenuTree(appList[0].id);
					}
					for(var o in appList){
						if(appId == appList[o].id){
							getMenuTree(appList[o].id);
							$("#appId").append("<option value='"+appList[o].id+"' selected>"+appList[o].name+"</option>")
						}else{
							$("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
						}

					}
					
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化系统下拉框请求失败");
		}
	})
}
/**
 * 切换系统下拉框
 * @param ele
 */
function selectAppForm(ele){
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	/*parentId.attr("value", "");
	parentIdName.attr("value", "");*/
	parentId.val("");
	parentIdName.val("");
	getMenuTree(ele.value);
}
/**
 * 初始化数据
 */
$(function () {
	
	$("#menuButton").on('click',function(){
		var urlBody = "sys/res/resource/getResourceTree";
	    var urlAll = serviceUrl + urlBody;
		var dataPost={
	    		menuDelFlag:"0",
				menuStatus:"1",
	    		appId:$('#appId').val()
	    }
		$(document.body).data($(this).attr('id'),'');
			$(this).xljSingleSelector({
				title:'选择上级菜单',//选择器标题，默认是'选择组织机构'
	            selectorType:'menu',//选择器类型，默认是组织机构选择器
	            immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
	            treeUrl:urlAll,
	            treeParam:dataPost,//生成zTree树的参数
	            //targetId:'parentId',//选择的数据的ID存储input域
	            //targetName:'parentIdName',//选择的数据的Name存储input域
	            ajaxType: 'POST',	//ajax的type 默认为post
	            /**
	             * 保存回调函数
	             * @param selectDatas 已选择的数据json对象
	             * @param ele 绑定选择器的对象
	             */
	            saveCallback:menuCallback,
	            formatTreeJson:function(data){return data;},
	            treeSettings:{}
			});
		
			
	});
	
	$("#saveBtn").on('click',function(){
		$("#menuFrom").attr("data-validate-success","saveForm(0)");
		$("#menuFrom").submit();
	});

	$("#saveAndCreateBtn").on('click',function(){
		$("#menuFrom").attr("data-validate-success","saveForm(1)");
		$("#menuFrom").submit();
	});
	if(editType==1){
		$("#saveAndCreateBtn").hide();
		getMenuById();
	}else{
		getAppData();
		initUuid();
		var selid = window.opener.menuGridObj.jqGrid('getGridParam','selrow');
		var rowData = window.opener.menuGridObj.jqGrid('getRowData',selid);
		if(rowData.level == '1'){
			$("#parentId").val(rowData.id);
			$("#parentIdName").val(rowData.name);
		}
	}
});

/**
 * 保存并新增reset页面
 */
function refreshWin(){
	$("#id").val("");
	$("#code").val("");
	$("#name").val("");
	$("#resourceId").val("");
	$("#parentId").val("");
	$("#parentIdName").val("");
	$("#url").val("");
	$("input[name='type'][value=1]").attr("checked",true); 
	$("#sort").val("");
	$("#remark").val("");
	$("#url").val("");
	$("input[name='isinventedmenu'][value=1]").attr("checked",true); 
	$("input[name='isoutmenu'][value=1]").attr("checked",true); 
	$("input[name='openmode'][value=1]").attr("checked",true); 
	$("input[name='status'][value=1]").attr("checked",true); 
	$("#icon").val("");
	$("#sort").val("");
	$("#remark").val("");
	editType=0;
	getAppData();
	initUuid();
}
