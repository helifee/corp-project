/**
 * author:liugenbin
 * date:20170921
 */
$(function(){
	var urlParam = $.xljUtils.getUrlParams();
	window.isJPOnBizFormRO = false;
	if(urlParam.approveType&&urlParam.approveType=='JG'&&urlParam.iframeMode&&urlParam.iframeMode=='edit'){
		window.isJPOnBizFormRO = true;
	}
});
