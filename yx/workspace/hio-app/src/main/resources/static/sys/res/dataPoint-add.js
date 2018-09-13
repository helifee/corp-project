var rowNum=1;
var itemId=window.opener.itemId;


//初始化主键ID
function initUuid(){
	var uBody = "platform-app/sys/uuid/generator/getGuuid";
    var uAll = urlHost + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
         var guuid=data.result;
	    $("#dataPointFrom").find("input[name='id']").val(guuid);
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
	resourceDto.itemId=itemId;
   var uBody = "platform-app/sys/res/dataPoint/save";
   var uAll = urlHost + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(resourceDto),
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
	initUuid();
	$("#dataPointFrom").find("input[name='dateItemId']").val(itemId);
});





