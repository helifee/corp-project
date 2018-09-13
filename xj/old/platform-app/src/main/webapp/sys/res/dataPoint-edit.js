var rowNum=1;
var pointId=window.opener.dataPointId;


//TODO 初始化数据
function initDataPoint(){
	var ubody = "platform-app/sys/res/dataPoint/get/"+pointId;
	var uall = urlHost+ubody;
	/*var postdata ={
			delflag:false,
			id:pointId
	};*/
	$.ajax({
        type:'GET',
        url:uall,
        dataType:'json',
//        contentType:'application/json',
//        data:JSON.stringify(postdata),
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			var item=data.result;
        			$("#id").val(item.id);
        			$("#itemId").val(item.itemId);
        			$("#code").val(item.code);
        			$("#name").val(item.name);
        			if(item.type=='1'){
        				$("#dataPointFrom input[name='type'][value='1']").attr("checked",true);
        				$("#url").attr("disabled",true);
        				$("#dataPointFrom input[name='model']").attr("disabled",true);
        			}else if(item.type=='2'){
        				$("#dataPointFrom input[name='type'][value='2']").attr("checked",true);
        				$("#url").attr("disabled",false);
        				$("#dataPointFrom input[name='model']").attr("disabled",false);
        			}
        			$("#busObjId").val(item.busObjId);
        			$("#url").val(item.url);
        			if(item.model=='1'){
        				$("#dataPointFrom input[name='model'][value='1']").attr("checked",true);
        			}else if(item.model=='2'){
        				$("#dataPointFrom input[name='model'][value='2']").attr("checked",true);
        			}
        			$("#remark").val(item.remark);
        		 }
        	}else{
        		return data.msg
        	}
     }
	})
}

//保存新增数据
function saveForm(){
	var resourceArr= $("#dataPointFrom").serializeArray();
	var resourceDto={};
	for(var i in resourceArr){
		resourceDto[resourceArr[i].name]=resourceArr[i].value;
	}
	resourceDto.delflag=false;
	//所属业务对象ID
   var uBody = "platform-app/sys/res/dataPoint/update/"+pointId;
   var uAll = urlHost + uBody;
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
                   alert('数据保存成功！');
                   add();
               }else {
            	   alert(msg);
               }
           }
       }
   });
	
}

//切换控制点类型
function changeType(){
	var checkedType=$("#dataPointFrom").find("input[name='type']:checked").val();
	if(checkedType=="1"){
		$("#url").attr("disabled",true);
		$("#dataPointFrom input[name='model']").attr("checked",false);
		$("#dataPointFrom input[name='model']").attr("disabled",true);
	}else{
		$("#url").attr("disabled",false);
		$("#dataPointFrom input[name='model']").attr("disabled",false);
	}
	
};

//刷新控制点表格
function add() {	
	var queryData2={
			delflag:false
			};
	window.opener.jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	window.opener.opener.jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	closeWin();
};
function closeWin(){
	window.close();
}

$(function () {
	//初始化
	initDataPoint();
});





