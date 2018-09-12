;
(function ($, window, document, undefined) {

//上来就执行
    $(function () {
    	var tendId=window.getJZYWindow(window).JZY.store.state.session.userInfo.currentTenantInfo.tendId;
    	 $.ajax({
             type: "POST",
             url: hostUrl.replace('/hr/','/') + 'sys/user/queryUserLoginInfo',
             dataType: "json",
             data: JSON.stringify({'tendId': tendId}),
             contentType: "application/json",
             success: function (data) {
            	 if(data.status == 200 && data.result.roleMenus) {
            		 var roMenus = data.result.roleMenus;
                	 //console.log("roleMenus", JSON.stringify(data.result));
                	 var isIndexView = true;
                	 if(!roMenus || roMenus == undefined || roMenus == null) {
                		 isIndexView = false;//权限异常
                	 } else if(roMenus.length == 0){
                		 isIndexView = true;//管理员
                	 } else {
                		 isIndexView = false;//无权限
	            		 $.each(roMenus, function (index, item) {
	            			 if(item.code == 'hr_index') {
	            				 isIndexView = true;//有权限
	            				 return false;
	            			 }
	            		 });
                	 }
            		 if(!isIndexView) {
            			 window.location.href = 'self/self_perInfo.html';
            		 } else {
            			 window.location.href = 'index/index.html';
            		 }
            	 }
             }
    	 });
    });
})(jQuery, window, document);