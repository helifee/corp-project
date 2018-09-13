var rowNum=1;
//业务对象ID
var dataItemId=window.opener.dataItemId;
//console.log(dataItemId);
//var dataItemId="d6bd07c6a6f1415fa7512ccd106fc5f4";

//TODO 初始化数据
function initDataItem(){
	var ubody = "http://127.0.0.1:9999/platform-app/sys/res/dataItem/queryDataItemAndPointList";
	var uall =  ubody;
	var postdata ={
			delflag:false,
			id:dataItemId
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
        			$("#appId").append("<option value='"+item.appId+"'>"+item.appName+"</option>");
        			$("#ctrlCode").val(item.ctrlCode);
        			$("#ctrlName").val(item.ctrlName);
        			$("#itemCode").val(item.itemCode);
        			$("#itemName").val(item.itemName);
        			$("#remark").val(item.remark);
        		 }
        	}else{
        		return data.msg
        	}
     }
	})
}

//TODO 保存修改数据
function saveForm(){
	var resourceArr= $("#dataItemFrom").serializeArray();
	var dataItemDto={};
	for(var i in resourceArr){
		dataItemDto[resourceArr[i].name]=resourceArr[i].value;
	}
	dataItemDto.delflag=false;
	dataItemDto.id=dataItemId;
   var uBody = "platform-app/sys/res/dataItem/checkRepeat";
   var uAll = urlHost + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(dataItemDto),
       type:'POST',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData ) {
           if(resultData) {
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   //保存数据
            	   var uBody = "platform-app/sys/res/dataItem/update/"+dataItemId;
            	   var uAll = urlHost + uBody;
            	   $.ajax({
            	       url:uAll,
            	       data:JSON.stringify(dataItemDto),
            	       type:'PUT',
            	       contentType:'application/json',
            	       dataType:'JSON',
            	       success:function (resultData ) {
            	           if(resultData) {
            	               var successFlag = resultData.success;
            	               var result = resultData.result;
            	               var msg = resultData.msg;
            	               if(successFlag) {
            	                   alert('数据保存成功！');
            	                   add();
            	               }else {
            	            	   alert(msg);
            	               }
            	           }
            	       }
            	   });
               }else {
            	   alert(msg);
               }
           }
       }
   });
}

//刷新表格
function add() {	
	var queryData2={
			delflag:false
			};
	window.opener.jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	closeWin();
};

function closeWin(){
	window.close();
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
        			 for(var o in appList){
        				 /*if(o == 0){
        					 getResourceTree(appList[o].id);
        				 }*/
        				 $("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
        			 }
        		 }
        	}else{
        		return data.msg
        	}
     }
	})
}

function SelectAppForm(ele){
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.attr("value", "");
	parentIdName.attr("value", "");
//	getResourceTree(ele.value);
  }


$(function () {
	getAppData();
	initDataItem();
});





