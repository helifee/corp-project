function newOcd() {
	$("#ocdTree")[0].contentWindow.newOcd();
}
function editOcd() {
	$("#ocdTree")[0].contentWindow.editOcd();
}
function disOcd() {
	$("#ocdTree")[0].contentWindow.disOcd();
}
function unDisOcd() {
	$("#ocdTree")[0].contentWindow.unDisOcd();
}
function newOc() {
	$("#ocdTree")[0].contentWindow.newOc();
}
function editOc(ocId) {
	$("#ocdTree")[0].contentWindow.editOc(ocId);
}
function queryOc(start) {

	var ocList = $("#ocList")[0].contentWindow.document;

	$('#isDisabled', ocList).val($('#isDisabled').val());
	$('#name', ocList).val($('#name').val());
	$('#code', ocList).val($('#code').val());
	ocdId = $("#ocdTree")[0].contentWindow.getSelectedocdId();

	if (ocdId && ocdId != 0 && ocdId != '') {
		$('#ocdId', ocList).val(ocdId);
	} else {
		$('#ocdId', ocList).val('');
	}

	$("#ocList")[0].contentWindow.queryOc(start);
	
	$("body", document).mask("页面加载中...");
}

var frame = document.getElementById("ocList");

if (!/* @cc_on!@ */0) { // if not IE
	frame.onload = function() {
		$("body").unmask();
	};
} else {
	frame.onreadystatechange = function() {
		$("body").unmask();
	};
}

/**
 * 
 * @param isDisabled
 */
function setDisOrUnDisocdText(isDisabled) {
	
	if (isDisabled) {
		$("#disOrUnDis").html('标记为非删外部编码分类');
		$("#disOrUnDis").unbind("click");
		$("#disOrUnDis").bind("click", unDisOcd);
	} else {
		$("#disOrUnDis").html('标记为删除外部编码分类');
		$("#disOrUnDis").unbind("click");
		$("#disOrUnDis").bind("click", disOcd);
	}
	
}