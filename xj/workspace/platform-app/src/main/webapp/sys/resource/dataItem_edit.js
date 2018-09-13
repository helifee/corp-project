/* 数据权限作用域列表
 * @author gyh
 * @date 2017-3-22
 */

//业务对象ID
var dataItemId=window.opener.dataItemId;
//打开方式：0新增，1编辑
var editType=window.opener.editType;
//console.log(editType);
if(editType==1){
	$("#editTitel").text("修改");
}else{
	$("#editTitel").text("新增");
}

//TODO 初始化数据
function initDataItem(){
	var ubody = "sys/res/dataItem/queryDataItemAndPointList";
	var uall = baseUrl+ubody;
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

/*
 * TODO 修改-保存修改数据
 */
function editSaveForm(){
	var resourceArr= $("#dataItemFrom").serializeArray();
	var dataItemDto={};
	for(var i in resourceArr){
		dataItemDto[resourceArr[i].name]=resourceArr[i].value;
	}
	dataItemDto.delflag=false;
	dataItemDto.id=dataItemId;
   var uBody = "sys/res/dataItem/checkRepeat";
   var uAll = baseUrl + uBody;
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
            	   var uBody = "sys/res/dataItem/update/"+dataItemId;
            	   var uAll = baseUrl + uBody;
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

/*
 * TODO 新增-保存新增数据
 */
function addSaveForm(){
	var resourceArr= $("#dataItemFrom").serializeArray();
	var resourceDto={};
		for(var i in resourceArr){
			resourceDto[resourceArr[i].name]=resourceArr[i].value;
		}
		resourceDto.delflag=false;

   var uBody = "sys/res/dataItem/saveDataItem";
   var uAll = baseUrl + uBody;
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
/*
 * 保存-新增或编辑保存
 */
function saveForm(){
	if(editType==1){//编辑
		editSaveForm();
	}else{//新增
		addSaveForm();
	}
}
/*
 * 刷新表格
 */
function add() {	
	var queryData2={
			delflag:false
			};
	window.opener.dataItemGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	closeWin();
};

/*
 * 关闭页面
 */
function closeWin(){
	window.close();
}

/*
 * 初始化系统下拉框数据
 */
function getAppData(){
	var ubody = "sys/res/appSystem/queryList";
	var uall = baseUrl+ubody;
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
        			 if(editType==0){
        				 //新增时默认第一个系统
        				 for(var o in appList){
        					 $("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
        				 }
        			 }
        		 }
        	}else{
        		return data.msg
        	}
     }
	})
}
/*
 * 切换系统下拉框
 */
function selectAppForm(ele){
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.attr("value", "");
	parentIdName.attr("value", "");
  }

/*
 * 初始化主键ID
 */
function initUuid(){
	var uBody = "generator/getGuuid";
    var uAll = baseUrl + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
         var guuid=data.result;
	    $("#dataItemFrom").find("input[name='id']").val(guuid);
     }
	})
}

/*
 * 初始化数据
 */
$(function () {
	//初始化系统下拉框
	getAppData();
	//初始化数据
	if(editType==1){//编辑
		initDataItem();
	}else{//新增
		initUuid();
	}
});





