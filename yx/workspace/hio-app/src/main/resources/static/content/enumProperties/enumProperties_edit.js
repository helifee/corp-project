function closeWin() {
	window.close();
}

function pageDisabled(operVal,ids){
	   if(operVal == 'viewData'){
//		  document.getElementById("saveFormId").style.display ="none";
		  viewDate(ids);
	   }else if(operVal == 'updateData'){
		   gridForm(ids);
	   }
}
/**
 * 窗体默认加载数据
 */
$(document).ready(function(){
	//初始化生成大类ID
	initUUId();
	//获取父窗口操作状态
	var parentOperationType = $.xljUtils.getUrlParam('type');
	$("#operationType").val(parentOperationType);
//	pageDisabled(parentOperationType,contentTypeId);
	//渲染页面操作按钮事件及验证
	//viladationForm();
	 $('#saveBtn').on('click',function(){
		 //data-validate-success="saveChildForm();"
		 $('#businessObjectForm').attr('data-validate-success','submitForm()');
		 $('#businessObjectForm').submit();
	 });
	 $('#saveAndCreateBtn').on('click',function(){
		 $('#businessObjectForm').attr('data-validate-success',"submitForm('addORupdate')");
		 $('#businessObjectForm').submit();
	 });

});

//初始化主键ID
function initUUId(){
  var url = baseUrl+"sys/uuid/generator/getGuuid";
	$.ajax({
      type:'get',
      url:url,
      success: function(data) {
       var guuid=data.result;
	    $("#id").val(guuid);
   }
	})
}
/**
 * 表单提交
 */
function saveForm(){
	debugger;
	var url = null;
	var parentOperationType = $("#operationType").val();
	var ids =  $("#contentTypeId").val();
	var subType="POST";
	var msg="数据保存成功!";
	if( parentOperationType =='enumProperties'){
		url =baseUrl+"oa/content/oaEnumProperties/save";
	}else if(parentOperationType =='updateData'){
		subType="put";
		msg="数据修改成功!";
		url =baseUrl+"oa/content/oaEnumProperties/update/"+ids;
	}
	var oaEnumPropertiesDtoForm= $("#businessObjectForm").serializeArray();
	var oaEnumPropertiesDto={};
		for(var i in oaEnumPropertiesDtoForm){
			oaEnumPropertiesDto[oaEnumPropertiesDtoForm[i].name]=oaEnumPropertiesDtoForm[i].value;
		}
   $.ajax({
       type: subType,
       contentType: "application/json",
       url: url,
       data:JSON.stringify(oaEnumPropertiesDto),
       success: function (result) {
          if(result) {
        	  //closeWin();
        	  $.xljUtils.tip('green',msg);

           }else {
        	   $.xljUtils.tip('blue',result.msg);
           }
       }
   });

}


//显示表单
function  gridForm(contentId){
	clearForm();
	 $.ajax({
     	   type: "get",
     	   url: baseUrl+"oa/content/contentType/oaEnumProperties/"+contentId,
     	   dataType:"json",
     	   success: function(contentObj){
     		   var obj  = contentObj.result;
     		   $("#id").val(obj.id);
     		   $("#name").val(obj.name);
     		   $("#code").val(obj.code);
     		   $("#countCapacity").val(obj.countCapacity);
     		   $("select[name='contentType']").val(obj.contentType);
     		   $("#fileSize").val(obj.fileSize);
     		  $('textarea[id=participant]').each(function(i){
         		   $(this).val(obj.list[i].participant);
         	 });
     	   }
     	});
}
//查看表单
function viewDate(contentId){
	clearForm();
	 $.ajax({
   	   type: "get",
   	   url: baseUrl+"oa/content/contentType/oaEnumProperties/"+contentId,
   	   dataType:"json",
   	   success: function(contentObj){
   		   var obj  = contentObj.result;
   		   $("#id").val(obj.id);
   		   $("#name").val(obj.name);
   		   $("#code").val(obj.code);
   		   $("#countCapacity").val(obj.countCapacity);
   		   $("#fileSize").val(obj.fileSize);
   		   $("select[name='contentType']").val(obj.contentType);
   		  $('textarea[id=participant]').each(function(i){
       		    $(this).val(obj.list[i].participant);
       	 });
   	   }
   	});
	 displayElement();
}

function displayElement(){
	  $("#name").attr("disabled",true);
	  $("#code").attr("disabled",true);
	  $("#countCapacity").attr("disabled",true);
	  $("#contentType").attr("disabled",true);
	  $("#fileSize").attr("disabled",true);
	  $('textarea[name="participant"]').each(function(){
	        $(this).attr("disabled",true);
     });
}

function clearForm(){
	   $("#id").val("");
	   $("#name").val("");
	   $("#code").val("");
	   $("#countCapacity").val("");
	   $("#fileSize").val("");
}

/**
 * 大类保存完之后，同时注册菜单，直接生成二级菜单
 */
function addMenuForm(ContentTypeAnDAuthorDto){
	var resourceDto={};
	debugger;
	resourceDto['id']=ContentTypeAnDAuthorDto.id;
	resourceDto['appId']="9d6cba61c4b24a5699c339a49471a0e7";
	resourceDto['code']=ContentTypeAnDAuthorDto.code;
	resourceDto['name']=ContentTypeAnDAuthorDto.name;
	resourceDto['parentName']="协同工作";
	resourceDto['isinventedmenu']="0";
	resourceDto['status']="1";
	resourceDto['icon']=ContentTypeAnDAuthorDto.icon;
	resourceDto['isoutmenu']="0";
	resourceDto['url']="/platform-app/content/oaEnumProperties/contentRowType_list.html?contentTypeId="+ContentTypeAnDAuthorDto.id;
	resourceDto['openmode']="1";
	resourceDto['sort']=4;
	resourceDto['remark']=ContentTypeAnDAuthorDto.description;

	resourceDto.delflag=false;

	var uBody = "sys/res/resource/save";
	var uAll = serviceUrl + uBody;
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
					pop_tip_open("green","数据保存成功");
				}
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});

}


