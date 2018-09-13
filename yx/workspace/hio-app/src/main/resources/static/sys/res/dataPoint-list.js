var dateItemId=window.opener.dataItemId;
//console.log(dateItemId);
var urlBody = "";
var urlAll = "";
var jqGrid2;



//TODO 加载表格
function initJqGrid2(){
	var ubody = "platform-app/sys/res/dataPoint/queryByPram";
	var uall = urlHost+ubody;
	var postdata ={
			delflag:false,
			itemId:dateItemId
	};
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
                 {name : 'code',label : '控制点编号',width : 80,align : "center"},
                 {name : 'name',label : '控制点名称',width : 80,align : "center"},
                 {name : 'type',label : '控制点类型',width : 80,align : "center",formatter:typeFormatter},
                 {name : 'model',label : '打开方式',width : 80,align : "center",formatter:modelFormatter},
                 {name : 'url',label : 'URL',width : 80,align : "center"},
                 {name : 'remark',label : '备注说明',width : 80,align : "center"}
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
//控制点类型
function typeFormatter(cellvalue, options, rowObject){
	if(cellvalue == "1"){
		return "普通";
	}else if(cellvalue == "2"){
		return "引用";
	}
}
//打开方式
function modelFormatter(cellvalue, options, rowObject){
	if(cellvalue == "1"){
		return "树型";
	}else if(cellvalue == "2"){
		return "列表";
	}else{
		return "";
	}
}

//增加控制点
var itemId;//作用域业务对象ID
function addDataPoint(){
	itemId=dateItemId;
	window.open("dataPoint-add.html");
}

//修改控制点
var dataPointId;
function updateDataPoint(){
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择一个控制点");
	}else{
		dataPointId = ids;
		window.open("dataPoint-edit.html");
	}
	
}


//删除控制点
function deleteDataPoint(){
	var ids=jqGrid2.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择控制点");
	}else{
		var postJson={};
		postJson.ids=ids;
		//resourceDto.delflag=true;//逻辑删除
		var uBody = "http://127.0.0.1:9999/platform-app/sys/res/dataPoint/deleteByIds";
	    var uAll =  uBody;
		$.ajax({
	        type:'PUT',
	        url:uAll,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(postJson),
	        success: function(json) {
	        	if(json.success == true){
	            	alert('删除成功！');
	            	var queryData2={
	            			delflag:false
	            	};
	            	jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            	window.opener.jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
	}
}


//TODO 初始化作用域业务对象信息
function initDataItem(){
	var ubody = "platform-app/sys/res/dataItem/queryDataItemAndPointList";
	var uall = urlHost+ubody;
//	dateItemId=window.opener.dataItemId;
//	dateItemId="d6bd07c6a6f1415fa7512ccd106fc5f4";
	var postdata ={
			id:dateItemId
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
        			 var item=data.result[0];
        			 $("#itemId").text(item.id);
        			 $("#appId").text(item.appId);
        			 $("#appName").text(item.appName);
        			 $("#ctrlCode").text(item.ctrlCode);
        			 $("#ctrlName").text(item.ctrlName);
        			 $("#itemCode").text(item.itemCode);
        			 $("#itemName").text(item.itemName);		 
        			 $("#remark").text(item.remark);		 
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
	initDataItem();
	//初始化initJqGrid2
	initJqGrid2();
});

