function dealCuiBan(fiId){
	if(Browser.isIE6() || Browser.isIE7()){
		$('body').mask("数据加载中...");
	}else{
		$('body',window.parent.document).mask("数据加载中...");
	}
	$.ajax({
		url : 'Form!cuiBan.ajax',
		data : {fiId : fiId},
		dataType : "json",
		success :function(data){
			if (data.success){
				alert("催办成功！");
			} else {
				alert(data.msg);
			}
			if(Browser.isIE6() || Browser.isIE7()){
				$('body').unmask();
			}else{
				$('body',window.parent.document).unmask();
			}
			window.close();
		},
		error : function(){
			alert("网络连接失败，请检查网络或联系管理员！");
			if(Browser.isIE6() || Browser.isIE7()){
				$('body').unmask();
			}else{
				$('body',window.parent.document).unmask();
			}
		}
	});
}