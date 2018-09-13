/** 
 * 数据权限作用域列表
 * @author add by shiyong , updata by gyh
 * @date 2017-3-24
 */
//打开方式：0新增，1编辑
var editType=window.opener.editType;
//console.log(editType);
if(editType==1){
	$("title").html("按钮-修改");
	$("#editFormTitel").text("修改");
}else{
	$("title").html("按钮-新增");
	$("#editFormTitel").text("新增");
}

var zTreeObj;
var zTreeObjOperation;

//上级菜单的Id，供上级按钮用
var pmuneId="";

//菜单树 setting设置
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
//按钮树 setting设置
var settingOperation = {
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			beforeClick: beforeClickOperation,
			onDblClick: onDblClickOperation
		}
};

function beforeClick(treeId, treeNode) {
	return true;
}

/**
 * 清空菜单
 */
function restMenu(){
	/*$("#resourceId").attr("value", "");
	$("#resourceIdName").attr("value", "");
	$("#parentId").attr("value", "");
	$("#parentIdName").attr("value", "");*/
	$("#resourceId").val("");
	$("#resourceIdName").val("");
	$("#parentId").val("");
	$("#parentIdName").val("");
//	getOperationTree("");
	pmuneId ="";
}

/**
 * 上级菜单回调函数
 * @param data
 */
function menuCallback(data) {
	$("#buttonFrom").find("input[id='resourceId']").val(data.id);
	$("#buttonFrom").find("input[id='resourceIdName']").val(data.name);
	/*$("#parentId").attr("value", "");
	$("#parentIdName").attr("value", "");*/
	$("#parentId").val("");
	$("#parentIdName").val("");
//	getOperationTree(data.id);
	pmuneId = data.id;
}

/**
 * 上级按钮回调函数
 * @param data
 */
function buttonCallback(data) {
	if(data.id == $("#id").val()){
		pop_tip_open("blue","上级按钮不可选自己");
		return false;
	}else{
		$("#buttonFrom").find("input[id='parentId']").val(data.id);
		$("#buttonFrom").find("input[id='parentIdName']").val(data.name);
	}
}
/**
 * 清空上级按钮
 */
function resetParent(){
	/*$("#parentId").attr("value", "");
	$("#parentIdName").attr("value", "");*/
	$("#parentId").val("");
	$("#parentIdName").val("");
}

/**
 * 树单击事件
 * @param e
 * @param treeId
 * @param treeNode
 */
function onDblClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeMenu"),
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
	var resourceId = $("#resourceId");
	var resourceIdName = $("#resourceIdName");
	resourceId.val(k);
	resourceIdName.val(v);
//	resourceId.attr("value", k);
//	resourceIdName.attr("value", v);
//	getOperationTree(k);
	pmuneId = k;
	$("#treeMenuModal").modal('hide');
	$("#parentId").attr("value", "");
	$("#parentIdName").attr("value", "");
}
/**
 * 展示菜单树
 */
function showMenu() {
	var cityObj = $("#resourceIdName");
	var cityOffset = $("#resourceIdName").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);
}
/**
 * 隐藏菜单树
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

function beforeClickOperation(treeId, treeNode) {
	return true;
}
/**
 * 按钮树单击事件
 * @param e
 * @param treeId
 * @param treeNode
 */
function onDblClickOperation(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeButton"),
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
	parentId.val(k);
	parentIdName.val(v);
//	parentId.attr("value", k);
//	parentIdName.attr("value", v);
	$("#treeButtonModal").modal('hide');
}
/**
 * 展示按钮树
 */
function showMenuOperation() {
	var cityObj = $("#parentIdName");
	var cityOffset = $("#parentIdName").offset();
	$("#menuContentOperation").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDownOperation);
}
/**
 * 隐藏按钮树
 */
function hideMenuOperation() {
	$("#menuContentOperation").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDownOperation);
}
function onBodyDownOperation(event) {
	if (!(event.target.id == "menuBtnOperation" || event.target.id == "menuContentOperation" || $(event.target).parents("#menuContentOperation").length>0)) {
		hideMenuOperation();
	}
}


/**
 * 获取上级菜单树
 */
function getResourceTree(appIds) {
	var urlBody = "sys/res/resource/getResourceTree";
	var urlAll = hostUrl + urlBody;
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
			recursionArray(zNodes);
			zTreeObj = $.fn.zTree.init($("#treeMenu"), setting, zNodes);
//			zTreeObjOperation = $.fn.zTree.init($("#treeButton"), settingOperation, zNodes);
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
    	if(arr[i].type == "RESOURCE") {
            arr[i].iconSkin = "diy-menu";
            if(arr[i].children!=null&&arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "OPERATION" ) {
            arr[i].iconSkin = "diy-function";
            if(arr[i].children!=null&&arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }
    }
}
/**
 * 获取上级按钮树
 */
function getOperationTree(resourceIds) {
	var urlBody = "sys/res/operation/getOperationTreeByResourceId";
	var urlAll = hostUrl + urlBody;
	var dataPost={
			resourceId:resourceIds
	}
	$.ajax({
		type:'POST',
		url:urlAll,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(dataPost),
		success: function(json) {
			var zNodes = json.result;
			var buttonId=$("#id").val();
			if(buttonId !=null &&buttonId !=undefined){
				for(var o in zNodes){
					if(zNodes[o].id==buttonId){
						zNodes.splice(o,1);
					}
				}
			}
			recursionArray(zNodes);
			zTreeObjOperation = $.fn.zTree.init($("#treeButton"), settingOperation, zNodes);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取上级按钮树请求失败");
		}
	})
}

/**
 * 初始化主键ID
 */
function initUuid(){
	var uBody = "generator/getGuuid"+"?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#buttonFrom").find("input[name='id']").val(guuid);
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
 * 新增--保存
 * @param ifNew:0只保存，1保存并新增
 */
function addSaveForm(ifNew){
	var operationArr= $("#buttonFrom").serializeArray();
	var operationDto={};
	for(var i in operationArr){
		if(operationArr[i].name=="registrationDate"||"createDate"==operationArr[i].name||"updateDate"==operationArr[i].name|| "disabledDate"==operationArr[i].name){

		}else if(operationArr[i].name=="parentIdName" || operationArr[i].name=="resourceIdName" || operationArr[i].name=="leaderIdName" || operationArr[i].name=="_id"|| operationArr[i].name=="_name" ){

		}else{
			operationDto[operationArr[i].name]=operationArr[i].value;
		}
	}
	operationDto.delflag=false;

	var uBody = "sys/res/operation/save";
	var uAll = hostUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(operationDto),
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
				}else {
					pop_tip_open("red",msg);
				}
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});
}

/**
 * 编辑--保存
 */
function editSaveForm(ifNew){
	var operationArr= $("#buttonFrom").serializeArray();
	var operationDto={};
	for(var i in operationArr){
		if(operationArr[i].name=="registrationDate"||"createDate"==operationArr[i].name||"updateDate"==operationArr[i].name|| "disabledDate"==operationArr[i].name){

		}else if(operationArr[i].name=="parentIdName" || operationArr[i].name=="resourceIdName" || operationArr[i].name=="leaderIdName"  || operationArr[i].name=="_id"|| operationArr[i].name=="_name"){

		}else{
			operationDto[operationArr[i].name]=operationArr[i].value;
		}
	}
	operationDto.delflag=false;
	var buttonId = $('#id').val();
	var uBody = "sys/res/operation/update/"+buttonId;
	var uAll = hostUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(operationDto),
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
					refreshGrid(buttonId);
					if(ifNew==1){//保存并新增
						refreshWin();
					}else{
						closeWin();
					}
				}else {
					pop_tip_open("red",msg);
				}
			}else{
				pop_tip_open("red",'数据保存失败！');
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});
}

/**
 * 刷新按钮表格
 */
function refreshGrid(id) {
	window.opener.resetButtomParam();
	var queryData2= window.opener.getButtomParam();
	window.opener.buttonGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	if(id !=null &&id !=""){
		window.opener.buttonOnId=id;
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
	var ubody = "sys/res/appSystem/queryList";
	var uall = hostUrl+ubody;
	var postdata={
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
					if(appId == null || appId == undefined ){
						getResourceTree(appList[0].id);
					}
					for(var o in appList){
						if(appId == appList[o].id){
							getResourceTree(appList[o].id);
							$("#appId").append("<option value='"+appList[o].id+"' selected>"+appList[o].name+"</option>")
						}else{
							$("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
						}
					}
				}
			}else{
				pop_tip_open("red","初始化系统下拉框失败");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化系统下拉框请求失败");
		}
	})
}

/**
 * 切换系统下拉框，重新加载按钮树
 * @param ele
 */
function selectAppForm(ele){
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	var resourceId = $("#resourceId");
	var resourceIdName = $("#resourceIdName");
	parentId.val("");
	parentIdName.val("");
	resourceId.val("");
	resourceIdName.val("");
	/*parentId.attr("value", "");
	parentIdName.attr("value", "");
	resourceId.attr("value", "");
	resourceIdName.attr("value", "");*/
	getResourceTree(ele.value);
}

/**
 * 根据ID获取按钮
 */
function getOperationById(){
	var operationId = window.opener.updateOperationId;
	var uBody = "sys/res/operation/get/"+operationId+"?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#buttonFrom").find("input[name='id']").val(data.result.id);
			$("#buttonFrom").find("input[name='code']").val(data.result.code);
			$("#name").val(data.result.name);
			$("#resourceId").val(data.result.resourceId);
//			getOperationTree(data.result.resourceId);
			pmuneId = data.result.resourceId;
			$("#parentId").val(data.result.parentId);
			$("#resourceIdName").val(data.result.resourceName);
			$("#parentIdName").val( data.result.parentName);
			$("#url").val(data.result.url);
			if(data.result.type == "1"){
				$("input[name='type'][value=1]").attr("checked",true); 
			}else{
				$("input[name='type'][value=0]").attr("checked",true); 
			}
			$("#sort").val(data.result.sort);
			$("#remark").val(data.result.remark);
			getAppData(data.result.appId);
//			$("#appFrom").find("input[name='id']").val(guuid);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化按钮信息请求失败");
		}
	})
}


$(function () {
	$("#menuButton").on('click',function(){
		var urlBody = "sys/res/resource/getResourceTree";
	    var urlAll = hostUrl + urlBody;
		var dataPost={
	    		menuDelFlag:"0",
				menuStatus:"1",
	    		appId:$('#appId').val()
	    }
		$(document.body).data($(this).attr('id'),'');
			$(this).xljSingleSelector({
				title:'所属菜单',//选择器标题，默认是'选择组织机构'
	            selectorType:'menu',//选择器类型，默认是组织机构选择器
	            immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
	            treeUrl:urlAll,
	            treeParam:dataPost,//生成zTree树的参数
	            targetId:'resourceId',//选择的数据的ID存储input域
	            targetName:'resourceIdName',//选择的数据的Name存储input域
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
	
	$("#buttonButton").on('click',function(){
		var urlBody = "sys/res/operation/getOperationTreeByResourceId";
		var urlAll = hostUrl + urlBody;
		var dataPost={
				resourceId:pmuneId
		}
		$(document.body).data($(this).attr('id'),'');
			$(this).xljSingleSelector({
				title:'选择上级按钮',//选择器标题，默认是'选择组织机构'
	            selectorType:'',//选择器类型，默认是组织机构选择器
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
	            saveCallback:buttonCallback,
	            formatTreeJson:function(data){return data;},
	            treeSettings:{}
			});
			
	});
	
	$("#saveBtn").on('click',function(){
		$("#buttonFrom").attr("data-validate-success","saveForm(0)");
		$("#buttonFrom").submit();
	});

	$("#saveAndCreateBtn").on('click',function(){
		$("#buttonFrom").attr("data-validate-success","saveForm(1)");
		$("#buttonFrom").submit();
	});
	if(editType==1){//修改
		$("#saveAndCreateBtn").hide();
		getOperationById();
	}else{//新增
		getAppData();
		initUuid();
		//上级选中menu
		var selMenuId=window.opener.selMenuId;
		var selMenuName=window.opener.selMenuName;
		if(selMenuId ==undefined || selMenuName ==undefined||selMenuId =="" || selMenuId ==null || selMenuName =="" || selMenuName ==null ){
			
		}else{
			$("#resourceId").attr("value",selMenuId);
			$("#resourceIdName").attr("value",selMenuName);
			getOperationTree(selMenuId);
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
	//上级选中menu
	var selMenuId=window.opener.selMenuId;
	var selMenuName=window.opener.selMenuName;
	if(selMenuId ==undefined || selMenuName ==undefined||selMenuId =="" || selMenuId ==null || selMenuName =="" || selMenuName ==null ){
		$("#resourceId").val("");
		$("#resourceIdName").val("");
	}else{
		$("#resourceId").attr("value",selMenuId);
		$("#resourceIdName").attr("value",selMenuName);
		getOperationTree(selMenuId);
	}
	
	$("#parentId").val("");
	$("#parentIdName").val("");
	$("#url").val("");
	$("input[name='type'][value=1]").attr("checked",true); 
	$("#sort").val("");
	$("#remark").val("");
	editType=0;
	getAppData();
	initUuid();
}


