function save() {
    $('body').mask("数据保存中...");
    $.ajax({
		type : "POST",
		url : "Triggers!save.do",
		data : $('#frm').serialize(),
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$('body').unmask();
			if (data && data.success) {
		        window.opener.query(0);
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

function chgCron() {
	var type = $("#typeSel").val();
	var once = $("#ever_cron").val();
	var date = $("#execDate").val();

	// * * * ? * *
	var value = "";
	var mark = "";
	if ( type == "second" ) {
		value = "0/" + once + " * * ? * *";
		mark = "秒";
	} else if ( type == "minute" ) {
		value = "0 0/" + once + " * ? * *";
		mark = "分";
	} else if ( type == "hour" ) {
		value = "0 0 0/" + once + " ? * *";
		mark = "小时";
	} else if ( type == "day" ) {
		value = "0 0 0 1/" + once + " * ?";
		mark = "天";
	} else if ( type == "month" ) {
		if ( !date ) {
			date = 1;
		}
		
		value = "0 0 0 " + date + " 1/" + once + " ?";
		mark = "个月";
	}
	
	if ( type == "month" ) {
		$("#execDiv").show();
	} else {
		$("#execDiv").hide();
	}

	$("#cronTxt").val(value);
	$("#mark").html(mark);
}