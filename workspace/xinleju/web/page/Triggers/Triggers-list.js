var query = function(start){
	 if (start && start >= 0) {
		 document.getElementsByName('start')[0].value = start;
     }
	 $('body').mask("数据查询中...");
     $("#frm").submit();
};


var pauseTrigger = function(){
	 var ids = getCheckBoxValues("ids");
	 if(!ids) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要暂停吗？")) {
		 $('body').mask("暂停 中...");
		 $.ajax({
				type : "POST",
				url : "Triggers!pause.do",
				data : {ids:ids},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("暂停成功！");
						query();
					} else {
						alert("暂停失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					// $.parseJSON(jqXHR.responseText).data.error.message;
					alert("暂停失败！");
				},
				dataType : "json"
			});
	 }
}

var resumeTrigger = function(){
	var ids = getCheckBoxValues("ids");
	 if(!ids) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要恢复吗？")) {
		 $('body').mask("恢复中...");
		 $.ajax({
				type : "POST",
				url : "Triggers!resume.do",
				data : {ids:ids},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("恢复成功！");
						query();
					} else {
						alert("恢复失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					// $.parseJSON(jqXHR.responseText).data.error.message;
					alert("恢复失败！");
				},
				dataType : "json"
			});
	 }
}

var removeTrigger = function(){
	var ids = getCheckBoxValues("ids");
	 if(!ids) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要移除吗？")) {
		 $('body').mask("移除中...");
		 $.ajax({
				type : "POST",
				url : "Triggers!remove.do",
				data : {ids:ids},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("移除成功！");
						query();
					} else {
						alert("移除失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					// $.parseJSON(jqXHR.responseText).data.error.message;
					alert("移除失败！");
				},
				dataType : "json"
			});
	 }
}


var startNow = function(){
	var ids = getCheckBoxValues("ids");
	 if(!ids) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要执行吗？")) {
		 $('body').mask("执行中...");
		 $.ajax({
				type : "POST",
				url : "Triggers!startNow.do",
				data : {ids:ids},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("执行成功！");
						
					} else {
						alert("执行失败！");
					}
					query();
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					// $.parseJSON(jqXHR.responseText).data.error.message;
					alert("执行失败！");
					query();
				},
				dataType : "json"
			});
	 }
}


var newTrigger = function(){
	var dt = new Date();
    window.open('Triggers!edit.do?act=create', 'trigger_' + dt.getTime(), opts);
}

var editTrigger = function(id) {
	var dt = new Date();
	var sid=id;
    sid=encodeURI(encodeURI(sid));
	window.open('Triggers!edit.do?act=edit&id='+sid, 'trigger_' + dt.getTime(), opts);
}