var dispatchId= $.xljUtils.getUrlParam('dispatchId');
var id= $.xljUtils.getUrlParam('id');
$(function () {
	pageInit();
    });

/**
 * author:liuf
 * describe:加载完毕后执行
 * param: null
 */
function pageInit(){
		getTaskPackageDispatchBean(dispatchId);
		/* $('#uploadFile').xljAttachment({appId:'1',businessId:id,categoryId:'1',mode:'add',singleUpload:true});*/
}
function getTaskPackageDispatchBean(id){
	$.ajax({
        type:'get',
        url:serviceUrl+'oa/taskPackageDispatch/get/'+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	var resultData=data.result
        	 $("input[name='id']").val(resultData.id);
        	$("input[name='concurrencyVersion']").val(resultData.concurrencyVersion);
        	$("textarea[name='content']").val(resultData.content);
        	$("textarea[name='content']").attr("title",resultData.content);
        	$("input[name='dutyUserId']").val(resultData.dutyUserId);
        	$("input[name='dutyUser']").val(resultData.dutyUser);
        	$("input[name='dutyDeptId']").val(resultData.dutyDeptId);
        	$("input[name='dutyDept']").val(resultData.dutyDept);
        	$("input[name='expectCompleteDate']").val(resultData.expectCompleteDate.substring(0,resultData.expectCompleteDate.indexOf(".")));
        	$("input[name='actualCompleteDate']").val(resultData.actualCompleteDate);
        	$("textarea[name='remark']").html(resultData.remark);
        	$("textarea[name='remark']").attr("title",resultData.remark);
        	$("textarea[name='report']").html(resultData.report);
        	$("textarea[name='report']").attr("title",resultData.report);
        	var d=resultData.reportStatus;
          	var taskpackageId=resultData.taskPackageId;
    	 $('#uploadFile').xljAttachment({appId:'1',businessId:taskpackageId,categoryId:'1',mode:'view',singleUpload:false,hideButtonsWithNoFile:true});
        	if(d=="0"){
        		$("input[name='reportStatus']").val("草稿");
        	}else if(d=="1"){
        		$("input[name='reportStatus']").val("未汇报");
        	}else if(d=="2"){
        		$("input[name='reportStatus']").val("已汇报");
        	}else if(d=="3"){
        		$("input[name='reportStatus']").val("关闭");
        	}else if(d=="4"){
        		$("input[name='reportStatus']").val("发送中");
        	}else if(d=="5"){
        		$("input[name='reportStatus']").val("忽略");
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
 * describe:关闭页面
 * param: null
 */
function updateNoticeMsg(){
	var data={
		id:id,
		businessId:dispatchId,
		oldStatus:"DY",
		newStatus:"YY"
	}
	$.ajax({
		url:serviceUrl+"flow/sysNoticeMsg/updateStatusOfNoticeMsg",
		type:'post',
	    contentType : "application/json", 
		dataType:'JSON',
		data:JSON.stringify(data),
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				if (window.opener&&$.isFunction(window.opener.refreshMyTaskData)){
					window.opener.refreshMyTaskData("toRead");
					window.opener=null;
				}
				 window.open("","_self");
	 				window.close();
			}else{
				pop_tip_open("red",resultData.msg);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
}


