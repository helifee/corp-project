
function tabOnSelect(title,index){
	var rh = $("#center").height();
	if(title == '合同信息'){
		$("#h1").height(rh-35);
    	$("#t1").height(rh-35);
    }
	var tab = $('#tt').tabs('getTab',index); 
	var url = tab.attr("url");
	var frameId = tab.attr("frameId");

	$("#"+frameId).attr("src",url);
	
}

$(function() {
	$("#t1").attr("src","FiCoContract!list.do");
})

