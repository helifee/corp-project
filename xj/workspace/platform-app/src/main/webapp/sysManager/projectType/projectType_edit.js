var type=$.xljUtils.getUrlParam('type');
var parentId=$.xljUtils.getUrlParam('parentId');
$(function () {
	pageInit();
	  if(type=="add"){
		  $("#projectTypeTitle").html("产品类型-新增");
		   document.title="产品类型-新增";
	  }else{
		  $("#projectTypeTitle").html("产品类型-修改");
		   document.title="产品类型-修改";
	  }
	  $("#saveBtn").on('click',function(){
		  $("#baseProjectType").attr("data-validate-success","saveForm('over')");
		  $("#baseProjectType").submit();
	  });
	  
	  $("#saveAndCreateBtn").on('click',function(){
		  $("#baseProjectType").attr("data-validate-success","saveForm('continue')");
		  $("#baseProjectType").submit();
	  });
    });
function pageInit(){
	if(parentId&&parentId!="null"){
		$("#parentId").val(parentId);
		$.ajax({
	        type:'get',
	        url:hostUrl+"sys/base/baseProjectType/get/"+parentId+'?time='+Math.random(),
	        success: function(data) {
	        	if(data.success){
	        		$("#parentName").val(data.result.name);
	        		$("#parentIdLabel").val(data.result.code);
	        	}else{
	        		pop_tip_open("red",data.msg);
	        	}
	        },
				error: function (jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
		        }
		});
		
	}
	if(type=="add"){
		getuuid();
	}else{
		var id=$.xljUtils.getUrlParam('id'); 
		getProjectTypeData(id);
	}
}
/**
 * author:liuf
 * describe:新增 获得UUID
 * param: null
 */
function getuuid(){
	$.ajax({
        type:'get',
        url:hostUrl+"generator/getGuuid?time="+Math.random(),
        success: function(data) {
        	if(data.success){
        		var guuid=data.result;
        		$("#baseProjectType").find("input[name='id']").val(guuid);
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	})
}
/**
 * author:liuf
 * describe:修改 回显数据
 * param: null
 */
function getProjectTypeData(id){
	$.ajax({
        type:'get',
        url:hostUrl+"sys/base/baseProjectType/get/"+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	var baseProjectType=data.result;
        		$("input[name='parentId']").val(baseProjectType.parentId);
        		$("input[name='id']").val(baseProjectType.id);
        		$("input[name='sort']").val(baseProjectType.sort);
        		$("input[name='name']").val(baseProjectType.name);
        		$("input[name='code']").val(baseProjectType.code);
        		$("input[name='status'][value="+baseProjectType.status+"]").attr("checked",true);//状态
				$('input[name="status"]').attr('disabled',true);
        		$("textarea[name='remark']").html(baseProjectType.remark);
        	}else{
        		pop_tip_open("red",data.msg);
        	}
        },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        }
	});
}
/**
 * author:liuf
 * describe:保存数据
 * param: null
 */
function saveForm(op){
	var baseProjectType= $("#baseProjectType").serializeArray();
	var baseProjectTypeDto={};
		for(var i in baseProjectType){
			if(baseProjectType[i].name=="disabledDate"||"createDate"==baseProjectType[i].name||"updateDate"==baseProjectType[i].name){
				baseProjectTypeDto[baseProjectType[i].name]=new Date().getTime();;
			}else{
				if(baseProjectType[i].name=="parentId"&&baseProjectType[i].value==""){
				}else{
					baseProjectTypeDto[baseProjectType[i].name]=baseProjectType[i].value;
				}
			}
		}
		baseProjectTypeDto.delflag=0;
		if(type=="add"){
			$.ajax({
				url:hostUrl+"sys/base/baseProjectType/save",
				data:JSON.stringify(baseProjectTypeDto),
				type:'POST',
				contentType:'application/json',
				dataType:'JSON',
				success:function (resultData ) {
					if(resultData) {
						//toastr.success('数据保存成功！');
						var successFlag = resultData.success;
						var result = resultData.result;
						var msg = resultData.msg;
						if(successFlag) {
							if(op=="over"){
								window.opener.reloadGrid();
								window.close();
							}else if(op=="continue"){
								$.xljUtils.tip('green','保存成功！');
								window.opener.reloadGrid();
								var name=$("#parentName").val();
								var parentId=$("#parentId").val();
								var parentIdLabel=$("#parentIdLabel").val();
								$("#baseProjectType")[0].reset();
								getuuid();
								$("#parentName").val(name);
								$("#parentIdLabel").val(parentIdLabel);
								if(parentId){
									$("#parentId").val(parentId);
								}
							}
						}else {
							pop_tip_open("red",resultData.msg);
						}
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
		        }
			});
		}else{
			var ids=baseProjectTypeDto.id;
			   $.ajax({
			       url:hostUrl+"sys/base/baseProjectType/update/"+ids,
			       data:JSON.stringify(baseProjectTypeDto),
			       type:'put',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData) {
			           if(resultData) {
			               if(resultData.success) {
			            		if(op=="over"){
			            			window.opener.reloadGrid();
									window.close();
								}else if(op=="continue"){
									$.xljUtils.tip('green','保存成功！');
									window.opener.reloadGrid();
									var name=$("#parentName").val();
									var parentId=$("#parentId").val();
									var parentIdLabel=$("#parentIdLabel").val();
									$("#baseProjectType")[0].reset();
									getuuid();
									$("#parentName").val(name);
									$("#parentIdLabel").val(parentIdLabel);
									if(parentId){
										$("#parentId").val(parentId);
									}
									type="add";
								}
			               }else {
			            		pop_tip_open("red",resultData.msg);
			               }
			           }
			       },
					error: function (jqXHR, textStatus, errorThrown) {
						$.xljUtils.getError(jqXHR.status);
			        }
			   });
		}
	
}
/**
 * author:liuf
 * describe:关闭页面
 * param: null
 */

function closed(){
	 window.close();
}
