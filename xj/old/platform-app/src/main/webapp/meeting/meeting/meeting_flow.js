
var id=$.xljUtils.getUrlParam('businessId');
/**
 * 关闭窗口
 * add by hwl
 */
function closeWin() {
	window.close();
}
//初始化日期控件
$(function() {
	
	getFlowMettingData(id);
	//window.parent.resizeIframe();
	//resizeIframe();
	$('body').css({'min-width':'100%'});

});	
function getFlowMettingData(id){
	 $.ajax({
	        type:'get',
	        async:false,
	        url:baseUrl + 'oa/meeting/meeting/get/'+id+"?time="+Math.random(),
	        success: function(data) {
	        	var meeting=data.result;
	        	console.log(meeting);
	        	fillDate(meeting);
	        	//回显附件
	            //initFile(id,"view");
	        	resizeIframe();
	        }
		});
}

/**
 * 计算iframe高度自适应
 */
function resizeIframe() {
	/*if(document.bizForm) {
		var b_height = Math.max(document.bizForm.document.body.scrollHeight,document.bizForm.document.body.clientHeight);
		
		var b_iframe = document.getElementById("bizForm");
		$(b_iframe).height(b_height);
	}
	if (!$.isEmptyObject(document.bizForm) && $(document.bizForm.document).find('#form-composer')) {
		$(document.bizForm.document).find('#form-composer').width($(document.bizForm).width())
	}*/
	
	/*if (window.parent&&window.parent.document&&window.parent.document.bizForm){
	    var bizForm = window.parent.document.bizForm;
	    //$(window.parent.document.getElementById('bizForm')).height(bizForm.document.body.scrollHeight+20);
	    $(window.parent.document.getElementById('bizForm')).height(bizForm.document.getElementsByTagName('body')[0].scrollHeight);
	}else {
		// ff
		// var iframeBody = document.getElementById('bizForm').contentDocument.body;
		// b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
		var iframeBody = $(window.parent.document.documentElement).find("#bizForm");
		iframeBody.height(iframeBody[0].contentDocument.body.scrollHeight+20);
	}*/
	var topWinSrc;
	try{
		topWinSrc = window.top.location.href;
		if(topWinSrc.indexOf('#')!=-1){
			topWinSrc = topWinSrc.substring(0,topWinSrc.indexOf('#'));
		}
		window.top.location = topWinSrc + '#flowTopHeight='+window.document.body.scrollHeight;
	}catch(e){
		topWinSrc = $.xljUtils.getUrlParam('topWinSrc');
		if(topWinSrc){
			window.top.location = topWinSrc + '#flowTopHeight='+window.document.body.scrollHeight;
		}
	}
}

function fillDate(meeting){
	$("label[name='id']").text(meeting.id);
  	$("label[name='title']").text(meeting.title);
  	$("label[name='meetingTypeId']").text(meeting.meetingTypeId);
  	$("label[name='meetingType']").text(meeting.meetingType);
  	$("label[name='organDepartId']").text(meeting.organDepartId);
  	$("label[name='organDepart']").text(meeting.organDepart);
	/*$("select[name='status']").find("option[value='" + meeting.status +"']").attr("selected",true);*/
  	var val=meeting.status;
  	if(val=="0"){
  		$("label[name='status']").text( "草稿");
	}else if(val=="1"){
		$("label[name='status']").text( "审批中");
	}else if(val=="2"){
		$("label[name='status']").text( "已完成");
	}else if(val=="3"){
		$("label[name='status']").text("撤回");
	}else if(val=="4"){
		$("label[name='status']").text( "打回");
	}else if(val=="7"){
		$("label[name='status']").text( "作废");
	}else if(val=="9"){
		$("label[name='status']").text("挂起");
	}else if(val=="5"){
		$("label[name='status']").text( "未开始");
	}else if(val=="6"){
		$("label[name='status']").text("进行中");
	}else if(val=="8"){
		$("label[name='status']").text( "已结束");
	}else if(val=="10"){
		$("label[name='status']").text("完成纪要");
	}else if(val=="11"){
		$("label[name='status']").text( "会议取消");
	}
	$("label[name='address']").text(meeting.address);
	$("label[name='mtAppliance']").text(meeting.mtAppliance);
	$("label[name='emceeId']").text(meeting.emceeId);
	$("label[name='emceeName']").text(meeting.emceeName);
  	$("label[name='meetingOrganizationName']").text(meeting.meetingOrganizationName);
  	$("label[name='meetingOrganizationId']").text(meeting.meetingOrganizationId);
  	$("label[name='recorderId']").text(meeting.recorderId);
  	$("label[name='recorderName']").text(meeting.recorderName);
  	
  	/*$("#beginDate").text(meeting.beginDate);*/
  	$("#beginTime").text(meeting.beginTime);
  	/*$("#endDate").text(meeting.endDate);*/
  	$("#endTime").text(meeting.endTime);
	$("label[name='emceeId']").text(meeting.emceeId);
	$("label[name='recorderId']").text(meeting.recorderId);
	$("label[name='attendees']").text(meeting.attendees);
	$("label[name='attendeesName']").text(meeting.attendeesName);
	
	$("label[name='copySendId']").text(meeting.copySendId);
	$("label[name='copySendName']").text(meeting.copySendName);
	$("label[name='meetingTarget']").text(meeting.meetingTarget);
	$("label[name='meetingOutputDoc']").text(meeting.meetingOutputDoc);
	$("label[name='meetingFollowActivity']").text(meeting.meetingFollowActivity);
	$("label[name='remarks']").text(meeting.remarks);
	$("label[name='otherReadersId']").text(meeting.otherReadersId);
	$("label[name='otherReaders']").text(meeting.otherReaders);
	/*var notifiyWay=meeting.notifiyWay;
	if(notifiyWay=="0"){
		$("label:radio[name='notifiyWay']").text("待阅");
	}else{
		$("label:radio[name='notifiyWay']").text("待办");
	}
	var disappearWay=meeting.disappearWay;
	if(disappearWay=="0"){
		$("label:radio[name='notifiyWay']").text("回复后消失");
	}else{
		$("label:radio[name='notifiyWay']").text("会议结束后消失");
	}*/
	
	$(":radio[name='notifiyWay'][value='" + meeting.notifiyWay + "']").prop("checked", "checked");
	$(":radio[name='disappearWay'][value='" + meeting.disappearWay + "']").prop("checked", "checked");
	$(":radio").attr("disabled","disabled");
	toChange();
	  $('#documentAttachments').xljAttachment({
          appId: '1',
          businessId: meeting.id,
          categoryId: '1',
          mode: 'view',
          singleUpload: true,
          hideButtonsWithNoFile:true,
          loadFilesDone:function () {
        	  resizeIframe();
          }
      });
	var MeetingAagenda=meeting.list;
	if(MeetingAagenda.length>0){
		var countLengt=1;
		for(var o in MeetingAagenda){
			addCountList();
			var  Acount=$("#countForm").find("tr").eq(countLengt);
			Acount.find("label[name='meetingTime']").text(MeetingAagenda[o].meetingTime);
			
			Acount.find("label[name='id']").text(MeetingAagenda[o].id);
			Acount.find("label[name='meetingAgenda']").text(MeetingAagenda[o].meetingAgenda);
			Acount.find("label[name='meetingAgendaData']").text(MeetingAagenda[o].meetingAgendaData);
			Acount.find("label[name='submitDataUser']").text(MeetingAagenda[o].submitDataUser);
			
			countLengt++;
		}
	}
}
function addCountList(){
	 var row=$('<tr>'
	         +'<td style="text-align:center"></td>'
	         +'<td><label id="meetingTime" name="meetingTime"></label></td>'
	         +'<td><label id="meetingAgenda" name="meetingAgenda"><label></td>'
	         +'<td><label id="meetingAgendaData" name="meetingAgendaData"><label></td>'
	         +'<td><label id="submitDataUser" name="submitDataUser"><label></td>'
	         +'</tr>');
		     $("#countForm").append(row);
     resetNum();

}
function  resetNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td").eq(0).html(i);
		}
	});
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