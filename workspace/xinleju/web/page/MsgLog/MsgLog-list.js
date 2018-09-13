var query = function(start) {
	if (start && start >= 0) {
		document.getElementsByName('start')[0].value = start;
	}
	$('body').mask("数据查询中...");
	$("#frm").submit();
};

var showFlow = function(url) {
	window.open(url);
};


var showErrorMsg = function(msg) {
	alert(msg);
};



var againPush = function(msgId) {
	if (msgId != null && msgId != '') {
		if (confirm('推送前,请确保对方OA帐户里无此条信息。确定推送到OA系统吗?')) {
			$('#msgId').attr('value', msgId);
			$('body').mask('执行中...');
			$.post('MsgLog!againPush.do', $('#frm').serialize(),
					function(data) {
						$('body').unmask();
						if (data.success) {
							alert('推送成功!');
							//window.location = "MsgLog!list.do";
							$("#frm").submit();
						} else {
							alert('推送失败!');
						}

					});
		}
	} else {
		alert("传参错误！！");
	}
};