var MeetingAgendaList =new Array(); //全局变量 子表list
var type=$.xljUtils.getUrlParam('act');// type 添加页面create 修改页面update

//$('#aaa').unbind('click');
/**
 * 关闭窗口
 * add by hwl
 */
function closeWin() {
	window.open("","_self","");
	window.close();
}
//初始化日期控件
$(function() {
	
	$('.form_datetime').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
	var nowStr = formatDate();
	$("#beginDate").val(nowStr);
	var startDate, endDate;
	
	 var urlParam = $.xljUtils.getUrlParams();
	 //startTimeIsBigThanTotay(urlParam.startTime);
     var act;
     var id;
     var update;
     var noticeFlag;
     if(urlParam){
    	 act = urlParam.act;
    	 id = urlParam.id;
    	 update = urlParam.update;
    	 noticeFlag = urlParam.noticeFlag;
     }
     if(act&&act=='create'){	//新建页面
         $("#editTitle").text('新增会议纪要');
         initUUId();
     }
     $('.empty').click(function() {
    	 $(this).siblings('input').val('');
     })
	 if(id != null && update == 'false'){	//查看页面
		 $("#editTitle").text('查看会议纪要');
		 $('#submitForm, #submitFormAndClose').hide();
		 $.ajax({
	  	        type:'get',
	  	        url:serviceUrl + 'oa/meeting/meetingSummary/get/'+id+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	fillDate(meeting);
	  	        	 //查看页面不可操作
	  	        	disabledInput(meeting);
	  	        }
	  		});
		//回显附件
         initFile(id,type);
	 }else if(id != null && update == 'true'){	//编辑页面
		 $("#editTitle").text('修改会议纪要');
		 $.ajax({
	  	        type:'get',
	  	        url:serviceUrl + 'oa/meeting/meetingSummary/get/'+id+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	fillDate(meeting);
	        	 	startDate = getTimeMills($('#beginDate').val());
	        	 	endDate =  getTimeMills($('#endDate').val());
	  	        }
	  		});
		//回显附件
         initFile(id,type);
	 }
     if(noticeFlag == 'DY'){
     	//待阅改已阅
     	chnageStatusOfMsg();
      }
    
     
	 /**
	  * 保存会议
	  * add by hwl
	  */
	 $("#submitForm").click(function () {
		 if($("#newMeetingForm").valid()) {
			 submitForm(act);
		 }
	 });
	 
	 //保存&新增
	 $('#submitFormAndClose').click(function() {
		 if($("#newMeetingForm").valid()) {
			 submitForm(act, true);
		 }
	 });
});

/**
 * 如果是待阅页面，第一次打开待阅，待阅变为已阅
 */
function chnageStatusOfMsg(){
	var paramData = {businessId: $.xljUtils.getUrlParam('id'), 'newStatus': 'YY', 'oldStatus': 'DY'};
    var fullUrl = serviceUrl+"flow/sysNoticeMsg/updateStatusOfNoticeMsgByCurrentUser";
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: fullUrl,
        dataType: "json",
        async: false,
        data: JSON.stringify( paramData ),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
            console.info("调用待阅变已阅的接口 已成功!");
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "调用待阅变已阅的接口  失败！");
            }
        }
    });
}

/**
 * 查看页面，如果会议已经开始，则参加按钮和不参加按钮隐藏
 */
function hideButtonByTime(){
	
}

/**
 * 填充数据
 * @param meeting
 */
function fillDate(meeting){
	$("input[name='id']").val(meeting.id);
  	$("input[name='mtTitle']").val(meeting.mtTitle);
  	$("input[name='meetingTypeId']").val(meeting.meetingTypeId);
  	$("input[name='meetingType']").val(meeting.meetingType);
  	$("input[name='entryDate']").val(meeting.entryDate);
  	$("input[name='planBeginDate']").val(meeting.planBeginDate);
	$("input[name='planBeginTime']").val(meeting.planBeginTime);
	$("input[name='actualBeginDate']").val(meeting.actualBeginDate);
	$("input[name='actualBeginTime']").val(meeting.actualBeginTime);
	$("input[name='planAddress']").val(meeting.planAddress);
  	$("input[name='actualAddress']").val(meeting.actualAddress);
  	$("input[name='meetingOrganizationId']").val(meeting.meetingOrganizationId);
  	$("input[name='meetingOrganizationName']").val(meeting.meetingOrganizationName);
  	$("input[name='emceeId']").val(meeting.emceeId);
  	$("input[name='emceeName']").val(meeting.emceeName);
  	$("input[name='requirAttendeesName']").val(meeting.requirAttendeesName);
	$("input[name='actualAttendeesId']").val(meeting.actualAttendeesId);
	$("input[name='actualAttendeesName']").val(meeting.actualAttendeesName);
	$("input[name='copySendId']").val(meeting.copySendId);
	
	$("input[name='copySendName']").val(meeting.copySendName);
	$("input[name='otherReadersId']").val(meeting.otherReadersId);
	$("input[name='otherReaders']").val(meeting.otherReaders);
	
  	/*$("#copySendName").val(subStringDate(meeting.copySendName));
  	$("#otherReadersId").val(subStringDate(meeting.otherReadersId));
  	$("#otherReaders").val(subStringDate(meeting.otherReaders));*/
  	//$("#meetingContent").val(subStringDate(meeting.meetingContent));
  	$("textarea[name='meetingContent']").val(meeting.meetingContent);
	$("textarea[name='meetingRecord']").val(meeting.meetingRecord);
	$("textarea[name='meetingResult']").val(meeting.meetingResult);
	$("textarea[name='remarks']").val(meeting.remarks);
	/*$(":radio[name='notifiyWay'][value='" + meeting.notifiyWay + "']").prop("checked", "checked");*/
	
}



//根据时间字符串返回毫秒数
function getTimeMills(str) {
	var s = str.split(' ');
	var s1 = s[0].split('-');
	var s2 = s[1].split(':');
	return +new Date(s1[0], s1[1] - 1, s1[2], s2[0], s2[1], 0);
}

/**
 * 日期格式化
 * add by yongmei.xiao
 */
function formatDate(date) {
	if(date) {
		var Year = 0;
		var Month = 0;
		var Day = 0;
		var CurrentDate = "";
		//初始化时间 
		//Year= day.getYear();//有火狐下2008年显示108的bug 
		Year = date.getFullYear();//ie火狐下都可
		Month = date.getMonth() + 1;
		Day = date.getDate();
		Hour = date.getHours(); 
		Minute = date.getMinutes(); 
		// Second = day.getSeconds(); 
		CurrentDate += Year + "-";
		if (Month >= 10) {
			CurrentDate += Month + "-";
		} else {
			CurrentDate += "0" + Month + "-";
		}
		if (Day >= 10) {
			CurrentDate += Day;
		} else {
			CurrentDate += "0" + Day;
		}
		return CurrentDate + " " + Hour + ":" +  Minute;
	}
	return '';
}

//清除父类别内容
function empty(obj) {
	$(obj).siblings('input').val('');
}

/**
 * 设置页面不可操作
 * add by wangpw
 */
function disabledInput(meeting){
  	$("input[name='mtTitle']").attr("disabled",true);
  	$("input[name='meetingTypeId']").attr("disabled",true);
  	$("input[name='meetingType']").attr("disabled",true);
  	$("input[name='entryDate']").attr("disabled",true);
  	$("input[name='planBeginDate']").attr("disabled",true);
	$("input[name='planBeginTime']").attr("disabled",true);
	$("input[name='actualBeginDate']").attr("disabled",true);
	$("input[name='actualBeginTime']").attr("disabled",true);
	$("input[name='planAddress']").attr("disabled",true);
  	$("input[name='actualAddress']").attr("disabled",true);
  	$("input[name='meetingOrganizationName']").attr("disabled",true);
  	$("input[name='emceeName']").attr("disabled",true);
  	$("input[name='requirAttendeesName']").attr("disabled",true);
	$("input[name='actualAttendeesId']").attr("disabled",true);
	$("input[name='actualAttendeesName']").attr("disabled",true);
	$("input[name='copySendId']").attr("disabled",true);
	
	$("input[name='copySendName']").attr("disabled",true);
	$("input[name='otherReadersId']").attr("disabled",true);
	$("input[name='otherReaders']").attr("disabled",true);
	
 /* 	$("#copySendName").attr("disabled",true);
  	$("#otherReadersId").attr("disabled",true);
  	$("#otherReaders").attr("disabled",true);
  	$("#meetingContent").attr("disabled",true);*/
  	$("textarea[name='meetingContent']").attr("disabled",true);
	$("textarea[name='meetingRecord']").attr("disabled",true);
	$("textarea[name='meetingResult']").attr("disabled",true);
	$("textarea[name='remarks']").attr("disabled",true);
	$("#remarks").attr("disabled",true);
	$('.form_datetime').datetimepicker('remove');	//禁用日期选择
	
	//把选人和选组织的弹出框
	  $('.multiple-selector').unbind('click');
	  $('.single-selector').unbind('click');
	  
	$('.btn-select-by-model').off();	//解除绑定事件
}



/**
 * 格式化日期
 * add by yongmei.xiao
 */
function subStringDate(date){
	if(date != null){
		return date.substring(0,16);
	}else{
		return null;
	}}



//提交数据  flag为标识  标识保存后是否关闭
function submitForm(type, flag) {
	//组织会议纪要参数信息

	var url = '';
	var newMeetingArr= $("#newMeetingForm").serializeArray();
	var meetingDto={};
	for(var i in newMeetingArr){
		meetingDto[newMeetingArr[i].name]=newMeetingArr[i].value;
	}
	//如果id有值，则更新 否则保存添加
	if(type == 'update') {
		var id=$("#id").val();
		meetingDto.delflag=false;
    	meetingDto.id=id;
    	url = serviceUrl + "oa/meeting/meetingSummary/update/"+id;
	}else {
		meetingDto.delflag=false;
		url = serviceUrl+"oa/meeting/meetingSummary/save";
	}
	
	$.ajax({
		type: type == 'update' ? "PUT" : "POST",
		contentType: "application/json",
		url: url,
		data:JSON.stringify(meetingDto),
		dataType:"JSON",
		success: function (result) {
			if(result.success) {	//新增
				window.opener.location.href=window.opener.location.href;
				if(flag === true) {	//保存并新增
					$.xljUtils.tip('green', '数据保存成功！');
					window.location.href = serviceUrl + '/meeting/meetingSummary/meetingSummary_edit.html?act=create';
             	   $("#newMeetingForm")[0].reset();
             	  
				}else {
					$.xljUtils.tip('green', '数据保存成功！');
					closeWin();
				}
				//保存附件
				if (type == 'create') {
                    //保存知识文档
					saveAttachement();
                }
				
			}else {
				$.xljUtils.tip('red', '数据保存失败！');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
	    },
	    complete:function(){
	    }
	});
}

/**
 * 保存附件
 */
function saveAttachement() {
    $('#documentAttachments').xljAttachmentSubmit(function (isSuccess, obj) {
        if (isSuccess) {
            if (obj.success === true) {
                $.xljUtils.tip('blue', '附件信息提交成功');
            }
        } else {
            $.xljUtils.getError(obj);
        }
    });
}

/**
 * 系统统一入口生成ID
 */
function initUUId(){
  var url = serviceUrl+"sys/uuid/generator/getGuuid"+"?time="+Math.random();
	$.ajax({
      type:'get',
      url:url,
      success: function(data) {
       var guuid=data.result;
	    $("#id").val(guuid);
	    //初始化附件主要获取信息ID
        initFile(guuid,type);
   }
 });
}


/**
 * 初始化附件id
 * appid:1是的代表知识管理类型
 * categoryId:1是的代表知识管理类型
 * appid:-1代表新闻管理
 */
function initFile(contentRowTypeId,operationType) {
        switch (operationType){
            case 'update':
                try{
                    $('#documentAttachments').xljAttachment({
                        appId: '1',
                        businessId: contentRowTypeId,
                        categoryId: '1',
                        mode: 'edit',
                        singleUpload: false
                    });
                }catch (e){

                }
                break;
            case 'view':
                try{
                    $('#documentAttachments').xljAttachment({
                        appId: '1',
                        businessId: contentRowTypeId,
                        categoryId: '1',
                        mode: 'view',
                        singleUpload: false,
                        hideButtonsWithNoFile:true
                    });
                }catch (e){

                }
                break;
            case 'create':
                try{
                    $('#documentAttachments').xljAttachment({
                        appId: '1',
                        businessId: contentRowTypeId,
                        categoryId: '1',
                        mode: 'add',
                        singleUpload: false
                    });
                }catch (e){

                }
                break;

            default:
                $('#documentAttachments').xljAttachment({appId: '1', businessId: contentRowTypeId, categoryId: '1'});
                break;
        }
}

/**
 * 清空
 */
function empty(){
	$("input[id='meetingTypeId']").val("");
	$("input[id='meetingType']").val("");
}

//点击参加或者不参加，保存该动作记录到会议回复表
function saveMeetingReploy(flag) {
	
	var meetingReloyDto={};
	var id=$("#id").val();
	meetingReloyDto.delflag=false;
	meetingReloyDto.meetingId=id;
	meetingReloyDto.joinFlag=flag;
	
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: serviceUrl+"oa/meeting/meetingReply/save",
		data:JSON.stringify(meetingReloyDto),
		dataType:"JSON",
		success: function (result) {
			if(result.success) {	//新增
				$.xljUtils.tip('green', '处理成功！该待办在会议结束后自动消失');
				closeWin();
			}else {
				MeetingAgendaList=[];
				$.xljUtils.tip('red', '处理失败！');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			MeetingAgendaList=[];
			$.xljUtils.getError(jqXHR.status);
	    },
	    complete:function(){
	    }
	});
}


//点击催办会议是发一条待阅，给未回复的人员
function reminderMeeting() {
	
	var meetingReloyDto={};
	var id=$("#id").val();
	meetingReloyDto.delflag=false;
	meetingReloyDto.meetingId=id;
	meetingReloyDto.joinFlag=flag;
	
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: serviceUrl+"oa/meeting/meetingReply/save",
		data:JSON.stringify(meetingReloyDto),
		dataType:"JSON",
		success: function (result) {
			if(result.success) {	//新增
				$.xljUtils.tip('green', '处理成功！该待办在会议结束后自动消失');
				closeWin();
			}else {
				MeetingAgendaList=[];
				$.xljUtils.tip('red', '处理失败！');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			MeetingAgendaList=[];
			$.xljUtils.getError(jqXHR.status);
	    },
	    complete:function(){
	    }
	});
}

//点击催办会议是发一条待阅，给未回复的人员
function operationMeeting(flag) {
	
	var meetingReloyDto={};
	var id=$("#id").val();
	meetingReloyDto.delflag=false;
	meetingReloyDto.meetingId=id;
	meetingReloyDto.joinFlag=flag;
	meetingReloyDto.flag=flag;
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: serviceUrl+"oa/meeting/meeting/operationMeeting",
		data:JSON.stringify(meetingReloyDto),
		dataType:"JSON",
		success: function (result) {
			if(result.success) {	//新增
				$.xljUtils.tip('green', '处理成功！该待办在会议结束后自动消失');
				closeWin();
			}else {
				MeetingAgendaList=[];
				$.xljUtils.tip('red', '处理失败！');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			MeetingAgendaList=[];
			$.xljUtils.getError(jqXHR.status);
	    },
	    complete:function(){
	    }
	});
}

//点击催办会议是发一条待阅，给未回复的人员
function replyInfo() {
	var meetingId=$("#id").val();
	window.open("meeting_reploy.html?meetingId="+meetingId);
}


