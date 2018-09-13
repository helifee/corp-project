//解决token问题，设置全局ajax选项参数（在公共脚本里添加以下代码）:
$(function () {
	//设置全局ajax选项参数 
    $.ajaxSetup({
        //发送请求前触发 
        beforeSend: function (xhr) {
            // console.log("解决token问题，设置全局ajax选项参数");
            var tendId = $.xljUtils.getUrlParam("tendId");
            var accessToken = $.xljUtils.getUrlParam("accessToken");
            xhr.setRequestHeader('tendId',tendId);
            if(accessToken && accessToken != '') {
            	xhr.setRequestHeader('Authorization', accessToken);
            }
            //xhr.setRequestHeader('Authorization','Bearer 1f4c3b61-e306-4962-9735-a8a230bb755d');
        }
    });
    
    //设置全局jgrid选项参数 
    $.extend($.jgrid.defaults, {
        //发送请求前触发 
        loadBeforeSend: function (jqXHR) {
            // console.log("解决token问题，设置全局jgrid选项参数");
            var tendId = $.xljUtils.getUrlParam("tendId");
            var accessToken = $.xljUtils.getUrlParam("accessToken");
            jqXHR.setRequestHeader('tendId',tendId);
            if(accessToken && accessToken != '') {
                jqXHR.setRequestHeader('Authorization', accessToken);
            }
            // jqXHR.setRequestHeader("Authorization", 'Bearer 1f4c3b61-e306-4962-9735-a8a230bb755d'');
        }
    });
});
