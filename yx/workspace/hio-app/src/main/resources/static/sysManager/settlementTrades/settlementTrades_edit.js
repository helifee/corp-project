var type= $.xljUtils.getUrlParam('type');
$(function () {
	pageInit();
	if(type=="add"){
		$("#settlementTradesTitle").html("结算方式-新增");
		document.title="结算方式-新增";
	}else{
		$("#settlementTradesTitle").html("结算方式-修改");
		document.title="结算方式-修改";
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
function getSettlementTradesData(id){
	   $.ajax({
	       url:serviceUrl+"sys/base/settlementTrades/get/"+id+'?time='+Math.random(),
	       type:'get',
	       success: function(data) {
	    	   if(data.success){
	    		   var settlementTradesData=data.result;
	    		     $("input[name='id']").val(settlementTradesData.id);
	    		     $("input[name='name']").val(settlementTradesData.name);
	    		     $("input[name='code']").val(settlementTradesData.code);
	    		     $("textarea[name='remark']").html(settlementTradesData.remark);
	    		     $("input[name='status'][value="+settlementTradesData.status+"]").attr("checked",true);//状态
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
		settlementTradesDto.createDate=new Date().getTime();
		settlementTradesDto.updateDate=new Date().getTime();
		if(type=="add"){
			   $.ajax({
			       url:serviceUrl+"sys/base/settlementTrades/save",
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
			                	   window.opener.reloadGrid(settlementTradesDto.id);
			                	   window.close();
			                   }else if(op=="continue"){
								   $.xljUtils.tip('green','保存成功！');
								   window.opener.reloadGrid();
			                	   $("#settlementTrades")[0].reset();
			                	   var uuid=getuuid();
			                	   $("#trades").val(uuid);
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
			var tradesId=$("#trades").val();
			   $.ajax({
			       url:serviceUrl+"sys/base/settlementTrades/update/"+tradesId,
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
								   $.xljUtils.tip('green','保存成功！');
								   window.opener.reloadGrid();
			                	   $("#settlementTrades")[0].reset();
			                	   var uuid=getuuid();
			                	   $("#trades").val(uuid);
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
