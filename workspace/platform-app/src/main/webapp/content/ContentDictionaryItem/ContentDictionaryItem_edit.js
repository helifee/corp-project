/**
 * author:wangw
 *
 */
/**
 * 窗体加载数据列表
 */
 $(document).ready(function(){
	//初始化当前页面元素
	 viladationForm();
	 $('#saveBtn').on('click',function(){
		 $('#dictionaryForm').attr('data-validate-success','saveDictionaryForm()');
		 $('#dictionaryForm').submit();
	 });

	 $('#saveAndCreateBtn').on('click',function(){
		 $('#dictionaryForm').attr('data-validate-success','saveDictionaryForm()');
		 $('#dictionaryForm').submit();
	 });
 });
   /**
    * 表单提交
    */
 function saveDictionaryForm(){
	 debugger;
	var operationType = $("#operationType").val();
	var id = $("#id").val();
	var subType="POST";
	if(operationType == 'updateData'){
		subType="put";
       url = baseUrl+"oa/dictionary/contentDictionaryItem/update/"+id;
	}else if(operationType == 'addForm'){
	   url = baseUrl+"oa/dictionary/contentDictionaryItem/save";
	}
	//判断操作类型Start
	var dictionaryArr= $("#dictionaryForm").serializeArray();
	var dictionaryItemDto={};
		for(var i in dictionaryArr){
			if(dictionaryArr[i].name=="isModel"||"isRecord"==dictionaryArr[i].name){
				continue;
			}else{
				dictionaryItemDto[dictionaryArr[i].name]=dictionaryArr[i].value;
			}
		}
		dictionaryItemDto.delflag=false;
		 $.ajax({
             type: subType,
             contentType: "application/json",
             url: url,
             data:JSON.stringify(dictionaryItemDto),
             dataType:"JSON",
             success: function (result) {
            	 if(result) {
                     if(result.success) {
                    	 $.xljUtils.tip('green',"数据保存成功！");
                		 window.opener.location.href=window.opener.location.href;
                         window.close();
                	 }else{
     	        		pop_tip_open("red",result.msg);
     	        	}
                     
            	 }
             },
             error: function (jqXHR, textStatus, errorThrown) {
 				$.xljUtils.getError(jqXHR.status);
 	        }
         });
	}
/**
 * 关闭当前窗口
 */
function closeWindow(){
	window.close();
}
/*
* 定义当前页面打开的样式  增加,查看，修改
*/
function viladationForm(){
	debugger;
	var parentOperationType =  $.xljUtils.getUrlParam('operationType');
	var parentDictionarId = $.xljUtils.getUrlParam('dictionaryId');
	var dictionaryItemId = $.xljUtils.getUrlParam('dictionaryItemId');
	
	$("#operationType").val(parentOperationType);
	//给该 知识目录的父类id赋值
	$("#parentDictionaryId").val(parentDictionarId);
	//viewDate查看页面只读模式
	if(parentOperationType == 'viewData'){
		reloadForm(dictionaryItemId);//加载页面属性
		enableInput();//置灰页面属性
	}else if(parentOperationType == 'updateData'){
		reloadForm(dictionaryItemId);//加载页面属性
	}else if(parentOperationType == 'addForm'){
		initUUId();
	}
}

/**
 * 获取详细信息
 */
function reloadContentTypeInfo(contentTypeId){
	 $.ajax({
	        type: "get",
	        url: baseUrl+"oa/dictionary/contentDictionaryItem/get/" + contentTypeId,
	        dataType: "json",
	        success: function (contentObj) {
	            var obj = contentObj.result;
	            $("#name").val(obj.name);
	            $("#val").val(obj.name);
	        }
	    });
}
/**
 * 获取详细信息
 */
function reloadForm(parentDictionarId){
	 $.ajax({
	        type: "get",
	        url: baseUrl+"oa/dictionary/contentDictionaryItem/get/" + parentDictionarId,
	        dataType: "json",
	        success: function (contentObj) {
	            var obj = contentObj.result;
	            inputValue(obj);
	        }
	    });
}
/**
 * 系统统一入口生成ID
 */
function initUUId(){
  var url = baseUrl+"generator/getGuuid";
	$.ajax({
      type:'get',
      url:url,
      success: function(data) {
       var guuid=data.result;
	    $("#id").val(guuid);
   }
 })
}

/***
 * 加载对象数据
 */
function inputValue(obj){
  
   $("#id").val(obj.id);
   $("#parentDictionaryId").val(obj.parentDictionaryId);
   $("#name").val(obj.name);
   $("#val").val(obj.val);
}

/**
 * 表单属性清空
 */
function clearInput(){
	 $("#code").val("");
   $("#name").val("");
   $("#isModel").val("");
   $("#isRecord").val("");
}
/**
* 页面属性可编辑
*/
function disabledForm(){
	  $("#typeName").attr("disabled",false);
	  $("#parentName").attr("disabled",false);
	  $("#code").attr("disabled",false);
	  $("#name").attr("disabled",false);
}
/**
* 页面属性不可编辑
*/
function enableInput(){
	 $("#name").attr("disabled",true);
	  $("#val").attr("disabled",true);
}