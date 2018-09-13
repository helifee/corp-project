/**
 * 重置父页面大小
 * @returns {Boolean}
 */
function resizeWindow(fixNum){
	fixNum = fixNum ? fixNum : 0;
	if(!window.parent || !window.parent.iframeChangeSize){
		return false;
	}
	var url = window.location.pathname;
	url = url.substr(url.lastIndexOf('/')+1);
	var objId = "";
	var obj =  $('iframe[src*="'+url+'"]', window.parent.document);
	if (obj){
		objId = obj.attr('id')
	}
	window.parent.iframeChangeSize(objId, fixNum);
}
