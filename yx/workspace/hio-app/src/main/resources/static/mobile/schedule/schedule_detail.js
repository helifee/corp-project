var path; 
var businessId;
$(function() {
	var curWwwPath = window.document.location.href;
    var pathName =  window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0,pos);
    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    path = localhostPaht + projectName;
    //如果含有businessId的参数
    if(curWwwPath.indexOf("?businessId")>0){
    	var paramText = curWwwPath.split("?")[1];
        var paramArray = paramText.split("&");
        businessId = paramArray[0].split("=")[1];
        //console.log("businessId="+businessId+"; path="+path);
        queryBeanAndSetFormData(businessId);
    }
});

(function($) {
    $.init();
    /*var btns = $('.my-mui-time');
    btns.each(function(i, btn) {
        btn.addEventListener('tap', function() {
            var optionsJson = this.getAttribute('data-options') || '{}';
            var options = JSON.parse(optionsJson);
            var id = this.getAttribute('id');
            var picker = new $.DtPicker(options);
            picker.show(function(rs) {
                btn.value = rs.text;
                picker.dispose();
            });
        }, false);
    });*/
})(mui);

function queryBeanAndSetFormData(id){
	$.ajax({
        type:'get',
        url: path+'/oa/workSchedule/get/'+id+'?time='+Math.random(),
        success: function(returnData) {
        	if(returnData.success){
        		var itemObj = returnData.result;
        		if("MEETING" == itemObj.type){
        			$("#typeName").val("会议事项");
        		}else if("PERSONAL_PROCEEDING" == itemObj.type){
        			$("#typeName").val("个人事项");
        		}
        		$("#content").val(itemObj.content);
        		$("#beginTime").val(itemObj.beginTime);
        		$("#endTime").val(itemObj.endTime);
        	}
        }
	});
}


function cancelAction(){
	window.location.href = path+"/mobile/schedule/schedule_list.html?hideHeader=true&time="+new Date().getTime();
}
