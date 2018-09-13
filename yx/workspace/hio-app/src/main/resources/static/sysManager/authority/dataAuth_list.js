/*** 
 * 数据授权
 * @author gyh
 * @date 2017-3-23
 */

var dataAuthGrid;
var roleTreeObj;//角色树对象
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
			onClick: zTreeOnClick
		}
};
/**
 * 树点击事件，刷新数据授权表格
 */
function zTreeOnClick(){
	var nodes = roleTreeObj.getSelectedNodes();
	if(nodes.length >0 && nodes[0].mold == 'role'){
		//刷新表格
		var queryData={
				delflag:false
		};
		//选中角色
		var nodes = roleTreeObj.getSelectedNodes();
		if(nodes.length >0 &&  nodes[0].mold == 'role' && nodes[0].id != null){
			queryData.roleId=nodes[0].id;
		}
		//选中业务模块
		var appId = $('#appId option:selected').val();
		if(appId !=null&& appId !=''){
			queryData.appId=appId;
		}
		dataAuthGrid.jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
	}
}


/**
 * 切换系统下拉框重新加载表格
 */
function selectDataItemForm(ele){
	if(ele.value == ""){
		var postData = dataAuthGrid.jqGrid("getGridParam", "postData");
		$.each(postData, function (k, v) {
			delete postData[k];
		});
		var queryData2={
				delflag:false
		};
		dataAuthGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	}else{
		//选中业务模块
		var queryData2={
				delflag:false,
				appId:ele.value
		};
		//选中角色
		var nodes = roleTreeObj.getSelectedNodes();
		if(nodes.length >0 &&  nodes[0].mold == 'role' && nodes[0].id != null){
			queryData2.roleId=nodes[0].id;
		}
		dataAuthGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	}
}
/**
 * 初始化业务模块下拉框
 */
function getAppData(){
	var ubody = "sys/res/appSystem/queryList";
	var uall = serviceUrl+ubody;
	var postdata ={
			delflag:false,
			status:1
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
					$("#appId").append("<option value=''>全部</option>");
					for(var o in appList){
						$("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
					}
				}
			}else{
				return data.msg
			}
		}
	})
}


/**
 * 获取焦点方法
 */
function focusKey(e) {
	if (key.hasClass("empty")) {
		key.removeClass("empty");
	}
}
/**
 * 失去焦点方法
 */
function blurKey(e) {
	if (key.get(0).value === "") {
		key.addClass("empty");
	}
}
/**
 * 树搜索方法
 */
function searchNode(e) {
	var zTree = $.fn.zTree.getZTreeObj("roleTree");
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
/**
 * 递归树传icon
 */
function recursionArray(arr) {
	for(var i in arr) {
		if(arr[i].mold == "cata") {
			arr[i].iconSkin = "diy-company";
			if(arr[i].children.length > 0) {
				recursionArray(arr[i].children);
			}
		}else if(arr[i].mold == "role" ) {
			arr[i].iconSkin = "diy-company";
		}
	}
};

var key;
/**
 * 获取角色树
 */
function getRoleTree() {
	urlBody = "sys/org/roleCatalog/getRoleTree";
	urlAll = serviceUrl + urlBody;
	$.ajax({
		type:'POST',
		url:urlAll,
		dataType:'json',
		contentType:'application/json',
		data:'{}',
		success: function(json) {
			var zNodes = json.result;
			recursionArray(zNodes);
			roleTreeObj = $.fn.zTree.init($("#roleTree"), setting, zNodes);
			key = $("#key");
			key.bind("focus", focusKey)
			.bind("blur", blurKey)
			/*.bind("propertychange", searchNode)
			.bind("input", searchNode)*/;
		}
	})
}

/**
 * 加载数据授权表格
 */
function initdataAuthGrid(){
	var ubody = "sys/res/dataItem/queryDataItemAndPointObjList";
	var uall = serviceUrl+ubody;
	var postdata ={
			delflag:0
	};
	//选中业务模块
	var appId = $('#appId option:selected').val();
	if(appId !=null&& appId !=''){
		postdata.appId=appId;
	}
	//选中的角色
	if(roleTreeObj!=null && roleTreeObj!= undefined){
		var nodes = roleTreeObj.getSelectedNodes();
		if(nodes.length >0 &&  nodes[0].mold == 'role' && nodes[0].id != null){
			postdata.roleId=nodes[0].id;
		}
	}
	//创建jqGrid组件
	dataAuthGrid = jQuery("#list2").jqGrid(
			{
				url: uall,
				ajaxGridOptions: { contentType: 'application/json' },
				mtype : "POST",  
				contentType : "application/json",  
				postData:postdata,
				datatype : "json", 
				height:480,
				jsonReader : {
					root:"result"
				},
				autowidth:true,
				rownumbers: true,
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'id',label : 'id',width : 55,align : "center",hidden : true},
				             {name : 'appId',label : '所属系统ID',width : 80,align : "center",hidden : true},
				             {name : 'appName',label : '所属系统名称',width : 80,align : "center",hidden : true},
				             {name : 'itemCode',label : '对象编号',width : 80,align : "center",hidden : true},
				             {name : 'itemName',label : '数据对象控制对象',width : 100,align : "center"},
				             {name : 'ctrlCode',label : '作用域编号',width : 80,align : "center",hidden : true},
				             {name : 'ctrlName',label : '作用域名称',width : 100,align : "center"},
				             {name : 'pointId',label : '选中控制点ID',width : 80,align : "center",hidden : true},
				             {name : 'point',label : '控制点',width : 230,align : "center",
				            	 formatter:function(cellvalue, options, rowObject){
				            		 var radioStr='';
				            		 if(cellvalue!=''&&cellvalue!=undefined){     
				            			 $.each(cellvalue,function(i,val){
				            				 var type=val.type;
				            				 var url=val.url;
				            				 var name=val.name;
				            				 var pointId=val.id;
				            				 if(rowObject.pointId!=null&&rowObject.pointId!=undefined&&rowObject.pointId==pointId){
				            					 radioStr+="<input type='radio' name='"+rowObject.id+"' value='"+name+"'onclick=\"radioSelect('"+rowObject.id+"','"+pointId+"')\" checked>"+name+"</input>";
				            				 }else{
				            					 radioStr+="<input type='radio' name='"+rowObject.id+"' value='"+name+"'onclick=\"radioSelect('"+rowObject.id+"','"+pointId+"')\">"+name+"</input>";
				            				 }
				            				 if(url!=null){
				            					 var model=val.model;
				            					 radioStr+="&nbsp;<a id='url' href='#' disabled onclick=\"showUrl('"+url+"','"+rowObject.id+"','"+name+"','"+pointId+"','"+model+"')\"><font color=blue><u>选择类型</u></font></a>";
				            				 }
				            			 });
				            		 }
				            		 return radioStr;
				            	 }
				             },
				             {name : 'valIds',label : '授权值Ids',width : 150,align : "center"},
				             {name : 'val',label : '授权值',width : 250,align : "center",hidden : true}
				             ],
				             rowNum : -1,//不分页
				             rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
				             //pager : '#pager2',//表格页脚的占位符(一般是div)的id
				             sortname : 'id',//初始化的时候排序的字段
				             sortorder : "desc",//排序方式,可选desc,asc
//				             mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
				             viewrecords : true
			}).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}
/**
 * 打开授权值页面，选择授权值
 */
var openUrl;
function showUrl(url,rowId,radioValue,pointId,model){
	//打开引入类型的url
	openUrl=url;
	var val=$('input:radio[name=\''+rowId+'\']:checked').val();
	if(val==radioValue){
		if(model=="1"){
			window.open("authValTree_list.html");
		}else{
			window.open("authValGrid_list.html");
		}
	}else{
		return false;
	}
}
/**
 * 设置选中控制点ID,清空授权值
 */
function radioSelect(rowId,pointId){
	var selData={
			pointId:pointId,
			valIds:"",
			val:""
	};
	dataAuthGrid.jqGrid('setRowData', rowId, selData, '');
}

/**
 * 保存授权
 */
function saveAuth() {
	// 保存授权 	
	var nodes = roleTreeObj.getSelectedNodes();
	if(nodes.length != 1 || nodes[0].mold != 'role'){
		alert("请先选择一个角色");
	}else{
		//选中角色
		var roleId = nodes[0].id;
		var obj=dataAuthGrid.jqGrid("getRowData");
		
		var dataList=new Array();//需要保存的记录
		var i=0;
		
		jQuery(obj).each(function(){
			var savedata={};//单条记录
			if(this.pointId==null || this.pointId=='' || this.pointId == undefined){
				
			}else{
				savedata.pointId=this.pointId;
				if(this.valIds!=null && this.valIds!='' && this.valIds != undefined){
					savedata.valIds=this.valIds;
				}
				dataList[i]=savedata;
				i++;
			}
		});
		if(dataList.length>0){
			var dataAuth={dataPmsList:dataList,roleId:roleId};
			var uBody = "sys/res/dataPermission/saveDataAuth";
			var uAll = serviceUrl + uBody;
			$.ajax({
				url:uAll,
				data:JSON.stringify(dataAuth),
				type:'POST',
				contentType:'application/json',
				dataType:'JSON',
				success:function (resultData ) {
					if(resultData) {
						var successFlag = resultData.success;
						var result = resultData.result;
						var msg = resultData.msg;
						if(successFlag) {
							alert('数据保存成功！');
//							closeWin();
						}else {
							alert(msg);
						}
					}
				}
			});
		}else{
			alert("请设置数据授权");
			return false;
		}
	}
};
/**
 * 关闭窗口
 */
function closeWin(){
	window.close();
}


$(function(){
	//初始化角色树
	getRoleTree();
	//初始化系统下拉框数据
	getAppData();
	//初始化initdataAuthGrid
	initdataAuthGrid();
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


//表格上面 按岗位 切换
$(".right-content .con-tit button").on("click",function(e){
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    e.stopPropagation();
});
