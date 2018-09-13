
$(".con-tit button").on("click", function(e) {
	var flCode = $("#flCode").val();
	var businessId = $("#businessId").val();
	openWin(serviceUrl + "flow/runtime/approve/start.html?flCode="+flCode+"&businessId="+businessId+"&businessObjectCode=BO0401_zjj&time="+Math.random());
});