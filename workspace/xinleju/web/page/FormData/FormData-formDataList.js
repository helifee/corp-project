var viewFormData = function(id) {
	if(id){
		var dt = new Date();
		window.open('FormData!view.do?id='+id, 'FormData_' + dt.getTime(), opts);
	}
}
var editFormData = function(id) {
	if(id){
		var dt = new Date();
		window.open('FormData!toWriteFormData.do?id='+id, 'FormData_' + dt.getTime(), opts);
	}
}