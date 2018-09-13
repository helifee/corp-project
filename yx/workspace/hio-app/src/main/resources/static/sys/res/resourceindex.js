var zTreeObj;
var urlBody = "";
var urlAll = "";
var jqGrid2;

function initJqGrid2(){
//	http://192.168.3.131:8080/platform-app/sys/res/appSystem/queryList

	var ubody = "platform-app/sys/res/resource/queryList";
	var uall = urlHost+ubody;
    //创建jqGrid组件
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{delflag:false,appId:""},
            datatype : "json", 
            height:420,
            jsonReader : {
                root:"result"
            },
            autowidth:true,
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : 'id',width : 55,align : "center",hidden : true},
                 {name : 'appName',label : '所属系统',width : 80,align : "center"},
                 {name : '11level',label : '菜单级次',width : 80,align : "center"},
                 {name : 'code',label : '菜单编码',width : 120,align : "center"},
                 {name : 'name',label : '菜单名称',width : 200,align : "center"},
                 {name : 'parentName',label : '上级菜单',width : 200,align : "center"},
                 {name : 'isinventedmenu',label : '是否虚拟菜单',width : 100,align : "center",formatter:isinventedmenuFormatter},
                 {name : 'status',label : '状态',width : 80,align : "center", formatter:statusFmatter,cellattr: addCellAttr},
                 {name : 'icon',label : '图标',width : 80,align : "center"},
                 {name : 'isoutmenu',label : '是否第三方菜单',width : 200,align : "center",formatter:isoutmenuFormatter},
                 {name : 'url',label : 'URL',width : 200,align : "center"},
                 {name : 'openmode',label : '打开方式',width : 80,align : "center",formatter:openmodeFormatter},
                 {name : 'remark',label : '说明',width : 310,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
//            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
//            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            ondblClickRow:function(rowid){
            	updateResourceId = rowid;
            	window.open("resourceupdate.html");
            },
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

function SelectAppForm(ele){
	if(ele.value == ""){
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
				appId:ele.value
				};
		jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	}
	
  }





//增加菜单
function addResource(){
	window.open("resourceadd.html");
}

//修改菜单
var updateResourceId;
function updateResource(){
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择菜单");
	}else{
		updateResourceId = ids;
		window.open("resourceupdate.html");
	}
	
}



//删除菜单
function deleteResource(){
	//多选框获取IDS
//	var ids=jqGrid2.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择菜单");
	}else{
		var uBody = "platform-app/sys/res/resource/deletePseudoBatch/"+ids;
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

//initJqGrid数据格式化
function statusFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "启用";
	}else if(cellvalue == "0"){
		return "禁用";
	}
}

//是否虚拟菜单格式化
function isinventedmenuFormatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "";
	}
}

//是否第三方菜单格式化
function isoutmenuFormatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "";
	}
}

//打开方式格式化
function openmodeFormatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "内部打开";
	}else if(cellvalue == "0"){
		return "新窗口打开";
	}else{
		return "";
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

