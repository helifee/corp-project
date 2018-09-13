var MeetingAgendaList =new Array(); //全局变量 子表list
var deleteList = new Array(); //定义全局要删除的会议议程集合
var type=$.xljUtils.getUrlParam('act');// type 添加页面create 修改页面update
var saveOrFlow=null;
var act=null;
//操作类型
var operationType;
/**
 * 关闭窗口
 * add by hwl
 */
function closeWin() {
	window.close();
}

/**
 * 查询组织的时候获取组织全路径
 * @param selectData
 * @param ele
 */
function orgSaveCallback(selectData,ele) {
	debugger;
	if (selectData != null) {
		$("input[name='organDepart']").val(selectData.prefixName);
		$("input[name='organDepartId']").val(selectData.id);
	}
}

//初始化日期控件
$(function() {
	
	 var urlParam = $.xljUtils.getUrlParams();
     var act;
     var id;
     var update;
     if(urlParam){
    	 act = urlParam.act;
    	 id = urlParam.id;
    	 update = urlParam.update;
    	//操作类型
         operationType = urlParam.act;
     }
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
	
	$('.category-selecter').xljSingleSelector({
		title:'选择会议类型',//选择器标题，默认是'选择组织机构'
		selectorType:'meeting',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:serviceUrl + 'oa/meeting/meetingType/getTypetree?random=' + Date.now(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{},//生成zTree树的请求参数，json对象
		targetId:'meetingTypeId',//选择的数据的ID存储input域的id
		targetName:'meetingType',//选择的数据的Name存储input域
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("input[name='meetingType']").val(selectData.name);
				$("input[name='meetingTypeId']").val(selectData.id);
				$("input[name='flowInstanceCode']").val(selectData.flowInstanceCode);
				$("input[name='hyjyFlowInstanceCode']").val(selectData.hyjyFlowInstanceCode);
				$("input[name='flowInstanceName']").val(selectData.flowInstanceName);
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
	});
	  /*$('.form_datetime').datetimepicker({
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
	$("#beginTime").val(nowStr);
	var startDate, endDate;
	
	
     if(act&& (act=='create')){	//新建页面
         $("#editTitle").text('新增会议');
         $("#firstTitle").text('会议管理-新增会议');
         initUUId();
         getUserInfo();
     }
     $('.empty').click(function() {
    	 $(this).siblings('input').val('');
     })
	 if(id != null && update == 'false'){	//查看页面
		 $("#editTitle").text('查看会议');
		 $("#firstTitle").text('会议管理-查看会议');
		 $('#submitForm, #submitFormAndClose').hide();
		 $.ajax({
	  	        type:'get',
	  	        url:serviceUrl + 'oa/meeting/meeting/get/'+id+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	fillDate(meeting);
		  	        //查看页面不可操作
		  	 		disabledInput(meeting);
	  	        }
	  		});
		//回显附件
         initFile(id,operationType);
	 }else if(id != null && update == 'true'){	//编辑页面
		 if(type == "change"){
			 $("#editTitle").text('会议变更');
			 $("#firstTitle").text('会议管理-会议变更');
			//回显附件
			 var newId=$.xljUtils.getUrlParam('newId');
	         initFile(newId,operationType);
			 $("#changeMeetingId").val(id);
			 //initUUId();
			
			 $("#id").val(newId);
		 }else{
			 if(act='update'){
				 $("#editTitle").text('修改会议');
				 $("#firstTitle").text('会议管理-修改会议');
				//回显附件
		         initFile(id,operationType);
			 }
		 }
		 $.ajax({
	  	        type:'get',
	  	        url:serviceUrl + 'oa/meeting/meeting/get/'+id+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	fillDate(meeting);
	        	 	startDate = getTimeMills($('#beginTime').val());
	        	 	endDate =  getTimeMills($('#endTime').val());
	  	        }
	  		});
		 
	 }else if(id != null && update == 'copy' && act=="copy"){	//拷贝录入页面
		 $("#editTitle").text('拷贝新增会议');
		 $("#firstTitle").text('会议管理-拷贝新增会议');
		 $.ajax({
	  	        type:'get',
	  	        async:false,
	  	        url:serviceUrl + 'oa/meeting/meeting/get/'+id+"?time="+Math.random(),
	  	        success: function(data) {
	  	        	var meeting=data.result;
	  	        	//回显附件
	  	        	var newId=$.xljUtils.getUrlParam('newId');
			         initFile(newId,operationType);
	  	        	fillDate(meeting);
	        	 	startDate = getTimeMills($('#beginTime').val());
	        	 	endDate =  getTimeMills($('#endTime').val());
	        	 	 //initUUId();
	        	 	$("#id").val(newId);
	  	        }
	  		});
		 getUserInfo();
	 }
     
     //定义datatimepicker的日期格式
     if(!(id != null && update == 'false')) {
		 $('#beginTime').on('click',function () {
			 var maxDate = $('#endTime').val();
			 WdatePicker({
				 el: this,
				 dateFmt: "yyyy-MM-dd HH:mm:ss",
				 errDealMode:-1,
				 maxDate:'#F{$dp.$D(\'endTime\')}'
			 });
		 });
		 $('#beginTime').siblings('.input-group-addon').on('click',function () {
			 var maxDate = $('#endTime').val();
			 WdatePicker({
				 el: 'beginTime',
				 dateFmt: "yyyy-MM-dd HH:mm:ss",
				 errDealMode:-1,
				 maxDate:'#F{$dp.$D(\'endTime\')}'
			 });
		 });

		 $('#endTime').on('click',function () {
			 var minDate = $('#beginTime').val();
			 WdatePicker({
				 el: this,
				 dateFmt: "yyyy-MM-dd HH:mm:ss",
				 errDealMode:-1,
				 minDate:'#F{$dp.$D(\'beginTime\')}'
			 });
		 });
		 $('#endTime').siblings('.input-group-addon').on('click',function () {
			 var minDate = $('#beginTime').val();
			 WdatePicker({
				 el: 'endTime',
				 dateFmt: "yyyy-MM-dd HH:mm:ss",
				 errDealMode:-1,
				 minDate:'#F{$dp.$D(\'beginTime\')}'
			 });
		 });

     	/*$('.startDate').datetimepicker({
             language:  'zh-CN',
             format: 'yyyy-mm-dd hh:ii',
             weekStart: 1,
             todayBtn:  1,
             autoclose: 1,
             todayHighlight: 1,
             startView: 2,
             forceParse: 0,
             showMeridian: 1
         }).on('changeDate', function(ev) {
			if(ev.date){
				startDate = ev.date.valueOf();
				endDate =  getTimeMills($('#endTime').val());
				if(endDate && startDate > endDate) {
					$.xljUtils.tip('red', '开始时间不能大于结束时间！');
					$('#beginTime').val('');
					$(this).closest('td').addClass('has-error');
				}else {
					$(this).closest('td').removeClass('has-error');
				}
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
             showMeridian: 1
         }).on('changeDate', function(ev) {
			if(ev.date){
				startDate = getTimeMills($('#beginTime').val());
				endDate = ev.date.valueOf();
				if(startDate && startDate > endDate) {
					$.xljUtils.tip('red', '结束时间不能小于开始时间！');
					$('#endTime').val('');
					$(this).closest('td').addClass('has-error');
				}else {
					$(this).closest('td').removeClass('has-error');
				}
			}
         });
         $('.startDate').datetimepicker('setStartDate', new Date());
    	 $('.endDate').datetimepicker('setStartDate', new Date());*/
     }
     
	 /**
	  * 保存会议
	  * add by hwl
	  */
	 $("#submitForm").click(function () {
		 //$.xljUtils.customSingleValidate($('#newMeetingAgendaForm')[0]);
		 if($("#newMeetingForm").valid()) {
			 saveOrFlow="save";
			 submitForm(act);
		 }
	 });
	 
	 //发起审批
	 $("#startFlow").click(function () {
		 //$.xljUtils.customSingleValidate($('#newMeetingAgendaForm')[0]);
		 if($("#newMeetingForm").valid()) {
			 $(this).attr("disabled","true"); 
			 saveOrFlow="flow";
			 startFlow();
			 setTimeout("$('#startFlow').removeAttr('disabled')",5000); //设置三秒后提交按钮 显示  
		 }
		  
	 });
	 
	 //直接审结
	 $("#directConclusion").click(function () {
		 //$.xljUtils.customSingleValidate($('#newMeetingAgendaForm')[0]);
		 if($("#newMeetingForm").valid()) {
			 $(this).attr("disabled","true");
			 directConclusion();
			 setTimeout("$('#directConclusion').removeAttr('disabled')",5000); //设置三秒后提交按钮 显示  
		 }
	 });
	 
	 //保存&新增
	 $('#submitFormAndClose').click(function() {
		 //$.xljUtils.customSingleValidate($('#newMeetingAgendaForm')[0]);
		 if($("#newMeetingForm").valid() ) {
			 saveOrFlow="save";
			 $(this).attr("disabled","true"); 
			 submitForm(act, true);
			 setTimeout("$('#submitFormAndClose').removeAttr('disabled')",5000); //设置三秒后提交按钮 显示  
		 }
	 });
	//暂存按钮
	$('#tempSubmitBtn').click(function () {
		var title = $("input[name='title']");
		if($.trim(title)==''){
			$.xljUtils.tip("blue","会议主题不能为空！");
			return;
		}
		saveOrFlow = "tempSave";
		$(this).attr("disabled","true"); 
		submitForm('tempSave', false);
		setTimeout("$('#tempSubmitBtn').removeAttr('disabled')",5000); //设置三秒后提交按钮 显示  
   });
});

function fillDate(meeting){
	if(type == 'change' || type == 'copy'){
	}else{
		$("input[name='id']").val(meeting.id);
	}
	
  	$("input[name='title']").val(meeting.title);
  	$("input[name='meetingTypeId']").val(meeting.meetingTypeId);
  	$("input[name='meetingType']").val(meeting.meetingType);
	if(meeting.meetingTypeId&&meeting.meetingTypeId!=''){
		getMeetingTypeData(meeting.meetingTypeId);
	}
  	// $("input[name='flowInstanceCode']").val(meeting.flowInstanceCode);
  	// $("input[name='hyjyFlowInstanceCode']").val(meeting.hyjyFlowInstanceCode);
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
			Acount.find("input[name='meetingTime']").val(MeetingAagenda[o].meetingTime);
			
			Acount.find("input[name='id']").val(MeetingAagenda[o].id);
			Acount.find("input[name='meetingAgenda']").val(MeetingAagenda[o].meetingAgenda);
			Acount.find("input[name='meetingAgendaData']").val(MeetingAagenda[o].meetingAgendaData);
			Acount.find("input[name='submitDataUser']").val(MeetingAagenda[o].submitDataUser);
			
			countLengt++;
		}
	}
	
	//动态添加时间事件
    /*$('.form_datetime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        pickerPosition:'top-right'
    });*/

	$('.form_datetime').find(':input[name="meetingTime"]').on('click',function () {
		WdatePicker({
			el: this,
			dateFmt: "yyyy-MM-dd HH:mm:ss",
			errDealMode:-1
		});
	});
	$('.form_datetime').find(':input[name="meetingTime"]').siblings('.input-group-addon').on('click',function () {
		WdatePicker({
			el: $(this).siblings(':input[name="meetingTime"]')[0],
			dateFmt: "yyyy-MM-dd HH:mm:ss",
			errDealMode:-1
		});
	});
	
	toChange();
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
	         + '<input class="form-control" size="16" type="text" name="meetingTime"  readonly>'
	         //+ '<span class="input-group-addon" ><span class="glyphicon glyphicon-remove" ></span></span>'
	         + '<span class="input-group-addon" ><span class="glyphicon glyphicon-th"></span></span>'
	        
	         + '</div>'
	         +'</td>'
	         +'<td><div><input type="hidden" name="id" ><input type="text" name="meetingAgenda" data-html="true" maxlength="85" data-placeholder="会议议程" onblur="regData(this)" class="form-control addInputWidth"></div></td>'
	         +'<td>'
	         +'<div><input type="text"  name="meetingAgendaData" data-html="true"  data-maxlength="85" placeholder="对应议程的上会资料" onblur="regData(this)" class="form-control addInputWidth"></div>'
	         +'</td>'
	         +'<td>'
	         +'<div><input type="text"  name="submitDataUser" data-html="true"  data-maxlength="20" placeholder="资料提交人" onblur="regData(this)" class="form-control addInputWidth"></div>'
	         +'</td>'
	         +'</tr>');
		     $("#countForm").append(row);
      resetNum();

}

//根据时间字符串返回毫秒数
function getTimeMills(str) {
	if(str != ""){
		var s = str.split(' ');
		var s1 = s[0].split('-');
		var s2 = s[1].split(':');
		return +new Date(s1[0], s1[1] - 1, s1[2], s2[0], s2[1], 0);
	}else{
		return 0;
	}
	
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
	  $("select[name='status']").find("option[value='" + meeting.status +"']").attr("disabled",true);
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
	  $("#meetingTarget").attr("disabled",true);
	  $("#meetingOutputDoc").attr("disabled",true);
	  
	  $("#meetingFollowActivity").attr("disabled",true);
	  $("#remarks").attr("disabled",true);
	  //$('.form_datetime').datetimepicker('remove');	//禁用日期选择
	  $(":radio").attr("disabled","disabled");
	  $("#otherReadersId").attr("disabled",true);
	  $("#otherReaders").attr("disabled",true);
	 
	  $('.btn-select-by-model').off();	//解除绑定事件
}



/**
 * 格式化日期
 * add by yongmei.xiao
 */
function subStringDate(date){
	return date.substring(0,16);
}



//提交数据  flag为标识  标识保存后是否关闭
function submitForm(type, flag) {
	  /*if(operationType == 'create'&&$('#documentAttachments').find('ul li').length==0){
	        $.xljUtils.tip('blue', '文档附件不能为空!');
	        return;
	    }*/
	 if(saveOrFlow=="flow"){
		 var flowInstanceCode=$("#flowInstanceCode").val();
		 if(flowInstanceCode==""){
			 $.xljUtils.tip('blue', '会议类别没有绑定流程，请暂存之后，绑定流程!');
			 return;
		 }
     }
	
	//如果当前时间大于会议开始时间，说明会议已经开始，此时参半按钮需要隐藏
	var startdateTem = $("#beginTime").val();
	var startdateTem = $("#beginTime").val();
	//var time1 = new Date(startdate).getTime();
	var startdateTem=new Date(startdateTem.replace("-", "/").replace("-", "/")); 
	var newDateTem = new Date().valueOf();
	if(startdateTem<newDateTem){
		//$('#beginTime').focus();
		$.xljUtils.tip('blue', '会议开始时间不能小于当前时间!');
	/*	$('#beginTime').val('');
		$('#endTime').val('');
		$('#beginTime').focus();*/
        return;
	}


	if(type=='flow'||type=='sj'){
		var beginTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		if (beginTime!=''&&endTime!=''){
			var beginTimeTemp = new Date(beginTime.replace(/-/g,'/'));
			var endTimeTemp = new Date(endTime.replace(/-/g,'/'));
			if(endTime<beginTime){
				$.xljUtils.tip('blue','会议结束时间不能小于会议开始时间！');
				return;
			}
		}
	}


	//组织会议议程参数信息
	var meetingId=$("#newMeetingForm").find("input[name='id']").val();
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			var jsonDataArr =$(this).find(":input").serializeArray();
			var jsonData = {};
			jsonData.meetingId=meetingId;
			jsonData.delflag=0;
			for(var i in jsonDataArr){
				if(jsonDataArr[i].name=="check"){
	                continue;
	            }else{
	            	/*if(jsonDataArr[i].name=="meetingTime"){
	            		/!*var currentdate = getNowFormatDate();
						 jsonData[jsonDataArr[i].name]=currentdate;*!/
	            	}else{*/
	            		jsonData[jsonDataArr[i].name]=jsonDataArr[i].value;
	            	//}
	            }
			}
			MeetingAgendaList.push(jsonData);
		}
	});
	
	
	var url = '';
	var newMeetingArr= $("#newMeetingForm").serializeArray();
	var meetingDto={};
	for(var i in newMeetingArr){
		if(newMeetingArr[i].name=="flowInstanceName"){
            continue;
        }else{
        	meetingDto[newMeetingArr[i].name]=newMeetingArr[i].value;
        }
	}
	meetingDto.code="hygl";
	meetingDto.list = MeetingAgendaList;
	meetingDto.deleteList = deleteList;
	//添加是否审结的标志
	if(saveOrFlow=="sj"){
		meetingDto.conclusion = "sj";
	  }

	//如果id有值，则更新 否则保存添加
	if(type == 'update') {
		var id=$("#id").val();
		meetingDto.delflag=false;
    	meetingDto.id=id;
    	url = serviceUrl + "oa/meeting/meeting/update/"+id;
	}else {
		meetingDto.delflag=false;
		url = serviceUrl+"oa/meeting/meeting/save";
		//暂存操作
		if(type == 'tempSave'){
			url = serviceUrl + "oa/meeting/meeting/temporary/save";
		}
	}
	
	$.ajax({
		type: type == 'update' ? "PUT" : "POST",
		contentType: "application/json",
		url: url,
		data:JSON.stringify(meetingDto),
		dataType:"JSON",
		async:false,
		success: function (result) {
			if(result.success) {	//新增
				if(window.opener&&$.isFunction(window.opener.reloadGrid)){
					window.opener.reloadGrid(meetingDto.id);
				}
				 MeetingAgendaList=[];
         		 deleteList=[];
				if(flag === true) {	//保存并新增
					$.xljUtils.tip('green', '数据保存成功！');
					window.location.href = serviceUrl + '/meeting/meeting/meeting_edit.html?act=create';
             	   $("#newMeetingForm")[0].reset();
             	   $("#countForm").find("tr").not("tr:first").remove();
             	   addCount();
             	   getuuid();
             	   type="create";
             	  if(saveOrFlow=="save" || saveOrFlow=="sj"){
             		 MeetingAgendaList=[];
             		 deleteList=[];
					  window.close();
				  }
				}else {
					if(type == 'tempSave'){
						//保存知识文档
						saveAttachement();
						$.xljUtils.tip('green', '数据暂存成功！');
					}else{
						$.xljUtils.tip('green', '数据保存成功！');
						//保存附件
						if (operationType == 'create' || operationType == 'update' || operationType == 'copy' || operationType == 'change') {
							if(operationType == 'change'){
								var meetingOldId = $("#changeMeetingId").val();
								deleteFavoriteMeeting(meetingOldId);
							}
		                    //保存知识文档
							saveAttachement();
		                }
					}
				}
			}else {
				MeetingAgendaList=[];
				deleteList=[];
				$.xljUtils.tip('red', '数据保存失败！');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			MeetingAgendaList=[];
			deleteList=[];
			$.xljUtils.getError(jqXHR.status);
	    },
	    complete:function(){
	    	
	    }
	});
}


//删除一条会议，如果此会议被收藏，则收藏的会议要同时被删除
function deleteFavoriteMeeting(meetingOldId){
	 if (meetingOldId && meetingOldId != '') {
         $.ajax({
             url: serviceUrl + "oa/favorite/delete/" + meetingOldId,
             type: 'DELETE',
             dataType: 'JSON',
             success: function (resultData) {
                 if (resultData && resultData.success) {
             		//pop_tip_open("green","删除成功");
                 } else {
                     $.xljUtils.tip('red', resultData.msg);
                 }
             }
         });
     }
}



/**
 * 保存附件
 */
function saveAttachement() {
    $('#documentAttachments').xljAttachmentSubmit(function (isSuccess, obj) {
        if (isSuccess) {
           /* if (obj.success === true) {
                $.xljUtils.tip('blue', '附件信息提交成功');
            }*/
            
            if(type == 'tempSave'){
            }else{
            	if(saveOrFlow=="flow"){
	               	 var businessId=$("#newMeetingForm").find("input[name='id']").val();
	               	 var flowInstanceCode=$("#flowInstanceCode").val();
	               	 window.location.href="/platform-app/flow/runtime/approve/start.html?flCode="+flowInstanceCode+"&businessId="+businessId+"&time="+Math.random();
                }else{
                	closeWin();
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
  var url = serviceUrl+"sys/uuid/generator/getGuuid"+"?time="+Math.random();
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
        case 'change':
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
			deleteList.push(jsonData);
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
        url:serviceUrl+'sys/uuid/generator/getGuuid?time='+Math.random(),
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
         +'<td><div><input type="hidden" name="id" value="'+guuid+'"><input type="text" name="meetingAgenda" data-html="true"  data-maxlength="85" onblur="regData(this)" placeholder="会议议程" class="form-control addInputWidth"></div></td>'
         +'<td>'
         +'<div><input type="text"  name="meetingAgendaData" data-html="true" data-maxlength="85" placeholder="对应议程的上会资料" onblur="regData(this)" class="form-control addInputWidth"></div>'
         +'</td>'
         +'<td>'
         +'<div><input type="text"  name="submitDataUser" data-html="true" data-maxlength="20" placeholder="资料提交人" onblur="regData(this)" class="form-control addInputWidth"></div>'
         +'</td>'
         +'</tr>');
         
	     $("#countForm").append(row);
	     
	     //取消以前选中的行
	     $("[name='check']").removeAttr("checked");//取消全选   
	     document.documentElement.scrollTop =  document.documentElement.scrollHeight;
	    
	     
	     
	     $('body').scrollTop( $('body')[0].scrollHeight );
	     
	     
	     
	     //动态添加时间事件
	     /*$('.form_datetime').datetimepicker({
	         language: 'zh-CN',
	         format: 'yyyy-mm-dd hh:ii',
	         weekStart: 1,
	         todayBtn: 1,
	         autoclose: 1,
	         todayHighlight: 1,
	         startView: 2,
	         forceParse: 0,
	         showMeridian: 1,
	         pickerPosition:'top-right'
	     });*/
		$('.form_datetime').find(':input[name="meetingTime"]').on('click',function () {
			WdatePicker({
				el: this,
				dateFmt: "yyyy-MM-dd HH:mm:ss",
				errDealMode:-1
			});
		});
		$('.form_datetime').find(':input[name="meetingTime"]').siblings('.input-group-addon').on('click',function () {
			WdatePicker({
				el: $(this).siblings(':input[name="meetingTime"]')[0],
				dateFmt: "yyyy-MM-dd HH:mm:ss",
				errDealMode:-1
			});
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

/*function regData(){
	$.xljUtils.customSingleValidate($('#newMeetingAgendaForm')[0]);
	$("#newMeetingAgendaForm").valid();
	
//	var titleVal = $('#title').val();
//	$("#docContentForm").find("input[name='title']").parent().removeClass('has-error');
//	$('#title-error').remove();
//	if($.trim(titleVal)==''){
//	    $("#docContentForm").find("input[name='title']").parent().addClass('has-error');
//	    $("#docContentForm").find("input[name='title']").parent().append('<label id="title-error" class="error help-block" for="title" style="margin: 0px; text-align: left;">主题不能为空</label>');
//	    return;
//	}
	
}*/
function regData(ele){
	var placeholder=$(ele).attr("placeholder");
	var specialKey ="#$%\\'\\\\^*\"\+[]【】{}";
	var inputval=$(ele).val();
	if((specialKey.indexOf(inputval)>-1&&(inputval!=""))||inputval.indexOf("'")>-1||inputval.indexOf("&gt;")>-1||inputval.indexOf("&lt;")>-1){
		pop_tip_open("blue",placeholder+"不允许输入特殊字符");
		$(ele).val("");
		regInput=false;
		return;
	}
	var dataLength=$(ele).val().length;
	var dataMaxLength=$(ele).attr("data-maxlength");
	if(parseInt(dataLength)>parseInt(dataMaxLength)){
		pop_tip_open("blue",placeholder+"长度不能大于"+dataMaxLength);
		$(ele).val("");
		regInput=false;
		return;
	}else{
		regInput=true;
	}		
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
	    var tds = row.children();               //取得这个table下的所有行
	    var cell = tds[0];//获取某行下面的某个td元素
    	cell.firstChild.checked='checked';
		if(row.find("td").eq(1).html()=="1"){
			return;
		}else{
			row.find("td").eq(7).find("select").val("0");
		}
	}
/**
 * author:liuf
 * describe: 发起审批
 * param: 
 */
function  startFlow(){
	 saveOrFlow="flow";
	 submitForm(saveOrFlow);
	 var businessId=$("#newMeetingForm").find("input[name='id']").val();
	 //window.open("/platform-app/flow/runtime/approve/start.html?businessObjectCode=hygl&businessId="+businessId+"&time="+Math.random());
	 //window.location.href="/platform-app/flow/runtime/approve/start.html?businessObjectCode=hygl&businessId="+businessId+"&time="+Math.random();
	/* var businessId=$("#newMeetingForm").find("input[name='id']").val();
	 var flowInstanceCode=$("#newMeetingForm").find("input[name='flowInstanceId']").val();
	 window.open("/platform-app/flow/runtime/approve/start.html?flCode="+flowInstanceCode+"&businessId="+businessId+"&time="+Math.random());*/
}

function flowCallBack(){
	/*window.opener.reloadGrid();
	window.close();*/
	var businessId=$("#newMeetingForm").find("input[name='id']").val();
	if(window.opener&&$.isFunction(window.opener.reloadGrid)){
		window.opener.reloadGrid(businessId);
	}
	window.close();
}

//在会议新增页面直接审结结束，不走流程
function directConclusion(){
	saveOrFlow="sj";
	 submitForm(saveOrFlow);
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


/*function getUserInfo() {
   
    $.ajax({
        url:serviceUrl + 'oa/meeting/meeting/getUserInfo?_t='+new Date().getTime(),
        type:'GET',
        //async:false,
        dataType:'JSON',
        success:function (resultData) {
            if(resultData&&resultData.success){
                 var result = resultData.result;
                 $("#createPersonName").val(result.realName).attr("disabled",true);
                 $("#organDepartId").val(result.belongOrgId);
                 
                 var currentdate = getNowFormatDate();
                 $("#createDate").val(currentdate).attr("disabled",true);
            }else{
                $.xljUtils.tip('red','导航菜单信息获取失败，请联系管理员！');
            }
        },
        error:function (xhr) {
            $.xljUtils.getError(xhr.status);
        }
    });
    
}
*/


function getUserInfo(){
	$.ajax({
	      type:'get',
	      url: serviceUrl+"/oa/officeOut/getUserInfo"+"?time="+Math.random(),
	      async:false,
	      success: function(data) {
	    	  console.log(data);
	    	 /* $("#proposeUser").val(data.result.securityUserDto.realName);
    		  $("#proposeUserId").val(data.result.securityUserDto.id);
    		  $("#proposeDeptId").val(data.result.securityDirectDeptDto.prefixId);
    		  $("#proposeDept").val(data.result.securityDirectDeptDto.prefixName);*/
    		  
    		  $("#organDepart").val(data.result.securityDirectDeptDto!=null?data.result.securityDirectDeptDto.prefixName:"");
    		  $("#createPersonName").val(data.result.securityUserDto.realName).attr("disabled",true);
    		  var currentdate = getNowFormatDate();
              $("#createDate").val(currentdate).attr("disabled",true);
	   }
	 });
}


/*
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
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}*/

function getNowFormatDate() {
    var dtCur = new Date();
    var yearCur = dtCur.getFullYear();
    var monCur = dtCur.getMonth() + 1;
    var dayCur = dtCur.getDate();
    var hCur = dtCur.getHours();
    var mCur = dtCur.getMinutes();
    var sCur = dtCur.getSeconds();
    var timeCur = yearCur + "-" + (monCur < 10 ? "0" + monCur : monCur) + "-"
      + (dayCur < 10 ? "0" + dayCur : dayCur) + " " + (hCur < 10 ? "0" + hCur : hCur)
      + ":" + (mCur < 10 ? "0" + mCur : mCur) + ":" + (sCur < 10 ? "0" + sCur : sCur);
    return timeCur;
  }
//获取大类中的流程模板code

function getMeetingTypeData(MeetingTypeId){
	$.ajax({
		type:'get',
		url:serviceUrl+"oa/meeting/meetingType/get/"+MeetingTypeId+'?time='+Math.random(),
		async:false,
		success: function(data) {
			if(data.success){
				var meetingType=data.result;
				$("input[name='flowInstanceCode']").val(meetingType.flowInstanceCode);
				$("input[name='flowInstanceName']").val(meetingType.flowInstanceName);
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
