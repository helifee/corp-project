var type=$.xljUtils.getUrlParam('type');
var parentId=$.xljUtils.getUrlParam('parentId');
$(function () {
	pageInit();
	  if(type=="add"){
		  $("#payTypeTitle").html("付款款项类型-新增");
		   document.title="付款款项类型-新增";
	  }else{
		  $("#payTypeTitle").html("付款款项类型-修改");
		   document.title="付款款项类型-修改";
	  }
	  $("#saveBtn").on('click',function(){
		  $("#payTypeForm").attr("data-validate-success","saveForm('over')");
		  $("#payTypeForm").submit();
	  });
	  
	  $("#saveAndCreateBtn").on('click',function(){
		  $("#payTypeForm").attr("data-validate-success","saveForm('continue')");
		  $("#payTypeForm").submit();
	  });
    });
function pageInit(){
	if(type=="add"){
		getuuid();
		selectPayParent("");
		if(parentId){
			 $("#selectPayParent").val(parentId);
			 changeParentCode();
		}
	}else{
		var id=$.xljUtils.getUrlParam('id'); 
		selectPayParent(id);
		getPayTypeData(id);
	
	}
}
function selectPayParent(id){
	  $.ajax({
          type:'POST',
          url:serviceUrl+'sys/base/payType/payTypeParanetList',
          dataType:'json',
          contentType:'application/json',
          async:false,
          data:"{}",
          success: function(json) {
        	  if(json.success){
        		  var data=json.result;
        		 if(data){
        			 if(!id){
        				 for(var o in data){
        					 $("#selectPayParent").append("<option value="+data[o].id+" code="+data[o].code+">"+data[o].name+"</option>")
        				 }
        			 }else{
        				 for(var o in data){
        					 if(data[o].id!=id){
        						 $("#selectPayParent").append("<option value="+data[o].id+" code="+data[o].code+">"+data[o].name+"</option>")
        					 }
        				 }
        			 }
        		 } 
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
 * describe:显示父级编码
 * param: null
 */
function changeParentCode(){
	 $("#parentCode").empty();
	 var code=$("#selectPayParent").find("option:selected").attr("code");
	 $("#parentCode").val(code);
}
/**
 * author:liuf
 * describe:新增 获得UUID
 * param: null
 */
function getuuid(){
	$.ajax({
        type:'get',
        url:serviceUrl+"sys/uuid/generator/getGuuid?time="+Math.random(),
        success: function(data) {
        	if(data.success){
        		var guuid=data.result;
        		$("#payTypeForm").find("input[name='id']").val(guuid);
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
function getPayTypeData(id){
	$.ajax({
        type:'get',
        url:serviceUrl+"sys/base/payType/get/"+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	var  payType=data.result;
        		$("select[name='parentId']").val(payType.parentId);
        		$("input[name='id']").val(payType.id);
        		$("input[name='sort']").val(payType.sort);
        		$("input[name='name']").val(payType.name);
        		$("input[name='code']").val(payType.code);
        		$("input[name='status'][value="+payType.status+"]").attr("checked",true);//状态
				$('input[name="status"]').attr('disabled',true);
        		$("textarea[name='remark']").html(payType.remark);
        		$("input[name='concurrencyVersion']").val(payType.concurrencyVersion);
        		
        	}else{
        		pop_tip_open("red",data.msg);
        	}
        },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        },
	        complete:function(){
	       	 changeParentCode();
	        }
	});
}
/**
 * author:liuf
 * describe:保存数据
 * param: null
 */
function saveForm(op){
	var payTypeArr= $("#payTypeForm").serializeArray();
	var payTypeDto={};
		for(var i in payTypeArr){
			payTypeDto[payTypeArr[i].name]=payTypeArr[i].value;
		}
		if(payTypeDto.parentId){
			payTypeDto.prefixId=payTypeDto.parentId+"-"+payTypeDto.id;
		}else{
			payTypeDto.prefixId=payTypeDto.id;
		}
		payTypeDto.delflag=0;
		if($("#parentCode").val()){
			payTypeDto.code=$("#parentCode").val()+"."+payTypeDto.code;
		}
		if(type=="add"){
			$.ajax({
				url:serviceUrl+"sys/base/payType/save",
				data:JSON.stringify(payTypeDto),
				type:'POST',
				contentType:'application/json',
				dataType:'JSON',
				success:function (resultData ) {
					if(resultData) {
						var successFlag = resultData.success;
						var result = resultData.result;
						var msg = resultData.msg;
						if(successFlag) {
							if(op=="over"){
								if(payTypeDto.parentId){
									window.opener.reloadGrid(payTypeDto.parentId);
								}else{
									window.opener.reloadGrid(payTypeDto.id);
								}
								window.close();
							}else if(op=="continue"){
								if(payTypeDto.parentId){
									window.opener.reloadGrid(payTypeDto.parentId);
								}else{
									window.opener.reloadGrid(payTypeDto.id);
								}
								pop_tip_open("green","保存成功");
								$("#payTypeForm")[0].reset();
								getuuid();
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
			var ids=payTypeDto.id;
			   $.ajax({
			       url:serviceUrl+"sys/base/payType/update/"+ids,
			       data:JSON.stringify(payTypeDto),
			       type:'put',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData) {
			           if(resultData) {
			               if(resultData.success) {
			            		if(op=="over"){
			            			if(payTypeDto.parentId){
										window.opener.reloadGrid(payTypeDto.parentId);
									}else{
										window.opener.reloadGrid(payTypeDto.id);
									}
									window.close();
								}else if(op=="continue"){
									if(payTypeDto.parentId){
										window.opener.reloadGrid(payTypeDto.parentId);
									}else{
										window.opener.reloadGrid(payTypeDto.id);
									}
									pop_tip_open("green","保存成功");
									$("#payTypeForm")[0].reset();
									getuuid();
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
