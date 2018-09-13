var newFormCt = function(){
	var parentId = $("#formCtId").val();
	var dt = new Date();
	var url = 'FormCt!edit.do';
	if(parentId) {
		url += "?parentId="+parentId;
	}
    window.open(url, 'FormCt_' + dt.getTime(), opts);
}


var editFormCt = function(id) {
	if(id) {
		 var dt = new Date();
		 window.open('FormCt!edit.do?id='+id, 'FormCt_' + dt.getTime(), opts);
	}else{
		alert("根类别不可编辑!");
	}
}


var newFormDefine = function() {
	var formCtId = $("#formCtId").val(); 
	if(formCtId){
		var dt = new Date();
		window.open('FormDefine!edit.do?formCtId='+formCtId, 'FormDefine_' + dt.getTime(), opts);
	}else{
		alert("根类别不可添加表单!");
	}
}

var editFormDefine = function(id) {
	if(id){
		var dt = new Date();
		window.open('FormDefine!edit.do?id='+id, 'FormDefine_' + dt.getTime(), opts);
	}
}


var checkOutFormDefine = function(id) {
	if(id){
		var dt = new Date();
		window.open('FormDefine!edit.do?id='+id + "&action=checkout", 'FormDefine_' + dt.getTime(), opts);
	}
}

var toHistory = function(formCode) {
	if(formCode) {
		var dt = new Date();
		window.open('FormDefine!history.do?formCode='+formCode,'FormDefine_' + dt.getTime(), opts);
	}
}


var viewFormDefine = function(id) {
	if(id){
		var dt = new Date();
		window.open('FormDefine!view.do?id='+id, 'FormDefine_' + dt.getTime(), opts);
	}
}


var toWriteFormData = function(formCode) {
	if(formCode){
		var dt = new Date();
		window.open('FormData!toWriteFormData.do?formCode='+formCode, 'FormData_' + dt.getTime(), opts);
	}
}


var formDataList = function(formCode) {
	if(formCode) {
		var dt = new Date();
		window.open('FormData!formDataList.do?formCode='+formCode, 'FormData_' + dt.getTime(), opts);
	}
}
