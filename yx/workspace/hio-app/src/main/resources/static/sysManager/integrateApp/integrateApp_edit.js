
var type= $.xljUtils.getUrlParam('type');
$(function () {
	pageInit();
	if(type=="add"){
		$("#integrateAppTitle").html("应用配置-新增");
		document.title="应用配置-新增";
	}else{
		$("#integrateAppTitle").html("应用配置-修改");
		document.title="应用配置-修改";
	}
	$("#saveBtn").on('click',function(){
		$("#integrateAppForm").attr("data-validate-success","saveForm('over')");
		$("#integrateAppForm").submit();
	});
	
	$("#saveAndCreateBtn").on('click',function(){
		$("#integrateAppForm").attr("data-validate-success","saveForm('continue')");
		$("#integrateAppForm").submit();
	});
	
	$("#getTokenBtn").on('click',function(){
		$.xljUtils.xljAjax({
			type:'GET',
			contentType:'application/json',
			url:'http://127.0.0.1:8080/platform-app/sys/thirdPartyAuthentication/accessToken?userInfo=zl@xinju&appId=123&appSecret=123',
			success:function(data){
				console.log(JSON.stringify(data));
			}
		});
	});
	
	$("#redirectBtn").on('click',function(){
		$.xljUtils.xljAjax({
			type:'GET',
			url:'http://127.0.0.1:8080/platform-app/sys/thirdPartyAuthentication/redirect?token=af7c47170fbf40e796af1217931a9122&redirectUri=' + encodeURIComponent('http://127.0.0.1:8080/platform-app/party/userConfig/get/c4efcf222d0e4f04952a84e6888cfff2'),
			success:function(data){
				console.log(JSON.stringify(data));
			}
		});
	});
	
	
	
    });

/**
 * author:liuf
 * describe:加载完毕后执行
 * param: null
 */
function pageInit(){
	if(type=="add"){
		 var uuid=getuuid();
		$("#IntegrateAppId").val(uuid);
	}else{
		var id = $.xljUtils.getUrlParam('id');
		getIntegrateAppData(id)
	}
}
/**
 * author:liuf
 * describe:获取uuid
 * param: null
 */
function getuuid(){
	$.ajax({
		beforeSend:function(){
			var guuid="";
		},
        type:'get',
        async:false,
		url:serviceUrl+'sys/uuid/generator/getGuuid?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	 guuid=data.result;
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        },
        complete:function(){
        }
	});
	return guuid;
}
/**
 * author:liuf
 * describe:编辑回显数据
 * param: null
 */
function getIntegrateAppData(id){
	   $.ajax({

	       url:serviceUrl+"sys/party/integrateApp/get/"+id+'?time='+Math.random(),

	       type:'get',
	       success: function(data) {
	    	   if(data.success){
	    		   var integrateAppData=data.result;
	    		     $("input[name='id']").val(integrateAppData.id);
	    		     $("input[name='name']").val(integrateAppData.name);
	    		     $("input[name='code']").val(integrateAppData.code);
	    		     $("input[name='dcount']").val(integrateAppData.dcount);
	    		     $("input[name='secret']").val(integrateAppData.secret);
	    		     $("input[name='addr']").val(integrateAppData.addr);
	    		     $("input[name='status'][value="+integrateAppData.status+"]").attr("checked",true);//状态
	    		     $("input[name='concurrencyVersion']").val(integrateAppData.concurrencyVersion);
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
 * describe:新增 修改数据
 * param: null
 */
function saveForm(op){
	var integrateAppArr= $("#integrateAppForm").serializeArray();
	var integrateAppDto={};
		for(var i in integrateAppArr){
			integrateAppDto[integrateAppArr[i].name]=integrateAppArr[i].value;
		}
		integrateAppDto.delflag=0;
		integrateAppDto.createDate=new Date().getTime();
		integrateAppDto.updateDate=new Date().getTime();
		if(type=="add"){
			   $.ajax({

			       url:serviceUrl+"sys/party/integrateApp/save",

			       data:JSON.stringify(integrateAppDto),
			       type:'POST',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData) {
			           if(resultData) {
			               var successFlag = resultData.success;
			               var result = resultData.result;
			               var msg = resultData.msg;
			               if(successFlag) {
			                   if(op=="over"){
			                	   window.opener.reloadGrid();
			                	   window.close();
			                   }else if(op=="continue"){
			                	   window.opener.reloadGrid();
			                	   $("#integrateAppForm")[0].reset();
			                	   var uuid=getuuid();
			                	   $("#IntegrateAppId").val(uuid);
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
			var integrateAppId=$("#IntegrateAppId").val();
			   $.ajax({

			       url:serviceUrl+"sys/party/integrateApp/update/"+integrateAppId,

			       data:JSON.stringify(integrateAppDto),
			       type:'PUT',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData) {
			           if(resultData) {
			               var successFlag = resultData.success;
			               var result = resultData.result;
			               var msg = resultData.msg;
			               if(successFlag) {
			            	   if(op=="over"){
			            		   window.opener.reloadGrid();
			                	   window.close();
			                   }else if(op=="continue"){
			                	   window.opener.reloadGrid();
			                	   $("#integrateAppForm")[0].reset();
			                	   var uuid=getuuid();
			                	   $("#IntegrateAppId").val(uuid);
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
