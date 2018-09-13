
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

function getFlowMettingData(id){
	 $.ajax({
	        type:'get',
	        async:false,
	        url:baseUrl + 'oa/meeting/meetingSummary/get/'+id+"?time="+Math.random(),
	        success: function(data) {
	        	var meeting=data.result;
	        	fillDate(meeting);
	        	//回显附件
	            //initFile(id,"view");
	        	resizeIframe();
	        }
		});
}

function subStringDate(date){
	if(date != null){
		return date.substring(0,16);
	}else{
		return null;
	}}

function fillDate(meeting){
	$("label[name='id']").text(meeting.id);
  	$("label[name='mtTitle']").text(meeting.mtTitle);
  	$("label[name='meetingTypeId']").text(meeting.meetingTypeId);
  	$("label[name='meetingType']").text(meeting.meetingType);
  	$("label[name='entryDate']").text(subStringDate(meeting.entryDate));
	$("label[name='planBeginTime']").text(subStringDate(meeting.planBeginTime));
	$("label[name='actualBeginTime']").text(subStringDate(meeting.actualBeginTime));
	$("label[name='planAddress']").text(meeting.planAddress);
  	$("label[name='actualAddress']").text(meeting.actualAddress);
  	$("label[name='meetingOrganizationName']").text(meeting.meetingOrganizationName);
  	$("label[name='emceeName']").text(meeting.emceeName);
  	$("label[name='requirAttendeesName']").text(meeting.requirAttendeesName);
	$("label[name='actualAttendeesId']").text(meeting.actualAttendeesId);
	$("label[name='actualAttendeesName']").text(meeting.actualAttendeesName);
	$("label[name='copySendId']").text(meeting.copySendId);
  	$("#copySendName").text(meeting.copySendName);
  	$("#otherReadersId").text(meeting.otherReadersId);
  	$("#otherReaders").text(meeting.otherReaders);
  	$("#meetingContent").text(meeting.meetingContent);
	$("label[name='meetingRecord']").text(meeting.meetingRecord);
	$("label[name='meetingResult']").text(meeting.meetingResult);
	$("label[name='remarks']").text(meeting.remarks);
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
	/*var isChecked=meeting.notifiyWay;
	if(isChecked=="0"){
		$("label[name='notifiyWay']").text("待阅");
	}else{
		$("label[name='notifiyWay']").text("待办");
	}*/
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


