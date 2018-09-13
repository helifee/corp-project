function flowTest(){
	$("#frm").submit();
}
function selectStartPeByDomOp(startPeIdDomId, startPeNameDomId){
	var selectedStartPeIds = $("#"+startPeIdDomId).val();
	var url = "FormTools!userSelect.do";
	var dto = {
		selectedStartPeIds : selectedStartPeIds
	}
	var sFeatures = {
		dialogWidth : 1000,
		dialogHeight : 600
	};
	url += "?paramJsonStr=" + encodeURI(Ext.util.JSON.encode(dto));
	var rv = showModalDialogOverride(url, window, sFeatures);
	if (isNotEmpty(rv)){
		getStartPeInfo(startPeIdDomId, startPeNameDomId,rv);
	}
}
function getStartPeInfo(startPeIdDomId, startPeNameDomId, startPeInfo) {
	var selectIds = "";
	var selectNames = "";
	if (startPeInfo.length > 0) {
		for (var x = 0; x < startPeInfo.split(";").length; x++) {
			selectIds += startPeInfo.split(";")[x].split(":")[0].split("_")[1] + ((x == startPeInfo.split(";").length - 1) ? "" : ",");
			selectNames += startPeInfo.split(";")[x].split(":")[1] + ((x == startPeInfo.split(";").length - 1) ? "" : ";");
		}
	}
	if (isNotEmpty(selectIds)){
		$("#"+startPeIdDomId).val(selectIds);
		$("#"+startPeNameDomId).val(selectNames);
	}
}