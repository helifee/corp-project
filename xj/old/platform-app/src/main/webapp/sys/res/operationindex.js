var zTreeObj;
var urlBody = "";
var urlAll = "";
var jqGrid2;




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
			onClick: onClick
		}
	};

function beforeClick(treeId, treeNode) {
	return true;
}

function onClick(e, treeId, treeNode) {
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
	var postData = jqGrid2.jqGrid("getGridParam", "postData");
    $.each(postData, function (kk, v) {
        delete postData[kk];
    });
	var queryData2={
			delflag:false,
			resourceId:k
			};
	jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
}

function showMenu() {
	var cityObj = $("#parentIdName");
	var cityOffset = $("#parentIdName").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}

//获取上级菜单树
function getResourceTree(appIds) {
    var urlBody = "platform-app/sys/res/resource/getResourceTree";
    var urlAll = urlHost + urlBody;
    var dataPost={
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
            zTreeObj = $.fn.zTree.init($("#treeOrg"), setting, zNodes);
        }
    })
}




function initJqGrid2(){
//	http://192.168.3.131:8080/platform-app/sys/res/appSystem/queryList

	var ubody = "platform-app/sys/res/operation/queryList";
	var uall = urlHost+ubody;
    //创建jqGrid组件
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{delflag:false},
            datatype : "json", 
            height:480,
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
//            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
//            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            
            ondblClickRow:function(rowid){
            	updateOperationId = rowid;
            	window.open("operationupdate.html");
            },
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

function SelectAppForm(ele){
	var postData = jqGrid2.jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
	if(ele.value == ""){
		var queryData2={
				delflag:false
				};
		jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	}else{
		var queryData2={
				delflag:false,
				appId:ele.value
				};
		jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	}
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.attr("value", "");
	parentIdName.attr("value", "");
	getResourceTree(ele.value);
  }




//增加菜单
function addOperation(){
	window.open("operationadd.html");
}

//修改菜单
var updateOperationId;
function updateOperation(){
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择按钮");
	}else{
		updateOperationId = ids;
		window.open("operationupdate.html");
	}
	
}



//删除菜单
function deleteOperation(){
	//多选框获取IDS
//	var ids=jqGrid2.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择按钮");
	}else{
		var uBody = "platform-app/sys/res/operation/deletePseudoBatch/"+ids;
	    var uAll = urlHost + uBody;
		$.ajax({
	        type:'DELETE',
	        url:uAll,
	        dataType:'json',
//	        contentType:'application/json',
//	        data:'{}',
	        success: function(json) {
	        	if(json.success == true){
	            	alert(json.msg);
	            	var appIdvaule = $('#appId option:selected').val();
	            	if(appIdvaule == ""){
	            		var postData = jqGrid2.jqGrid("getGridParam", "postData");
	            	    $.each(postData, function (k, v) {
	            	        delete postData[k];
	            	    });
	            		var queryData2={
	            				delflag:false
	            				};
	            		jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            	}else{
	            		var queryData2={
	            				delflag:false,
	            				appId:appIdvaule
	            				};
	            		jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            	}
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
	}
}





function getAppData(){
	var ubody = "platform-app/sys/res/appSystem/queryList";
	var uall = urlHost+ubody;
	var postdata ={
			delflag:false
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

//用户类型数据格式化
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

//类型初始化
function typeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "查询";
	}else if(cellvalue == "0"){
		return "修改";
	}else{
		return "";
	}
}

//initJqGrid数据格式化
function statusFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "启用";
	}else if(cellvalue == "0"){
		return "禁用";
	}
}

//格式化样式
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}

$(function(){
	//初始化系统下拉框数据
	getAppData();
	//初始化initJqGrid2
	initJqGrid2();
});

