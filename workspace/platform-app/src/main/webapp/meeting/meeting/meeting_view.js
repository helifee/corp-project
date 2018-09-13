var MeetingAgendaList =new Array(); //全局变量 子表list
var type=$.xljUtils.getUrlParam('ack');// type 添加页面create 修改页面update
//操作类型
var operationType;
//定义创建人身份标志
var userIdentifiy = null;
//定义登录人员身份标志集合
var userIdentifiy = new Array();
//定义会议纪要是否存在的标志
var summaryExitFlag;
//定义是否回复的标志
var reployIsFlag;
//定义已经回复的，回复的标志
var joinIsFlag;
/**
 * 关闭窗口
 * add by hwl
 */
function closeWin() {
	window.open('','_self','');
	window.close();
	//window.close();
}
//初始化日期控件
$(function() {
	
	/**
	 * 根据查询返回数据整理成zTree需要的JSON数据
	 * @param arr
	 * @returns
	 */
	function formatZTreeData(arr) {
		$.each(arr, function(index, value){
			value.iconSkin = 'diy-group';
		});
		return arr;
	};
	
	$('.form_datetime').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
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
    	//操作类型
         operationType = urlParam.act;
         noticeFlag = urlParam.noticeFlag;
     }
     if(act&&act=='create'){	//新建页面
         $("#editTitle").text('新增会议');
         initUUId();
     }
     $('.empty').click(function() {
    	 $(this).siblings('input').val('');
     })
	 if(id != null && update == 'false'){	//查看页面
		 //获取登录人员身份标志集合
		 getReployMeetingUsrInfo(id);
		/*getUserIdentifiyByMeetingId(id);
		 isExitMeetingSummary(id);
		 startTimeIsBigThanTotay(id);*/
		 $("#editTitle").text('查看会议');
		 $('#submitForm, #submitFormAndClose').hide();
		 $.ajax({
	  	        type:'get',
	  	        url:hostUrl + 'oa/meeting/meeting/get/'+id+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	fillDate(meeting);
	  	        	 //查看页面不可操作
	  	        	disabledInput(meeting);
	  	           
	  	        	 //隐藏参加或不参加按钮
	  	           /* startTimeIsBigThanTotay(meeting);*/
	  	          hideMenuByUserIdentifiy(meeting,userIdentifiy);
	  	            /*//根据登录人身份判断  按钮显示
	  	            getUserInfoByMeetingId(meeting);*/
	  	        }
	  		});
		//回显附件
         initFile(id,operationType);
	 }else if(id != null && update == 'true'){	//编辑页面
		 $("#editTitle").text('修改会议');
		 $.ajax({
	  	        type:'get',
	  	        url:hostUrl + 'oa/meeting/meeting/get/'+id+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	fillDate(meeting);
	        	 	startDate = getTimeMills($('#beginDate').val());
	        	 	endDate =  getTimeMills($('#endDate').val());
	  	        }
	  		});
		//回显附件
         initFile(id,operationType);
	 }
     if(noticeFlag == 'DY'){
    	//待阅改已阅
    	chnageStatusOfMsg();
     }
     
     //取消会议操作
     $("#cancelMeet").click(function () {
    	 $(this).attr("disabled","true"); 
    	 operationMeeting('cancel');
		 setTimeout("$('#cancelMeet').removeAttr('disabled')",5000); //设置三秒后提交按钮 显示  
	 });
});


/**
 * 获取会议登录人身份（比如主持人，纪要人，创建人，），等各种身份的集合
 */
function getReployMeetingUsrInfo(meetingId){
	var meetingPartnerDto={};
	meetingPartnerDto.delflag=false;
	meetingPartnerDto.meetingId=meetingId;
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: hostUrl+"oa/meeting/meetingPartner/getUserIdentifiyAndIsJoinAndIsSummMeetingId"+"?time="+Math.random(),
		data:JSON.stringify(meetingPartnerDto),
		async : false,
		dataType:"JSON",
		success: function (data) {
			if(data.success) {	//新增
				if(data.result){
					var meetingInfo=data.result;
					//获取人员身份
					var userIdentify = meetingInfo.userIdentifiyList;
					 $.each(userIdentify,function(key,val){  
		                    var temp = val;  
		                    userIdentifiy.push(temp);
		             });
					//获取是否有会议纪要
					var meetingSummaryId=meetingInfo.meetingSummaryId;
					if(meetingSummaryId != null){
						$('#meetingSummaryId').val(meetingSummaryId);
						summaryExitFlag="1";
					}else{
						$('#meetingSummaryId').val(meetingId);
					}
					//获取回复的最新记录
					var meetingReploy=meetingInfo.meetingReploy;
					if(meetingReploy.id == null){
						reployIsFlag='0';
					}
					var joinFlag = meetingReploy.joinFlag;
					if(joinFlag == 1){
						joinIsFlag='1';
					}else if(joinFlag == 0){
						joinIsFlag='0';
					}
				}
			}else {
				MeetingAgendaList=[];
				$.xljUtils.tip('red', '获取参与人身份信息失败！');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			MeetingAgendaList=[];
			$.xljUtils.getError(jqXHR.status);
	    },
	    complete:function(){
	    }
	});
	return userIdentifiy;
}


/**
 * 获取会议登录人身份（比如主持人，纪要人，创建人，），等各种身份的集合
 */
function getUserIdentifiyByMeetingId(meetingId){
	var meetingPartnerDto={};
	meetingPartnerDto.delflag=false;
	meetingPartnerDto.meetingId=meetingId;
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: hostUrl+"oa/meeting/meetingPartner/getUserIdentifiyByMeetingId"+"?time="+Math.random(),
		data:JSON.stringify(meetingPartnerDto),
		async : false,
		dataType:"JSON",
		success: function (data) {
			if(data.success) {	//新增
				if(data.result){
					var meetingPartner=data.result;
					 $.each(meetingPartner,function(key,val){  
		                    var temp = val;  
		                    userIdentifiy.push(temp);
		             });
				}
			}else {
				MeetingAgendaList=[];
				$.xljUtils.tip('red', '获取参与人身份信息失败！');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			MeetingAgendaList=[];
			$.xljUtils.getError(jqXHR.status);
	    },
	    complete:function(){
	    }
	});
	return userIdentifiy;
}

/**
 * 判断该会议的会议纪要是否创建
 */
function isExitMeetingSummary(meetingId){
	var paramData;
    paramData = JSON.stringify({'meetingId':meetingId});
		$.ajax({
			type:'post',
			url:hostUrl+'oa/meeting/meetingSummary/queryList'+"?time="+Math.random(),
			dataType:'json',
			contentType:'application/json',
			data:paramData,
			async: false,
			success: function(data) {
				if(data.success){
					if(data.result){
						var meetingSummary=data.result;
						if(meetingSummary.length > 0){
							$('#meetingSummaryId').val(meetingSummary[0].id);
							summaryExitFlag="1";
						}else{
							$('#meetingSummaryId').val(meetingId);
						}
					}
				}else{
					$.xljUtils.tip("red",data.msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
}


/**
 * 如果是待阅页面，第一次打开待阅，待阅变为已阅
 */
function chnageStatusOfMsg(){
	var paramData = {businessId: $.xljUtils.getUrlParam('id'), 'newStatus': 'YY', 'oldStatus': 'DY'};
    var fullUrl = hostUrl+"flow/sysNoticeMsg/updateStatusOfNoticeMsgByCurrentUser";
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



//开始时间不能小于当前时间
function startTimeIsBigThanTotay(id){
      //如果会议还没有开始，并且与会人员已经做过参加或不参加的回复，此时参加或不参加的按钮只能显示一个
      paramData = JSON.stringify({'meetingId':id});
		$.ajax({
			type:'post',
			url:hostUrl+'oa/meeting/meetingReply/queryMeetingReployByNew'+"?time="+Math.random(),
			dataType:'json',
			contentType:'application/json',
			data:paramData,
			async: false,
			success: function(data) {
				if(data.success){
					if(data.result){
						var meetingReploy=data.result;
						if(meetingReploy.id == null){
							reployIsFlag='0';
						}
						var joinFlag = meetingReploy.joinFlag;
						if(joinFlag == 1){
							joinIsFlag='1';
						}else if(joinFlag == 0){
							joinIsFlag='0';
						}
					}
				}else{
					$.xljUtils.tip("red",data.msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
}

/**
 * 根据用户人信息，在查看页面，控制菜单显示，隐藏
 * @param meeting
 */
function hideMenuByUserIdentifiy(meeting,userIdentifiy){
	if(meeting.status == '6' || meeting.status == '8' || meeting.status == '11') {
        //如果開始時間大於當前時間,参加按钮和不参加按钮隐藏
  	  $('#joinMeeting').hide();
  	  $('#refuseMeeting').hide();
  	  $('#reminderMeet').hide();
  	  $('#cancelMeet').hide();
    }
	//如果当前时间大于会议开始时间，说明会议已经开始，此时参半按钮需要隐藏
	var startdate = meeting.beginTime;
	var time1 = new Date(startdate).getTime();
	var time2 = new Date().valueOf();
	if(time1>time2){
		$('#reminderMeet').hide();
	}
	//操作菜单的显示必须等流程审批结束之后才会显示
	if(meeting.status && meeting.flowStatus==2 && meeting.status == 5){
		if($.inArray("1", userIdentifiy) != -1 || $.inArray("2", userIdentifiy) != -1 || $.inArray("3", userIdentifiy) != -1){
			if(reployIsFlag == '0'){
				$('#refuseMeeting').show();
				$('#joinMeeting').show();
			}
			if(joinIsFlag == 1){
				$('#refuseMeeting').show();
			}else if(joinIsFlag == 0){
				$('#joinMeeting').show();
			}
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
		}
		if($.inArray("0", userIdentifiy) != -1){
			$('#joinMeeting').show();
			/*$('#inputMeetSummary').show();*/
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
			$('#refuseMeeting').hide();
			//如果会议纪要已经创建，则录入会议纪要按钮变为查看会议纪要，
			if(summaryExitFlag == '1'){
				$('#queryMeetSummary').show();
			}else{
				$('#inputMeetSummary').show();
			}
		}
		if($.inArray("4", userIdentifiy) != -1){
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
		}
		if($.inArray("5", userIdentifiy) != -1){
			$('#copyInputMeeting').show();
			$('#closeWin').show();
		}
		if($.inArray("6", userIdentifiy) != -1){
			//如果会议状态是已结束，参加，不参加等按钮要隐藏
			if(meeting.flowStatus == 2){
				$('#reminderMeet').show();
				$('#cancelMeet').show();
				$('#changeMeeting').show();
				$('#replyInfo').show();
				$('#copyInputMeeting').show();
				$('#closeWin').show();
				/*$('#joinMeeting').hide();
				$('#refuseMeeting').hide();*/
			}else{
				$('#closeWin').show();
			}
		}
	}else if(meeting.status && meeting.flowStatus==2 && meeting.status == 6){
		if($.inArray("1", userIdentifiy) != -1 || $.inArray("2", userIdentifiy) != -1 || $.inArray("3", userIdentifiy) != -1){
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
		}
		if($.inArray("0", userIdentifiy) != -1){
			$('#inputMeetSummary').show();
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
			//如果会议纪要已经创建，则录入会议纪要按钮变为查看会议纪要，
			if(summaryExitFlag == '1'){
				$('#queryMeetSummary').show();
			}else{
				$('#inputMeetSummary').show();
			}
		}
		if($.inArray("4", userIdentifiy) != -1){
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
		}
		if($.inArray("5", userIdentifiy) != -1){
			$('#copyInputMeeting').show();
			$('#closeWin').show();
		}
		if($.inArray("6", userIdentifiy) != -1){
			//如果会议状态是已结束，参加，不参加等按钮要隐藏
			$('#changeMeeting').show();
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
		}
	}else if(meeting.status && meeting.flowStatus==2 && meeting.status == 8){
		if($.inArray("1", userIdentifiy) != -1 || $.inArray("2", userIdentifiy) != -1 || $.inArray("3", userIdentifiy) != -1){
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
			if(summaryExitFlag == '1'){
				$('#queryMeetSummary').show();
			}else{
				$('#summaryReminder').show();
			}
		}
		if($.inArray("0", userIdentifiy) != -1){
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
			//如果会议纪要已经创建，则录入会议纪要按钮变为查看会议纪要，
			if(summaryExitFlag == '1'){
				$('#queryMeetSummary').show();
			}else{
				$('#inputMeetSummary').show();
			}
		}
		if($.inArray("4", userIdentifiy) != -1){
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
			if(summaryExitFlag == '1'){
				$('#queryMeetSummary').show();
			}else{
				$('#summaryReminder').show();
			}
		}
		if($.inArray("5", userIdentifiy) != -1){
			$('#copyInputMeeting').show();
			$('#closeWin').show();
			if(summaryExitFlag == '1'){
				$('#queryMeetSummary').show();
			}else{
				$('#summaryReminder').show();
			}
		}
		if($.inArray("6", userIdentifiy) != -1){
			//如果会议状态是已结束，参加，不参加等按钮要隐藏
			$('#replyInfo').show();
			$('#copyInputMeeting').show();
			$('#closeWin').show();
			if(summaryExitFlag == '1'){
				$('#queryMeetSummary').show();
			}else{
				$('#summaryReminder').show();
			}
		}
	}else if(meeting.status && (meeting.flowStatus==1 || meeting.flowStatus==0 || meeting.flowStatus==3 || meeting.flowStatus==9) && meeting.status == 5){
		if($.inArray("6", userIdentifiy) != -1){
			//如果会议状态是已结束，参加，不参加等按钮要隐藏
			$('#closeWin').show();
		}
	}else{
		if(meeting.status == '11'){
			if($.inArray("5", userIdentifiy) == -1){
				$('#replyInfo').show();
			}
		}
		$('#joinMeeting').hide();
		$('#refuseMeeting').hide();
		$('#closeWin').show();
	}
	
}





function fillDate(meeting){
	$("input[name='id']").val(meeting.id);
	$("input[name='createUserId']").val(meeting.createUserId);
  	$("input[name='title']").val(meeting.title);
  	$("input[name='meetingTypeId']").val(meeting.meetingTypeId);
  	$("input[name='meetingType']").val(meeting.meetingType);
  	$("input[name='organDepartId']").val(meeting.organDepartId);
  	$("input[name='organDepart']").val(meeting.organDepart);
	$("select[name='status']").find("option[value='" + meeting.status +"']").attr("selected",true);
	$("input[name='address']").val(meeting.address);
	$("input[name='mtAppliance']").val(meeting.mtAppliance);
	$("input[name='emceeId']").val(meeting.emceeId);
	$("input[name='emceeName']").val(meeting.emceeName);
  	$("input[name='meetingOrganizationName']").val(meeting.meetingOrganizationName);
  	$("input[name='meetingOrganizationId']").val(meeting.meetingOrganizationId);
  	$("input[name='recorderId']").val(meeting.recorderId);
  	$("input[name='recorderName']").val(meeting.recorderName);
  	
  	$("#beginDate").val(subStringDate(meeting.beginDate));
  	$("#beginTime").val(subStringDate(meeting.beginTime));
  	$("#endDate").val(subStringDate(meeting.endDate));
  	$("#endTime").val(subStringDate(meeting.endTime));
	$("input[name='emceeId']").val(meeting.emceeId);
	$("input[name='recorderId']").val(meeting.recorderId);
	$("input[name='attendees']").val(meeting.attendees);
	$("input[name='attendeesName']").val(meeting.attendeesName);
	
	$("input[name='copySendId']").val(meeting.copySendId);
	$("input[name='copySendName']").val(meeting.copySendName);
	$("textarea[name='meetingTarget']").val(meeting.meetingTarget);
	$("textarea[name='meetingOutputDoc']").val(meeting.meetingOutputDoc);
	$("textarea[name='meetingFollowActivity']").val(meeting.meetingFollowActivity);
	$("textarea[name='remarks']").val(meeting.remarks);
	$("input[name='otherReadersId']").val(meeting.otherReadersId);
	$("input[name='otherReaders']").val(meeting.otherReaders);
	$("#createPersonName").val(meeting.createPersonName).attr("disabled",true);
    $("#createDate").val(meeting.createDate).attr("disabled",true);
	
	$(":radio[name='notifiyWay'][value='" + meeting.notifiyWay + "']").prop("checked", "checked");
	$(":radio[name='disappearWay'][value='" + meeting.disappearWay + "']").prop("checked", "checked");
	var MeetingAagenda=meeting.list;
	if(MeetingAagenda.length>0){
		var countLengt=1;
		for(var o in MeetingAagenda){
			addCountList();
			var  Acount=$("#countForm").find("tr").eq(countLengt);
			Acount.find("input[name='meetingTime']").val(MeetingAagenda[o].meetingTime).attr("disabled",true);;
			Acount.find("input[name='id']").val(MeetingAagenda[o].id).attr("disabled",true);;
			Acount.find("input[name='meetingAgenda']").val(MeetingAagenda[o].meetingAgenda).attr("disabled",true);;
			Acount.find("input[name='meetingAgendaData']").val(MeetingAagenda[o].meetingAgendaData).attr("disabled",true);;
			Acount.find("input[name='submitDataUser']").val(MeetingAagenda[o].submitDataUser).attr("disabled",true);;
			
			countLengt++;
		}
	}
}

/**
 * author:wangw
 * describe: 修改时 添加子表页面
 * param: null
 */
function addCountList(){
	 var row=$('<tr>'
			 +'<td><input type="checkbox" name="check" ></td>'
	         +'<td style="text-align:center"></td>'
	         +'<td>'
	         +'<div class="input-group date form_datetime form-date"  data-date=""  data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">'
	         + '<input class="form-control" size="16" type="text" name="meetingTime" >'
	         //+ '<span class="input-group-addon" ><span class="glyphicon glyphicon-remove" ></span></span>'
	         + '<span class="input-group-addon" ><span class="glyphicon glyphicon-th"></span></span>'
	        
	         + '</div>'
	         +'</td>'
	         +'<td><div><input type="hidden" name="id" ><input type="text" name="meetingAgenda"  class="form-control addInputWidth" ></div></td>'
	         +'<td>'
	         +'<div><input type="text" name="meetingAgendaData" class="form-control addInputWidth" ></div>'
	         +'</td>'
	         +'<td>'
	         +'<div><input type="text" name="submitDataUser" class="form-control addInputWidth" ></div>'
	         +'</td>'
	         +'</tr>');
		     $("#countForm").append(row);
      resetNum();

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
 * add by yongmei.xiao
 */
function disabledInput(meeting){
	 $("#title").attr("disabled",true);
	  $("#beginDate").attr("disabled",true);
	  $("#endDate").attr("disabled",true);
	  $("#meetingTypeId").attr("disabled",true);
	  $("#meetingType").attr("disabled",true);
	  $("#organDepartId").attr("disabled",true);
	  $("#organDepart").attr("disabled",true);
	  $("#status").attr("disabled",true);
	 /* $("select[name='status']").find("option[value='" + meeting.status +"']").attr("disabled",true);*/
	  $("#address").attr("disabled",true);
	  $("#mtAppliance").attr("disabled",true);
	  $("#emceeId").attr("disabled",true);
	  $("#emceeName").attr("disabled",true);
	  $("#meetingOrganizationName").attr("disabled",true);
	  $("#meetingOrganizationId").attr("disabled",true);
	  $("#recorderId").attr("disabled",true);
	  $("#recorderName").attr("disabled",true);
	  $("#beginTime").attr("disabled",true);
	  $("#endTime").attr("disabled",true);
	  $("#emceeId").attr("disabled",true);
	  $("#recorderId").attr("disabled",true);
	  $("#attendees").attr("disabled",true);
	  $("#attendeesName").attr("disabled",true);
	  $("#copySendId").attr("disabled",true);
	  $("#copySendName").attr("disabled",true);
	  
	  /*$("textarea[name='meetingTarget']").attr("disabled",true);
	  $("textarea[name='meetingOutputDoc']").attr("disabled",true);
	  $("textarea[name='meetingFollowActivity']").attr("disabled",true);
	  $("textarea[name='remarks']").attr("disabled",true);*/
	  $("#meetingTarget").attr("disabled",true);
	  $("#meetingOutputDoc").attr("disabled",true);
	  
	  $("#meetingFollowActivity").attr("disabled",true);
	  $("#remarks").attr("disabled",true);
	  $('.form_datetime').datetimepicker('remove');	//禁用日期选择
	  $(":radio").attr("disabled","disabled");
	  
	  $("#otherReadersId").attr("disabled",true);
	  $("#otherReaders").attr("disabled",true);
	  
	  $("#otherReaders").attr("disabled",true);
	  $("#otherReaders").attr("disabled",true);
	 $('#deleteLine').hide();
	 $('#increamLine').hide();
	  //把选人和选组织的弹出框
	  $('.multiple-selector').unbind('click');
	  $('.category-selecter').unbind('click');
	  $('.single-selector').unbind('click');
	  
	  $('.btn-select-by-model').off();	//解除绑定事件
	  
	  toChange();
	  
	  
}



/**
 * 格式化日期
 * add by yongmei.xiao
 */
function subStringDate(date){
	return date.substring(0,16);
}

/**
 * 系统统一入口生成ID
 */
function initUUId(){
  var url = hostUrl+"generator/getGuuid"+"?time="+Math.random();
	$.ajax({
      type:'get',
      url:url,
      success: function(data) {
       var guuid=data.result;
	    $("#id").val(guuid);
	    //初始化附件主要获取信息ID
        initFile(guuid,operationType);
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
 

/**
 * author:liuf
 * describe:删除子表
 * param: 
 */
function delAcount(){
	var type=$.xljUtils.getUrlParam('ack');// type 添加页面add  修改页面edit
	if(type=="create"){
		var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
		checkedTrObjs.remove();
		resetNum();
	}else{
		var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
		for(var o=0;o<checkedTrObjs.length;o++){
			var delDatas =	$(checkedTrObjs[o]).find(":input").serializeArray();
			var jsonData = {};
			for(var i in delDatas){
				jsonData[delDatas[i].name]=delDatas[i].value;
			}
			jsonData.meetingId=$("#newMeetingForm").find("input[name='id']").val();
			jsonData.delflag=1;
			MeetingAgendaList.push(jsonData);
		}
		checkedTrObjs.remove();
		resetNum();
	}
	
}

/**
 * author:liuf
 * describe: 子表新增时 添加行元素
 * param:  null
 */




/*+'<td>'
+'<div><input type="text" name="meetingTime"  class="form-control addInputWidth">'
+'<input type="hidden" name="id" value="'+guuid+'">'
+'</div>'
+'</td>
*/
function addCount(){
	$.ajax({
        type:'get',
        url:hostUrl+'generator/getGuuid?time='+Math.random(),
        success: function(data) {
        	if(data.success){
         var guuid=data.result;
         var row=$('<tr>'
         +'<td><input type="checkbox" name="check" ></td>'
         +'<td style="text-align:center"></td>'
         +'<td>'
         +'<div class="input-group date form_datetime form-date"  data-date=""  data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">'
         + '<input class="form-control" size="16" type="text" name="meetingTime"  readonly>'
         //+ '<span class="input-group-addon" ><span class="glyphicon glyphicon-remove" ></span></span>'
         + '<span class="input-group-addon" ><span class="glyphicon glyphicon-th"></span></span>'
        
         + '</div>'
         +'</td>'
         +'<td><div><input type="hidden" name="id" value="'+guuid+'"><input type="text" name="meetingAgenda"  class="form-control addInputWidth"></div></td>'
         +'<td>'
         +'<div><input type="text"  name="meetingAgendaData" class="form-control addInputWidth"></div>'
         +'</td>'
         +'<td>'
         +'<div><input type="text"  name="submitDataUser" class="form-control addInputWidth"></div>'
         +'</td>'
         +'</tr>');
	     $("#countForm").append(row);
	     
	     //动态添加时间事件
	     $('.form_datetime').datetimepicker({
	         language: 'zh-CN',
	         format: 'yyyy-mm-dd hh:ii',
	         weekStart: 1,
	         todayBtn: 1,
	         autoclose: 1,
	         todayHighlight: 1,
	         startView: 2,
	         forceParse: 0,
	         showMeridian: 1
	     });
	     
		 resetNum();
		 resetDeafault(row);
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
 * describe: 重设编号
 * param:  null
 */
function  resetNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td").eq(1).html(i);
		}
	});
}



/**
 * author:liuf
 * describe: 新增时 默认第一行是默认 是
 * param:  ele(当前元素)
 */
function resetDeafault(row){
		if(row.find("td").eq(1).html()=="1"){
			return;
		}else{
			row.find("td").eq(7).find("select").val("0");
		}
	}

/**
 * 点击参加后，该用户参加会议，信息表中要记录
 */
function joinMeeting(){
	
}




//点击参加或者不参加，保存该动作记录到会议回复表
function saveMeetingReploy(flag) {
	
	var meetingReloyDto={};
	var id=$("#id").val();
	meetingReloyDto.delflag=false;
	meetingReloyDto.meetingId=id;
	meetingReloyDto.joinFlag=flag;
	var disappearWay = $("input[name='disappearWay']:checked").val();
	
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: hostUrl+"oa/meeting/meetingReply/save",
		data:JSON.stringify(meetingReloyDto),
		dataType:"JSON",
		success: function (result) {
			if(result.success) {	//新增
				//$.xljUtils.tip('green', '处理成功！该待办在会议结束后自动消失');
				if(disappearWay == '0'){
					closeWin();
				}else{
					$.xljUtils.confirm('green', '处理成功！该待办在会议结束后自动消失',function(){
						closeWin();
					});
				}
				
				//
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
		url: hostUrl+"oa/meeting/meetingReply/save",
		data:JSON.stringify(meetingReloyDto),
		dataType:"JSON",
		success: function (result) {
			if(result.success) {	//新增
				$.xljUtils.confirm('green', '处理成功！该待办在会议结束后自动消失',function(){
					closeWin();
				});
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
		url: hostUrl+"oa/meeting/meeting/operationMeeting",
		data:JSON.stringify(meetingReloyDto),
		dataType:"JSON",
		success: function (result) {
			if(result.success) {	//新增
				window.opener.location.href=window.opener.location.href;
				if($.inArray("6", userIdentifiy) != -1){
					$.xljUtils.confirm('green', '处理成功！',function(){
						closeWin();
					});
					
				}else{
					$.xljUtils.confirm('green', '处理成功！该待办在会议结束后自动消失',function(){
						closeWin();
					});
				}
				userIdentifiy = null;
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
	$("#myModal").modal({backdrop:'static',show:true});
	
	var meetingReloyDto={};
	meetingReloyDto.meetingId=$("#id").val();
	 //回显会议数据
    $.ajax({
    	type: "POST",
    	contentType: "application/json",
        url:hostUrl + 'oa/meeting/meetingReply/getUserInfoByMeetingId/'+'?time='+Math.random(),
        data:JSON.stringify(meetingReloyDto),
		dataType:"JSON",
        success: function(data) {
        	var meeting=data.result;
        	$("#attendUser").html(meeting.attendUser);	//参会人员
        	$("#noAttendUser").html(meeting.noAttendUser);	//未参会人员
			$("#noReployUser").html(meeting.noReployUser);	//未回复人员
			$("#reployRecord").html(meeting.reployRecord);	//回复记录
        },
    	error: function (jqXHR, textStatus, errorThrown) {
			MeetingAgendaList=[];
			$.xljUtils.getError(jqXHR.status);
    	}
	});
}
//会议纪要人可以在查看页面录入会议纪要，点击会议纪要，会跳转到录入会议纪要页面
function inputMeetSummary(){
	var meetingId=$("#id").val();
	window.open(hostUrl+"meeting/meetingSummary/meetingSummary_edit.html?meetingId="+meetingId+"&createSummary="+true+"&act="+"create");
}


//会议纪要人可以在查看页面录入会议纪要，点击会议纪要，会跳转到录入会议纪要页面
function queryMeetSummary(){
	var meetingSummaryId=$("#meetingSummaryId").val();
	window.open(hostUrl+"meeting/meetingSummary/meetingSummary_view.html?id="+meetingSummaryId+"&update="+false+"&act="+"view");
}

//会议变更类似于拷贝录入页面，重新打开页面，重新生成id
function changeMeeting(){
	/*operationMeeting("change");*/
	var meetingId=$("#id").val();
	
	var newId;
	$.ajax({
	 	type: 'get',
	 	url: hostUrl + "generator/getGuuid?time=" + Math.random(),
		async: false,
	 success: function (data) {
	     newId = data.result;
	 	}
	 });

	$.ajax({
		type: 'POST',
		url: hostUrl + 'oa/meeting/meeting/attachment/save',
		contentType: "application/json",
		dataType:'json',
		data:JSON.stringify({appId: '1',businessId: meetingId,categoryId: '1',newBusinessId:newId}),
		success: function (data) {
			//window.open("meeting_edit.html?act=change&update=true&id="+meetingId+"&newId="+newId);
			window.location.href="meeting_edit.html?act=change&update=true&id="+meetingId+"&newId="+newId;
		}
	});
	
	//window.open("meeting_edit.html?act=change&update=true&id="+meetingId);
}


//再各个查勘人页面，点击拷贝录入页面，会把当前的页面数据重新复制一份，打开新的编辑页面
/*function copyInputMeeting(){
	enabledInput();
	//var meetingId=$("#id").val();
	//window.open("meeting_edit.html?act=copy&update=copy&id="+meetingId);
	
}*/


function copyInputMeeting(){
	var meetingId=$("#id").val();
	//window.open("meeting_edit.html?act=copy&update=copy&id="+meetingId);
	
	
	var newId;
	$.ajax({
	 	type: 'get',
	 	url: hostUrl + "generator/getGuuid?time=" + Math.random(),
		async: false,
	 success: function (data) {
	     newId = data.result;
	 	}
	 });

	$.ajax({
		type: 'POST',
		url: hostUrl + 'oa/meeting/meeting/attachment/save',
		contentType: "application/json",
		dataType:'json',
		data:JSON.stringify({appId: '1',businessId: meetingId,categoryId: '1',newBusinessId:newId}),
		success: function (data) {
			//window.open("meeting_edit.html?act=copy&update=copy&id="+meetingId+"&newId="+newId);
			window.location.href="meeting_edit.html?act=copy&update=copy&id="+meetingId+"&newId="+newId;
		}
	});
	//windows.location.href="meeting_edit.html?act=copy&update=copy&id="+meetingId;
}



/**
 * 拷贝录入的时候当前页面可以操作
 * add by wangpw
 */
function enabledInput(){
	 $("#title").attr("disabled",false);
	  $("#beginDate").attr("disabled",false);
	  $("#endDate").attr("disabled",false);
	  $("#meetingTypeId").attr("disabled",false);
	  $("#meetingType").attr("disabled",false);
	  $("#organDepartId").attr("disabled",false);
	  $("#organDepart").attr("disabled",false);
	  $("#address").attr("disabled",false);
	  $("#mtAppliance").attr("disabled",false);
	  $("#emceeId").attr("disabled",false);
	  $("#emceeName").attr("disabled",false);
	  $("#meetingOrganizationName").attr("disabled",false);
	  $("#meetingOrganizationId").attr("disabled",false);
	  $("#recorderId").attr("disabled",false);
	  $("#recorderName").attr("disabled",false);
	  $("#beginTime").attr("disabled",false);
	  $("#endTime").attr("disabled",false);
	  $("#emceeId").attr("disabled",false);
	  $("#recorderId").attr("disabled",false);
	  $("#attendees").attr("disabled",false);
	  $("#attendeesName").attr("disabled",false);
	  $("#copySendId").attr("disabled",false);
	  $("#copySendName").attr("disabled",false);
	  $("#meetingTarget").attr("disabled",false);
	  $("#meetingOutputDoc").attr("disabled",false);
	  
	  $("#meetingFollowActivity").attr("disabled",false);
	  $("#remarks").attr("disabled",false);
	  $(":radio").attr("disabled",false);
	  
	  $("#otherReadersId").attr("disabled",false);
	  $("#otherReaders").attr("disabled",false);
	 
}

//js获取当前日期时间“yyyy-MM-dd HH:MM”
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes();
    return currentdate;
} 


/**
 * 点击会议代办消失方式，
 */
function toChange(){
    var obj = document.getElementsByName('notifiyWay');
    for(var i=0;i<obj.length;i++){
        if(obj[i].checked==true){
            if(obj[i].value=='1'){
            	$("#disappearWayTr").show();
            }else if(obj[i].value=='0'){
            	$("#disappearWayTr").hide();
            }
        }
    }
}

//添加收藏之前，先查找到要收藏的文件夹的id
function queryCollectionId(){
	var paramData;
    paramData = JSON.stringify({'code':"MEETING"});
		$.ajax({
			type:'post',
			url:hostUrl+'oa/favorite/queryList'+"?time="+Math.random(),
			dataType:'json',
			contentType:'application/json',
			data:paramData,
			success: function(data) {
				if(data.success){
					if(data.result){
						var favorite=data.result;
						if(favorite.length > 0){
							var parentId = favorite[0].id;
							var urlTem = hostUrl+"generator/getGuuid"+"?time="+Math.random();
							$.ajax({
							      type:'get',
							      url:urlTem,
							      success: function(data) {
							        var guuid=data.result;
							        collection(guuid,parentId);
							      }
								});
						}else{
							//查询会议管理的收藏夹是否存在，不存在，则要创建
							createMeetingCollection("MEETING");
						}
					}
				}else{
					$.xljUtils.tip("red",data.msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
}

////如果会议的收藏文件夹不存在，则要创建
function createMeetingCollection(code){
	var urlTem = hostUrl+"generator/getGuuid"+"?time="+Math.random();
	$.ajax({
	      type:'get',
	      url:urlTem,
	      success: function(data) {
	        var guuid=data.result;
	        var favoriteDto={};
	    	favoriteDto.delflag=false;
	    	favoriteDto.id=guuid;
	    	favoriteDto.code=code;
	    	//首次创建parentId为空
	    	//favoriteDto.parentId=parentId;
	    	//favoriteDto.resourceLink=window.location.pathname+window.location.search;
	    	favoriteDto.name="会议管理";
	    	favoriteDto.isFavorite=true;
	    	$.ajax({
	    		type: "POST",
	    		contentType: "application/json",
	    		url: hostUrl+"oa/favorite/save",
	    		data:JSON.stringify(favoriteDto),
	    		dataType:"JSON",
	    		success: function (result) {
	    			if(result.success) {	//新增
	    				//$.xljUtils.tip('green', '创建收藏夹成功！');
	    				var urlTemTem = hostUrl+"generator/getGuuid"+"?time="+Math.random();
	    				$.ajax({
	    			      type:'get',
	    			      url:urlTemTem,
	    			      success: function(data) {
	    			       var guuidTem=data.result;
	    				    collection(guuidTem,guuid);
	    			      }
	    				});
	    			}else {
	    				MeetingAgendaList=[];
	    				$.xljUtils.tip('red', '创建收藏夹失败！');
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
	});
}
//页面添加收藏的操作
function collection(guuid,parentId){
	//把业务id作为收藏表中创建的本地收藏的id
	var meetingId=$("#id").val();
	var favoriteDto={};
	favoriteDto.delflag=false;
	favoriteDto.id=meetingId;
	favoriteDto.code=meetingId;
	favoriteDto.parentId=parentId;
	favoriteDto.resourceLink=window.location.pathname+window.location.search;
	favoriteDto.name=$('#title').val();
	favoriteDto.isFavorite=false;
	favoriteDto.linkType="OUTTER";
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: hostUrl+"oa/favorite/save",
		data:JSON.stringify(favoriteDto),
		dataType:"JSON",
		success: function (result) {
			if(result.success) {	//新增
				$.xljUtils.tip('green', '收藏成功！');
			}else {
				MeetingAgendaList=[];
				$.xljUtils.tip('red', '收藏失败！');
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