 var save=function() {
    $('body').mask("数据保存中...");
    $.ajax({
		type : "POST",
		url : "FiSysInfo!save.do",
		data : $('#frm').serialize(),
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$('body').unmask();
			if (data && data.success) {
		        parent.query();
		        parent.closeDialog('newDialog');
			} else {
				alert(data.msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$('body').unmask();
			alert("网络故障！");
		},
		dataType : "json"
	});
};
 
 
 var query = function(start){
	 if (start && start >= 0) {
		 document.getElementsByName('start')[0].value = start;
     }
	 $('body').mask("数据查询中...");
     $("#frm").submit();
};

$(function(){
	$('#frm_fiSysInfo_vtype').combobox({    
	    data:vtype_ref,    
	    valueField:'key',    
	    textField:'value'   
	});  
})
