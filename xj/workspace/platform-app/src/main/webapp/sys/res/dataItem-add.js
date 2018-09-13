var rowNum=1;
var zTreeObj;



//初始化主键ID
function initUuid(){
	var uBody = "platform-app/generator/getGuuid";
    var uAll = urlHost + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
         var guuid=data.result;
	    $("#dataItemFrom").find("input[name='id']").val(guuid);
     }
	})
}

//保存新增数据
function saveForm(){
	var resourceArr= $("#dataItemFrom").serializeArray();
	var resourceDto={};
		for(var i in resourceArr){
			/*if(resourceArr[i].name=="registrationDate"||"createDate"==resourceArr[i].name||"updateDate"==resourceArr[i].name|| "disabledDate"==resourceArr[i].name){

			}else if(resourceArr[i].name=="parentIdName" || resourceArr[i].name=="upLeaderIdName" || resourceArr[i].name=="leaderIdName"){
				
			}else{*/
				resourceDto[resourceArr[i].name]=resourceArr[i].value;
			//}
		}
		resourceDto.delflag=false;

   var uBody = "platform-app/sys/res/dataItem/saveDataItem";
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
//刷新业务对象表格
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
//切换系统
function SelectAppForm(ele){
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.attr("value", "");
	parentIdName.attr("value", "");
//	getResourceTree(ele.value);
  }


$(function () {
	//初始化
	getAppData();
	initUuid();
});





