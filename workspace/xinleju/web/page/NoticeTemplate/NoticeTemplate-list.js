var newNoticeType = function(){
	var parentId = $("#noticeTypeId").val();
	var dt = new Date();
	var url = 'NoticeType!edit.do';
	if(parentId) {
		url += "?parentId="+parentId;
	}
    window.open(url, 'NoticeType_' + dt.getTime(), opts);
}


var editNoticeType = function(id) {
	if(id) {
		 var dt = new Date();
		 window.open('NoticeType!edit.do?id='+id, 'NoticeType_' + dt.getTime(), opts);
	}else{
		alert("根类别不可编辑!");
	}
}


var newNoticeTemplate = function() {
	var noticeTypeId = $("#noticeTypeId").val(); 
	if(noticeTypeId){
		var dt = new Date();
		window.open('NoticeTemplate!edit.do?noticeTypeId='+noticeTypeId, 'NoticeTemplate_' + dt.getTime(), opts);
	}else{
		alert("根类别不可添加模板!");
	}
}

var editNoticeTemplate = function(id) {
	if(id){
		var dt = new Date();
		window.open('NoticeTemplate!edit.do?id='+id, 'NoticeTemplate_' + dt.getTime(), opts);
	}
}

