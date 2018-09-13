        function closeBrowser() {
            window.RyJsBridge.callHandler(
                'closeBrowser'
            );
        }	
	function setupWebViewJavascriptBridge(callback) {
		
		if (window.RyJsBridge) { return callback(RyJsBridge); }
		if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'https://__bridge_loaded__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
	}
	var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
	callbackButton.innerHTML = '关闭页面'
	callbackButton.setAttribute("id","closePageButton")
	callbackButton.id = "closePageButton";
	callbackButton.onclick = function(e){
		e.preventDefault();
		closeBrowser();
	}
    setupWebViewJavascriptBridge(function(bridge) {
		
		var uniqueId = 1
		bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
			log('ObjC called testJavascriptHandler with', data)
			var responseData = { 'Javascript Says':'Right back atcha!' }
			log('JS responding with', responseData)
			responseCallback(responseData)
		})
		
		callbackButton.onclick = function(e) {
			e.preventDefault()
			bridge.callHandler(
				'closeBrowser'
			);
		}
	})	;
	
	
var showUserPickerButton;
    var userResult;
    var userPicker;
    
    //本页面的URL格式是meeting_detail.html?meetingId=e2e1e4dc29af449f9a82351414319e68&time=1234567890
    var url = decodeURI(location.href);
  	var urlText = url.split("?")[1];
  	var paramArray = urlText.split("&");
  	var meetingId = paramArray[0].split("=")[1]; 
  	var msgId = paramArray[1].split("=")[1]; 
//  	console.log("meetingId="+meetingId);
    (function($, doc) {
    	$.init({
    		swipeBack: true //启用右滑关闭功能
        });
    })(mui, document);
        
    //进入详情界面加载数据完成之前，显示对话框提示。
	var ajaxLoading = $("#background,#progressBar1");
	//点击提交按钮，返回结果之前显示对话框提示。
	var ajaxSubmit = $("#background,#progressBar2");
	ajaxLoading.hide();
	ajaxSubmit.hide();
    $(function() {
    	var curWwwPath = window.document.location.href;
        var pathName =  window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        var localhostPaht = curWwwPath.substring(0,pos);
        var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
        path = localhostPaht + projectName;
        getMobileParamAndQueryFormData();
   });
   		 
	//本页面所有的ajax都加载完成显示页面
	$(document).ajaxStop(function(){
		$("body").show();
		//console.log("本页面所有的ajax都加载完成显示页面 >> isback="+isback);
	 	/*if(isback){
	 		$("html,body").scrollTop($("#selectUserAnchor").offset().top);
	 	}*/
	});
	var mStatus;//会议状态
  function getMobileParamAndQueryFormData(){
	$.ajax({
       url: path+"/mobile/meeting/queryMeetingDetail/"+meetingId, type: 'GET',
       contentType: 'application/json', dataType: 'JSON',
       success: function (resultData) {
    	   var retObj = resultData.result;
    	   if(resultData.success && retObj){
//    		   console.log(">>>> meetingId="+meetingId);
//    		   console.log(">>>> retObj="+JSON.stringify(retObj));
    		   setFormData(retObj);
    		   mStatus=retObj.status;
    		   queryUserIsjoin(meetingId);
    		   
    		   if(msgId){//如果是待阅消息,需要去将消息的状态改为已阅
        		   changeMsgStatusIntoYY(msgId);
        	   }
    	   }
       }
	});
  }

  function changeMsgStatusIntoYY(msgIdText){
  	var paramData = {id: msgIdText, 'newStatus': 'YY', 'oldStatus': 'DY'};
      var fullUrl = path + "/flow/sysNoticeMsg/updateStatusOfNoticeMsg";
      $.ajax({ //发送更新的ajax请求
          type: "post", url: fullUrl,
          dataType: "json", async: true,
          data: JSON.stringify( paramData ),
          contentType: 'application/json;charset=utf-8', //设置请求头信息
          success: function (data) {
              //console.info("调用待阅变已阅的接口 已成功! msgIdText="+msgIdText);
          },
          error: function (data) {
              console.info("调用待阅变已阅的接口失败！msgIdText="+msgIdText);
          }
      });
  }
  function queryUserIsjoin(){
	 $.ajax({
         url: path+"/mobile/meeting/queryUserIsjoin/"+meetingId, type: 'GET',
         contentType: 'application/json', dataType: 'JSON',
         success: function (resultData) {
//    	     console.log(">>>> queryUserIsjoin resultData="+JSON.stringify(resultData));
    	           
    	     if(resultData.success && resultData.result){
    	    	 $("#attendBtn").hide();
    	    	 $("#refuseBtn").hide();
    	    	 var result = resultData.result;
    	    	 //result = "all";
    	    	 if("no" == result){//no--只需显示 参加;
    	    		 $("#attendBtn").show();
    	    	 }else if("yes" == result){// yes--只显示  不参加; 
    	    		 $("#refuseBtn").show();
    	    	 }else if("all" == result){// all--都显示;
    	    		 $("#attendBtn").show();
        	    	 $("#refuseBtn").show();
    	    	 }else if("allNo" == result){// allNo----都不显示
    	    		 
    	    	 }
    	    	 if(mStatus=="11"){//会议取消
    	    		 $("#attendBtn").hide();
        	    	 $("#refuseBtn").hide();
    	    	 }
    	     }
         }
	 });
  }
  
  function  setFormData(retObj){
	  $("#title").text(retObj.title);
	  $("#beginDate").text(retObj.beginTime);
	  $("#endDate").text(retObj.endTime);
	  $("#address").text(retObj.address);
	  
	  $("#emceeId").text(retObj.emceeName);
	  $("#attendeesName").text(retObj.attendeesName);
	  $("#status").text( getStatusText(retObj.status));
	  if(retObj.list){
		  var agendaList = retObj.list;
		  $("#agendaList").empty();
		  for(var idx=0; idx<agendaList.length; idx++){
			  var agenda = agendaList[idx];
			 /* str = "<li>时间："+agenda.meetingTime+"</li>"+
			  "<li>会议议程："+agenda.meetingAgenda+"</li>"+
			  "<li>议程资料： "+agenda.meetingAgendaData+"</li>"+
			  "<li>资料提交人： "+agenda.submitDataUser+"</li><li><br/></li>";*/
			  var timeText = agenda.meetingTime;//2017-08-02 16:31:01
			  if(timeText){
				  timeText = timeText.substr(11,5);
			  }
			  str = '<div class="yc-item">'+
				'<div class="tit" style="padding-top: 10px;"><span class="time">'+timeText+'</span><i></i><span>'+agenda.meetingAgenda+'</span></div>'+
				'<div class="yc-item-con clearfix">'+
				'	<p><span class="con-tit">资料提交人:</span><span>'+agenda.submitDataUser+'</span></p>'+
				'	<span class="con-tit pull-left">资料:</span>'+
				'	<div class="con-right pull-left">'+
				'	<span>'+agenda.meetingAgendaData+'</span>'+
				//'	<span>工作汇报发言顺序.doc</span>'+
				'	</div>'+
				'</div>'+
			'</div>';
			
	      	  $("#agendaList").append(str);
		  }
		  
	  }
  }
  
  function getStatusText(status){
	  if(status=="1" || status==1){
		  return "审批中";
	  }
	  
	  if(status=="5" || status==5){
		  return "未开始";
	  }
	  if(status=="6" || status==6){
		  return "进行中";
	  }
	  
	  if(status=="8" || status==8){
		  return "已结束";
	  }
	  
	  if(status=="10" || status==10){
		  return "完成纪要";
	  }
	  
	  if(status=="12" || status==12){
		  return "会议变更";
	  }
	  
	  if(status=="11" || status==11){
		  return "会议取消";
	  }
	  
      return "";
  }
        
  function doSubmitAction(joinFlag){//0代表不参加，1代表参加
	  var newIdText = "";
	  $.ajax({ type:'get', async:false,
			url: path+'/generator/getGuuid'+"?time="+Math.random(),
			success: function(data) {
				newIdText = data.result;
			} 			    
	  });
	  
	  var dataObj = {id: newIdText, joinFlag:joinFlag, delflag:false, meetingId:meetingId};
	  $.ajax({
          type : "post",  dataType: "json",
          url : path + "/mobile/meeting/saveMeetingReploy",
		  data: JSON.stringify(dataObj), //提交的数据
          contentType: 'application/json',
          success: function(data){ //成功返回之后调用的函数
        	  if(data.success){
        		  var upUrl=document.referrer;//上页面url
        		  if(upUrl){
        			  window.location.href = upUrl;
        		  }else{
        			//关闭
						try {
							//console.log(123);
							var pageCloseBtn = $("#buttons button");
							pageCloseBtn.click();
						} catch (e) {
						}
        		  }
        		  //window.location.href = path + "/mobile/meeting/meeting_list.html";
//        		  window.location.href = path + "/mobile/approve/approve_list.html?_t="+new Date().getTime();
				  //window.history.go(-1);
        	  }
          }
	 });
  }

  
  