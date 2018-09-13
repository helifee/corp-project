var id= $.xljUtils.getUrlParam('dispatchId');
$(function () {
	pageInit();
    });

/**
 * author:liuf
 * describe:加载完毕后执行
 * param: null
 */
function pageInit(){
		getTaskPackageDispatchBean(id);
	
}
function getTaskPackageDispatchBean(id){
	$.ajax({
        type:'get',
        url:hostUrl+'oa/taskPackageDispatch/get/'+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	var resultData=data.result;
        	var resultId=resultData.id;
        	 $("input[name='id']").val(resultId);
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
       	 $('#uploadFile').xljAttachment({appId:'1',businessId:taskpackageId,categoryId:'1',mode:'view',singleUpload:false,hideButtonsWithNoFile:true});
		 $('#reportFile').xljAttachment({appId:'1',businessId:resultId,categoryId:'2',mode:'edit',singleUpload:false});
        	}else{
        		pop_tip_open("red",data.msg);
        	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
}
function upload(){
	$("#taskPackageForm").submit();
}



/**
 * author:liuf
 * describe:新增 修改数据
 * param: null
 */
function saveForm(){
	var id=$("input[name='id']").val();
	var report=$("textarea[name='report']").val();
	var data={
			dispatchId:id,
			report:report
	};
	$('#reportFile').xljAttachmentSubmit(function(isSuccess, obj){
		if (isSuccess) {
			if (obj.success === true) {}
		} else {
			$.xljUtils.getError(obj);
		}
	});
	
			$.ajax({
				url:hostUrl+"oa/taskPackageDispatch/report",
				data:JSON.stringify(data),
				type:'POST',
				contentType:'application/json',
				dataType:'JSON',
				success:function (resultData) {
					if(resultData) {
						var successFlag = resultData.success;
						var result = resultData.result;
						var msg = resultData.msg;
						if(successFlag) {
					        $.xljUtils.tip('green',"汇报成功！");
							if(window.opener!=null&&window.opener.reloadWin){
								window.opener.reloadWin(id);
							}
	                			window.close();
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
/**
 * author:liuf
 * describe:关闭页面
 * param: null
 */
function toList(){
	 window.opener=null;
	 window.open("","_self"); 
	 window.close();
}


