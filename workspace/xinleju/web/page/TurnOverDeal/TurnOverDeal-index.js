//改变操作类型
function changeTurnOverType(fromPartyIdVar,fromPartyVar,toPartyIdVar,toPartyVar) {
	var typeVar = $("#dealType").val();
	if (isEmpty(typeVar)){
		typeVar = "DealType_1";
	}
	$('body').mask("操作中...");
	var url = "TurnOverDeal!flList.do?fromPartyIdVar="+fromPartyIdVar+"&fromPartyVar="+fromPartyVar+"&toPartyIdVar="+toPartyIdVar+"&toPartyVar="+toPartyVar+"&t=" + (new Date()).getTime();
	if ("DealType_1" == typeVar){
		url = "TurnOverDeal!flList.do?fromPartyIdVar="+fromPartyIdVar+"&fromPartyVar="+fromPartyVar+"&toPartyIdVar="+toPartyIdVar+"&toPartyVar="+toPartyVar+"&t=" + (new Date()).getTime();
	}else if ("DealType_2" == typeVar){
		url = "TurnOverDeal!wiList.do?fromPartyIdVar="+fromPartyIdVar+"&fromPartyVar="+fromPartyVar+"&toPartyIdVar="+toPartyIdVar+"&toPartyVar="+toPartyVar+"&t=" + (new Date()).getTime();
	}

	url = encodeURI(url);
	url = encodeURI(url);

	$("#objList").attr("src",url);
}
$("#objList").load(function(){
	var mainheight = $(this).contents().find("body").height() + 30;
	$(this).height(mainheight);
	$('body').unmask();
});

$(function(){	
	//导航切换
	$(".menuson li").click(function(){
		$(".menuson li.active").removeClass("active")
		$(this).addClass("active");
	});

	$('.title').click(function(){
		var $ul = $(this).next('ul');
		$('dd').find('ul').slideUp();
		if($ul.is(':visible')){
			$(this).next('ul').slideUp();
		}else{
			$(this).next('ul').slideDown();
		}
	});
})
function redirectContentIframe(myUrl,value){
	$("#dealType").val(value);
	myUrl = myUrl + "?t=" + (new Date()).getTime();
	myUrl = encodeURI(myUrl);
	myUrl = encodeURI(myUrl);
	$("#objList").attr("src",myUrl);
}