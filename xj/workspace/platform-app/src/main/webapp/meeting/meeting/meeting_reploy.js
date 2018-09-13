$(function() {
    
	var urlParam = $.xljUtils.getUrlParams();
	var meetingReloyDto={};
	meetingReloyDto.meetingId=urlParam.meetingId;
    
    //回显会议数据
    $.ajax({
    	type: "POST",
    	contentType: "application/json",
        url:baseUrl + 'oa/meeting/meetingReply/getUserInfoByMeetingId/'+'?time='+Math.random(),
        data:JSON.stringify(meetingReloyDto),
		dataType:"JSON",
        success: function(data) {
        	var meeting=data.result;
        	$("input[name='attendUser']").val(meeting.attendUser);	//参会人员
        	$("input[name='noAttendUser']").val(meeting.noAttendUser);	//未参会人员
			$("input[name='noReployUser']").val(meeting.noReployUser);	//未回复人员
			$("#reployRecord").html(meeting.reployRecord);	//回复记录
        },
    	error: function (jqXHR, textStatus, errorThrown) {
			MeetingAgendaList=[];
			$.xljUtils.getError(jqXHR.status);
    	}
	});
    
    
});

/**
 * 关闭窗口
 * add by yongmei.xiao
 */
function closeWin() {
	window.close();
}



//提交数据  flag为标识  标识保存后是否关闭
function submitForm() {
	
	var attend = $("input[name='attendMeeting']:checked").val();
	if(attend == 1){
		//如果选择参加会议，则直接关闭当前页面
		window.close();
	}
	var urlParam = $.xljUtils.getUrlParams();
	var noticeId = urlParam.noticeId;
	var meetingId = urlParam.meetingId;
	
	var id=$("#id").val();
	var newMeetingArr= $("#newMeetingForm").serializeArray();
	var meetingDto={};
	for(var i in newMeetingArr){
		
		if(newMeetingArr[i].name=="attendMeeting1"||"attendMeeting2"==newMeetingArr[i].name || newMeetingArr[i].name=="attendMeeting3"){
			continue;
		}else{
			meetingDto[newMeetingArr[i].name]=newMeetingArr[i].value;
		}
	}
	meetingDto.delflag=false;
	meetingDto.noticeId=noticeId;
	meetingDto.attendMeeting=attend;
	meetingDto.meetingId=meetingId;
	meetingDto.id=id;
	
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		url: baseUrl+"oa/meeting/meeting/updateMeeingStatusOfNoticeMsg/"+id+"?time="+Math.random(),
		data:JSON.stringify(meetingDto),
		dataType:"JSON",
		success: function (result) {
			if(result.success) {	//新增
				$.xljUtils.tip('green', '数据保存成功！');
				closeWin();
			}else {
				$.xljUtils.tip('red', '数据保存失败！');
			}
		}
	});
}



/**
 * 系统统一入口生成ID
 */
function initUUId(){
  var url = baseUrl+"generator/getGuuid"+"?time="+Math.random();
	$.ajax({
      type:'get',
      url:url,
      success: function(data) {
       var guuid=data.result;
	    $("#id").val(guuid);
   }
 });
}

 
