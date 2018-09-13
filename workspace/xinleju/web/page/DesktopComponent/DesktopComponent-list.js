var query = function(start){
	 if (start && start >= 0) {
		 document.getElementsByName('start')[0].value = start;
     }
	 $('body').mask("数据查询中...");
     $("#frm").submit();
};

var newDesktopComponent = function(id){
	if(!id){
		 window.open('DesktopComponent!edit.do?act=create', 'DesktopComponent_', opts);
	}else{
		 window.open('DesktopComponent!edit.do?id='+id, 'DesktopComponent_', opts);
	}
  
}

var enable = function(){
	var id = getCheckBoxValues("id");
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要启动吗？")) {
		 $('body').mask("启动中...");
		 $.ajax({
				type : "POST",
				url : "DesktopComponent!enable.do",
				data : {id:id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("启动成功！");
						query(0);
					} else {
						alert("启动失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("启动失败！");
				}
			});
	 }
}
var unable = function(){
	var id = getCheckBoxValues("id");
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要禁止吗？")) {
		 $('body').mask("禁止中...");
		 $.ajax({
				type : "POST",
				url : "DesktopComponent!unable.do",
				data : {id:id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("禁止成功！");
						query();
					} else {
						alert("禁止失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("执行失败！");
				}
			});
	 }
}

function AutoCheckAll(ele) {
	    var check=document.getElementsByName("id");
	    if(ele.checked){
	    for(i=0;i<check.length;i++){
	        check[i].checked=true;
	    }}else {
	        for (i = 0; i < check.length; i++) {
	            check[i].checked = false;
	        }
	    }


	}
