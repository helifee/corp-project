$(function(){
	setTimeout(function () {
		pageInit();
	},500);
});
function pageInit(){

	$.ajax({
        type:'post',
        url:'http://127.0.0.1:9999/platform-app/oa/sys/sysCommonTools/getCommonToolsList?_t='+new Date().getTime(),
        dataType:'json',
        contentType:'application/json;charset=utf-8;',
        data:"{}",
        success: function(data) {
        	if(data.success){
        		var sysCommonTools=data.result;
        	  for(var o in sysCommonTools){
        		  $("#oaCommonTools").append('<li><a href="javascript:void(0);" onclick="downloadPackage(\''+sysCommonTools[o].id+'\')"><img src="data:image/jpeg;base64,'+sysCommonTools[o].pic+'" style="width:50px;height:50px;"  title='+sysCommonTools[o].name+'></img></a></li> ');
        	  }
        
        	}else{
        		return data.msg;
        	}
     }
	}); 
}
function downloadPackage(id){
	$.xljUtils.xljDownLoad('1',id,'1');
}