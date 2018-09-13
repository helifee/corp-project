var path;
$(function() {
	//隐藏导航栏
    var curWwwPath = window.document.location.href;
    var pathName =  window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0,pos);
    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    path = localhostPaht + projectName;

	var urlParams = $.xljUtils.getUrlParams();
	if(urlParams.hideHeader&&urlParams.hideHeader=='true'){
		/*var userAgentStr = navigator.userAgent.toLowerCase();
		$('header span.remove').hide();
		if(userAgentStr.indexOf('iphone')!=-1){*/
			$('header span.remove').hide();
			$('header span.tit').hide();
		//}
	}

    $('#calendar').eCalendar();
    
    function connectRyJsBridge(callback) {
    	if (window.RyJsBridge) {
    		callback(RyJsBridge)
    	} else {
    		document.addEventListener(
    			'RyJsBridgeReady'
    			, function() {
    				callback(RyJsBridge)
    			},
    			false
    		);
    	}
    }

    /*connectRyJsBridge(function(bridge) {
    	bridge.callHandler(
    		'isShowNavigation'
    		, {'isShowNavigation':false}
    	);
    });*/
});

function closeBrowser() {
	window.RyJsBridge.callHandler( 'closeBrowser' );
}

function newSchedule(){
	var cDay = $.trim($('.c-event-over lable').text());
	cDay = cDay?parseInt(cDay):new Date().getDate();
	cDay =  cDay<10?('0'+cDay):cDay;
	var currentDay = $.trim($('.c-month').text()).replace(/ /g,'').replace('年','-')+'-'+cDay;
	window.location.href = path+"/mobile/schedule/schedule_edit.html?currentDay="+currentDay+"&_time="+new Date().getTime();
}