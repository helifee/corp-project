/**
 * author:wangw
 * 根据ID获取详情  title
 */
$(document).ready(function(){
	//获取父窗口信息ID
	var contentID = $("#contentID", window.opener.document).val();
	$("#contentID").val(contentID);
});

/**
 * 关闭当前窗口
 */
function closeWindow(){
	window.close();
}

/**
 * 加载附件
 * @param fileId 信息ID
 */
function loadFile(fileId){
	attachment.queryList("news",fileId,"1");
}


