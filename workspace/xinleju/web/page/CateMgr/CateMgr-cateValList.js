var queryCateVal = function(start){
	if (start && start >= 0) {
		document.getElementsByName('start')[0].value = start;
	}
	$('#frm').submit();
}