var zTreeObj;
var urlBody = "";
var urlAll = "";
var jqGrid2;

function initJqGrid2(){
//	http://192.168.3.131:8080/platform-app/sys/res/appSystem/queryList

	var ubody = "platform-app/sys/res/appSystem/queryList";
	var uall = urlHost+ubody;
    //创建jqGrid组件
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            postData:{"orgId":"000fbb2eef694532ab9d8orgorg03"},
            postData:{delflag:"0"},
            datatype : "json", 
            height:400,
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                 {name : 'code',label : '系统编码',width : 80,align : "center"},
                 {name : 'name',label : '显示名称',width : 80,align : "center"},
                 {name : 'fullName',label : '全称',width : 120,align : "center"},
                 {name : 'url',label : '系统首页URL',width : 200,align : "center"},
                 {name : 'isextsys',label : '是否外系统',width : 100,align : "center", formatter:isextsysFmatter},
                 {name : 'status',label : '是否启用',width : 80,align : "center", formatter:statusFmatter,cellattr: addCellAttr},
                 {name : 'icon',label : '图标文件',width : 200,align : "center"},
                 {name : 'openmode',label : '打开方式',width : 80,align : "center", formatter:openmodeFmatter},
                 {name : 'remark',label : '说明',width : 310,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
//            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
//            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            ondblClickRow:function(rowid){
            	updateAppId = rowid;
            	window.open("appupdate.html");
            },
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}


//增加业务系统
function addApp(){
	window.open("appadd.html");
}


var updateAppId;
//修改业务系统
function updateApp(){
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择业务系统");
	}else{
		updateAppId = ids;
		window.open("appupdate.html");
	}
	
	
}
//修改业务系统状态
function updatestatus(status){
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择业务系统");
	}else{
		var updatedata ={
				status:status,
		};
		var uBody = "platform-app/sys/res/appSystem/update/"+ids;
	    var uAll = urlHost + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        success: function(json) {
	            if(json.success == true){
	            	alert(json.msg);
	            	var queryData2={
	            			delflag:false
	            			};
	            	jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            	jqGrid2.jqGrid('setSelection',ids);
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
	}
	
}


//删除app业务系统
function deleteApp(){
	//多选框获取IDS
//	var ids=jqGrid2.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择业务系统");
	}else{
		var uBody = "platform-app/sys/res/appSystem/deletePseudoBatch/"+ids;
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
	            	var queryData2={
	            			delflag:false
	            			};
	            	jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
	}
}
//是否外系统格式化
function isextsysFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "";
	}
}

//是否启用格式化
function statusFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "启用";
	}else if(cellvalue == "0"){
		return "禁用";
	}else{
		return "";
	}
}
//打开方式格式化
function openmodeFmatter(cellvalue, options, rowObject) {
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
	//初始化initJqGrid2
	initJqGrid2();
});

