/*此方法是全局方法,供其他页面的调用*/
function refreshMyTaskData(actionType){
	if("toApprove" == actionType){
		$('#toApprove_A').click();
	}
	
	if("toRead" == actionType){
		$('#toRead_A').click();
	}
}

$(function() {
    //var serviceUrl = 'http://10.17.4.88:8080/platform-app/';
	//serviceUrl = 'http://127.0.0.1:8080/platform-app/';
    function tabClickInit() {
        var tabs = $('#portalMyTaskTab li a');
        $.each(tabs,function (i,tab) {
            switch (i){

                case 0:
                    $(tab).on('click',function () {
                        chooseTab('toApprove');
                        var moreAObj = $('#moreMsgListBtn');//$(this).parents('.portlet-container').find('.news_title').find('.glyphicon-th-list').parent();
                        if(moreAObj[0]){
                            $(moreAObj[0]).attr('href',  'http://127.0.0.1:8081/platform-app/flow/runtime/mytask/task_list.html?dataType=DB');//待办
                            $(moreAObj[0]).attr('target', '_blank');
                        }
                        $('#moreMsgListBtn').show();
                    });
                    break;
                case 1:
                    $(tab).on('click',function () {
                        chooseTab('toRead');
                        var moreAObj = $('#moreMsgListBtn');//$(this).parents('.portlet-container').find('.news_title').find('.glyphicon-th-list').parent();
                        if(moreAObj[0]){
                            $(moreAObj[0]).attr('href', 'http://127.0.0.1:8081/platform-app/flow/runtime/mytask/task_list.html?dataType=DY');//待阅
                            $(moreAObj[0]).attr('target', '_blank');
                        }
                        $('#moreMsgListBtn').show();
                    });
                    break;
                case 2:
                    $(tab).on('click',function () {
                        chooseTab('haveDone');
                        var moreAObj = $('#moreMsgListBtn');//$(this).parents('.portlet-container').find('.news_title').find('.glyphicon-th-list').parent();
                        if(moreAObj[0]){
                            $(moreAObj[0]).attr('href', 'http://127.0.0.1:8081/platform-app/flow/runtime/mytask/task_list.html?dataType=HAVE_DONE');//已办已阅
                            $(moreAObj[0]).attr('target','_blank');
                        }
                        $('#moreMsgListBtn').show();
                    });

                    break;
                case 3:
                    $(tab).on('click',function () {
                        chooseTab('myStart');
                        var moreAObj = $('#moreMsgListBtn');//$(this).parents('.portlet-container').find('.news_title').find('.glyphicon-th-list').parent();
                        if(moreAObj[0]){
                            $(moreAObj[0]).attr('href', 'http://127.0.0.1:8081/platform-app/flow/runtime/mytask/task_list.html?dataType=FQ');//我的发起
                            $(moreAObj[0]).attr('target','_blank');
                        }
                        $('#moreMsgListBtn').show();
                    });
                    break;
                case 4:
                    $(tab).on('click',function () {
                        //查询邮件
                    	getEmailInfo();
                        var moreAObj = $('#moreMsgListBtn');//$(this).parents('.portlet-container').find('.news_title').find('.glyphicon-th-list').parent();
                        moreAObj.hide();
                    });
                    break;
            }

        });
    }
    tabClickInit();
    getEmailInfo();
    setTimeout(function () {
        $('#toApprove_A').click();
    },500);


    function moreMsgList(){
    	var clickTab = "";
    	var dataType = "DB";
    	if(clickTab == "toApprove"){
    		dataType = "DB"
    	}else if(clickTab == "toRead"){
    		dataType = "DY"
    	}else if(clickTab == "haveDone"){
    		dataType = "HAVE_DONE"
    	}else if(clickTab == "myStart"){
    		dataType = "FQ"
    	}
    	 
    	var url = 'http://127.0.0.1:8081/platform-app/flow/runtime/mytask/task_list.html?dataType='+dataType;
    	openWin(url);
    }
    
    function chooseTab(tabName) {//tabName=toApprove | toRead | haveDone | myStart| 
    	var opType = "";
    	if(tabName=="toApprove"){
    		opType = "DB";
    	}else if(tabName=="toRead"){
    		opType = "DY";
    	}
        var paramData = {delflag: false, start: 0, limit: 10};
        
        var fullUrl = serviceUrl+"flow/sysNoticeMsg/queryDBDYList?_t="+new Date().getTime();
        if(tabName=="toApprove" || tabName=="toRead"){
        	paramData.opType = opType;
        }
        var opType = "";
        if(tabName=="haveDone"){
            paramData.opType = "HAVE_DONE";
        }else if(tabName=="myStart"){
            paramData.opType = "FQ";
        }
        
        $.ajax({ //发送更新的ajax请求
            type: "post",
            url: fullUrl,
            dataType: "json",
            data: JSON.stringify( paramData ),
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function (data) {
                showTabDataList(data, tabName);
            },
            error: function (data) {
                if (data.msg) {
                    $.xljUtils.tip('red', data.msg);
                } else {
                    $.xljUtils.tip('red', "查询待办和待阅的汇总数据失败！");
                }
            }
        });

	}

	function showTabDataList(data, tabName){
        var dataList = data.result;
        var htmlText = "";
        if(!dataList || dataList=="null"){
        	return;
        }
        //计算一下待办和待阅的统计数据
        var startIdx =1;
        var firstItem = dataList[0];
        $("#toApprove_A").text("待审("+firstItem.toDoSum+")");
        $("#toRead_A").text("待阅("+firstItem.toReadSum+")");
        
        for(var idx=startIdx; idx<dataList.length; idx++){
            var item = dataList[idx];
            var hourSumText = item.hourSum;
            var hourSum = parseInt(hourSumText);
            var showHourText = hourSum+"小时";
            if(hourSum>24){
            	var daySum = parseInt(hourSum / 24);
             	var leftHour = hourSum % 24;
             	if(leftHour>0){
             		showHourText = daySum+"天"+leftHour+"小时";
             	}else{
             		showHourText = daySum+"天";
             	}
            }
            
            var urlText = serviceUrl+item.url;
            if(item.url && item.url.indexOf("http")==0){
            	urlText = item.url;
            }
            
            if(tabName=="toApprove" && item.opType=="DB"){
                htmlText += "<li> <span class=\"t_delay\">已停留"+showHourText+"</span>"+
                    "<a href=\""+urlText+"&time="+Math.random()+"\" class=\"t_content\" target=\"_blank\">"+item.title+"</a></li>";
            }else if(tabName=="toRead" && item.opType=="DY"){
                htmlText += "<li> <span class=\"t_delay\">已停留"+showHourText+"</span>"+
                "<a href=\""+urlText+"&time="+Math.random()+"&firstTime=YES\" class=\"t_content\" target=\"_blank\">"+item.title+"</a></li>";
            }else if(tabName=="haveDone" || tabName=="myStart"){
                htmlText += "<li> <a href=\""+urlText+"&time="+Math.random()+"&action=view\" class=\"t_content\" target=\"_blank\">"+item.title+"</a></li>";
            }
        }
        $("#"+tabName+"DataList").html(htmlText);
    }
	/**
	 * 兼容性时间创建方法
	 */
	/*function newDate(dateStr) {
		var array = dateStr.match(/\d+/g);
		dateStr = array[0] + '/' + array[1] + '/' + array[2];
		var date = new Date(dateStr);
		date.setHours(parseInt(array[3]), parseInt(array[4]), parseInt(array[5]));
		return date;
	}
    function calculateTimeOffset(newTime, oldTime){
        var hourSum = (newTime-oldTime)/1000/60/60;
        var hourText = hourSum+"";
        var index = hourText.indexOf(".");
        return hourText.substr(0,index+2);
    }*/
    
    function getEmailInfo(){
    	$.ajax({
            type: 'GET',
            url: serviceUrl + 'oa/email/userEmail/getUserEmail?_time='+new Date().getTime(),
            dataType:'JSON',
            success: function (resultData) {
                if(resultData.success){

                    $('#myEmailDiv ul').html('');
                    var emailMap = resultData.result;
                    var unReadCount = emailMap.unReadCount;
                    $('#email_A').text('邮箱('+unReadCount+')');

                    var emailList = emailMap.emailInfoList;
                    for (var i=0;i<emailList.length;i++){
                        var liObj = $('<li></li>');
                        var titleSpan = $('<span class="email_title"></span>');
                        titleSpan.text(emailList[i].emailSubject);
                        titleSpan.attr('title',emailList[i].emailSubject);

                        var sendUserSpan = $('<span class="email_author"></span>');
                        sendUserSpan.text(emailList[i].sendUser);
                        sendUserSpan.attr('title',emailList[i].sendUser);

                        var sendTimeSpan = $('<span class="email_time"></span>');
                        sendTimeSpan.text(emailList[i].emailSendTime);
                        sendTimeSpan.attr('title',emailList[i].emailSendTime);

                        liObj.append(sendTimeSpan);
                        liObj.append(sendUserSpan);
                        liObj.append(titleSpan);
                        $('#myEmailDiv ul').append(liObj);
                    }
                }
            },
            error:function (xhr) {
                //console.info(xhr);
            }
        });
    }
    $("#email_A").dblclick(function(){
    	  //TODO outlook登陆
//    	getUserXyre();
    	window.open(serviceUrl+"outlook_mail.html");
	});
});

function switchTaskTab(tabType) {
    var opType = [];
    //['DB','DY','YB','YY','FQ']
    if(tabType=='toApprove'){
        opType.push('DB');
    }else if(tabType=='toRead') {
        opType.push('DY');
    }else if(tabType=='haveDone') {
        opType.push('YB');
        opType.push('YY');
    }else if(tabType=='myStart') {
        opType.push('FQ');
    }

    var paramData = {
        start:0,
        limit:10,
        opType:opType
    };
    $.ajax({ //发送更新的ajax请求
        type: "POST",
        url:  "http://127.0.0.1:9999/platform-app/flow/sysNoticeMsg/querySysNoticeMsgByPage",
        dataType: "JSON",
        data: JSON.stringify( paramData ),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
            if(data.success) {
                var result = data.result;
                var total = result.total;
                var list = result.list;
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    var hourSum = obj.hourSum;
                    var hourSumTxt = hourSum + "小时";
                    if(hourSum>24){
                        var daySum = (hourSum / 24);
                        var leftHour = hourSum % 24;
                        if(leftHour>0){
                            hourSumTxt = daySum+"天"+leftHour+"小时";
                        }else{
                            hourSumTxt = daySum+"天";
                        }
                    }
                    hourSumTxt = "已停留"+hourSumTxt;

                    var url = obj.url;
                    if (tabType=='toApprove') {
                        // 去掉审核页面url的时间戳, 测试缓存页面, by lgb 
                        // url = serviceUrl+url+"&_t="+new Date().getTime();
                        url = serviceUrl+url;
                    } else if (tabType=='toRead') {
                        url = serviceUrl+url+"&firstTime=YES&_t="+new Date().getTime();
                    } else if (tabType=='haveDone'||tabType=='myStart') {
                        url = serviceUrl+url+"&action=view&_t="+new Date().getTime();
                    }

                    var liObj = $('<li></li>');
                    var delaySpanObj = $('<span class="t_delay"></span>');
                    delaySpanObj.text(hourSumTxt);
                    delaySpanObj.attr('title',hourSumTxt);

                    var aObj = $('<a class="t_content" target="_blank"></a>');
                    aObj.attr('href',url);
                    aObj.attr('title',obj.title);
                    aObj.text(obj.title);

                    if("DB"==opType||"DY"==opType){
                        liObj.append(delaySpanObj);
                    }

                    liObj.append(aObj);

                    var ulObj = $('<ul></ul>');
                    ulObj.append(liObj);
                }

                if(tabType=='toApprove'){
                    $('#toApprove_A').text('待审('+total+')');
                    $('#toApproveDataList').empty();
                    $('#toApproveDataList').append(ulObj.html());

                }else if(tabType=='toRead') {
                    $('#toRead_A').text('待阅('+total+')');
                    $('#toReadDataList').empty();
                    $('#toReadDataList').append(ulObj.html());
                }else if(tabType=='haveDone') {
                    $('#haveDoneDataList').empty();
                    $('#haveDoneDataList').append(ulObj.html());
                }else if(tabType=='myStart') {
                    $('#myStartDataList').empty();
                    $('#myStartDataList').append(ulObj.html());
                }
            }
        },
        error: function (data) {
            if (data.msg) {
                $.xljUtils.tip('red', data.msg);
            } else {
                $.xljUtils.tip('red', "查询任务列表数据失败！");
            }
        }
    });
}