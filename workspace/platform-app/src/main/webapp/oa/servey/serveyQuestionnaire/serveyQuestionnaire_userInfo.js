$(function() {
    
	var urlParam = $.xljUtils.getUrlParams();
	var serveyId=urlParam.serveyId;
    
    //回显会议数据
    $.ajax({
    	type: "POST",
    	contentType: "application/json",
        url:baseUrl + 'oa/servey/serveyParty/queryJoinServeyUserInfo/'+'?time='+Math.random(),
        data: JSON.stringify({'serveyId':serveyId,"type":"PARTY"}),
		dataType:"JSON",
        success: function(data) {
        	var serveyParty=data.result;
        	$("textarea[name='attendUser']").val(serveyParty.reployUsername);	//参会人员
        	$("textarea[name='noAttendUser']").val(serveyParty.nojoinUsername);	//未参会人员
        },
    	error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
    	}
	});
    
    
});

/**
 * 关闭窗口
 * add by yongmei.xiao
 */
function closeWin() {
	 newwin = window.open("","_parent","");  
     newwin.close();
}



 
