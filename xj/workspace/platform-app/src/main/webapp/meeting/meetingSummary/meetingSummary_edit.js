var MeetingAgendaList =new Array(); //全局变量 子表list
var type=$.xljUtils.getUrlParam('act');// type 添加页面create 修改页面update
var saveOrFlow=null;
/**
 * 关闭窗口
 * add by wangpw
 */
function closeWin() {
	window.close();
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
	
	function formatMeetingZTreeData(arr) {
		$.each(arr, function(index, value){
			value.iconSkin = 'diy-group';
			value.name = value.title;
		});
		return arr;
	};
	
	$('.meetingTitle-selecter').xljSingleSelector({
		title:'选择会议主题',//选择器标题，默认是'选择组织机构'
		selectorType:'meeting',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:hostUrl + 'oa/meeting/meeting/getAllMeetingByRecordUser?random=' + Date.now(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{userIdentifiy:'0',flowStatus:'2'},//生成zTree树的请求参数，json对象
		targetId:'meetingId',//选择的数据的ID存储input域的id
		targetName:'mtTitle',//选择的数据的Name存储input域
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("input[name='mtTitle']").val(selectData.name);
				$("input[name='meetingId']").val(selectData.id);
				
				$("input[name='mtTitle']").val(selectData.title);
			  	$("input[name='meetingType']").val(selectData.meetingType);
			  	$("input[name='hyjyFlowInstanceCode']").val(selectData.hyjyFlowInstanceCode);
			  	$("#planBeginDate").val(subStringDate(selectData.beginDate));
			  	$("#planBeginTime").val(subStringDate(selectData.beginTime));
			  	
			  	var currentdate = getNowFormatDate();
			  	$("#entryDate").val(currentdate);
			  	$("#actualBeginTime").val(subStringDate(selectData.beginTime));
			  	
			  	$("input[name='planAddress']").val(selectData.address);
			  	$("input[name='meetingOrganizationId']").val(selectData.meetingOrganizationId);
			  	$("input[name='meetingOrganizationName']").val(selectData.meetingOrganizationName);
			  	$("input[name='requirAttendeesId']").val(selectData.attendees);
			  	$("input[name='requirAttendeesName']").val(selectData.attendeesName);
			  	$("input[name='actualAttendeesId']").val(selectData.actualAttendeesId);
			  	$("input[name='actualAttendeesName']").val(selectData.actualAttendeesName);
			  	$("input[name='emceeId']").val(selectData.emceeId);
			  	$("input[name='emceeName']").val(selectData.emceeName);
			  	
			  	
			  	$("input[name='recorderId']").val(selectData.recorderId);
			  	$("input[name='recorderName']").val(selectData.recorderName);
			  	
			  //属性设置为不可编辑
			  	disabledMeetingInput(selectData);
			}
		},
		formatTreeJson:formatMeetingZTreeData,
		treeSettings:{data:{
				simpleData: {
					enable: true,
					idKey: 'id',
					pIdKey: 'pId'
				}
			}
		}
	});
	/*$('.category-selecter').xljSingleSelector({
		title:'选择会议类型',//选择器标题，默认是'选择组织机构'
		selectorType:'meeting',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:hostUrl + 'oa/meeting/meetingType/queryList?random=' + Date.now(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{},//生成zTree树的请求参数，json对象
		targetId:'meetingTypeId',//选择的数据的ID存储input域的id
		targetName:'meetingType',//选择的数据的Name存储input域
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("input[name='meetingType']").val(selectData.name);
				$("input[name='meetingTypeId']").val(selectData.id);
				
			}
		},
		formatTreeJson:formatZTreeData,
		treeSettings:{data:{
				simpleData: {
					enable: true,
					idKey: 'id',
					pIdKey: 'parentId'
				}
			}
		}
	});*/
	
	$('.form_datetime').on('click',function () {
		WdatePicker({
			el: $(this).find(':input')[0],
			dateFmt: "yyyy-MM-dd HH:mm:ss",
			errDealMode: -1
		});
	});/*.datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });*/
	  
	var nowStr = formatDate();
	$("#beginDate").val(nowStr);
	var startDate, endDate;
	
	 var urlParam = $.xljUtils.getUrlParams();
     var act;
     var id;
     var update;
     var createSummary;
     if(urlParam){
    	 act = urlParam.act;
    	 id = urlParam.id;
    	 update = urlParam.update;
    	 createSummary= urlParam.createSummary;
     }
     if(act&&act=='create' || act=='copy'){	//新建页面
         $("#editTitle").text('新增会议纪要');
         $("#firstTitle").text('会议管理-新增会议纪要');
         initUUId();
     }
     $('.empty').click(function() {
    	 $(this).siblings('input').val('');
     });
	 if(id != null && update == 'false'){	//查看页面
		 $("#editTitle").text('查看会议纪要');
		 $("#firstTitle").text('会议管理-查看会议纪要');
		 $('#submitForm, #submitFormAndClose').hide();
		 $.ajax({
	  	        type:'get',
	  	        url:baseUrl + 'oa/meeting/meetingSummary/get/'+id+"?time="+Math.random(),
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
		 $("#firstTitle").text('会议管理-修改会议纪要');
		 $.ajax({
	  	        type:'get',
	  	        url:baseUrl + 'oa/meeting/meetingSummary/get/'+id+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	fillDate(meeting);
	        	 	startDate = getTimeMills($('#beginDate').val());
	        	 	endDate =  getTimeMills($('#endDate').val());
	        	 	disabledMeetingInput(meeting);
	  	        }
	  		});
		//回显附件
         initFile(id,type);
	 }else if(createSummary == 'true'){	//新增会议纪要，把会议的部分内容回显到会议纪要页面,在查看会议页面录入的会议纪要
		 var meetingId = urlParam.meetingId;
		 $.ajax({
	  	        type:'get',
	  	        url:baseUrl + 'oa/meeting/meeting/getMeetingInfo/'+meetingId+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	fillMeetingDate(meeting);
	        	 	startDate = getTimeMills($('#beginDate').val());
	        	 	endDate =  getTimeMills($('#endDate').val());
	  	        }
	  		});
	 }else if(id != null && update == 'copy'){	//拷贝录入页面
		 $("#editTitle").text('拷贝新增会议纪要');
		 $("#firstTitle").text('会议管理-拷贝新增会议纪要');
		 $.ajax({
	  	        type:'get',
	  	        url:baseUrl + 'oa/meeting/meetingSummary/get/'+id+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	fillDate(meeting);
	        	 	startDate = getTimeMills($('#beginDate').val());
	        	 	endDate =  getTimeMills($('#endDate').val());
	        	 	var newId=$.xljUtils.getUrlParam('newId');
	        	 	$("#id").val(newId);
	        	 	//回显附件
	                initFile(newId,type);
	  	        }
	  		});
	 }
     
     //定义datatimepicker的日期格式
     if(!(id != null && update == 'false')) {
     	/*$('.startDate').datetimepicker({
             language:  'zh-CN',
             format: 'yyyy-mm-dd hh:ii',
             weekStart: 1,
             todayBtn:  1,
             autoclose: 1,
             todayHighlight: 1,
             startView: 2,
             forceParse: 0,
             showMeridian: 1,
             startDate: new Date()
         }).on('changeDate', function(ev) {
         	startDate = ev.date.valueOf();
         	if(endDate && startDate > endDate) {
         		$.xljUtils.tip('red', '开始时间不能大于结束时间！');
         		$('#beginDate').val('').focus();
         		$(this).closest('td').addClass('has-error');
         	}else {
         		$(this).closest('td').removeClass('has-error');
         	}
         });
     	
     	$('.endDate').datetimepicker({
             language:  'zh-CN',
             format: 'yyyy-mm-dd hh:ii',
             weekStart: 1,
             todayBtn:  1,
             autoclose: 1,
             todayHighlight: 1,
             startView: 2,
             forceParse: 0,
             showMeridian: 1,
             startDate: new Date()
         }).on('changeDate', function(ev) {
         	endDate = ev.date.valueOf();
         	if(startDate && startDate > endDate) {
         		$.xljUtils.tip('red', '结束时间不能小于开始时间！');
         		$('#endDate').val('').focus();
         		$(this).closest('td').addClass('has-error');
         	}else {
         		$(this).closest('td').removeClass('has-error');
         	}
         })
         $('.lrDate').datetimepicker('setStartDate', new Date());*/
     }
     
	 /**
	  * 保存会议
	  * add by wangpw
	  */
	 $("#submitForm").click(function () {
		 if($("#newMeetingForm").valid()) {
			 saveOrFlow="save";
			 submitForm(act);
		 }
	 });
	 
	 //保存&新增
	 $('#submitFormAndClose').click(function() {
		 if($("#newMeetingForm").valid()) {
			 saveOrFlow="save";
			 submitForm(act, true);
		 }
	 })

	//暂存按钮
	$('#tempSubmitBtn').click(function () {
		var title = $("input[name='title']");
		if($.trim(title)==''){
			$.xljUtils.tip("blue","会议主题不能为空！");
			return;
		}
		saveOrFlow="save";
		submitForm('tempSave', false);
	});
	 
	 $("#startFlow").click(function () {
		 if($("#newMeetingForm").valid()) {
			 saveOrFlow="flow";
			 submitForm(type);
			 //startFlow();
		 }
		  
	 });
	 
	 //直接审结
	 $("#directConclusion").click(function () {
		 if($("#newMeetingForm").valid()) {
			 directConclusion();
		 }
	 });
});

/**
 * 填充数据
 * @param meeting
 */
function fillDate(meeting){
	$("input[name='id']").val(meeting.id);
	$("input[name='recorderId']").val(meeting.recorderId);
	$("input[name='recorderName']").val(meeting.recorderName);
	$("input[name='meetingId']").val(meeting.meetingId);
  	$("input[name='mtTitle']").val(meeting.mtTitle);
  	$("input[name='meetingTypeId']").val(meeting.meetingTypeId);
  	$("input[name='meetingType']").val(meeting.meetingType);
	if(meeting.meetingTypeId&&meeting.meetingTypeId!=''){
		getMeetingTypeData(meeting.meetingTypeId);
	}
  	// $("input[name='hyjyFlowInstanceCode']").val(meeting.hyjyFlowInstanceCode);
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
  	$("#copySendName").val(subStringDate(meeting.copySendName));
  	$("#otherReadersId").val(subStringDate(meeting.otherReadersId));
  	$("#otherReaders").val(subStringDate(meeting.otherReaders));
  	$("#otherReadersId").val(subStringDate(meeting.otherReadersId));
  	$("#otherReaders").val(subStringDate(meeting.otherReaders));
  	$("textarea[name='meetingContent']").val(meeting.meetingContent);
	$("textarea[name='meetingRecord']").val(meeting.meetingRecord);
	$("textarea[name='meetingResult']").val(meeting.meetingResult);
	$("textarea[name='remarks']").val(meeting.remarks);
	
	
}

/**
 * 在会议纪要页面填充会议的基本信息
 * @param meeting
 */
function fillMeetingDate(meeting){
	
  	$("input[name='mtTitle']").val(meeting.title);
  	$("input[name='meetingType']").val(meeting.meetingType);
	if(meeting.meetingTypeId&&meeting.meetingTypeId!=''){
		getMeetingTypeData(meeting.meetingTypeId);
	}
  	// $("input[name='hyjyFlowInstanceCode']").val(meeting.hyjyFlowInstanceCode);
  	$("#planBeginDate").val(subStringDate(meeting.beginDate));
  	$("#planBeginTime").val(subStringDate(meeting.beginTime));
  	$("input[name='meetingId']").val(meeting.id);
  	$("input[name='planAddress']").val(meeting.address);
  	
  	$("input[name='meetingOrganizationId']").val(meeting.meetingOrganizationId);
  	$("input[name='meetingOrganizationName']").val(meeting.meetingOrganizationName);
  	$("input[name='emceeId']").val(meeting.emceeId);
  	$("input[name='emceeName']").val(meeting.emceeName);
  	$("input[name='requirAttendeesName']").val(meeting.attendees);
  	$("input[name='requirAttendeesName']").val(meeting.attendeesName);
	$("input[name='actualAttendeesId']").val(meeting.actualAttendeesId);
	$("input[name='actualAttendeesName']").val(meeting.actualAttendeesName);
	$("input[name='recorderId']").val(meeting.recorderId);
	$("input[name='recorderName']").val(meeting.recorderName);
	
	var currentdate = getNowFormatDate();
  	$("#entryDate").val(currentdate);
  	$("#actualBeginTime").val(subStringDate(meeting.beginTime));
  	//属性设置为不可编辑
  	disabledMeetingInput(meeting);
}

/**
 * 在会议纪要页面设置会议的基本信息不可编辑
 * add by wangpw
 */
function disabledMeetingInput(meeting){
	/* $("#mtTitle").attr("disabled",true);
	  $("#meetingType").attr("disabled",true);
	  $("#planBeginDate").attr("disabled",true);
	  $("#planBeginTime").attr("disabled",true);
	  $("#planAddress").attr("disabled",true);
	  $("#meetingOrganizationName").attr("disabled",true);
	  $("#emceeName").attr("disabled",true);
	  $("#requirAttendeesName").attr("disabled",true);*/
	  
	  
		
	  //把选人和选组织的弹出框
	/*  $('.category-selecter').unbind('click');
	  $('.multiple-selector').unbind('click');
	  $('.single-selector').unbind('click');
	  $('.form_datetime').datetimepicker('remove');	//禁用日期选择
*/}

//根据时间字符串返回毫秒数
function getTimeMills(str) {
	if(str == null){
		return;
	}
	var s = str.split(' ');
	var s1 = s[0].split('-');
	var s2 = s[1].split(':');
	return +new Date(s1[0], s1[1] - 1, s1[2], s2[0], s2[1], 0);
}

/**
 * 日期格式化
 * add by wangpw
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
 * 清空会议主题相关
 */
function emptyTitle() {
	$('#meetingId').val('');
	$('#mtTitle').val('');
	$('#planAddress').val('');
	$('#planBeginTime').val('');
	$('#meetingOrganizationId').val('');
	$('#meetingOrganizationName').val('');
	$('#emceeId').val('');
	$('#emceeName').val('');
	$('#requirAttendeesId').val('');
	$('#requirAttendeesName').val('');
}
/**
 * 设置页面不可操作
 * add by wangpw
 */
function disabledInput(meeting){
	$("input[name='id']").attr("disabled",true);
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
  	$("#copySendName").attr("disabled",true);
  	$("#otherReadersId").attr("disabled",true);
  	$("#otherReaders").attr("disabled",true);
  	$("textarea[name='meetingContent']").attr("disabled",true);
	$("textarea[name='meetingRecord']").attr("disabled",true);
	$("textarea[name='meetingResult']").attr("disabled",true);
	$("textarea[name='remarks']").attr("disabled",true);
	$('.form_datetime').datetimepicker('remove');	//禁用日期选择
	  
	$('.btn-select-by-model').off();	//解除绑定事件
}
/**
 * 格式化日期
 * add by wangpw
 */
function subStringDate(date){
	if(date != null){
		return date.substring(0,16);
	}else{
		return null;
	}
	
}
//提交数据  flag为标识  标识保存后是否关闭
function submitForm(type, flag) {
	/*if(operationType == 'create'&&$('#documentAttachments').find('ul li').length==0){
    $.xljUtils.tip('blue', '文档附件不能为空!');
    return;
	}*/
	/*var startdate = $('#planBeginDate').val()+ " "+ $('#planBeginTime').val();
	var enddate = $('#actualBeginDate').val()+ " "+ $('#actualBeginTime').val();
	var time1 = new Date(startdate).getTime();
	var time2 = new Date(enddate).getTime();
	if(time1>time2){
	 $.xljUtils.tip('blue', '开始时间不能大于结束时间!');
	 //$('#endDate').val('').focus();
	    return;
	}*/
	 if(saveOrFlow=="flow"){
		 var hyjyFlowInstanceCode=$("#hyjyFlowInstanceCode").val();
		 if(hyjyFlowInstanceCode==""){
			 $.xljUtils.tip('blue', '会议列别没有绑定会议纪要流程，请暂存之后，绑定流程!');
			 return;
		 }
     }
	
	//组织会议纪要参数信息
	var url = '';
	var newMeetingArr= $("#newMeetingForm").serializeArray();
	var meetingSummaryDto={};
	for(var i in newMeetingArr){
		if(newMeetingArr[i].name=="mtTitleId"){
		}else{
			meetingSummaryDto[newMeetingArr[i].name]=newMeetingArr[i].value;
		}
	}
	//添加是否审结的标志
	if(saveOrFlow=="sj"){
		meetingSummaryDto.conclusion = "sj";
	  }
	//如果id有值，则更新 否则保存添加
	if(type == 'update') {
		var id=$("#id").val();
		meetingSummaryDto.delflag=false;
		meetingSummaryDto.id=id;
    	url = baseUrl + "oa/meeting/meetingSummary/update/"+id+"?time="+Math.random();;
	}else {
		meetingSummaryDto.delflag=false;
		if($.xljUtils.getUrlParams().meetingId){
			meetingSummaryDto.meetingId=$.xljUtils.getUrlParams().meetingId;
		}
		url = baseUrl+"oa/meeting/meetingSummary/save";
		//暂存操作
		if(type == 'tempSave'){
			url = baseUrl + "oa/meeting/meetingSummary/temporary/save";
		}
	}
	
	$.ajax({
		type: type == 'update' ? "PUT" : "POST",
		contentType: "application/json",
		url: url,
		data:JSON.stringify(meetingSummaryDto),
		dataType:"JSON",
		async:false,
		success: function (result) {
			if(result.success) {	//新增
				//window.opener.location.href=window.opener.location.href;
				var createSummary=$.xljUtils.getUrlParam('createSummary');
				if(createSummary == 'true'){
				}else{
					if(window.opener&&$.isFunction(window.opener.reloadGrid)){
						window.opener.reloadGrid(meetingSummaryDto.id);
					}

				}
				if(flag === true) {	//保存并新增
					$.xljUtils.tip('green', '数据保存成功！');
					window.location.href = baseUrl + '/meeting/meetingSummary/meetingSummary_edit.html?act=create';
             	   $("#newMeetingForm")[0].reset();
             	 
				}else {
					$.xljUtils.tip('green', '数据保存成功！');
					//保存知识文档
					saveAttachement();
					
				}
			}else {
				MeetingAgendaList=[];
				$.xljUtils.tip('red', '数据保存失败！');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			MeetingAgendaList=[];
			/*$.xljUtils.getError(jqXHR.status);*/
			$.xljUtils.tip('red', '数据保存失败！');
			saveOrFlow=null;
	    },
	    complete:function(){
	    }
	});
}


/**
 * 保存附件
 */
function saveAttachement() {
    $('#documentAttachments').xljAttachmentSubmit(function (isSuccess,obj) {
        if (isSuccess) {
           /* if (obj.success === true) {
                $.xljUtils.tip('blue', '附件信息提交成功');
                if(saveOrFlow=="flow"){
                	startFlow();
				}
            }*/
        	if(saveOrFlow=="save" || saveOrFlow=="sj" || saveOrFlow=="flow"){
				if(type == 'tempSave'){
			 	}else{
			 		if(saveOrFlow=="flow"){
		            	startFlow();
		            }else{
		            	closeWin();
		            }
			 	}
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
  var url = baseUrl+"generator/getGuuid"+"?time="+Math.random();
	$.ajax({
      type:'get',
      url:url,
      success: function(data) {
       var guuid=data.result;
	    $("#id").val(guuid);
	    //初始化附件主要获取信息ID
	    if(type == 'copy'){
	    	
	    }else{
	    	initFile(guuid,type);
	    }
        
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
                        singleUpload: false,
                        isAsyncSubmit: false
                    });
                }catch (e){

                }
                break;
            case 'copy':
                try{
                    $('#documentAttachments').xljAttachment({
                        appId: '1',
                        businessId: contentRowTypeId,
                        categoryId: '1',
                        mode: 'edit',
                        singleUpload: false,
                        fromTempTable: true,
                        isAsyncSubmit: false
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
                        singleUpload: false
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
                        singleUpload: false,
                        isAsyncSubmit: false
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
function startFlow(){
	 
	 var businessId=$("#newMeetingForm").find("input[name='id']").val();
	 var hyjyFlowInstanceCode=$("#hyjyFlowInstanceCode").val();
  //window.open("/platform-app/flow/runtime/approve/start.html?businessObjectCode=hyjy&businessId="+businessId+"&time="+Math.random());
  window.location.href="/platform-app/flow/runtime/approve/start.html?flCode="+hyjyFlowInstanceCode+"&businessId="+businessId+"&time="+Math.random();

}
function flowCallBack(){
	var businessId=$("#newMeetingForm").find("input[name='id']").val();
	if(window.opener&&$.isFunction(window.opener.reloadGrid)){
		window.opener.reloadGrid(businessId);
	}
	window.close();
}


//在会议新增页面直接审结结束，不走流程
function directConclusion(){
	saveOrFlow="sj";
	 submitForm(type);
}

//取當前時間
function getNowFormatDate() {
    var dtCur = new Date();
    var yearCur = dtCur.getFullYear();
    var monCur = dtCur.getMonth() + 1;
    var dayCur = dtCur.getDate();
    var hCur = dtCur.getHours();
    var mCur = dtCur.getMinutes();
    var sCur = dtCur.getSeconds();
   /* var timeCur = yearCur + "-" + (monCur < 10 ? "0" + monCur : monCur) + "-"
      + (dayCur < 10 ? "0" + dayCur : dayCur) + " " + (hCur < 10 ? "0" + hCur : hCur)
      + ":" + (mCur < 10 ? "0" + mCur : mCur) + ":" + (sCur < 10 ? "0" + sCur : sCur);*/
    var timeCur = yearCur + "-" + (monCur < 10 ? "0" + monCur : monCur) + "-"
    + (dayCur < 10 ? "0" + dayCur : dayCur) + " " + (hCur < 10 ? "0" + hCur : hCur)
    + ":" + (mCur < 10 ? "0" + mCur : mCur) ;
    return timeCur;
  }

  //获取大类中的流程模板code

function getMeetingTypeData(MeetingTypeId){
	$.ajax({
		type:'get',
		url:hostUrl+"oa/meeting/meetingType/get/"+MeetingTypeId+'?time='+Math.random(),
		async:false,
		success: function(data) {
			if(data.success){
				var meetingType=data.result;
				$("input[name='hyjyFlowInstanceCode']").val(meetingType.hyjyFlowInstanceCode);
				$("input[name='hyjyFlowInstanceName']").val(meetingType.hyjyFlowInstanceName);
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
		}
	});
}
