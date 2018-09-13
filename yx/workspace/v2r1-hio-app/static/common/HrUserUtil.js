//临时解决token问题，设置全局ajax选项参数（在公共脚本里添加以下代码）:
$(function () {
    $.ajaxSetup({ //设置全局ajax选项参数 
        //发送请求前触发 
        beforeSend: function (xhr) {
            // console.log("解决token问题，设置全局ajax选项参数");
            xhr.setRequestHeader('Authorization', window.getJZYWindow(window).JZY.c.AUTO_LOGIN.headers.authorization);
        },
		complete:function(xhr) {
			if(xhr && xhr.status == 401) {
				// 如果token失效，统一跳回登录页面
                window.getJZYWindow(window).JZY.u.infoMsg('登录已过期,请重新登录')
				window.getJZYWindow(window).JZY.s.logout(true, true);
				window.getJZYWindow(window).JZY.s.hideLoading();
			}
		}
    });

    $.extend($.jgrid.defaults, {
        loadBeforeSend: function (jqXHR) {
            // console.log("解决token问题，设置全局jgrid选项参数");
            jqXHR.setRequestHeader('Authorization', window.getJZYWindow(window).JZY.c.AUTO_LOGIN.headers.authorization);
        }
    });
});
