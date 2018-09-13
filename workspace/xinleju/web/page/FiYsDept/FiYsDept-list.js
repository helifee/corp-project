
function loadYsDepts(){
	var url = "FiYsDept!loadYsDepts.do";
	alert(url);
	$.get(url, {}, function(result) {
		alert();
	},'json');	
}


