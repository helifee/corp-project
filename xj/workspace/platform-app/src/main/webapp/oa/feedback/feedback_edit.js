var type= $.xljUtils.getUrlParam('type');
$(function () {
	pageInit();
	if(type=="add"){
		$("#settlementTradesTitle").html("问题反馈-新增");
		document.title="问题反馈-新增";
	}else{
		$("#settlementTradesTitle").html("问题反馈-修改");
		document.title="问题反馈-修改";
	}
	$("#saveBtn").on('click',function(){
		$("#settlementTrades").attr("data-validate-success","saveForm('over')");
		$("#settlementTrades").submit();
	});
	
	$("#saveAndCreateBtn").on('click',function(){
		$("#settlementTrades").attr("data-validate-success","saveForm('continue')");
		$("#settlementTrades").submit();
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
		$("#trades").val(uuid);
		getUserInfo();
	}else{
		var id = $.xljUtils.getUrlParam('id');
		getSettlementTradesData(id)
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
		url:hostUrl+'generator/getGuuid?time='+Math.random(),
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

function getUserInfo(){
	$("#createDate").val($.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date()));
	$.ajax({
	      type:'get',
	      url: hostUrl+"/oa/officeOut/getUserInfo"+"?time="+Math.random(),
	      success: function(data) {
	        $("#createPersonId").val(data.result.securityUserDto.id);
	        $("#createPersonName").val(data.result.securityUserDto.realName);
	        $("#createOrgId").val(data.result.securityDirectDeptDto.id);
	    	$("#createOrgName").val(data.result.securityDirectDeptDto.prefixName);
	    	$("input[name='createOrgName']").val(data.result.securityDirectDeptDto.prefixName);
	    	$("#createDate").val($.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date()));
	      }
	 });
}

/**
 * author:liuf
 * describe:编辑回显数据
 * param: null
 */
function getSettlementTradesData(id){
	   $.ajax({
	       url:hostUrl+"oa/feedBack/get/"+id+'?time='+Math.random(),
	       type:'get',
	       success: function(data) {
	    	   if(data.success){
	    		   var settlementTradesData=data.result;
	    		     $("input[name='id']").val(settlementTradesData.id);
	    		     $("input[name='theme']").val(settlementTradesData.theme);
	    		     $("input[name='createPersonId']").val(settlementTradesData.createPersonId);
	    		     $("input[name='createPersonName']").val(settlementTradesData.createPersonName);
	    		     $("input[name='createOrgName']").val(settlementTradesData.createOrgName);
	    		     $("#createOrgName").val(settlementTradesData.createOrgName);
	    		     $("input[name='createOrgId']").val(settlementTradesData.createOrgId);
	    		     $("#createDate").val(settlementTradesData.createDate);
	    		     $("textarea[name='remark']").html(settlementTradesData.remark);
	    		     $("textarea[name='content']").html(settlementTradesData.content);
	    		     $("input[name='concurrencyVersion']").val(settlementTradesData.concurrencyVersion);
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
	var settlementTradesArr= $("#settlementTrades").serializeArray();
	var settlementTradesDto={};
		for(var i in settlementTradesArr){
			settlementTradesDto[settlementTradesArr[i].name]=settlementTradesArr[i].value;
		}
		settlementTradesDto.delflag=0;
		if(type=="add"){
			settlementTradesDto.createDate=new Date().getTime();
			   $.ajax({
			       url:hostUrl+"oa/feedBack/save",
			       data:JSON.stringify(settlementTradesDto),
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
								   if( window.opener!=null&&$.isFunction(window.opener.reloadGrid)){
									   window.opener.reloadGrid(settlementTradesDto.id);
								   }
			                	   window.close();
			                   }else if(op=="continue"){
								   if( window.opener!=null&&$.isFunction(window.opener.reloadGrid)){
									   window.opener.reloadGrid();
								   }
			                	   pop_tip_open("green",resultData.msg);
			                	   $("#settlementTrades")[0].reset();
			                	   var uuid=getuuid();
			                	   $("#trades").val(uuid);
			                		getUserInfo();
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
			settlementTradesDto.updateDate=new Date().getTime();
			var tradesId=$("#trades").val();
			   $.ajax({
			       url:hostUrl+"oa/feedBack/update/"+tradesId,
			       data:JSON.stringify(settlementTradesDto),
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
			            		   window.opener.reloadGrid(settlementTradesDto.id);
			                	   window.close();
			                   }else if(op=="continue"){
			                	   window.opener.reloadGrid();
			                	   pop_tip_open("green",resultData.msg);
			                	   $("#settlementTrades")[0].reset();
			                	   var uuid=getuuid();
			                	   $("#trades").val(uuid);
			                	   type="add";
			                		getUserInfo();
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
