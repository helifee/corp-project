/** 
 * 数据权限作用域列表
 * @author add by shiyong , updata by gyh
 * @date 2017-3-24
 */

var zTreeObj;
var urlBody = "";
var urlAll = "";
var buttonGrid;
var buttonOnId;
//选择的系统
var selectAppId;
var isGridnoResize = false;
var selResourceId;
/**
 * 上级组织机构回调函数
 * @param data
 */
function menuCallback(data) {
	$("#mmForm").find("input[id='parentId']").val(data.id);
	$("#mmForm").find("input[id='parentIdName']").val(data.name);
	var postData = buttonGrid.jqGrid("getGridParam", "postData");
	$.each(postData, function (kk, v) {
		delete postData[kk];
	});
	selResourceId=data.id;
	resetButtomParam();
	var queryData2= getButtomParam();
	buttonGrid.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
}
/**
 * 展示树
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
/**
 * 追加表格数据，模拟分页
 */
//初始化数据
var pageFlag=true;
var limit=50;//每页条数
var start=limit;//下拉分页初始条数
function addGridPage(){
	var gridH=$('#ascrail2000');
	var gridHight=$('#ascrail2000').height();
	var scroll=gridH.find('div')[0];
	var top=$(scroll).css('top').replace('px','');
	var sH=$('#ascrail2000 div').height();
	if(gridHight-top-sH<=30 && pageFlag){
		pageFlag=false;
		queryData2=getButtomParam();
		//请求数据
		var ubody = "sys/res/operation/queryList";
		var uall = hostUrl+ubody;
		$.ajax({
			type:'POST',
			url:uall,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(queryData2),
			success: function(json) {
				if(json.success == true){
					var dataRow=json.result;
					if(dataRow.length>0){
						buttonGrid.jqGrid("addRowData","id", dataRow, "last");
						pageFlag=true;
						start=start+limit;
					}
				}else{
					pop_tip_open("red",json.msg);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red","查询列表请求失败");
			}
		})
	}
}
/**
 * 获取查询参数
 */
function getButtomParam(){
	selAppId=$('#appId option:selected').val();
	var paramData={
			delflag:"0",
			appId:selAppId
			,start:start
			,limit:limit
			,fristLimit:limit
			,resourceId:selResourceId
	};
	return paramData;
}
/**
 * 重置查询条件
 */
function resetButtomParam(){
	pageFlag=true;
	start=limit;
}
/**
 * 初始化button表格
 */
function initbuttonGrid(appId){
	var ubody = "sys/res/operation/queryList";
	var uall = hostUrl+ubody;
	//创建jqGrid组件
	buttonGrid = jQuery("#buttonList").jqGrid(
			{
				url: uall,
				ajaxGridOptions: { contentType: 'application/json' },
				mtype : "POST",  
				contentType : "application/json",  
				postData:{delflag:"0",appId:appId,"fristLimit":limit},
//				datatype : "json", 
				datatype : "local", 
				jsonReader : {
					root:"result"
				},
				autowidth:true,
				rownumbers: true,
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'id',label : 'id',width : 55,align : "center",hidden : true},
				             {name : 'appName',label : '所属系统',width : 80,align : "center"},
				             {name : 'resourceName',label : '所属菜单',width : 80,align : "center"},
				             {name : 'code',label : '按钮编码',width : 120,align : "center"},
				             {name : 'name',label : '按钮名称',width : 200,align : "center"},
				             {name : 'url',label : 'URL',width : 240,align : "center"},
				             {name : 'parentName',label : '上级按钮',width : 80,align : "center"},
				             {name : 'type',label : '按钮类型',width : 60,align : "center",formatter:typeFmatter},
				             {name : 'remark',label : '说明',width : 310,align : "center"}
				             ],
				             rowNum : -1,//一页显示多少条
				             rownumWidth:55,

				             ondblClickRow:function(rowid){
				            	 editType=1;
				            	 updateOperationId = rowid;
				            	 window.open("button_edit.html");
				             },
				             loadError:function(xhr,status,error){
				            	 $.xljUtils.tip("red","按钮表格请求失败");
				             },
				             gridComplete: function(){
				            	 if(buttonOnId){
				            		 $("#"+buttonOnId).focus();
				            		 $(this).jqGrid("setSelection",buttonOnId);
				            	 }

				            	 $.xljUtils.addGridScroll();
				            	 $.xljUtils.gridResizeFn();

				             },
							loadComplete:function(xhr,status,error){
								if(!isGridnoResize){
									$.xljUtils.resizeNestedGrid();
								}


							},
				             sortname : 'id',//初始化的时候排序的字段
				             sortorder : "desc",//排序方式,可选desc,asc
//				             mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
				             viewrecords : true
			}).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });

}

/**
 * 点击清空按钮 清空菜单
 */
function clickClear(){
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.val("");
	parentIdName.val("");
	var postData = buttonGrid.jqGrid("getGridParam", "postData");
	$.each(postData, function (k, v) {
		delete postData[k];
	});

	selResourceId="";
	resetButtomParam();
	var queryData2= getButtomParam();
	buttonGrid.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");

}
/**
 * 切换系统下拉框
 * @param ele
 */
function selectAppForm(ele){
	var postData = buttonGrid.jqGrid("getGridParam", "postData");
	$.each(postData, function (k, v) {
		delete postData[k];
	});
	if(ele.value == ""){
		selResourceId="";
		resetButtomParam();
		var queryData2= getButtomParam();
		buttonGrid.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
	}else{
		selectAppId = ele.value;
		selResourceId="";
		resetButtomParam();
		var queryData2= getButtomParam();
		buttonGrid.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
	}
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.val("");
	parentIdName.val("");
}

//打开方式：0新增，1编辑。默认新增
var editType=0;
var selAppId;//选中appid
var selAppName;//选中appName
var selMenuId;//选中menuid
var selMenuName;//选中menuName
/**
 * 增加按钮
 */
function addOperation(){
	editType=0;
	selAppId=$('#appId option:selected').val();
	selAppName=$('#appId option:selected').text();
	selMenuId=$("#parentId").val();
	selMenuName=$("#parentIdName").val();
	window.open("button_edit.html");
}

/**
 * 修改按钮
 */
var updateOperationId;
function updateOperation(){
	var ids=buttonGrid.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择按钮");
	}else{
		updateOperationId = ids;
		editType=1;
		window.open("button_edit.html");
	}

}


/**
 * 删除按钮
 */
function deleteOperation(){
	//多选框获取IDS
//	var ids=buttonGrid.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
	var ids=buttonGrid.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择按钮");
	}else{
		pop_text_open("blue",'确定删除这【1】条数据吗？',function(){
			var uBody = "sys/res/operation/deletePseudo/"+ids;
			var uAll = hostUrl + uBody;
			$.ajax({
				type:'DELETE',
				url:uAll,
				dataType:'json',
				success: function(json) {
					if(json.success == true){
						pop_tip_open("green",json.msg);
						resetButtomParam();
						var queryData2= getButtomParam();
						isGridnoResize = true;
						buttonGrid.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
						var lastId = '';
						if($("#buttonList #"+ids).prev().length >0){
							lastId=$("#buttonList #"+ids).prev()[0].id;//获取选择数据上一行的ID
						}
						if(lastId!='' && lastId!=null){
							buttonOnId=lastId;
						}
					}else{
						pop_tip_open("red",json.msg);
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					pop_tip_open("red","删除按钮请求失败");
				}
			})
		},true);
	}
}

/**
 * 初始化系统下拉框
 */
function getAppData(appId){
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
					resetButtomParam();
					var queryData2= getButtomParam();
					queryData2.appId=appList[0].id;
					buttonGrid.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
					selectAppId = appList[0].id;
					for(var o in appList){
						$("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化系统下拉框请求失败");
		}
	})
}

/**
 * 用户类型数据格式化
 */
function jqGrid3TypeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "普通用户";
	}else if(cellvalue == "2"){
		return "管理员";
	}else if(cellvalue == "3"){
		return "超级管理员";
	}else if(cellvalue == "0"){
		return "非用户";
	}
}

/**
 * 类型初始化
 */
function typeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "查询";
	}else if(cellvalue == "0"){
		return "修改";
	}else{
		return "";
	}
}

/**
 * initJqGrid数据格式化
 */
function statusFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "启用";
	}else if(cellvalue == "0"){
		return "禁用";
	}
}

/**
 * 格式化样式
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
	if(rowObject.status == "0" ){
		return "style='color:red'";
	}
}

/**
 * 禁用回车事件
 */
$(document).keydown(function(event){
	switch(event.keyCode){
	case 13:return false; 
	}
});

$(function(){
	//初始化initbuttonGrid
	initbuttonGrid();

	//初始化系统下拉框数据
	getAppData();




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
			title:'选择上级菜单',//选择器标题，默认是'选择组织机构'
			selectorType:'menu',//选择器类型，默认是组织机构选择器
			immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
			treeUrl:urlAll,
			treeParam:dataPost,//生成zTree树的参数
			targetId:'parentId',//选择的数据的ID存储input域
			targetName:'parentIdName',//选择的数据的Name存储input域
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

	//禁用所有按钮的默认行为，即刷新页面
	$('.btn').click(function(e) {
		e.preventDefault();
	});
	//鼠标滚动事件
	$('.ui-jqgrid-bdiv').bind("scroll", function (event){
		addGridPage();
	});


});

