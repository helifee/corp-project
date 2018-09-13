function selectParticipant(nameDom,idDom){
	openWindow('Ct!selectPaticipantIndex.do?nameDom='+nameDom+"&idDom="+idDom,"选择",300, 332);
}


function changeParticipant() {
	   $('body').mask("数据保存中...");
	    $.ajax({
			type : "POST",
			url : "Ct!changeParticipant.do",
			data : $('#frm').serialize(),
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
			        window.close();
				} else {
					alert(data.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				// $.parseJSON(jqXHR.responseText).data.error.message;
				alert("网络故障！");
			},
			dataType : "json"
		});
}