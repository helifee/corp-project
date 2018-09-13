var urlBody = "";
var urlAll = "";
var jqGrid2;
var dataItemId;


//TODO 加载表格
function initJqGrid2(){
	var ubody = "platform-app/sys/res/dataItem/queryDataItemAndPointList";
	var uall = urlHost+ubody;
	var postdata ={
			delflag:false
	};
	var appId = $('#appId option:selected').val();
	if(appId !=null){
		postdata.appId=appId;
	}
	
    //创建jqGrid组件
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            data:JSON.stringify(postdata),
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
                 {name : 'appName',label : '所属系统名称',width : 80,align : "center"},
                 {name : 'ctrlCode',label : '作用域编号',width : 80,align : "center"},
                 {name : 'ctrlName',label : '作用域名称',width : 80,align : "center"},
                 {name : 'itemCode',label : '对象编号',width : 80,align : "center"},
                 {name : 'itemName',label : '业务对象',width : 80,align : "center"},
                 {name : 'pointIds',label : '控制点IDs',width : 80,align : "center",hidden : true},
                 {name : 'pointNames',label : '控制点',width : 230,align : "center"},
                 {name : 'remark',label : '说明',width : 280,align : "center"}
            ],
            rowNum : 20,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            //pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

//切换系统重新加载表格
function SelectDataItemForm(ele){
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


//编辑控制点
function editDataPoint(){
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择一条业务对象");
	}else{
		dataItemId = ids;
		window.open("dataPoint-list.html");
	}
}

//新增作用域业务对象
function addDataItem(){
	window.open("dataItem-add.html");
}

//修改业务对象
function editDataItem(){
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择一条业务对象");
	}else{
		dataItemId = ids;
		window.open("dataItem-edit.html");
	}
}

//删除业务对象
function deleteDataItem(){
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择一条业务对象");
	}else{
		var uBody = "platform-app/sys/res/dataItem/update/"+ids;
	    var uAll = urlHost + uBody;
	    var postJson={
	    		id:ids,
	    		delflag:true
	    };
		$.ajax({
	        type:'PUT',
	        url:uAll,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(postJson),
	        success: function(json) {
	        	if(json.success == true){
	            	alert('删除成功');
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


//初始化系统下拉框
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

