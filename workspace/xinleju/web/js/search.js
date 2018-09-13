function openShutManager(oSourceObj, oTargetObj, shutAble, oOpenTip, oShutTip) {
	var sourceObj = typeof oSourceObj == "string" ? document
			.getElementById(oSourceObj) : oSourceObj;
	var targetObj = typeof oTargetObj == "string" ? document
			.getElementById(oTargetObj) : oTargetObj;
	var openTip = oOpenTip || "";
	var shutTip = oShutTip || "";
	var ifShowMore;
	if (targetObj.style.display != "none") {
		if (shutAble)
			return;
		targetObj.style.display = "none";
		if (openTip && shutTip) {
			sourceObj.innerHTML = shutTip;
		}
		ifShowMore = 0;
	} else {
		targetObj.style.display = "block";
		if (openTip && shutTip) {
			sourceObj.innerHTML = openTip;
		}
		ifShowMore = 1;
	}
	document.getElementById("ifShowMore").value=ifShowMore;
	window.frameElement.height = document.body.scrollHeight;
	//parent.window.frameElement.height = parent.document.body.scrollHeight;
}
function selectCond(displayName,value,liId,inputName,frmId){
	var appendHtml = '<a href="#">'+displayName+'</a>' +
					 '<input type="hidden" name ="'+inputName+'" ' + 'value="'+value+'"/>';
	//首先查找有没有这个查询条件
	var liDom = $("#selectedCond").children("#"+liId);
	if(liDom.length > 0){
		liDom.html(appendHtml);
	}else{
		$("#selectedCond").append('<li id="'+liId+'">'+appendHtml+'</li>');
	}
	queryFrm(frmId);
}


function clearCurrent(target,frmId){
	$(target).parent().remove();
	queryFrm(frmId);
}


function queryFrm(frmId){
	if(!frmId) {
		frmId = "frm";
	}
	if(document.getElementsByName('start') && document.getElementsByName('start')[0]) {
		document.getElementsByName('start')[0].value = 0;
	}
	document.getElementById(frmId).submit();
}


function clearAll(frmId){
	$("#selectedCond").html("");
	queryFrm(frmId);
}

$(document).ready(function(){
	$('input').placeholder({isUseSpan:true,onInput:false});
});