var queryOc = function(start){
	if (start && start >= 0) {
        document.getElementsByName('start')[0].value = start;
    }
	$('#frm').submit();
}


var deleteOc = function(id){
	$.post('OutCodeMgr!disOc.do', {id:id}, function(data) {
        queryOc();
    });
}

var unDeleteOc = function(id){
	$.post('OutCodeMgr!UndisOc.do', {id:id}, function(data) {
        queryOc();
    });
}